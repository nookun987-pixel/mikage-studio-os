/**
 * @package @mikage/studio-storage
 * @wave Studio Storage Layer
 *
 * asset-storage.ts
 */

export interface AssetRecord {
  id: string
  uri: string
  createdAt: number
}

export interface AssetMetadata {
  type?: string
  size?: number
  format?: string
  checksum?: string
  tags?: string[]
}

export class AssetStorage {
  private assets = new Map<string, AssetRecord>()
  private metadata = new Map<string, AssetMetadata>()

  save(asset: AssetRecord): void {
    this.assets.set(asset.id, asset)
  }

  get(id: string): AssetRecord | undefined {
    return this.assets.get(id)
  }

  getAll(): AssetRecord[] {
    return Array.from(this.assets.values())
  }

  delete(id: string): boolean {
    this.metadata.delete(id)
    return this.assets.delete(id)
  }

  exists(id: string): boolean {
    return this.assets.has(id)
  }

  update(id: string, updates: Partial<AssetRecord>): boolean {
    const existing = this.assets.get(id)
    if (!existing) {
      return false
    }

    const updated: AssetRecord = {
      ...existing,
      ...updates,
      id: existing.id // Preserve ID
    }

    this.assets.set(id, updated)
    return true
  }

  setMetadata(id: string, metadata: AssetMetadata): void {
    this.metadata.set(id, metadata)
  }

  getMetadata(id: string): AssetMetadata | undefined {
    return this.metadata.get(id)
  }

  clear(): void {
    this.assets.clear()
    this.metadata.clear()
  }

  size(): number {
    return this.assets.size
  }
}
