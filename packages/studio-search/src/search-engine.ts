/**
 * @package @mikage/studio-search
 * @wave Studio Search and Index System
 *
 * search-engine.ts
 */

import type { IndexRecord } from "./index-record.js"
import type { SearchQuery, SearchOptions, SearchFilter, SearchResult, AdvancedSearchQuery } from "./search-query.js"
import { extractSearchableText } from "./index-record.js"

export interface SearchStats {
  totalRecords: number
  recordsByType: Record<string, number>
  lastIndexUpdate: number
}

export class StudioSearchEngine {
  private records = new Map<string, IndexRecord>()
  private indexMetadata = new Map<string, { indexedAt: number; searchableText: string }>()

  index(record: IndexRecord): void {
    this.records.set(record.id, record)
    this.indexMetadata.set(record.id, {
      indexedAt: Date.now(),
      searchableText: extractSearchableText(record.metadata)
    })
  }

  get(id: string): IndexRecord | undefined {
    return this.records.get(id)
  }

  search(query: SearchQuery): IndexRecord[] {
    const results: IndexRecord[] = []

    for (const record of this.records.values()) {
      if (query.type && record.type !== query.type) {
        continue
      }

      if (query.text) {
        const metadata = this.indexMetadata.get(record.id)
        if (!metadata?.searchableText.includes(query.text.toLowerCase())) {
          continue
        }
      }

      results.push(record)
    }

    return results
  }

  advancedSearch(query: AdvancedSearchQuery): SearchResult[] {
    let results: SearchResult[] = []

    for (const record of this.records.values()) {
      let match = true
      let score = 0

      // Type filter
      if (query.type && record.type !== query.type) {
        match = false
      }

      // Text search
      if (match && query.text) {
        const metadata = this.indexMetadata.get(record.id)
        const searchableText = metadata?.searchableText || ""

        if (searchableText.includes(query.text.toLowerCase())) {
          score += 1
        } else {
          match = false
        }
      }

      // Filters
      if (match && query.filters) {
        const filters = query.filters

        // Tags filter
        if (filters.tags && filters.tags.length > 0) {
          const recordTags = record.metadata?.tags as string[] || []
          const hasMatchingTag = filters.tags.some(tag => 
            recordTags.some(recordTag => recordTag.toLowerCase().includes(tag.toLowerCase()))
          )
          if (!hasMatchingTag) {
            match = false
          } else {
            score += 0.5
          }
        }

        // Date range filter
        if (filters.dateRange) {
          const createdAt = record.metadata?.createdAt as number
          if (createdAt) {
            if (filters.dateRange.from && createdAt < filters.dateRange.from) {
              match = false
            }
            if (filters.dateRange.to && createdAt > filters.dateRange.to) {
              match = false
            }
            if (match) {
              score += 0.3
            }
          }
        }

        // Metadata filter
        if (filters.metadata) {
          for (const [key, value] of Object.entries(filters.metadata)) {
            const recordValue = record.metadata?.[key]
            if (recordValue !== value) {
              match = false
              break
            }
          }
          if (match) {
            score += 0.2
          }
        }
      }

      if (match) {
        results.push({
          record,
          score
        })
      }
    }

    // Sort results
    const options = query.options
    if (options?.sortBy) {
      results.sort((a, b) => {
        let comparison = 0

        switch (options.sortBy) {
          case "relevance":
            comparison = b.score - a.score
            break
          case "date":
            const aDate = a.record.metadata?.createdAt as number || 0
            const bDate = b.record.metadata?.createdAt as number || 0
            comparison = bDate - aDate
            break
          case "title":
            const aTitle = (a.record.metadata?.title as string) || ""
            const bTitle = (b.record.metadata?.title as string) || ""
            comparison = aTitle.localeCompare(bTitle)
            break
        }

        return options.sortOrder === "desc" ? -comparison : comparison
      })
    } else {
      // Default sort by relevance
      results.sort((a, b) => b.score - a.score)
    }

    // Apply limit and offset
    if (options?.offset) {
      results = results.slice(options.offset)
    }
    if (options?.limit) {
      results = results.slice(0, options.limit)
    }

    return results
  }

  getByType(type: string): IndexRecord[] {
    return Array.from(this.records.values()).filter(record => record.type === type)
  }

  getAll(): IndexRecord[] {
    return Array.from(this.records.values())
  }

  update(id: string, updates: Partial<IndexRecord>): boolean {
    const existing = this.records.get(id)
    if (!existing) {
      return false
    }

    const updated: IndexRecord = {
      ...existing,
      ...updates,
      id: existing.id // Preserve ID
    }

    this.records.set(id, updated)
    this.indexMetadata.set(id, {
      indexedAt: Date.now(),
      searchableText: extractSearchableText(updated.metadata)
    })

    return true
  }

  delete(id: string): boolean {
    this.indexMetadata.delete(id)
    return this.records.delete(id)
  }

  clear(): void {
    this.records.clear()
    this.indexMetadata.clear()
  }

  size(): number {
    return this.records.size
  }

  getStats(): SearchStats {
    const recordsByType: Record<string, number> = {}
    let lastIndexUpdate = 0

    for (const record of this.records.values()) {
      recordsByType[record.type] = (recordsByType[record.type] || 0) + 1
    }

    for (const metadata of this.indexMetadata.values()) {
      if (metadata.indexedAt > lastIndexUpdate) {
        lastIndexUpdate = metadata.indexedAt
      }
    }

    return {
      totalRecords: this.records.size,
      recordsByType,
      lastIndexUpdate
    }
  }
}
