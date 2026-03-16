/**
 * @package @mikage/asset-versioning
 * @wave Asset Version Control System
 *
 * version-history.ts
 */

import type { AssetVersion } from "./version.js"

export interface VersionHistory {
  assetId: string
  versions: AssetVersion[]
}

export interface HistoryMetadata {
  totalVersions: number
  latestVersion: number
  createdAt: number
  lastModified: number
  activeVersion?: number
  tags?: string[]
}

export function createVersionHistory(assetId: string): VersionHistory {
  return {
    assetId,
    versions: []
  }
}

export function getLatestVersion(history: VersionHistory): AssetVersion | undefined {
  if (history.versions.length === 0) {
    return undefined
  }

  return history.versions.reduce((latest, current) => 
    current.version > latest.version ? current : latest
  )
}

export function getVersionByNumber(history: VersionHistory, version: number): AssetVersion | undefined {
  return history.versions.find(v => v.version === version)
}

export function sortVersionsByDate(versions: AssetVersion[]): AssetVersion[] {
  return [...versions].sort((a, b) => a.createdAt - b.createdAt)
}

export function sortVersionsByNumber(versions: AssetVersion[]): AssetVersion[] {
  return [...versions].sort((a, b) => a.version - b.version)
}
