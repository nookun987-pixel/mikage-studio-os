import { z } from 'zod';

import {
  executionPortResponseSchema
} from '../../runtime-execution-port/src/contracts.js';
import { orchestrationChainRequestShellSchema } from '../../runtime-orchestration-boundary/src/contracts.js';

export const studioFacadeModeSchema = z.literal('studio_runtime_execution');

export const studioFacadeRequestSchema = z.object({
  facadeMode: studioFacadeModeSchema,
  runtimeRequest: orchestrationChainRequestShellSchema
});

export const studioFacadeSummarySchema = z.object({
  requestCode: z.string().min(1),
  finalStatus: executionPortResponseSchema.shape.finalStatus,
  packageCode: z.string().min(1).nullable(),
  studioActionType: executionPortResponseSchema.shape.runtimeResult.shape.studioActionType,
  stopped: z.boolean()
});

export const studioFacadeResponseSchema = z.object({
  facadeMode: studioFacadeModeSchema,
  requestCode: z.string().min(1),
  execution: executionPortResponseSchema,
  summary: studioFacadeSummarySchema
});

export type StudioFacadeRequest = z.infer<typeof studioFacadeRequestSchema>;
export type StudioFacadeSummary = z.infer<typeof studioFacadeSummarySchema>;
export type StudioFacadeResponse = z.infer<typeof studioFacadeResponseSchema>;
