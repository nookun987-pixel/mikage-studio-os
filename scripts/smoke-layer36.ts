import { bootstrap } from '../apps/studio-web/src/main.ts';

import {
  renderStudioExecutionPanel,
  submitStudioExecution
} from '../packages/studio-execution-panel/src/index.ts';
import {
  renderStudioQueryPanel,
  submitStudioQuery
} from '../packages/studio-query-panel/src/index.ts';
import {
  renderStudioSessionWorkspace,
  openStudioSessionWorkspace
} from '../packages/studio-session-workspace/src/index.ts';
import { createStudioWebShell } from '../packages/studio-web-shell/src/index.ts';
import {
  renderStudioWorklistPanel,
  submitStudioWorklist
} from '../packages/studio-worklist-panel/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture,
  worklistRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer36', 43136);

  try {
    const shell = createStudioWebShell({
      title: 'Mikage Studio OS',
      hostBaseUrl: runtime.address.baseUrl,
      sessionCode: 'session_layer36'
    });
    const execution = await submitStudioExecution({
      baseUrl: runtime.address.baseUrl,
      runtimeRequest: runtimeRequestFixture('layer36_execution_001')
    });
    const query = await submitStudioQuery({
      baseUrl: runtime.address.baseUrl,
      queryRequest: {
        operation: 'package_summary_lookup',
        recordCode: 'pkg_layer36_execution_001'
      }
    });
    const worklist = await submitStudioWorklist({
      baseUrl: runtime.address.baseUrl,
      projectionRequest: worklistRequestFixture('layer36_execution_001')
    });
    const workspace = await openStudioSessionWorkspace({
      baseUrl: runtime.address.baseUrl,
      sessionRequest: {
        sessionCode: 'layer36_workspace_001',
        runtimeRequest: runtimeRequestFixture('layer36_execution_001'),
        selectionContext: {
          selectedCode: worklist.selectedItemCode ?? 'pkg_layer36_execution_001',
          selectedKind: 'package'
        }
      }
    });

    console.log(
      JSON.stringify(
        {
          shellActiveRegion: shell.state.activeRegion,
          executionStatus: execution.status,
          queryStatus: query.status,
          worklistStatus: worklist.status,
          sessionCode: workspace.sessionCode,
          htmlReady:
            shell.render().includes('studio-session-workspace') &&
            renderStudioExecutionPanel(execution).includes('Execution') &&
            renderStudioQueryPanel(query).includes('Query') &&
            renderStudioWorklistPanel(worklist).includes('Worklist') &&
            renderStudioSessionWorkspace(workspace).includes('Session Workspace') &&
            bootstrap().includes('Mikage Studio OS')
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
