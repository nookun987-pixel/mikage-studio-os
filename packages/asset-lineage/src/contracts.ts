/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * contracts.ts
 */

export type AssetId = string
export type VersionId = string
export type SceneId = string

export type LineageRelation = 
  | "derived_from"
  | "generated_by"
  | "version_of"
  | "used_in_scene"

export interface LineageEdge {
  id: string
  from: string
  to: string
  relation: LineageRelation
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface LineageRecord {
  nodeId: string
  nodeType: "prompt" | "asset" | "version" | "scene" | "output"
  data: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface LineageGraph {
  nodes: Map<string, LineageRecord>
  edges: LineageEdge[]
}

export interface LineageTrace {
  nodeId: string
  path: LineageEdge[]
  ancestors: LineageRecord[]
  descendants: LineageRecord[]
}

export interface AssetLineageGraph {
  addNode(record: LineageRecord): void
  addEdge(edge: LineageEdge): void
  getNode(id: string): LineageRecord | null
  getEdges(): LineageEdge[]
  getChildren(id: string): LineageEdge[]
  getParents(id: string): LineageEdge[]
  removeNode(id: string): boolean
  removeEdge(id: string): boolean
  clear(): void
}

export interface ILineageService {
  registerNode(record: LineageRecord): void
  link(edge: LineageEdge): void
  traceBack(nodeId: string): LineageTrace
  traceForward(nodeId: string): LineageTrace
  findPath(fromId: string, toId: string): LineageEdge[]
  getRelatedNodes(nodeId: string, relation?: LineageRelation): LineageRecord[]
}
