import { createRuntimeJobQueueAdapter } from '@mikage/runtime-job-queue-adapter';

import { resetRuntimeFile, runtimeRequestFixture, runtimeStoreFile } from './wave5-fixtures.ts';

const filePath = runtimeStoreFile('job-queue-layer29.json');

const main = async () => {
  await resetRuntimeFile(filePath);

  const queue = createRuntimeJobQueueAdapter({
    filePath,
    synchronousFallback: true
  });

  const queued = await queue.enqueue({
    request: {
      jobCode: 'job_runtime_queue_001',
      jobType: 'generation_execution_job',
      input: runtimeRequestFixture('job_runtime_queue_001')
    }
  });
  const status = await queue.getStatus('job_runtime_queue_001');

  console.log(
    JSON.stringify(
      {
        enqueuedStatus: queued.status,
        storedStatus: status?.status ?? null,
        finalStatus: status?.result?.finalStatus ?? null
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
