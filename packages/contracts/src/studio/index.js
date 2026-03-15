import { z } from 'zod';
import { boundaryMetadataSchema, packetRefSchema } from '../core/index.js';
import { persistenceResultSchema } from '../lineage/index.js';
import { productionPackageResultSchema } from '../production/index.js';
import { canonValidationResultSchema } from '../validation/index.js';
export const studioActionTypeSchema = z.enum([
    'inspect_package',
    'inspect_validation',
    'inspect_lineage',
    'queue_generation',
    'queue_benchmark_review',
    'queue_persistence_review'
]);
export const studioPanelShellSchema = z.object({
    panelCode: z.string().min(1),
    panelKind: z.enum([
        'package_inspector',
        'validation_inspector',
        'lineage_inspector',
        'queue_projection'
    ]),
    title: z.string().min(1),
    metadata: boundaryMetadataSchema
});
export const studioViewShellSchema = z.object({
    viewCode: z.string().min(1),
    activePanelCode: z.string().min(1),
    mode: z.enum(['inspect', 'queue']),
    metadata: boundaryMetadataSchema
});
export const studioQueueItemShellSchema = z.object({
    itemCode: z.string().min(1),
    queueType: z.enum([
        'generation',
        'benchmark_review',
        'persistence_review'
    ]),
    requestCode: z.string().min(1),
    targetCode: z.string().min(1),
    status: z.enum(['projected', 'held']),
    metadata: boundaryMetadataSchema
});
export const studioQueueShellSchema = z.object({
    queueCode: z.string().min(1),
    queueType: z.enum([
        'generation',
        'benchmark_review',
        'persistence_review'
    ]),
    items: z.array(studioQueueItemShellSchema).max(1),
    metadata: boundaryMetadataSchema
});
export const studioStatusShellSchema = z.enum([
    'ready',
    'queued',
    'inspection_ready',
    'review_required'
]);
export const studioFilterShellSchema = z.object({
    filterCode: z.string().min(1),
    scope: z.enum(['package', 'validation', 'lineage', 'queue']),
    terms: z.array(z.string().min(1)).default([]),
    metadata: boundaryMetadataSchema
});
export const studioSelectionShellSchema = z.object({
    selectionCode: z.string().min(1),
    selectedPacketRef: packetRefSchema,
    selectedCodes: z.array(z.string().min(1)).min(1),
    metadata: boundaryMetadataSchema
});
export const studioArtifactReferenceShellSchema = z.object({
    packetRef: packetRefSchema,
    productionPackage: productionPackageResultSchema
});
export const studioValidationReferenceShellSchema = z.object({
    packetRef: packetRefSchema,
    validation: canonValidationResultSchema
});
export const studioLineageReferenceShellSchema = z.object({
    packetRef: packetRefSchema,
    persistence: persistenceResultSchema
});
export const studioActionInputSchema = z.object({
    requestCode: z.string().min(1),
    actionType: studioActionTypeSchema,
    panel: studioPanelShellSchema,
    view: studioViewShellSchema,
    filter: studioFilterShellSchema,
    selection: studioSelectionShellSchema,
    artifactReference: studioArtifactReferenceShellSchema,
    validationReference: studioValidationReferenceShellSchema,
    lineageReference: studioLineageReferenceShellSchema,
    metadata: boundaryMetadataSchema
});
export const studioActionRequestSchema = z.object({
    requestCode: z.string().min(1),
    input: studioActionInputSchema
});
export const studioActionDecisionShellSchema = z.object({
    decision: z.enum(['inspect', 'project_queue', 'hold']),
    accepted: z.boolean(),
    reasons: z.array(z.string().min(1)).default([])
});
export const studioActionSummaryShellSchema = z.object({
    requestCode: z.string().min(1),
    normalizedActionType: studioActionTypeSchema,
    selectedPacketCode: z.string().min(1),
    queueItemCount: z.coerce.number().int().nonnegative(),
    status: studioStatusShellSchema
});
export const studioActionResultSchema = z.object({
    requestCode: z.string().min(1),
    normalizedActionType: studioActionTypeSchema,
    panel: studioPanelShellSchema,
    view: studioViewShellSchema,
    selection: studioSelectionShellSchema,
    artifactReference: studioArtifactReferenceShellSchema,
    validationReference: studioValidationReferenceShellSchema,
    lineageReference: studioLineageReferenceShellSchema,
    queueProjection: studioQueueShellSchema,
    status: studioStatusShellSchema,
    decision: studioActionDecisionShellSchema,
    summary: studioActionSummaryShellSchema,
    metadata: boundaryMetadataSchema
});
//# sourceMappingURL=index.js.map