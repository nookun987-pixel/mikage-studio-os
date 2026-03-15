import { z } from 'zod';

export const runtimeStorageBootstrapSummarySchema = z.object({
  rootPath: z.string().min(1),
  sessionsFilePath: z.string().min(1),
  queueFilePath: z.string().min(1),
  logsFilePath: z.string().min(1),
  artifactsPath: z.string().min(1)
});

export type RuntimeStorageBootstrapSummary = z.infer<
  typeof runtimeStorageBootstrapSummarySchema
>;
