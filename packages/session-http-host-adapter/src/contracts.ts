import { z } from 'zod';

import {
  sessionContinuityRequestSchema,
  sessionHttpResponseSchema,
  sessionLoadRequestSchema
} from '@mikage/session-http-route-contracts';
import {
  studioSessionApplicationRequestSchema,
  studioSessionApplicationResponseSchema,
  type StudioSessionApplicationRequest,
  type StudioSessionApplicationResponse
} from '@mikage/studio-session-application';

export const sessionHttpAdapterRequestSchema = z.object({
  method: z.enum(['GET', 'POST']),
  pathname: z.string().min(1),
  searchParams: z.instanceof(URLSearchParams),
  body: z.unknown().optional()
});

export const sessionHttpAdapterPortSchema = z.object({
  saveSession: z.function().args(studioSessionApplicationRequestSchema).returns(z.promise(studioSessionApplicationResponseSchema)),
  readSession: z.function().args(z.string().min(1)).returns(z.promise(studioSessionApplicationResponseSchema.nullable())),
  updateSessionContinuity: z
    .function()
    .args(z.string().min(1), z.string().min(1))
    .returns(z.promise(studioSessionApplicationResponseSchema.nullable()))
});

export type SessionHttpAdapterResponse = z.infer<typeof sessionHttpResponseSchema>;
export type SessionLoadRequest = z.infer<typeof sessionLoadRequestSchema>;
export type SessionContinuityRequest = z.infer<typeof sessionContinuityRequestSchema>;
export type SessionHttpAdapterPort = {
  saveSession: (
    request: StudioSessionApplicationRequest
  ) => Promise<StudioSessionApplicationResponse>;
  readSession: (sessionCode: string) => Promise<StudioSessionApplicationResponse | null>;
  updateSessionContinuity: (
    sessionCode: string,
    continuityCode: string
  ) => Promise<StudioSessionApplicationResponse | null>;
};
