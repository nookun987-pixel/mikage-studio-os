import {
  prisma,
  type Prisma,
  type PrismaClient
} from '@mikage/database';
import { createRuntimeJobQueueAdapter } from '@mikage/runtime-job-queue-adapter';
import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';
import {
  studioJobDispatchRequestSchema,
  studioJobDispatchResultSchema,
  type StudioJobDispatchRequest,
  type StudioJobDispatchResult
} from '@mikage/studio-job-orchestration';

import {
  durableJobRecordSchema,
  durablePersistenceOptionsSchema,
  type DurableJobStatus,
  type DurablePersistenceOptions
} from './contracts.js';

const resolveProjectId = async (
  client: PrismaClient,
  projectSlug: string
) => {
  const existing =
    (await client.project.findUnique({
      where: { slug: projectSlug }
    })) ??
    (await client.project.findFirst({
      orderBy: { createdAt: 'asc' }
    }));

  if (existing) {
    return existing.id;
  }

  const created = await client.project.create({
    data: {
      slug: projectSlug,
      name: projectSlug
    }
  });

  return created.id;
};

const toQueueStatus = (
  status: DurableJobStatus
): 'queued' | 'completed' | 'failed' =>
  status === 'completed' ? 'completed' : status === 'failed' ? 'failed' : 'queued';

export const createDurableJobPersistenceAdapter = (
  rawOptions: DurablePersistenceOptions,
  dependencies?: {
    prismaClient?: PrismaClient;
    logger?: StructuredLogger;
  }
) => {
  const options = durablePersistenceOptionsSchema.parse(rawOptions);
  const client = dependencies?.prismaClient ?? prisma;
  const logger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'durable-job-persistence'
    });
  const fallback = options.fallbackQueueFilePath
    ? createRuntimeJobQueueAdapter(
        {
          filePath: options.fallbackQueueFilePath,
          synchronousFallback: false
        },
        {
          logger: logger.child('fallback-job-queue')
        }
      )
    : null;

  const persist = async (
    request: StudioJobDispatchRequest,
    status: DurableJobStatus,
    result: StudioJobDispatchResult | null
  ) => {
    const parsedRequest = studioJobDispatchRequestSchema.parse(request);

    try {
      const projectId = await resolveProjectId(client, options.projectSlug);
      const stored = await client.job.upsert({
        where: {
          jobCode: parsedRequest.jobCode
        },
        update: {
          status:
            status === 'running'
              ? 'running'
              : status === 'completed'
                ? 'completed'
                : status === 'failed'
                  ? 'failed'
                  : 'queued',
          requestPayload: parsedRequest as unknown as Prisma.InputJsonValue,
          metadata: {
            source: 'durable-persistence-adapters',
            runtimeResult: result
          } as unknown as Prisma.InputJsonValue
        },
        create: {
          projectId,
          jobCode: parsedRequest.jobCode,
          status:
            status === 'running'
              ? 'running'
              : status === 'completed'
                ? 'completed'
                : status === 'failed'
                  ? 'failed'
                  : 'queued',
          requestPayload: parsedRequest as unknown as Prisma.InputJsonValue,
          metadata: {
            source: 'durable-persistence-adapters',
            runtimeResult: result
          } as unknown as Prisma.InputJsonValue
        }
      });

      logger.info('durable.job.saved', {
        jobCode: parsedRequest.jobCode,
        status: stored.status,
        storageMode: 'database'
      });

      return durableJobRecordSchema.parse({
        jobCode: parsedRequest.jobCode,
        status,
        result,
        storageMode: 'database'
      });
    } catch (error) {
      if (!fallback) {
        throw error;
      }

      if (status === 'queued') {
        const queued = await fallback.enqueue({
          request: parsedRequest
        });

        return durableJobRecordSchema.parse({
          jobCode: parsedRequest.jobCode,
          status: queued.status === 'failed' ? 'failed' : 'queued',
          result: queued.result,
          storageMode: 'fallback_file'
        });
      }

      const current = await fallback.getStatus(parsedRequest.jobCode);

      return durableJobRecordSchema.parse({
        jobCode: parsedRequest.jobCode,
        status: current?.status === 'completed' ? 'completed' : toQueueStatus(status),
        result: current?.result ?? result,
        storageMode: 'fallback_file'
      });
    }
  };

  const read = async (jobCode: string) => {
    try {
      const stored = await client.job.findUnique({
        where: {
          jobCode
        }
      });

      if (!stored) {
        return null;
      }

      const metadata = (stored.metadata ?? {}) as { runtimeResult?: unknown };

      return durableJobRecordSchema.parse({
        jobCode: stored.jobCode,
        status:
          stored.status === 'running'
            ? 'running'
            : stored.status === 'completed'
              ? 'completed'
              : stored.status === 'failed'
                ? 'failed'
                : 'queued',
        result: metadata.runtimeResult
          ? studioJobDispatchResultSchema.parse(metadata.runtimeResult)
          : null,
        storageMode: 'database'
      });
    } catch (error) {
      if (!fallback) {
        throw error;
      }

      const queued = await fallback.getStatus(jobCode);

      if (!queued) {
        return null;
      }

      return durableJobRecordSchema.parse({
        jobCode: queued.jobCode,
        status:
          queued.status === 'completed'
            ? 'completed'
            : queued.status === 'failed'
              ? 'failed'
              : 'queued',
        result: queued.result,
        storageMode: 'fallback_file'
      });
    }
  };

  return {
    persistQueued: async (request: StudioJobDispatchRequest) =>
      persist(request, 'queued', null),
    persistRunning: async (request: StudioJobDispatchRequest) =>
      persist(request, 'running', null),
    persistCompleted: async (
      request: StudioJobDispatchRequest,
      result: StudioJobDispatchResult
    ) => persist(request, 'completed', result),
    persistFailed: async (
      request: StudioJobDispatchRequest,
      result: StudioJobDispatchResult
    ) => persist(request, 'failed', result),
    read
  };
};
