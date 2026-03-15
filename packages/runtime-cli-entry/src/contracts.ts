import { z } from 'zod';

import {
  executionPortResponseSchema
} from '../../runtime-execution-port/src/contracts.js';
import { orchestrationChainRequestShellSchema } from '../../runtime-orchestration-boundary/src/contracts.js';

export const cliEntryModeSchema = z.literal('runtime_cli_input');

export const cliEntryInputSchema = z.object({
  entryMode: cliEntryModeSchema,
  runtimeRequest: orchestrationChainRequestShellSchema
});

export const cliExecutionSummarySchema = z.object({
  requestCode: z.string().min(1),
  finalStatus: executionPortResponseSchema.shape.finalStatus,
  stopped: z.boolean(),
  executedStepCount: z.coerce.number().int().nonnegative()
});

export const cliEntryOutputSchema = z.object({
  entryMode: cliEntryModeSchema,
  requestCode: z.string().min(1),
  execution: executionPortResponseSchema,
  summary: cliExecutionSummarySchema
});

export type CliEntryInput = z.infer<typeof cliEntryInputSchema>;
export type CliExecutionSummary = z.infer<typeof cliExecutionSummarySchema>;
export type CliEntryOutput = z.infer<typeof cliEntryOutputSchema>;
