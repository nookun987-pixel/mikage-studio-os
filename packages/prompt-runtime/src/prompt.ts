/**
 * @package @mikage/prompt-runtime
 * @wave Prompt Runtime Engine
 *
 * prompt.ts
 */

export interface PromptInput {
  id: string
  text: string
  model?: string
  parameters?: Record<string, unknown>
}

export interface PromptOutput {
  promptId: string
  output: string
  timestamp: number
}

export function createPromptInput(params: {
  id: string
  text: string
  model?: string
  parameters?: Record<string, unknown>
}): PromptInput {
  return {
    id: params.id,
    text: params.text,
    model: params.model,
    parameters: params.parameters
  }
}

export function createPromptOutput(params: {
  promptId: string
  output: string
}): PromptOutput {
  return {
    promptId: params.promptId,
    output: params.output,
    timestamp: Date.now()
  }
}

export function generatePromptId(): string {
  return `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
