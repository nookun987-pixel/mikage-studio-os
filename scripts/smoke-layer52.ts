import { createRealQueueBackendAdapter } from '../packages/real-queue-backend-adapter/src/index.ts';
import { createWorkerRuntimeHost } from '../packages/worker-runtime-host/src/index.ts';

import {
  cleanupDurableData,
  ensureProject,
  runtimeRequestFixture
} from './wave9-fixtures.ts';

const projectSlug = 'wave9-layer52';
const jobCode = 'layer52_job_001';

const main = async () => {
  await ensureProject(projectSlug);
  await cleanupDurableData({
    jobCodes: [jobCode]
  });

  const queue = createRealQueueBackendAdapter({
    projectSlug,
    synchronousFallback: false
  });
  await queue.enqueue({
    jobCode,
    jobType: 'generation_execution_job',
    input: runtimeRequestFixture('layer52_execution_001')
  });

  const worker = createWorkerRuntimeHost(
    {
      workerCode: 'worker_layer52_001',
      maxBatchSize: 1
    },
    {
      queueAdapter: queue
    }
  );

  await worker.start();
  const run = await worker.runOnce();
  await worker.stop();
  const finalStatus = await queue.getStatus(jobCode);

  console.log(
    JSON.stringify(
      {
        workerCode: worker.snapshot().workerCode,
        runStatus: run.finalStatus,
        finalQueueStatus: finalStatus?.status ?? null,
        processedCount: worker.snapshot().processedCount
      },
      null,
      2
    )
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
