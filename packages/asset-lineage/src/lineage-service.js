/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * lineage-service.ts
 */
export class AssetLineageServiceImpl {
    graph;
    constructor(graph) {
        this.graph = graph;
    }
    registerNode(record) {
        this.graph.addNode(record);
    }
    link(edge) {
        this.graph.addEdge(edge);
    }
    traceBack(nodeId) {
        const ancestors = [];
        const visited = new Set();
        const path = [];
        this.collectAncestors(nodeId, ancestors, visited, path);
        return {
            nodeId,
            path,
            ancestors,
            descendants: []
        };
    }
    traceForward(nodeId) {
        const descendants = [];
        const visited = new Set();
        const path = [];
        this.collectDescendants(nodeId, descendants, visited, path);
        return {
            nodeId,
            path,
            ancestors: [],
            descendants
        };
    }
    findPath(fromId, toId) {
        const visited = new Set();
        const path = [];
        if (this.findPathRecursive(fromId, toId, visited, path)) {
            return path;
        }
        return [];
    }
    getRelatedNodes(nodeId, relation) {
        const relatedNodes = [];
        const parents = this.graph.getParents(nodeId);
        const children = this.graph.getChildren(nodeId);
        const allRelated = [...parents, ...children];
        for (const edge of allRelated) {
            if (!relation || edge.relation === relation) {
                const relatedNodeId = edge.from === nodeId ? edge.to : edge.from;
                const node = this.graph.getNode(relatedNodeId);
                if (node) {
                    relatedNodes.push(node);
                }
            }
        }
        return relatedNodes;
    }
    collectAncestors(nodeId, ancestors, visited, path) {
        if (visited.has(nodeId)) {
            return;
        }
        visited.add(nodeId);
        const node = this.graph.getNode(nodeId);
        if (node) {
            ancestors.push(node);
        }
        const parents = this.graph.getParents(nodeId);
        for (const edge of parents) {
            path.push(edge);
            this.collectAncestors(edge.from, ancestors, visited, path);
            path.pop();
        }
    }
    collectDescendants(nodeId, descendants, visited, path) {
        if (visited.has(nodeId)) {
            return;
        }
        visited.add(nodeId);
        const node = this.graph.getNode(nodeId);
        if (node) {
            descendants.push(node);
        }
        const children = this.graph.getChildren(nodeId);
        for (const edge of children) {
            path.push(edge);
            this.collectDescendants(edge.to, descendants, visited, path);
            path.pop();
        }
    }
    findPathRecursive(currentId, targetId, visited, path) {
        if (currentId === targetId) {
            return true;
        }
        if (visited.has(currentId)) {
            return false;
        }
        visited.add(currentId);
        const children = this.graph.getChildren(currentId);
        for (const edge of children) {
            path.push(edge);
            if (this.findPathRecursive(edge.to, targetId, visited, path)) {
                return true;
            }
            path.pop();
        }
        return false;
    }
}
//# sourceMappingURL=lineage-service.js.map