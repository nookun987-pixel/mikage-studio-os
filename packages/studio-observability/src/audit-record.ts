/**
 * @package @mikage/studio-observability
 * @wave Observability and Audit System
 *
 * audit-record.ts
 */

export interface AuditRecord {
  id: string
  entityId: string
  action: string
  timestamp: number
}

export interface AuditMetadata {
  userId?: string
  role?: string
  ipAddress?: string
  userAgent?: string
  previousState?: Record<string, unknown>
  newState?: Record<string, unknown>
  reason?: string
  result?: "success" | "failure" | "partial"
  duration?: number
  tags?: string[]
}

export function createAuditRecord(params: {
  id: string
  entityId: string
  action: string
}): AuditRecord {
  return {
    id: params.id,
    entityId: params.entityId,
    action: params.action,
    timestamp: Date.now()
  }
}

export function generateAuditId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
