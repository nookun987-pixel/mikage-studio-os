/**
 * @package @mikage/generation-evaluator
 * @wave 13
 *
 * evaluation-engine.ts
 */
import type { EvaluationEngine, GenerationEvaluation, EvaluationResult, EvaluationRule, EvaluationContext, EvaluationScore } from "./contracts.js";
export declare class DefaultEvaluationEngine implements EvaluationEngine {
    private readonly rules;
    private readonly enabledRules;
    constructor();
    evaluateGeneration(context: EvaluationContext): Promise<GenerationEvaluation>;
    aggregateScores(results: EvaluationResult[]): EvaluationScore[];
    computeFinalScore(scores: EvaluationScore[]): number;
    getAvailableRules(): EvaluationRule[];
    enableRule(ruleId: string): void;
    disableRule(ruleId: string): void;
    private initializeDefaultRules;
    private getApplicableRules;
    private getRuleCategory;
    private getRuleWeight;
    private getCategoryDescription;
}
//# sourceMappingURL=evaluation-engine.d.ts.map