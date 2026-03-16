/**
 * @package @mikage/production-queue
 * @wave Production Queue + Worker System
 *
 * queue.ts
 */

import type { ProductionJob } from "./job.js"

export class ProductionQueue {
  private jobs: ProductionJob[] = []

  enqueue(job: ProductionJob): void {
    this.jobs.push(job)
  }

  dequeue(): ProductionJob | undefined {
    return this.jobs.shift()
  }

  size(): number {
    return this.jobs.length
  }

  isEmpty(): boolean {
    return this.jobs.length === 0
  }

  peek(): ProductionJob | undefined {
    return this.jobs[0]
  }

  clear(): void {
    this.jobs.length = 0
  }

  getAll(): ProductionJob[] {
    return [...this.jobs]
  }
}
