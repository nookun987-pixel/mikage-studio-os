/**
 * @package @mikage/canon-versioning
 * @wave 16
 *
 * canon-registry.ts
 */

import { createHash } from "crypto"
import type {
  CanonRegistry,
  Canon,
  CanonVersion,
  CanonDiff,
  CanonVersionReference,
  CanonFilter,
  CreateCanonParams,
  CreateCanonVersionParams
} from "./contracts.js"
import {
  createCanonVersion,
  validateVersionIntegrity,
  compareVersionNumbers,
  generateVersionId
} from "./canon-version.js"

export class DefaultCanonRegistry implements CanonRegistry {
  private readonly canons = new Map<string, Canon>()
  private readonly versions = new Map<string, CanonVersion>()

  async createCanon(canonData: Omit<Canon, "canonId" | "createdAt" | "updatedAt" | "versions" | "currentVersion" | "isFrozen">): Promise<Canon> {
    const canonId = this.generateCanonId(canonData.name, canonData.creator)
    const now = new Date().toISOString()

    const canon: Canon = {
      ...canonData,
      canonId,
      createdAt: now,
      updatedAt: now,
      versions: [],
      currentVersion: "1.0.0",
      isFrozen: false
    }

    this.canons.set(canonId, canon)
    return canon
  }

  async getCanon(canonId: string): Promise<Canon | null> {
    return this.canons.get(canonId) || null
  }

  async updateCanon(canonId: string, changes: Partial<Canon>): Promise<Canon | null> {
    const existing = this.canons.get(canonId)
    if (!existing) {
      return null
    }

    if (existing.isFrozen) {
      throw new Error(`Canon ${canonId} is frozen and cannot be modified`)
    }

    const updated: Canon = {
      ...existing,
      ...changes,
      canonId: existing.canonId,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
      isFrozen: existing.isFrozen
    }

    this.canons.set(canonId, updated)
    return updated
  }

  async deleteCanon(canonId: string): Promise<boolean> {
    const canon = this.canons.get(canonId)
    if (!canon) {
      return false
    }

    if (canon.versions.length > 0) {
      throw new Error(`Cannot delete canon ${canonId} with existing versions`)
    }

    return this.canons.delete(canonId)
  }

  async listCanons(filter?: CanonFilter): Promise<Canon[]> {
    let canons = Array.from(this.canons.values())

    if (filter) {
      canons = this.applyCanonFilter(canons, filter)
    }

    canons.sort((a, b) => {
      const sortBy = filter?.sortBy || "createdAt"
      const sortOrder = filter?.sortOrder || "desc"

      let comparison = 0

      switch (sortBy) {
        case "createdAt":
          comparison = a.createdAt.localeCompare(b.createdAt)
          break
        case "updatedAt":
          comparison = a.updatedAt.localeCompare(b.updatedAt)
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "currentVersion":
          comparison = compareVersionNumbers(a.currentVersion, b.currentVersion)
          break
        default:
          comparison = a.createdAt.localeCompare(b.createdAt)
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    if (filter?.offset) {
      canons = canons.slice(filter.offset)
    }

    if (filter?.limit) {
      canons = canons.slice(0, filter.limit)
    }

    return canons
  }

  async createCanonVersion(canonId: string, versionData: Omit<CanonVersion, "versionId" | "createdAt" | "checksum" | "childVersionIds">): Promise<CanonVersion> {
    const canon = this.canons.get(canonId)
    if (!canon) {
      throw new Error(`Canon ${canonId} not found`)
    }

    if (canon.isFrozen) {
      throw new Error(`Cannot create version for frozen canon ${canonId}`)
    }

    const version = createCanonVersion({
      ...versionData
    })

    this.versions.set(version.versionId, version)

    canon.versions.push(version)
    canon.currentVersion = version.versionNumber
    canon.updatedAt = new Date().toISOString()

    if (version.parentVersionId) {
      const parentVersion = this.versions.get(version.parentVersionId)
      if (parentVersion) {
        parentVersion.childVersionIds.push(version.versionId)
      }
    }

    return version
  }

  async getCanonVersion(canonId: string, versionId: string): Promise<CanonVersion | null> {
    const version = this.versions.get(versionId)
    if (!version || version.canonId !== canonId) {
      return null
    }
    return version
  }

  async getCanonVersionByNumber(canonId: string, versionNumber: string): Promise<CanonVersion | null> {
    for (const version of this.versions.values()) {
      if (version.canonId === canonId && version.versionNumber === versionNumber) {
        return version
      }
    }
    return null
  }

  async listCanonVersions(canonId: string): Promise<CanonVersion[]> {
    return Array.from(this.versions.values())
      .filter(version => version.canonId === canonId)
      .sort((a, b) => compareVersionNumbers(b.versionNumber, a.versionNumber))
  }

  async updateCanonVersion(canonId: string, versionId: string, changes: Partial<CanonVersion>): Promise<CanonVersion | null> {
    const existing = await this.getCanonVersion(canonId, versionId)
    if (!existing) {
      return null
    }

    if (existing.isFrozen) {
      throw new Error(`Cannot modify frozen version ${versionId}`)
    }

    const updated: CanonVersion = {
      ...existing,
      ...changes,
      versionId: existing.versionId,
      createdAt: existing.createdAt,
      checksum: existing.checksum
    }

    this.versions.set(versionId, updated)
    return updated
  }

  async deleteCanonVersion(canonId: string, versionId: string): Promise<boolean> {
    const version = await this.getCanonVersion(canonId, versionId)
    if (!version) {
      return false
    }

    if (version.isFrozen) {
      throw new Error(`Cannot delete frozen version ${versionId}`)
    }

    if (version.childVersionIds.length > 0) {
      throw new Error(`Cannot delete version ${versionId} with dependent versions`)
    }

    this.versions.delete(versionId)

    const canon = this.canons.get(canonId)
    if (canon) {
      canon.versions = canon.versions.filter(v => v.versionId !== versionId)
      canon.updatedAt = new Date().toISOString()
    }

    return true
  }

  async freezeCanonVersion(canonId: string, versionId: string): Promise<CanonVersion | null> {
    const existing = await this.getCanonVersion(canonId, versionId)
    if (!existing) {
      return null
    }

    if (existing.isFrozen) {
      return existing
    }

    const frozen: CanonVersion = {
      ...existing,
      isFrozen: true
    }

    this.versions.set(versionId, frozen)

    const canon = this.canons.get(canonId)
    if (canon) {
      canon.updatedAt = new Date().toISOString()
    }

    return frozen
  }

  async compareVersions(canonId: string, fromVersion: string, toVersion: string): Promise<CanonDiff> {
    const from = await this.getCanonVersionByNumber(canonId, fromVersion)
    const to = await this.getCanonVersionByNumber(canonId, toVersion)

    if (!from || !to) {
      throw new Error(`Version not found for comparison`)
    }

    const changes = this.calculateVersionDiff(from, to)
    const impactLevel = this.calculateImpactLevel(changes)

    return {
      canonId,
      fromVersion,
      toVersion,
      changes,
      summary: this.generateDiffSummary(changes),
      impactLevel,
      createdAt: new Date().toISOString()
    }
  }

  async resolveVersionReference(reference: CanonVersionReference): Promise<CanonVersion | null> {
    return this.getCanonVersion(reference.canonId, reference.versionId)
  }

  async validateVersionIntegrity(version: CanonVersion): Promise<boolean> {
    const result = validateVersionIntegrity(version)
    return result.isValid
  }

  private generateCanonId(name: string, creator: string): string {
    const hash = createHash("sha256")
    hash.update(`${creator}:${name}:${Date.now()}`)
    return `canon_${hash.digest("hex").slice(0, 16)}`
  }

  private applyCanonFilter(canons: Canon[], filter: CanonFilter): Canon[] {
    return canons.filter(canon => {
      if (filter.creator && canon.creator !== filter.creator) {
        return false
      }

      if (filter.isFrozen !== undefined && canon.isFrozen !== filter.isFrozen) {
        return false
      }

      if (filter.style && canon.metadata.style !== filter.style) {
        return false
      }

      if (filter.genre && canon.metadata.genre !== filter.genre) {
        return false
      }

      if (filter.theme && canon.metadata.theme !== filter.theme) {
        return false
      }

      if (filter.hasVersions !== undefined) {
        const hasVersions = canon.versions.length > 0
        if (hasVersions !== filter.hasVersions) {
          return false
        }
      }

      if (filter.tags && filter.tags.length > 0) {
        const hasAllTags = filter.tags.every(tag => canon.metadata.tags.includes(tag))
        if (!hasAllTags) {
          return false
        }
      }

      if (filter.categories && filter.categories.length > 0) {
        const hasAllCategories = filter.categories.every(category => 
          canon.metadata.categories.includes(category)
        )
        if (!hasAllCategories) {
          return false
        }
      }

      return true
    })
  }

  private calculateVersionDiff(from: CanonVersion, to: CanonVersion): any[] {
    const changes: any[] = []

    for (const change of to.changes) {
      if (!from.changes.some(fc => fc.changeId === change.changeId)) {
        changes.push(change)
      }
    }

    return changes
  }

  private calculateImpactLevel(changes: any[]): "low" | "medium" | "high" | "critical" {
    const hasRemovals = changes.some(c => c.type === "remove")
    const hasRenames = changes.some(c => c.type === "rename")
    
    if (hasRemovals && hasRenames) {
      return "critical"
    }
    
    if (hasRemovals) {
      return "high"
    }
    
    if (hasRenames) {
      return "medium"
    }
    
    return "low"
  }

  private generateDiffSummary(changes: any[]): string {
    const changeTypes = changes.map(c => c.type)
    const typeCounts = changeTypes.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const summaryParts = Object.entries(typeCounts)
      .map(([type, count]) => `${count} ${type}(s)`)
      .join(", ")

    return `${changes.length} changes: ${summaryParts}`
  }
}
