import { z } from 'zod';

import { studioRouteAdapterResponseSchema } from '@mikage/studio-api-route-adapter';
import { studioQueryRequestSchema } from '@mikage/studio-query-boundary';
import { queryEnvelopeSchema } from '@mikage/transport-prep-boundary';

export const studioQueryPanelRequestSchema = z.object({
  baseUrl: z.string().min(1),
  queryRequest: studioQueryRequestSchema
});

export const studioQueryPanelStateSchema = z.object({
  operation: studioQueryRequestSchema.shape.operation,
  recordCode: z.string().min(1),
  status: z.enum(['idle', 'ok', 'error']),
  queryEnvelope: queryEnvelopeSchema.nullable(),
  routeResponse: studioRouteAdapterResponseSchema,
  errorMessage: z.string().nullable()
});

export type StudioQueryPanelRequest = z.infer<typeof studioQueryPanelRequestSchema>;
export type StudioQueryPanelState = z.infer<typeof studioQueryPanelStateSchema>;
