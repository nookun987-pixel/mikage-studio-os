import { productionPackageInputSchema, productionPackageResultSchema } from '@mikage/contracts';
const buildDecision = (input) => {
    if (input.validationReference.validation.decision === 'accepted') {
        return {
            decision: 'accepted',
            accepted: true,
            rejectionReasons: []
        };
    }
    return {
        decision: 'rejected',
        accepted: false,
        rejectionReasons: [
            {
                code: 'validation_rejected',
                message: 'Validation result must be accepted before packaging.',
                metadata: {}
            }
        ]
    };
};
export const assembleProductionPackage = (rawInput) => {
    const input = productionPackageInputSchema.parse(rawInput);
    const decision = buildDecision(input);
    const status = decision.accepted ? 'validated' : 'rejected';
    return productionPackageResultSchema.parse({
        packageCode: input.packageCode,
        status,
        packageMode: input.packageMode,
        packageMetadata: {
            requestCode: input.requestCode,
            packageMode: input.packageMode,
            assetIntent: input.assetIntent.assetKind,
            ...input.metadata
        },
        job: input.job,
        compileReference: input.compileReference,
        validationReference: input.validationReference,
        promptBundle: {
            compiledPrompt: input.compileReference.compiledPrompt.compiledPrompt,
            negativePrompt: input.negativePromptReference.negativePrompt.rendered || 'none',
            sections: input.compileReference.compiledPrompt.sections
        },
        benchmarkAudit: input.benchmarkAudit,
        decision,
        summary: {
            packageCode: input.packageCode,
            sectionCount: input.compileReference.compiledPrompt.sections.length,
            validationDecision: input.validationReference.validation.decision,
            benchmarkAuditStatus: input.benchmarkAudit.status,
            outputCount: input.job.outputCount
        }
    });
};
//# sourceMappingURL=assembler.js.map