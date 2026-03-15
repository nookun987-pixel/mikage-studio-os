import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { type RuntimeConfig } from '@mikage/runtime-config-layer';

import {
  runtimeStorageBootstrapSummarySchema,
  type RuntimeStorageBootstrapSummary
} from './contracts.js';

const ensureFile = async (filePath: string, initialValue: string) => {
  await mkdir(dirname(filePath), { recursive: true });

  try {
    await writeFile(filePath, initialValue, {
      flag: 'wx'
    });
  } catch {
    // File already exists; keep current contents.
  }
};

export const bootstrapRuntimeStorage = async (
  config: RuntimeConfig
): Promise<RuntimeStorageBootstrapSummary> => {
  await mkdir(config.storage.rootPath, { recursive: true });
  await mkdir(config.storage.artifactsPath, { recursive: true });
  await ensureFile(config.storage.sessionsFilePath, JSON.stringify({ sessions: {} }, null, 2));
  await ensureFile(config.storage.queueFilePath, JSON.stringify({ jobs: {} }, null, 2));
  await ensureFile(config.storage.logsFilePath, '');

  return runtimeStorageBootstrapSummarySchema.parse(config.storage);
};
