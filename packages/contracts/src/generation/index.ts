import { z } from 'zod';

export const generationExecuteRequestSchema = z.object({
  prompt: z.object({
    positivePrompt: z.string().min(1),
    negativePrompt: z.string().default('')
  }),
  generation: z.object({
    variants: z.coerce.number().int().positive(),
    aspectRatio: z.string().min(1),
    model: z.string().min(1),
    cfg: z.coerce.number().nonnegative().optional(),
    seeds: z.array(z.coerce.number().int()).default([])
  })
});
