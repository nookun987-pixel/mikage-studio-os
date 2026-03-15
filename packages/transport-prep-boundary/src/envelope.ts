import {
  executionEnvelopeSchema,
  queryEnvelopeSchema,
  worklistEnvelopeSchema,
  type ExecutionEnvelope,
  type QueryEnvelope,
  type WorklistEnvelope
} from './contracts.js';

import type { ReviewProjectionResponse } from '../../review-worklist-projection/src/contracts.js';
import type { ExecutionPortResponse } from '../../runtime-execution-port/src/contracts.js';
import type { StudioQueryResponse } from '../../studio-query-boundary/src/contracts.js';

export const buildExecutionEnvelope = (
  payload: ExecutionPortResponse
): ExecutionEnvelope =>
  executionEnvelopeSchema.parse({
    status: payload.summary.stopped ? 'error' : 'ok',
    payload,
    error: payload.summary.stopped ? payload.finalStatus : null,
    metadata: {
      requestCode: payload.requestCode,
      executedStepCount: payload.summary.executedStepCount
    }
  });

export const buildQueryEnvelope = (payload: StudioQueryResponse): QueryEnvelope =>
  queryEnvelopeSchema.parse({
    status: payload.found ? 'ok' : 'error',
    payload,
    error: payload.found ? null : 'record_not_found',
    metadata: {
      operation: payload.operation,
      recordCode: payload.recordCode
    }
  });

export const buildWorklistEnvelope = (
  payload: ReviewProjectionResponse
): WorklistEnvelope =>
  worklistEnvelopeSchema.parse({
    status: 'ok',
    payload,
    error: null,
    metadata: {
      totalItems: payload.summary.totalItems,
      categories: payload.summary.categories
    }
  });
