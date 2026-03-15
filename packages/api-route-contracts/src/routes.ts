import {
  runtimeExecutionRouteContractSchema,
  studioQueryRouteContractSchema,
  worklistProjectionRouteContractSchema
} from './contracts.js';

export const runtimeExecutionRoute = runtimeExecutionRouteContractSchema.parse({
  routeCode: 'runtime_execution_route',
  method: 'POST',
  inputContract: {
    portMode: 'studio_runtime_request',
    runtimeRequest: {
      commandType: 'execute_generation_pipeline',
      request: {
        requestCode: 'route_runtime_placeholder',
        projectSlug: 'mikage',
        characterCode: 'char_mikage',
        anchorCode: 'anchor_leia_041',
        presetCode: 'mikage_cinematic_portrait',
        variantCode: 'storm_rooftop_action',
        sceneCode: 'scene_rooftop_confrontation',
        shotCode: 'shot_low_angle_heroic_damaged_stillness',
        providerCode: 'mock_image_provider',
        outputCount: 4,
        contextPackets: [],
        canonQueryMode: 'blocking',
        sceneBuilderMode: 'scene_seeded',
        scriptBuilderMode: 'outline_only',
        productionPackageMode: 'benchmark_audit_shell',
        benchmarkAudit: {},
        metadata: {}
      },
      compileProfile: {
        compileMode: 'production_prompt',
        systemFrame: 'placeholder',
        canonConstraints: ['placeholder'],
        contextSummaries: ['placeholder'],
        fragmentSummaries: ['placeholder'],
        modeInstructions: ['placeholder'],
        outputInstructions: ['placeholder'],
        negativeClauses: ['placeholder']
      },
      validationProfile: {},
      benchmarkProfile: {},
      studioProfile: {
        actionType: 'queue_persistence_review',
        panelCode: 'panel_placeholder',
        panelTitle: 'placeholder',
        viewCode: 'view_placeholder',
        filterCode: 'filter_placeholder',
        filterTerms: []
      }
    }
  },
  outputContract: {
    portMode: 'studio_runtime_request',
    requestCode: 'route_runtime_placeholder',
    commandType: 'execute_generation_pipeline',
    finalStatus: 'completed',
    runtimeResult: {
      requestCode: 'route_runtime_placeholder',
      compileMode: 'production_prompt',
      validationDecision: 'accepted',
      packageCode: 'pkg_route_runtime_placeholder',
      benchmarkDecision: 'approved',
      ingestionCode: 'ing_route_runtime_placeholder',
      persistenceCode: 'persist_route_runtime_placeholder',
      studioActionType: 'queue_persistence_review',
      finalStatus: 'completed',
      executedSteps: []
    },
    summary: {
      requestCode: 'route_runtime_placeholder',
      commandType: 'execute_generation_pipeline',
      finalStatus: 'completed',
      executedStepCount: 0,
      stopped: false
    }
  },
  transportEnvelope: {
    status: 'ok',
    payload: {
      portMode: 'studio_runtime_request',
      requestCode: 'route_runtime_placeholder',
      commandType: 'execute_generation_pipeline',
      finalStatus: 'completed',
      runtimeResult: {
        requestCode: 'route_runtime_placeholder',
        compileMode: 'production_prompt',
        validationDecision: 'accepted',
        packageCode: 'pkg_route_runtime_placeholder',
        benchmarkDecision: 'approved',
        ingestionCode: 'ing_route_runtime_placeholder',
        persistenceCode: 'persist_route_runtime_placeholder',
        studioActionType: 'queue_persistence_review',
        finalStatus: 'completed',
        executedSteps: []
      },
      summary: {
        requestCode: 'route_runtime_placeholder',
        commandType: 'execute_generation_pipeline',
        finalStatus: 'completed',
        executedStepCount: 0,
        stopped: false
      }
    },
    error: null,
    metadata: {}
  }
});

export const studioQueryRoute = studioQueryRouteContractSchema.parse({
  routeCode: 'studio_query_route',
  method: 'GET',
  inputContract: {
    operation: 'package_summary_lookup',
    recordCode: 'pkg_route_query_placeholder'
  },
  outputContract: {
    operation: 'package_summary_lookup',
    recordCode: 'pkg_route_query_placeholder',
    found: true,
    packageSummary: {
      packageCode: 'pkg_route_query_placeholder',
      projectSlug: 'mikage',
      outputCount: 4,
      status: 'validated'
    },
    validationSummary: null,
    benchmarkSummary: null,
    ingestionSummary: null,
    lineageSummary: null,
    summary: {
      operation: 'package_summary_lookup',
      recordCode: 'pkg_route_query_placeholder',
      found: true,
      resultKind: 'package_summary'
    }
  },
  transportEnvelope: {
    status: 'ok',
    payload: {
      operation: 'package_summary_lookup',
      recordCode: 'pkg_route_query_placeholder',
      found: true,
      packageSummary: {
        packageCode: 'pkg_route_query_placeholder',
        projectSlug: 'mikage',
        outputCount: 4,
        status: 'validated'
      },
      validationSummary: null,
      benchmarkSummary: null,
      ingestionSummary: null,
      lineageSummary: null,
      summary: {
        operation: 'package_summary_lookup',
        recordCode: 'pkg_route_query_placeholder',
        found: true,
        resultKind: 'package_summary'
      }
    },
    error: null,
    metadata: {}
  }
});

export const worklistProjectionRoute = worklistProjectionRouteContractSchema.parse({
  routeCode: 'worklist_projection_route',
  method: 'POST',
  inputContract: {
    projectionCode: 'worklist_projection_placeholder'
  },
  outputContract: {
    items: [],
    summary: {
      totalItems: 0,
      categories: []
    }
  },
  transportEnvelope: {
    status: 'ok',
    payload: {
      items: [],
      summary: {
        totalItems: 0,
        categories: []
      }
    },
    error: null,
    metadata: {}
  }
});
