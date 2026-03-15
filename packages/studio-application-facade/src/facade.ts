import { executeStudioRuntimeRequest } from '../../runtime-execution-port/src/index.js';

import {
  studioFacadeRequestSchema,
  studioFacadeResponseSchema,
  type StudioFacadeRequest,
  type StudioFacadeResponse
} from './contracts.js';

export const executeStudioApplication = (
  rawInput: StudioFacadeRequest
): StudioFacadeResponse => {
  const input = studioFacadeRequestSchema.parse(rawInput);
  const execution = executeStudioRuntimeRequest({
    portMode: 'studio_runtime_request',
    runtimeRequest: input.runtimeRequest
  });

  return studioFacadeResponseSchema.parse({
    facadeMode: input.facadeMode,
    requestCode: execution.requestCode,
    execution,
    summary: {
      requestCode: execution.requestCode,
      finalStatus: execution.finalStatus,
      packageCode: execution.runtimeResult.packageCode,
      studioActionType: execution.runtimeResult.studioActionType,
      stopped: execution.summary.stopped
    }
  });
};
