import {
  sessionContinuityRequestSchema,
  sessionHttpResponseSchema,
  sessionLoadRequestSchema,
  sessionHttpRouteCodeSchema
} from './contracts.js';

import { studioSessionApplicationRequestSchema } from '@mikage/studio-session-application';

export const sessionHttpRoutes = {
  open: {
    routeCode: sessionHttpRouteCodeSchema.enum.session_open_route,
    method: 'POST' as const,
    path: '/session/open' as const,
    input: studioSessionApplicationRequestSchema,
    output: sessionHttpResponseSchema
  },
  load: {
    routeCode: sessionHttpRouteCodeSchema.enum.session_load_route,
    method: 'GET' as const,
    path: '/session/load' as const,
    input: sessionLoadRequestSchema,
    output: sessionHttpResponseSchema
  },
  save: {
    routeCode: sessionHttpRouteCodeSchema.enum.session_save_route,
    method: 'POST' as const,
    path: '/session/save' as const,
    input: studioSessionApplicationRequestSchema,
    output: sessionHttpResponseSchema
  },
  update: {
    routeCode: sessionHttpRouteCodeSchema.enum.session_update_route,
    method: 'POST' as const,
    path: '/session/update' as const,
    input: studioSessionApplicationRequestSchema,
    output: sessionHttpResponseSchema
  },
  continuity: {
    routeCode: sessionHttpRouteCodeSchema.enum.session_continuity_route,
    method: 'POST' as const,
    path: '/session/continuity' as const,
    input: sessionContinuityRequestSchema,
    output: sessionHttpResponseSchema
  }
};
