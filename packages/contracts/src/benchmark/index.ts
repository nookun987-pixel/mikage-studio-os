import { z } from 'zod';

export const benchmarkRequestSchema = z.object({
  assetCode: z.string().min(1)
});
