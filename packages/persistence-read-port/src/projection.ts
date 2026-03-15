import {
  benchmarkSummaryProjectionSchema,
  ingestionSummaryProjectionSchema,
  lineageSummaryProjectionSchema,
  packageSummaryProjectionSchema,
  validationSummaryProjectionSchema,
  type BenchmarkSummaryProjection,
  type IngestionSummaryProjection,
  type LineageSummaryProjection,
  type PackageSummaryProjection,
  type ValidationSummaryProjection
} from './contracts.js';

const countChecksum = (value: string) =>
  Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);

export const buildPackageSummaryProjection = (
  packageCode: string
): PackageSummaryProjection =>
  packageSummaryProjectionSchema.parse({
    packageCode,
    projectSlug: 'mikage',
    outputCount: 4,
    status: 'validated'
  });

export const buildValidationSummaryProjection = (
  packageCode: string
): ValidationSummaryProjection =>
  validationSummaryProjectionSchema.parse({
    requestCode: `${packageCode}_validation`,
    decision: 'accepted',
    warningCount: 0,
    violationCount: 0
  });

export const buildBenchmarkSummaryProjection = (
  packageCode: string
): BenchmarkSummaryProjection =>
  benchmarkSummaryProjectionSchema.parse({
    requestCode: `${packageCode}_benchmark`,
    decision: 'approved',
    flagCount: 0
  });

export const buildIngestionSummaryProjection = (
  packageCode: string
): IngestionSummaryProjection =>
  ingestionSummaryProjectionSchema.parse({
    ingestionCode: `ing_${packageCode}`,
    processingStatus: 'persisted',
    artifactCount: 4
  });

export const buildLineageSummaryProjection = (
  persistenceCode: string
): LineageSummaryProjection =>
  lineageSummaryProjectionSchema.parse({
    persistenceCode,
    lineageCode: `${persistenceCode}_lineage`,
    nodeCount: 5 + (countChecksum(persistenceCode) % 2),
    edgeCount: 4
  });
