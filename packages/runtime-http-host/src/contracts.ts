import { z } from 'zod';

export const runtimeHttpRouteSchema = z.enum([
  '/runtime/execute',
  '/studio/query',
  '/worklist/project',
  '/health',
  '/ready',
  '/diagnostics',
  '/session/open',
  '/session/load',
  '/session/save',
  '/session/update',
  '/session/continuity'
]);

export const runtimeHttpHostOptionsSchema = z.object({
  port: z.coerce.number().int().positive(),
  host: z.string().min(1).default('127.0.0.1')
});

export type RuntimeHttpRoute = z.infer<typeof runtimeHttpRouteSchema>;
export type RuntimeHttpHostOptions = z.infer<typeof runtimeHttpHostOptionsSchema>;
