/**
 * @package @mikage/generation-orchestrator
 * @wave Generation Orchestrator
 *
 * pipeline.ts
 */

export type PipelineStage =
  | "prompt"
  | "generation"
  | "asset"
  | "version"
  | "scene"
  | "output"

export interface Pipeline {
  stages: PipelineStage[]
  currentStage?: PipelineStage
}

export function createPipeline(stages: PipelineStage[]): Pipeline {
  return {
    stages,
    currentStage: stages[0]
  }
}
