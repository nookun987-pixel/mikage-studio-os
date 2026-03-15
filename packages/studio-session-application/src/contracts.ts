import { z } from 'zod';

import { reviewProjectionRequestSchema } from '../../review-worklist-projection/src/contracts.js';
import { orchestrationChainRequestShellSchema } from '../../runtime-orchestration-boundary/src/contracts.js';
import { studioQueryRequestSchema } from '../../studio-query-boundary/src/contracts.js';
import { studioSessionSchema } from '../../studio-session-boundary/src/contracts.js';

export const sessionSelectionContextSchema = z.object({
  selectedCode: z.string().min(1),
  selectedKind: z.enum(['package', 'query', 'worklist'])
});

export const activeReviewContextSchema = z.object({
  reviewCode: z.string().min(1),
  reviewCategory: z.enum([
    'generation_review',
    'benchmark_review',
    'persistence_review',
    'lineage_review'
  ])
});

export const studioSessionApplicationRequestSchema = z.object({
  sessionCode: z.string().min(1),
  runtimeRequest: orchestrationChainRequestShellSchema.optional(),
  queryRequest: studioQueryRequestSchema.optional(),
  worklistRequest: reviewProjectionRequestSchema.optional(),
  previousSession: studioSessionSchema.optional(),
  selectionContext: sessionSelectionContextSchema.optional(),
  activeReviewContext: activeReviewContextSchema.optional()
});

export const studioSessionApplicationResponseSchema = z.object({
  session: studioSessionSchema,
  snapshotCode: z.string().min(1),
  continuityCode: z.string().min(1),
  selectionContext: sessionSelectionContextSchema.nullable(),
  activeReviewContext: activeReviewContextSchema.nullable()
});

export type StudioSessionApplicationRequest = z.infer<
  typeof studioSessionApplicationRequestSchema
>;
export type StudioSessionApplicationResponse = z.infer<
  typeof studioSessionApplicationResponseSchema
>;
