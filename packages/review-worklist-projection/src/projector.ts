import {
  reviewProjectionRequestSchema,
  reviewProjectionResponseSchema,
  type ReviewProjectionRequest,
  type ReviewProjectionResponse,
  type ReviewWorklistItem
} from './contracts.js';

const sortItems = (items: ReviewWorklistItem[]) =>
  [...items].sort((left, right) =>
    left.sortKey.localeCompare(right.sortKey) || left.itemCode.localeCompare(right.itemCode)
  );

export const projectReviewWorklist = (
  rawInput: ReviewProjectionRequest
): ReviewProjectionResponse => {
  const input = reviewProjectionRequestSchema.parse(rawInput);
  const items: ReviewWorklistItem[] = [];

  if (input.runtimeExecution) {
    items.push({
      itemCode: `${input.runtimeExecution.requestCode}_persistence_review`,
      category: 'persistence_review',
      title: 'Runtime Persistence Review',
      targetCode:
        input.runtimeExecution.runtimeResult.persistenceCode ??
        input.runtimeExecution.requestCode,
      sortKey: `1_${input.runtimeExecution.requestCode}`,
      status: input.runtimeExecution.summary.stopped ? 'attention' : 'ready',
      metadata: {
        finalStatus: input.runtimeExecution.finalStatus
      }
    });
  }

  if (input.packageSummary) {
    items.push({
      itemCode: `${input.packageSummary.packageCode}_generation_review`,
      category: 'generation_review',
      title: 'Package Generation Review',
      targetCode: input.packageSummary.packageCode,
      sortKey: `2_${input.packageSummary.packageCode}`,
      status: input.packageSummary.status === 'validated' ? 'ready' : 'attention',
      metadata: {
        outputCount: input.packageSummary.outputCount
      }
    });
  }

  if (input.benchmarkSummary) {
    items.push({
      itemCode: `${input.benchmarkSummary.requestCode}_benchmark_review`,
      category: 'benchmark_review',
      title: 'Benchmark Review',
      targetCode: input.benchmarkSummary.requestCode,
      sortKey: `3_${input.benchmarkSummary.requestCode}`,
      status: input.benchmarkSummary.decision === 'approved' ? 'ready' : 'attention',
      metadata: {
        flagCount: input.benchmarkSummary.flagCount
      }
    });
  }

  if (input.lineageSummary) {
    items.push({
      itemCode: `${input.lineageSummary.persistenceCode}_lineage_review`,
      category: 'lineage_review',
      title: 'Lineage Review',
      targetCode: input.lineageSummary.persistenceCode,
      sortKey: `4_${input.lineageSummary.persistenceCode}`,
      status: 'ready',
      metadata: {
        nodeCount: input.lineageSummary.nodeCount,
        edgeCount: input.lineageSummary.edgeCount
      }
    });
  }

  if (input.validationSummary && input.validationSummary.decision === 'rejected') {
    items.push({
      itemCode: `${input.validationSummary.requestCode}_persistence_validation_attention`,
      category: 'persistence_review',
      title: 'Validation Attention Review',
      targetCode: input.validationSummary.requestCode,
      sortKey: `0_${input.validationSummary.requestCode}`,
      status: 'attention',
      metadata: {
        violationCount: input.validationSummary.violationCount
      }
    });
  }

  const sortedItems = sortItems(items);

  return reviewProjectionResponseSchema.parse({
    items: sortedItems,
    summary: {
      totalItems: sortedItems.length,
      categories: [...new Set(sortedItems.map((item) => item.category))]
    }
  });
};
