import { reviewProjectionRequestSchema } from '@mikage/review-worklist-projection';
import {
  sessionContinuityRequestSchema,
  sessionHttpResponseSchema
} from '@mikage/session-http-route-contracts';
import { studioRouteAdapterResponseSchema } from '@mikage/studio-api-route-adapter';
import { studioQueryRequestSchema } from '@mikage/studio-query-boundary';
import { studioSessionApplicationRequestSchema } from '@mikage/studio-session-application';

import {
  studioHostClientOptionsSchema,
  type StudioHostClientOptions
} from './contracts.js';

export const createStudioHostClients = (rawOptions: StudioHostClientOptions) => {
  const options = studioHostClientOptionsSchema.parse(rawOptions);

  return {
    async execute(runtimeRequest: unknown) {
      const response = await fetch(`${options.baseUrl}/runtime/execute`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          portMode: 'studio_runtime_request',
          runtimeRequest
        })
      });

      return studioRouteAdapterResponseSchema.parse(await response.json());
    },
    async query(rawRequest: unknown) {
      const request = studioQueryRequestSchema.parse(rawRequest);
      const params = new URLSearchParams({
        operation: request.operation,
        recordCode: request.recordCode
      });
      const response = await fetch(`${options.baseUrl}/studio/query?${params.toString()}`);

      return studioRouteAdapterResponseSchema.parse(await response.json());
    },
    async worklist(rawRequest: unknown) {
      const request = reviewProjectionRequestSchema.parse(rawRequest);
      const response = await fetch(`${options.baseUrl}/worklist/project`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request)
      });

      return studioRouteAdapterResponseSchema.parse(await response.json());
    },
    async openSession(rawRequest: unknown) {
      const request = studioSessionApplicationRequestSchema.parse(rawRequest);
      const response = await fetch(`${options.baseUrl}/session/open`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request)
      });

      return sessionHttpResponseSchema.parse(await response.json());
    },
    async loadSession(sessionCode: string) {
      const params = new URLSearchParams({ sessionCode });
      const response = await fetch(`${options.baseUrl}/session/load?${params.toString()}`);

      return sessionHttpResponseSchema.parse(await response.json());
    },
    async saveSession(rawRequest: unknown) {
      const request = studioSessionApplicationRequestSchema.parse(rawRequest);
      const response = await fetch(`${options.baseUrl}/session/save`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request)
      });

      return sessionHttpResponseSchema.parse(await response.json());
    },
    async updateSession(rawRequest: unknown) {
      const request = studioSessionApplicationRequestSchema.parse(rawRequest);
      const response = await fetch(`${options.baseUrl}/session/update`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request)
      });

      return sessionHttpResponseSchema.parse(await response.json());
    },
    async updateContinuity(rawRequest: unknown) {
      const request = sessionContinuityRequestSchema.parse(rawRequest);
      const response = await fetch(`${options.baseUrl}/session/continuity`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request)
      });

      return sessionHttpResponseSchema.parse(await response.json());
    }
  };
};
