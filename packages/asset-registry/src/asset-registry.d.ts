/**
 * @package @mikage/asset-registry
 * @wave 14
 *
 * asset-registry.ts
 */
import type { AssetRegistry, AssetRecord, AssetQuery, AssetRegistryResult, AssetStatistics } from "./contracts.js";
export declare class DefaultAssetRegistry implements AssetRegistry {
    private readonly assets;
    registerAsset(record: AssetRecord): Promise<void>;
    getAsset(assetId: string): Promise<AssetRecord | null>;
    listAssets(query: AssetQuery): Promise<AssetRegistryResult>;
    listAssetsByScene(sceneId: string, query?: Partial<AssetQuery>): Promise<AssetRegistryResult>;
    listAssetsByCanon(canonId: string, query?: Partial<AssetQuery>): Promise<AssetRegistryResult>;
    updateAsset(assetId: string, updates: Partial<AssetRecord>): Promise<AssetRecord | null>;
    deleteAsset(assetId: string): Promise<boolean>;
    searchAssets(searchTerm: string, query?: Partial<AssetQuery>): Promise<AssetRegistryResult>;
    getAssetStatistics(query?: AssetQuery): Promise<AssetStatistics>;
    private applyFilters;
    private applySorting;
    private applyPagination;
    private countTotalAssets;
    private checkHasMore;
}
//# sourceMappingURL=asset-registry.d.ts.map