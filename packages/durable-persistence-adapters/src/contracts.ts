import { z } from 'zod';

import { studioJobDispatchResultSchema } from '@mikage/studio-job-orchestration';
import { studioSessionApplicationResponseSchema } from '@mikage/studio-session-application';

export const durablePersistenceOptionsSchema = z.object({
  projectSlug: z.string().min(1).default('mikage'),
  fallbackSessionFilePath: z.string().min(1).optional(),
  fallbackQueueFilePath: z.string().min(1).optional()
});

export const durableSessionArchiveSchema = z.object({
  archiveCode: z.string().min(1),
  sessionCode: z.string().min(1),
  continuityCode: z.string().min(1),
  snapshotCode: z.string().min(1),
  storageMode: z.enum(['database', 'fallback_file'])
});

export const durableJobStatusSchema = z.enum([
  'queued',
  'running',
  'completed',
  'failed'
]);

export const durableJobRecordSchema = z.object({
  jobCode: z.string().min(1),
  status: durableJobStatusSchema,
  result: studioJobDispatchResultSchema.nullable(),
  storageMode: z.enum(['database', 'fallback_file'])
});

export const durableSessionRecordSchema = z.object({
  session: studioSessionApplicationResponseSchema,
  storageMode: z.enum(['database', 'fallback_file'])
});

export type DurablePersistenceOptions = z.infer<
  typeof durablePersistenceOptionsSchema
>;
export type DurableJobStatus = z.infer<typeof durableJobStatusSchema>;
