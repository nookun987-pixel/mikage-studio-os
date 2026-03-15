import { z } from 'zod';

import { reviewProjectionRequestSchema } from '../../review-worklist-projection/src/contracts.js';
import { executionPortRequestSchema } from '../../runtime-execution-port/src/contracts.js';
import { studioQueryRequestSchema } from '../../studio-query-boundary/src/contracts.js';
import {
  executionEnvelopeSchema,
  queryEnvelopeSchema,
  worklistEnvelopeSchema
} from '../../transport-prep-boundary/src/contracts.js';

export const studioRouteCodeSchema = z.enum([
  'runtime_execution_route',
  'studio_query_route',
  'worklist_projection_route'
]);

export const studioRouteAdapterRequestSchema = z.discriminatedUnion('routeCode', [
  z.object({
    routeCode: z.literal('runtime_execution_route'),
    input: executionPortRequestSchema
  }),
  z.object({
    routeCode: z.literal('studio_query_route'),
    input: studioQueryRequestSchema
  }),
  z.object({
    routeCode: z.literal('worklist_projection_route'),
    input: reviewProjectionRequestSchema
  })
]);

export const studioRouteErrorSchema = z.object({
  code: z.enum(['route_validation_error', 'route_execution_stopped', 'route_unknown']),
  message: z.string().min(1)
});

export const studioRouteAdapterResponseSchema = z.object({
  routeCode: studioRouteCodeSchema,
  executionEnvelope: executionEnvelopeSchema.nullable(),
  queryEnvelope: queryEnvelopeSchema.nullable(),
  worklistEnvelope: worklistEnvelopeSchema.nullable(),
  error: studioRouteErrorSchema.nullable()
});

export type StudioRouteAdapterRequest = z.infer<
  typeof studioRouteAdapterRequestSchema
>;
export type StudioRouteAdapterResponse = z.infer<
  typeof studioRouteAdapterResponseSchema
>;
