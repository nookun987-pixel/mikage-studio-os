import { z } from 'zod';

import {
  activeReviewContextSchema,
  sessionSelectionContextSchema,
  studioSessionApplicationRequestSchema,
  studioSessionApplicationResponseSchema
} from '@mikage/studio-session-application';
import { sessionHttpResponseSchema } from '@mikage/session-http-route-contracts';

export const studioSessionWorkspaceOpenRequestSchema = z.object({
  baseUrl: z.string().min(1),
  sessionRequest: studioSessionApplicationRequestSchema
});

export const studioSessionWorkspaceLoadRequestSchema = z.object({
  baseUrl: z.string().min(1),
  sessionCode: z.string().min(1)
});

export const studioSessionWorkspaceContinuityRequestSchema = z.object({
  baseUrl: z.string().min(1),
  sessionCode: z.string().min(1),
  continuityCode: z.string().min(1)
});

export const studioSessionWorkspaceStateSchema = z.object({
  sessionCode: z.string().min(1),
  snapshotCode: z.string().min(1),
  continuityCode: z.string().min(1),
  sessionKind: z.enum(['execution', 'query', 'worklist']),
  selectionContext: sessionSelectionContextSchema.nullable(),
  activeReviewContext: activeReviewContextSchema.nullable(),
  executionReferenceCount: z.coerce.number().int().nonnegative(),
  queryReferenceCount: z.coerce.number().int().nonnegative(),
  worklistReferenceCount: z.coerce.number().int().nonnegative(),
  persistedSession: studioSessionApplicationResponseSchema,
  sessionResponse: sessionHttpResponseSchema
});

export type StudioSessionWorkspaceOpenRequest = z.infer<
  typeof studioSessionWorkspaceOpenRequestSchema
>;
export type StudioSessionWorkspaceLoadRequest = z.infer<
  typeof studioSessionWorkspaceLoadRequestSchema
>;
export type StudioSessionWorkspaceContinuityRequest = z.infer<
  typeof studioSessionWorkspaceContinuityRequestSchema
>;
export type StudioSessionWorkspaceState = z.infer<
  typeof studioSessionWorkspaceStateSchema
>;
