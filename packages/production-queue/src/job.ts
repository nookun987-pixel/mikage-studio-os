/**
 * @package @mikage/production-queue
 * @wave Production Queue + Worker System
 *
 * job.ts
 */

export interface ProductionJob {
  id: string
  type: "generation" | "render" | "export"
  payload: Record<string, unknown>
  createdAt: number
}

export function createProductionJob(params: {
  id: string
  type: "generation" | "render" | "export"
  payload: Record<string, unknown>
}): ProductionJob {
  return {
    id: params.id,
    type: params.type,
    payload: params.payload,
    createdAt: Date.now()
  }
}

export function generateJobId(): string {
  return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
