/**
 * @package @mikage/generation-evaluator
 * @wave 13
 *
 * evaluation-rules.ts
 */
import { createEvaluationResult, createEvaluationMetric, createEvaluationFlag, createImageQualityEvaluation, createTextQualityEvaluation, createPromptAlignmentEvaluation, calculateImageQualityScore, calculateTextQualityScore, calculatePromptAlignmentScore } from "./evaluation-types.js";
export function evaluateImageQuality(context) {
    const flags = [];
    const metrics = [];
    const clarity = simulateClarityScore(context);
    const composition = simulateCompositionScore(context);
    const colorHarmony = simulateColorHarmonyScore(context);
    const detailPreservation = simulateDetailPreservationScore(context);
    const artifactLevel = simulateArtifactLevel(context);
    const aestheticScore = simulateAestheticScore(context);
    metrics.push(createEvaluationMetric({
        name: "clarity",
        value: clarity,
        unit: "score",
        description: "Image sharpness and focus quality"
    }), createEvaluationMetric({
        name: "composition",
        value: composition,
        unit: "score",
        description: "Visual composition and framing"
    }), createEvaluationMetric({
        name: "color_harmony",
        value: colorHarmony,
        unit: "score",
        description: "Color balance and harmony"
    }), createEvaluationMetric({
        name: "detail_preservation",
        value: detailPreservation,
        unit: "score",
        description: "Fine detail preservation"
    }), createEvaluationMetric({
        name: "artifact_level",
        value: artifactLevel,
        unit: "score",
        description: "Presence of generation artifacts"
    }), createEvaluationMetric({
        name: "aesthetic_score",
        value: aestheticScore,
        unit: "score",
        description: "Overall aesthetic quality"
    }));
    if (artifactLevel > 0.7) {
        flags.push(createEvaluationFlag({
            type: "warning",
            code: "HIGH_ARTIFACT_LEVEL",
            message: "High level of generation artifacts detected",
            severity: 3,
            category: "quality"
        }));
    }
    if (clarity < 0.5) {
        flags.push(createEvaluationFlag({
            type: "warning",
            code: "LOW_CLARITY",
            message: "Image clarity is below acceptable threshold",
            severity: 2,
            category: "quality"
        }));
    }
    const imageEvaluation = createImageQualityEvaluation({
        clarity,
        composition,
        colorHarmony,
        detailPreservation,
        artifactLevel,
        aestheticScore
    });
    const score = calculateImageQualityScore(imageEvaluation);
    const passed = score >= 0.6;
    return createEvaluationResult({
        ruleId: "image_quality",
        ruleName: "Image Quality Evaluation",
        score,
        maxScore: 1.0,
        passed,
        metrics,
        flags,
        notes: passed ? [] : ["Image quality below acceptable threshold"]
    });
}
export function evaluateTextQuality(context) {
    const flags = [];
    const metrics = [];
    const coherence = simulateCoherenceScore(context);
    const relevance = simulateRelevanceScore(context);
    const creativity = simulateCreativityScore(context);
    const grammar = simulateGrammarScore(context);
    const styleConsistency = simulateStyleConsistencyScore(context);
    const length = simulateLengthScore(context);
    metrics.push(createEvaluationMetric({
        name: "coherence",
        value: coherence,
        unit: "score",
        description: "Text coherence and logical flow"
    }), createEvaluationMetric({
        name: "relevance",
        value: relevance,
        unit: "score",
        description: "Relevance to prompt and context"
    }), createEvaluationMetric({
        name: "creativity",
        value: creativity,
        unit: "score",
        description: "Creative and original content"
    }), createEvaluationMetric({
        name: "grammar",
        value: grammar,
        unit: "score",
        description: "Grammar and syntax correctness"
    }), createEvaluationMetric({
        name: "style_consistency",
        value: styleConsistency,
        unit: "score",
        description: "Consistency with requested style"
    }), createEvaluationMetric({
        name: "length",
        value: length,
        unit: "score",
        description: "Appropriate length for objective"
    }));
    if (grammar < 0.7) {
        flags.push(createEvaluationFlag({
            type: "error",
            code: "POOR_GRAMMAR",
            message: "Significant grammar issues detected",
            severity: 4,
            category: "quality"
        }));
    }
    if (relevance < 0.5) {
        flags.push(createEvaluationFlag({
            type: "warning",
            code: "LOW_RELEVANCE",
            message: "Content not well aligned with prompt",
            severity: 3,
            category: "alignment"
        }));
    }
    const textEvaluation = createTextQualityEvaluation({
        coherence,
        relevance,
        creativity,
        grammar,
        styleConsistency,
        length
    });
    const score = calculateTextQualityScore(textEvaluation);
    const passed = score >= 0.6;
    return createEvaluationResult({
        ruleId: "text_quality",
        ruleName: "Text Quality Evaluation",
        score,
        maxScore: 1.0,
        passed,
        metrics,
        flags,
        notes: passed ? [] : ["Text quality below acceptable threshold"]
    });
}
export function evaluatePromptAlignment(context) {
    const flags = [];
    const metrics = [];
    const keywordMatch = simulateKeywordMatchScore(context);
    const semanticSimilarity = simulateSemanticSimilarityScore(context);
    const constraintCompliance = simulateConstraintComplianceScore(context);
    const styleAdherence = simulateStyleAdherenceScore(context);
    const objectiveAlignment = simulateObjectiveAlignmentScore(context);
    metrics.push(createEvaluationMetric({
        name: "keyword_match",
        value: keywordMatch,
        unit: "score",
        description: "Keyword matching with prompt"
    }), createEvaluationMetric({
        name: "semantic_similarity",
        value: semanticSimilarity,
        unit: "score",
        description: "Semantic similarity to prompt intent"
    }), createEvaluationMetric({
        name: "constraint_compliance",
        value: constraintCompliance,
        unit: "score",
        description: "Compliance with prompt constraints"
    }), createEvaluationMetric({
        name: "style_adherence",
        value: styleAdherence,
        unit: "score",
        description: "Adherence to requested style"
    }), createEvaluationMetric({
        name: "objective_alignment",
        value: objectiveAlignment,
        unit: "score",
        description: "Alignment with generation objective"
    }));
    if (constraintCompliance < 0.5) {
        flags.push(createEvaluationFlag({
            type: "error",
            code: "CONSTRAINT_VIOLATION",
            message: "Significant constraint violations detected",
            severity: 4,
            category: "compliance"
        }));
    }
    if (keywordMatch < 0.3) {
        flags.push(createEvaluationFlag({
            type: "warning",
            code: "POOR_KEYWORD_MATCH",
            message: "Low keyword matching with prompt",
            severity: 2,
            category: "alignment"
        }));
    }
    const alignmentEvaluation = createPromptAlignmentEvaluation({
        keywordMatch,
        semanticSimilarity,
        constraintCompliance,
        styleAdherence,
        objectiveAlignment
    });
    const score = calculatePromptAlignmentScore(alignmentEvaluation);
    const passed = score >= 0.7;
    return createEvaluationResult({
        ruleId: "prompt_alignment",
        ruleName: "Prompt Alignment Evaluation",
        score,
        maxScore: 1.0,
        passed,
        metrics,
        flags,
        notes: passed ? [] : ["Prompt alignment below acceptable threshold"]
    });
}
export function evaluateArtifactRisk(context) {
    const flags = [];
    const metrics = [];
    const artifactScore = simulateArtifactRiskScore(context);
    const distortionLevel = simulateDistortionLevel(context);
    const unnaturalElements = simulateUnnaturalElements(context);
    const coherenceIssues = simulateCoherenceIssues(context);
    metrics.push(createEvaluationMetric({
        name: "artifact_score",
        value: artifactScore,
        unit: "score",
        description: "Overall artifact risk score"
    }), createEvaluationMetric({
        name: "distortion_level",
        value: distortionLevel,
        unit: "score",
        description: "Level of visual distortion"
    }), createEvaluationMetric({
        name: "unnatural_elements",
        value: unnaturalElements,
        unit: "score",
        description: "Presence of unnatural elements"
    }), createEvaluationMetric({
        name: "coherence_issues",
        value: coherenceIssues,
        unit: "score",
        description: "Coherence and consistency issues"
    }));
    if (artifactScore > 0.8) {
        flags.push(createEvaluationFlag({
            type: "error",
            code: "HIGH_ARTIFACT_RISK",
            message: "High risk of generation artifacts",
            severity: 5,
            category: "risk"
        }));
    }
    if (distortionLevel > 0.6) {
        flags.push(createEvaluationFlag({
            type: "warning",
            code: "DISTORTION_DETECTED",
            message: "Significant distortion detected",
            severity: 3,
            category: "risk"
        }));
    }
    const score = 1.0 - artifactScore;
    const passed = score >= 0.7;
    return createEvaluationResult({
        ruleId: "artifact_risk",
        ruleName: "Artifact Risk Evaluation",
        score,
        maxScore: 1.0,
        passed,
        metrics,
        flags,
        notes: passed ? [] : ["High artifact risk detected"]
    });
}
function simulateClarityScore(context) {
    return 0.6 + Math.random() * 0.4;
}
function simulateCompositionScore(context) {
    return 0.5 + Math.random() * 0.5;
}
function simulateColorHarmonyScore(context) {
    return 0.7 + Math.random() * 0.3;
}
function simulateDetailPreservationScore(context) {
    return 0.6 + Math.random() * 0.4;
}
function simulateArtifactLevel(context) {
    return Math.random() * 0.5;
}
function simulateAestheticScore(context) {
    return 0.5 + Math.random() * 0.5;
}
function simulateCoherenceScore(context) {
    return 0.7 + Math.random() * 0.3;
}
function simulateRelevanceScore(context) {
    return 0.6 + Math.random() * 0.4;
}
function simulateCreativityScore(context) {
    return 0.5 + Math.random() * 0.5;
}
function simulateGrammarScore(context) {
    return 0.8 + Math.random() * 0.2;
}
function simulateStyleConsistencyScore(context) {
    return 0.6 + Math.random() * 0.4;
}
function simulateLengthScore(context) {
    return 0.7 + Math.random() * 0.3;
}
function simulateKeywordMatchScore(context) {
    return 0.5 + Math.random() * 0.5;
}
function simulateSemanticSimilarityScore(context) {
    return 0.6 + Math.random() * 0.4;
}
function simulateConstraintComplianceScore(context) {
    return 0.7 + Math.random() * 0.3;
}
function simulateStyleAdherenceScore(context) {
    return 0.6 + Math.random() * 0.4;
}
function simulateObjectiveAlignmentScore(context) {
    return 0.8 + Math.random() * 0.2;
}
function simulateArtifactRiskScore(context) {
    return Math.random() * 0.6;
}
function simulateDistortionLevel(context) {
    return Math.random() * 0.4;
}
function simulateUnnaturalElements(context) {
    return Math.random() * 0.3;
}
function simulateCoherenceIssues(context) {
    return Math.random() * 0.2;
}
//# sourceMappingURL=evaluation-rules.js.map