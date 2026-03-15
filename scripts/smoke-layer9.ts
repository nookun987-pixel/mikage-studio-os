import {
  benchmarkAuditInputSchema,
  ingestionInputSchema,
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

const compileRequest = compileRequestSchema.parse({
  requestCode: 'studio_compile_smoke_001',
  projectSlug: 'mikage',
  presetCode: 'mikage_cinematic_portrait',
  variantCode: 'storm_rooftop_action',
  compileMode: 'production_prompt',
  systemFrame: 'Preserve canonical tone and compile a stable production-safe prompt.',
  canonConstraints: ['mikage', 'rooftop confrontation', 'canonical framing'],
  contextPackets: [
    {
      packetRef: {
        packetKind: 'world_context',
        packetCode: 'ctx_world_001',
        packetVersion: 1
      },
      summary: 'Mikage stands on a rain-soaked rooftop under neon skyline lighting.',
      fragments: [
        {
          fragmentCode: 'frag_char_001',
          label: 'Character',
          summary: 'Mikage remains battle-worn, focused, and central to the frame.',
          metadata: {}
        }
      ],
      metadata: {}
    }
  ],
  modePayload: {
    title: 'Production Prompt Payload',
    instructions: [
      'Emphasize canonical framing and atmospheric stillness.',
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
    requestCode: 'studio_compile_smoke_001',
    presetCode: 'mikage_cinematic_portrait',
    variantCode: 'storm_rooftop_action',
    packetRefs: [
      {
        packetKind: 'world_context',
        packetCode: 'ctx_world_001',
        packetVersion: 1
      }
    ],
    metadata: {}
  },
  metadata: {
    source: 'smoke-layer9'
  }
});

const compiledPrompt = compilePrompt(compileRequest);

const validationResult = validateCanon({
  requestCode: 'studio_validation_smoke_001',
  queryMode: 'blocking',
  compiledPromptPacket: {
    packetKind: 'production_package',
    packetCode: 'compiled_prompt_packet_001',
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
    source: 'smoke-layer9'
  }
});

const productionPackage = assembleProductionPackage(
  productionPackageInputSchema.parse({
    requestCode: 'studio_package_request_001',
    packageCode: 'pkg_studio_001',
    packageMode: 'production_with_audit_placeholder',
    job: {
      jobCode: 'job_studio_001',
      projectSlug: 'mikage',
      presetCode: 'mikage_cinematic_portrait',
      variantCode: 'storm_rooftop_action',
      providerCode: 'mock_image_provider',
      outputCount: 4,
      metadata: {}
    },
    assetIntent: {
      assetKind: 'image_generation',
      outputCount: 4,
      targetAspectRatio: '9:16',
      metadata: {}
    },
    compileReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'compiled_prompt_packet_001',
        packetVersion: 1
      },
      compiledPrompt
    },
    validationReference: {
      packetRef: {
        packetKind: 'canon_report',
        packetCode: 'validation_packet_001',
        packetVersion: 1
      },
      validation: validationResult
    },
    negativePromptReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'negative_prompt_packet_001',
        packetVersion: 1
      },
      negativePrompt: compiledPrompt.negativePrompt
    },
    lineageReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'lineage_packet_001',
        packetVersion: 1
      },
      lineage: compiledPrompt.lineage
    },
    benchmarkAudit: {
      auditCode: 'audit_placeholder_001',
      status: 'pending',
      notes: ['Benchmark audit shell consumed by Layer 9 smoke path.'],
      metadata: {}
    },
    metadata: {
      source: 'smoke-layer9'
    }
  })
);

const benchmarkAudit = auditBenchmark(
  benchmarkAuditInputSchema.parse({
    requestCode: 'benchmark_audit_studio_001',
    packageReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'pkg_studio_001',
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
      source: 'smoke-layer9'
    }
  })
);

const ingestionResult = ingestPackageShell(
  ingestionInputSchema.parse({
    requestCode: 'ingest_studio_001',
    packageReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'pkg_studio_001',
        packetVersion: 1
      },
      productionPackage
    },
    benchmarkAuditReference: {
      packetRef: {
        packetKind: 'benchmark_audit',
        packetCode: 'benchmark_audit_studio_001',
        packetVersion: 1
      },
      benchmarkAudit
    },
    metadata: {
      source: 'smoke-layer9'
    }
  })
);

const persistenceResult = persistLineageShell(
  persistenceInputSchema.parse({
    requestCode: 'persist_studio_001',
    ingestion: ingestionResult,
    metadata: {
      source: 'smoke-layer9'
    }
  })
);

const studioActionResult = runStudioAction(
  studioActionInputSchema.parse({
    requestCode: 'studio_action_smoke_001',
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
      selectionCode: 'selection_pkg_studio_001',
      selectedPacketRef: {
        packetKind: 'production_package',
        packetCode: 'pkg_studio_001',
        packetVersion: 1
      },
      selectedCodes: ['pkg_studio_001', persistenceResult.persistenceCode],
      metadata: {}
    },
    artifactReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'pkg_studio_001',
        packetVersion: 1
      },
      productionPackage
    },
    validationReference: {
      packetRef: {
        packetKind: 'canon_report',
        packetCode: 'validation_packet_001',
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
      source: 'smoke-layer9'
    }
  })
);

console.log(
  JSON.stringify(
    {
      requestCode: studioActionResult.requestCode,
      normalizedActionType: studioActionResult.normalizedActionType,
      queueType: studioActionResult.queueProjection.queueType,
      queueItemCount: studioActionResult.queueProjection.items.length,
      status: studioActionResult.status,
      decision: studioActionResult.decision.decision,
      selectedPacketCode: studioActionResult.summary.selectedPacketCode
    },
    null,
    2
  )
);
