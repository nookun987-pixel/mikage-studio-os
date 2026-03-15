import { z } from 'zod';

export const studioUiRegionSchema = z.enum([
  'execution',
  'query',
  'worklist',
  'session'
]);

export const studioUiStateSchema = z.object({
  activeRegion: studioUiRegionSchema,
  activeSessionCode: z.string().min(1).nullable(),
  selectedWorkItemCode: z.string().min(1).nullable(),
  continuityCode: z.string().min(1).nullable(),
  lastExecutionRequestCode: z.string().min(1).nullable(),
  lastQueryRecordCode: z.string().min(1).nullable(),
  errorCount: z.coerce.number().int().nonnegative()
});

export type StudioUiState = z.infer<typeof studioUiStateSchema>;
