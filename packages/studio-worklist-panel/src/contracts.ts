import { z } from 'zod';

import { reviewProjectionRequestSchema } from '@mikage/review-worklist-projection';
import { studioRouteAdapterResponseSchema } from '@mikage/studio-api-route-adapter';
import { worklistEnvelopeSchema } from '@mikage/transport-prep-boundary';

export const studioWorklistPanelRequestSchema = z.object({
  baseUrl: z.string().min(1),
  projectionRequest: reviewProjectionRequestSchema,
  selectedItemCode: z.string().min(1).nullable().optional()
});

export const studioWorklistPanelStateSchema = z.object({
  status: z.enum(['idle', 'ok', 'error']),
  selectedItemCode: z.string().min(1).nullable(),
  worklistEnvelope: worklistEnvelopeSchema.nullable(),
  routeResponse: studioRouteAdapterResponseSchema,
  errorMessage: z.string().nullable()
});

export type StudioWorklistPanelRequest = z.infer<
  typeof studioWorklistPanelRequestSchema
>;
export type StudioWorklistPanelState = z.infer<
  typeof studioWorklistPanelStateSchema
>;
