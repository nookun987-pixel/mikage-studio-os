import { prisma } from '../packages/database/src/index.ts';
import { createLocalRuntimeConfig } from '../packages/runtime-config-layer/src/index.ts';
import { bootstrapRuntimeStorage } from '../packages/storage-strategy-cleanup/src/index.ts';

import {
  resetRuntimeFile,
  runtimeRequestFixture,
  runtimeStoreFile,
  validationRejectedRuntimeRequestFixture
} from './wave5-fixtures.ts';

export {
  resetRuntimeFile,
  runtimeRequestFixture,
  runtimeStoreFile,
  validationRejectedRuntimeRequestFixture
};

export const ensureProject = async (projectSlug: string) => {
  const existing =
    (await prisma.project.findUnique({
      where: { slug: projectSlug }
    })) ??
    (await prisma.project.findFirst({
      orderBy: { createdAt: 'asc' }
    }));

  if (existing) {
    return existing;
  }

  return prisma.project.create({
    data: {
      slug: projectSlug,
      name: projectSlug
    }
  });
};

export const cleanupDurableData = async (input: {
  archiveCodes?: string[];
  jobCodes?: string[];
}) => {
  if (input.archiveCodes && input.archiveCodes.length > 0) {
    await prisma.archive.deleteMany({
      where: {
        archiveCode: {
          in: input.archiveCodes
        }
      }
    });
  }

  if (input.jobCodes && input.jobCodes.length > 0) {
    await prisma.job.deleteMany({
      where: {
        jobCode: {
          in: input.jobCodes
        }
      }
    });
  }
};

export const prepareWave9RuntimeStorage = async (
  name: string,
  port: number
) => {
  const config = createLocalRuntimeConfig({
    workspaceRoot: 'D:\\mikage-studio-os',
    port
  });
  const sessionStorePath = runtimeStoreFile(`${name}-sessions.json`);
  const queueStorePath = runtimeStoreFile(`${name}-queue.json`);
  const logsFilePath = runtimeStoreFile(`${name}.ndjson`);

  await resetRuntimeFile(sessionStorePath);
  await resetRuntimeFile(queueStorePath);
  await resetRuntimeFile(logsFilePath);
  await bootstrapRuntimeStorage({
    ...config,
    storage: {
      ...config.storage,
      sessionsFilePath: sessionStorePath,
      queueFilePath: queueStorePath,
      logsFilePath
    }
  });

  return {
    config: {
      ...config,
      storage: {
        ...config.storage,
        sessionsFilePath: sessionStorePath,
        queueFilePath: queueStorePath,
        logsFilePath
      }
    },
    sessionStorePath,
    queueStorePath,
    logsFilePath
  };
};
