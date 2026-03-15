import { z } from 'zod';

import {
  orchestrationChainRequestShellSchema,
  orchestrationFinalStatusShellSchema,
  orchestrationStepSummaryShellSchema,
  runtimeCommandTypeSchema
} from '../../runtime-orchestration-boundary/src/contracts.js';

export const executionPortModeSchema = z.literal('studio_runtime_request');

export const executionPortRequestSchema = z.object({
  portMode: executionPortModeSchema,
  runtimeRequest: orchestrationChainRequestShellSchema
});

export const executionPortSummarySchema = z.object({
  requestCode: z.string().min(1),
  commandType: runtimeCommandTypeSchema,
  finalStatus: orchestrationFinalStatusShellSchema,
  executedStepCount: z.coerce.number().int().nonnegative(),
  stopped: z.boolean()
});

export const executionPortResponseSchema = z.object({
  portMode: executionPortModeSchema,
  requestCode: z.string().min(1),
  commandType: runtimeCommandTypeSchema,
  finalStatus: orchestrationFinalStatusShellSchema,
  runtimeResult: z.object({
    requestCode: z.string().min(1),
    compileMode: z.literal('production_prompt'),
    validationDecision: z.enum(['accepted', 'rejected']),
    packageCode: z.string().min(1).nullable(),
    benchmarkDecision: z.enum(['approved', 'review', 'rejected']).nullable(),
    ingestionCode: z.string().min(1).nullable(),
    persistenceCode: z.string().min(1).nullable(),
    studioActionType: z
      .enum([
        'inspect_package',
        'inspect_validation',
        'inspect_lineage',
        'queue_generation',
        'queue_benchmark_review',
        'queue_persistence_review'
      ])
      .nullable(),
    finalStatus: orchestrationFinalStatusShellSchema,
    executedSteps: z.array(orchestrationStepSummaryShellSchema)
  }),
  summary: executionPortSummarySchema
});

export type ExecutionPortMode = z.infer<typeof executionPortModeSchema>;
export type ExecutionPortRequest = z.infer<typeof executionPortRequestSchema>;
export type ExecutionPortSummary = z.infer<typeof executionPortSummarySchema>;
export type ExecutionPortResponse = z.infer<typeof executionPortResponseSchema>;
