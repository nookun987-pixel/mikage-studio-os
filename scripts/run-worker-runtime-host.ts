import { createRealQueueBackendAdapter } from '../packages/real-queue-backend-adapter/src/index.ts';
import { createWorkerRuntimeHost } from '../packages/worker-runtime-host/src/index.ts';

const main = async () => {
  const queue = createRealQueueBackendAdapter({
    projectSlug: process.env.MIKAGE_PROJECT_SLUG ?? 'mikage',
    synchronousFallback: false
  });
  const worker = createWorkerRuntimeHost(
    {
      workerCode: process.env.MIKAGE_WORKER_CODE ?? 'worker_runtime_host'
    },
    {
      queueAdapter: queue
    }
  );

  await worker.start();

  const interval = setInterval(async () => {
    await worker.runOnce();
  }, 1000);

  const shutdown = async () => {
    clearInterval(interval);
    await worker.stop();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
