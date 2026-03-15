import { z } from 'zod';

import { reviewProjectionResponseSchema } from '../../review-worklist-projection/src/contracts.js';
import { orchestrationChainRequestShellSchema } from '../../runtime-orchestration-boundary/src/contracts.js';

export const studioJobLifecycleStatusSchema = z.enum([
  'ready',
  'dispatched',
  'completed',
  'failed'
]);

export const studioJobDispatchRequestSchema = z.discriminatedUnion('jobType', [
  z.object({
    jobCode: z.string().min(1),
    jobType: z.literal('generation_execution_job'),
    input: orchestrationChainRequestShellSchema
  }),
  z.object({
    jobCode: z.string().min(1),
    jobType: z.literal('benchmark_review_job'),
    input: reviewProjectionResponseSchema
  }),
  z.object({
    jobCode: z.string().min(1),
    jobType: z.literal('persistence_review_job'),
    input: reviewProjectionResponseSchema
  }),
  z.object({
    jobCode: z.string().min(1),
    jobType: z.literal('lineage_review_job'),
    input: reviewProjectionResponseSchema
  })
]);

export const studioJobDispatchResultSchema = z.object({
  jobCode: z.string().min(1),
  jobType: z.enum([
    'generation_execution_job',
    'benchmark_review_job',
    'persistence_review_job',
    'lineage_review_job'
  ]),
  lifecycle: z.array(studioJobLifecycleStatusSchema).min(2),
  finalStatus: studioJobLifecycleStatusSchema,
  detail: z.string().min(1)
});

export type StudioJobDispatchRequest = z.infer<
  typeof studioJobDispatchRequestSchema
>;
export type StudioJobDispatchResult = z.infer<
  typeof studioJobDispatchResultSchema
>;
