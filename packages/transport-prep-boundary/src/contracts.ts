import { z } from 'zod';

import { reviewProjectionResponseSchema } from '../../review-worklist-projection/src/contracts.js';
import { executionPortResponseSchema } from '../../runtime-execution-port/src/contracts.js';
import { studioQueryResponseSchema } from '../../studio-query-boundary/src/contracts.js';

export const transportEnvelopeStatusSchema = z.enum(['ok', 'error']);

export const transportMetadataSchema = z.record(z.string(), z.unknown()).default({});

export const executionEnvelopeSchema = z.object({
  status: transportEnvelopeStatusSchema,
  payload: executionPortResponseSchema,
  error: z.string().nullable(),
  metadata: transportMetadataSchema
});

export const queryEnvelopeSchema = z.object({
  status: transportEnvelopeStatusSchema,
  payload: studioQueryResponseSchema,
  error: z.string().nullable(),
  metadata: transportMetadataSchema
});

export const worklistEnvelopeSchema = z.object({
  status: transportEnvelopeStatusSchema,
  payload: reviewProjectionResponseSchema,
  error: z.string().nullable(),
  metadata: transportMetadataSchema
});

export type ExecutionEnvelope = z.infer<typeof executionEnvelopeSchema>;
export type QueryEnvelope = z.infer<typeof queryEnvelopeSchema>;
export type WorklistEnvelope = z.infer<typeof worklistEnvelopeSchema>;
