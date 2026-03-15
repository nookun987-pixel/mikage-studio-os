import { createIsolatedRuntimeServiceHost } from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer45', 43145);

  try {
    const [health, ready, diagnostics] = await Promise.all([
      fetch(`${runtime.address.baseUrl}/health`).then((response) => response.json()),
      fetch(`${runtime.address.baseUrl}/ready`).then((response) => response.json()),
      fetch(`${runtime.address.baseUrl}/diagnostics`).then((response) => response.json())
    ]);

    console.log(
      JSON.stringify(
        {
          healthStatus: health.status,
          readinessStatus: ready.status,
          diagnosticsStatus: diagnostics.status,
          hostPort: diagnostics.host.port
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
