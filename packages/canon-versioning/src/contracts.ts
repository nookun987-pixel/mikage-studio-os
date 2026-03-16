/**
 * @package @mikage/canon-versioning
 * @wave 16
 *
 * contracts.ts
 */

export interface Canon {
  canonId: string
  name: string
  description: string
  creator: string
  createdAt: string
  updatedAt: string
  metadata: CanonMetadata
  currentVersion: string
  versions: CanonVersion[]
  isFrozen: boolean
}

export interface CanonMetadata {
  tags: string[]
  categories: string[]
  style: string
  genre?: string
  theme?: string
  period?: string
  culturalContext?: string
  technicalSpecs?: Record<string, unknown>
  customFields?: Record<string, unknown>
}

export interface CanonVersion {
  canonId: string
  versionId: string
  versionNumber: string
  createdAt: string
  author: string
  changes: CanonChange[]
  metadata: CanonVersionMetadata
  isFrozen: boolean
  parentVersionId?: string
  childVersionIds: string[]
  checksum: string
}

export interface CanonVersionMetadata {
  description: string
  tags: string[]
  categories: string[]
  changelog: string
  releaseNotes?: string
  breakingChanges: boolean
  deprecatedFeatures: string[]
  newFeatures: string[]
  customFields?: Record<string, unknown>
}

export interface CanonChange {
  changeId: string
  type: "add" | "remove" | "modify" | "rename" | "reorder"
  target: string
  oldValue?: unknown
  newValue?: unknown
  description: string
  timestamp: string
  author: string
}

export interface CanonDiff {
  canonId: string
  fromVersion: string
  toVersion: string
  changes: CanonChange[]
  summary: string
  impactLevel: "low" | "medium" | "high" | "critical"
  createdAt: string
}

export interface CanonVersionReference {
  canonId: string
  versionId: string
  versionNumber: string
  isFrozen: boolean
  createdAt: string
  checksum: string
}

export interface CanonRegistry {
  createCanon(canonData: Omit<Canon, "canonId" | "createdAt" | "updatedAt" | "versions" | "currentVersion" | "isFrozen">): Promise<Canon>
  getCanon(canonId: string): Promise<Canon | null>
  updateCanon(canonId: string, changes: Partial<Canon>): Promise<Canon | null>
  deleteCanon(canonId: string): Promise<boolean>
  listCanons(filter?: CanonFilter): Promise<Canon[]>
  
  createCanonVersion(canonId: string, versionData: Omit<CanonVersion, "versionId" | "createdAt" | "checksum" | "childVersionIds">): Promise<CanonVersion>
  getCanonVersion(canonId: string, versionId: string): Promise<CanonVersion | null>
  getCanonVersionByNumber(canonId: string, versionNumber: string): Promise<CanonVersion | null>
  listCanonVersions(canonId: string): Promise<CanonVersion[]>
  updateCanonVersion(canonId: string, versionId: string, changes: Partial<CanonVersion>): Promise<CanonVersion | null>
  deleteCanonVersion(canonId: string, versionId: string): Promise<boolean>
  freezeCanonVersion(canonId: string, versionId: string): Promise<CanonVersion | null>
  
  compareVersions(canonId: string, fromVersion: string, toVersion: string): Promise<CanonDiff>
  resolveVersionReference(reference: CanonVersionReference): Promise<CanonVersion | null>
  validateVersionIntegrity(version: CanonVersion): Promise<boolean>
}

export interface CanonFilter {
  creator?: string
  tags?: string[]
  categories?: string[]
  style?: string
  genre?: string
  theme?: string
  isFrozen?: boolean
  hasVersions?: boolean
  limit?: number
  offset?: number
  sortBy?: "createdAt" | "updatedAt" | "name" | "currentVersion"
  sortOrder?: "asc" | "desc"
}

export interface CreateCanonParams {
  name: string
  description: string
  creator: string
  metadata: CanonMetadata
}

export interface CreateCanonVersionParams {
  canonId: string
  versionNumber: string
  author: string
  changes: CanonChange[]
  metadata: CanonVersionMetadata
  parentVersionId?: string
}

export interface CanonVersionManager {
  createVersion(canonId: string, params: CreateCanonVersionParams): Promise<CanonVersion>
  branchVersion(canonId: string, versionId: string, branchName: string): Promise<CanonVersion>
  mergeVersions(canonId: string, fromVersionId: string, toVersionId: string): Promise<CanonVersion>
  rollbackToVersion(canonId: string, versionId: string): Promise<Canon>
  tagVersion(canonId: string, versionId: string, tag: string): Promise<CanonVersion>
}

export interface CanonIntegrityCheck {
  versionId: string
  isValid: boolean
  checksum: string
  expectedChecksum: string
  issues: string[]
  warnings: string[]
}
