import { z } from 'zod';

import {
  boundaryMetadataSchema,
  boundaryStatusSchema,
  packetRefSchema
} from '../core/index.js';

export const lineageNodeShellSchema = z.object({
  nodeCode: z.string().min(1),
  nodeKind: z.enum([
    'package',
    'compile_output',
    'validation_result',
    'benchmark_audit',
    'ingestion_artifact'
  ]),
  label: z.string().min(1),
  packetRef: packetRefSchema.optional(),
  metadata: boundaryMetadataSchema
});

export const lineageEdgeShellSchema = z.object({
  edgeCode: z.string().min(1),
  edgeKind: z.enum([
    'derived_from',
    'validated_by',
    'audited_by',
    'materialized_as'
  ]),
  fromNodeCode: z.string().min(1),
  toNodeCode: z.string().min(1),
  metadata: boundaryMetadataSchema
});

export const lineageRecordShellSchema = z.object({
  lineageCode: z.string().min(1),
  packetRef: packetRefSchema,
  nodes: z.array(lineageNodeShellSchema).min(1),
  edges: z.array(lineageEdgeShellSchema).min(1),
  metadata: boundaryMetadataSchema
});

export const lineageReferenceShellSchema = z.object({
  packetRef: packetRefSchema,
  lineageRecord: lineageRecordShellSchema
});

export const persistenceDecisionShellSchema = z.object({
  decision: z.enum(['accepted', 'rejected']),
  persisted: z.boolean(),
  reasons: z.array(z.string().min(1)).default([])
});

export const persistenceSummaryShellSchema = z.object({
  requestCode: z.string().min(1),
  nodeCount: z.coerce.number().int().nonnegative(),
  edgeCount: z.coerce.number().int().nonnegative(),
  artifactCount: z.coerce.number().int().nonnegative(),
  decision: z.enum(['accepted', 'rejected'])
});

export const persistenceInputSchema = z.object({
  requestCode: z.string().min(1),
  ingestion: z.object({
    requestCode: z.string().min(1),
    ingestionCode: z.string().min(1),
    status: boundaryStatusSchema,
    processingStatus: z.enum(['received', 'extracted', 'persisted']),
    sources: z.array(z.object({
      sourceCode: z.string().min(1),
      sourceKind: z.enum(['production_package', 'benchmark_audit']),
      packetRef: packetRefSchema,
      metadata: boundaryMetadataSchema
    })).length(2),
    assets: z.array(z.object({
      assetCode: z.string().min(1),
      assetKind: z.enum([
        'compiled_prompt',
        'negative_prompt',
        'validation_summary',
        'benchmark_audit_summary',
        'lineage_manifest'
      ]),
      contentType: z.enum(['text/plain', 'application/json']),
      checksum: z.string().min(1),
      metadata: boundaryMetadataSchema
    })).min(1),
    artifacts: z.array(z.object({
      artifactCode: z.string().min(1),
      assetCode: z.string().min(1),
      artifactKind: z.enum([
        'prompt_bundle',
        'validation_report',
        'benchmark_report',
        'lineage_manifest'
      ]),
      packetRef: packetRefSchema,
      metadata: boundaryMetadataSchema
    })).min(1),
    metadata: boundaryMetadataSchema
  }),
  metadata: boundaryMetadataSchema
});

export const persistenceRequestSchema = z.object({
  requestCode: z.string().min(1),
  input: persistenceInputSchema
});

export const persistenceResultSchema = z.object({
  requestCode: z.string().min(1),
  persistenceCode: z.string().min(1),
  status: boundaryStatusSchema,
  lineage: lineageReferenceShellSchema,
  decision: persistenceDecisionShellSchema,
  summary: persistenceSummaryShellSchema,
  metadata: boundaryMetadataSchema
});

export type LineageNodeShell = z.infer<typeof lineageNodeShellSchema>;
export type LineageEdgeShell = z.infer<typeof lineageEdgeShellSchema>;
export type LineageRecordShell = z.infer<typeof lineageRecordShellSchema>;
export type LineageReferenceShell = z.infer<typeof lineageReferenceShellSchema>;
export type PersistenceDecisionShell = z.infer<
  typeof persistenceDecisionShellSchema
>;
export type PersistenceSummaryShell = z.infer<
  typeof persistenceSummaryShellSchema
>;
export type PersistenceInput = z.infer<typeof persistenceInputSchema>;
export type PersistenceRequest = z.infer<typeof persistenceRequestSchema>;
export type PersistenceResult = z.infer<typeof persistenceResultSchema>;
