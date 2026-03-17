/**
 * @package @mikage/generation-evaluator
 * @wave 13
 *
 * evaluation-types.ts
 */
export function createEvaluationScore(params) {
    return {
        category: params.category,
        score: params.score,
        maxScore: params.maxScore,
        weight: params.weight,
        description: params.description
    };
}
export function createEvaluationMetric(params) {
    return {
        name: params.name,
        value: params.value,
        unit: params.unit,
        description: params.description
    };
}
export function createEvaluationFlag(params) {
    return {
        type: params.type,
        code: params.code,
        message: params.message,
        severity: params.severity,
        category: params.category
    };
}
export function createEvaluationWarning(params) {
    return {
        code: params.code,
        message: params.message,
        suggestion: params.suggestion,
        category: params.category
    };
}
export function createEvaluationNote(params) {
    return {
        type: params.type,
        content: params.content,
        category: params.category,
        relevance: params.relevance
    };
}
export function createEvaluationResult(params) {
    return {
        ruleId: params.ruleId,
        ruleName: params.ruleName,
        score: params.score,
        maxScore: params.maxScore,
        passed: params.passed,
        metrics: params.metrics,
        flags: params.flags,
        notes: params.notes
    };
}
export function createImageQualityEvaluation(params) {
    return {
        clarity: params.clarity,
        composition: params.composition,
        colorHarmony: params.colorHarmony,
        detailPreservation: params.detailPreservation,
        artifactLevel: params.artifactLevel,
        aestheticScore: params.aestheticScore
    };
}
export function createTextQualityEvaluation(params) {
    return {
        coherence: params.coherence,
        relevance: params.relevance,
        creativity: params.creativity,
        grammar: params.grammar,
        styleConsistency: params.styleConsistency,
        length: params.length
    };
}
export function createPromptAlignmentEvaluation(params) {
    return {
        keywordMatch: params.keywordMatch,
        semanticSimilarity: params.semanticSimilarity,
        constraintCompliance: params.constraintCompliance,
        styleAdherence: params.styleAdherence,
        objectiveAlignment: params.objectiveAlignment
    };
}
export function calculateImageQualityScore(evaluation) {
    const weights = {
        clarity: 0.25,
        composition: 0.20,
        colorHarmony: 0.15,
        detailPreservation: 0.20,
        aestheticScore: 0.20
    };
    const artifactPenalty = evaluation.artifactLevel * 0.5;
    const weightedScore = evaluation.clarity * weights.clarity +
        evaluation.composition * weights.composition +
        evaluation.colorHarmony * weights.colorHarmony +
        evaluation.detailPreservation * weights.detailPreservation +
        evaluation.aestheticScore * weights.aestheticScore;
    return Math.max(0, weightedScore - artifactPenalty);
}
export function calculateTextQualityScore(evaluation) {
    const weights = {
        coherence: 0.30,
        relevance: 0.25,
        creativity: 0.15,
        grammar: 0.20,
        styleConsistency: 0.10
    };
    return (evaluation.coherence * weights.coherence +
        evaluation.relevance * weights.relevance +
        evaluation.creativity * weights.creativity +
        evaluation.grammar * weights.grammar +
        evaluation.styleConsistency * weights.styleConsistency);
}
export function calculatePromptAlignmentScore(evaluation) {
    const weights = {
        keywordMatch: 0.20,
        semanticSimilarity: 0.30,
        constraintCompliance: 0.25,
        styleAdherence: 0.15,
        objectiveAlignment: 0.10
    };
    return (evaluation.keywordMatch * weights.keywordMatch +
        evaluation.semanticSimilarity * weights.semanticSimilarity +
        evaluation.constraintCompliance * weights.constraintCompliance +
        evaluation.styleAdherence * weights.styleAdherence +
        evaluation.objectiveAlignment * weights.objectiveAlignment);
}
//# sourceMappingURL=evaluation-types.js.map