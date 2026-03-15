import { buildBenchmarkSummaryProjection } from '../packages/persistence-read-port/src/index.ts';
import { runStudioSessionApplication } from '../packages/studio-session-application/src/index.ts';

const executionSession = runStudioSessionApplication({
  sessionCode: 'session_app_exec_001',
  runtimeRequest: {
    commandType: 'execute_generation_pipeline',
    request: {
      requestCode: 'session_app_runtime_001',
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
          packetCode: 'ctx_session_app_001',
          packetVersion: 1
        }
      ],
      canonQueryMode: 'blocking',
      sceneBuilderMode: 'scene_seeded',
      scriptBuilderMode: 'outline_only',
      productionPackageMode: 'benchmark_audit_shell',
      benchmarkAudit: {},
      metadata: {}
    },
    compileProfile: {
      compileMode: 'production_prompt',
      systemFrame: 'Preserve canonical tone.',
      canonConstraints: ['mikage', 'rooftop confrontation', 'framing'],
      contextSummaries: ['Mikage on rooftop confrontation.'],
      fragmentSummaries: ['Mikage remains focused and battle-worn.'],
      modeInstructions: ['Emphasize canonical framing.'],
      outputInstructions: ['Return concise prompt text.'],
      negativeClauses: ['low detail']
    },
    validationProfile: {
      ontologyRequiredTerms: ['mikage'],
      invariantRequiredTerms: ['rooftop confrontation'],
      philosophicalRequiredTerms: ['tone'],
      characterRequiredTerms: ['battle-worn'],
      visualRequiredTerms: ['framing']
    },
    benchmarkProfile: {
      goldReferenceTerms: ['mikage', 'rooftop confrontation'],
      silverReferenceTerms: ['framing'],
      redBlockedTerms: ['spaceship invasion']
    },
    studioProfile: {
      actionType: 'queue_persistence_review',
      panelCode: 'panel_session',
      panelTitle: 'Session',
      viewCode: 'view_session',
      filterCode: 'filter_session',
      filterTerms: []
    }
  },
  selectionContext: {
    selectedCode: 'pkg_session_app_runtime_001',
    selectedKind: 'package'
  }
});

const updatedSession = runStudioSessionApplication({
  sessionCode: 'session_app_update_001',
  previousSession: executionSession.session,
  worklistRequest: {
    benchmarkSummary: buildBenchmarkSummaryProjection('pkg_session_app_runtime_001')
  },
  selectionContext: {
    selectedCode: 'pkg_session_app_runtime_001',
    selectedKind: 'package'
  },
  activeReviewContext: {
    reviewCode: 'pkg_session_app_runtime_001_benchmark',
    reviewCategory: 'benchmark_review'
  }
});

console.log(
  JSON.stringify(
    {
      executionSnapshot: executionSession.snapshotCode,
      updatedContinuity: updatedSession.continuityCode,
      activeReview: updatedSession.activeReviewContext
    },
    null,
    2
  )
);
