import {
  persistenceReadPortRequestSchema,
  persistenceReadPortResponseSchema,
  type PersistenceReadPortRequest,
  type PersistenceReadPortResponse
} from './contracts.js';
import {
  buildBenchmarkSummaryProjection,
  buildIngestionSummaryProjection,
  buildLineageSummaryProjection,
  buildPackageSummaryProjection,
  buildValidationSummaryProjection
} from './projection.js';

const isPackageRecord = (recordCode: string) => recordCode.startsWith('pkg_');
const isLineageRecord = (recordCode: string) =>
  recordCode.startsWith('persist_') || recordCode.endsWith('_lineage');

export const queryPersistenceReadPort = (
  rawInput: PersistenceReadPortRequest
): PersistenceReadPortResponse => {
  const input = persistenceReadPortRequestSchema.parse(rawInput);

  if (input.queryType === 'package_summary_lookup' && isPackageRecord(input.recordCode)) {
    return persistenceReadPortResponseSchema.parse({
      queryType: input.queryType,
      recordCode: input.recordCode,
      found: true,
      packageSummary: buildPackageSummaryProjection(input.recordCode),
      validationSummary: buildValidationSummaryProjection(input.recordCode),
      benchmarkSummary: buildBenchmarkSummaryProjection(input.recordCode),
      ingestionSummary: buildIngestionSummaryProjection(input.recordCode),
      lineageSummary: null
    });
  }

  if (input.queryType === 'lineage_summary_lookup' && isLineageRecord(input.recordCode)) {
    return persistenceReadPortResponseSchema.parse({
      queryType: input.queryType,
      recordCode: input.recordCode,
      found: true,
      packageSummary: null,
      validationSummary: null,
      benchmarkSummary: null,
      ingestionSummary: null,
      lineageSummary: buildLineageSummaryProjection(input.recordCode)
    });
  }

  return persistenceReadPortResponseSchema.parse({
    queryType: input.queryType,
    recordCode: input.recordCode,
    found: false,
    packageSummary: null,
    validationSummary: null,
    benchmarkSummary: null,
    ingestionSummary: null,
    lineageSummary: null
  });
};
