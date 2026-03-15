import { projectReviewWorklist } from '../../review-worklist-projection/src/index.js';
import { executeStudioApplication } from '../../studio-application-facade/src/index.js';
import { executeStudioQuery } from '../../studio-query-boundary/src/index.js';
import {
  buildExecutionEnvelope,
  buildQueryEnvelope,
  buildWorklistEnvelope
} from '../../transport-prep-boundary/src/index.js';

import {
  studioRouteAdapterRequestSchema,
  studioRouteAdapterResponseSchema,
  type StudioRouteAdapterRequest,
  type StudioRouteAdapterResponse
} from './contracts.js';

export const dispatchStudioRoute = (
  rawInput: StudioRouteAdapterRequest
): StudioRouteAdapterResponse => {
  const input = studioRouteAdapterRequestSchema.parse(rawInput);

  switch (input.routeCode) {
    case 'runtime_execution_route': {
      const facadeResponse = executeStudioApplication({
        facadeMode: 'studio_runtime_execution',
        runtimeRequest: input.input.runtimeRequest
      });
      const envelope = buildExecutionEnvelope(facadeResponse.execution);

      return studioRouteAdapterResponseSchema.parse({
        routeCode: input.routeCode,
        executionEnvelope: envelope,
        queryEnvelope: null,
        worklistEnvelope: null,
        error:
          envelope.status === 'error'
            ? {
                code: 'route_execution_stopped',
                message: envelope.error ?? 'Execution stopped.'
              }
            : null
      });
    }
    case 'studio_query_route': {
      const queryResponse = executeStudioQuery(input.input);
      const envelope = buildQueryEnvelope(queryResponse);

      return studioRouteAdapterResponseSchema.parse({
        routeCode: input.routeCode,
        executionEnvelope: null,
        queryEnvelope: envelope,
        worklistEnvelope: null,
        error:
          envelope.status === 'error'
            ? {
                code: 'route_execution_stopped',
                message: envelope.error ?? 'Query returned no record.'
              }
            : null
      });
    }
    case 'worklist_projection_route': {
      const projectionResponse = projectReviewWorklist(input.input);
      const envelope = buildWorklistEnvelope(projectionResponse);

      return studioRouteAdapterResponseSchema.parse({
        routeCode: input.routeCode,
        executionEnvelope: null,
        queryEnvelope: null,
        worklistEnvelope: envelope,
        error: null
      });
    }
  }
};
