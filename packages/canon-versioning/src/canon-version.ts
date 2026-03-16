/**
 * @package @mikage/canon-versioning
 * @wave 16
 *
 * canon-version.ts
 */

import { createHash } from "crypto"
import type {
  Canon,
  CanonVersion,
  CanonChange,
  CanonVersionMetadata,
  CanonVersionReference,
  CreateCanonVersionParams,
  CanonIntegrityCheck
} from "./contracts.js"

export function createCanonVersion(params: CreateCanonVersionParams): CanonVersion {
  const versionId = generateVersionId(params.canonId, params.versionNumber)
  const checksum = calculateVersionChecksum(params)

  return {
    canonId: params.canonId,
    versionId,
    versionNumber: params.versionNumber,
    createdAt: new Date().toISOString(),
    author: params.author,
    changes: params.changes,
    metadata: params.metadata,
    isFrozen: false,
    parentVersionId: params.parentVersionId,
    childVersionIds: [],
    checksum
  }
}

export function createCanonChange(params: {
  type: "add" | "remove" | "modify" | "rename" | "reorder"
  target: string
  oldValue?: unknown
  newValue?: unknown
  description: string
  author: string
}): CanonChange {
  return {
    changeId: generateChangeId(),
    type: params.type,
    target: params.target,
    oldValue: params.oldValue,
    newValue: params.newValue,
    description: params.description,
    timestamp: new Date().toISOString(),
    author: params.author
  }
}

export function createCanonVersionReference(version: CanonVersion): CanonVersionReference {
  return {
    canonId: version.canonId,
    versionId: version.versionId,
    versionNumber: version.versionNumber,
    isFrozen: version.isFrozen,
    createdAt: version.createdAt,
    checksum: version.checksum
  }
}

export function calculateVersionChecksum(params: CreateCanonVersionParams): string {
  const data = {
    canonId: params.canonId,
    versionNumber: params.versionNumber,
    author: params.author,
    changes: params.changes,
    metadata: params.metadata,
    parentVersionId: params.parentVersionId,
    timestamp: new Date().toISOString()
  }

  const hash = createHash("sha256")
  hash.update(JSON.stringify(data, Object.keys(data).sort()))
  return hash.digest("hex")
}

export function validateVersionIntegrity(version: CanonVersion): CanonIntegrityCheck {
  const expectedChecksum = calculateVersionChecksum({
    canonId: version.canonId,
    versionNumber: version.versionNumber,
    author: version.author,
    changes: version.changes,
    metadata: version.metadata,
    parentVersionId: version.parentVersionId
  })

  const isValid = version.checksum === expectedChecksum
  const issues: string[] = []
  const warnings: string[] = []

  if (!isValid) {
    issues.push(`Checksum mismatch: expected ${expectedChecksum}, got ${version.checksum}`)
  }

  if (!version.versionNumber) {
    issues.push("Version number is required")
  }

  if (!version.author) {
    issues.push("Author is required")
  }

  if (!version.changes || version.changes.length === 0) {
    warnings.push("No changes recorded for this version")
  }

  if (version.metadata.breakingChanges && version.changes.length === 0) {
    warnings.push("Breaking changes flagged but no changes recorded")
  }

  return {
    versionId: version.versionId,
    isValid,
    checksum: version.checksum,
    expectedChecksum,
    issues,
    warnings
  }
}

export function compareVersionNumbers(version1: string, version2: string): number {
  const v1Parts = version1.split('.').map(Number)
  const v2Parts = version2.split('.').map(Number)
  
  const maxLength = Math.max(v1Parts.length, v2Parts.length)
  
  for (let i = 0; i < maxLength; i++) {
    const v1Part = v1Parts[i] || 0
    const v2Part = v2Parts[i] || 0
    
    if (v1Part > v2Part) return 1
    if (v1Part < v2Part) return -1
  }
  
  return 0
}

export function incrementVersionNumber(version: string, incrementType: "major" | "minor" | "patch" = "patch"): string {
  const parts = version.split('.').map(Number)
  
  switch (incrementType) {
    case "major":
      parts[0] = (parts[0] || 0) + 1
      parts[1] = 0
      parts[2] = 0
      break
    case "minor":
      parts[1] = (parts[1] || 0) + 1
      parts[2] = 0
      break
    case "patch":
      parts[2] = (parts[2] || 0) + 1
      break
  }
  
  return parts.join('.')
}

export function isVersionCompatible(requiredVersion: string, actualVersion: string): boolean {
  const requiredParts = requiredVersion.split('.').map(Number)
  const actualParts = actualVersion.split('.').map(Number)
  
  for (let i = 0; i < requiredParts.length; i++) {
    const requiredPart = requiredParts[i] || 0
    const actualPart = actualParts[i] || 0
    
    if (actualPart < requiredPart) {
      return false
    }
    
    if (actualPart > requiredPart) {
      return true
    }
  }
  
  return true
}

export function generateVersionId(canonId: string, versionNumber: string): string {
  const hash = createHash("sha256")
  hash.update(`${canonId}:${versionNumber}:${Date.now()}`)
  return `version_${hash.digest("hex").slice(0, 16)}`
}

export function generateChangeId(): string {
  const hash = createHash("sha256")
  hash.update(`change:${Date.now()}:${Math.random()}`)
  return `change_${hash.digest("hex").slice(0, 12)}`
}

export function createVersionMetadata(params: {
  description: string
  tags?: string[]
  categories?: string[]
  changelog?: string
  releaseNotes?: string
  breakingChanges?: boolean
  deprecatedFeatures?: string[]
  newFeatures?: string[]
  customFields?: Record<string, unknown>
}): CanonVersionMetadata {
  return {
    description: params.description,
    tags: params.tags || [],
    categories: params.categories || [],
    changelog: params.changelog || "",
    releaseNotes: params.releaseNotes,
    breakingChanges: params.breakingChanges || false,
    deprecatedFeatures: params.deprecatedFeatures || [],
    newFeatures: params.newFeatures || [],
    customFields: params.customFields
  }
}

export function mergeVersionChanges(baseVersion: CanonVersion, ...versions: CanonVersion[]): CanonChange[] {
  const allChanges: CanonChange[] = [...baseVersion.changes]
  
  for (const version of versions) {
    allChanges.push(...version.changes)
  }
  
  return allChanges.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
}

export function hasBreakingChanges(version: CanonVersion): boolean {
  return version.metadata.breakingChanges || 
    version.changes.some(change => 
      change.type === "remove" || 
      change.type === "rename" ||
      (change.type === "modify" && change.oldValue !== undefined && change.newValue === undefined)
    )
}

export function getChangeImpact(changes: CanonChange[]): "low" | "medium" | "high" | "critical" {
  const hasRemovals = changes.some(c => c.type === "remove")
  const hasRenames = changes.some(c => c.type === "rename")
  const hasModifications = changes.some(c => c.type === "modify")
  
  if (hasRemovals && hasRenames) {
    return "critical"
  }
  
  if (hasRemovals) {
    return "high"
  }
  
  if (hasRenames || hasModifications) {
    return "medium"
  }
  
  return "low"
}
