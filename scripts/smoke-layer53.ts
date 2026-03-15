import { createDurableSessionPersistenceAdapter } from '../packages/durable-persistence-adapters/src/index.ts';
import { createObservabilitySurface } from '../packages/observability-surface/src/index.ts';
import { createRealQueueBackendAdapter } from '../packages/real-queue-backend-adapter/src/index.ts';
import { createRuntimeServiceHost } from '../packages/runtime-service-host/src/index.ts';
import { createWorkerRuntimeHost } from '../packages/worker-runtime-host/src/index.ts';

import {
  cleanupDurableData,
  ensureProject,
  prepareWave9RuntimeStorage,
  runtimeRequestFixture
} from './wave9-fixtures.ts';

const projectSlug = 'wave9-layer53';
const sessionCode = 'layer53_session_001';
const archiveCode = `session::${sessionCode}`;
const jobCode = 'layer53_job_001';

const main = async () => {
  const prepared = await prepareWave9RuntimeStorage('layer53', 43153);

  await ensureProject(projectSlug);
  await cleanupDurableData({
    archiveCodes: [archiveCode],
    jobCodes: [jobCode]
  });

  let baseUrl = '';
  const observability = createObservabilitySurface({
    diagnosticsProvider: async () => {
      const [health, readiness, diagnostics] = await Promise.all([
        fetch(`${baseUrl}/health`).then(async (response) => response.json()),
        fetch(`${baseUrl}/ready`).then(async (response) => response.json()),
        fetch(`${baseUrl}/diagnostics`).then(async (response) => response.json())
      ]);

      return {
        healthStatus: health.status,
        readinessStatus: readiness.status,
        diagnosticsStatus: diagnostics.status
      };
    }
  });

  const queue = createRealQueueBackendAdapter(
    {
      projectSlug,
      synchronousFallback: false
    },
    {
      observability
    }
  );
  const sessionStore = createDurableSessionPersistenceAdapter({
    projectSlug
  });
  const host = createRuntimeServiceHost(
    {
      host: prepared.config.host.host,
      port: prepared.config.host.port,
      sessionStorePath: prepared.sessionStorePath,
      queueStorePath: prepared.queueStorePath,
      logsFilePath: prepared.logsFilePath,
      synchronousQueueFallback: false
    },
    {
      sessionStoreAdapter: sessionStore,
      jobQueueAdapter: {
        enqueue: ({ request }) => queue.enqueue(request),
        getStatus: (queuedJobCode) => queue.getStatus(queuedJobCode)
      },
      observability
    }
  );
  const worker = createWorkerRuntimeHost(
    {
      workerCode: 'worker_layer53_001'
    },
    {
      queueAdapter: queue,
      observability
    }
  );

  const address = await host.start();
  baseUrl = address.baseUrl;
  await worker.start();
  await host.saveSession({
    sessionCode,
    runtimeRequest: runtimeRequestFixture('layer53_execution_001')
  });
  await host.enqueueJob({
    jobCode,
    jobType: 'generation_execution_job',
    input: runtimeRequestFixture('layer53_execution_001')
  });
  await fetch(`${baseUrl}/health`);
  await fetch(`${baseUrl}/studio/query?operation=package_summary_lookup&recordCode=pkg_read_port_happy_001`);
  await worker.runOnce();
  const snapshot = await observability.snapshot();
  await worker.stop();
  await host.stop();

  const counter = (counterName: string) =>
    snapshot.counters.find((entry) => entry.counterName === counterName)?.value ?? 0;

  console.log(
    JSON.stringify(
      {
        hostRequests: counter('host_requests_total'),
        queueClaims: counter('queue_claim_total'),
        workerRuns: counter('worker_runs_total'),
        diagnosticsStatus: snapshot.diagnostics?.diagnosticsStatus ?? null
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
