import { queryPersistenceReadPort } from '../../persistence-read-port/src/index.js';

import {
  studioQueryRequestSchema,
  studioQueryResponseSchema,
  type StudioQueryOperation,
  type StudioQueryRequest,
  type StudioQueryResponse
} from './contracts.js';

const toReadQueryType = (
  operation: StudioQueryOperation
): 'package_summary_lookup' | 'lineage_summary_lookup' =>
  operation === 'lineage_summary_lookup'
    ? 'lineage_summary_lookup'
    : 'package_summary_lookup';

const toResultKind = (input: {
  operation: StudioQueryOperation;
  found: boolean;
}) => {
  if (!input.found) {
    return 'missing' as const;
  }

  switch (input.operation) {
    case 'package_summary_lookup':
      return 'package_summary' as const;
    case 'validation_summary_lookup':
      return 'validation_summary' as const;
    case 'benchmark_summary_lookup':
      return 'benchmark_summary' as const;
    case 'ingestion_summary_lookup':
      return 'ingestion_summary' as const;
    case 'lineage_summary_lookup':
      return 'lineage_summary' as const;
  }
};

export const executeStudioQuery = (
  rawInput: StudioQueryRequest
): StudioQueryResponse => {
  const input = studioQueryRequestSchema.parse(rawInput);
  const readResult = queryPersistenceReadPort({
    queryType: toReadQueryType(input.operation),
    recordCode: input.recordCode
  });

  return studioQueryResponseSchema.parse({
    operation: input.operation,
    recordCode: input.recordCode,
    found: readResult.found,
    packageSummary:
      input.operation === 'package_summary_lookup' ? readResult.packageSummary : null,
    validationSummary:
      input.operation === 'validation_summary_lookup'
        ? readResult.validationSummary
        : null,
    benchmarkSummary:
      input.operation === 'benchmark_summary_lookup'
        ? readResult.benchmarkSummary
        : null,
    ingestionSummary:
      input.operation === 'ingestion_summary_lookup'
        ? readResult.ingestionSummary
        : null,
    lineageSummary:
      input.operation === 'lineage_summary_lookup'
        ? readResult.lineageSummary
        : null,
    summary: {
      operation: input.operation,
      recordCode: input.recordCode,
      found: readResult.found,
      resultKind: toResultKind({
        operation: input.operation,
        found: readResult.found
      })
    }
  });
};
