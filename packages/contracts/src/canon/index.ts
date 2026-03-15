import { z } from 'zod';

export const canonValidationRequestSchema = z.object({
  promptPackCode: z.string().min(1)
});
