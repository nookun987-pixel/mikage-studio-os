import { z } from 'zod';

import { studioRouteAdapterResponseSchema } from '../../studio-api-route-adapter/src/contracts.js';
import { studioJobDispatchResultSchema } from '../../studio-job-orchestration/src/contracts.js';
import { studioSessionApplicationResponseSchema } from '../../studio-session-application/src/contracts.js';

export const runtimeMemorySnapshotSchema = z.object({
  routeCount: z.coerce.number().int().nonnegative(),
  jobCount: z.coerce.number().int().nonnegative(),
  sessionCount: z.coerce.number().int().nonnegative()
});

export type RuntimeMemorySnapshot = z.infer<typeof runtimeMemorySnapshotSchema>;
export type RouteRecord = z.infer<typeof studioRouteAdapterResponseSchema>;
export type JobRecord = z.infer<typeof studioJobDispatchResultSchema>;
export type SessionRecord = z.infer<typeof studioSessionApplicationResponseSchema>;
