import { z } from 'zod';

export const stateSnapshotRequestSchema = z.object({
  characterCode: z.string().min(1),
  anchorCode: z.string().min(1)
});
