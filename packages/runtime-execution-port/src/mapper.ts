import { runtimeCommandTypeSchema } from '../../runtime-orchestration-boundary/src/contracts.js';

import {
  executionPortRequestSchema,
  type ExecutionPortRequest
} from './contracts.js';

export const mapExecutionPortRequestToRuntimeCommand = (
  rawInput: ExecutionPortRequest
) => {
  const input = executionPortRequestSchema.parse(rawInput);

  return {
    commandType: runtimeCommandTypeSchema.parse('execute_generation_pipeline'),
    runtimeRequest: input.runtimeRequest
  };
};
