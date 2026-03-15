import {
  renderStudioQueryPanel,
  submitStudioQuery
} from '../packages/studio-query-panel/src/index.ts';

import { createIsolatedRuntimeServiceHost } from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer33', 43133);

  try {
    const state = await submitStudioQuery({
      baseUrl: runtime.address.baseUrl,
      queryRequest: {
        operation: 'package_summary_lookup',
        recordCode: 'pkg_layer33_query_001'
      }
    });

    console.log(
      JSON.stringify(
        {
          operation: state.operation,
          status: state.status,
          resultKind: state.queryEnvelope?.payload.summary.resultKind ?? null,
          rendered: renderStudioQueryPanel(state).includes('Query')
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
