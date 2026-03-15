import {
  canonValidationInputSchema,
  compileRequestSchema
} from '@mikage/contracts';
import { compilePrompt } from '../packages/prompt-compiler/src/index.ts';
import { validateCanon } from '../packages/canon-validator/src/index.ts';

const compileRequest = compileRequestSchema.parse({
  requestCode: 'validation_smoke_compile_001',
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
    requestCode: 'validation_smoke_compile_001',
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
    source: 'smoke-layer5'
  }
});

const compiledPrompt = compilePrompt(compileRequest);

const validationInput = canonValidationInputSchema.parse({
  requestCode: 'validation_smoke_001',
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
    source: 'smoke-layer5'
  }
});

const result = validateCanon(validationInput);

console.log(
  JSON.stringify(
    {
      requestCode: result.requestCode,
      decision: result.decision,
      passOrder: result.passResults.map((item) => item.pass),
      passedChecks: result.summary.passedChecks,
      warningCount: result.summary.warningCount,
      violationCount: result.summary.violationCount
    },
    null,
    2
  )
);
