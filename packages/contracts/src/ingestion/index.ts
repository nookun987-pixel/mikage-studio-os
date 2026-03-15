import { z } from 'zod';

export const ingestionRequestSchema = z.object({
  jobCode: z.string().min(1),
  assetCount: z.coerce.number().int().nonnegative()
});
