import {
  ingestionResultSchema,
  ingestionInputSchema,
  persistenceInputSchema,
  persistenceResultSchema,
  type IngestionArtifactShell,
  type IngestionAssetShell,
  type IngestionInput,
  type IngestionResult,
  type IngestionSourceShell,
  type LineageEdgeShell,
  type LineageNodeShell,
  type PersistenceInput,
  type PersistenceResult
} from '@mikage/contracts';

import { localPersistenceAdapter } from './adapter.js';

const buildChecksum = (value: string): string => {
  let checksum = 0;

  for (const char of value) {
    checksum = (checksum * 31 + char.charCodeAt(0)) % 1000000007;
  }

  return `chk_${checksum.toString(16)}`;
};

const buildIngestionCode = (requestCode: string, packageCode: string) =>
  `ing_${requestCode}_${packageCode}`;

const buildPersistenceCode = (requestCode: string, ingestionCode: string) =>
  `persist_${requestCode}_${ingestionCode}`;

const buildSources = (input: IngestionInput): IngestionSourceShell[] => [
  {
    sourceCode: `${input.packageReference.productionPackage.packageCode}_source`,
    sourceKind: 'production_package',
    packetRef: input.packageReference.packetRef,
    metadata: input.metadata
  },
  {
    sourceCode: `${input.benchmarkAuditReference.benchmarkAudit.requestCode}_source`,
    sourceKind: 'benchmark_audit',
    packetRef: input.benchmarkAuditReference.packetRef,
    metadata: input.metadata
  }
];

const buildAssets = (input: IngestionInput): IngestionAssetShell[] => {
  const productionPackage = input.packageReference.productionPackage;
  const benchmarkAudit = input.benchmarkAuditReference.benchmarkAudit;

  return [
    {
      assetCode: `${productionPackage.packageCode}_compiled_prompt`,
      assetKind: 'compiled_prompt',
      contentType: 'text/plain',
      checksum: buildChecksum(productionPackage.promptBundle.compiledPrompt),
      metadata: input.metadata
    },
    {
      assetCode: `${productionPackage.packageCode}_negative_prompt`,
      assetKind: 'negative_prompt',
      contentType: 'text/plain',
      checksum: buildChecksum(productionPackage.promptBundle.negativePrompt),
      metadata: input.metadata
    },
    {
      assetCode: `${productionPackage.packageCode}_validation_summary`,
      assetKind: 'validation_summary',
      contentType: 'application/json',
      checksum: buildChecksum(
        JSON.stringify(productionPackage.validationReference.validation.summary)
      ),
      metadata: input.metadata
    },
    {
      assetCode: `${productionPackage.packageCode}_benchmark_summary`,
      assetKind: 'benchmark_audit_summary',
      contentType: 'application/json',
      checksum: buildChecksum(JSON.stringify(benchmarkAudit.summary)),
      metadata: input.metadata
    },
    {
      assetCode: `${productionPackage.packageCode}_lineage_manifest`,
      assetKind: 'lineage_manifest',
      contentType: 'application/json',
      checksum: buildChecksum(JSON.stringify(productionPackage.compileReference.compiledPrompt.lineage)),
      metadata: input.metadata
    }
  ];
};

const buildArtifacts = (
  input: IngestionInput,
  assets: IngestionAssetShell[]
): IngestionArtifactShell[] => {
  const packageCode = input.packageReference.productionPackage.packageCode;

  return [
    {
      artifactCode: `${packageCode}_prompt_bundle_artifact`,
      assetCode: assets[0].assetCode,
      artifactKind: 'prompt_bundle',
      packetRef: input.packageReference.packetRef,
      metadata: input.metadata
    },
    {
      artifactCode: `${packageCode}_validation_artifact`,
      assetCode: assets[2].assetCode,
      artifactKind: 'validation_report',
      packetRef: input.packageReference.productionPackage.validationReference.packetRef,
      metadata: input.metadata
    },
    {
      artifactCode: `${packageCode}_benchmark_artifact`,
      assetCode: assets[3].assetCode,
      artifactKind: 'benchmark_report',
      packetRef: input.benchmarkAuditReference.packetRef,
      metadata: input.metadata
    },
    {
      artifactCode: `${packageCode}_lineage_artifact`,
      assetCode: assets[4].assetCode,
      artifactKind: 'lineage_manifest',
      packetRef: {
        packetKind: 'lineage_record',
        packetCode: `${packageCode}_lineage_record`,
        packetVersion: 1
      },
      metadata: input.metadata
    }
  ];
};

const buildLineageNodes = (input: PersistenceInput): LineageNodeShell[] => {
  const packageCode = input.ingestion.sources[0]?.packetRef.packetCode ?? 'unknown_package';
  const benchmarkCode = input.ingestion.sources[1]?.packetRef.packetCode ?? 'unknown_audit';

  return [
    {
      nodeCode: `${packageCode}_node_package`,
      nodeKind: 'package',
      label: packageCode,
      packetRef: input.ingestion.sources[0]?.packetRef,
      metadata: input.metadata
    },
    {
      nodeCode: `${packageCode}_node_compile`,
      nodeKind: 'compile_output',
      label: `${packageCode}_compile_output`,
      packetRef: input.ingestion.artifacts[0]?.packetRef,
      metadata: input.metadata
    },
    {
      nodeCode: `${packageCode}_node_validation`,
      nodeKind: 'validation_result',
      label: `${packageCode}_validation`,
      packetRef: input.ingestion.artifacts[1]?.packetRef,
      metadata: input.metadata
    },
    {
      nodeCode: `${benchmarkCode}_node_audit`,
      nodeKind: 'benchmark_audit',
      label: benchmarkCode,
      packetRef: input.ingestion.sources[1]?.packetRef,
      metadata: input.metadata
    },
    {
      nodeCode: `${packageCode}_node_artifact`,
      nodeKind: 'ingestion_artifact',
      label: `${packageCode}_lineage_artifact`,
      packetRef: input.ingestion.artifacts[3]?.packetRef,
      metadata: input.metadata
    }
  ];
};

const buildLineageEdges = (
  input: PersistenceInput,
  nodes: LineageNodeShell[]
): LineageEdgeShell[] => [
  {
    edgeCode: `${input.requestCode}_edge_derived`,
    edgeKind: 'derived_from',
    fromNodeCode: nodes[1]?.nodeCode ?? 'unknown_compile',
    toNodeCode: nodes[0]?.nodeCode ?? 'unknown_package',
    metadata: input.metadata
  },
  {
    edgeCode: `${input.requestCode}_edge_validated`,
    edgeKind: 'validated_by',
    fromNodeCode: nodes[0]?.nodeCode ?? 'unknown_package',
    toNodeCode: nodes[2]?.nodeCode ?? 'unknown_validation',
    metadata: input.metadata
  },
  {
    edgeCode: `${input.requestCode}_edge_audited`,
    edgeKind: 'audited_by',
    fromNodeCode: nodes[0]?.nodeCode ?? 'unknown_package',
    toNodeCode: nodes[3]?.nodeCode ?? 'unknown_audit',
    metadata: input.metadata
  },
  {
    edgeCode: `${input.requestCode}_edge_materialized`,
    edgeKind: 'materialized_as',
    fromNodeCode: nodes[0]?.nodeCode ?? 'unknown_package',
    toNodeCode: nodes[4]?.nodeCode ?? 'unknown_artifact',
    metadata: input.metadata
  }
];

export const ingestPackageShell = (rawInput: IngestionInput): IngestionResult => {
  const input = ingestionInputSchema.parse(rawInput);
  const ingestionCode = buildIngestionCode(
    input.requestCode,
    input.packageReference.productionPackage.packageCode
  );
  const sources = buildSources(input);
  const assets = buildAssets(input);
  const artifacts = localPersistenceAdapter.persistArtifacts(
    buildArtifacts(input, assets)
  );

  return ingestionResultSchema.parse({
    requestCode: input.requestCode,
    ingestionCode,
    status: 'validated',
    processingStatus: 'persisted',
    sources,
    assets,
    artifacts,
    metadata: {
      adapterCode: localPersistenceAdapter.adapterCode,
      adapterMode: localPersistenceAdapter.mode,
      ...input.metadata
    }
  });
};

export const persistLineageShell = (
  rawInput: PersistenceInput
): PersistenceResult => {
  const input = persistenceInputSchema.parse(rawInput);
  const nodes = buildLineageNodes(input);
  const edges = buildLineageEdges(input, nodes);
  const persistedGraph = localPersistenceAdapter.persistLineage(nodes, edges);
  const persistenceCode = buildPersistenceCode(
    input.requestCode,
    input.ingestion.ingestionCode
  );

  return persistenceResultSchema.parse({
    requestCode: input.requestCode,
    persistenceCode,
    status: 'validated',
    lineage: {
      packetRef: {
        packetKind: 'lineage_record',
        packetCode: `${input.ingestion.ingestionCode}_lineage`,
        packetVersion: 1
      },
      lineageRecord: {
        lineageCode: `${input.ingestion.ingestionCode}_lineage_record`,
        packetRef: {
          packetKind: 'lineage_record',
          packetCode: `${input.ingestion.ingestionCode}_lineage`,
          packetVersion: 1
        },
        nodes: persistedGraph.nodes,
        edges: persistedGraph.edges,
        metadata: input.metadata
      }
    },
    decision: {
      decision: 'accepted',
      persisted: true,
      reasons: []
    },
    summary: {
      requestCode: input.requestCode,
      nodeCount: persistedGraph.nodes.length,
      edgeCount: persistedGraph.edges.length,
      artifactCount: input.ingestion.artifacts.length,
      decision: 'accepted'
    },
    metadata: {
      adapterCode: localPersistenceAdapter.adapterCode,
      adapterMode: localPersistenceAdapter.mode,
      ...input.metadata
    }
  });
};
