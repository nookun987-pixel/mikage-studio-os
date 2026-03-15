import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';
import {
  studioSessionApplicationResponseSchema,
  type StudioSessionApplicationResponse
} from '@mikage/studio-session-application';

import {
  runtimeSessionStoreOptionsSchema,
  runtimeSessionStoreSnapshotSchema
} from './contracts.js';

const ensureStore = async (filePath: string) => {
  await mkdir(dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, 'utf8');
  } catch {
    await writeFile(filePath, JSON.stringify({ sessions: {} }, null, 2), 'utf8');
  }
};

const readSnapshot = async (filePath: string) => {
  await ensureStore(filePath);
  const raw = await readFile(filePath, 'utf8');
  return runtimeSessionStoreSnapshotSchema.parse(JSON.parse(raw));
};

const writeSnapshot = async (
  filePath: string,
  snapshot: Awaited<ReturnType<typeof readSnapshot>>
) => {
  await writeFile(filePath, JSON.stringify(snapshot, null, 2), 'utf8');
};

export const createRuntimeSessionStore = (
  rawOptions: { filePath: string },
  dependencies?: { logger?: StructuredLogger }
) => {
  const options = runtimeSessionStoreOptionsSchema.parse(rawOptions);
  const logger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'runtime-session-store'
    });

  return {
    async save(session: StudioSessionApplicationResponse) {
      const parsed = studioSessionApplicationResponseSchema.parse(session);
      const snapshot = await readSnapshot(options.filePath);
      snapshot.sessions[parsed.session.sessionCode] = parsed;
      await writeSnapshot(options.filePath, snapshot);
      logger.info('session.saved', {
        sessionCode: parsed.session.sessionCode
      });
      return parsed;
    },
    async read(sessionCode: string) {
      const snapshot = await readSnapshot(options.filePath);
      logger.info('session.read', {
        sessionCode,
        found: snapshot.sessions[sessionCode] !== undefined
      });
      return snapshot.sessions[sessionCode] ?? null;
    },
    async updateContinuity(sessionCode: string, continuityCode: string) {
      const snapshot = await readSnapshot(options.filePath);
      const existing = snapshot.sessions[sessionCode];

      if (!existing) {
        return null;
      }

      const updated = studioSessionApplicationResponseSchema.parse({
        ...existing,
        continuityCode
      });
      snapshot.sessions[sessionCode] = updated;
      await writeSnapshot(options.filePath, snapshot);
      logger.info('session.continuity.updated', {
        sessionCode,
        continuityCode
      });
      return updated;
    }
  };
};
