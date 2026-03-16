/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * lineage-service.ts
 */

import type { 
  AssetLineageGraph as IAssetLineageGraph, 
  ILineageService,
  LineageRecord, 
  LineageEdge, 
  LineageTrace,
  LineageRelation 
} from "./contracts.js"
import { AssetLineageGraph } from "./lineage-record.js"

export class AssetLineageServiceImpl implements ILineageService {
  private graph: IAssetLineageGraph

  constructor(graph: IAssetLineageGraph) {
    this.graph = graph
  }

  registerNode(record: LineageRecord): void {
    this.graph.addNode(record)
  }

  link(edge: LineageEdge): void {
    this.graph.addEdge(edge)
  }

  traceBack(nodeId: string): LineageTrace {
    const ancestors: LineageRecord[] = []
    const visited = new Set<string>()
    const path: LineageEdge[] = []
    
    this.collectAncestors(nodeId, ancestors, visited, path)
    
    return {
      nodeId,
      path,
      ancestors,
      descendants: []
    }
  }

  traceForward(nodeId: string): LineageTrace {
    const descendants: LineageRecord[] = []
    const visited = new Set<string>()
    const path: LineageEdge[] = []
    
    this.collectDescendants(nodeId, descendants, visited, path)
    
    return {
      nodeId,
      path,
      ancestors: [],
      descendants
    }
  }

  findPath(fromId: string, toId: string): LineageEdge[] {
    const visited = new Set<string>()
    const path: LineageEdge[] = []
    
    if (this.findPathRecursive(fromId, toId, visited, path)) {
      return path
    }
    
    return []
  }

  getRelatedNodes(nodeId: string, relation?: LineageRelation): LineageRecord[] {
    const relatedNodes: LineageRecord[] = []
    
    const parents = this.graph.getParents(nodeId)
    const children = this.graph.getChildren(nodeId)
    
    const allRelated = [...parents, ...children]
    
    for (const edge of allRelated) {
      if (!relation || edge.relation === relation) {
        const relatedNodeId = edge.from === nodeId ? edge.to : edge.from
        const node = this.graph.getNode(relatedNodeId)
        if (node) {
          relatedNodes.push(node)
        }
      }
    }
    
    return relatedNodes
  }

  private collectAncestors(
    nodeId: string, 
    ancestors: LineageRecord[], 
    visited: Set<string>, 
    path: LineageEdge[]
  ): void {
    if (visited.has(nodeId)) {
      return
    }
    
    visited.add(nodeId)
    
    const node = this.graph.getNode(nodeId)
    if (node) {
      ancestors.push(node)
    }
    
    const parents = this.graph.getParents(nodeId)
    for (const edge of parents) {
      path.push(edge)
      this.collectAncestors(edge.from, ancestors, visited, path)
      path.pop()
    }
  }

  private collectDescendants(
    nodeId: string, 
    descendants: LineageRecord[], 
    visited: Set<string>, 
    path: LineageEdge[]
  ): void {
    if (visited.has(nodeId)) {
      return
    }
    
    visited.add(nodeId)
    
    const node = this.graph.getNode(nodeId)
    if (node) {
      descendants.push(node)
    }
    
    const children = this.graph.getChildren(nodeId)
    for (const edge of children) {
      path.push(edge)
      this.collectDescendants(edge.to, descendants, visited, path)
      path.pop()
    }
  }

  private findPathRecursive(
    currentId: string, 
    targetId: string, 
    visited: Set<string>, 
    path: LineageEdge[]
  ): boolean {
    if (currentId === targetId) {
      return true
    }
    
    if (visited.has(currentId)) {
      return false
    }
    
    visited.add(currentId)
    
    const children = this.graph.getChildren(currentId)
    for (const edge of children) {
      path.push(edge)
      if (this.findPathRecursive(edge.to, targetId, visited, path)) {
        return true
      }
      path.pop()
    }
    
    return false
  }
}
