import {
  benchmarkAuditInputSchema,
  compileRequestSchema,
  ingestionInputSchema,
  orchestrationRequestAcceptedResponseSchema,
  persistenceInputSchema,
  productionPackageInputSchema,
  studioActionInputSchema
} from '@mikage/contracts';
import { auditBenchmark } from '../../benchmark-auditor/src/index.js';
import { validateCanon } from '../../canon-validator/src/index.js';
import {
  ingestPackageShell,
  persistLineageShell
} from '../../persistence-shell/src/index.js';
import { compilePrompt } from '../../prompt-compiler/src/index.js';
import { assembleProductionPackage } from '../../production-assembler/src/index.js';
import { runStudioAction } from '../../studio-control-shell/src/index.js';

import {
  orchestrationChainRequestShellSchema,
  type OrchestrationChainRequestShell,
  type OrchestrationChainResultShell,
  type RuntimeCompileProfile
} from './contracts.js';
import {
  isBenchmarkRejected,
  isPackagingRejected,
  isPersistenceRejected,
  isValidationRejected
} from './guards.js';
import { buildExecutedStep, buildRuntimeSummary } from './summary.js';

export const executeGenerationPipeline = (
  rawInput: OrchestrationChainRequestShell
): OrchestrationChainResultShell => {
  const input = orchestrationChainRequestShellSchema.parse(rawInput);
  const executedSteps: ReturnType<typeof buildExecutedStep>[] = [];

  const acceptedResponse = orchestrationRequestAcceptedResponseSchema.parse({
    requestCode: input.request.requestCode,
    status: 'validated',
    acceptedAt: '2026-03-15T00:00:00.000Z',
    boundaryPacket: {
      packetKind: 'orchestration_request',
      packetCode: input.request.requestCode,
      packetVersion: 1
    },
    downstreamPackets: [
      ...input.request.contextPackets,
      {
        packetKind: 'benchmark_audit',
        packetCode: `${input.request.requestCode}_benchmark_shell`,
        packetVersion: 1
      }
    ],
    metadata: {
      source: 'runtime-orchestration-boundary'
    }
  });
  executedSteps.push(
    buildExecutedStep(
      'layer3_request_boundary',
      'completed',
      `Accepted orchestration request ${acceptedResponse.boundaryPacket.packetCode}.`
    )
  );

  const compileRequest = compileRequestSchema.parse({
    requestCode: `${input.request.requestCode}_compile`,
    projectSlug: input.request.projectSlug,
    presetCode: input.request.presetCode,
    variantCode: input.request.variantCode,
    compileMode: input.compileProfile.compileMode,
    systemFrame: input.compileProfile.systemFrame,
    canonConstraints: input.compileProfile.canonConstraints,
    contextPackets: input.request.contextPackets.map((packet, index: number) => ({
      packetRef: {
        packetKind: packet.packetKind,
        packetCode: packet.packetCode,
        packetVersion: packet.packetVersion ?? 1
      },
      summary:
        input.compileProfile.contextSummaries[index] ??
        input.compileProfile.contextSummaries.at(-1) ??
        'Stable context summary.',
      fragments: [
        {
          fragmentCode: `frag_${packet.packetCode}`,
          label: index === 0 ? 'World Context' : 'State Snapshot',
          summary:
            input.compileProfile.fragmentSummaries[index] ??
            input.compileProfile.fragmentSummaries.at(-1) ??
            'Stable fragment summary.',
          metadata: {}
        }
      ],
      metadata: {}
    })),
    modePayload: {
      title: 'Runtime Generation Pipeline Payload',
      instructions: input.compileProfile.modeInstructions
    },
    outputInstructions: input.compileProfile.outputInstructions,
    negativePrompt: {
      clauses: input.compileProfile.negativeClauses
    },
    lineage: {
      requestCode: input.request.requestCode,
      presetCode: input.request.presetCode,
      variantCode: input.request.variantCode,
      packetRefs: input.request.contextPackets.map((packet) => ({
        packetKind: packet.packetKind,
        packetCode: packet.packetCode,
        packetVersion: packet.packetVersion ?? 1
      })),
      metadata: {}
    },
    metadata: {
      source: 'runtime-orchestration-boundary',
      acceptedBoundaryPacket: acceptedResponse.boundaryPacket.packetCode
    }
  });

  const compiledPrompt = compilePrompt(compileRequest);
  const compileMode: RuntimeCompileProfile['compileMode'] =
    input.compileProfile.compileMode;
  executedSteps.push(
    buildExecutedStep(
      'layer4_prompt_compile',
      'completed',
      `Compiled prompt for ${input.request.presetCode}/${input.request.variantCode}.`
    )
  );

  const validationResult = validateCanon({
    requestCode: `${input.request.requestCode}_validation`,
    queryMode: input.request.canonQueryMode,
    compiledPromptPacket: {
      packetKind: 'production_package',
      packetCode: `${input.request.requestCode}_compiled_prompt`,
      packetVersion: 1
    },
    compiledPrompt,
    ontology: {
      kind: 'ontology',
      requiredTerms: input.validationProfile.ontologyRequiredTerms,
      prohibitedTerms: input.validationProfile.ontologyProhibitedTerms,
      advisoryTerms: input.validationProfile.ontologyAdvisoryTerms,
      metadata: {}
    },
    invariants: {
      kind: 'invariants',
      requiredTerms: input.validationProfile.invariantRequiredTerms,
      prohibitedTerms: input.validationProfile.invariantProhibitedTerms,
      advisoryTerms: input.validationProfile.invariantAdvisoryTerms,
      metadata: {}
    },
    philosophicalAxes: {
      kind: 'philosophical_axes',
      requiredTerms: input.validationProfile.philosophicalRequiredTerms,
      prohibitedTerms: input.validationProfile.philosophicalProhibitedTerms,
      advisoryTerms: input.validationProfile.philosophicalAdvisoryTerms,
      metadata: {}
    },
    characterTruth: {
      kind: 'character_truth',
      requiredTerms: input.validationProfile.characterRequiredTerms,
      prohibitedTerms: input.validationProfile.characterProhibitedTerms,
      advisoryTerms: input.validationProfile.characterAdvisoryTerms,
      metadata: {}
    },
    visualGrammar: {
      kind: 'visual_grammar',
      requiredTerms: input.validationProfile.visualRequiredTerms,
      prohibitedTerms: input.validationProfile.visualProhibitedTerms,
      advisoryTerms: input.validationProfile.visualAdvisoryTerms,
      metadata: {}
    },
    driftRisk: {
      kind: 'drift_risk',
      riskTerms: input.validationProfile.driftRiskTerms,
      hardBlockTerms: input.validationProfile.driftHardBlockTerms,
      metadata: {}
    },
    metadata: {
      source: 'runtime-orchestration-boundary'
    }
  });
  executedSteps.push(
    buildExecutedStep(
      'layer5_canon_validate',
      isValidationRejected(validationResult.decision) ? 'stopped' : 'completed',
      `Validation decision: ${validationResult.decision}.`
    )
  );

  if (isValidationRejected(validationResult.decision)) {
    return buildRuntimeSummary({
      requestCode: input.request.requestCode,
      compileMode,
      validationDecision: validationResult.decision,
      packageCode: null,
      benchmarkDecision: null,
      ingestionCode: null,
      persistenceCode: null,
      studioActionType: null,
      finalStatus: 'stopped_validation_rejected',
      executedSteps
    });
  }

  const productionPackage = assembleProductionPackage(
    productionPackageInputSchema.parse({
      requestCode: `${input.request.requestCode}_package`,
      packageCode: `pkg_${input.request.requestCode}`,
      packageMode: 'production_with_audit_placeholder',
      job: {
        jobCode: `job_${input.request.requestCode}`,
        projectSlug: input.request.projectSlug,
        presetCode: input.request.presetCode,
        variantCode: input.request.variantCode,
        providerCode: input.request.providerCode,
        outputCount: input.request.outputCount,
        metadata: {}
      },
      assetIntent: {
        assetKind: 'image_generation',
        outputCount: input.request.outputCount,
        targetAspectRatio: '9:16',
        metadata: {}
      },
      compileReference: {
        packetRef: {
          packetKind: 'production_package',
          packetCode: `${input.request.requestCode}_compiled_prompt`,
          packetVersion: 1
        },
        compiledPrompt
      },
      validationReference: {
        packetRef: {
          packetKind: 'canon_report',
          packetCode: `${input.request.requestCode}_validation`,
          packetVersion: 1
        },
        validation: validationResult
      },
      negativePromptReference: {
        packetRef: {
          packetKind: 'production_package',
          packetCode: `${input.request.requestCode}_negative_prompt`,
          packetVersion: 1
        },
        negativePrompt: compiledPrompt.negativePrompt
      },
      lineageReference: {
        packetRef: {
          packetKind: 'production_package',
          packetCode: `${input.request.requestCode}_lineage`,
          packetVersion: 1
        },
        lineage: compiledPrompt.lineage
      },
      benchmarkAudit: {
        auditCode: `${input.request.requestCode}_audit_placeholder`,
        status: 'pending',
        notes: ['Runtime orchestration boundary placeholder.'],
        metadata: {}
      },
      metadata: {
        source: 'runtime-orchestration-boundary'
      }
    })
  );
  executedSteps.push(
    buildExecutedStep(
      'layer6_production_package_assembly',
      isPackagingRejected(productionPackage) ? 'stopped' : 'completed',
      `Package decision: ${productionPackage.decision.decision}.`
    )
  );

  if (isPackagingRejected(productionPackage)) {
    return buildRuntimeSummary({
      requestCode: input.request.requestCode,
      compileMode,
      validationDecision: validationResult.decision,
      packageCode: productionPackage.packageCode,
      benchmarkDecision: null,
      ingestionCode: null,
      persistenceCode: null,
      studioActionType: null,
      finalStatus: 'stopped_packaging_rejected',
      executedSteps
    });
  }

  const benchmarkAudit = auditBenchmark(
    benchmarkAuditInputSchema.parse({
      requestCode: `${input.request.requestCode}_benchmark`,
      packageReference: {
        packetRef: {
          packetKind: 'production_package',
          packetCode: productionPackage.packageCode,
          packetVersion: 1
        },
        productionPackage
      },
      benchmarkSets: [
        {
          setCode: 'gold_visual_dna',
          tier: 'gold',
          metadata: {}
        },
        {
          setCode: 'silver_scene_set',
          tier: 'silver',
          metadata: {}
        },
        {
          setCode: 'red_drift_examples',
          tier: 'red',
          metadata: {}
        }
      ],
      goldBenchmark: {
        tier: 'gold',
        referenceTerms: input.benchmarkProfile.goldReferenceTerms,
        blockedTerms: [],
        metadata: {}
      },
      silverBenchmark: {
        tier: 'silver',
        referenceTerms: input.benchmarkProfile.silverReferenceTerms,
        blockedTerms: [],
        metadata: {}
      },
      redBenchmark: {
        tier: 'red',
        referenceTerms: [],
        blockedTerms: input.benchmarkProfile.redBlockedTerms,
        metadata: {}
      },
      metadata: {
        source: 'runtime-orchestration-boundary',
        benchmarkSetCodes: input.request.benchmarkAudit.benchmarkSetCodes
      }
    })
  );
  executedSteps.push(
    buildExecutedStep(
      'layer7_benchmark_audit',
      isBenchmarkRejected(benchmarkAudit) ? 'stopped' : 'completed',
      `Benchmark decision: ${benchmarkAudit.decision.decision}.`
    )
  );

  if (isBenchmarkRejected(benchmarkAudit)) {
    return buildRuntimeSummary({
      requestCode: input.request.requestCode,
      compileMode,
      validationDecision: validationResult.decision,
      packageCode: productionPackage.packageCode,
      benchmarkDecision: benchmarkAudit.decision.decision,
      ingestionCode: null,
      persistenceCode: null,
      studioActionType: null,
      finalStatus: 'stopped_benchmark_rejected',
      executedSteps
    });
  }

  const ingestionResult = ingestPackageShell(
    ingestionInputSchema.parse({
      requestCode: `${input.request.requestCode}_ingest`,
      packageReference: {
        packetRef: {
          packetKind: 'production_package',
          packetCode: productionPackage.packageCode,
          packetVersion: 1
        },
        productionPackage
      },
      benchmarkAuditReference: {
        packetRef: {
          packetKind: 'benchmark_audit',
          packetCode: benchmarkAudit.requestCode,
          packetVersion: 1
        },
        benchmarkAudit
      },
      metadata: {
        source: 'runtime-orchestration-boundary'
      }
    })
  );

  const persistenceResult = persistLineageShell(
    persistenceInputSchema.parse({
      requestCode: `${input.request.requestCode}_persist`,
      ingestion: ingestionResult,
      metadata: {
        source: 'runtime-orchestration-boundary'
      }
    })
  );
  executedSteps.push(
    buildExecutedStep(
      'layer8_ingestion_and_lineage_persistence',
      isPersistenceRejected(persistenceResult) ? 'stopped' : 'completed',
      `Persistence decision: ${persistenceResult.decision.decision}.`
    )
  );

  if (isPersistenceRejected(persistenceResult)) {
    return buildRuntimeSummary({
      requestCode: input.request.requestCode,
      compileMode,
      validationDecision: validationResult.decision,
      packageCode: productionPackage.packageCode,
      benchmarkDecision: benchmarkAudit.decision.decision,
      ingestionCode: ingestionResult.ingestionCode,
      persistenceCode: persistenceResult.persistenceCode,
      studioActionType: null,
      finalStatus: 'stopped_persistence_rejected',
      executedSteps
    });
  }

  const studioActionResult = runStudioAction(
    studioActionInputSchema.parse({
      requestCode: `${input.request.requestCode}_studio_action`,
      actionType: input.studioProfile.actionType,
      panel: {
        panelCode: input.studioProfile.panelCode,
        panelKind: 'queue_projection',
        title: input.studioProfile.panelTitle,
        metadata: {}
      },
      view: {
        viewCode: input.studioProfile.viewCode,
        activePanelCode: input.studioProfile.panelCode,
        mode: 'queue',
        metadata: {}
      },
      filter: {
        filterCode: input.studioProfile.filterCode,
        scope: 'queue',
        terms: input.studioProfile.filterTerms,
        metadata: {}
      },
      selection: {
        selectionCode: `selection_${productionPackage.packageCode}`,
        selectedPacketRef: {
          packetKind: 'production_package',
          packetCode: productionPackage.packageCode,
          packetVersion: 1
        },
        selectedCodes: [productionPackage.packageCode, persistenceResult.persistenceCode],
        metadata: {}
      },
      artifactReference: {
        packetRef: {
          packetKind: 'production_package',
          packetCode: productionPackage.packageCode,
          packetVersion: 1
        },
        productionPackage
      },
      validationReference: {
        packetRef: {
          packetKind: 'canon_report',
          packetCode: `${input.request.requestCode}_validation`,
          packetVersion: 1
        },
        validation: validationResult
      },
      lineageReference: {
        packetRef: {
          packetKind: 'lineage_record',
          packetCode: `${ingestionResult.ingestionCode}_lineage`,
          packetVersion: 1
        },
        persistence: persistenceResult
      },
      metadata: {
        source: 'runtime-orchestration-boundary'
      }
    })
  );
  executedSteps.push(
    buildExecutedStep(
      'layer9_studio_action_boundary',
      'completed',
      `Studio action projected as ${studioActionResult.normalizedActionType}.`
    )
  );

  return buildRuntimeSummary({
    requestCode: input.request.requestCode,
    compileMode,
    validationDecision: validationResult.decision,
    packageCode: productionPackage.packageCode,
    benchmarkDecision: benchmarkAudit.decision.decision,
    ingestionCode: ingestionResult.ingestionCode,
    persistenceCode: persistenceResult.persistenceCode,
    studioActionType: studioActionResult.normalizedActionType,
    finalStatus: 'completed',
    executedSteps
  });
};
