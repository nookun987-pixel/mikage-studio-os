import { access } from 'node:fs/promises';

import {
  runtimeDiagnosticsResponseSchema,
  runtimeHealthResponseSchema,
  runtimeReadinessResponseSchema
} from './contracts.js';

const exists = async (filePath: string) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const createHealthDiagnosticsSurface = (input: {
  host: { host: string; port: number };
  getSnapshot: () => Promise<{
    host: string;
    port: number;
    sessionCount: number;
    queuedJobCount: number;
  }>;
  sessionStorePath: string;
  queueStorePath: string;
  logsFilePath: string;
}) => ({
  async health() {
    return runtimeHealthResponseSchema.parse({
      status: 'ok',
      host: input.host.host,
      port: input.host.port
    });
  },
  async readiness() {
    const [sessionStore, queueStore] = await Promise.all([
      exists(input.sessionStorePath),
      exists(input.queueStorePath)
    ]);

    return runtimeReadinessResponseSchema.parse({
      status: sessionStore && queueStore ? 'ready' : 'not_ready',
      checks: {
        sessionStore,
        queueStore,
        composition: true
      }
    });
  },
  async diagnostics() {
    const snapshot = await input.getSnapshot();

    return runtimeDiagnosticsResponseSchema.parse({
      status: 'ok',
      host: snapshot,
      storage: {
        sessionStorePath: input.sessionStorePath,
        queueStorePath: input.queueStorePath,
        logsFilePath: input.logsFilePath
      },
      composition: {
        status: 'composed'
      }
    });
  },
  async canHandle(pathname: string) {
    return pathname === '/health' || pathname === '/ready' || pathname === '/diagnostics';
  },
  async route(pathname: string) {
    if (pathname === '/health') {
      return this.health();
    }

    if (pathname === '/ready') {
      return this.readiness();
    }

    return this.diagnostics();
  }
});
