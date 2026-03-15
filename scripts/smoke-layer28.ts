import { createRuntimeSessionStore } from '@mikage/runtime-session-store';
import { runStudioSessionApplication } from '@mikage/studio-session-application';

import { resetRuntimeFile, runtimeRequestFixture, runtimeStoreFile } from './wave5-fixtures.ts';

const filePath = runtimeStoreFile('session-store-layer28.json');

const main = async () => {
  await resetRuntimeFile(filePath);

  const store = createRuntimeSessionStore({ filePath });
  const session = runStudioSessionApplication({
    sessionCode: 'session_runtime_store_001',
    runtimeRequest: runtimeRequestFixture('session_runtime_store_001'),
    selectionContext: {
      selectedCode: 'pkg_session_runtime_store_001',
      selectedKind: 'package'
    }
  });

  const saved = await store.save(session);
  const loaded = await store.read(saved.session.sessionCode);
  const updated = await store.updateContinuity(
    saved.session.sessionCode,
    `${saved.continuityCode}_continued`
  );

  console.log(
    JSON.stringify(
      {
        sessionCode: loaded?.session.sessionCode ?? null,
        snapshotCode: loaded?.snapshotCode ?? null,
        continuityCode: updated?.continuityCode ?? null
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
