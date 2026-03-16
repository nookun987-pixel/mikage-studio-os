/**
 * @package @mikage/production-queue
 * @wave Production Queue + Worker System
 *
 * worker.ts
 */

import type { ProductionJob } from "./job.js"
import type { ProductionQueue } from "./queue.js"

export class QueueWorker {
  private isRunning = false

  constructor(private queue: ProductionQueue) {}

  async run(handler: (job: ProductionJob) => Promise<void>): Promise<void> {
    if (this.isRunning) {
      throw new Error("Worker is already running")
    }

    this.isRunning = true

    while (!this.queue.isEmpty()) {
      const job = this.queue.dequeue()
      
      if (job) {
        try {
          await handler(job)
        } catch (error) {
          console.error(`Job ${job.id} failed:`, error)
        }
      }
    }

    this.isRunning = false
  }

  stop(): void {
    this.isRunning = false
  }

  isWorkerRunning(): boolean {
    return this.isRunning
  }
}
