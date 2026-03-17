/**
 * @package @mikage/generation-evaluator
 * @wave 13
 *
 * evaluation-types.ts
 */
import type { EvaluationScore, EvaluationMetric, EvaluationFlag, EvaluationWarning, EvaluationNote, EvaluationResult, ImageQualityEvaluation, TextQualityEvaluation, PromptAlignmentEvaluation } from "./contracts.js";
export declare function createEvaluationScore(params: {
    category: string;
    score: number;
    maxScore: number;
    weight: number;
    description: string;
}): EvaluationScore;
export declare function createEvaluationMetric(params: {
    name: string;
    value: number | string | boolean;
    unit?: string;
    description: string;
}): EvaluationMetric;
export declare function createEvaluationFlag(params: {
    type: "error" | "warning" | "info";
    code: string;
    message: string;
    severity: number;
    category: string;
}): EvaluationFlag;
export declare function createEvaluationWarning(params: {
    code: string;
    message: string;
    suggestion?: string;
    category: string;
}): EvaluationWarning;
export declare function createEvaluationNote(params: {
    type: "observation" | "recommendation" | "insight";
    content: string;
    category: string;
    relevance: number;
}): EvaluationNote;
export declare function createEvaluationResult(params: {
    ruleId: string;
    ruleName: string;
    score: number;
    maxScore: number;
    passed: boolean;
    metrics: EvaluationMetric[];
    flags: EvaluationFlag[];
    notes: string[];
}): EvaluationResult;
export declare function createImageQualityEvaluation(params: {
    clarity: number;
    composition: number;
    colorHarmony: number;
    detailPreservation: number;
    artifactLevel: number;
    aestheticScore: number;
}): ImageQualityEvaluation;
export declare function createTextQualityEvaluation(params: {
    coherence: number;
    relevance: number;
    creativity: number;
    grammar: number;
    styleConsistency: number;
    length: number;
}): TextQualityEvaluation;
export declare function createPromptAlignmentEvaluation(params: {
    keywordMatch: number;
    semanticSimilarity: number;
    constraintCompliance: number;
    styleAdherence: number;
    objectiveAlignment: number;
}): PromptAlignmentEvaluation;
export declare function calculateImageQualityScore(evaluation: ImageQualityEvaluation): number;
export declare function calculateTextQualityScore(evaluation: TextQualityEvaluation): number;
export declare function calculatePromptAlignmentScore(evaluation: PromptAlignmentEvaluation): number;
//# sourceMappingURL=evaluation-types.d.ts.map