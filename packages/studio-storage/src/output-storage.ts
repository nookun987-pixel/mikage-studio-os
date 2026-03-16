/**
 * @package @mikage/studio-storage
 * @wave Studio Storage Layer
 *
 * output-storage.ts
 */

export interface OutputRecord {
  id: string
  uri: string
}

export interface OutputMetadata {
  type?: string
  format?: string
  size?: number
  duration?: number
  resolution?: { width: number; height: number }
  quality?: string
  createdAt?: number
  sourceAssetId?: string
  sourceSceneId?: string
}

export class OutputStorage {
  private outputs = new Map<string, OutputRecord>()
  private metadata = new Map<string, OutputMetadata>()

  save(output: OutputRecord): void {
    this.outputs.set(output.id, output)
  }

  get(id: string): OutputRecord | undefined {
    return this.outputs.get(id)
  }

  getAll(): OutputRecord[] {
    return Array.from(this.outputs.values())
  }

  delete(id: string): boolean {
    this.metadata.delete(id)
    return this.outputs.delete(id)
  }

  exists(id: string): boolean {
    return this.outputs.has(id)
  }

  update(id: string, updates: Partial<OutputRecord>): boolean {
    const existing = this.outputs.get(id)
    if (!existing) {
      return false
    }

    const updated: OutputRecord = {
      ...existing,
      ...updates,
      id: existing.id // Preserve ID
    }

    this.outputs.set(id, updated)
    return true
  }

  setMetadata(id: string, metadata: OutputMetadata): void {
    this.metadata.set(id, metadata)
  }

  getMetadata(id: string): OutputMetadata | undefined {
    return this.metadata.get(id)
  }

  findByAssetId(assetId: string): OutputRecord[] {
    return Array.from(this.outputs.values()).filter(output => {
      const meta = this.metadata.get(output.id)
      return meta?.sourceAssetId === assetId
    })
  }

  findBySceneId(sceneId: string): OutputRecord[] {
    return Array.from(this.outputs.values()).filter(output => {
      const meta = this.metadata.get(output.id)
      return meta?.sourceSceneId === sceneId
    })
  }

  clear(): void {
    this.outputs.clear()
    this.metadata.clear()
  }

  size(): number {
    return this.outputs.size
  }
}
