/**
 * @package @mikage/review-workflow
 * @wave Review and Approval Workflow
 *
 * decision.ts
 */

export interface ReviewDecision {
  reviewer: string
  decision: "approve" | "reject"
  comment?: string
}

export interface DecisionMetadata {
  timestamp?: number
  reason?: string
  severity?: "low" | "medium" | "high"
  followUpRequired?: boolean
  nextReviewDate?: number
}

export function createReviewDecision(params: {
  reviewer: string
  decision: "approve" | "reject"
  comment?: string
}): ReviewDecision {
  return {
    reviewer: params.reviewer,
    decision: params.decision,
    comment: params.comment
  }
}

export function isApproved(decision: ReviewDecision): boolean {
  return decision.decision === "approve"
}

export function isRejected(decision: ReviewDecision): boolean {
  return decision.decision === "reject"
}
