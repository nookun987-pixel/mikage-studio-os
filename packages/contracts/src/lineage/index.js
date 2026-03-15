import { z } from 'zod';
import { boundaryMetadataSchema, boundaryStatusSchema, packetRefSchema } from '../core/index.js';
import { ingestionResultSchema } from '../ingestion/index.js';
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
    ingestion: ingestionResultSchema,
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
//# sourceMappingURL=index.js.map