import { bootstrap } from '../apps/studio-web/src/main.ts';

import {
  buildStudioErrorSurface,
  renderStudioErrorSurface
} from '../packages/studio-error-surface/src/index.ts';
import { createStudioHostClients } from '../packages/studio-host-clients/src/index.ts';
import {
  applyExecutionState,
  applyQueryState,
  applySessionHttpResponse,
  applyWorklistState,
  createStudioUiState
} from '../packages/studio-ui-state-model/src/index.ts';
import {
  openStudioSessionWorkspace,
  renderStudioSessionWorkspace
} from '../packages/studio-session-workspace/src/index.ts';
import { submitStudioExecution } from '../packages/studio-execution-panel/src/index.ts';
import { submitStudioQuery } from '../packages/studio-query-panel/src/index.ts';
import { submitStudioWorklist } from '../packages/studio-worklist-panel/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture,
  worklistRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer42', 43142);
  const clients = createStudioHostClients({ baseUrl: runtime.address.baseUrl });

  try {
    let state = createStudioUiState();

    const opened = await clients.openSession({
      sessionCode: 'layer42_session_001',
      runtimeRequest: runtimeRequestFixture('layer42_execution_001')
    });
    state = applySessionHttpResponse(state, opened);

    const loaded = await clients.loadSession(opened.payload?.session.sessionCode ?? 'missing');
    state = applySessionHttpResponse(state, loaded);

    const saved = await clients.saveSession({
      sessionCode: 'layer42_session_001',
      runtimeRequest: runtimeRequestFixture('layer42_execution_001'),
      selectionContext: {
        selectedCode: 'pkg_layer42_execution_001',
        selectedKind: 'package'
      }
    });
    state = applySessionHttpResponse(state, saved);

    const updated = await clients.updateSession({
      sessionCode: 'layer42_session_001',
      previousSession: saved.payload?.session,
      worklistRequest: worklistRequestFixture('layer42_execution_001')
    });
    state = applySessionHttpResponse(state, updated);

    const continuity = await clients.updateContinuity({
      sessionCode: updated.payload?.session.sessionCode ?? 'missing',
      continuityCode: `${updated.payload?.continuityCode ?? 'missing'}_final`
    });
    state = applySessionHttpResponse(state, continuity);

    const execution = await submitStudioExecution({
      baseUrl: runtime.address.baseUrl,
      runtimeRequest: runtimeRequestFixture('layer42_execution_001')
    });
    state = applyExecutionState(state, execution);

    const query = await submitStudioQuery({
      baseUrl: runtime.address.baseUrl,
      queryRequest: {
        operation: 'package_summary_lookup',
        recordCode: 'pkg_layer42_execution_001'
      }
    });
    state = applyQueryState(state, query);

    const worklist = await submitStudioWorklist({
      baseUrl: runtime.address.baseUrl,
      projectionRequest: worklistRequestFixture('layer42_execution_001')
    });
    state = applyWorklistState(state, worklist);

    const workspace = await openStudioSessionWorkspace({
      baseUrl: runtime.address.baseUrl,
      sessionRequest: {
        sessionCode: 'layer42_workspace_001',
        runtimeRequest: runtimeRequestFixture('layer42_execution_001'),
        selectionContext: {
          selectedCode: worklist.selectedItemCode ?? 'pkg_layer42_execution_001',
          selectedKind: 'package'
        }
      }
    });

    const surface = buildStudioErrorSurface({
      execution,
      query,
      worklist,
      session: continuity
    });

    console.log(
      JSON.stringify(
        {
          sessionStatus: continuity.status,
          executionStatus: execution.status,
          queryStatus: query.status,
          worklistStatus: worklist.status,
          uiRegion: state.activeRegion,
          activeSessionCode: state.activeSessionCode,
          htmlReady:
            bootstrap().includes('Mikage Studio OS') &&
            renderStudioSessionWorkspace(workspace).includes('Session Workspace') &&
            renderStudioErrorSurface(surface).includes('aside')
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
