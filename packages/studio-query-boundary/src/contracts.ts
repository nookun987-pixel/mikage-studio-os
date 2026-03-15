import { z } from 'zod';

import {
  benchmarkSummaryProjectionSchema,
  ingestionSummaryProjectionSchema,
  lineageSummaryProjectionSchema,
  packageSummaryProjectionSchema,
  validationSummaryProjectionSchema
} from '../../persistence-read-port/src/contracts.js';

export const studioQueryOperationSchema = z.enum([
  'package_summary_lookup',
  'validation_summary_lookup',
  'benchmark_summary_lookup',
  'ingestion_summary_lookup',
  'lineage_summary_lookup'
]);

export const studioQueryRequestSchema = z.object({
  operation: studioQueryOperationSchema,
  recordCode: z.string().min(1)
});

export const studioQuerySummarySchema = z.object({
  operation: studioQueryOperationSchema,
  recordCode: z.string().min(1),
  found: z.boolean(),
  resultKind: z.enum([
    'package_summary',
    'validation_summary',
    'benchmark_summary',
    'ingestion_summary',
    'lineage_summary',
    'missing'
  ])
});

export const studioQueryResponseSchema = z.object({
  operation: studioQueryOperationSchema,
  recordCode: z.string().min(1),
  found: z.boolean(),
  packageSummary: packageSummaryProjectionSchema.nullable(),
  validationSummary: validationSummaryProjectionSchema.nullable(),
  benchmarkSummary: benchmarkSummaryProjectionSchema.nullable(),
  ingestionSummary: ingestionSummaryProjectionSchema.nullable(),
  lineageSummary: lineageSummaryProjectionSchema.nullable(),
  summary: studioQuerySummarySchema
});

export type StudioQueryOperation = z.infer<typeof studioQueryOperationSchema>;
export type StudioQueryRequest = z.infer<typeof studioQueryRequestSchema>;
export type StudioQuerySummary = z.infer<typeof studioQuerySummarySchema>;
export type StudioQueryResponse = z.infer<typeof studioQueryResponseSchema>;
