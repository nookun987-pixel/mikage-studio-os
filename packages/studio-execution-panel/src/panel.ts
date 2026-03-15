import { createStudioHostClients } from '@mikage/studio-host-clients';
import {
  studioExecutionPanelRequestSchema,
  studioExecutionPanelStateSchema,
  type StudioExecutionPanelRequest,
  type StudioExecutionPanelState
} from './contracts.js';

export const submitStudioExecution = async (
  rawInput: StudioExecutionPanelRequest
): Promise<StudioExecutionPanelState> => {
  const input = studioExecutionPanelRequestSchema.parse(rawInput);
  const routeResponse = await createStudioHostClients({
    baseUrl: input.baseUrl
  }).execute(input.runtimeRequest);

  return studioExecutionPanelStateSchema.parse({
    requestCode: input.runtimeRequest.request.requestCode,
    status: routeResponse.error ? 'error' : 'ok',
    routeCode: 'runtime_execution_route',
    executionEnvelope: routeResponse.executionEnvelope,
    routeResponse,
    errorMessage: routeResponse.error?.message ?? null
  });
};

export const renderStudioExecutionPanel = (
  state: StudioExecutionPanelState
): string =>
  [
    `<article data-panel="execution" data-status="${state.status}">`,
    `<h2>Execution</h2>`,
    `<p>${state.requestCode}</p>`,
    `<p>${state.executionEnvelope?.payload.finalStatus ?? state.errorMessage ?? 'idle'}</p>`,
    `</article>`
  ].join('');
