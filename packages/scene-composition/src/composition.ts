/**
 * @package @mikage/scene-composition
 * @wave Scene Composition Engine
 *
 * composition.ts
 */

import type { Scene } from "./scene.js"
import type { Shot } from "./shot.js"

export interface CompositionResult {
  sceneId: string
  shotCount: number
  assetCount: number
  composed: boolean
}

export class SceneComposer {
  private scenes = new Map<string, Scene>()
  private shots = new Map<string, Shot>()

  createScene(scene: Scene): void {
    this.scenes.set(scene.id, scene)
  }

  getScene(id: string): Scene | undefined {
    return this.scenes.get(id)
  }

  getAllScenes(): Scene[] {
    return Array.from(this.scenes.values())
  }

  updateScene(id: string, updates: Partial<Scene>): boolean {
    const existing = this.scenes.get(id)
    if (!existing) {
      return false
    }

    const updated: Scene = {
      ...existing,
      ...updates,
      id: existing.id // Preserve ID
    }

    this.scenes.set(id, updated)
    return true
  }

  deleteScene(id: string): boolean {
    return this.scenes.delete(id)
  }

  createShot(shot: Shot): void {
    this.shots.set(shot.id, shot)
  }

  getShot(id: string): Shot | undefined {
    return this.shots.get(id)
  }

  getAllShots(): Shot[] {
    return Array.from(this.shots.values())
  }

  addShotToScene(sceneId: string, shotId: string): boolean {
    const scene = this.scenes.get(sceneId)
    if (!scene) {
      return false
    }

    if (!scene.shots.includes(shotId)) {
      scene.shots.push(shotId)
      this.scenes.set(sceneId, scene)
    }

    return true
  }

  removeShotFromScene(sceneId: string, shotId: string): boolean {
    const scene = this.scenes.get(sceneId)
    if (!scene) {
      return false
    }

    const index = scene.shots.indexOf(shotId)
    if (index > -1) {
      scene.shots.splice(index, 1)
      this.scenes.set(sceneId, scene)
      return true
    }

    return false
  }

  composeScene(sceneId: string): CompositionResult {
    const scene = this.scenes.get(sceneId)
    if (!scene) {
      return {
        sceneId,
        shotCount: 0,
        assetCount: 0,
        composed: false
      }
    }

    let assetCount = 0
    for (const shotId of scene.shots) {
      const shot = this.shots.get(shotId)
      if (shot) {
        assetCount += shot.assets.length
      }
    }

    return {
      sceneId,
      shotCount: scene.shots.length,
      assetCount,
      composed: scene.shots.length > 0
    }
  }

  clear(): void {
    this.scenes.clear()
    this.shots.clear()
  }
}
