import {
  buildStudioErrorSurface,
  renderStudioErrorSurface
} from '../packages/studio-error-surface/src/index.ts';
import { createStudioHostClients } from '../packages/studio-host-clients/src/index.ts';
import { submitStudioQuery } from '../packages/studio-query-panel/src/index.ts';

import { createIsolatedRuntimeServiceHost } from './wave6-fixtures.ts';

const main = async () => {
  const runtime = await createIsolatedRuntimeServiceHost('layer41', 43141);
  const clients = createStudioHostClients({ baseUrl: runtime.address.baseUrl });

  try {
    const query = await submitStudioQuery({
      baseUrl: runtime.address.baseUrl,
      queryRequest: {
        operation: 'lineage_summary_lookup',
        recordCode: 'missing_record_001'
      }
    });
    const session = await clients.loadSession('missing_session_001');
    const surface = buildStudioErrorSurface({
      query,
      session
    });

    console.log(
      JSON.stringify(
        {
          errorCount: surface.items.length,
          hasSessionError: renderStudioErrorSurface(surface).includes('Session not found'),
          hasQueryError: renderStudioErrorSurface(surface).includes('Query returned no record.')
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
