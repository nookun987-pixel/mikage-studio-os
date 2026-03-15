import { createStudioHostClients } from '@mikage/studio-host-clients';

import {
  studioSessionWorkspaceContinuityRequestSchema,
  studioSessionWorkspaceLoadRequestSchema,
  studioSessionWorkspaceOpenRequestSchema,
  studioSessionWorkspaceStateSchema,
  type StudioSessionWorkspaceContinuityRequest,
  type StudioSessionWorkspaceLoadRequest,
  type StudioSessionWorkspaceOpenRequest,
  type StudioSessionWorkspaceState
} from './contracts.js';

const toWorkspaceState = (
  sessionResponse: Awaited<ReturnType<ReturnType<typeof createStudioHostClients>['openSession']>>
): Promise<StudioSessionWorkspaceState> => {
  if (!sessionResponse.payload) {
    throw new Error(sessionResponse.error?.message ?? 'Session response missing payload.');
  }

  return Promise.resolve(
    studioSessionWorkspaceStateSchema.parse({
      sessionCode: sessionResponse.payload.session.sessionCode,
      snapshotCode: sessionResponse.payload.snapshotCode,
      continuityCode: sessionResponse.payload.continuityCode,
      sessionKind: sessionResponse.payload.session.context.sessionKind,
      selectionContext: sessionResponse.payload.selectionContext,
      activeReviewContext: sessionResponse.payload.activeReviewContext,
      executionReferenceCount:
        sessionResponse.payload.session.executionReferences.length,
      queryReferenceCount: sessionResponse.payload.session.queryReferences.length,
      worklistReferenceCount:
        sessionResponse.payload.session.worklistReferences.length,
      persistedSession: sessionResponse.payload,
      sessionResponse
    })
  );
};

export const openStudioSessionWorkspace = async (
  rawInput: StudioSessionWorkspaceOpenRequest
): Promise<StudioSessionWorkspaceState> => {
  const input = studioSessionWorkspaceOpenRequestSchema.parse(rawInput);
  const response = await createStudioHostClients({
    baseUrl: input.baseUrl
  }).openSession(input.sessionRequest);

  return toWorkspaceState(response);
};

export const loadStudioSessionWorkspace = async (
  rawInput: StudioSessionWorkspaceLoadRequest
): Promise<StudioSessionWorkspaceState> => {
  const input = studioSessionWorkspaceLoadRequestSchema.parse(rawInput);
  const response = await createStudioHostClients({
    baseUrl: input.baseUrl
  }).loadSession(input.sessionCode);

  return toWorkspaceState(response);
};

export const saveStudioSessionWorkspace = async (
  rawInput: StudioSessionWorkspaceOpenRequest
): Promise<StudioSessionWorkspaceState> => {
  const input = studioSessionWorkspaceOpenRequestSchema.parse(rawInput);
  const response = await createStudioHostClients({
    baseUrl: input.baseUrl
  }).saveSession(input.sessionRequest);

  return toWorkspaceState(response);
};

export const updateStudioSessionWorkspace = async (
  rawInput: StudioSessionWorkspaceOpenRequest
): Promise<StudioSessionWorkspaceState> => {
  const input = studioSessionWorkspaceOpenRequestSchema.parse(rawInput);
  const response = await createStudioHostClients({
    baseUrl: input.baseUrl
  }).updateSession(input.sessionRequest);

  return toWorkspaceState(response);
};

export const updateStudioSessionContinuity = async (
  rawInput: StudioSessionWorkspaceContinuityRequest
) => {
  const input = studioSessionWorkspaceContinuityRequestSchema.parse(rawInput);
  return createStudioHostClients({
    baseUrl: input.baseUrl
  }).updateContinuity({
    sessionCode: input.sessionCode,
    continuityCode: input.continuityCode
  });
};

export const renderStudioSessionWorkspace = (
  state: StudioSessionWorkspaceState
): string =>
  [
    `<article data-panel="session" data-kind="${state.sessionKind}">`,
    `<h2>Session Workspace</h2>`,
    `<p>${state.sessionCode}</p>`,
    `<p>${state.continuityCode}</p>`,
    `<p>${state.selectionContext?.selectedCode ?? 'no-selection'}</p>`,
    `</article>`
  ].join('');
