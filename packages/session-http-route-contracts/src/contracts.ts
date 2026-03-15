import { z } from 'zod';

import {
  studioSessionApplicationRequestSchema,
  studioSessionApplicationResponseSchema
} from '@mikage/studio-session-application';

export const sessionHttpRouteCodeSchema = z.enum([
  'session_open_route',
  'session_load_route',
  'session_save_route',
  'session_update_route',
  'session_continuity_route'
]);

export const sessionHttpRoutePathSchema = z.enum([
  '/session/open',
  '/session/load',
  '/session/save',
  '/session/update',
  '/session/continuity'
]);

export const sessionLoadRequestSchema = z.object({
  sessionCode: z.string().min(1)
});

export const sessionContinuityRequestSchema = z.object({
  sessionCode: z.string().min(1),
  continuityCode: z.string().min(1)
});

export const sessionHttpErrorSchema = z.object({
  code: z.enum(['session_validation_error', 'session_not_found', 'session_unknown_route']),
  message: z.string().min(1)
});

export const sessionHttpResponseSchema = z.object({
  routeCode: sessionHttpRouteCodeSchema,
  status: z.enum(['ok', 'error']),
  payload: studioSessionApplicationResponseSchema.nullable(),
  error: sessionHttpErrorSchema.nullable(),
  metadata: z.object({
    sessionCode: z.string().min(1).nullable(),
    operation: z.enum(['open', 'load', 'save', 'update', 'continuity'])
  })
});

export type SessionHttpRouteCode = z.infer<typeof sessionHttpRouteCodeSchema>;
export type SessionHttpResponse = z.infer<typeof sessionHttpResponseSchema>;
