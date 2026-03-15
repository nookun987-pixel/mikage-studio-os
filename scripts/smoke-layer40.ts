import {
  applyExecutionState,
  applyQueryState,
  applySessionHttpResponse,
  applyWorklistState,
  createStudioUiState
} from '../packages/studio-ui-state-model/src/index.ts';
import { createStudioHostClients } from '../packages/studio-host-clients/src/index.ts';
import {
  submitStudioExecution
} from '../packages/studio-execution-panel/src/index.ts';
import { submitStudioQuery } from '../packages/studio-query-panel/src/index.ts';
import { submitStudioWorklist } from '../packages/studio-worklist-panel/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture,
  worklistRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer40', 43140);
  const clients = createStudioHostClients({ baseUrl: runtime.address.baseUrl });

  try {
    let state = createStudioUiState();
    const execution = await submitStudioExecution({
      baseUrl: runtime.address.baseUrl,
      runtimeRequest: runtimeRequestFixture('layer40_execution_001')
    });
    state = applyExecutionState(state, execution);

    const query = await submitStudioQuery({
      baseUrl: runtime.address.baseUrl,
      queryRequest: {
        operation: 'package_summary_lookup',
        recordCode: 'pkg_layer40_execution_001'
      }
    });
    state = applyQueryState(state, query);

    const worklist = await submitStudioWorklist({
      baseUrl: runtime.address.baseUrl,
      projectionRequest: worklistRequestFixture('layer40_execution_001')
    });
    state = applyWorklistState(state, worklist);

    const session = await clients.openSession({
      sessionCode: 'layer40_session_001',
      runtimeRequest: runtimeRequestFixture('layer40_execution_001')
    });
    state = applySessionHttpResponse(state, session);

    console.log(
      JSON.stringify(
        {
          activeRegion: state.activeRegion,
          activeSessionCode: state.activeSessionCode,
          selectedWorkItemCode: state.selectedWorkItemCode,
          continuityCode: state.continuityCode,
          errorCount: state.errorCount
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
