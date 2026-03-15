import {
  studioWebShellStateSchema,
  type StudioShellRegionCode,
  type StudioWebShellState
} from './contracts.js';

const defaultNavigation: StudioWebShellState['navigation'] = [
  {
    regionCode: 'execution',
    label: 'Execution',
    mountId: 'studio-execution-panel'
  },
  {
    regionCode: 'query',
    label: 'Query',
    mountId: 'studio-query-panel'
  },
  {
    regionCode: 'worklist',
    label: 'Worklist',
    mountId: 'studio-worklist-panel'
  },
  {
    regionCode: 'session',
    label: 'Session',
    mountId: 'studio-session-workspace'
  }
];

export const createStudioWebShell = (rawInput: {
  title: string;
  hostBaseUrl: string;
  activeRegion?: StudioShellRegionCode;
  sessionCode?: string | null;
}) => {
  const state = studioWebShellStateSchema.parse({
    title: rawInput.title,
    hostBaseUrl: rawInput.hostBaseUrl,
    activeRegion: rawInput.activeRegion ?? 'execution',
    sessionCode: rawInput.sessionCode ?? null,
    endpoints: {
      executionPath: '/runtime/execute',
      queryPath: '/studio/query',
      worklistPath: '/worklist/project'
    },
    navigation: defaultNavigation
  });

  return {
    state,
    render() {
      const navigation = state.navigation
        .map(
          (region) =>
            `<button data-region="${region.regionCode}" data-active="${String(region.regionCode === state.activeRegion)}">${region.label}</button>`
        )
        .join('');
      const sections = state.navigation
        .map(
          (region) =>
            `<section id="${region.mountId}" data-region="${region.regionCode}" data-visible="${String(region.regionCode === state.activeRegion)}"></section>`
        )
        .join('');

      return [
        `<main data-host="${state.hostBaseUrl}">`,
        `<header><h1>${state.title}</h1><p>${state.sessionCode ?? 'no-active-session'}</p></header>`,
        `<nav>${navigation}</nav>`,
        `<div class="studio-grid">${sections}</div>`,
        `</main>`
      ].join('');
    }
  };
};
