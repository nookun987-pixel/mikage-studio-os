import { executeStudioRuntimeRequest } from '../packages/runtime-execution-port/src/index.ts';
import { executionPortRequestSchema } from '../packages/runtime-execution-port/src/contracts.ts';
import { executeStudioQuery } from '../packages/studio-query-boundary/src/index.ts';
import { projectReviewWorklist } from '../packages/review-worklist-projection/src/index.ts';
import {
  buildExecutionEnvelope,
  buildQueryEnvelope,
  buildWorklistEnvelope
} from '../packages/transport-prep-boundary/src/index.ts';
import {
  buildSessionFromExecutionEnvelope,
  buildSessionFromQueryEnvelope,
  buildSessionFromWorklistEnvelope
} from '../packages/studio-session-boundary/src/index.ts';
import { orchestrationChainRequestShellSchema } from '../packages/runtime-orchestration-boundary/src/contracts.ts';

const runtimeRequest = orchestrationChainRequestShellSchema.parse({
  commandType: 'execute_generation_pipeline',
  request: {
    requestCode: 'session_runtime_001',
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
        packetCode: 'ctx_session_001',
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
    systemFrame:
      'Preserve canonical tone, atmospheric stillness, and battle-worn focus while compiling a stable production-safe prompt.',
    canonConstraints: ['mikage', 'rooftop confrontation', 'canonical framing'],
    contextSummaries: ['Mikage on rooftop confrontation with canonical framing.'],
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
    goldReferenceTerms: ['mikage', 'canonical framing', 'rooftop confrontation'],
    silverReferenceTerms: ['atmospheric stillness'],
    redBlockedTerms: ['spaceship invasion']
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

const execution = executeStudioRuntimeRequest(
  executionPortRequestSchema.parse({
    portMode: 'studio_runtime_request',
    runtimeRequest
  })
);
const executionEnvelope = buildExecutionEnvelope(execution);
const executionSession = buildSessionFromExecutionEnvelope(executionEnvelope);

const query = executeStudioQuery({
  operation: 'package_summary_lookup',
  recordCode: execution.runtimeResult.packageCode ?? 'pkg_missing'
});
const queryEnvelope = buildQueryEnvelope(query);
const querySession = buildSessionFromQueryEnvelope(queryEnvelope);

const worklist = projectReviewWorklist({
  runtimeExecution: execution,
  packageSummary: query.packageSummary ?? undefined
});
const worklistEnvelope = buildWorklistEnvelope(worklist);
const worklistSession = buildSessionFromWorklistEnvelope(worklistEnvelope);

console.log(
  JSON.stringify(
    {
      executionSession: executionSession.sessionCode,
      querySession: querySession.sessionCode,
      worklistSession: worklistSession.sessionCode
    },
    null,
    2
  )
);
