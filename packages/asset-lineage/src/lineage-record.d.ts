/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * lineage-record.ts
 */
import type { AssetLineageGraph as IAssetLineageGraph, LineageRecord, LineageEdge } from "./contracts.js";
export declare class AssetLineageGraph implements IAssetLineageGraph {
    private readonly nodes;
    private readonly edges;
    addNode(record: LineageRecord): void;
    addEdge(edge: LineageEdge): void;
    getNode(id: string): LineageRecord | null;
    getEdges(): LineageEdge[];
    getChildren(id: string): LineageEdge[];
    getParents(id: string): LineageEdge[];
    removeNode(id: string): boolean;
    removeEdge(id: string): boolean;
    clear(): void;
}
export declare function createLineageRecord(params: {
    nodeId: string;
    nodeType: "prompt" | "asset" | "version" | "scene" | "output";
    data: Record<string, unknown>;
}): LineageRecord;
export declare function createLineageEdge(params: {
    from: string;
    to: string;
    relation: "derived_from" | "generated_by" | "version_of" | "used_in_scene";
    metadata?: Record<string, unknown>;
}): LineageEdge;
export declare function generateEdgeId(): string;
export declare function generateNodeId(type: string): string;
//# sourceMappingURL=lineage-record.d.ts.map