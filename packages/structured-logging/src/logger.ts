import { appendFile } from 'node:fs/promises';

import {
  structuredLogEntrySchema,
  type StructuredLogEntry,
  type StructuredLogger
} from './contracts.js';

export const createStructuredLogger = (input?: {
  component?: string;
  staticContext?: Record<string, unknown>;
  logFilePath?: string;
  now?: () => string;
  sink?: (entry: StructuredLogEntry) => void;
}): StructuredLogger => {
  const component = input?.component ?? 'runtime';
  const staticContext = input?.staticContext ?? {};
  const now = input?.now ?? (() => '1970-01-01T00:00:00.000Z');
  const history: StructuredLogEntry[] = [];

  const write = (
    level: StructuredLogEntry['level'],
    event: string,
    context?: Record<string, unknown>
  ) => {
    const entry = structuredLogEntrySchema.parse({
      timestamp: now(),
      level,
      component,
      event,
      context: {
        ...staticContext,
        ...(context ?? {})
      }
    });

    history.push(entry);
    input?.sink?.(entry);

    if (input?.logFilePath) {
      void appendFile(input.logFilePath, `${JSON.stringify(entry)}\n`, 'utf8');
    }
  };

  return {
    info(event, context) {
      write('info', event, context);
    },
    warn(event, context) {
      write('warn', event, context);
    },
    error(event, context) {
      write('error', event, context);
    },
    child(childComponent, childContext) {
      return createStructuredLogger({
        component: childComponent,
        staticContext: {
          ...staticContext,
          ...(childContext ?? {})
        },
        logFilePath: input?.logFilePath,
        now,
        sink: input?.sink
      });
    },
    entries() {
      return [...history];
    }
  };
};
