import { z } from 'zod';

export const observabilityCounterNameSchema = z.enum([
  'host_requests_total',
  'session_reads_total',
  'session_writes_total',
  'queue_enqueue_total',
  'queue_status_reads_total',
  'queue_claim_total',
  'queue_complete_total',
  'worker_runs_total',
  'diagnostics_checks_total'
]);

export const observabilityCounterSchema = z.object({
  counterName: observabilityCounterNameSchema,
  value: z.coerce.number().int().nonnegative()
});

export const observabilityTraceSchema = z.object({
  flow: z.string().min(1),
  step: z.string().min(1),
  status: z.enum(['ok', 'error']),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export const observabilityDiagnosticsSummarySchema = z.object({
  healthStatus: z.string().min(1),
  readinessStatus: z.string().min(1),
  diagnosticsStatus: z.string().min(1)
});

export const observabilitySnapshotSchema = z.object({
  counters: z.array(observabilityCounterSchema),
  traces: z.array(observabilityTraceSchema),
  diagnostics: observabilityDiagnosticsSummarySchema.nullable()
});
