import { executeStudioRuntimeRequest } from '../../runtime-execution-port/src/index.js';

import {
  cliEntryOutputSchema,
  type CliEntryInput,
  type CliEntryOutput
} from './contracts.js';
import { mapCliInputToExecutionPortRequest, parseCliEntryInput } from './parser.js';

export const runCliEntry = (rawInput: CliEntryInput): CliEntryOutput => {
  const input = parseCliEntryInput(rawInput);
  const executionPortRequest = mapCliInputToExecutionPortRequest(input);
  const execution = executeStudioRuntimeRequest(executionPortRequest);

  return cliEntryOutputSchema.parse({
    entryMode: input.entryMode,
    requestCode: execution.requestCode,
    execution,
    summary: {
      requestCode: execution.requestCode,
      finalStatus: execution.finalStatus,
      stopped: execution.summary.stopped,
      executedStepCount: execution.summary.executedStepCount
    }
  });
};
