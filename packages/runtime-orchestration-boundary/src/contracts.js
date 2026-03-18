import { z } from 'zod';
import { orchestrationRequestSchema, studioActionTypeSchema } from '@mikage/contracts';
export const runtimeCommandTypeSchema = z.literal('execute_generation_pipeline');
export const runtimeCompileProfileSchema = z.object({
    compileMode: z.literal('production_prompt'),
    systemFrame: z.string().min(1),
    canonConstraints: z.array(z.string().min(1)).min(1),
    contextSummaries: z.array(z.string().min(1)).min(1),
    fragmentSummaries: z.array(z.string().min(1)).min(1),
    modeInstructions: z.array(z.string().min(1)).min(1),
    outputInstructions: z.array(z.string().min(1)).min(1),
    negativeClauses: z.array(z.string().min(1)).min(1)
});
export const runtimeValidationProfileSchema = z.object({
    ontologyRequiredTerms: z.array(z.string().min(1)).default([]),
    ontologyProhibitedTerms: z.array(z.string().min(1)).default([]),
    ontologyAdvisoryTerms: z.array(z.string().min(1)).default([]),
    invariantRequiredTerms: z.array(z.string().min(1)).default([]),
    invariantProhibitedTerms: z.array(z.string().min(1)).default([]),
    invariantAdvisoryTerms: z.array(z.string().min(1)).default([]),
    philosophicalRequiredTerms: z.array(z.string().min(1)).default([]),
    philosophicalProhibitedTerms: z.array(z.string().min(1)).default([]),
    philosophicalAdvisoryTerms: z.array(z.string().min(1)).default([]),
    characterRequiredTerms: z.array(z.string().min(1)).default([]),
    characterProhibitedTerms: z.array(z.string().min(1)).default([]),
    characterAdvisoryTerms: z.array(z.string().min(1)).default([]),
    visualRequiredTerms: z.array(z.string().min(1)).default([]),
    visualProhibitedTerms: z.array(z.string().min(1)).default([]),
    visualAdvisoryTerms: z.array(z.string().min(1)).default([]),
    driftRiskTerms: z.array(z.string().min(1)).default([]),
    driftHardBlockTerms: z.array(z.string().min(1)).default([])
});
export const runtimeBenchmarkProfileSchema = z.object({
    goldReferenceTerms: z.array(z.string().min(1)).default([]),
    silverReferenceTerms: z.array(z.string().min(1)).default([]),
    redBlockedTerms: z.array(z.string().min(1)).default([])
});
export const runtimeStudioProfileSchema = z.object({
    actionType: studioActionTypeSchema,
    panelCode: z.string().min(1),
    panelTitle: z.string().min(1),
    viewCode: z.string().min(1),
    filterCode: z.string().min(1),
    filterTerms: z.array(z.string().min(1)).default([])
});
export const orchestrationChainRequestShellSchema = z.object({
    commandType: runtimeCommandTypeSchema,
    request: orchestrationRequestSchema,
    compileProfile: runtimeCompileProfileSchema,
    validationProfile: runtimeValidationProfileSchema,
    benchmarkProfile: runtimeBenchmarkProfileSchema,
    studioProfile: runtimeStudioProfileSchema
});
export const orchestrationStepSummaryShellSchema = z.object({
    step: z.enum([
        'layer3_request_boundary',
        'layer4_prompt_compile',
        'layer5_canon_validate',
        'layer6_production_package_assembly',
        'layer7_benchmark_audit',
        'layer8_ingestion_and_lineage_persistence',
        'layer9_studio_action_boundary'
    ]),
    status: z.enum(['completed', 'stopped']),
    detail: z.string().min(1)
});
export const orchestrationFinalStatusShellSchema = z.enum([
    'completed',
    'stopped_validation_rejected',
    'stopped_packaging_rejected',
    'stopped_benchmark_rejected',
    'stopped_persistence_rejected'
]);
export const orchestrationChainResultShellSchema = z.object({
    requestCode: z.string().min(1),
    compileMode: z.literal('production_prompt'),
    validationDecision: z.enum(['accepted', 'rejected']),
    packageCode: z.string().min(1).nullable(),
    benchmarkDecision: z.enum(['approved', 'review', 'rejected']).nullable(),
    ingestionCode: z.string().min(1).nullable(),
    persistenceCode: z.string().min(1).nullable(),
    studioActionType: studioActionTypeSchema.nullable(),
    finalStatus: orchestrationFinalStatusShellSchema,
    executedSteps: z.array(orchestrationStepSummaryShellSchema)
});
//# sourceMappingURL=contracts.js.map