import { z } from 'zod';
export const packetKindSchema = z.enum([
    'orchestration_request',
    'world_context',
    'state_snapshot',
    'canon_report',
    'scene_packet',
    'script_packet',
    'production_package',
    'benchmark_audit',
    'ingestion_artifact',
    'lineage_record'
]);
export const packetRefSchema = z.object({
    packetKind: packetKindSchema,
    packetCode: z.string().min(1),
    packetVersion: z.coerce.number().int().positive().default(1)
});
export const boundaryStatusSchema = z.enum([
    'accepted',
    'validated',
    'rejected'
]);
export const boundaryMetadataSchema = z.record(z.string(), z.unknown()).default({});
//# sourceMappingURL=index.js.map