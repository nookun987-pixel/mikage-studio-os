import { z } from 'zod';

export const reviewTaskRequestSchema = z.object({
  jobCode: z.string().min(1),
  assetCode: z.string().min(1)
});
