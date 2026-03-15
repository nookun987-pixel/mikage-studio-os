import { createHealthDiagnosticsSurface } from '@mikage/health-diagnostics-surface';
import {
  createRuntimeHttpHost,
  type RuntimeHttpHostOptions
} from '@mikage/runtime-http-host';
import { createRuntimeJobQueueAdapter } from '@mikage/runtime-job-queue-adapter';
import { createRuntimeSessionStore } from '@mikage/runtime-session-store';
import { createSessionHttpHostAdapter } from '@mikage/session-http-host-adapter';
import { createStructuredLogger } from '@mikage/structured-logging';
import { type StudioJobDispatchRequest } from '@mikage/studio-job-orchestration';
import {
  runStudioSessionApplication,
  type StudioSessionApplicationRequest
} from '@mikage/studio-session-application';

import {
  runtimeServiceHostOptionsSchema,
  runtimeServiceHostSnapshotSchema,
  type RuntimeServiceHostOptions,
  type RuntimeServiceHostSnapshot
} from './contracts.js';

type RuntimeHttpHostController = ReturnType<typeof createRuntimeHttpHost>;
type RuntimeSessionStoreController = ReturnType<typeof createRuntimeSessionStore>;
type RuntimeJobQueueController = ReturnType<typeof createRuntimeJobQueueAdapter>;

export type RuntimeServiceHost = {
  start: () => Promise<{ host: string; port: number; baseUrl: string }>;
  stop: () => Promise<void>;
  saveSession: (
    request: StudioSessionApplicationRequest
  ) => Promise<Awaited<ReturnType<RuntimeSessionStoreController['save']>>>;
  readSession: (sessionCode: string) => Promise<Awaited<ReturnType<RuntimeSessionStoreController['read']>>>;
  updateSessionContinuity: (
    sessionCode: string,
    continuityCode: string
  ) => Promise<Awaited<ReturnType<RuntimeSessionStoreController['updateContinuity']>>>;
  enqueueJob: (request: StudioJobDispatchRequest) => Promise<Awaited<ReturnType<RuntimeJobQueueController['enqueue']>>>;
  getJobStatus: (jobCode: string) => Promise<Awaited<ReturnType<RuntimeJobQueueController['getStatus']>>>;
  snapshot: () => Promise<RuntimeServiceHostSnapshot>;
};

export const createRuntimeServiceHost = (
  rawOptions: RuntimeServiceHostOptions,
  dependencies?: {
    sessionStoreAdapter?: Pick<
      RuntimeSessionStoreController,
      'save' | 'read' | 'updateContinuity'
    >;
    jobQueueAdapter?: Pick<RuntimeJobQueueController, 'enqueue' | 'getStatus'>;
    logger?: ReturnType<typeof createStructuredLogger>;
    observability?: {
      increment: (counterName: string, value?: number, context?: Record<string, unknown>) => void;
      recordTrace: (
        flow: string,
        step: string,
        status: 'ok' | 'error',
        metadata?: Record<string, unknown>
      ) => void;
    };
  }
): RuntimeServiceHost => {
  const options = runtimeServiceHostOptionsSchema.parse(rawOptions);
  const rootLogger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'runtime-service-host',
      logFilePath: options.logsFilePath
    });
  const sessionStore =
    dependencies?.sessionStoreAdapter ??
    createRuntimeSessionStore(
      {
        filePath: options.sessionStorePath
      },
      {
        logger: rootLogger.child('runtime-session-store')
      }
    );
  const jobQueue =
    dependencies?.jobQueueAdapter ??
    createRuntimeJobQueueAdapter(
      {
        filePath: options.queueStorePath,
        synchronousFallback: options.synchronousQueueFallback
      },
      {
        logger: rootLogger.child('runtime-job-queue')
      }
    );
  const savedSessions = new Set<string>();
  const queuedJobs = new Set<string>();
  const saveSession = async (request: StudioSessionApplicationRequest) => {
    const session = runStudioSessionApplication(request);
    const saved = await sessionStore.save(session);
    savedSessions.add(saved.session.sessionCode);
    dependencies?.observability?.increment('session_writes_total', 1, {
      sessionCode: saved.session.sessionCode
    });
    dependencies?.observability?.recordTrace('service', 'session_saved', 'ok', {
      sessionCode: saved.session.sessionCode
    });
    rootLogger.info('service.session.saved', {
      sessionCode: saved.session.sessionCode
    });
    return saved;
  };
  const readSession = async (sessionCode: string) => {
    dependencies?.observability?.increment('session_reads_total', 1, {
      sessionCode
    });
    return sessionStore.read(sessionCode);
  };
  const updateSessionContinuity = async (
    sessionCode: string,
    continuityCode: string
  ) => {
    dependencies?.observability?.increment('session_writes_total', 1, {
      sessionCode
    });
    return sessionStore.updateContinuity(sessionCode, continuityCode);
  };
  const sessionAdapter = createSessionHttpHostAdapter({
    saveSession,
    readSession,
    updateSessionContinuity
  });
  const getSnapshot = async () =>
    runtimeServiceHostSnapshotSchema.parse({
      host: options.host,
      port: options.port,
      sessionCount: savedSessions.size,
      queuedJobCount: queuedJobs.size,
      logsFilePath: options.logsFilePath
    });
  const diagnosticsSurface = createHealthDiagnosticsSurface({
    host: {
      host: options.host,
      port: options.port
    },
    getSnapshot,
    sessionStorePath: options.sessionStorePath,
    queueStorePath: options.queueStorePath,
    logsFilePath: options.logsFilePath
  });
  const httpHost: RuntimeHttpHostController = createRuntimeHttpHost(
    {
      host: options.host,
      port: options.port
    } satisfies RuntimeHttpHostOptions,
    {
      sessionAdapter,
      diagnosticsAdapter: diagnosticsSurface,
      logger: rootLogger.child('runtime-http-host'),
      observability: dependencies?.observability
    }
  );

  return {
    async start() {
      const address = await httpHost.start();
      rootLogger.info('service.started', address);

      return {
        ...address,
        baseUrl: `http://${address.host}:${address.port}`
      };
    },
    async stop() {
      await httpHost.stop();
      rootLogger.info('service.stopped', {
        host: options.host,
        port: options.port
      });
    },
    async saveSession(request) {
      return saveSession(request);
    },
    async readSession(sessionCode) {
      return readSession(sessionCode);
    },
    async updateSessionContinuity(sessionCode, continuityCode) {
      return updateSessionContinuity(sessionCode, continuityCode);
    },
    async enqueueJob(request) {
      const queued = await jobQueue.enqueue({ request });
      queuedJobs.add(request.jobCode);
      dependencies?.observability?.increment('queue_enqueue_total', 1, {
        jobCode: request.jobCode
      });
      rootLogger.info('service.job.enqueued', {
        jobCode: request.jobCode,
        status: queued.status
      });
      return queued;
    },
    async getJobStatus(jobCode) {
      dependencies?.observability?.increment('queue_status_reads_total', 1, {
        jobCode
      });
      return jobQueue.getStatus(jobCode);
    },
    async snapshot() {
      return getSnapshot();
    }
  };
};
