/**
 * @package @mikage/generation-evaluator
 * @wave 13
 *
 * contracts.ts
 */
export interface GenerationEvaluation {
    assetId: string;
    assetType: string;
    providerId: string;
    modelId: string;
    prompt: string;
    evaluationTimestamp: string;
    scores: EvaluationScore[];
    metrics: EvaluationMetric[];
    finalScore: number;
    flags: EvaluationFlag[];
    warnings: EvaluationWarning[];
    notes: EvaluationNote[];
    evaluationContext: EvaluationContext;
}
export interface EvaluationScore {
    category: string;
    score: number;
    maxScore: number;
    weight: number;
    description: string;
}
export interface EvaluationMetric {
    name: string;
    value: number | string | boolean;
    unit?: string;
    description: string;
}
export interface EvaluationRule {
    id: string;
    name: string;
    category: string;
    enabled: boolean;
    weight: number;
    threshold?: number;
    description: string;
}
export interface EvaluationResult {
    ruleId: string;
    ruleName: string;
    score: number;
    maxScore: number;
    passed: boolean;
    metrics: EvaluationMetric[];
    flags: EvaluationFlag[];
    notes: string[];
}
export interface EvaluationContext {
    assetId: string;
    assetType: string;
    providerId: string;
    modelId: string;
    prompt: string;
    generationParams: Record<string, unknown>;
    referenceInputs: Array<{
        referenceId: string;
        referenceType: string;
        storageUri: string;
        metadata: Record<string, unknown>;
    }>;
    canonConstraints: {
        requiredTags: string[];
        forbiddenTags: string[];
        styleLocks: string[];
    };
    objective: string;
}
export interface EvaluationFlag {
    type: "error" | "warning" | "info";
    code: string;
    message: string;
    severity: number;
    category: string;
}
export interface EvaluationWarning {
    code: string;
    message: string;
    suggestion?: string;
    category: string;
}
export interface EvaluationNote {
    type: "observation" | "recommendation" | "insight";
    content: string;
    category: string;
    relevance: number;
}
export interface EvaluationEngine {
    evaluateGeneration(context: EvaluationContext): Promise<GenerationEvaluation>;
    aggregateScores(results: EvaluationResult[]): EvaluationScore[];
    computeFinalScore(scores: EvaluationScore[]): number;
    getAvailableRules(): EvaluationRule[];
    enableRule(ruleId: string): void;
    disableRule(ruleId: string): void;
}
export interface ImageQualityEvaluation {
    clarity: number;
    composition: number;
    colorHarmony: number;
    detailPreservation: number;
    artifactLevel: number;
    aestheticScore: number;
}
export interface TextQualityEvaluation {
    coherence: number;
    relevance: number;
    creativity: number;
    grammar: number;
    styleConsistency: number;
    length: number;
}
export interface PromptAlignmentEvaluation {
    keywordMatch: number;
    semanticSimilarity: number;
    constraintCompliance: number;
    styleAdherence: number;
    objectiveAlignment: number;
}
//# sourceMappingURL=contracts.d.ts.map