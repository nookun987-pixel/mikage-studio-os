import { z } from 'zod';

export const runtimeHealthResponseSchema = z.object({
  status: z.enum(['ok', 'degraded']),
  host: z.string().min(1),
  port: z.coerce.number().int().positive()
});

export const runtimeReadinessResponseSchema = z.object({
  status: z.enum(['ready', 'not_ready']),
  checks: z.object({
    sessionStore: z.boolean(),
    queueStore: z.boolean(),
    composition: z.boolean()
  })
});

export const runtimeDiagnosticsResponseSchema = z.object({
  status: z.literal('ok'),
  host: z.object({
    host: z.string().min(1),
    port: z.coerce.number().int().positive(),
    sessionCount: z.coerce.number().int().nonnegative(),
    queuedJobCount: z.coerce.number().int().nonnegative()
  }),
  storage: z.object({
    sessionStorePath: z.string().min(1),
    queueStorePath: z.string().min(1),
    logsFilePath: z.string().min(1)
  }),
  composition: z.object({
    status: z.literal('composed')
  })
});

export type RuntimeHealthResponse = z.infer<typeof runtimeHealthResponseSchema>;
export type RuntimeReadinessResponse = z.infer<
  typeof runtimeReadinessResponseSchema
>;
export type RuntimeDiagnosticsResponse = z.infer<
  typeof runtimeDiagnosticsResponseSchema
>;
