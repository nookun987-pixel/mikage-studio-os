/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * lineage-record.ts
 */

import type { AssetLineageGraph as IAssetLineageGraph, LineageRecord, LineageEdge } from "./contracts.js"

export class AssetLineageGraph implements IAssetLineageGraph {
  private readonly nodes = new Map<string, LineageRecord>()
  private readonly edges: LineageEdge[] = []

  addNode(record: LineageRecord): void {
    this.nodes.set(record.nodeId, record)
  }

  addEdge(edge: LineageEdge): void {
    this.edges.push(edge)
  }

  getNode(id: string): LineageRecord | null {
    return this.nodes.get(id) || null
  }

  getEdges(): LineageEdge[] {
    return [...this.edges]
  }

  getChildren(id: string): LineageEdge[] {
    return this.edges.filter(edge => edge.from === id)
  }

  getParents(id: string): LineageEdge[] {
    return this.edges.filter(edge => edge.to === id)
  }

  removeNode(id: string): boolean {
    const removed = this.nodes.delete(id)
    if (removed) {
      const filteredEdges = this.edges.filter(edge => edge.from !== id && edge.to !== id)
      this.edges.length = 0
      this.edges.push(...filteredEdges)
    }
    return removed
  }

  removeEdge(id: string): boolean {
    const index = this.edges.findIndex(edge => edge.id === id)
    if (index >= 0) {
      this.edges.splice(index, 1)
      return true
    }
    return false
  }

  clear(): void {
    this.nodes.clear()
    this.edges.length = 0
  }
}

export function createLineageRecord(params: {
  nodeId: string
  nodeType: "prompt" | "asset" | "version" | "scene" | "output"
  data: Record<string, unknown>
}): LineageRecord {
  const now = new Date().toISOString()
  return {
    nodeId: params.nodeId,
    nodeType: params.nodeType,
    data: params.data,
    createdAt: now,
    updatedAt: now
  }
}

export function createLineageEdge(params: {
  from: string
  to: string
  relation: "derived_from" | "generated_by" | "version_of" | "used_in_scene"
  metadata?: Record<string, unknown>
}): LineageEdge {
  return {
    id: generateEdgeId(),
    from: params.from,
    to: params.to,
    relation: params.relation,
    metadata: params.metadata,
    createdAt: new Date().toISOString()
  }
}

export function generateEdgeId(): string {
  return `edge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function generateNodeId(type: string): string {
  return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
