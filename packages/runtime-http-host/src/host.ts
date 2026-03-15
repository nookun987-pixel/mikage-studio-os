import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';

import { createSessionHttpHostAdapter } from '@mikage/session-http-host-adapter';
import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';
import { dispatchStudioRoute } from '@mikage/studio-api-route-adapter';

import { runtimeHttpHostOptionsSchema } from './contracts.js';

const readBody = async (request: IncomingMessage): Promise<unknown> => {
  const chunks: Uint8Array[] = [];

  for await (const chunk of request) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const sendJson = (response: ServerResponse, statusCode: number, payload: unknown) => {
  response.writeHead(statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payload));
};

const routeRequest = async (
  request: IncomingMessage,
  sessionAdapter?: ReturnType<typeof createSessionHttpHostAdapter>
) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  const body =
    request.method === 'POST' ? await readBody(request) : undefined;

  if (sessionAdapter && (await sessionAdapter.canHandle(url.pathname))) {
    return sessionAdapter.route({
      method: (request.method ?? 'GET') as 'GET' | 'POST',
      pathname: url.pathname,
      searchParams: url.searchParams,
      body
    });
  }

  if (request.method === 'POST' && url.pathname === '/runtime/execute') {
    return dispatchStudioRoute({
      routeCode: 'runtime_execution_route',
      input: body as never
    });
  }

  if (request.method === 'GET' && url.pathname === '/studio/query') {
    return dispatchStudioRoute({
      routeCode: 'studio_query_route',
      input: {
        operation: url.searchParams.get('operation') ?? 'package_summary_lookup',
        recordCode: url.searchParams.get('recordCode') ?? 'missing_record'
      } as never
    });
  }

  if (request.method === 'POST' && url.pathname === '/worklist/project') {
    return dispatchStudioRoute({
      routeCode: 'worklist_projection_route',
      input: body as never
    });
  }

  return {
    routeCode: 'studio_query_route',
    executionEnvelope: null,
    queryEnvelope: null,
    worklistEnvelope: null,
    error: {
      code: 'route_unknown',
      message: `Unknown route: ${request.method ?? 'GET'} ${url.pathname}`
    }
  };
};

export const createRuntimeHttpHost = (
  rawOptions: { port: number; host?: string },
  dependencies?: {
    sessionAdapter?: ReturnType<typeof createSessionHttpHostAdapter>;
    diagnosticsAdapter?: {
      canHandle: (pathname: string) => Promise<boolean>;
      route: (pathname: string) => Promise<unknown>;
    };
    logger?: StructuredLogger;
    observability?: {
      increment: (counterName: string, value?: number, context?: Record<string, unknown>) => void;
      recordTrace: (
        flow: string,
        step: string,
        status: 'ok' | 'error',
        metadata?: Record<string, unknown>
      ) => void;
    };
  }
) => {
  const options = runtimeHttpHostOptionsSchema.parse(rawOptions);
  const logger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'runtime-http-host'
    });

  const server: Server = createServer(async (request, response) => {
    try {
      dependencies?.observability?.increment('host_requests_total', 1, {
        method: request.method ?? 'GET',
        path: request.url ?? '/'
      });
      logger.info('http.request', {
        method: request.method ?? 'GET',
        path: request.url ?? '/'
      });
      const url = new URL(request.url ?? '/', 'http://127.0.0.1');

      if (dependencies?.diagnosticsAdapter && (await dependencies.diagnosticsAdapter.canHandle(url.pathname))) {
        dependencies?.observability?.increment('diagnostics_checks_total', 1, {
          path: url.pathname
        });
        const routed = await dependencies.diagnosticsAdapter.route(url.pathname);
        sendJson(response, 200, routed);
        return;
      }

      const routed = await routeRequest(request, dependencies?.sessionAdapter);
      sendJson(
        response,
        'status' in routed
          ? routed.status === 'error'
            ? 400
            : 200
          : routed.error
            ? 400
            : 200,
        routed
      );
    } catch (error) {
      dependencies?.observability?.recordTrace('http', 'request_failed', 'error', {
        message: error instanceof Error ? error.message : 'Unknown host error.'
      });
      logger.error('http.error', {
        message: error instanceof Error ? error.message : 'Unknown host error.'
      });
      sendJson(response, 500, {
        routeCode: 'studio_query_route',
        executionEnvelope: null,
        queryEnvelope: null,
        worklistEnvelope: null,
        error: {
          code: 'route_validation_error',
          message: error instanceof Error ? error.message : 'Unknown host error.'
        }
      });
    }
  });

  return {
    async start() {
      await new Promise<void>((resolve) => {
        server.listen(options.port, options.host, () => resolve());
      });
      logger.info('http.started', {
        host: options.host,
        port: options.port
      });

      return {
        host: options.host,
        port: options.port
      };
    },
    async stop() {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
      logger.info('http.stopped', {
        host: options.host,
        port: options.port
      });
    }
  };
};
