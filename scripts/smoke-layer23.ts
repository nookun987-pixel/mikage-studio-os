import { dispatchStudioJob } from '../packages/studio-job-orchestration/src/index.ts';
import { projectReviewWorklist } from '../packages/review-worklist-projection/src/index.ts';
import { buildLineageSummaryProjection } from '../packages/persistence-read-port/src/index.ts';

const generationJob = dispatchStudioJob({
  jobCode: 'job_generation_001',
  jobType: 'generation_execution_job',
  input: {
    commandType: 'execute_generation_pipeline',
    request: {
      requestCode: 'job_generation_runtime_001',
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
          packetCode: 'ctx_job_generation_001',
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
      panelCode: 'panel_job',
      panelTitle: 'Job',
      viewCode: 'view_job',
      filterCode: 'filter_job',
      filterTerms: []
    }
  }
});

const reviewProjection = projectReviewWorklist({
  lineageSummary: buildLineageSummaryProjection('persist_job_runtime_001')
});

const persistenceReviewJob = dispatchStudioJob({
  jobCode: 'job_persistence_001',
  jobType: 'persistence_review_job',
  input: {
    ...reviewProjection,
    items: [
      ...reviewProjection.items,
      {
        itemCode: 'manual_persistence_review_001',
        category: 'persistence_review',
        title: 'Persistence Review',
        targetCode: 'persist_job_runtime_001',
        sortKey: '1_manual',
        status: 'ready',
        metadata: {}
      }
    ]
  }
});

const lineageReviewJob = dispatchStudioJob({
  jobCode: 'job_lineage_001',
  jobType: 'lineage_review_job',
  input: reviewProjection
});

console.log(
  JSON.stringify(
    {
      generationJob,
      persistenceReviewJob,
      lineageReviewJob
    },
    null,
    2
  )
);
