/**
 * @package @mikage/studio-observability
 * @wave Observability and Audit System
 *
 * event-log.ts
 */

export interface PipelineEvent {
  id: string
  type: string
  message: string
  createdAt: number
}

export interface EventMetadata {
  severity?: "info" | "warning" | "error" | "critical"
  source?: string
  userId?: string
  sessionId?: string
  correlationId?: string
  tags?: string[]
  data?: Record<string, unknown>
}

export function createPipelineEvent(params: {
  id: string
  type: string
  message: string
}): PipelineEvent {
  return {
    id: params.id,
    type: params.type,
    message: params.message,
    createdAt: Date.now()
  }
}

export function generateEventId(): string {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
