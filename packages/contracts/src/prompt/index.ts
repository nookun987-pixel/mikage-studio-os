import { z } from 'zod';

export const promptCompileRequestSchema = z.object({
  presetCode: z.string().min(1),
  variantCode: z.string().min(1)
});
