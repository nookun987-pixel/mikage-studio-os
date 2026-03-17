/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * lineage-record.ts
 */
export class AssetLineageGraph {
    nodes = new Map();
    edges = [];
    addNode(record) {
        this.nodes.set(record.nodeId, record);
    }
    addEdge(edge) {
        this.edges.push(edge);
    }
    getNode(id) {
        return this.nodes.get(id) || null;
    }
    getEdges() {
        return [...this.edges];
    }
    getChildren(id) {
        return this.edges.filter(edge => edge.from === id);
    }
    getParents(id) {
        return this.edges.filter(edge => edge.to === id);
    }
    removeNode(id) {
        const removed = this.nodes.delete(id);
        if (removed) {
            const filteredEdges = this.edges.filter(edge => edge.from !== id && edge.to !== id);
            this.edges.length = 0;
            this.edges.push(...filteredEdges);
        }
        return removed;
    }
    removeEdge(id) {
        const index = this.edges.findIndex(edge => edge.id === id);
        if (index >= 0) {
            this.edges.splice(index, 1);
            return true;
        }
        return false;
    }
    clear() {
        this.nodes.clear();
        this.edges.length = 0;
    }
}
export function createLineageRecord(params) {
    const now = new Date().toISOString();
    return {
        nodeId: params.nodeId,
        nodeType: params.nodeType,
        data: params.data,
        createdAt: now,
        updatedAt: now
    };
}
export function createLineageEdge(params) {
    return {
        id: generateEdgeId(),
        from: params.from,
        to: params.to,
        relation: params.relation,
        metadata: params.metadata,
        createdAt: new Date().toISOString()
    };
}
export function generateEdgeId() {
    return `edge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
export function generateNodeId(type) {
    return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
//# sourceMappingURL=lineage-record.js.map