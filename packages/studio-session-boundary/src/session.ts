import { studioSessionSchema, type StudioSession } from './contracts.js';

import type {
  ExecutionEnvelope,
  QueryEnvelope,
  WorklistEnvelope
} from './contracts.js';

export const buildSessionFromExecutionEnvelope = (
  envelope: ExecutionEnvelope
): StudioSession =>
  studioSessionSchema.parse({
    sessionCode: `session_execution_${envelope.payload.requestCode}`,
    context: {
      sessionKind: 'execution',
      createdFrom: envelope.payload.requestCode
    },
    executionReferences: [
      {
        referenceKind: 'execution',
        referenceCode: envelope.payload.requestCode
      }
    ],
    queryReferences: [],
    worklistReferences: []
  });

export const buildSessionFromQueryEnvelope = (
  envelope: QueryEnvelope
): StudioSession =>
  studioSessionSchema.parse({
    sessionCode: `session_query_${envelope.payload.recordCode}`,
    context: {
      sessionKind: 'query',
      createdFrom: envelope.payload.recordCode
    },
    executionReferences: [],
    queryReferences: [
      {
        referenceKind: 'query',
        referenceCode: envelope.payload.recordCode
      }
    ],
    worklistReferences: []
  });

export const buildSessionFromWorklistEnvelope = (
  envelope: WorklistEnvelope
): StudioSession =>
  studioSessionSchema.parse({
    sessionCode: `session_worklist_${envelope.payload.summary.totalItems}`,
    context: {
      sessionKind: 'worklist',
      createdFrom: String(envelope.payload.summary.totalItems)
    },
    executionReferences: [],
    queryReferences: [],
    worklistReferences: envelope.payload.items.map((item) => ({
      referenceKind: 'worklist' as const,
      referenceCode: item.itemCode
    }))
  });
