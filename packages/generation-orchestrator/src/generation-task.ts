/**
 * @package @mikage/generation-orchestrator
 * @wave Generation Orchestrator
 *
 * generation-task.ts
 */

export interface GenerationTask {
  id: string
  prompt: string
  model?: string
  parameters?: Record<string, unknown>
}

export function createGenerationTask(params: {
  id: string
  prompt: string
  model?: string
  parameters?: Record<string, unknown>
}): GenerationTask {
  return {
    id: params.id,
    prompt: params.prompt,
    model: params.model,
    parameters: params.parameters
  }
}

export function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
