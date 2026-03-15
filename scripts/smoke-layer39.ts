import { createStudioHostClients } from '../packages/studio-host-clients/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture,
  worklistRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer39', 43139);
  const clients = createStudioHostClients({
    baseUrl: runtime.address.baseUrl
  });

  try {
    const execution = await clients.execute(runtimeRequestFixture('layer39_execution_001'));
    const query = await clients.query({
      operation: 'package_summary_lookup',
      recordCode: 'pkg_layer39_execution_001'
    });
    const worklist = await clients.worklist(worklistRequestFixture('layer39_execution_001'));
    const session = await clients.openSession({
      sessionCode: 'layer39_session_001',
      runtimeRequest: runtimeRequestFixture('layer39_execution_001')
    });

    console.log(
      JSON.stringify(
        {
          execution: execution.executionEnvelope?.status ?? null,
          query: query.queryEnvelope?.status ?? null,
          worklist: worklist.worklistEnvelope?.status ?? null,
          session: session.status
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
