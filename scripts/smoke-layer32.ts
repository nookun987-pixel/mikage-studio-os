import {
  renderStudioExecutionPanel,
  submitStudioExecution
} from '../packages/studio-execution-panel/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  runtimeRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer32', 43132);

  try {
    const state = await submitStudioExecution({
      baseUrl: runtime.address.baseUrl,
      runtimeRequest: runtimeRequestFixture('layer32_execution_001')
    });

    console.log(
      JSON.stringify(
        {
          requestCode: state.requestCode,
          status: state.status,
          finalStatus: state.executionEnvelope?.payload.finalStatus ?? null,
          rendered: renderStudioExecutionPanel(state).includes('Execution')
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
