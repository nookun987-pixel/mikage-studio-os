import {
  generationExecutionJob,
  lineageReviewJob,
  persistenceReviewJob
} from '../packages/async-job-contracts/src/index.ts';

console.log(
  JSON.stringify(
    {
      generationJob: {
        jobCode: generationExecutionJob.jobCode,
        status: generationExecutionJob.status
      },
      persistenceReviewJob: {
        jobCode: persistenceReviewJob.jobCode,
        status: persistenceReviewJob.status
      },
      lineageReviewJob: {
        jobCode: lineageReviewJob.jobCode,
        status: lineageReviewJob.status
      }
    },
    null,
    2
  )
);
