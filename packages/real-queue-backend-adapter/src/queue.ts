import {
  prisma,
  type PrismaClient
} from '@mikage/database';
import { createDurableJobPersistenceAdapter } from '@mikage/durable-persistence-adapters';
import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';
import { dispatchStudioJob } from '@mikage/studio-job-orchestration';
import {
  studioJobDispatchRequestSchema,
  type StudioJobDispatchRequest,
  type StudioJobDispatchResult
} from '@mikage/studio-job-orchestration';

import {
  claimedQueueJobSchema,
  realQueueBackendOptionsSchema,
  realQueueRecordSchema
} from './contracts.js';

const queueStatusFromDatabase = (status: string) =>
  status === 'running'
    ? 'running'
    : status === 'completed'
      ? 'completed'
      : status === 'failed'
        ? 'failed'
        : 'queued';

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

export const createRealQueueBackendAdapter = (
  rawOptions: { projectSlug?: string; synchronousFallback?: boolean },
  dependencies?: {
    prismaClient?: PrismaClient;
    logger?: StructuredLogger;
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
) => {
  const options = realQueueBackendOptionsSchema.parse(rawOptions);
  const client = dependencies?.prismaClient ?? prisma;
  const logger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'real-queue-backend'
    });
  const durableJobs = createDurableJobPersistenceAdapter(
    {
      projectSlug: options.projectSlug
    },
    {
      prismaClient: client,
      logger: logger.child('durable-job-persistence')
    }
  );

  const toRecord = async (jobCode: string) => {
    const stored = await durableJobs.read(jobCode);

    if (!stored) {
      return null;
    }

    const job = await client.job.findUnique({
      where: {
        jobCode
      }
    });

    if (!job) {
      return null;
    }

    const request = studioJobDispatchRequestSchema.parse(job.requestPayload);

    return realQueueRecordSchema.parse({
      jobCode,
      jobType: request.jobType,
      status: stored.status,
      request,
      result: stored.result
    });
  };

  return {
    async enqueue(rawRequest: StudioJobDispatchRequest) {
      const request = studioJobDispatchRequestSchema.parse(rawRequest);
      await durableJobs.persistQueued(request);
      dependencies?.observability?.increment('queue_enqueue_total', 1, {
        jobCode: request.jobCode
      });
      logger.info('real-queue.enqueued', {
        jobCode: request.jobCode,
        jobType: request.jobType
      });

      if (options.synchronousFallback) {
        const result = dispatchStudioJob(request);
        await durableJobs.persistCompleted(request, result);
      }

      return toRecord(request.jobCode);
    },
    async claimNext() {
      const projectId = await resolveProjectId(client, options.projectSlug);
      const queued = await client.job.findMany({
        where: {
          status: 'queued',
          projectId
        },
        orderBy: {
          createdAt: 'asc'
        },
        take: 25
      });

      for (const candidate of queued) {
        const parsed = studioJobDispatchRequestSchema.safeParse(candidate.requestPayload);

        if (!parsed.success) {
          continue;
        }

        await client.job.update({
          where: {
            jobCode: candidate.jobCode
          },
          data: {
            status: 'running'
          }
        });
        await durableJobs.persistRunning(parsed.data);
        dependencies?.observability?.increment('queue_claim_total', 1, {
          jobCode: candidate.jobCode
        });
        logger.info('real-queue.claimed', {
          jobCode: candidate.jobCode
        });

        return claimedQueueJobSchema.parse({
          jobCode: candidate.jobCode,
          request: parsed.data
        });
      }

      return null;
    },
    async complete(jobCode: string, result: StudioJobDispatchResult) {
      const current = await client.job.findUnique({
        where: {
          jobCode
        }
      });

      if (!current) {
        return null;
      }

      const request = studioJobDispatchRequestSchema.parse(current.requestPayload);
      await durableJobs.persistCompleted(request, result);
      dependencies?.observability?.increment('queue_complete_total', 1, {
        jobCode
      });
      logger.info('real-queue.completed', {
        jobCode,
        finalStatus: result.finalStatus
      });
      return toRecord(jobCode);
    },
    async fail(jobCode: string, result: StudioJobDispatchResult) {
      const current = await client.job.findUnique({
        where: {
          jobCode
        }
      });

      if (!current) {
        return null;
      }

      const request = studioJobDispatchRequestSchema.parse(current.requestPayload);
      await durableJobs.persistFailed(request, result);
      dependencies?.observability?.increment('queue_complete_total', 1, {
        jobCode
      });
      logger.warn('real-queue.failed', {
        jobCode,
        finalStatus: result.finalStatus
      });
      return toRecord(jobCode);
    },
    async getStatus(jobCode: string) {
      const record = await toRecord(jobCode);

      if (record) {
        return record;
      }

      const databaseJob = await client.job.findUnique({
        where: {
          jobCode
        }
      });

      if (!databaseJob) {
        return null;
      }

      const request = studioJobDispatchRequestSchema.parse(databaseJob.requestPayload);
      return realQueueRecordSchema.parse({
        jobCode: databaseJob.jobCode,
        jobType: request.jobType,
        status: queueStatusFromDatabase(databaseJob.status),
        request,
        result: null
      });
    }
  };
};
