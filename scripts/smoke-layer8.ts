import {
  benchmarkAuditInputSchema,
  ingestionInputSchema,
  persistenceInputSchema,
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

const compileRequest = compileRequestSchema.parse({
  requestCode: 'persist_compile_smoke_001',
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
    requestCode: 'persist_compile_smoke_001',
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
    source: 'smoke-layer8'
  }
});

const compiledPrompt = compilePrompt(compileRequest);

const validationResult = validateCanon({
  requestCode: 'persist_validation_smoke_001',
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
    source: 'smoke-layer8'
  }
});

const productionPackage = assembleProductionPackage(
  productionPackageInputSchema.parse({
    requestCode: 'persist_package_request_001',
    packageCode: 'pkg_persist_001',
    packageMode: 'production_with_audit_placeholder',
    job: {
      jobCode: 'job_persist_001',
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
      notes: ['Benchmark audit shell consumed by Layer 8 smoke path.'],
      metadata: {}
    },
    metadata: {
      source: 'smoke-layer8'
    }
  })
);

const benchmarkAudit = auditBenchmark(
  benchmarkAuditInputSchema.parse({
    requestCode: 'benchmark_audit_persist_001',
    packageReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'pkg_persist_001',
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
      source: 'smoke-layer8'
    }
  })
);

const ingestionResult = ingestPackageShell(
  ingestionInputSchema.parse({
    requestCode: 'ingest_smoke_001',
    packageReference: {
      packetRef: {
        packetKind: 'production_package',
        packetCode: 'pkg_persist_001',
        packetVersion: 1
      },
      productionPackage
    },
    benchmarkAuditReference: {
      packetRef: {
        packetKind: 'benchmark_audit',
        packetCode: 'benchmark_audit_persist_001',
        packetVersion: 1
      },
      benchmarkAudit
    },
    metadata: {
      source: 'smoke-layer8'
    }
  })
);

const persistenceResult = persistLineageShell(
  persistenceInputSchema.parse({
    requestCode: 'persist_smoke_001',
    ingestion: ingestionResult,
    metadata: {
      source: 'smoke-layer8'
    }
  })
);

console.log(
  JSON.stringify(
    {
      ingestionCode: ingestionResult.ingestionCode,
      persistenceCode: persistenceResult.persistenceCode,
      ingestionStatus: ingestionResult.processingStatus,
      persistenceDecision: persistenceResult.decision.decision,
      artifactCount: ingestionResult.artifacts.length,
      nodeCount: persistenceResult.summary.nodeCount,
      edgeCount: persistenceResult.summary.edgeCount
    },
    null,
    2
  )
);
