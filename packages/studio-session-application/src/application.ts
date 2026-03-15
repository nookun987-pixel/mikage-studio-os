import { projectReviewWorklist } from '../../review-worklist-projection/src/index.js';
import { executeStudioApplication } from '../../studio-application-facade/src/index.js';
import { executeStudioQuery } from '../../studio-query-boundary/src/index.js';
import {
  buildSessionFromExecutionEnvelope,
  buildSessionFromQueryEnvelope,
  buildSessionFromWorklistEnvelope
} from '../../studio-session-boundary/src/index.js';
import {
  buildExecutionEnvelope,
  buildQueryEnvelope,
  buildWorklistEnvelope
} from '../../transport-prep-boundary/src/index.js';

import {
  studioSessionApplicationRequestSchema,
  studioSessionApplicationResponseSchema,
  type StudioSessionApplicationRequest,
  type StudioSessionApplicationResponse
} from './contracts.js';

export const runStudioSessionApplication = (
  rawInput: StudioSessionApplicationRequest
): StudioSessionApplicationResponse => {
  const input = studioSessionApplicationRequestSchema.parse(rawInput);

  const session =
    input.runtimeRequest !== undefined
      ? buildSessionFromExecutionEnvelope(
          buildExecutionEnvelope(
            executeStudioApplication({
              facadeMode: 'studio_runtime_execution',
              runtimeRequest: input.runtimeRequest
            }).execution
          )
        )
      : input.queryRequest !== undefined
        ? buildSessionFromQueryEnvelope(
            buildQueryEnvelope(executeStudioQuery(input.queryRequest))
          )
        : buildSessionFromWorklistEnvelope(
            buildWorklistEnvelope(projectReviewWorklist(input.worklistRequest ?? {}))
          );

  const continuityBase = input.previousSession?.sessionCode ?? session.sessionCode;

  return studioSessionApplicationResponseSchema.parse({
    session,
    snapshotCode: `snapshot_${input.sessionCode}`,
    continuityCode: `${continuityBase}_${input.selectionContext?.selectedCode ?? 'stable'}_${input.activeReviewContext?.reviewCode ?? 'none'}`,
    selectionContext: input.selectionContext ?? null,
    activeReviewContext: input.activeReviewContext ?? null
  });
};
