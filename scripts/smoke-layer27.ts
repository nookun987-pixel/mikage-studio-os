import { createRuntimeHttpHost } from '@mikage/runtime-http-host';

import {
  runtimeRequestFixture,
  worklistRequestFixture
} from './wave5-fixtures.ts';

const host = createRuntimeHttpHost({
  host: '127.0.0.1',
  port: 43127
});

const main = async () => {
  const address = await host.start();

  try {
    const executionResponse = await fetch(`http://${address.host}:${address.port}/runtime/execute`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        portMode: 'studio_runtime_request',
        runtimeRequest: runtimeRequestFixture('http_host_runtime_001')
      })
    });
    const queryResponse = await fetch(
      `http://${address.host}:${address.port}/studio/query?operation=package_summary_lookup&recordCode=pkg_http_host_runtime_001`
    );
    const worklistResponse = await fetch(`http://${address.host}:${address.port}/worklist/project`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(worklistRequestFixture('http_host_runtime_001'))
    });

    const execution = (await executionResponse.json()) as {
      executionEnvelope: { status: string } | null;
    };
    const query = (await queryResponse.json()) as {
      queryEnvelope: { status: string } | null;
    };
    const worklist = (await worklistResponse.json()) as {
      worklistEnvelope: { status: string } | null;
    };

    console.log(
      JSON.stringify(
        {
          runtimeExecution: execution.executionEnvelope?.status ?? null,
          studioQuery: query.queryEnvelope?.status ?? null,
          worklistProjection: worklist.worklistEnvelope?.status ?? null
        },
        null,
        2
      )
    );
  } finally {
    await host.stop();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
