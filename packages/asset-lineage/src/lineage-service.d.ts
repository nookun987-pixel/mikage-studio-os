/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * lineage-service.ts
 */
import type { AssetLineageGraph as IAssetLineageGraph, ILineageService, LineageRecord, LineageEdge, LineageTrace, LineageRelation } from "./contracts.js";
export declare class AssetLineageServiceImpl implements ILineageService {
    private graph;
    constructor(graph: IAssetLineageGraph);
    registerNode(record: LineageRecord): void;
    link(edge: LineageEdge): void;
    traceBack(nodeId: string): LineageTrace;
    traceForward(nodeId: string): LineageTrace;
    findPath(fromId: string, toId: string): LineageEdge[];
    getRelatedNodes(nodeId: string, relation?: LineageRelation): LineageRecord[];
    private collectAncestors;
    private collectDescendants;
    private findPathRecursive;
}
//# sourceMappingURL=lineage-service.d.ts.map