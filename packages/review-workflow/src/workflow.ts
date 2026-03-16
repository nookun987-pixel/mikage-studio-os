/**
 * @package @mikage/review-workflow
 * @wave Review and Approval Workflow
 *
 * workflow.ts
 */

import type { ReviewItem } from "./review.js"
import type { ReviewDecision } from "./decision.js"

export interface WorkflowResult {
  reviewId: string
  success: boolean
  previousStatus: string
  newStatus: string
}

export class ReviewWorkflow {
  private reviews = new Map<string, ReviewItem>()
  private decisions = new Map<string, ReviewDecision[]>()

  submit(item: ReviewItem): void {
    this.reviews.set(item.id, item)
    this.decisions.set(item.id, [])
  }

  decide(id: string, decision: ReviewDecision): WorkflowResult | null {
    const review = this.reviews.get(id)
    if (!review) {
      return null
    }

    const previousStatus = review.status

    // Store the decision
    const reviewDecisions = this.decisions.get(id) || []
    reviewDecisions.push(decision)
    this.decisions.set(id, reviewDecisions)

    // Update review status
    review.status = decision.decision === "approve" ? "approved" : "rejected"
    this.reviews.set(id, review)

    return {
      reviewId: id,
      success: true,
      previousStatus,
      newStatus: review.status
    }
  }

  get(id: string): ReviewItem | undefined {
    return this.reviews.get(id)
  }

  getAll(): ReviewItem[] {
    return Array.from(this.reviews.values())
  }

  getDecisions(id: string): ReviewDecision[] {
    return this.decisions.get(id) || []
  }

  getByStatus(status: "pending" | "approved" | "rejected"): ReviewItem[] {
    return Array.from(this.reviews.values()).filter(
      review => review.status === status
    )
  }

  getByAssetId(assetId: string): ReviewItem[] {
    return Array.from(this.reviews.values()).filter(
      review => review.assetId === assetId
    )
  }

  updateStatus(id: string, status: "pending" | "approved" | "rejected"): boolean {
    const review = this.reviews.get(id)
    if (!review) {
      return false
    }

    review.status = status
    this.reviews.set(id, review)
    return true
  }

  delete(id: string): boolean {
    this.decisions.delete(id)
    return this.reviews.delete(id)
  }

  clear(): void {
    this.reviews.clear()
    this.decisions.clear()
  }

  size(): number {
    return this.reviews.size
  }

  getPendingCount(): number {
    return this.getByStatus("pending").length
  }

  getApprovedCount(): number {
    return this.getByStatus("approved").length
  }

  getRejectedCount(): number {
    return this.getByStatus("rejected").length
  }
}
