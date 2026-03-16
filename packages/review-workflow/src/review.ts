/**
 * @package @mikage/review-workflow
 * @wave Review and Approval Workflow
 *
 * review.ts
 */

export interface ReviewItem {
  id: string
  assetId: string
  status: "pending" | "approved" | "rejected"
  createdAt: number
}

export interface ReviewMetadata {
  title?: string
  description?: string
  tags?: string[]
  priority?: "low" | "medium" | "high"
  assignedTo?: string
  dueDate?: number
  updatedAt?: number
}

export function createReviewItem(params: {
  id: string
  assetId: string
  status?: "pending" | "approved" | "rejected"
}): ReviewItem {
  return {
    id: params.id,
    assetId: params.assetId,
    status: params.status || "pending",
    createdAt: Date.now()
  }
}

export function generateReviewId(): string {
  return `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
