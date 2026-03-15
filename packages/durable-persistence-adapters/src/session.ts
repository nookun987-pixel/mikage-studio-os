import {
  prisma,
  type PrismaClient
} from '@mikage/database';
import { createRuntimeSessionStore } from '@mikage/runtime-session-store';
import {
  createStructuredLogger,
  type StructuredLogger
} from '@mikage/structured-logging';
import {
  studioSessionApplicationResponseSchema,
  type StudioSessionApplicationResponse
} from '@mikage/studio-session-application';

import {
  durablePersistenceOptionsSchema,
  durableSessionArchiveSchema,
  durableSessionRecordSchema,
  type DurablePersistenceOptions
} from './contracts.js';

const archiveCodeFor = (sessionCode: string) => `session::${sessionCode}`;

const resolveProjectId = async (
  client: PrismaClient,
  projectSlug: string
) => {
  const existing =
    (await client.project.findUnique({
      where: { slug: projectSlug }
    })) ??
    (await client.project.findFirst({
      orderBy: { createdAt: 'asc' }
    }));

  if (existing) {
    return existing.id;
  }

  const created = await client.project.create({
    data: {
      slug: projectSlug,
      name: projectSlug
    }
  });

  return created.id;
};

export const createDurableSessionPersistenceAdapter = (
  rawOptions: DurablePersistenceOptions,
  dependencies?: {
    prismaClient?: PrismaClient;
    logger?: StructuredLogger;
  }
) => {
  const options = durablePersistenceOptionsSchema.parse(rawOptions);
  const client = dependencies?.prismaClient ?? prisma;
  const logger =
    dependencies?.logger ??
    createStructuredLogger({
      component: 'durable-session-persistence'
    });
  const fallback = options.fallbackSessionFilePath
    ? createRuntimeSessionStore(
        { filePath: options.fallbackSessionFilePath },
        {
          logger: logger.child('fallback-session-store')
        }
      )
    : null;

  const persist = async (session: StudioSessionApplicationResponse) => {
    const parsed = studioSessionApplicationResponseSchema.parse(session);

    try {
      const projectId = await resolveProjectId(client, options.projectSlug);
      await client.archive.upsert({
        where: {
          archiveCode: archiveCodeFor(parsed.session.sessionCode)
        },
        update: {
          archiveData: {
            kind: 'studio_session',
            session: parsed
          },
          metadata: {
            storageMode: 'database'
          }
        },
        create: {
          projectId,
          archiveCode: archiveCodeFor(parsed.session.sessionCode),
          archiveData: {
            kind: 'studio_session',
            session: parsed
          },
          metadata: {
            storageMode: 'database'
          }
        }
      });
      logger.info('durable.session.saved', {
        sessionCode: parsed.session.sessionCode,
        storageMode: 'database'
      });

      return durableSessionRecordSchema.parse({
        session: parsed,
        storageMode: 'database'
      });
    } catch (error) {
      if (!fallback) {
        throw error;
      }

      const saved = await fallback.save(parsed);
      logger.warn('durable.session.saved', {
        sessionCode: parsed.session.sessionCode,
        storageMode: 'fallback_file'
      });

      return durableSessionRecordSchema.parse({
        session: saved,
        storageMode: 'fallback_file'
      });
    }
  };

  const read = async (sessionCode: string) => {
    try {
      const archive = await client.archive.findUnique({
        where: {
          archiveCode: archiveCodeFor(sessionCode)
        }
      });

      if (!archive) {
        return null;
      }

      const payload = archive.archiveData as { session?: unknown };
      const session = studioSessionApplicationResponseSchema.parse(payload.session);

      return durableSessionRecordSchema.parse({
        session,
        storageMode: 'database'
      });
    } catch (error) {
      if (!fallback) {
        throw error;
      }

      const session = await fallback.read(sessionCode);

      if (!session) {
        return null;
      }

      return durableSessionRecordSchema.parse({
        session,
        storageMode: 'fallback_file'
      });
    }
  };

  const updateContinuity = async (
    sessionCode: string,
    continuityCode: string
  ) => {
    const existing = await read(sessionCode);

    if (!existing) {
      return null;
    }

    const updated = studioSessionApplicationResponseSchema.parse({
      ...existing.session,
      continuityCode
    });

    return persist(updated);
  };

  const inspect = async (sessionCode: string) => {
    const existing = await read(sessionCode);

    if (!existing) {
      return null;
    }

    return durableSessionArchiveSchema.parse({
      archiveCode: archiveCodeFor(sessionCode),
      sessionCode,
      continuityCode: existing.session.continuityCode,
      snapshotCode: existing.session.snapshotCode,
      storageMode: existing.storageMode
    });
  };

  return {
    save: async (session: StudioSessionApplicationResponse) => {
      const stored = await persist(session);
      return stored.session;
    },
    read: async (sessionCode: string) => {
      const stored = await read(sessionCode);
      return stored?.session ?? null;
    },
    updateContinuity: async (sessionCode: string, continuityCode: string) => {
      const updated = await updateContinuity(sessionCode, continuityCode);
      return updated?.session ?? null;
    },
    inspect
  };
};
