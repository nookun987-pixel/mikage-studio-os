import { z } from 'zod';

export const runtimeHostConfigSchema = z.object({
  host: z.string().min(1).default('127.0.0.1'),
  port: z.coerce.number().int().positive().default(43130)
});

export const runtimeStorageConfigSchema = z.object({
  rootPath: z.string().min(1),
  sessionsFilePath: z.string().min(1),
  queueFilePath: z.string().min(1),
  logsFilePath: z.string().min(1),
  artifactsPath: z.string().min(1)
});

export const runtimeQueueConfigSchema = z.object({
  synchronousFallback: z.boolean().default(true)
});

export const runtimeDiagnosticsConfigSchema = z.object({
  healthPath: z.literal('/health').default('/health'),
  readinessPath: z.literal('/ready').default('/ready'),
  diagnosticsPath: z.literal('/diagnostics').default('/diagnostics')
});

export const runtimeConfigSchema = z.object({
  host: runtimeHostConfigSchema,
  storage: runtimeStorageConfigSchema,
  queue: runtimeQueueConfigSchema,
  diagnostics: runtimeDiagnosticsConfigSchema
});

export type RuntimeConfig = z.infer<typeof runtimeConfigSchema>;
