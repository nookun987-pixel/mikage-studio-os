import {
  renderStudioWorklistPanel,
  submitStudioWorklist
} from '../packages/studio-worklist-panel/src/index.ts';

import {
  createIsolatedRuntimeServiceHost,
  worklistRequestFixture
} from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer34', 43134);

  try {
    const state = await submitStudioWorklist({
      baseUrl: runtime.address.baseUrl,
      projectionRequest: worklistRequestFixture('layer34_worklist_001')
    });

    console.log(
      JSON.stringify(
        {
          status: state.status,
          totalItems: state.worklistEnvelope?.payload.summary.totalItems ?? 0,
          selectedItemCode: state.selectedItemCode,
          rendered: renderStudioWorklistPanel(state).includes('Worklist')
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
