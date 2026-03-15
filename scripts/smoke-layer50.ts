import { dispatchStudioJob } from '../packages/studio-job-orchestration/src/index.ts';
import { runStudioSessionApplication } from '../packages/studio-session-application/src/index.ts';
import {
  createDurableJobPersistenceAdapter,
  createDurableSessionPersistenceAdapter
} from '../packages/durable-persistence-adapters/src/index.ts';

import {
  cleanupDurableData,
  ensureProject,
  runtimeRequestFixture
} from './wave9-fixtures.ts';

const projectSlug = 'wave9-layer50';
const sessionRequestCode = 'layer50_session_001';
const jobCode = 'layer50_job_001';

const main = async () => {
  await ensureProject(projectSlug);
  await cleanupDurableData({
    jobCodes: [jobCode]
  });

  const sessionAdapter = createDurableSessionPersistenceAdapter({
    projectSlug
  });
  const jobAdapter = createDurableJobPersistenceAdapter({
    projectSlug
  });
  const runtimeRequest = runtimeRequestFixture('layer50_execution_001');
  const session = runStudioSessionApplication({
    sessionCode: sessionRequestCode,
    runtimeRequest
  });
  const archiveCode = `session::${session.session.sessionCode}`;
  await cleanupDurableData({
    archiveCodes: [archiveCode]
  });
  const storedSession = await sessionAdapter.save(session);
  const updatedSession = await sessionAdapter.updateContinuity(
    session.session.sessionCode,
    'layer50_continuity_001'
  );
  const jobRequest = {
    jobCode,
    jobType: 'generation_execution_job' as const,
    input: runtimeRequest
  };
  await jobAdapter.persistQueued(jobRequest);
  await jobAdapter.persistCompleted(jobRequest, dispatchStudioJob(jobRequest));
  const inspectedSession = await sessionAdapter.inspect(session.session.sessionCode);
  const storedJob = await jobAdapter.read(jobCode);

  console.log(
    JSON.stringify(
      {
        sessionCode: storedSession.session.sessionCode,
        sessionStorage: inspectedSession?.storageMode ?? null,
        continuityCode: updatedSession?.continuityCode ?? null,
        jobCode: storedJob?.jobCode ?? null,
        jobStatus: storedJob?.status ?? null,
        jobStorage: storedJob?.storageMode ?? null
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
