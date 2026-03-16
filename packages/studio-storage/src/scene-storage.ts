/**
 * @package @mikage/studio-storage
 * @wave Studio Storage Layer
 *
 * scene-storage.ts
 */

export interface SceneRecord {
  id: string
  name: string
}

export interface SceneMetadata {
  description?: string
  duration?: number
  shotCount?: number
  tags?: string[]
  createdAt?: number
  updatedAt?: number
}

export class SceneStorage {
  private scenes = new Map<string, SceneRecord>()
  private metadata = new Map<string, SceneMetadata>()

  save(scene: SceneRecord): void {
    this.scenes.set(scene.id, scene)
  }

  get(id: string): SceneRecord | undefined {
    return this.scenes.get(id)
  }

  getAll(): SceneRecord[] {
    return Array.from(this.scenes.values())
  }

  delete(id: string): boolean {
    this.metadata.delete(id)
    return this.scenes.delete(id)
  }

  exists(id: string): boolean {
    return this.scenes.has(id)
  }

  update(id: string, updates: Partial<SceneRecord>): boolean {
    const existing = this.scenes.get(id)
    if (!existing) {
      return false
    }

    const updated: SceneRecord = {
      ...existing,
      ...updates,
      id: existing.id // Preserve ID
    }

    this.scenes.set(id, updated)
    return true
  }

  setMetadata(id: string, metadata: SceneMetadata): void {
    this.metadata.set(id, metadata)
  }

  getMetadata(id: string): SceneMetadata | undefined {
    return this.metadata.get(id)
  }

  findByName(name: string): SceneRecord[] {
    return Array.from(this.scenes.values()).filter(
      scene => scene.name.toLowerCase().includes(name.toLowerCase())
    )
  }

  clear(): void {
    this.scenes.clear()
    this.metadata.clear()
  }

  size(): number {
    return this.scenes.size
  }
}
