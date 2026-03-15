import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';
import { dispatchStudioJob } from '@mikage/studio-job-orchestration';

import {
  workerRunResultSchema,
  workerRuntimeHostOptionsSchema,
  workerRuntimeSnapshotSchema
} from './contracts.js';

type QueueAdapter = {
  claimNext: () => Promise<{ jobCode: string; request: Parameters<typeof dispatchStudioJob>[0] } | null>;
  complete: (
    jobCode: string,
    result: ReturnType<typeof dispatchStudioJob>
  ) => Promise<unknown>;
  fail: (
    jobCode: string,
    result: ReturnType<typeof dispatchStudioJob>
  ) => Promise<unknown>;
};

type ObservabilityLike = {
  increment: (counterName: string, value?: number, context?: Record<string, unknown>) => void;
  recordTrace: (
    flow: string,
    step: string,
    status: 'ok' | 'error',
    metadata?: Record<string, unknown>
  ) => void;
};

export const createWorkerRuntimeHost = (
  rawOptions: { workerCode: string; maxBatchSize?: number },
  dependencies: {
    queueAdapter: QueueAdapter;
    logger?: StructuredLogger;
    observability?: ObservabilityLike;
  }
) => {
  const options = workerRuntimeHostOptionsSchema.parse(rawOptions);
  const logger =
    dependencies.logger ??
    createStructuredLogger({
      component: 'worker-runtime-host'
    });
  let running = false;
  let processedCount = 0;
  let lastJobCode: string | null = null;

  const runOnce = async () => {
    const claimed = await dependencies.queueAdapter.claimNext();

    if (!claimed) {
      return workerRunResultSchema.parse({
        workerCode: options.workerCode,
        claimedJobCode: null,
        finalStatus: 'idle',
        processedCount
      });
    }

    lastJobCode = claimed.jobCode;
    dependencies.observability?.increment('worker_runs_total', 1, {
      workerCode: options.workerCode
    });

    try {
      const result = dispatchStudioJob(claimed.request);
      if (result.finalStatus === 'completed') {
        await dependencies.queueAdapter.complete(claimed.jobCode, result);
        dependencies.observability?.recordTrace('worker', 'job_completed', 'ok', {
          workerCode: options.workerCode,
          jobCode: claimed.jobCode
        });
      } else {
        await dependencies.queueAdapter.fail(claimed.jobCode, result);
        dependencies.observability?.recordTrace('worker', 'job_failed', 'error', {
          workerCode: options.workerCode,
          jobCode: claimed.jobCode
        });
      }

      processedCount += 1;
      logger.info('worker.run.completed', {
        workerCode: options.workerCode,
        jobCode: claimed.jobCode,
        finalStatus: result.finalStatus
      });

      return workerRunResultSchema.parse({
        workerCode: options.workerCode,
        claimedJobCode: claimed.jobCode,
        finalStatus: result.finalStatus === 'completed' ? 'completed' : 'failed',
        processedCount
      });
    } catch (error) {
      const failedResult = {
        jobCode: claimed.jobCode,
        jobType: claimed.request.jobType,
        lifecycle: ['ready', 'dispatched', 'failed'] as Array<
          'ready' | 'dispatched' | 'completed' | 'failed'
        >,
        finalStatus: 'failed' as const,
        detail: error instanceof Error ? error.message : 'Worker execution failed.'
      };
      await dependencies.queueAdapter.fail(claimed.jobCode, failedResult);
      dependencies.observability?.recordTrace('worker', 'job_failed', 'error', {
        workerCode: options.workerCode,
        jobCode: claimed.jobCode
      });

      return workerRunResultSchema.parse({
        workerCode: options.workerCode,
        claimedJobCode: claimed.jobCode,
        finalStatus: 'failed',
        processedCount
      });
    }
  };

  return {
    async start() {
      running = true;
      logger.info('worker.started', {
        workerCode: options.workerCode
      });
    },
    async stop() {
      running = false;
      logger.info('worker.stopped', {
        workerCode: options.workerCode
      });
    },
    runOnce,
    async drain() {
      const results = [];

      for (let index = 0; index < options.maxBatchSize; index += 1) {
        const result = await runOnce();
        results.push(result);

        if (result.finalStatus === 'idle') {
          break;
        }
      }

      return results;
    },
    snapshot() {
      return workerRuntimeSnapshotSchema.parse({
        workerCode: options.workerCode,
        running,
        processedCount,
        lastJobCode
      });
    }
  };
};
