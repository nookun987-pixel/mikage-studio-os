import { compileRequestSchema } from '@mikage/contracts';
import { compilePrompt } from '../packages/prompt-compiler/src/index.ts';

const request = compileRequestSchema.parse({
  requestCode: 'compile_smoke_001',
  projectSlug: 'mikage',
  presetCode: 'mikage_cinematic_portrait',
  variantCode: 'storm_rooftop_action',
  compileMode: 'production_prompt',
  systemFrame: 'Preserve canonical tone and compile a stable production-safe prompt.',
  canonConstraints: [
    'Do not introduce non-canonical characters.',
    'Preserve rooftop confrontation framing.'
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
          summary: 'Mikage is focused, battle-worn, and framed as the dominant subject.',
          metadata: {}
        },
        {
          fragmentCode: 'frag_scene_001',
          label: 'Scene',
          summary: 'The confrontation moment is paused at peak stillness before action resumes.',
          metadata: {}
        }
      ],
      metadata: {}
    }
  ],
  modePayload: {
    title: 'Production Prompt Payload',
    instructions: [
      'Favor cinematic visual language.',
      'Keep composition low-angle and emotionally restrained.'
    ]
  },
  outputInstructions: [
    'Return concise, production-safe prompt text.',
    'Keep prompt sections interpretable by downstream systems.'
  ],
  negativePrompt: {
    clauses: ['low detail', 'anatomical distortion', 'off-model face']
  },
  lineage: {
    requestCode: 'compile_smoke_001',
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
    source: 'smoke-layer4'
  }
});

const result = compilePrompt(request);

console.log(
  JSON.stringify(
    {
      requestCode: result.requestCode,
      compileMode: result.compileMode,
      sectionKeys: result.sections.map((section) => section.key),
      compiledPromptLength: result.compiledPrompt.length,
      negativePrompt: result.negativePrompt.rendered,
      validation: result.validation.valid
    },
    null,
    2
  )
);
