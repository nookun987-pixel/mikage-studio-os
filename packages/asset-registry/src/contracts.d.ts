/**
 * @package @mikage/asset-registry
 * @wave 14
 *
 * contracts.ts
 */
export interface AssetRecord {
    assetId: string;
    assetType: string;
    providerId: string;
    modelId: string;
    sceneId?: string;
    canonId?: string;
    canonVersion?: string;
    canonVersionId?: string;
    lineageId: string;
    generationTimestamp: string;
    metadata: AssetMetadata;
}
export interface AssetMetadata {
    mimeType: string;
    width?: number;
    height?: number;
    durationMs?: number;
    fileSizeBytes?: number;
    storageUri: string;
    checksum?: string;
    format: string;
    qualityMetrics?: Record<string, number>;
    evaluation?: {
        finalScore: number;
        scores: Array<{
            category: string;
            score: number;
            maxScore: number;
            weight: number;
            description: string;
        }>;
        warnings: Array<{
            code: string;
            message: string;
            suggestion?: string;
            category: string;
        }>;
        flags: Array<{
            type: "error" | "warning" | "info";
            code: string;
            message: string;
            severity: number;
            category: string;
        }>;
        evaluatedAt: string;
    };
    tags: string[];
    categories: string[];
    customFields?: Record<string, unknown>;
}
export interface AssetQuery {
    assetType?: string;
    providerId?: string;
    modelId?: string;
    sceneId?: string;
    canonId?: string;
    canonVersion?: string;
    lineageId?: string;
    mimeType?: string;
    tags?: string[];
    categories?: string[];
    generatedAfter?: string;
    generatedBefore?: string;
    minEvaluationScore?: number;
    maxEvaluationScore?: number;
    hasWarnings?: boolean;
    hasErrors?: boolean;
    limit?: number;
    offset?: number;
    sortBy?: "generationTimestamp" | "evaluationScore" | "assetType";
    sortOrder?: "asc" | "desc";
}
export interface AssetRegistryResult {
    assets: AssetRecord[];
    totalCount: number;
    hasMore: boolean;
    query: AssetQuery;
}
export interface AssetRegistry {
    registerAsset(record: AssetRecord): Promise<void>;
    getAsset(assetId: string): Promise<AssetRecord | null>;
    listAssets(query: AssetQuery): Promise<AssetRegistryResult>;
    listAssetsByScene(sceneId: string, query?: Partial<AssetQuery>): Promise<AssetRegistryResult>;
    listAssetsByCanon(canonId: string, query?: Partial<AssetQuery>): Promise<AssetRegistryResult>;
    updateAsset(assetId: string, updates: Partial<AssetRecord>): Promise<AssetRecord | null>;
    deleteAsset(assetId: string): Promise<boolean>;
    searchAssets(searchTerm: string, query?: Partial<AssetQuery>): Promise<AssetRegistryResult>;
    getAssetStatistics(query?: AssetQuery): Promise<AssetStatistics>;
}
export interface AssetStatistics {
    totalAssets: number;
    assetsByType: Record<string, number>;
    assetsByProvider: Record<string, number>;
    assetsByCanon: Record<string, number>;
    averageEvaluationScore: number;
    assetsWithWarnings: number;
    assetsWithErrors: number;
    generationTimeline: Array<{
        date: string;
        count: number;
    }>;
}
export interface CreateAssetRecordParams {
    assetId: string;
    assetType: string;
    providerId: string;
    modelId: string;
    sceneId?: string;
    canonId?: string;
    canonVersion?: string;
    canonVersionId?: string;
    lineageId: string;
    generationTimestamp: string;
    metadata: AssetMetadata;
}
//# sourceMappingURL=contracts.d.ts.map