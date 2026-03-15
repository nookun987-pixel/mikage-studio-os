import { z } from 'zod';

export const persistenceReadQueryTypeSchema = z.enum([
  'package_summary_lookup',
  'lineage_summary_lookup'
]);

export const packageSummaryProjectionSchema = z.object({
  packageCode: z.string().min(1),
  projectSlug: z.string().min(1),
  outputCount: z.coerce.number().int().positive(),
  status: z.enum(['validated', 'rejected'])
});

export const validationSummaryProjectionSchema = z.object({
  requestCode: z.string().min(1),
  decision: z.enum(['accepted', 'rejected']),
  warningCount: z.coerce.number().int().nonnegative(),
  violationCount: z.coerce.number().int().nonnegative()
});

export const benchmarkSummaryProjectionSchema = z.object({
  requestCode: z.string().min(1),
  decision: z.enum(['approved', 'review', 'rejected']),
  flagCount: z.coerce.number().int().nonnegative()
});

export const ingestionSummaryProjectionSchema = z.object({
  ingestionCode: z.string().min(1),
  processingStatus: z.enum(['received', 'extracted', 'persisted']),
  artifactCount: z.coerce.number().int().nonnegative()
});

export const lineageSummaryProjectionSchema = z.object({
  persistenceCode: z.string().min(1),
  lineageCode: z.string().min(1),
  nodeCount: z.coerce.number().int().nonnegative(),
  edgeCount: z.coerce.number().int().nonnegative()
});

export const persistenceReadPortRequestSchema = z.object({
  queryType: persistenceReadQueryTypeSchema,
  recordCode: z.string().min(1)
});

export const persistenceReadPortResponseSchema = z.object({
  queryType: persistenceReadQueryTypeSchema,
  recordCode: z.string().min(1),
  found: z.boolean(),
  packageSummary: packageSummaryProjectionSchema.nullable(),
  validationSummary: validationSummaryProjectionSchema.nullable(),
  benchmarkSummary: benchmarkSummaryProjectionSchema.nullable(),
  ingestionSummary: ingestionSummaryProjectionSchema.nullable(),
  lineageSummary: lineageSummaryProjectionSchema.nullable()
});

export type PersistenceReadQueryType = z.infer<
  typeof persistenceReadQueryTypeSchema
>;
export type PackageSummaryProjection = z.infer<
  typeof packageSummaryProjectionSchema
>;
export type ValidationSummaryProjection = z.infer<
  typeof validationSummaryProjectionSchema
>;
export type BenchmarkSummaryProjection = z.infer<
  typeof benchmarkSummaryProjectionSchema
>;
export type IngestionSummaryProjection = z.infer<
  typeof ingestionSummaryProjectionSchema
>;
export type LineageSummaryProjection = z.infer<
  typeof lineageSummaryProjectionSchema
>;
export type PersistenceReadPortRequest = z.infer<
  typeof persistenceReadPortRequestSchema
>;
export type PersistenceReadPortResponse = z.infer<
  typeof persistenceReadPortResponseSchema
>;
