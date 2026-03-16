/**
 * @package @mikage/studio-observability
 * @wave Observability and Audit System
 *
 * observability.ts
 */

import type { PipelineEvent } from "./event-log.js"
import type { AuditRecord } from "./audit-record.js"

export interface ObservabilityStats {
  totalEvents: number
  totalAudits: number
  errorCount: number
  warningCount: number
  lastEventTime: number
  lastAuditTime: number
}

export class StudioObservability {
  private events = new Map<string, PipelineEvent>()
  private audits = new Map<string, AuditRecord>()
  private eventMetadata = new Map<string, Record<string, unknown>>()
  private auditMetadata = new Map<string, Record<string, unknown>>()

  logEvent(event: PipelineEvent, metadata?: Record<string, unknown>): void {
    this.events.set(event.id, event)
    if (metadata) {
      this.eventMetadata.set(event.id, metadata)
    }
  }

  recordAudit(record: AuditRecord, metadata?: Record<string, unknown>): void {
    this.audits.set(record.id, record)
    if (metadata) {
      this.auditMetadata.set(record.id, metadata)
    }
  }

  getEvent(id: string): PipelineEvent | undefined {
    return this.events.get(id)
  }

  getAudit(id: string): AuditRecord | undefined {
    return this.audits.get(id)
  }

  getEventMetadata(id: string): Record<string, unknown> | undefined {
    return this.eventMetadata.get(id)
  }

  getAuditMetadata(id: string): Record<string, unknown> | undefined {
    return this.auditMetadata.get(id)
  }

  getAllEvents(): PipelineEvent[] {
    return Array.from(this.events.values())
  }

  getAllAudits(): AuditRecord[] {
    return Array.from(this.audits.values())
  }

  getEventsByType(type: string): PipelineEvent[] {
    return Array.from(this.events.values()).filter(
      event => event.type === type
    )
  }

  getAuditsByEntity(entityId: string): AuditRecord[] {
    return Array.from(this.audits.values()).filter(
      audit => audit.entityId === entityId
    )
  }

  getAuditsByAction(action: string): AuditRecord[] {
    return Array.from(this.audits.values()).filter(
      audit => audit.action === action
    )
  }

  getEventsInTimeRange(startTime: number, endTime: number): PipelineEvent[] {
    return Array.from(this.events.values()).filter(
      event => event.createdAt >= startTime && event.createdAt <= endTime
    )
  }

  getAuditsInTimeRange(startTime: number, endTime: number): AuditRecord[] {
    return Array.from(this.audits.values()).filter(
      audit => audit.timestamp >= startTime && audit.timestamp <= endTime
    )
  }

  getStats(): ObservabilityStats {
    const events = Array.from(this.events.values())
    const audits = Array.from(this.audits.values())
    
    const errorCount = events.filter(event => {
      const meta = this.eventMetadata.get(event.id)
      return meta?.severity === "error" || meta?.severity === "critical"
    }).length

    const warningCount = events.filter(event => {
      const meta = this.eventMetadata.get(event.id)
      return meta?.severity === "warning"
    }).length

    const lastEvent = events.sort((a, b) => b.createdAt - a.createdAt)[0]
    const lastAudit = audits.sort((a, b) => b.timestamp - a.timestamp)[0]

    return {
      totalEvents: events.length,
      totalAudits: audits.length,
      errorCount,
      warningCount,
      lastEventTime: lastEvent?.createdAt || 0,
      lastAuditTime: lastAudit?.timestamp || 0
    }
  }

  deleteEvent(id: string): boolean {
    this.eventMetadata.delete(id)
    return this.events.delete(id)
  }

  deleteAudit(id: string): boolean {
    this.auditMetadata.delete(id)
    return this.audits.delete(id)
  }

  clear(): void {
    this.events.clear()
    this.audits.clear()
    this.eventMetadata.clear()
    this.auditMetadata.clear()
  }

  size(): { events: number; audits: number } {
    return {
      events: this.events.size,
      audits: this.audits.size
    }
  }
}
