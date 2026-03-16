/**
 * @package @mikage/generation-orchestrator
 * @wave Generation Orchestrator
 *
 * orchestrator.ts
 */

import type { GenerationTask } from "./generation-task.js"
import type { PipelineStage } from "./pipeline.js"

export interface GenerationResult {
  taskId: string
  pipeline: PipelineStage[]
  completed: boolean
  error?: string
}

export class GenerationOrchestrator {
  private stages: PipelineStage[] = []

  registerStage(stage: PipelineStage): void {
    if (!this.stages.includes(stage)) {
      this.stages.push(stage)
    }
  }

  getStages(): PipelineStage[] {
    return [...this.stages]
  }

  execute(task: GenerationTask): GenerationResult {
    return {
      taskId: task.id,
      pipeline: this.stages,
      completed: true
    }
  }

  clearStages(): void {
    this.stages.length = 0
  }

  hasStage(stage: PipelineStage): boolean {
    return this.stages.includes(stage)
  }
}
