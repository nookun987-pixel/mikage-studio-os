import { createRuntimeServiceHost } from '@mikage/runtime-service-host';

import {
  resetRuntimeFile,
  runtimeRequestFixture,
  runtimeStoreFile
} from './wave5-fixtures.ts';

const sessionStorePath = runtimeStoreFile('service-host-sessions.json');
const queueStorePath = runtimeStoreFile('service-host-queue.json');
const logsFilePath = runtimeStoreFile('service-host.ndjson');

const serviceHost = createRuntimeServiceHost({
  host: '127.0.0.1',
  port: 43130,
  sessionStorePath,
  queueStorePath,
  logsFilePath,
  synchronousQueueFallback: true
});

const main = async () => {
  await resetRuntimeFile(sessionStorePath);
  await resetRuntimeFile(queueStorePath);
  await resetRuntimeFile(logsFilePath);

  const address = await serviceHost.start();

  try {
    const routeResponse = await fetch(`${address.baseUrl}/runtime/execute`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        portMode: 'studio_runtime_request',
        runtimeRequest: runtimeRequestFixture('runtime_service_host_001')
      })
    });
    const route = (await routeResponse.json()) as {
      executionEnvelope: { status: string } | null;
    };

    const session = await serviceHost.saveSession({
      sessionCode: 'session_runtime_service_host_001',
      runtimeRequest: runtimeRequestFixture('runtime_service_host_001'),
      selectionContext: {
        selectedCode: 'pkg_runtime_service_host_001',
        selectedKind: 'package'
      }
    });
    const job = await serviceHost.enqueueJob({
      jobCode: 'job_runtime_service_host_001',
      jobType: 'generation_execution_job',
      input: runtimeRequestFixture('runtime_service_host_001')
    });
    const snapshot = await serviceHost.snapshot();

    console.log(
      JSON.stringify(
        {
          routeStatus: route.executionEnvelope?.status ?? null,
          sessionCode: session.session.sessionCode,
          jobStatus: job.status,
          snapshot
        },
        null,
        2
      )
    );
  } finally {
    await serviceHost.stop();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
