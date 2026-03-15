import { z } from 'zod';

import { orchestrationChainRequestShellSchema } from '@mikage/runtime-orchestration-boundary';
import { studioRouteAdapterResponseSchema } from '@mikage/studio-api-route-adapter';
import { executionEnvelopeSchema } from '@mikage/transport-prep-boundary';

export const studioExecutionPanelRequestSchema = z.object({
  baseUrl: z.string().min(1),
  runtimeRequest: orchestrationChainRequestShellSchema
});

export const studioExecutionPanelStateSchema = z.object({
  requestCode: z.string().min(1),
  status: z.enum(['idle', 'submitting', 'ok', 'error']),
  routeCode: z.literal('runtime_execution_route'),
  executionEnvelope: executionEnvelopeSchema.nullable(),
  routeResponse: studioRouteAdapterResponseSchema,
  errorMessage: z.string().nullable()
});

export type StudioExecutionPanelRequest = z.infer<
  typeof studioExecutionPanelRequestSchema
>;
export type StudioExecutionPanelState = z.infer<
  typeof studioExecutionPanelStateSchema
>;
