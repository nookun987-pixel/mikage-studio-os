import { dispatchStudioRoute } from '../packages/studio-api-route-adapter/src/index.ts';
import {
  buildBenchmarkSummaryProjection,
  buildLineageSummaryProjection
} from '../packages/persistence-read-port/src/index.ts';

const runtimeRoute = dispatchStudioRoute({
  routeCode: 'runtime_execution_route',
  input: {
    portMode: 'studio_runtime_request',
    runtimeRequest: {
      commandType: 'execute_generation_pipeline',
      request: {
        requestCode: 'route_adapter_runtime_001',
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
        panelCode: 'panel_runtime',
        panelTitle: 'Runtime',
        viewCode: 'view_runtime',
        filterCode: 'filter_runtime',
        filterTerms: []
      }
    }
  }
});

const queryRoute = dispatchStudioRoute({
  routeCode: 'studio_query_route',
  input: {
    operation: 'package_summary_lookup',
    recordCode: 'pkg_route_adapter_runtime_001'
  }
});

const worklistRoute = dispatchStudioRoute({
  routeCode: 'worklist_projection_route',
  input: {
    benchmarkSummary: buildBenchmarkSummaryProjection('pkg_route_adapter_runtime_001'),
    lineageSummary: buildLineageSummaryProjection('persist_route_adapter_runtime_001')
  }
});

console.log(
  JSON.stringify(
    {
      runtimeRoute: runtimeRoute.executionEnvelope?.status ?? null,
      queryRoute: queryRoute.queryEnvelope?.status ?? null,
      worklistRoute: worklistRoute.worklistEnvelope?.status ?? null
    },
    null,
    2
  )
);
