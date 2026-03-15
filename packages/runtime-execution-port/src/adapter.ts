import { executeGenerationPipeline } from '../../runtime-orchestration-boundary/src/index.js';

import {
  executionPortRequestSchema,
  type ExecutionPortRequest,
  type ExecutionPortResponse
} from './contracts.js';
import { mapExecutionPortRequestToRuntimeCommand } from './mapper.js';
import { normalizeExecutionPortResponse } from './response.js';

export const executeStudioRuntimeRequest = (
  rawInput: ExecutionPortRequest
): ExecutionPortResponse => {
  const input = executionPortRequestSchema.parse(rawInput);
  const mappedCommand = mapExecutionPortRequestToRuntimeCommand(input);
  const runtimeResult = executeGenerationPipeline(mappedCommand.runtimeRequest);

  return normalizeExecutionPortResponse(runtimeResult);
};
