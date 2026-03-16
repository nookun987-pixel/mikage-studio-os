/**
 * @package @mikage/scene-graph
 * @wave 15
 *
 * scene-graph.ts
 */

import { createHash } from "crypto"
import type {
  SceneGraph,
  Scene,
  SceneFilter,
  SceneAssetBinding
} from "./contracts.js"
import {
  createSceneNode,
  validateSceneNode
} from "./scene-node.js"

export class DefaultSceneGraph implements SceneGraph {
  private readonly scenes = new Map<string, Scene>()

  async createScene(sceneData: Omit<Scene, "sceneId" | "createdAt" | "updatedAt">): Promise<Scene> {
    const sceneId = this.generateSceneId(sceneData.title, sceneData.metadata)
    const now = new Date().toISOString()

    const scene: Scene = {
      ...sceneData,
      sceneId,
      createdAt: now,
      updatedAt: now
    }

    this.scenes.set(sceneId, scene)
    return scene
  }

  async getScene(sceneId: string): Promise<Scene | null> {
    return this.scenes.get(sceneId) || null
  }

  async updateScene(sceneId: string, changes: Partial<Scene>): Promise<Scene | null> {
    const existing = this.scenes.get(sceneId)
    if (!existing) {
      return null
    }

    const updated: Scene = {
      ...existing,
      ...changes,
      sceneId: existing.sceneId,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    }

    this.scenes.set(sceneId, updated)
    return updated
  }

  async deleteScene(sceneId: string): Promise<boolean> {
    return this.scenes.delete(sceneId)
  }

  async listScenes(filter?: SceneFilter): Promise<Scene[]> {
    let scenes = Array.from(this.scenes.values())

    if (filter) {
      scenes = this.applyFilter(scenes, filter)
    }

    scenes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

    if (filter?.offset) {
      scenes = scenes.slice(filter.offset)
    }

    if (filter?.limit) {
      scenes = scenes.slice(0, filter.limit)
    }

    return scenes
  }

  async resolveSceneAssets(scene: Scene): Promise<SceneAssetBinding[]> {
    const assets: SceneAssetBinding[] = []

    for (const character of scene.characters) {
      if (character.appearance.style) {
        assets.push({
          assetId: `style_${character.characterId}`,
          assetType: "reference",
          bindingType: "character_appearance",
          targetNodeId: character.characterId,
          targetProperty: "style",
          weight: 0.8,
          description: `Style reference for ${character.name}`
        })
      }

      for (const clothing of character.clothing || []) {
        assets.push({
          assetId: `clothing_${character.characterId}_${clothing}`,
          assetType: "reference",
          bindingType: "character_appearance",
          targetNodeId: character.characterId,
          targetProperty: "clothing",
          weight: 0.6,
          description: `Clothing reference for ${character.name}: ${clothing}`
        })
      }
    }

    for (const detail of scene.environment.details) {
      if (detail.type === "prop" || detail.type === "texture") {
        assets.push({
          assetId: `env_${detail.detailId}`,
          assetType: "reference",
          bindingType: "environment_texture",
          targetNodeId: scene.environment.environmentId,
          targetProperty: detail.type,
          weight: 0.7,
          description: `Environment ${detail.type}: ${detail.name}`
        })
      }
    }

    for (const asset of scene.assets) {
      assets.push(asset)
    }

    return assets
  }

  private generateSceneId(title: string, metadata?: { projectId?: string }): string {
    const seed = metadata?.projectId ? `${metadata.projectId}:${title}` : title
    const hash = createHash("sha256").update(seed).digest("hex")
    return `scene_${hash.slice(0, 16)}`
  }

  private applyFilter(scenes: Scene[], filter: SceneFilter): Scene[] {
    return scenes.filter(scene => {
      if (filter.sceneType && scene.sceneType !== filter.sceneType) {
        return false
      }

      if (filter.projectId && scene.metadata.projectId !== filter.projectId) {
        return false
      }

      if (filter.canonId && scene.metadata.canonId !== filter.canonId) {
        return false
      }

      if (filter.style && scene.metadata.style !== filter.style) {
        return false
      }

      if (filter.genre && scene.metadata.genre !== filter.genre) {
        return false
      }

      if (filter.tags && filter.tags.length > 0) {
        const hasAllTags = filter.tags.every(tag => scene.metadata.tags.includes(tag))
        if (!hasAllTags) {
          return false
        }
      }

      if (filter.categories && filter.categories.length > 0) {
        const hasAllCategories = filter.categories.every(category => 
          scene.metadata.categories.includes(category)
        )
        if (!hasAllCategories) {
          return false
        }
      }

      return true
    })
  }
}

export function validateScene(scene: Scene): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!scene.sceneId) {
    errors.push("sceneId is required")
  }

  if (!scene.title) {
    errors.push("title is required")
  }

  if (!scene.description) {
    errors.push("description is required")
  }

  if (!["cinematic", "portrait", "environment", "abstract"].includes(scene.sceneType)) {
    errors.push("sceneType must be one of: cinematic, portrait, environment, abstract")
  }

  if (!scene.environment) {
    errors.push("environment is required")
  } else {
    if (!scene.environment.environmentId) {
      errors.push("environment.environmentId is required")
    }
    if (!scene.environment.name) {
      errors.push("environment.name is required")
    }
  }

  if (!scene.camera) {
    errors.push("camera is required")
  } else {
    if (!scene.camera.cameraId) {
      errors.push("camera.cameraId is required")
    }
    if (!scene.camera.shotType) {
      errors.push("camera.shotType is required")
    }
  }

  if (!scene.lighting) {
    errors.push("lighting is required")
  } else {
    if (!scene.lighting.lightingId) {
      errors.push("lighting.lightingId is required")
    }
  }

  for (const character of scene.characters) {
    if (!character.characterId) {
      errors.push(`character.characterId is required for ${character.name || 'unnamed character'}`)
    }
    if (!character.name) {
      errors.push(`character.name is required for ${character.characterId || 'unnamed character'}`)
    }
    if (!["protagonist", "antagonist", "supporting", "background"].includes(character.role)) {
      errors.push(`character.role must be one of: protagonist, antagonist, supporting, background for ${character.name}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function cloneScene(scene: Scene, newTitle?: string): Scene {
  const now = new Date().toISOString()
  const clonedSceneId = `${scene.sceneId}_clone_${Date.now()}`

  return {
    ...scene,
    sceneId: clonedSceneId,
    title: newTitle || `${scene.title} (Clone)`,
    characters: scene.characters.map(char => ({
      ...char,
      characterId: `${char.characterId}_clone`
    })),
    environment: {
      ...scene.environment,
      environmentId: `${scene.environment.environmentId}_clone`,
      details: scene.environment.details.map(detail => ({
        ...detail,
        detailId: `${detail.detailId}_clone`
      }))
    },
    camera: {
      ...scene.camera,
      cameraId: `${scene.camera.cameraId}_clone`
    },
    lighting: {
      ...scene.lighting,
      lightingId: `${scene.lighting.lightingId}_clone`,
      keyLight: scene.lighting.keyLight ? {
        ...scene.lighting.keyLight,
        lightId: `${scene.lighting.keyLight.lightId}_clone`
      } : undefined,
      fillLight: scene.lighting.fillLight ? {
        ...scene.lighting.fillLight,
        lightId: `${scene.lighting.fillLight.lightId}_clone`
      } : undefined,
      rimLight: scene.lighting.rimLight ? {
        ...scene.lighting.rimLight,
        lightId: `${scene.lighting.rimLight.lightId}_clone`
      } : undefined,
      ambientLight: scene.lighting.ambientLight ? {
        ...scene.lighting.ambientLight,
        lightId: `${scene.lighting.ambientLight.lightId}_clone`
      } : undefined,
      additionalLights: scene.lighting.additionalLights.map(light => ({
        ...light,
        lightId: `${light.lightId}_clone`
      }))
    },
    assets: scene.assets.map(asset => ({
      ...asset,
      assetId: `${asset.assetId}_clone`
    })),
    createdAt: now,
    updatedAt: now
  }
}
