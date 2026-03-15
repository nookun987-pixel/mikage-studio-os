import { dispatchStudioJob } from '../packages/studio-job-orchestration/src/index.ts';
import { createRealQueueBackendAdapter } from '../packages/real-queue-backend-adapter/src/index.ts';

import {
  cleanupDurableData,
  ensureProject,
  runtimeRequestFixture
} from './wave9-fixtures.ts';

const projectSlug = 'wave9-layer51';
const jobCode = 'layer51_job_001';

const main = async () => {
  await ensureProject(projectSlug);
  await cleanupDurableData({
    jobCodes: [jobCode]
  });

  const queue = createRealQueueBackendAdapter({
    projectSlug,
    synchronousFallback: false
  });
  const request = {
    jobCode,
    jobType: 'generation_execution_job' as const,
    input: runtimeRequestFixture('layer51_execution_001')
  };

  const queued = await queue.enqueue(request);
  const claimed = await queue.claimNext();
  const completed = claimed
    ? await queue.complete(claimed.jobCode, dispatchStudioJob(claimed.request))
    : null;

  console.log(
    JSON.stringify(
      {
        queuedStatus: queued?.status ?? null,
        claimedJobCode: claimed?.jobCode ?? null,
        finalStatus: completed?.status ?? null
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
