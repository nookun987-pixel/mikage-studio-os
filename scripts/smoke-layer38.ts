import { createStudioHostClients } from '../packages/studio-host-clients/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer38', 43138);
  const clients = createStudioHostClients({
    baseUrl: runtime.address.baseUrl
  });

  try {
    const opened = await clients.openSession({
      sessionCode: 'layer38_session_001',
      runtimeRequest: runtimeRequestFixture('layer38_session_001'),
      selectionContext: {
        selectedCode: 'pkg_layer38_session_001',
        selectedKind: 'package'
      }
    });
    const loaded = await clients.loadSession(opened.payload?.session.sessionCode ?? 'missing');
    const continuity = await clients.updateContinuity({
      sessionCode: opened.payload?.session.sessionCode ?? 'missing',
      continuityCode: `${opened.payload?.continuityCode ?? 'missing'}_http`
    });

    console.log(
      JSON.stringify(
        {
          openStatus: opened.status,
          loadStatus: loaded.status,
          continuityStatus: continuity.status,
          sessionCode: continuity.payload?.session.sessionCode ?? null
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
