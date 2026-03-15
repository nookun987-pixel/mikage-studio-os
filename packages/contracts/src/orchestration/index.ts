import { z } from 'zod';

export const cinematicJobRequestSchema = z.object({
  projectSlug: z.string().min(1),
  characterCode: z.string().min(1),
  anchorCode: z.string().min(1),
  presetCode: z.string().min(1),
  variantCode: z.string().min(1),
  sceneCode: z.string().min(1),
  shotCode: z.string().min(1),
  providerCode: z.string().min(1),
  outputCount: z.coerce.number().int().positive()
});
