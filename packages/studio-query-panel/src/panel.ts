import { createStudioHostClients } from '@mikage/studio-host-clients';
import {
  studioQueryPanelRequestSchema,
  studioQueryPanelStateSchema,
  type StudioQueryPanelRequest,
  type StudioQueryPanelState
} from './contracts.js';

export const submitStudioQuery = async (
  rawInput: StudioQueryPanelRequest
): Promise<StudioQueryPanelState> => {
  const input = studioQueryPanelRequestSchema.parse(rawInput);
  const routeResponse = await createStudioHostClients({
    baseUrl: input.baseUrl
  }).query(input.queryRequest);

  return studioQueryPanelStateSchema.parse({
    operation: input.queryRequest.operation,
    recordCode: input.queryRequest.recordCode,
    status: routeResponse.error ? 'error' : 'ok',
    queryEnvelope: routeResponse.queryEnvelope,
    routeResponse,
    errorMessage: routeResponse.error?.message ?? null
  });
};

export const renderStudioQueryPanel = (state: StudioQueryPanelState): string =>
  [
    `<article data-panel="query" data-status="${state.status}">`,
    `<h2>Query</h2>`,
    `<p>${state.operation}</p>`,
    `<p>${state.recordCode}</p>`,
    `<p>${state.queryEnvelope?.payload.summary.resultKind ?? state.errorMessage ?? 'idle'}</p>`,
    `</article>`
  ].join('');
