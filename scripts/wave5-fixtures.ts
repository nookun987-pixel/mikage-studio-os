import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

import {
  buildBenchmarkSummaryProjection,
  buildLineageSummaryProjection
} from '../packages/persistence-read-port/src/index.ts';

export const runtimeRequestFixture = (requestCode: string) => ({
  commandType: 'execute_generation_pipeline' as const,
  request: {
    requestCode,
    projectSlug: 'mikage',
    characterCode: 'char_mikage',
    anchorCode: 'anchor_leia_041',
    presetCode: 'mikage_cinematic_portrait',
    variantCode: 'storm_rooftop_action',
    sceneCode: 'scene_rooftop_confrontation',
    shotCode: 'shot_low_angle_heroic_damaged_stillness',
    providerCode: 'mock_image_provider',
    outputCount: 4,
    contextPackets: [
      {
        packetKind: 'world_context' as const,
        packetCode: `ctx_${requestCode}`,
        packetVersion: 1
      }
    ],
    canonQueryMode: 'blocking' as const,
    sceneBuilderMode: 'scene_seeded' as const,
    scriptBuilderMode: 'outline_only' as const,
    productionPackageMode: 'benchmark_audit_shell' as const,
    benchmarkAudit: {},
    metadata: {}
  },
  compileProfile: {
    compileMode: 'production_prompt' as const,
    systemFrame: 'Preserve canonical tone.',
    canonConstraints: ['mikage', 'rooftop confrontation', 'framing'],
    contextSummaries: ['Mikage on rooftop confrontation.'],
    fragmentSummaries: ['Mikage remains focused and battle-worn.'],
    modeInstructions: ['Emphasize canonical framing.'],
    outputInstructions: ['Return concise prompt text.'],
    negativeClauses: ['low detail']
  },
  validationProfile: {
    ontologyRequiredTerms: ['mikage'],
    invariantRequiredTerms: ['rooftop confrontation'],
    philosophicalRequiredTerms: ['tone'],
    characterRequiredTerms: ['battle-worn'],
    visualRequiredTerms: ['framing']
  },
  benchmarkProfile: {
    goldReferenceTerms: ['mikage', 'rooftop confrontation'],
    silverReferenceTerms: ['framing'],
    redBlockedTerms: ['spaceship invasion']
  },
  studioProfile: {
    actionType: 'queue_persistence_review' as const,
    panelCode: `panel_${requestCode}`,
    panelTitle: 'Runtime',
    viewCode: `view_${requestCode}`,
    filterCode: `filter_${requestCode}`,
    filterTerms: []
  }
});

export const validationRejectedRuntimeRequestFixture = (requestCode: string) => ({
  ...runtimeRequestFixture(requestCode),
  validationProfile: {
    ontologyRequiredTerms: ['missing_required_term']
  }
});

export const worklistRequestFixture = (code: string) => ({
  benchmarkSummary: buildBenchmarkSummaryProjection(`pkg_${code}`),
  lineageSummary: buildLineageSummaryProjection(`persist_${code}`)
});

export const runtimeStoreFile = (fileName: string) =>
  join('D:\\mikage-studio-os', '.local', 'runtime', fileName);

export const resetRuntimeFile = async (filePath: string) => {
  await mkdir(join('D:\\mikage-studio-os', '.local', 'runtime'), {
    recursive: true
  });
  await rm(filePath, { force: true });
};
