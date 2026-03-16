/**
 * @package @mikage/scene-graph
 * @wave 15
 *
 * scene-node.ts
 */

import type { SceneNode, Vector3 } from "./contracts.js"

export function createSceneNode(params: {
  nodeId: string
  nodeType: "character" | "environment" | "prop" | "light" | "camera"
  name: string
  position?: Vector3
  rotation?: Vector3
  scale?: Vector3
  visible?: boolean
  properties?: Record<string, unknown>
  children?: SceneNode[]
  parentId?: string
}): SceneNode {
  return {
    nodeId: params.nodeId,
    nodeType: params.nodeType,
    name: params.name,
    position: params.position || { x: 0, y: 0, z: 0 },
    rotation: params.rotation || { x: 0, y: 0, z: 0 },
    scale: params.scale || { x: 1, y: 1, z: 1 },
    visible: params.visible !== false,
    properties: params.properties || {},
    children: params.children || [],
    parentId: params.parentId
  }
}

export function createVector3(x: number, y: number, z: number): Vector3 {
  return { x, y, z }
}

export function addVector3(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  }
}

export function subtractVector3(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  }
}

export function multiplyVector3(vector: Vector3, scalar: number): Vector3 {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar
  }
}

export function normalizeVector3(vector: Vector3): Vector3 {
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z)
  if (length === 0) {
    return { x: 0, y: 0, z: 0 }
  }
  return multiplyVector3(vector, 1 / length)
}

export function distanceVector3(a: Vector3, b: Vector3): number {
  const diff = subtractVector3(a, b)
  return Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z)
}

export function lookAt(position: Vector3, target: Vector3): Vector3 {
  const direction = normalizeVector3(subtractVector3(target, position))
  
  const yaw = Math.atan2(direction.x, direction.z)
  const pitch = Math.asin(direction.y)
  
  return {
    x: pitch,
    y: yaw,
    z: 0
  }
}

export function addChildNode(parent: SceneNode, child: SceneNode): SceneNode {
  const updatedChild = { ...child, parentId: parent.nodeId }
  return {
    ...parent,
    children: [...parent.children, updatedChild]
  }
}

export function removeChildNode(parent: SceneNode, childNodeId: string): SceneNode {
  return {
    ...parent,
    children: parent.children.filter(child => child.nodeId !== childNodeId)
  }
}

export function findNodeById(root: SceneNode, nodeId: string): SceneNode | null {
  if (root.nodeId === nodeId) {
    return root
  }

  for (const child of root.children) {
    const found = findNodeById(child, nodeId)
    if (found) {
      return found
    }
  }

  return null
}

export function findNodesByType(root: SceneNode, nodeType: SceneNode["nodeType"]): SceneNode[] {
  const nodes: SceneNode[] = []

  if (root.nodeType === nodeType) {
    nodes.push(root)
  }

  for (const child of root.children) {
    nodes.push(...findNodesByType(child, nodeType))
  }

  return nodes
}

export function traverseSceneNode(root: SceneNode, callback: (node: SceneNode) => void): void {
  callback(root)

  for (const child of root.children) {
    traverseSceneNode(child, callback)
  }
}

export function getWorldTransform(node: SceneNode, parentTransform?: {
  position: Vector3
  rotation: Vector3
  scale: Vector3
}): {
  position: Vector3
  rotation: Vector3
  scale: Vector3
} {
  const current = parentTransform || {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
  }

  const worldPosition = addVector3(current.position, node.position)
  const worldRotation = addVector3(current.rotation, node.rotation)
  const worldScale = {
    x: current.scale.x * node.scale.x,
    y: current.scale.y * node.scale.y,
    z: current.scale.z * node.scale.z
  }

  return {
    position: worldPosition,
    rotation: worldRotation,
    scale: worldScale
  }
}

export function validateSceneNode(node: SceneNode): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!node.nodeId) {
    errors.push("nodeId is required")
  }

  if (!node.name) {
    errors.push("name is required")
  }

  if (!["character", "environment", "prop", "light", "camera"].includes(node.nodeType)) {
    errors.push("nodeType must be one of: character, environment, prop, light, camera")
  }

  if (typeof node.visible !== "boolean") {
    errors.push("visible must be a boolean")
  }

  if (node.children.length > 0) {
    for (const child of node.children) {
      const childValidation = validateSceneNode(child)
      if (!childValidation.isValid) {
        errors.push(...childValidation.errors.map(err => `Child ${child.nodeId}: ${err}`))
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
