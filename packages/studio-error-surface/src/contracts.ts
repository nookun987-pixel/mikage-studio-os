import { z } from 'zod';

export const studioErrorSurfaceItemSchema = z.object({
  surface: z.enum(['execution', 'query', 'worklist', 'session']),
  code: z.string().min(1),
  message: z.string().min(1),
  severity: z.enum(['info', 'warning', 'error'])
});

export const studioErrorSurfaceSchema = z.object({
  items: z.array(studioErrorSurfaceItemSchema)
});

export type StudioErrorSurface = z.infer<typeof studioErrorSurfaceSchema>;
