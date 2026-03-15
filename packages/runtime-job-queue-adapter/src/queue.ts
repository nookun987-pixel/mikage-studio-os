import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';
import { dispatchStudioJob } from '@mikage/studio-job-orchestration';

import {
  enqueueJobRequestSchema,
  queueRecordSchema,
  queueSnapshotSchema,
  runtimeQueueOptionsSchema
} from './contracts.js';

const ensureQueueFile = async (filePath: string) => {
  await mkdir(dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, 'utf8');
  } catch {
    await writeFile(filePath, JSON.stringify({ jobs: {} }, null, 2), 'utf8');
  }
};

const readSnapshot = async (filePath: string) => {
  await ensureQueueFile(filePath);
  const raw = await readFile(filePath, 'utf8');
  return queueSnapshotSchema.parse(JSON.parse(raw));
};

const writeSnapshot = async (
  filePath: string,
  snapshot: Awaited<ReturnType<typeof readSnapshot>>
) => {
  await writeFile(filePath, JSON.stringify(snapshot, null, 2), 'utf8');
};

export const createRuntimeJobQueueAdapter = (rawOptions: {
  filePath: string;
  synchronousFallback?: boolean;
}, dependencies?: { logger?: StructuredLogger }) => {
  const options = runtimeQueueOptionsSchema.parse(rawOptions);
  const logger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'runtime-job-queue'
    });

  return {
    async enqueue(rawInput: { request: Parameters<typeof dispatchStudioJob>[0] }) {
      const input = enqueueJobRequestSchema.parse(rawInput);
      const snapshot = await readSnapshot(options.filePath);

      snapshot.jobs[input.request.jobCode] = queueRecordSchema.parse({
        jobCode: input.request.jobCode,
        status: 'queued',
        result: null
      });

      if (options.synchronousFallback) {
        const result = dispatchStudioJob(input.request);
        snapshot.jobs[input.request.jobCode] = queueRecordSchema.parse({
          jobCode: input.request.jobCode,
          status: result.finalStatus === 'completed' ? 'completed' : 'failed',
          result
        });
      }

      await writeSnapshot(options.filePath, snapshot);
      logger.info('job.enqueued', {
        jobCode: input.request.jobCode,
        status: snapshot.jobs[input.request.jobCode]?.status ?? 'queued'
      });
      return snapshot.jobs[input.request.jobCode];
    },
    async getStatus(jobCode: string) {
      const snapshot = await readSnapshot(options.filePath);
      logger.info('job.status.read', {
        jobCode,
        found: snapshot.jobs[jobCode] !== undefined
      });
      return snapshot.jobs[jobCode] ?? null;
    }
  };
};
