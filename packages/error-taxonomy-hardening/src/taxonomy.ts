import { platformErrorSchema, type PlatformError } from './contracts.js';

export const normalizePlatformError = (input: {
  surface: PlatformError['surface'];
  code?: string | null;
  message: string;
}): PlatformError => {
  const normalizedCode =
    input.code === 'route_validation_error'
      ? 'route.validation'
      : input.code === 'route_unknown'
        ? 'route.unknown'
        : input.code === 'session_not_found'
          ? 'session.not_found'
          : input.surface === 'query'
            ? 'query.not_found'
            : input.surface === 'worklist'
              ? 'worklist.validation'
              : input.surface === 'storage'
                ? 'storage.unavailable'
                : input.surface === 'job'
                  ? 'job.failed'
                  : input.surface === 'session'
                    ? 'session.validation'
                    : 'runtime.unknown';

  const severity =
    normalizedCode === 'query.not_found' || normalizedCode === 'worklist.validation'
      ? 'warning'
      : 'error';

  return platformErrorSchema.parse({
    code: normalizedCode,
    surface: input.surface,
    message: input.message,
    severity
  });
};
