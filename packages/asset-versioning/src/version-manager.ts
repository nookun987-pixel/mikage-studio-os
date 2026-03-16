/**
 * @package @mikage/asset-versioning
 * @wave Asset Version Control System
 *
 * version-manager.ts
 */

import type { AssetVersion } from "./version.js"
import type { VersionHistory } from "./version-history.js"
import { createVersionHistory, getLatestVersion, getVersionByNumber } from "./version-history.js"
import { incrementVersion } from "./version.js"

export interface VersionManagerResult {
  success: boolean
  versionId?: string
  versionNumber?: number
  error?: string
}

export class VersionManager {
  private histories = new Map<string, VersionHistory>()
  private versionMetadata = new Map<string, Record<string, unknown>>()

  addVersion(version: AssetVersion, metadata?: Record<string, unknown>): VersionManagerResult {
    const history = this.histories.get(version.assetId) ?? createVersionHistory(version.assetId)
    
    // Check if version number already exists
    const existingVersion = getVersionByNumber(history, version.version)
    if (existingVersion) {
      return {
        success: false,
        error: `Version ${version.version} already exists for asset ${version.assetId}`
      }
    }

    history.versions.push(version)
    this.histories.set(version.assetId, history)

    if (metadata) {
      this.versionMetadata.set(version.id, metadata)
    }

    return {
      success: true,
      versionId: version.id,
      versionNumber: version.version
    }
  }

  getHistory(assetId: string): VersionHistory | undefined {
    return this.histories.get(assetId)
  }

  getVersion(assetId: string, version: number): AssetVersion | undefined {
    const history = this.histories.get(assetId)
    if (!history) {
      return undefined
    }

    return getVersionByNumber(history, version)
  }

  getLatestVersion(assetId: string): AssetVersion | undefined {
    const history = this.histories.get(assetId)
    if (!history) {
      return undefined
    }

    return getLatestVersion(history)
  }

  createNextVersion(assetId: string, changeType: "major" | "minor" | "patch" = "patch"): VersionManagerResult {
    const history = this.histories.get(assetId)
    if (!history || history.versions.length === 0) {
      return {
        success: false,
        error: `No existing versions found for asset ${assetId}`
      }
    }

    const latestVersion = getLatestVersion(history)
    if (!latestVersion) {
      return {
        success: false,
        error: `Could not determine latest version for asset ${assetId}`
      }
    }

    const nextVersionNumber = incrementVersion(latestVersion.version, changeType)
    const newVersionId = `version_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const newVersion: AssetVersion = {
      id: newVersionId,
      assetId,
      version: nextVersionNumber,
      createdAt: Date.now()
    }

    return this.addVersion(newVersion)
  }

  getAllHistories(): VersionHistory[] {
    return Array.from(this.histories.values())
  }

  getAssetIds(): string[] {
    return Array.from(this.histories.keys())
  }

  getVersionCount(assetId: string): number {
    const history = this.histories.get(assetId)
    return history ? history.versions.length : 0
  }

  deleteVersion(assetId: string, version: number): boolean {
    const history = this.histories.get(assetId)
    if (!history) {
      return false
    }

    const versionIndex = history.versions.findIndex(v => v.version === version)
    if (versionIndex === -1) {
      return false
    }

    const deletedVersion = history.versions[versionIndex]
    history.versions.splice(versionIndex, 1)
    
    this.versionMetadata.delete(deletedVersion.id)

    // If no more versions, remove the entire history
    if (history.versions.length === 0) {
      this.histories.delete(assetId)
    }

    return true
  }

  deleteAssetHistory(assetId: string): boolean {
    const history = this.histories.get(assetId)
    if (!history) {
      return false
    }

    // Clean up metadata
    for (const version of history.versions) {
      this.versionMetadata.delete(version.id)
    }

    return this.histories.delete(assetId)
  }

  getVersionMetadata(versionId: string): Record<string, unknown> | undefined {
    return this.versionMetadata.get(versionId)
  }

  setVersionMetadata(versionId: string, metadata: Record<string, unknown>): void {
    this.versionMetadata.set(versionId, metadata)
  }

  clear(): void {
    this.histories.clear()
    this.versionMetadata.clear()
  }

  size(): number {
    return this.histories.size
  }

  getTotalVersionCount(): number {
    let total = 0
    for (const history of this.histories.values()) {
      total += history.versions.length
    }
    return total
  }
}
