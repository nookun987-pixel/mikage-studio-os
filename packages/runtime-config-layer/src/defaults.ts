import { join } from 'node:path';

import { runtimeConfigSchema, type RuntimeConfig } from './contracts.js';

export const createLocalRuntimeConfig = (input?: {
  workspaceRoot?: string;
  port?: number;
}): RuntimeConfig => {
  const workspaceRoot = input?.workspaceRoot ?? process.cwd();
  const rootPath = join(workspaceRoot, '.local', 'runtime');

  return runtimeConfigSchema.parse({
    host: {
      host: '127.0.0.1',
      port: input?.port ?? 43130
    },
    storage: {
      rootPath,
      sessionsFilePath: join(rootPath, 'sessions', 'runtime-sessions.json'),
      queueFilePath: join(rootPath, 'queue', 'runtime-queue.json'),
      logsFilePath: join(rootPath, 'logs', 'runtime.ndjson'),
      artifactsPath: join(rootPath, 'artifacts')
    },
    queue: {
      synchronousFallback: true
    },
    diagnostics: {
      healthPath: '/health',
      readinessPath: '/ready',
      diagnosticsPath: '/diagnostics'
    }
  });
};

export const mergeRuntimeConfig = (
  base: RuntimeConfig,
  overrides: Partial<RuntimeConfig>
): RuntimeConfig =>
  runtimeConfigSchema.parse({
    ...base,
    ...overrides,
    host: {
      ...base.host,
      ...overrides.host
    },
    storage: {
      ...base.storage,
      ...overrides.storage
    },
    queue: {
      ...base.queue,
      ...overrides.queue
    },
    diagnostics: {
      ...base.diagnostics,
      ...overrides.diagnostics
    }
  });
