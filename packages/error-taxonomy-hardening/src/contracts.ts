import { z } from 'zod';

export const platformErrorCodeSchema = z.enum([
  'route.validation',
  'route.unknown',
  'session.not_found',
  'session.validation',
  'query.not_found',
  'worklist.validation',
  'storage.unavailable',
  'job.failed',
  'runtime.unknown'
]);

export const platformErrorSurfaceSchema = z.enum([
  'execution',
  'query',
  'worklist',
  'session',
  'storage',
  'job',
  'route'
]);

export const platformErrorSeveritySchema = z.enum(['info', 'warning', 'error']);

export const platformErrorSchema = z.object({
  code: platformErrorCodeSchema,
  surface: platformErrorSurfaceSchema,
  message: z.string().min(1),
  severity: platformErrorSeveritySchema
});

export type PlatformError = z.infer<typeof platformErrorSchema>;
