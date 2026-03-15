import {
  benchmarkAuditInputSchema,
  ingestionInputSchema,
  orchestrationRequestAcceptedResponseSchema,
  orchestrationRequestSchema,
  persistenceInputSchema,
  studioActionInputSchema,
  compileRequestSchema,
  productionPackageInputSchema
} from '@mikage/contracts';
import { compilePrompt } from '../packages/prompt-compiler/src/index.ts';
import { validateCanon } from '../packages/canon-validator/src/index.ts';
import { assembleProductionPackage } from '../packages/production-assembler/src/index.ts';
import { auditBenchmark } from '../packages/benchmark-auditor/src/index.ts';
import {
  ingestPackageShell,
  persistLineageShell
} from '../packages/persistence-shell/src/index.ts';
import { runStudioAction } from '../packages/studio-control-shell/src/index.ts';

const executedSteps: string[] = [];

const orchestrationRequest = orchestrationRequestSchema.parse({
  requestCode: 'orchestration_chain_smoke_001',
  projectSlug: 'mikage',
  characterCode: 'char_mikage',
  anchorCode: 'anchor_leia_041',
  presetCode: 'mikage_cinematic_portrait',
  variantCode: 'storm_rooftop_action',
  sceneCode: 'scene_rooftop_confrontation',
  shotCode: 'shot_low_angle_heroic_damaged_stillness',
  providerCode: 'mock_image_provider',
  outputCount: 4,
  contextPackets: [
    {
      packetKind: 'world_context',
      packetCode: 'ctx_world_001',
      packetVersion: 1
    },
    {
      packetKind: 'state_snapshot',
      packetCode: 'ctx_state_001',
      packetVersion: 2
    }
  ],
  canonQueryMode: 'blocking',
  sceneBuilderMode: 'scene_seeded',
  scriptBuilderMode: 'outline_only',
  productionPackageMode: 'benchmark_audit_shell',
  benchmarkAudit: {
    benchmarkSetCodes: ['gold_visual_dna', 'silver_scene_set', 'red_drift_examples'],
    auditProfileCode: 'audit_default',
    requireLineageAudit: true,
    requireBenchmarkPass: false,
    tags: ['layer10', 'smoke']
  },
  metadata: {
    initiatedBy: 'smoke-layer10'
  }
});
executedSteps.push('layer3_request_boundary');

const acceptedResponse = orchestrationRequestAcceptedResponseSchema.parse({
  requestCode: orchestrationRequest.requestCode,
  status: 'validated',
  acceptedAt: '2026-03-15T00:00:00.000Z',
  boundaryPacket: {
    packetKind: 'orchestration_request',
    packetCode: orchestrationRequest.requestCode,
    packetVersion: 1
  },
  downstreamPackets: [
    ...orchestrationRequest.contextPackets,
    {
      packetKind: 'benchmark_audit',
      packetCode: 'benchmark_chain_shell_001',
      packetVersion: 1
    }
  ],
  metadata: {
    source: 'smoke-layer10'
  }
});

const compileRequest = compileRequestSchema.parse({
  requestCode: 'orchestration_compile_smoke_001',
  projectSlug: orchestrationRequest.projectSlug,
  presetCode: orchestrationRequest.presetCode,
  variantCode: orchestrationRequest.variantCode,
  compileMode: 'production_prompt',
  systemFrame:
    'Preserve canonical tone, atmospheric stillness, and battle-worn focus while compiling a stable production-safe prompt.',
  canonConstraints: [
    'mikage',
    'rooftop confrontation',
    'canonical framing',
    'battle-worn',
    'focused',
    'tone'
  ],
  contextPackets: orchestrationRequest.contextPackets.map((packet, index) => ({
    packetRef: {
      packetKind: packet.packetKind,
      packetCode: packet.packetCode,
      packetVersion: packet.packetVersion ?? 1
    },
    summary:
      index === 0
        ? 'Mikage stands on a rain-soaked rooftop under neon skyline lighting in a rooftop confrontation with canonical framing.'
        : 'State snapshot confirms storm tension, controlled stillness, atmospheric tone, and focused battle-worn restraint.',
    fragments: [
      {
        fragmentCode: `frag_${packet.packetCode}`,
        label: index === 0 ? 'World Context' : 'State Snapshot',
        summary:
          index === 0
            ? 'Mikage remains battle-worn, focused, and central to the framing.'
            : 'Scene momentum remains locked to rooftop confrontation, canonical restraint, and atmospheric stillness.',
        metadata: {}
      }
    ],
    metadata: {}
  })),
  modePayload: {
    title: 'Production Prompt Payload',
    instructions: [
      'Emphasize canonical framing, atmospheric stillness, and neon skyline tone.',
      'Avoid introducing non-canonical supporting subjects.'
    ]
  },
  outputInstructions: [
    'Return concise, production-safe prompt text.',
    'Keep sections interpretable by downstream systems.'
  ],
  negativePrompt: {
    clauses: ['low detail', 'anatomical distortion']
  },
  lineage: {
    requestCode: orchestrationRequest.requestCode,
    presetCode: orchestrationRequest.presetCode,
    variantCode: orchestrationRequest.variantCode,
    packetRefs: orchestrationRequest.contextPackets.map((packet) => ({
      packetKind: packet.packetKind,
      packetCode: packet.packetCode,
      packetVersion: packet.packetVersion ?? 1
    })),
    metadata: {}
  },
  metadata: {
    source: 'smoke-layer10',
    acceptedBoundaryPacket: acceptedResponse.boundaryPacket.packetCode
  }
});

const compiledPrompt = compilePrompt(compileRequest);
executedSteps.push('layer4_prompt_compile');

const validationResult = validateCanon({
  requestCode: 'orchestration_validation_smoke_001',
  queryMode: orchestrationRequest.canonQueryMode,
  compiledPromptPacket: {
    packetKind: 'production_package',
    packetCode: 'compiled_prompt_chain_001',
    packetVersion: 1
  },
  compiledPrompt,
  ontology: {
    kind: 'ontology',
    requiredTerms: ['mikage'],
    prohibitedTerms: ['spaceship'],
    advisoryTerms: ['canonical'],
    metadata: {}
  },
  invariants: {
    kind: 'invariants',
    requiredTerms: ['rooftop confrontation'],
    prohibitedTerms: ['medieval castle'],
    advisoryTerms: ['stillness'],
    metadata: {}
  },
  philosophicalAxes: {
    kind: 'philosophical_axes',
    requiredTerms: ['tone'],
    prohibitedTerms: ['parody'],
    advisoryTerms: ['atmospheric'],
    metadata: {}
  },
  characterTruth: {
    kind: 'character_truth',
    requiredTerms: ['battle-worn'],
    prohibitedTerms: ['comic relief'],
    advisoryTerms: ['focused'],
    metadata: {}
  },
  visualGrammar: {
    kind: 'visual_grammar',
    requiredTerms: ['framing'],
    prohibitedTerms: ['low-poly'],
    advisoryTerms: ['neon'],
    metadata: {}
  },
  driftRisk: {
    kind: 'drift_risk',
    riskTerms: ['experimental remix'],
    hardBlockTerms: ['spaceship invasion'],
    metadata: {}
  },
  metadata: {
    source: 'smoke-layer10'
  }
});
executedSteps.push('layer5_canon_validate');

if (validationResult.decision !== 'accepted') {
  console.log(
    JSON.stringify(
      {
        requestCode: orchestrationRequest.requestCode,
        compileMode: compileRequest.compileMode,
        validationDecision: validationResult.decision,
        packageCode: null,
        benchmarkDecision: null,
        ingestionCode: null,
        persistenceCode: null,
        studioActionType: null,
        finalStatus: 'stopped_validation_rejected',
        executedSteps
      },
      null,
      2
    )
  );
  process.exit(0);
}

const productionPackage = assembleProductionPackage(
  productionPackageInputSchema.parse({
    requestCode: 'orchestration_package_request_001',
    packageCode: 'pkg_orchestration_001',
    packageMode: 'production_with_audit_placeholder',
    job: {
      jobCode: 'job_orchestration_001',
      projectSlug: orchestrationRequest.projectSlug,
      presetCode: orchestrationRequest.presetCode,
      variantCode: orchestrationRequest.variantCode,
      providerCode: orchestrationRequest.providerCode,
      outputCount: orchestrationRequest.outputCount,
      metadata: {}
    },
    assetIntent: {
      assetKind: 'image_generation',
      outputCount: orchestrationRequest.outputCount,
      targetAspectRatio: '9:16',
      metadata: {}
    },
    compileReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'compiled_prompt_chain_001',
        packetVersion: 1
      },
      compiledPrompt
    },
    validationReference: {
      packetRef: {
        packetKind: 'canon_report',
        packetCode: 'validation_chain_001',
        packetVersion: 1
      },
      validation: validationResult
    },
    negativePromptReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'negative_prompt_chain_001',
        packetVersion: 1
      },
      negativePrompt: compiledPrompt.negativePrompt
    },
    lineageReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'lineage_chain_001',
        packetVersion: 1
      },
      lineage: compiledPrompt.lineage
    },
    benchmarkAudit: {
      auditCode: 'audit_placeholder_chain_001',
      status: 'pending',
      notes: ['Benchmark audit shell consumed by Layer 10 smoke path.'],
      metadata: {}
    },
    metadata: {
      source: 'smoke-layer10'
    }
  })
);
executedSteps.push('layer6_production_package_assembly');

if (!productionPackage.decision.accepted) {
  console.log(
    JSON.stringify(
      {
        requestCode: orchestrationRequest.requestCode,
        compileMode: compileRequest.compileMode,
        validationDecision: validationResult.decision,
        packageCode: productionPackage.packageCode,
        benchmarkDecision: null,
        ingestionCode: null,
        persistenceCode: null,
        studioActionType: null,
        finalStatus: 'stopped_package_rejected',
        executedSteps
      },
      null,
      2
    )
  );
  process.exit(0);
}

const benchmarkAudit = auditBenchmark(
  benchmarkAuditInputSchema.parse({
    requestCode: 'benchmark_audit_chain_001',
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
      referenceTerms: ['mikage', 'canonical framing', 'rooftop confrontation'],
      blockedTerms: [],
      metadata: {}
    },
    silverBenchmark: {
      tier: 'silver',
      referenceTerms: ['atmospheric stillness', 'neon skyline'],
      blockedTerms: [],
      metadata: {}
    },
    redBenchmark: {
      tier: 'red',
      referenceTerms: [],
      blockedTerms: ['spaceship invasion', 'parody mode'],
      metadata: {}
    },
    metadata: {
      source: 'smoke-layer10',
      benchmarkSetCodes: orchestrationRequest.benchmarkAudit.benchmarkSetCodes
    }
  })
);
executedSteps.push('layer7_benchmark_audit');

if (benchmarkAudit.decision.decision === 'rejected') {
  console.log(
    JSON.stringify(
      {
        requestCode: orchestrationRequest.requestCode,
        compileMode: compileRequest.compileMode,
        validationDecision: validationResult.decision,
        packageCode: productionPackage.packageCode,
        benchmarkDecision: benchmarkAudit.decision.decision,
        ingestionCode: null,
        persistenceCode: null,
        studioActionType: null,
        finalStatus: 'stopped_benchmark_rejected',
        executedSteps
      },
      null,
      2
    )
  );
  process.exit(0);
}

const ingestionResult = ingestPackageShell(
  ingestionInputSchema.parse({
    requestCode: 'ingest_chain_001',
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
      source: 'smoke-layer10'
    }
  })
);

const persistenceResult = persistLineageShell(
  persistenceInputSchema.parse({
    requestCode: 'persist_chain_001',
    ingestion: ingestionResult,
    metadata: {
      source: 'smoke-layer10'
    }
  })
);
executedSteps.push('layer8_ingestion_and_lineage_persistence');

if (!persistenceResult.decision.persisted) {
  console.log(
    JSON.stringify(
      {
        requestCode: orchestrationRequest.requestCode,
        compileMode: compileRequest.compileMode,
        validationDecision: validationResult.decision,
        packageCode: productionPackage.packageCode,
        benchmarkDecision: benchmarkAudit.decision.decision,
        ingestionCode: ingestionResult.ingestionCode,
        persistenceCode: persistenceResult.persistenceCode,
        studioActionType: null,
        finalStatus: 'stopped_persistence_rejected',
        executedSteps
      },
      null,
      2
    )
  );
  process.exit(0);
}

const studioActionResult = runStudioAction(
  studioActionInputSchema.parse({
    requestCode: 'studio_action_chain_001',
    actionType: 'queue_persistence_review',
    panel: {
      panelCode: 'panel_lineage_review',
      panelKind: 'queue_projection',
      title: 'Lineage Review Queue',
      metadata: {}
    },
    view: {
      viewCode: 'view_queue_projection',
      activePanelCode: 'panel_lineage_review',
      mode: 'queue',
      metadata: {}
    },
    filter: {
      filterCode: 'filter_persistence_review',
      scope: 'queue',
      terms: ['persisted', 'accepted'],
      metadata: {}
    },
    selection: {
      selectionCode: 'selection_pkg_orchestration_001',
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
        packetCode: 'validation_chain_001',
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
      source: 'smoke-layer10'
    }
  })
);
executedSteps.push('layer9_studio_action_boundary');

console.log(
  JSON.stringify(
    {
      requestCode: orchestrationRequest.requestCode,
      compileMode: compileRequest.compileMode,
      validationDecision: validationResult.decision,
      packageCode: productionPackage.packageCode,
      benchmarkDecision: benchmarkAudit.decision.decision,
      ingestionCode: ingestionResult.ingestionCode,
      persistenceCode: persistenceResult.persistenceCode,
      studioActionType: studioActionResult.normalizedActionType,
      finalStatus: studioActionResult.status,
      executedSteps
    },
    null,
    2
  )
);
