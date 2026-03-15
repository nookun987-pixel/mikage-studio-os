import { z } from 'zod';

import {
  executionEnvelopeSchema,
  queryEnvelopeSchema,
  worklistEnvelopeSchema
} from '../../transport-prep-boundary/src/contracts.js';

export const studioSessionContextSchema = z.object({
  sessionKind: z.enum(['execution', 'query', 'worklist']),
  createdFrom: z.string().min(1)
});

export const studioSessionReferenceSchema = z.object({
  referenceKind: z.enum(['execution', 'query', 'worklist']),
  referenceCode: z.string().min(1)
});

export const studioSessionSchema = z.object({
  sessionCode: z.string().min(1),
  context: studioSessionContextSchema,
  executionReferences: z.array(studioSessionReferenceSchema),
  queryReferences: z.array(studioSessionReferenceSchema),
  worklistReferences: z.array(studioSessionReferenceSchema)
});

export type StudioSession = z.infer<typeof studioSessionSchema>;
export type ExecutionEnvelope = z.infer<typeof executionEnvelopeSchema>;
export type QueryEnvelope = z.infer<typeof queryEnvelopeSchema>;
export type WorklistEnvelope = z.infer<typeof worklistEnvelopeSchema>;
