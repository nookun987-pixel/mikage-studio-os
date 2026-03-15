import { access } from 'node:fs/promises';

import {
  createLocalRuntimeConfig
} from '../packages/runtime-config-layer/src/index.ts';
import { bootstrapRuntimeStorage } from '../packages/storage-strategy-cleanup/src/index.ts';

const exists = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  const config = createLocalRuntimeConfig({
    workspaceRoot: 'D:\\mikage-studio-os',
    port: 43146
  });
  const summary = await bootstrapRuntimeStorage(config);

  console.log(
    JSON.stringify(
      {
        rootPath: summary.rootPath,
        sessionsReady: await exists(summary.sessionsFilePath),
        queueReady: await exists(summary.queueFilePath),
        logsReady: await exists(summary.logsFilePath),
        artifactsReady: await exists(summary.artifactsPath)
      },
      null,
      2
    )
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
