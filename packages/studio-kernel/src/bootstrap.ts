/**
 * @package @mikage/studio-kernel
 * @wave Studio Kernel
 *
 * bootstrap.ts
 */

import { StudioKernel } from "./kernel.js"
import type { StudioSystem } from "./studio-system.js"

export interface BootstrapConfig {
  autoStart?: boolean
  debug?: boolean
  logLevel?: "debug" | "info" | "warn" | "error"
}

export function bootstrapStudio(system: StudioSystem, config?: BootstrapConfig): StudioKernel {
  const kernel = new StudioKernel(system, config)
  
  if (config?.autoStart !== false) {
    kernel.start()
  }
  
  return kernel
}

export function createDefaultStudioSystem(): StudioSystem {
  // This would typically create actual instances of each component
  // For now, we return placeholder objects
  return {
    runtime: null,
    orchestrator: null,
    queue: null,
    storage: null,
    search: null,
    review: null,
    publisher: null
  }
}

export function quickStart(config?: BootstrapConfig): StudioKernel {
  const system = createDefaultStudioSystem()
  return bootstrapStudio(system, config)
}
