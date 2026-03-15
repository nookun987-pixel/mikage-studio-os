import { createRuntimeMemoryAdapters } from '../../runtime-memory-adapters/src/index.js';
import { dispatchStudioRoute } from '../../studio-api-route-adapter/src/index.js';
import { dispatchStudioJob } from '../../studio-job-orchestration/src/index.js';
import { runStudioSessionApplication } from '../../studio-session-application/src/index.js';

import {
  runtimeCompositionResultSchema,
  type RuntimeCompositionResult
} from './contracts.js';

export const composeRuntimeDeterministicFlow = (input: {
  route: Parameters<typeof dispatchStudioRoute>[0];
  job: Parameters<typeof dispatchStudioJob>[0];
  session: Parameters<typeof runStudioSessionApplication>[0];
}): RuntimeCompositionResult => {
  const memory = createRuntimeMemoryAdapters();
  const route = memory.saveRoute(input.route.routeCode, dispatchStudioRoute(input.route));
  const job = memory.saveJob(input.job.jobCode, dispatchStudioJob(input.job));
  const session = memory.saveSession(
    input.session.sessionCode,
    runStudioSessionApplication(input.session)
  );

  return runtimeCompositionResultSchema.parse({
    route,
    job,
    session,
    memory: memory.snapshot()
  });
};
