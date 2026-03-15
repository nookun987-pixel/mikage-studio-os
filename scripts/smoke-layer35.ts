import {
  renderStudioSessionWorkspace,
  loadStudioSessionWorkspace,
  openStudioSessionWorkspace,
  updateStudioSessionContinuity
} from '../packages/studio-session-workspace/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture,
  worklistRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer35', 43135);

  try {
    const executionState = await openStudioSessionWorkspace({
      baseUrl: runtime.address.baseUrl,
      sessionRequest: {
        sessionCode: 'layer35_workspace_001',
        runtimeRequest: runtimeRequestFixture('layer35_workspace_001'),
        selectionContext: {
          selectedCode: 'pkg_layer35_workspace_001',
          selectedKind: 'package'
        }
      }
    });

    const worklistState = await openStudioSessionWorkspace({
      baseUrl: runtime.address.baseUrl,
      sessionRequest: {
        sessionCode: 'layer35_workspace_002',
        previousSession: executionState.persistedSession.session,
        worklistRequest: worklistRequestFixture('layer35_workspace_001'),
        selectionContext: {
          selectedCode:
            executionState.selectionContext?.selectedCode ??
            'pkg_layer35_workspace_001',
          selectedKind: 'package'
        },
        activeReviewContext: {
          reviewCode: 'persist_layer35_workspace_001',
          reviewCategory: 'lineage_review'
        }
      }
    });

    const updated = await updateStudioSessionContinuity(
      {
        baseUrl: runtime.address.baseUrl,
        sessionCode: worklistState.sessionCode,
        continuityCode: `${worklistState.continuityCode}_ui`
      }
    );
    const loaded = await loadStudioSessionWorkspace({
      baseUrl: runtime.address.baseUrl,
      sessionCode: worklistState.sessionCode
    });

    console.log(
      JSON.stringify(
        {
          sessionCode: loaded.sessionCode,
          sessionKind: loaded.sessionKind,
          continuityCode: updated.payload?.continuityCode ?? null,
          rendered: renderStudioSessionWorkspace(worklistState).includes(
            'Session Workspace'
          )
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
