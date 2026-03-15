import { z } from 'zod';
import { boundaryMetadataSchema, boundaryStatusSchema, packetRefSchema } from '../core/index.js';
import { compileOutputSchema, negativePromptShellSchema } from '../compile/index.js';
import { canonValidationResultSchema } from '../validation/index.js';
export const packageModeShellSchema = z.enum([
    'prompt_bundle_only',
    'production_ready',
    'production_with_audit_placeholder'
]);
export const packageJobShellSchema = z.object({
    jobCode: z.string().min(1),
    projectSlug: z.string().min(1),
    presetCode: z.string().min(1),
    variantCode: z.string().min(1),
    providerCode: z.string().min(1),
    outputCount: z.coerce.number().int().positive(),
    metadata: boundaryMetadataSchema
});
export const assetIntentShellSchema = z.object({
    assetKind: z.enum(['image_generation', 'prompt_bundle']),
    outputCount: z.coerce.number().int().positive(),
    targetAspectRatio: z.string().min(1),
    metadata: boundaryMetadataSchema
});
export const compiledPromptReferenceShellSchema = z.object({
    packetRef: packetRefSchema,
    compiledPrompt: compileOutputSchema
});
export const validationReferenceShellSchema = z.object({
    packetRef: packetRefSchema,
    validation: canonValidationResultSchema
});
export const negativePromptReferenceShellSchema = z.object({
    packetRef: packetRefSchema,
    negativePrompt: negativePromptShellSchema
});
export const lineageReferenceShellSchema = z.object({
    packetRef: packetRefSchema,
    lineage: compileOutputSchema.shape.lineage
});
export const benchmarkAuditPlaceholderShellSchema = z.object({
    auditCode: z.string().min(1),
    status: z.enum(['pending', 'not_requested']).default('pending'),
    notes: z.array(z.string().min(1)).default([]),
    metadata: boundaryMetadataSchema
});
export const rejectionReasonShellSchema = z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    metadata: boundaryMetadataSchema
});
export const packageDecisionShellSchema = z.object({
    decision: z.enum(['accepted', 'rejected']),
    accepted: z.boolean(),
    rejectionReasons: z.array(rejectionReasonShellSchema).default([])
});
export const productionPackageInputSchema = z.object({
    requestCode: z.string().min(1),
    packageCode: z.string().min(1),
    packageMode: packageModeShellSchema,
    job: packageJobShellSchema,
    assetIntent: assetIntentShellSchema,
    compileReference: compiledPromptReferenceShellSchema,
    validationReference: validationReferenceShellSchema,
    negativePromptReference: negativePromptReferenceShellSchema,
    lineageReference: lineageReferenceShellSchema,
    benchmarkAudit: benchmarkAuditPlaceholderShellSchema,
    metadata: boundaryMetadataSchema
});
export const productionPackageRequestSchema = z.object({
    requestCode: z.string().min(1),
    input: productionPackageInputSchema
});
export const packageSummaryShellSchema = z.object({
    packageCode: z.string().min(1),
    sectionCount: z.coerce.number().int().nonnegative(),
    validationDecision: z.enum(['accepted', 'rejected']),
    benchmarkAuditStatus: z.enum(['pending', 'not_requested']),
    outputCount: z.coerce.number().int().positive()
});
export const promptBundleShellSchema = z.object({
    compiledPrompt: z.string().min(1),
    negativePrompt: z.string().min(1),
    sections: z.array(compileOutputSchema.shape.sections.element)
});
export const productionPackageResultSchema = z.object({
    packageCode: z.string().min(1),
    status: boundaryStatusSchema,
    packageMode: packageModeShellSchema,
    packageMetadata: boundaryMetadataSchema,
    job: packageJobShellSchema,
    compileReference: compiledPromptReferenceShellSchema,
    validationReference: validationReferenceShellSchema,
    promptBundle: promptBundleShellSchema,
    benchmarkAudit: benchmarkAuditPlaceholderShellSchema,
    decision: packageDecisionShellSchema,
    summary: packageSummaryShellSchema
});
//# sourceMappingURL=index.js.map