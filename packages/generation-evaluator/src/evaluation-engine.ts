/**
 * @package @mikage/generation-evaluator
 * @wave 13
 *
 * evaluation-engine.ts
 */

import type {
  EvaluationEngine,
  GenerationEvaluation,
  EvaluationResult,
  EvaluationRule,
  EvaluationContext,
  EvaluationScore,
  EvaluationFlag,
  EvaluationWarning,
  EvaluationNote,
  EvaluationMetric
} from "./contracts.js"
import {
  createEvaluationScore,
  createEvaluationWarning,
  createEvaluationNote
} from "./evaluation-types.js"
import {
  evaluateImageQuality,
  evaluateTextQuality,
  evaluatePromptAlignment,
  evaluateArtifactRisk
} from "./evaluation-rules.js"

export class DefaultEvaluationEngine implements EvaluationEngine {
  private readonly rules = new Map<string, EvaluationRule>()
  private readonly enabledRules = new Set<string>()

  constructor() {
    this.initializeDefaultRules()
  }

  async evaluateGeneration(context: EvaluationContext): Promise<GenerationEvaluation> {
    const results: EvaluationResult[] = []
    const allFlags: EvaluationFlag[] = []
    const allWarnings: EvaluationWarning[] = []
    const allNotes: EvaluationNote[] = []
    const allMetrics: EvaluationMetric[] = []

    const applicableRules = this.getApplicableRules(context.assetType)

    for (const rule of applicableRules) {
      if (!this.enabledRules.has(rule.id)) {
        continue
      }

      let result: EvaluationResult

      switch (rule.id) {
        case "image_quality":
          result = evaluateImageQuality(context)
          break
        case "text_quality":
          result = evaluateTextQuality(context)
          break
        case "prompt_alignment":
          result = evaluatePromptAlignment(context)
          break
        case "artifact_risk":
          result = evaluateArtifactRisk(context)
          break
        default:
          continue
      }

      results.push(result)
      allFlags.push(...result.flags)
      allMetrics.push(...result.metrics)

      for (const flag of result.flags) {
        if (flag.type === "warning") {
          allWarnings.push(createEvaluationWarning({
            code: flag.code,
            message: flag.message,
            category: flag.category
          }))
        }
      }

      for (const note of result.notes) {
        allNotes.push(createEvaluationNote({
          type: "observation",
          content: note,
          category: "general",
          relevance: 0.5
        }))
      }
    }

    const scores = this.aggregateScores(results)
    const finalScore = this.computeFinalScore(scores)

    return {
      assetId: context.assetId,
      assetType: context.assetType,
      providerId: context.providerId,
      modelId: context.modelId,
      prompt: context.prompt,
      evaluationTimestamp: new Date().toISOString(),
      scores,
      metrics: allMetrics,
      finalScore,
      flags: allFlags,
      warnings: allWarnings,
      notes: allNotes,
      evaluationContext: context
    }
  }

  aggregateScores(results: EvaluationResult[]): EvaluationScore[] {
    const categoryScores = new Map<string, { total: number; count: number; weight: number }>()

    for (const result of results) {
      const category = this.getRuleCategory(result.ruleId)
      const weight = this.getRuleWeight(result.ruleId)

      if (!categoryScores.has(category)) {
        categoryScores.set(category, { total: 0, count: 0, weight })
      }

      const current = categoryScores.get(category)!
      current.total += result.score
      current.count += 1
    }

    const scores: EvaluationScore[] = []

    for (const [category, data] of categoryScores) {
      const averageScore = data.total / data.count
      scores.push(createEvaluationScore({
        category,
        score: averageScore,
        maxScore: 1.0,
        weight: data.weight,
        description: this.getCategoryDescription(category)
      }))
    }

    return scores.sort((a, b) => b.weight - a.weight)
  }

  computeFinalScore(scores: EvaluationScore[]): number {
    if (scores.length === 0) {
      return 0
    }

    let weightedSum = 0
    let totalWeight = 0

    for (const score of scores) {
      weightedSum += score.score * score.weight
      totalWeight += score.weight
    }

    return totalWeight > 0 ? weightedSum / totalWeight : 0
  }

  getAvailableRules(): EvaluationRule[] {
    return Array.from(this.rules.values())
  }

  enableRule(ruleId: string): void {
    if (this.rules.has(ruleId)) {
      this.enabledRules.add(ruleId)
    }
  }

  disableRule(ruleId: string): void {
    this.enabledRules.delete(ruleId)
  }

  private initializeDefaultRules(): void {
    const defaultRules: EvaluationRule[] = [
      {
        id: "image_quality",
        name: "Image Quality Assessment",
        category: "quality",
        enabled: true,
        weight: 0.3,
        threshold: 0.6,
        description: "Evaluates visual quality, clarity, composition, and aesthetic appeal of generated images"
      },
      {
        id: "text_quality",
        name: "Text Quality Assessment",
        category: "quality",
        enabled: true,
        weight: 0.3,
        threshold: 0.6,
        description: "Evaluates coherence, grammar, relevance, and style consistency of generated text"
      },
      {
        id: "prompt_alignment",
        name: "Prompt Alignment Assessment",
        category: "alignment",
        enabled: true,
        weight: 0.25,
        threshold: 0.7,
        description: "Measures how well the generated content aligns with the original prompt and constraints"
      },
      {
        id: "artifact_risk",
        name: "Artifact Risk Assessment",
        category: "risk",
        enabled: true,
        weight: 0.15,
        threshold: 0.7,
        description: "Identifies potential generation artifacts, distortions, and unnatural elements"
      }
    ]

    for (const rule of defaultRules) {
      this.rules.set(rule.id, rule)
      if (rule.enabled) {
        this.enabledRules.add(rule.id)
      }
    }
  }

  private getApplicableRules(assetType: string): EvaluationRule[] {
    const allRules = Array.from(this.rules.values())
    
    if (assetType.includes("image") || assetType.includes("cinematic") || assetType.includes("portrait")) {
      return allRules.filter(rule => 
        rule.id === "image_quality" || 
        rule.id === "prompt_alignment" || 
        rule.id === "artifact_risk"
      )
    }

    if (assetType.includes("text") || assetType.includes("video")) {
      return allRules.filter(rule => 
        rule.id === "text_quality" || 
        rule.id === "prompt_alignment" || 
        rule.id === "artifact_risk"
      )
    }

    return allRules.filter(rule => 
      rule.id === "prompt_alignment" || 
      rule.id === "artifact_risk"
    )
  }

  private getRuleCategory(ruleId: string): string {
    const rule = this.rules.get(ruleId)
    return rule?.category || "general"
  }

  private getRuleWeight(ruleId: string): number {
    const rule = this.rules.get(ruleId)
    return rule?.weight || 1.0
  }

  private getCategoryDescription(category: string): string {
    const descriptions: Record<string, string> = {
      quality: "Overall quality assessment of generated content",
      alignment: "Alignment with prompt and constraints",
      risk: "Risk assessment for artifacts and issues",
      general: "General evaluation metrics"
    }
    return descriptions[category] || "Evaluation category"
  }
}
