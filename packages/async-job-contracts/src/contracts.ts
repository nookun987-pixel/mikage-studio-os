import { z } from 'zod';

import { reviewProjectionResponseSchema } from '../../review-worklist-projection/src/contracts.js';
import { executionPortResponseSchema } from '../../runtime-execution-port/src/contracts.js';

export const asyncJobTypeSchema = z.enum([
  'generation_execution_job',
  'benchmark_review_job',
  'persistence_review_job',
  'lineage_review_job'
]);

export const asyncJobStatusSchema = z.enum([
  'ready',
  'completed',
  'stopped'
]);

export const asyncJobStopConditionSchema = z.object({
  code: z.string().min(1),
  reason: z.string().min(1)
});

export const generationExecutionJobContractSchema = z.object({
  jobCode: z.literal('generation_execution_job'),
  jobType: z.literal('generation_execution_job'),
  inputContract: executionPortResponseSchema,
  outputContract: executionPortResponseSchema,
  stopCondition: asyncJobStopConditionSchema,
  status: asyncJobStatusSchema
});

export const reviewJobOutputSchema = reviewProjectionResponseSchema;

export const persistenceReviewJobContractSchema = z.object({
  jobCode: z.literal('persistence_review_job'),
  jobType: z.literal('persistence_review_job'),
  inputContract: reviewProjectionResponseSchema,
  outputContract: reviewJobOutputSchema,
  stopCondition: asyncJobStopConditionSchema,
  status: asyncJobStatusSchema
});

export const lineageReviewJobContractSchema = z.object({
  jobCode: z.literal('lineage_review_job'),
  jobType: z.literal('lineage_review_job'),
  inputContract: reviewProjectionResponseSchema,
  outputContract: reviewJobOutputSchema,
  stopCondition: asyncJobStopConditionSchema,
  status: asyncJobStatusSchema
});

export const benchmarkReviewJobContractSchema = z.object({
  jobCode: z.literal('benchmark_review_job'),
  jobType: z.literal('benchmark_review_job'),
  inputContract: reviewProjectionResponseSchema,
  outputContract: reviewJobOutputSchema,
  stopCondition: asyncJobStopConditionSchema,
  status: asyncJobStatusSchema
});

export type AsyncJobType = z.infer<typeof asyncJobTypeSchema>;
