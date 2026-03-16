/**
 * @package @mikage/studio-search
 * @wave Studio Search and Index System
 *
 * search-query.ts
 */

import type { IndexRecord } from "./index-record.js"

export interface SearchQuery {
  text?: string
  type?: string
}

export interface SearchOptions {
  limit?: number
  offset?: number
  sortBy?: "relevance" | "date" | "title"
  sortOrder?: "asc" | "desc"
}

export interface SearchFilter {
  tags?: string[]
  dateRange?: {
    from?: number
    to?: number
  }
  metadata?: Record<string, unknown>
}

export interface AdvancedSearchQuery extends SearchQuery {
  filters?: SearchFilter
  options?: SearchOptions
}

export interface SearchResult {
  record: IndexRecord
  score: number
  highlights?: string[]
}

export function createSearchQuery(params: {
  text?: string
  type?: string
}): SearchQuery {
  return {
    text: params.text,
    type: params.type
  }
}

export function createAdvancedSearchQuery(params: {
  text?: string
  type?: string
  filters?: SearchFilter
  options?: SearchOptions
}): AdvancedSearchQuery {
  return {
    text: params.text,
    type: params.type,
    filters: params.filters,
    options: params.options
  }
}
