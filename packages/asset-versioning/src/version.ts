/**
 * @package @mikage/asset-versioning
 * @wave Asset Version Control System
 *
 * version.ts
 */

export interface AssetVersion {
  id: string
  assetId: string
  version: number
  createdAt: number
}

export interface VersionMetadata {
  description?: string
  tags?: string[]
  author?: string
  changeType?: "major" | "minor" | "patch"
  checksum?: string
  size?: number
  format?: string
  parentVersionId?: string
  branch?: string
}

export function createAssetVersion(params: {
  id: string
  assetId: string
  version: number
}): AssetVersion {
  return {
    id: params.id,
    assetId: params.assetId,
    version: params.version,
    createdAt: Date.now()
  }
}

export function generateVersionId(): string {
  return `version_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function incrementVersion(currentVersion: number, changeType: "major" | "minor" | "patch" = "patch"): number {
  switch (changeType) {
    case "major":
      return currentVersion + 1
    case "minor":
      return currentVersion + 0.1
    case "patch":
      return currentVersion + 0.01
    default:
      return currentVersion + 0.01
  }
}
