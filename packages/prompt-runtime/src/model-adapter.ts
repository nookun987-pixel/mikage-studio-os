/**
 * @package @mikage/prompt-runtime
 * @wave Prompt Runtime Engine
 *
 * model-adapter.ts
 */

export interface ModelAdapter {
  name: string
  generate(prompt: string, parameters?: Record<string, unknown>): Promise<string>
}

export class DefaultModelAdapter implements ModelAdapter {
  name = "default"

  async generate(prompt: string, parameters?: Record<string, unknown>): Promise<string> {
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const prefix = parameters?.prefix as string || "Generated:"
    return `${prefix} ${prompt}`
  }
}

export class MockModelAdapter implements ModelAdapter {
  constructor(public name: string) {}

  async generate(prompt: string, parameters?: Record<string, unknown>): Promise<string> {
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const suffix = parameters?.suffix as string || "[mock]"
    return `${prompt} ${suffix}`
  }
}
