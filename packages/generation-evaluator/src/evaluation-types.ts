/**
 * @package @mikage/generation-evaluator
 * @wave 13
 *
 * evaluation-types.ts
 */

import type {
  EvaluationScore,
  EvaluationMetric,
  EvaluationFlag,
  EvaluationWarning,
  EvaluationNote,
  EvaluationResult,
  ImageQualityEvaluation,
  TextQualityEvaluation,
  PromptAlignmentEvaluation
} from "./contracts.js"

export function createEvaluationScore(params: {
  category: string
  score: number
  maxScore: number
  weight: number
  description: string
}): EvaluationScore {
  return {
    category: params.category,
    score: params.score,
    maxScore: params.maxScore,
    weight: params.weight,
    description: params.description
  }
}

export function createEvaluationMetric(params: {
  name: string
  value: number | string | boolean
  unit?: string
  description: string
}): EvaluationMetric {
  return {
    name: params.name,
    value: params.value,
    unit: params.unit,
    description: params.description
  }
}

export function createEvaluationFlag(params: {
  type: "error" | "warning" | "info"
  code: string
  message: string
  severity: number
  category: string
}): EvaluationFlag {
  return {
    type: params.type,
    code: params.code,
    message: params.message,
    severity: params.severity,
    category: params.category
  }
}

export function createEvaluationWarning(params: {
  code: string
  message: string
  suggestion?: string
  category: string
}): EvaluationWarning {
  return {
    code: params.code,
    message: params.message,
    suggestion: params.suggestion,
    category: params.category
  }
}

export function createEvaluationNote(params: {
  type: "observation" | "recommendation" | "insight"
  content: string
  category: string
  relevance: number
}): EvaluationNote {
  return {
    type: params.type,
    content: params.content,
    category: params.category,
    relevance: params.relevance
  }
}

export function createEvaluationResult(params: {
  ruleId: string
  ruleName: string
  score: number
  maxScore: number
  passed: boolean
  metrics: EvaluationMetric[]
  flags: EvaluationFlag[]
  notes: string[]
}): EvaluationResult {
  return {
    ruleId: params.ruleId,
    ruleName: params.ruleName,
    score: params.score,
    maxScore: params.maxScore,
    passed: params.passed,
    metrics: params.metrics,
    flags: params.flags,
    notes: params.notes
  }
}

export function createImageQualityEvaluation(params: {
  clarity: number
  composition: number
  colorHarmony: number
  detailPreservation: number
  artifactLevel: number
  aestheticScore: number
}): ImageQualityEvaluation {
  return {
    clarity: params.clarity,
    composition: params.composition,
    colorHarmony: params.colorHarmony,
    detailPreservation: params.detailPreservation,
    artifactLevel: params.artifactLevel,
    aestheticScore: params.aestheticScore
  }
}

export function createTextQualityEvaluation(params: {
  coherence: number
  relevance: number
  creativity: number
  grammar: number
  styleConsistency: number
  length: number
}): TextQualityEvaluation {
  return {
    coherence: params.coherence,
    relevance: params.relevance,
    creativity: params.creativity,
    grammar: params.grammar,
    styleConsistency: params.styleConsistency,
    length: params.length
  }
}

export function createPromptAlignmentEvaluation(params: {
  keywordMatch: number
  semanticSimilarity: number
  constraintCompliance: number
  styleAdherence: number
  objectiveAlignment: number
}): PromptAlignmentEvaluation {
  return {
    keywordMatch: params.keywordMatch,
    semanticSimilarity: params.semanticSimilarity,
    constraintCompliance: params.constraintCompliance,
    styleAdherence: params.styleAdherence,
    objectiveAlignment: params.objectiveAlignment
  }
}

export function calculateImageQualityScore(evaluation: ImageQualityEvaluation): number {
  const weights = {
    clarity: 0.25,
    composition: 0.20,
    colorHarmony: 0.15,
    detailPreservation: 0.20,
    aestheticScore: 0.20
  }

  const artifactPenalty = evaluation.artifactLevel * 0.5

  const weightedScore = 
    evaluation.clarity * weights.clarity +
    evaluation.composition * weights.composition +
    evaluation.colorHarmony * weights.colorHarmony +
    evaluation.detailPreservation * weights.detailPreservation +
    evaluation.aestheticScore * weights.aestheticScore

  return Math.max(0, weightedScore - artifactPenalty)
}

export function calculateTextQualityScore(evaluation: TextQualityEvaluation): number {
  const weights = {
    coherence: 0.30,
    relevance: 0.25,
    creativity: 0.15,
    grammar: 0.20,
    styleConsistency: 0.10
  }

  return (
    evaluation.coherence * weights.coherence +
    evaluation.relevance * weights.relevance +
    evaluation.creativity * weights.creativity +
    evaluation.grammar * weights.grammar +
    evaluation.styleConsistency * weights.styleConsistency
  )
}

export function calculatePromptAlignmentScore(evaluation: PromptAlignmentEvaluation): number {
  const weights = {
    keywordMatch: 0.20,
    semanticSimilarity: 0.30,
    constraintCompliance: 0.25,
    styleAdherence: 0.15,
    objectiveAlignment: 0.10
  }

  return (
    evaluation.keywordMatch * weights.keywordMatch +
    evaluation.semanticSimilarity * weights.semanticSimilarity +
    evaluation.constraintCompliance * weights.constraintCompliance +
    evaluation.styleAdherence * weights.styleAdherence +
    evaluation.objectiveAlignment * weights.objectiveAlignment
  )
}
