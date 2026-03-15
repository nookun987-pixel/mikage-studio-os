import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';

import {
  observabilityCounterNameSchema,
  observabilityCounterSchema,
  observabilitySnapshotSchema,
  observabilityTraceSchema
} from './contracts.js';

export const createObservabilitySurface = (dependencies?: {
  logger?: StructuredLogger;
  diagnosticsProvider?: () => Promise<{
    healthStatus: string;
    readinessStatus: string;
    diagnosticsStatus: string;
  }>;
}) => {
  const logger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'observability-surface'
    });
  const counters = new Map<string, number>();
  const traces: Array<ReturnType<typeof observabilityTraceSchema.parse>> = [];

  return {
    increment(
      counterName: string,
      value = 1,
      context: Record<string, unknown> = {}
    ) {
      const name = observabilityCounterNameSchema.parse(counterName);
      counters.set(name, (counters.get(name) ?? 0) + value);
      logger.info('observability.counter', {
        counterName: name,
        value,
        ...context
      });
    },
    recordTrace(
      flow: string,
      step: string,
      status: 'ok' | 'error',
      metadata: Record<string, unknown> = {}
    ) {
      const trace = observabilityTraceSchema.parse({
        flow,
        step,
        status,
        metadata
      });
      traces.push(trace);
      logger.info('observability.trace', trace);
      return trace;
    },
    async snapshot() {
      const diagnostics = dependencies?.diagnosticsProvider
        ? await dependencies.diagnosticsProvider()
        : null;

      return observabilitySnapshotSchema.parse({
        counters: [...counters.entries()].map(([counterName, value]) =>
          observabilityCounterSchema.parse({
            counterName,
            value
          })
        ),
        traces,
        diagnostics
      });
    }
  };
};
