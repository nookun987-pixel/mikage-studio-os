import { type SessionHttpResponse } from '@mikage/session-http-route-contracts';
import { type StudioExecutionPanelState } from '@mikage/studio-execution-panel';
import { type StudioQueryPanelState } from '@mikage/studio-query-panel';
import { type StudioSessionWorkspaceState } from '@mikage/studio-session-workspace';
import { type StudioWorklistPanelState } from '@mikage/studio-worklist-panel';

import { studioUiStateSchema, type StudioUiState } from './contracts.js';

export const createStudioUiState = (): StudioUiState =>
  studioUiStateSchema.parse({
    activeRegion: 'execution',
    activeSessionCode: null,
    selectedWorkItemCode: null,
    continuityCode: null,
    lastExecutionRequestCode: null,
    lastQueryRecordCode: null,
    errorCount: 0
  });

export const applyExecutionState = (
  state: StudioUiState,
  execution: StudioExecutionPanelState
): StudioUiState =>
  studioUiStateSchema.parse({
    ...state,
    activeRegion: 'execution',
    lastExecutionRequestCode: execution.requestCode,
    errorCount: state.errorCount + (execution.status === 'error' ? 1 : 0)
  });

export const applyQueryState = (
  state: StudioUiState,
  query: StudioQueryPanelState
): StudioUiState =>
  studioUiStateSchema.parse({
    ...state,
    activeRegion: 'query',
    lastQueryRecordCode: query.recordCode,
    errorCount: state.errorCount + (query.status === 'error' ? 1 : 0)
  });

export const applyWorklistState = (
  state: StudioUiState,
  worklist: StudioWorklistPanelState
): StudioUiState =>
  studioUiStateSchema.parse({
    ...state,
    activeRegion: 'worklist',
    selectedWorkItemCode: worklist.selectedItemCode,
    errorCount: state.errorCount + (worklist.status === 'error' ? 1 : 0)
  });

export const applySessionState = (
  state: StudioUiState,
  session: StudioSessionWorkspaceState
): StudioUiState =>
  studioUiStateSchema.parse({
    ...state,
    activeRegion: 'session',
    activeSessionCode: session.sessionCode,
    continuityCode: session.continuityCode
  });

export const applySessionHttpResponse = (
  state: StudioUiState,
  response: SessionHttpResponse
): StudioUiState =>
  studioUiStateSchema.parse({
    ...state,
    activeRegion: 'session',
    activeSessionCode: response.payload?.session.sessionCode ?? state.activeSessionCode,
    continuityCode: response.payload?.continuityCode ?? state.continuityCode,
    errorCount: state.errorCount + (response.status === 'error' ? 1 : 0)
  });
