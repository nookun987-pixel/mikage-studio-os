import { z } from 'zod';
import { boundaryMetadataSchema, boundaryStatusSchema, packetRefSchema } from '../core/index.js';
import { benchmarkAuditResultSchema } from '../benchmark-audit/index.js';
import { productionPackageResultSchema } from '../production/index.js';
export const ingestionSourceShellSchema = z.object({
    sourceCode: z.string().min(1),
    sourceKind: z.enum(['production_package', 'benchmark_audit']),
    packetRef: packetRefSchema,
    metadata: boundaryMetadataSchema
});
export const ingestionAssetShellSchema = z.object({
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
});
export const ingestionArtifactShellSchema = z.object({
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
});
export const ingestionStatusShellSchema = z.enum([
    'received',
    'extracted',
    'persisted'
]);
export const ingestionInputSchema = z.object({
    requestCode: z.string().min(1),
    packageReference: z.object({
        packetRef: packetRefSchema,
        productionPackage: productionPackageResultSchema
    }),
    benchmarkAuditReference: z.object({
        packetRef: packetRefSchema,
        benchmarkAudit: benchmarkAuditResultSchema
    }),
    metadata: boundaryMetadataSchema
});
export const ingestionRequestSchema = z.object({
    requestCode: z.string().min(1),
    input: ingestionInputSchema
});
export const ingestionResultSchema = z.object({
    requestCode: z.string().min(1),
    ingestionCode: z.string().min(1),
    status: boundaryStatusSchema,
    processingStatus: ingestionStatusShellSchema,
    sources: z.array(ingestionSourceShellSchema).length(2),
    assets: z.array(ingestionAssetShellSchema).min(1),
    artifacts: z.array(ingestionArtifactShellSchema).min(1),
    metadata: boundaryMetadataSchema
});
//# sourceMappingURL=index.js.map