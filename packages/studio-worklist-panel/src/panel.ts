import { createStudioHostClients } from '@mikage/studio-host-clients';
import {
  studioWorklistPanelRequestSchema,
  studioWorklistPanelStateSchema,
  type StudioWorklistPanelRequest,
  type StudioWorklistPanelState
} from './contracts.js';

export const submitStudioWorklist = async (
  rawInput: StudioWorklistPanelRequest
): Promise<StudioWorklistPanelState> => {
  const input = studioWorklistPanelRequestSchema.parse(rawInput);
  const routeResponse = await createStudioHostClients({
    baseUrl: input.baseUrl
  }).worklist(input.projectionRequest);
  const firstItemCode = routeResponse.worklistEnvelope?.payload.items[0]?.itemCode ?? null;

  return studioWorklistPanelStateSchema.parse({
    status: routeResponse.error ? 'error' : 'ok',
    selectedItemCode: input.selectedItemCode ?? firstItemCode,
    worklistEnvelope: routeResponse.worklistEnvelope,
    routeResponse,
    errorMessage: routeResponse.error?.message ?? null
  });
};

export const renderStudioWorklistPanel = (
  state: StudioWorklistPanelState
): string => {
  const items = state.worklistEnvelope?.payload.items ?? [];
  const renderedItems = items
    .map(
      (item) =>
        `<li data-selected="${String(item.itemCode === state.selectedItemCode)}">${item.title}</li>`
    )
    .join('');

  return [
    `<article data-panel="worklist" data-status="${state.status}">`,
    `<h2>Worklist</h2>`,
    `<ul>${renderedItems}</ul>`,
    `</article>`
  ].join('');
};
