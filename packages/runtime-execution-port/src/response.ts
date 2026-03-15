import { executionPortResponseSchema, type ExecutionPortResponse } from './contracts.js';

import type { OrchestrationChainResultShell } from '../../runtime-orchestration-boundary/src/contracts.js';

export const normalizeExecutionPortResponse = (
  runtimeResult: OrchestrationChainResultShell
): ExecutionPortResponse =>
  executionPortResponseSchema.parse({
    portMode: 'studio_runtime_request',
    requestCode: runtimeResult.requestCode,
    commandType: 'execute_generation_pipeline',
    finalStatus: runtimeResult.finalStatus,
    runtimeResult,
    summary: {
      requestCode: runtimeResult.requestCode,
      commandType: 'execute_generation_pipeline',
      finalStatus: runtimeResult.finalStatus,
      executedStepCount: runtimeResult.executedSteps.length,
      stopped: runtimeResult.finalStatus !== 'completed'
    }
  });
