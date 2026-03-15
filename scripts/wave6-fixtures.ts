import { createLocalRuntimeConfig } from '../packages/runtime-config-layer/src/index.ts';
import { createRuntimeServiceHost } from '../packages/runtime-service-host/src/index.ts';
import { bootstrapRuntimeStorage } from '../packages/storage-strategy-cleanup/src/index.ts';

import {
  resetRuntimeFile,
  runtimeRequestFixture,
  runtimeStoreFile,
  worklistRequestFixture
} from './wave5-fixtures.ts';

export { runtimeRequestFixture, worklistRequestFixture };

export const createIsolatedRuntimeServiceHost = async (name: string, port: number) => {
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

  const host = createRuntimeServiceHost({
    host: '127.0.0.1',
    port,
    sessionStorePath,
    queueStorePath,
    logsFilePath,
    synchronousQueueFallback: true
  });
  const address = await host.start();

  return {
    host,
    address
  };
};
