/**
 * @package @mikage/asset-lineage
 * @wave Asset Lineage System
 *
 * index.ts
 */

export type { 
  AssetId, 
  VersionId, 
  SceneId,
  LineageRelation,
  LineageEdge,
  LineageRecord,
  LineageTrace
} from "./contracts.js"

export type { ILineageService } from "./contracts.js"

export { AssetLineageGraph as AssetLineageGraphImpl, createLineageRecord, createLineageEdge, generateEdgeId, generateNodeId } from "./lineage-record.js"

export { AssetLineageServiceImpl } from "./lineage-service.js"
