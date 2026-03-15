import { readFile } from 'node:fs/promises';

import { bootstrap } from '../apps/studio-web/src/main.ts';
import { buildStudioErrorSurface } from '../packages/studio-error-surface/src/index.ts';
import {
  createLocalRuntimeConfig
} from '../packages/runtime-config-layer/src/index.ts';
import {
  createStudioHostClients
} from '../packages/studio-host-clients/src/index.ts';
import {
  createStudioUiState,
  applyExecutionState,
  applySessionHttpResponse
} from '../packages/studio-ui-state-model/src/index.ts';
import {
  bootstrapRuntimeStorage
} from '../packages/storage-strategy-cleanup/src/index.ts';
import { submitStudioExecution } from '../packages/studio-execution-panel/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const config = createLocalRuntimeConfig({
    workspaceRoot: 'D:\\mikage-studio-os',
    port: 43148
  });
  const storage = await bootstrapRuntimeStorage(config);
  const runtime = await createIsolatedRuntimeServiceHost('layer48', 43148);
  const clients = createStudioHostClients({
    baseUrl: runtime.address.baseUrl
  });

  try {
    let state = createStudioUiState();
    const opened = await clients.openSession({
      sessionCode: 'layer48_session_001',
      runtimeRequest: runtimeRequestFixture('layer48_execution_001')
    });
    state = applySessionHttpResponse(state, opened);

    const execution = await submitStudioExecution({
      baseUrl: runtime.address.baseUrl,
      runtimeRequest: runtimeRequestFixture('layer48_execution_001')
    });
    state = applyExecutionState(state, execution);

    const diagnostics = await fetch(`${runtime.address.baseUrl}/diagnostics`).then((response) =>
      response.json()
    );
    const errorSurface = buildStudioErrorSurface({
      execution
    });
    const logLines = (
      await readFile('D:\\mikage-studio-os\\.local\\runtime\\layer48.ndjson', 'utf8')
    )
      .split('\n')
      .filter((line) => line.trim().length > 0);

    console.log(
      JSON.stringify(
        {
          activeSessionCode: state.activeSessionCode,
          lastExecutionRequestCode: state.lastExecutionRequestCode,
          diagnosticsStatus: diagnostics.status,
          storageRoot: storage.rootPath,
          logLineCount: logLines.length,
          errorCount: errorSurface.items.length,
          htmlReady: bootstrap().includes('Mikage Studio OS')
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
