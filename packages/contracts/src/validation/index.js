import { z } from 'zod';
import { boundaryMetadataSchema, boundaryStatusSchema, packetRefSchema } from '../core/index.js';
import { compileOutputSchema } from '../compile/index.js';
export const violationSeveritySchema = z.enum(['warning', 'blocker']);
export const validationDecisionSchema = z.enum(['accepted', 'rejected']);
export const violationItemSchema = z.object({
    code: z.string().min(1),
    category: z.enum([
        'ontology',
        'invariants',
        'philosophical_axes',
        'character_truth',
        'visual_grammar',
        'drift_risk'
    ]),
    message: z.string().min(1),
    severity: violationSeveritySchema,
    metadata: boundaryMetadataSchema
});
export const warningItemSchema = z.object({
    code: z.string().min(1),
    category: z.enum([
        'ontology',
        'invariants',
        'philosophical_axes',
        'character_truth',
        'visual_grammar',
        'drift_risk'
    ]),
    message: z.string().min(1),
    metadata: boundaryMetadataSchema
});
const ruleShellBaseSchema = z.object({
    requiredTerms: z.array(z.string().min(1)).default([]),
    prohibitedTerms: z.array(z.string().min(1)).default([]),
    advisoryTerms: z.array(z.string().min(1)).default([]),
    metadata: boundaryMetadataSchema
});
export const ontologyCheckShellSchema = ruleShellBaseSchema.extend({
    kind: z.literal('ontology')
});
export const invariantCheckShellSchema = ruleShellBaseSchema.extend({
    kind: z.literal('invariants')
});
export const philosophicalAxisCheckShellSchema = ruleShellBaseSchema.extend({
    kind: z.literal('philosophical_axes')
});
export const characterTruthCheckShellSchema = ruleShellBaseSchema.extend({
    kind: z.literal('character_truth')
});
export const visualGrammarCheckShellSchema = ruleShellBaseSchema.extend({
    kind: z.literal('visual_grammar')
});
export const driftRiskShellSchema = z.object({
    kind: z.literal('drift_risk'),
    riskTerms: z.array(z.string().min(1)).default([]),
    hardBlockTerms: z.array(z.string().min(1)).default([]),
    metadata: boundaryMetadataSchema
});
export const canonValidationInputSchema = z.object({
    requestCode: z.string().min(1),
    queryMode: z.enum(['disabled', 'advisory', 'blocking']).default('blocking'),
    compiledPromptPacket: packetRefSchema,
    compiledPrompt: compileOutputSchema,
    ontology: ontologyCheckShellSchema,
    invariants: invariantCheckShellSchema,
    philosophicalAxes: philosophicalAxisCheckShellSchema,
    characterTruth: characterTruthCheckShellSchema,
    visualGrammar: visualGrammarCheckShellSchema,
    driftRisk: driftRiskShellSchema,
    metadata: boundaryMetadataSchema
});
export const canonValidationRequestSchema = z.object({
    promptPackCode: z.string().min(1),
    queryMode: z.enum(['disabled', 'advisory', 'blocking']).default('blocking'),
    input: canonValidationInputSchema.optional()
});
export const validationPassResultSchema = z.object({
    pass: z.enum([
        'ontology',
        'invariants',
        'philosophical_axes',
        'character_truth',
        'visual_grammar',
        'drift_risk'
    ]),
    passed: z.boolean(),
    score: z.coerce.number().min(0).max(1),
    metadata: boundaryMetadataSchema
});
export const canonValidationResultSchema = z.object({
    requestCode: z.string().min(1),
    status: boundaryStatusSchema,
    decision: validationDecisionSchema,
    passResults: z.array(validationPassResultSchema).length(6),
    warnings: z.array(warningItemSchema).default([]),
    violations: z.array(violationItemSchema).default([]),
    summary: z.object({
        totalPasses: z.coerce.number().int().nonnegative(),
        passedChecks: z.coerce.number().int().nonnegative(),
        warningCount: z.coerce.number().int().nonnegative(),
        violationCount: z.coerce.number().int().nonnegative()
    }),
    metadata: boundaryMetadataSchema
});
//# sourceMappingURL=index.js.map