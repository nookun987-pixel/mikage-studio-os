import { readFile } from 'node:fs/promises';

import { createStudioHostClients } from '../packages/studio-host-clients/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer44', 43144);
  const clients = createStudioHostClients({
    baseUrl: runtime.address.baseUrl
  });

  try {
    await clients.openSession({
      sessionCode: 'layer44_session_001',
      runtimeRequest: runtimeRequestFixture('layer44_execution_001')
    });
    await clients.execute(runtimeRequestFixture('layer44_execution_001'));
    await runtime.host.enqueueJob({
      jobCode: 'layer44_job_001',
      jobType: 'generation_execution_job',
      input: runtimeRequestFixture('layer44_execution_001')
    });

    const logFilePath = 'D:\\mikage-studio-os\\.local\\runtime\\layer44.ndjson';
    const logLines = (await readFile(logFilePath, 'utf8'))
      .split('\n')
      .filter((line) => line.trim().length > 0);

    console.log(
      JSON.stringify(
        {
          lineCount: logLines.length,
          hasHostLog: logLines.some((line) => line.includes('runtime-http-host')),
          hasSessionLog: logLines.some((line) => line.includes('runtime-session-store')),
          hasQueueLog: logLines.some((line) => line.includes('runtime-job-queue'))
        },
        null,
        2
      )
    );
  } finally {
    await runtime.host.stop();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
