/**
 * @package @mikage/studio-search
 * @wave Studio Search and Index System
 *
 * index-record.ts
 */

export interface IndexRecord {
  id: string
  type: "asset" | "scene" | "output" | "version"
  metadata?: Record<string, unknown>
}

export interface SearchableContent {
  title?: string
  description?: string
  tags?: string[]
  content?: string
  createdAt?: number
  updatedAt?: number
}

export interface IndexMetadata {
  indexedAt: number
  lastUpdated: number
  searchableText?: string
  relevanceScore?: number
  priority?: number
}

export function createIndexRecord(params: {
  id: string
  type: "asset" | "scene" | "output" | "version"
  metadata?: Record<string, unknown>
}): IndexRecord {
  return {
    id: params.id,
    type: params.type,
    metadata: params.metadata
  }
}

export function generateIndexId(): string {
  return `index_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function extractSearchableText(metadata?: Record<string, unknown>): string {
  if (!metadata) return ""

  const fields = ["title", "description", "content", "name", "tags"]
  const textParts: string[] = []

  for (const field of fields) {
    const value = metadata[field]
    if (typeof value === "string") {
      textParts.push(value)
    } else if (Array.isArray(value)) {
      textParts.push(...value.filter(item => typeof item === "string"))
    }
  }

  return textParts.join(" ").toLowerCase()
}
