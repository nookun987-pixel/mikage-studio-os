import { executeStudioRuntimeRequest } from '../packages/runtime-execution-port/src/index.ts';
import { executionPortRequestSchema } from '../packages/runtime-execution-port/src/contracts.ts';
import { orchestrationChainRequestShellSchema } from '../packages/runtime-orchestration-boundary/src/contracts.ts';

const buildBaseRuntimeRequest = (requestCode: string) =>
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
        tags: ['layer12', 'smoke']
      },
      metadata: {
        initiatedBy: 'smoke-layer12'
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

const buildPortRequest = (requestCode: string) =>
  executionPortRequestSchema.parse({
    portMode: 'studio_runtime_request',
    runtimeRequest: buildBaseRuntimeRequest(requestCode)
  });

const happyPath = executeStudioRuntimeRequest(buildPortRequest('port_happy_001'));

const validationRejected = executeStudioRuntimeRequest(
  executionPortRequestSchema.parse({
    ...buildPortRequest('port_validation_reject_001'),
    runtimeRequest: orchestrationChainRequestShellSchema.parse({
      ...buildBaseRuntimeRequest('port_validation_reject_001'),
      validationProfile: {
        ...buildBaseRuntimeRequest('port_validation_reject_001').validationProfile,
        ontologyRequiredTerms: ['missing_required_term']
      }
    })
  })
);

console.log(
  JSON.stringify(
    {
      happyPath: {
        requestCode: happyPath.requestCode,
        finalStatus: happyPath.finalStatus,
        stopped: happyPath.summary.stopped,
        executedStepCount: happyPath.summary.executedStepCount
      },
      validationRejected: {
        requestCode: validationRejected.requestCode,
        finalStatus: validationRejected.finalStatus,
        stopped: validationRejected.summary.stopped,
        executedStepCount: validationRejected.summary.executedStepCount
      }
    },
    null,
    2
  )
);
