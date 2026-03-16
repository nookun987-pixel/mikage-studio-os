/**
 * @package @mikage/studio-kernel
 * @wave Studio Kernel
 *
 * studio-system.ts
 */

export interface StudioSystem {
  runtime: unknown
  orchestrator: unknown
  queue: unknown
  storage: unknown
  search: unknown
  review: unknown
  publisher: unknown
}

export interface SystemMetadata {
  name: string
  version: string
  description?: string
  initialized: boolean
  createdAt: number
  lastModified: number
}

export interface SystemStatus {
  healthy: boolean
  components: Record<string, boolean>
  uptime: number
  lastCheck: number
}

export function createStudioSystem(params: {
  runtime: unknown
  orchestrator: unknown
  queue: unknown
  storage: unknown
  search: unknown
  review: unknown
  publisher: unknown
}): StudioSystem {
  return {
    runtime: params.runtime,
    orchestrator: params.orchestrator,
    queue: params.queue,
    storage: params.storage,
    search: params.search,
    review: params.review,
    publisher: params.publisher
  }
}

export function createSystemMetadata(params: {
  name: string
  version: string
  description?: string
}): SystemMetadata {
  const now = Date.now()
  return {
    name: params.name,
    version: params.version,
    description: params.description,
    initialized: false,
    createdAt: now,
    lastModified: now
  }
}
