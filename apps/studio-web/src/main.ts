import { renderStudioExecutionPanel } from '@mikage/studio-execution-panel';
import { renderStudioQueryPanel } from '@mikage/studio-query-panel';
import { renderStudioSessionWorkspace } from '@mikage/studio-session-workspace';
import { createStudioWebShell } from '@mikage/studio-web-shell';
import { renderStudioWorklistPanel } from '@mikage/studio-worklist-panel';

export const serviceName = 'studio-web';

export const bootstrap = () => {
  const shell = createStudioWebShell({
    title: 'Mikage Studio OS',
    hostBaseUrl: 'http://127.0.0.1:43130'
  });

  return [
    shell.render(),
    renderStudioExecutionPanel({
      requestCode: 'bootstrap_execution',
      status: 'idle',
      routeCode: 'runtime_execution_route',
      executionEnvelope: null,
      routeResponse: {
        routeCode: 'runtime_execution_route',
        executionEnvelope: null,
        queryEnvelope: null,
        worklistEnvelope: null,
        error: null
      },
      errorMessage: null
    }),
    renderStudioQueryPanel({
      operation: 'package_summary_lookup',
      recordCode: 'pkg_bootstrap',
      status: 'idle',
      queryEnvelope: null,
      routeResponse: {
        routeCode: 'studio_query_route',
        executionEnvelope: null,
        queryEnvelope: null,
        worklistEnvelope: null,
        error: null
      },
      errorMessage: null
    }),
    renderStudioWorklistPanel({
      status: 'idle',
      selectedItemCode: null,
      worklistEnvelope: null,
      routeResponse: {
        routeCode: 'worklist_projection_route',
        executionEnvelope: null,
        queryEnvelope: null,
        worklistEnvelope: null,
        error: null
      },
      errorMessage: null
    }),
    renderStudioSessionWorkspace({
      sessionCode: 'session_bootstrap',
      snapshotCode: 'snapshot_bootstrap',
      continuityCode: 'session_bootstrap_stable_none',
      sessionKind: 'execution',
      selectionContext: null,
      activeReviewContext: null,
      executionReferenceCount: 0,
      queryReferenceCount: 0,
      worklistReferenceCount: 0,
      persistedSession: {
        session: {
          sessionCode: 'session_bootstrap',
          context: {
            sessionKind: 'execution',
            createdFrom: 'bootstrap'
          },
          executionReferences: [],
          queryReferences: [],
          worklistReferences: []
        },
        snapshotCode: 'snapshot_bootstrap',
        continuityCode: 'session_bootstrap_stable_none',
        selectionContext: null,
        activeReviewContext: null
      },
      sessionResponse: {
        routeCode: 'session_open_route',
        status: 'ok',
        payload: {
          session: {
            sessionCode: 'session_bootstrap',
            context: {
              sessionKind: 'execution',
              createdFrom: 'bootstrap'
            },
            executionReferences: [],
            queryReferences: [],
            worklistReferences: []
          },
          snapshotCode: 'snapshot_bootstrap',
          continuityCode: 'session_bootstrap_stable_none',
          selectionContext: null,
          activeReviewContext: null
        },
        error: null,
        metadata: {
          sessionCode: 'session_bootstrap',
          operation: 'open'
        }
      }
    })
  ].join('\n');
};
