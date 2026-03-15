import { z } from 'zod';

import { reviewProjectionResponseSchema } from '../../review-worklist-projection/src/contracts.js';
import { executionPortRequestSchema, executionPortResponseSchema } from '../../runtime-execution-port/src/contracts.js';
import { studioQueryRequestSchema, studioQueryResponseSchema } from '../../studio-query-boundary/src/contracts.js';
import {
  executionEnvelopeSchema,
  queryEnvelopeSchema,
  worklistEnvelopeSchema
} from '../../transport-prep-boundary/src/contracts.js';

export const routeMethodSchema = z.enum(['POST', 'GET']);

export const runtimeExecutionRouteContractSchema = z.object({
  routeCode: z.literal('runtime_execution_route'),
  method: z.literal('POST'),
  inputContract: executionPortRequestSchema,
  outputContract: executionPortResponseSchema,
  transportEnvelope: executionEnvelopeSchema
});

export const studioQueryRouteContractSchema = z.object({
  routeCode: z.literal('studio_query_route'),
  method: z.literal('GET'),
  inputContract: studioQueryRequestSchema,
  outputContract: studioQueryResponseSchema,
  transportEnvelope: queryEnvelopeSchema
});

export const worklistProjectionRouteContractSchema = z.object({
  routeCode: z.literal('worklist_projection_route'),
  method: z.literal('POST'),
  inputContract: z.object({
    projectionCode: z.string().min(1)
  }),
  outputContract: reviewProjectionResponseSchema,
  transportEnvelope: worklistEnvelopeSchema
});

export type RuntimeExecutionRouteContract = z.infer<
  typeof runtimeExecutionRouteContractSchema
>;
export type StudioQueryRouteContract = z.infer<
  typeof studioQueryRouteContractSchema
>;
export type WorklistProjectionRouteContract = z.infer<
  typeof worklistProjectionRouteContractSchema
>;
