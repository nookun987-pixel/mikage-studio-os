import { z } from 'zod';

import { studioRouteAdapterResponseSchema } from '../../studio-api-route-adapter/src/contracts.js';
import { studioJobDispatchResultSchema } from '../../studio-job-orchestration/src/contracts.js';
import { studioSessionApplicationResponseSchema } from '../../studio-session-application/src/contracts.js';

export const runtimeCompositionResultSchema = z.object({
  route: studioRouteAdapterResponseSchema,
  job: studioJobDispatchResultSchema,
  session: studioSessionApplicationResponseSchema,
  memory: z.object({
    routeCount: z.coerce.number().int().nonnegative(),
    jobCount: z.coerce.number().int().nonnegative(),
    sessionCount: z.coerce.number().int().nonnegative()
  })
});

export type RuntimeCompositionResult = z.infer<
  typeof runtimeCompositionResultSchema
>;
