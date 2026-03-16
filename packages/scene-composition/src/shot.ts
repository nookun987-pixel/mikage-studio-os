/**
 * @package @mikage/scene-composition
 * @wave Scene Composition Engine
 *
 * shot.ts
 */

export interface Shot {
  id: string
  assets: string[]
  camera?: string
}

export interface ShotMetadata {
  duration?: number
  position?: number
  description?: string
  tags?: string[]
  createdAt?: number
}

export interface CameraSettings {
  position?: { x: number; y: number; z: number }
  rotation?: { x: number; y: number; z: number }
  fov?: number
  zoom?: number
}

export function createShot(params: {
  id: string
  assets?: string[]
  camera?: string
}): Shot {
  return {
    id: params.id,
    assets: params.assets || [],
    camera: params.camera
  }
}

export function generateShotId(): string {
  return `shot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
