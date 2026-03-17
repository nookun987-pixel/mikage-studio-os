/**
 * @package @mikage/asset-registry
 * @wave 14
 *
 * asset-record.ts
 */
import type { AssetRecord, AssetMetadata, CreateAssetRecordParams } from "./contracts.js";
export declare function createAssetRecord(params: CreateAssetRecordParams): AssetRecord;
export declare function createAssetMetadata(params: {
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
    tags?: string[];
    categories?: string[];
    customFields?: Record<string, unknown>;
}): AssetMetadata;
export declare function validateAssetRecord(record: AssetRecord): {
    isValid: boolean;
    errors: string[];
};
export declare function updateAssetMetadata(existing: AssetMetadata, updates: Partial<AssetMetadata>): AssetMetadata;
export declare function mergeAssetRecords(existing: AssetRecord, updates: Partial<AssetRecord>): AssetRecord;
export declare function extractAssetTags(record: AssetRecord): string[];
export declare function calculateAssetScore(record: AssetRecord): number;
export declare function hasAssetIssues(record: AssetRecord): {
    hasWarnings: boolean;
    hasErrors: boolean;
    issueCount: number;
};
//# sourceMappingURL=asset-record.d.ts.map