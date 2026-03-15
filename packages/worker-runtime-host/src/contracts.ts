import { z } from 'zod';

export const workerRuntimeHostOptionsSchema = z.object({
  workerCode: z.string().min(1),
  maxBatchSize: z.coerce.number().int().positive().default(1)
});

export const workerRunResultSchema = z.object({
  workerCode: z.string().min(1),
  claimedJobCode: z.string().min(1).nullable(),
  finalStatus: z.enum(['idle', 'completed', 'failed']),
  processedCount: z.coerce.number().int().nonnegative()
});

export const workerRuntimeSnapshotSchema = z.object({
  workerCode: z.string().min(1),
  running: z.boolean(),
  processedCount: z.coerce.number().int().nonnegative(),
  lastJobCode: z.string().min(1).nullable()
});
