import { compileRequestSchema, productionPackageInputSchema } from '@mikage/contracts';
import { compilePrompt } from '../packages/prompt-compiler/src/index.ts';
import { validateCanon } from '../packages/canon-validator/src/index.ts';
import { assembleProductionPackage } from '../packages/production-assembler/src/index.ts';

const compileRequest = compileRequestSchema.parse({
  requestCode: 'package_compile_smoke_001',
  projectSlug: 'mikage',
  presetCode: 'mikage_cinematic_portrait',
  variantCode: 'storm_rooftop_action',
  compileMode: 'production_prompt',
  systemFrame: 'Preserve canonical tone and compile a stable production-safe prompt.',
  canonConstraints: [
    'mikage',
    'rooftop confrontation',
    'canonical framing'
  ],
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
    requestCode: 'package_compile_smoke_001',
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
    source: 'smoke-layer6'
  }
});

const compiledPrompt = compilePrompt(compileRequest);

const validationResult = validateCanon({
  requestCode: 'package_validation_smoke_001',
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
    source: 'smoke-layer6'
  }
});

const packageInput = productionPackageInputSchema.parse({
  requestCode: 'package_request_smoke_001',
  packageCode: 'pkg_smoke_001',
  packageMode: 'production_with_audit_placeholder',
  job: {
    jobCode: 'job_smoke_001',
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
    notes: ['Benchmark audit not implemented in Layer 6.'],
    metadata: {}
  },
  metadata: {
    source: 'smoke-layer6'
  }
});

const result = assembleProductionPackage(packageInput);

console.log(
  JSON.stringify(
    {
      packageCode: result.packageCode,
      status: result.status,
      decision: result.decision.decision,
      sectionCount: result.summary.sectionCount,
      benchmarkAuditStatus: result.summary.benchmarkAuditStatus,
      outputCount: result.summary.outputCount
    },
    null,
    2
  )
);
