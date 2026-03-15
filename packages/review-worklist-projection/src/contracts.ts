import { z } from 'zod';

import {
  benchmarkSummaryProjectionSchema,
  lineageSummaryProjectionSchema,
  packageSummaryProjectionSchema,
  validationSummaryProjectionSchema
} from '../../persistence-read-port/src/contracts.js';
import { executionPortResponseSchema } from '../../runtime-execution-port/src/contracts.js';

export const worklistCategorySchema = z.enum([
  'generation_review',
  'benchmark_review',
  'persistence_review',
  'lineage_review'
]);

export const reviewWorklistItemSchema = z.object({
  itemCode: z.string().min(1),
  category: worklistCategorySchema,
  title: z.string().min(1),
  targetCode: z.string().min(1),
  sortKey: z.string().min(1),
  status: z.enum(['ready', 'attention']),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export const reviewProjectionRequestSchema = z.object({
  runtimeExecution: executionPortResponseSchema.optional(),
  packageSummary: packageSummaryProjectionSchema.optional(),
  validationSummary: validationSummaryProjectionSchema.optional(),
  benchmarkSummary: benchmarkSummaryProjectionSchema.optional(),
  lineageSummary: lineageSummaryProjectionSchema.optional()
});

export const reviewProjectionResponseSchema = z.object({
  items: z.array(reviewWorklistItemSchema),
  summary: z.object({
    totalItems: z.coerce.number().int().nonnegative(),
    categories: z.array(worklistCategorySchema)
  })
});

export type WorklistCategory = z.infer<typeof worklistCategorySchema>;
export type ReviewWorklistItem = z.infer<typeof reviewWorklistItemSchema>;
export type ReviewProjectionRequest = z.infer<typeof reviewProjectionRequestSchema>;
export type ReviewProjectionResponse = z.infer<typeof reviewProjectionResponseSchema>;
