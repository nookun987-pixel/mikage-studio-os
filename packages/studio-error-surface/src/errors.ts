import { normalizePlatformError } from '@mikage/error-taxonomy-hardening';
import { type SessionHttpResponse } from '@mikage/session-http-route-contracts';
import { type StudioExecutionPanelState } from '@mikage/studio-execution-panel';
import { type StudioQueryPanelState } from '@mikage/studio-query-panel';
import { type StudioWorklistPanelState } from '@mikage/studio-worklist-panel';

import { studioErrorSurfaceSchema, type StudioErrorSurface } from './contracts.js';

export const buildStudioErrorSurface = (input: {
  execution?: StudioExecutionPanelState;
  query?: StudioQueryPanelState;
  worklist?: StudioWorklistPanelState;
  session?: SessionHttpResponse;
}): StudioErrorSurface => {
  const items = [];

  if (input.execution?.errorMessage) {
    items.push(
      normalizePlatformError({
        surface: 'execution',
        message: input.execution.errorMessage
      })
    );
  }

  if (input.query?.errorMessage) {
    items.push(
      normalizePlatformError({
        surface: 'query',
        message: input.query.errorMessage
      })
    );
  }

  if (input.worklist?.errorMessage) {
    items.push(
      normalizePlatformError({
        surface: 'worklist',
        message: input.worklist.errorMessage
      })
    );
  }

  if (input.session?.error) {
    items.push(
      normalizePlatformError({
        surface: 'session',
        code: input.session.error.code,
        message: input.session.error.message
      })
    );
  }

  return studioErrorSurfaceSchema.parse({ items });
};

export const renderStudioErrorSurface = (surface: StudioErrorSurface): string =>
  `<aside data-errors="${surface.items.length}">${surface.items
    .map((item) => `<p data-surface="${item.surface}">${item.message}</p>`)
    .join('')}</aside>`;
