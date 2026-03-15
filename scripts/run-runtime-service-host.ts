import { createLocalRuntimeConfig } from '../packages/runtime-config-layer/src/index.ts';
import { createRuntimeServiceHost } from '../packages/runtime-service-host/src/index.ts';
import { bootstrapRuntimeStorage } from '../packages/storage-strategy-cleanup/src/index.ts';

const main = async () => {
  const config = createLocalRuntimeConfig({
    workspaceRoot: process.cwd(),
    port: process.env.MIKAGE_PORT ? Number(process.env.MIKAGE_PORT) : undefined
  });

  await bootstrapRuntimeStorage(config);

  const host = createRuntimeServiceHost({
    host: process.env.MIKAGE_HOST ?? config.host.host,
    port: process.env.MIKAGE_PORT ? Number(process.env.MIKAGE_PORT) : config.host.port,
    sessionStorePath: config.storage.sessionsFilePath,
    queueStorePath: config.storage.queueFilePath,
    logsFilePath: config.storage.logsFilePath,
    synchronousQueueFallback: true
  });

  await host.start();

  const shutdown = async () => {
    await host.stop();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
