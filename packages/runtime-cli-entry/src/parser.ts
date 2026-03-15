import {
  executionPortRequestSchema,
  type ExecutionPortRequest
} from '../../runtime-execution-port/src/contracts.js';

import {
  cliEntryInputSchema,
  type CliEntryInput
} from './contracts.js';

export const parseCliEntryInput = (rawInput: CliEntryInput): CliEntryInput =>
  cliEntryInputSchema.parse(rawInput);

export const mapCliInputToExecutionPortRequest = (
  rawInput: CliEntryInput
): ExecutionPortRequest => {
  const input = parseCliEntryInput(rawInput);

  return executionPortRequestSchema.parse({
    portMode: 'studio_runtime_request',
    runtimeRequest: input.runtimeRequest
  });
};
