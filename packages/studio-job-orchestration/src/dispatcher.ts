import { executeGenerationPipeline } from '../../runtime-orchestration-boundary/src/index.js';

import {
  studioJobDispatchRequestSchema,
  studioJobDispatchResultSchema,
  type StudioJobDispatchRequest,
  type StudioJobDispatchResult
} from './contracts.js';

const completeReviewJob = (
  jobType: Extract<
    StudioJobDispatchRequest['jobType'],
    'benchmark_review_job' | 'persistence_review_job' | 'lineage_review_job'
  >,
  items: StudioJobDispatchRequest['input']
): { finalStatus: 'completed' | 'failed'; detail: string } => {
  const category =
    jobType === 'benchmark_review_job'
      ? 'benchmark_review'
      : jobType === 'lineage_review_job'
        ? 'lineage_review'
        : 'persistence_review';
  const found = 'items' in items && items.items.some((item) => item.category === category);

  return found
    ? {
        finalStatus: 'completed',
        detail: `Review items available for ${category}.`
      }
    : {
        finalStatus: 'failed',
        detail: `No review items available for ${category}.`
      };
};

export const dispatchStudioJob = (
  rawInput: StudioJobDispatchRequest
): StudioJobDispatchResult => {
  const input = studioJobDispatchRequestSchema.parse(rawInput);
  const lifecycle: StudioJobDispatchResult['lifecycle'] = ['ready', 'dispatched'];

  if (input.jobType === 'generation_execution_job') {
    const execution = executeGenerationPipeline(input.input);
    const finalStatus = execution.finalStatus === 'completed' ? 'completed' : 'failed';
    lifecycle.push(finalStatus);

    return studioJobDispatchResultSchema.parse({
      jobCode: input.jobCode,
      jobType: input.jobType,
      lifecycle,
      finalStatus,
      detail: `Generation pipeline finished with ${execution.finalStatus}.`
    });
  }

  const completion = completeReviewJob(input.jobType, input.input);
  lifecycle.push(completion.finalStatus);

  return studioJobDispatchResultSchema.parse({
    jobCode: input.jobCode,
    jobType: input.jobType,
    lifecycle,
    finalStatus: completion.finalStatus,
    detail: completion.detail
  });
};
