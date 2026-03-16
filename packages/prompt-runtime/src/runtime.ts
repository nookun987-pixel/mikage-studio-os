/**
 * @package @mikage/prompt-runtime
 * @wave Prompt Runtime Engine
 *
 * runtime.ts
 */

import type { PromptInput, PromptOutput } from "./prompt.js"
import type { ModelAdapter } from "./model-adapter.js"
import { DefaultModelAdapter } from "./model-adapter.js"

export class PromptRuntime {
  private adapters = new Map<string, ModelAdapter>()

  constructor() {
    // Register default adapter
    this.registerAdapter(new DefaultModelAdapter())
  }

  registerAdapter(adapter: ModelAdapter): void {
    this.adapters.set(adapter.name, adapter)
  }

  unregisterAdapter(name: string): boolean {
    return this.adapters.delete(name)
  }

  getAdapter(name: string): ModelAdapter | undefined {
    return this.adapters.get(name)
  }

  getAvailableAdapters(): string[] {
    return Array.from(this.adapters.keys())
  }

  async execute(input: PromptInput): Promise<PromptOutput> {
    const adapter = this.adapters.get(input.model ?? "default")

    if (!adapter) {
      throw new Error(`Model adapter not found: ${input.model ?? "default"}`)
    }

    const result = await adapter.generate(input.text, input.parameters)

    return {
      promptId: input.id,
      output: result,
      timestamp: Date.now()
    }
  }

  async executeBatch(inputs: PromptInput[]): Promise<PromptOutput[]> {
    const results: Promise<PromptOutput>[] = []
    
    for (const input of inputs) {
      results.push(this.execute(input))
    }

    return Promise.all(results)
  }
}
