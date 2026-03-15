import { executeGenerationPipeline } from '../packages/runtime-orchestration-boundary/src/index.ts';
import { orchestrationChainRequestShellSchema } from '../packages/runtime-orchestration-boundary/src/contracts.ts';

const buildBaseRequest = (requestCode: string) =>
  orchestrationChainRequestShellSchema.parse({
    commandType: 'execute_generation_pipeline',
    request: {
      requestCode,
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
        tags: ['layer11', 'smoke']
      },
      metadata: {
        initiatedBy: 'smoke-layer11'
      }
    },
    compileProfile: {
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
      contextSummaries: [
        'Mikage stands on a rain-soaked rooftop under neon skyline lighting in a rooftop confrontation with canonical framing.',
        'State snapshot confirms storm tension, controlled stillness, atmospheric tone, and focused battle-worn restraint.'
      ],
      fragmentSummaries: [
        'Mikage remains battle-worn, focused, and central to the framing.',
        'Scene momentum remains locked to rooftop confrontation, canonical restraint, and atmospheric stillness.'
      ],
      modeInstructions: [
        'Emphasize canonical framing, atmospheric stillness, and neon skyline tone.',
        'Avoid introducing non-canonical supporting subjects.'
      ],
      outputInstructions: [
        'Return concise, production-safe prompt text.',
        'Keep sections interpretable by downstream systems.'
      ],
      negativeClauses: ['low detail', 'anatomical distortion']
    },
    validationProfile: {
      ontologyRequiredTerms: ['mikage'],
      ontologyProhibitedTerms: ['spaceship'],
      ontologyAdvisoryTerms: ['canonical'],
      invariantRequiredTerms: ['rooftop confrontation'],
      invariantProhibitedTerms: ['medieval castle'],
      invariantAdvisoryTerms: ['stillness'],
      philosophicalRequiredTerms: ['tone'],
      philosophicalProhibitedTerms: ['parody'],
      philosophicalAdvisoryTerms: ['atmospheric'],
      characterRequiredTerms: ['battle-worn'],
      characterProhibitedTerms: ['comic relief'],
      characterAdvisoryTerms: ['focused'],
      visualRequiredTerms: ['framing'],
      visualProhibitedTerms: ['low-poly'],
      visualAdvisoryTerms: ['neon'],
      driftRiskTerms: ['experimental remix'],
      driftHardBlockTerms: ['spaceship invasion']
    },
    benchmarkProfile: {
      goldReferenceTerms: ['mikage', 'canonical framing', 'rooftop confrontation'],
      silverReferenceTerms: ['atmospheric stillness', 'neon skyline'],
      redBlockedTerms: ['spaceship invasion', 'parody mode']
    },
    studioProfile: {
      actionType: 'queue_persistence_review',
      panelCode: 'panel_lineage_review',
      panelTitle: 'Lineage Review Queue',
      viewCode: 'view_queue_projection',
      filterCode: 'filter_persistence_review',
      filterTerms: ['persisted', 'accepted']
    }
  });

const happyPath = executeGenerationPipeline(buildBaseRequest('runtime_happy_001'));

const validationRejected = executeGenerationPipeline(
  orchestrationChainRequestShellSchema.parse({
    ...buildBaseRequest('runtime_validation_reject_001'),
    validationProfile: {
      ...buildBaseRequest('runtime_validation_reject_001').validationProfile,
      ontologyRequiredTerms: ['missing_required_term']
    }
  })
);

const benchmarkRejected = executeGenerationPipeline(
  orchestrationChainRequestShellSchema.parse({
    ...buildBaseRequest('runtime_benchmark_reject_001'),
    benchmarkProfile: {
      ...buildBaseRequest('runtime_benchmark_reject_001').benchmarkProfile,
      redBlockedTerms: ['mikage']
    }
  })
);

console.log(
  JSON.stringify(
    {
      happyPath: {
        requestCode: happyPath.requestCode,
        finalStatus: happyPath.finalStatus,
        executedSteps: happyPath.executedSteps.map((step) => step.step)
      },
      validationRejected: {
        requestCode: validationRejected.requestCode,
        finalStatus: validationRejected.finalStatus,
        executedSteps: validationRejected.executedSteps.map((step) => step.step)
      },
      benchmarkRejected: {
        requestCode: benchmarkRejected.requestCode,
        finalStatus: benchmarkRejected.finalStatus,
        executedSteps: benchmarkRejected.executedSteps.map((step) => step.step)
      }
    },
    null,
    2
  )
);
