import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ProjectStatus,
  PromptPresetStatus,
  WorldEntityKind,
  WorldEntityStatus,
  prisma
} from '@mikage/database';
import { ensureLocalPostgres } from './local-postgres.js';

type ProjectSeed = {
  slug: string;
  name: string;
  status?: ProjectStatus;
  metadata?: Record<string, unknown>;
};

type WorldEntitySeed = {
  projectSlug: string;
  entityCode: string;
  name: string;
  summary?: string;
  status?: WorldEntityStatus;
  metadata?: Record<string, unknown>;
  version?: {
    versionNumber?: number;
    data: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  };
};

type WorldEntitySeedFile = {
  characters?: WorldEntitySeed[];
  locations?: WorldEntitySeed[];
  reference_styles?: WorldEntitySeed[];
};

type PromptPresetSeed = {
  projectSlug: string;
  presetCode: string;
  name: string;
  status?: PromptPresetStatus;
  objective?: string;
  modality?: string;
  requiresState?: boolean;
  presetData: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedDirectory = path.resolve(__dirname, '../data/seeds');

const readJson = async <T>(filename: string): Promise<T> => {
  const filePath = path.join(seedDirectory, filename);
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
};

const seedProjects = async () => {
  const records = await readJson<ProjectSeed[]>('000_projects.seed.json');

  for (const record of records) {
    await prisma.project.upsert({
      where: { slug: record.slug },
      update: {
        name: record.name,
        status: record.status ?? ProjectStatus.active,
        metadata: record.metadata ?? undefined
      },
      create: {
        slug: record.slug,
        name: record.name,
        status: record.status ?? ProjectStatus.active,
        metadata: record.metadata ?? undefined
      }
    });
  }

  return records.length;
};

const upsertWorldEntity = async (seed: WorldEntitySeed, entityKind: WorldEntityKind) => {
  const project = await prisma.project.findUnique({
    where: { slug: seed.projectSlug },
    select: { id: true }
  });

  if (!project) {
    throw new Error(`Project seed not found for world entity ${seed.entityCode}: ${seed.projectSlug}`);
  }

  const entity = await prisma.worldEntity.upsert({
    where: { entityCode: seed.entityCode },
    update: {
      name: seed.name,
      summary: seed.summary,
      status: seed.status ?? WorldEntityStatus.active,
      entityKind,
      projectId: project.id,
      metadata: seed.metadata ?? undefined,
      currentVersion: seed.version?.versionNumber ?? 1
    },
    create: {
      projectId: project.id,
      entityCode: seed.entityCode,
      entityKind,
      name: seed.name,
      summary: seed.summary,
      status: seed.status ?? WorldEntityStatus.active,
      metadata: seed.metadata ?? undefined,
      currentVersion: seed.version?.versionNumber ?? 1
    }
  });

  if (seed.version) {
    await prisma.worldEntityVersion.upsert({
      where: {
        worldEntityId_versionNumber: {
          worldEntityId: entity.id,
          versionNumber: seed.version.versionNumber ?? 1
        }
      },
      update: {
        data: seed.version.data,
        metadata: seed.version.metadata ?? undefined
      },
      create: {
        worldEntityId: entity.id,
        versionNumber: seed.version.versionNumber ?? 1,
        data: seed.version.data,
        metadata: seed.version.metadata ?? undefined
      }
    });
  }
};

const seedWorldEntities = async () => {
  const records = await readJson<WorldEntitySeedFile>('003_world_entities.seed.json');
  const batches: Array<[WorldEntityKind, WorldEntitySeed[] | undefined]> = [
    [WorldEntityKind.character, records.characters],
    [WorldEntityKind.location, records.locations],
    [WorldEntityKind.visual_dna_profile, records.reference_styles]
  ];

  let count = 0;

  for (const [kind, seeds] of batches) {
    for (const seed of seeds ?? []) {
      await upsertWorldEntity(seed, kind);
      count += 1;
    }
  }

  return count;
};

const seedPromptPresets = async () => {
  const records = await readJson<PromptPresetSeed[]>('010_prompt_presets.seed.json');

  for (const record of records) {
    const project = await prisma.project.findUnique({
      where: { slug: record.projectSlug },
      select: { id: true }
    });

    if (!project) {
      throw new Error(`Project seed not found for preset ${record.presetCode}: ${record.projectSlug}`);
    }

    await prisma.promptPreset.upsert({
      where: { presetCode: record.presetCode },
      update: {
        projectId: project.id,
        name: record.name,
        status: record.status ?? PromptPresetStatus.active,
        objective: record.objective,
        modality: record.modality,
        requiresState: record.requiresState ?? false,
        presetData: record.presetData,
        metadata: record.metadata ?? undefined
      },
      create: {
        projectId: project.id,
        presetCode: record.presetCode,
        name: record.name,
        status: record.status ?? PromptPresetStatus.active,
        objective: record.objective,
        modality: record.modality,
        requiresState: record.requiresState ?? false,
        presetData: record.presetData,
        metadata: record.metadata ?? undefined
      }
    });
  }

  return records.length;
};

const main = async () => {
  const availableSeedFiles = await readdir(seedDirectory);
  const summary = {
    projects: 0,
    worldEntities: 0,
    promptPresets: 0,
    availableSeedFiles
  };

  summary.projects = await seedProjects();
  summary.worldEntities = await seedWorldEntities();
  summary.promptPresets = await seedPromptPresets();

  console.log(JSON.stringify(summary, null, 2));
};

ensureLocalPostgres()
  .then(main)
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error: unknown) => {
    console.error('Seed run failed.');
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
