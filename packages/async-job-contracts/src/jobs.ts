import {
  benchmarkReviewJobContractSchema,
  generationExecutionJobContractSchema,
  lineageReviewJobContractSchema,
  persistenceReviewJobContractSchema
} from './contracts.js';

export const generationExecutionJob = generationExecutionJobContractSchema.parse({
  jobCode: 'generation_execution_job',
  jobType: 'generation_execution_job',
  inputContract: {
    portMode: 'studio_runtime_request',
    requestCode: 'job_generation_placeholder',
    commandType: 'execute_generation_pipeline',
    finalStatus: 'completed',
    runtimeResult: {
      requestCode: 'job_generation_placeholder',
      compileMode: 'production_prompt',
      validationDecision: 'accepted',
      packageCode: 'pkg_job_generation_placeholder',
      benchmarkDecision: 'approved',
      ingestionCode: 'ing_job_generation_placeholder',
      persistenceCode: 'persist_job_generation_placeholder',
      studioActionType: 'queue_persistence_review',
      finalStatus: 'completed',
      executedSteps: []
    },
    summary: {
      requestCode: 'job_generation_placeholder',
      commandType: 'execute_generation_pipeline',
      finalStatus: 'completed',
      executedStepCount: 0,
      stopped: false
    }
  },
  outputContract: {
    portMode: 'studio_runtime_request',
    requestCode: 'job_generation_placeholder',
    commandType: 'execute_generation_pipeline',
    finalStatus: 'completed',
    runtimeResult: {
      requestCode: 'job_generation_placeholder',
      compileMode: 'production_prompt',
      validationDecision: 'accepted',
      packageCode: 'pkg_job_generation_placeholder',
      benchmarkDecision: 'approved',
      ingestionCode: 'ing_job_generation_placeholder',
      persistenceCode: 'persist_job_generation_placeholder',
      studioActionType: 'queue_persistence_review',
      finalStatus: 'completed',
      executedSteps: []
    },
    summary: {
      requestCode: 'job_generation_placeholder',
      commandType: 'execute_generation_pipeline',
      finalStatus: 'completed',
      executedStepCount: 0,
      stopped: false
    }
  },
  stopCondition: {
    code: 'validation_or_benchmark_rejected',
    reason: 'Stop if execution summary is not completed.'
  },
  status: 'ready'
});

const reviewProjectionPlaceholder = {
  items: [],
  summary: {
    totalItems: 0,
    categories: []
  }
} as const;

export const persistenceReviewJob = persistenceReviewJobContractSchema.parse({
  jobCode: 'persistence_review_job',
  jobType: 'persistence_review_job',
  inputContract: reviewProjectionPlaceholder,
  outputContract: reviewProjectionPlaceholder,
  stopCondition: {
    code: 'no_persistence_items',
    reason: 'Stop if no persistence review items exist.'
  },
  status: 'ready'
});

export const lineageReviewJob = lineageReviewJobContractSchema.parse({
  jobCode: 'lineage_review_job',
  jobType: 'lineage_review_job',
  inputContract: reviewProjectionPlaceholder,
  outputContract: reviewProjectionPlaceholder,
  stopCondition: {
    code: 'no_lineage_items',
    reason: 'Stop if no lineage review items exist.'
  },
  status: 'ready'
});

export const benchmarkReviewJob = benchmarkReviewJobContractSchema.parse({
  jobCode: 'benchmark_review_job',
  jobType: 'benchmark_review_job',
  inputContract: reviewProjectionPlaceholder,
  outputContract: reviewProjectionPlaceholder,
  stopCondition: {
    code: 'no_benchmark_items',
    reason: 'Stop if no benchmark review items exist.'
  },
  status: 'ready'
});
