import { z } from 'zod';

export const studioShellRegionCodeSchema = z.enum([
  'execution',
  'query',
  'worklist',
  'session'
]);

export const studioHostEndpointsSchema = z.object({
  executionPath: z.literal('/runtime/execute'),
  queryPath: z.literal('/studio/query'),
  worklistPath: z.literal('/worklist/project')
});

export const studioNavigationRegionSchema = z.object({
  regionCode: studioShellRegionCodeSchema,
  label: z.string().min(1),
  mountId: z.string().min(1)
});

export const studioWebShellStateSchema = z.object({
  title: z.string().min(1),
  hostBaseUrl: z.string().min(1),
  activeRegion: studioShellRegionCodeSchema,
  sessionCode: z.string().min(1).nullable(),
  endpoints: studioHostEndpointsSchema,
  navigation: z.array(studioNavigationRegionSchema).min(4)
});

export type StudioShellRegionCode = z.infer<typeof studioShellRegionCodeSchema>;
export type StudioWebShellState = z.infer<typeof studioWebShellStateSchema>;
