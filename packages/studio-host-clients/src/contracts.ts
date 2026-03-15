import { z } from 'zod';

export const studioHostClientOptionsSchema = z.object({
  baseUrl: z.string().min(1)
});

export type StudioHostClientOptions = z.infer<typeof studioHostClientOptionsSchema>;
