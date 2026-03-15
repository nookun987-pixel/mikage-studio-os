import {
  sessionContinuityRequestSchema,
  sessionHttpResponseSchema,
  sessionLoadRequestSchema,
  sessionHttpRoutes
} from '@mikage/session-http-route-contracts';
import { studioSessionApplicationRequestSchema } from '@mikage/studio-session-application';

import {
  sessionHttpAdapterRequestSchema,
  type SessionHttpAdapterPort
} from './contracts.js';

const notFound = (routeCode: typeof sessionHttpRoutes.load.routeCode, sessionCode: string) =>
  sessionHttpResponseSchema.parse({
    routeCode,
    status: 'error',
    payload: null,
    error: {
      code: 'session_not_found',
      message: `Session not found: ${sessionCode}`
    },
    metadata: {
      sessionCode,
      operation: 'load'
    }
  });

export const createSessionHttpHostAdapter = (port: SessionHttpAdapterPort) => ({
  async canHandle(pathname: string) {
    return pathname.startsWith('/session/');
  },
  async route(rawInput: {
    method: 'GET' | 'POST';
    pathname: string;
    searchParams: URLSearchParams;
    body?: unknown;
  }) {
    const input = sessionHttpAdapterRequestSchema.parse(rawInput);

    if (input.method === 'POST' && input.pathname === sessionHttpRoutes.open.path) {
      const request = studioSessionApplicationRequestSchema.parse(input.body);
      const payload = await port.saveSession(request);

      return sessionHttpResponseSchema.parse({
        routeCode: sessionHttpRoutes.open.routeCode,
        status: 'ok',
        payload,
        error: null,
        metadata: {
          sessionCode: payload?.session.sessionCode ?? null,
          operation: 'open'
        }
      });
    }

    if (input.method === 'GET' && input.pathname === sessionHttpRoutes.load.path) {
      const request = sessionLoadRequestSchema.parse({
        sessionCode: input.searchParams.get('sessionCode') ?? ''
      });
      const payload = await port.readSession(request.sessionCode);

      return payload
        ? sessionHttpResponseSchema.parse({
            routeCode: sessionHttpRoutes.load.routeCode,
            status: 'ok',
            payload,
            error: null,
            metadata: {
              sessionCode: payload.session.sessionCode,
              operation: 'load'
            }
          })
        : notFound(sessionHttpRoutes.load.routeCode, request.sessionCode);
    }

    if (input.method === 'POST' && input.pathname === sessionHttpRoutes.save.path) {
      const request = studioSessionApplicationRequestSchema.parse(input.body);
      const payload = await port.saveSession(request);

      return sessionHttpResponseSchema.parse({
        routeCode: sessionHttpRoutes.save.routeCode,
        status: 'ok',
        payload,
        error: null,
        metadata: {
          sessionCode: payload?.session.sessionCode ?? null,
          operation: 'save'
        }
      });
    }

    if (input.method === 'POST' && input.pathname === sessionHttpRoutes.update.path) {
      const request = studioSessionApplicationRequestSchema.parse(input.body);
      const payload = await port.saveSession(request);

      return sessionHttpResponseSchema.parse({
        routeCode: sessionHttpRoutes.update.routeCode,
        status: 'ok',
        payload,
        error: null,
        metadata: {
          sessionCode: payload?.session.sessionCode ?? null,
          operation: 'update'
        }
      });
    }

    if (input.method === 'POST' && input.pathname === sessionHttpRoutes.continuity.path) {
      const request = sessionContinuityRequestSchema.parse(input.body);
      const payload = await port.updateSessionContinuity(
        request.sessionCode,
        request.continuityCode
      );

      return payload
        ? sessionHttpResponseSchema.parse({
            routeCode: sessionHttpRoutes.continuity.routeCode,
            status: 'ok',
            payload,
            error: null,
            metadata: {
              sessionCode: payload.session.sessionCode,
              operation: 'continuity'
            }
          })
        : sessionHttpResponseSchema.parse({
            routeCode: sessionHttpRoutes.continuity.routeCode,
            status: 'error',
            payload: null,
            error: {
              code: 'session_not_found',
              message: `Session not found: ${request.sessionCode}`
            },
            metadata: {
              sessionCode: request.sessionCode,
              operation: 'continuity'
            }
          });
    }

    return sessionHttpResponseSchema.parse({
      routeCode: sessionHttpRoutes.load.routeCode,
      status: 'error',
      payload: null,
      error: {
        code: 'session_unknown_route',
        message: `Unknown session route: ${input.method} ${input.pathname}`
      },
      metadata: {
        sessionCode: null,
        operation: 'load'
      }
    });
  }
});
