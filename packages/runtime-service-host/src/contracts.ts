import { z } from 'zod';

export const runtimeServiceHostOptionsSchema = z.object({
  host: z.string().min(1).default('127.0.0.1'),
  port: z.coerce.number().int().positive(),
  sessionStorePath: z.string().min(1),
  queueStorePath: z.string().min(1),
  logsFilePath: z.string().min(1),
  synchronousQueueFallback: z.boolean().default(true)
});

export const runtimeServiceHostSnapshotSchema = z.object({
  host: z.string().min(1),
  port: z.coerce.number().int().positive(),
  sessionCount: z.coerce.number().int().nonnegative(),
  queuedJobCount: z.coerce.number().int().nonnegative(),
  logsFilePath: z.string().min(1)
});

export type RuntimeServiceHostOptions = z.infer<
  typeof runtimeServiceHostOptionsSchema
>;
export type RuntimeServiceHostSnapshot = z.infer<
  typeof runtimeServiceHostSnapshotSchema
>;
