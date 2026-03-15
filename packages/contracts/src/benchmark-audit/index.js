import { z } from 'zod';
import { boundaryMetadataSchema, boundaryStatusSchema, packetRefSchema } from '../core/index.js';
import { productionPackageResultSchema } from '../production/index.js';
export const benchmarkSetReferenceShellSchema = z.object({
    setCode: z.string().min(1),
    tier: z.enum(['gold', 'silver', 'red']),
    packetRef: packetRefSchema.optional(),
    metadata: boundaryMetadataSchema
});
const benchmarkComparisonShellBaseSchema = z.object({
    referenceTerms: z.array(z.string().min(1)).default([]),
    blockedTerms: z.array(z.string().min(1)).default([]),
    metadata: boundaryMetadataSchema
});
export const goldBenchmarkShellSchema = benchmarkComparisonShellBaseSchema.extend({
    tier: z.literal('gold')
});
export const silverBenchmarkShellSchema = benchmarkComparisonShellBaseSchema.extend({
    tier: z.literal('silver')
});
export const redBenchmarkShellSchema = benchmarkComparisonShellBaseSchema.extend({
    tier: z.literal('red')
});
export const similarityScoreShellSchema = z.object({
    label: z.enum(['gold_similarity', 'silver_similarity']),
    score: z.coerce.number().min(0).max(1),
    matchedTerms: z.array(z.string().min(1)).default([]),
    missingTerms: z.array(z.string().min(1)).default([])
});
export const driftScoreShellSchema = z.object({
    score: z.coerce.number().min(0).max(1),
    driftTerms: z.array(z.string().min(1)).default([])
});
export const riskScoreShellSchema = z.object({
    score: z.coerce.number().min(0).max(1),
    riskLevel: z.enum(['low', 'medium', 'high'])
});
export const benchmarkFlagShellSchema = z.object({
    code: z.string().min(1),
    severity: z.enum(['info', 'warning', 'blocker']),
    message: z.string().min(1),
    metadata: boundaryMetadataSchema
});
export const benchmarkFindingShellSchema = z.object({
    pass: z.enum([
        'benchmark_set_resolution',
        'gold_comparison',
        'silver_comparison',
        'red_flag_scan',
        'drift_score',
        'risk_score',
        'final_audit_decision'
    ]),
    summary: z.string().min(1),
    metadata: boundaryMetadataSchema
});
export const benchmarkDecisionShellSchema = z.object({
    decision: z.enum(['approved', 'review', 'rejected']),
    accepted: z.boolean(),
    reasons: z.array(z.string().min(1)).default([])
});
export const benchmarkAuditInputSchema = z.object({
    requestCode: z.string().min(1),
    packageReference: z.object({
        packetRef: packetRefSchema,
        productionPackage: productionPackageResultSchema
    }),
    benchmarkSets: z.array(benchmarkSetReferenceShellSchema).min(1),
    goldBenchmark: goldBenchmarkShellSchema,
    silverBenchmark: silverBenchmarkShellSchema,
    redBenchmark: redBenchmarkShellSchema,
    metadata: boundaryMetadataSchema
});
export const benchmarkAuditRequestSchema = z.object({
    requestCode: z.string().min(1),
    input: benchmarkAuditInputSchema
});
export const benchmarkSummaryShellSchema = z.object({
    requestCode: z.string().min(1),
    benchmarkSetCount: z.coerce.number().int().nonnegative(),
    flagCount: z.coerce.number().int().nonnegative(),
    decision: z.enum(['approved', 'review', 'rejected'])
});
export const benchmarkAuditResultSchema = z.object({
    requestCode: z.string().min(1),
    status: boundaryStatusSchema,
    benchmarkReferences: z.array(benchmarkSetReferenceShellSchema).min(1),
    similarityScores: z
        .array(similarityScoreShellSchema)
        .length(2),
    driftScore: driftScoreShellSchema,
    riskScore: riskScoreShellSchema,
    flags: z.array(benchmarkFlagShellSchema).default([]),
    findings: z.array(benchmarkFindingShellSchema).length(7),
    decision: benchmarkDecisionShellSchema,
    summary: benchmarkSummaryShellSchema,
    metadata: boundaryMetadataSchema
});
//# sourceMappingURL=index.js.map