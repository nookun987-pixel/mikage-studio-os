/**
 * @package @mikage/scene-composition
 * @wave Scene Composition Engine
 *
 * scene.ts
 */

export interface Scene {
  id: string
  name: string
  shots: string[]
}

export interface SceneMetadata {
  description?: string
  tags?: string[]
  duration?: number
  createdAt?: number
  updatedAt?: number
}

export function createScene(params: {
  id: string
  name: string
  shots?: string[]
}): Scene {
  return {
    id: params.id,
    name: params.name,
    shots: params.shots || []
  }
}

export function generateSceneId(): string {
  return `scene_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
