import { composeRuntimeDeterministicFlow } from '../packages/runtime-composition-root/src/index.ts';

const result = composeRuntimeDeterministicFlow({
  route: {
    routeCode: 'runtime_execution_route',
    input: {
      portMode: 'studio_runtime_request',
      runtimeRequest: {
        commandType: 'execute_generation_pipeline',
        request: {
          requestCode: 'composition_runtime_001',
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
              packetCode: 'ctx_compose_001',
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
          panelCode: 'panel_compose',
          panelTitle: 'Compose',
          viewCode: 'view_compose',
          filterCode: 'filter_compose',
          filterTerms: []
        }
      }
    }
  },
  job: {
    jobCode: 'job_compose_001',
    jobType: 'persistence_review_job',
    input: {
      items: [
        {
          itemCode: 'compose_persistence_review_item',
          category: 'persistence_review',
          title: 'Persistence Review',
          targetCode: 'persist_compose_001',
          sortKey: '1_compose',
          status: 'ready',
          metadata: {}
        }
      ],
      summary: {
        totalItems: 1,
        categories: ['persistence_review']
      }
    }
  },
  session: {
    sessionCode: 'session_compose_001',
    worklistRequest: {
      packageSummary: {
        packageCode: 'pkg_compose_001',
        projectSlug: 'mikage',
        outputCount: 4,
        status: 'validated'
      }
    }
  }
});

console.log(
  JSON.stringify(
    {
      routeStatus: result.route.executionEnvelope?.status ?? null,
      jobStatus: result.job.finalStatus,
      sessionCode: result.session.session.sessionCode,
      memory: result.memory
    },
    null,
    2
  )
);
