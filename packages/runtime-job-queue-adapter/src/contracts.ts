import { z } from 'zod';

import {
  studioJobDispatchRequestSchema,
  studioJobDispatchResultSchema
} from '@mikage/studio-job-orchestration';

export const runtimeQueueOptionsSchema = z.object({
  filePath: z.string().min(1),
  synchronousFallback: z.boolean().default(true)
});

export const queueRecordSchema = z.object({
  jobCode: z.string().min(1),
  status: z.enum(['queued', 'completed', 'failed']),
  result: studioJobDispatchResultSchema.nullable()
});

export const queueSnapshotSchema = z.object({
  jobs: z.record(z.string(), queueRecordSchema)
});

export const enqueueJobRequestSchema = z.object({
  request: studioJobDispatchRequestSchema
});

export type QueueRecord = z.infer<typeof queueRecordSchema>;
