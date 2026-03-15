import { z } from 'zod';

import {
  studioJobDispatchRequestSchema,
  studioJobDispatchResultSchema
} from '@mikage/studio-job-orchestration';

export const realQueueBackendOptionsSchema = z.object({
  projectSlug: z.string().min(1).default('mikage'),
  synchronousFallback: z.boolean().default(false)
});

export const realQueueRecordSchema = z.object({
  jobCode: z.string().min(1),
  jobType: z.enum([
    'generation_execution_job',
    'benchmark_review_job',
    'persistence_review_job',
    'lineage_review_job'
  ]),
  status: z.enum(['queued', 'running', 'completed', 'failed']),
  request: studioJobDispatchRequestSchema,
  result: studioJobDispatchResultSchema.nullable()
});

export const claimedQueueJobSchema = z.object({
  jobCode: z.string().min(1),
  request: studioJobDispatchRequestSchema
});
