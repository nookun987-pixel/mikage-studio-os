import { z } from 'zod';

import { studioSessionApplicationResponseSchema } from '@mikage/studio-session-application';

export const runtimeSessionStoreOptionsSchema = z.object({
  filePath: z.string().min(1)
});

export const runtimeSessionStoreSnapshotSchema = z.object({
  sessions: z.record(z.string(), studioSessionApplicationResponseSchema)
});

export type RuntimeSessionStoreSnapshot = z.infer<
  typeof runtimeSessionStoreSnapshotSchema
>;
