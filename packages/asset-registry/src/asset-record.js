/**
 * @package @mikage/asset-registry
 * @wave 14
 *
 * asset-record.ts
 */
export function createAssetRecord(params) {
    return {
        assetId: params.assetId,
        assetType: params.assetType,
        providerId: params.providerId,
        modelId: params.modelId,
        sceneId: params.sceneId,
        canonId: params.canonId,
        canonVersion: params.canonVersion,
        canonVersionId: params.canonVersionId,
        lineageId: params.lineageId,
        generationTimestamp: params.generationTimestamp,
        metadata: params.metadata
    };
}
export function createAssetMetadata(params) {
    return {
        mimeType: params.mimeType,
        width: params.width,
        height: params.height,
        durationMs: params.durationMs,
        fileSizeBytes: params.fileSizeBytes,
        storageUri: params.storageUri,
        checksum: params.checksum,
        format: params.format,
        qualityMetrics: params.qualityMetrics,
        evaluation: params.evaluation,
        tags: params.tags || [],
        categories: params.categories || [],
        customFields: params.customFields
    };
}
export function validateAssetRecord(record) {
    const errors = [];
    if (!record.assetId) {
        errors.push("assetId is required");
    }
    if (!record.assetType) {
        errors.push("assetType is required");
    }
    if (!record.providerId) {
        errors.push("providerId is required");
    }
    if (!record.modelId) {
        errors.push("modelId is required");
    }
    if (!record.lineageId) {
        errors.push("lineageId is required");
    }
    if (!record.generationTimestamp) {
        errors.push("generationTimestamp is required");
    }
    if (!record.metadata) {
        errors.push("metadata is required");
    }
    else {
        if (!record.metadata.mimeType) {
            errors.push("metadata.mimeType is required");
        }
        if (!record.metadata.storageUri) {
            errors.push("metadata.storageUri is required");
        }
        if (!record.metadata.format) {
            errors.push("metadata.format is required");
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
export function updateAssetMetadata(existing, updates) {
    return {
        mimeType: updates.mimeType || existing.mimeType,
        width: updates.width !== undefined ? updates.width : existing.width,
        height: updates.height !== undefined ? updates.height : existing.height,
        durationMs: updates.durationMs !== undefined ? updates.durationMs : existing.durationMs,
        fileSizeBytes: updates.fileSizeBytes !== undefined ? updates.fileSizeBytes : existing.fileSizeBytes,
        storageUri: updates.storageUri || existing.storageUri,
        checksum: updates.checksum !== undefined ? updates.checksum : existing.checksum,
        format: updates.format || existing.format,
        qualityMetrics: updates.qualityMetrics !== undefined ? updates.qualityMetrics : existing.qualityMetrics,
        evaluation: updates.evaluation !== undefined ? updates.evaluation : existing.evaluation,
        tags: updates.tags !== undefined ? updates.tags : existing.tags,
        categories: updates.categories !== undefined ? updates.categories : existing.categories,
        customFields: updates.customFields !== undefined ? updates.customFields : existing.customFields
    };
}
export function mergeAssetRecords(existing, updates) {
    return {
        assetId: updates.assetId || existing.assetId,
        assetType: updates.assetType || existing.assetType,
        providerId: updates.providerId || existing.providerId,
        modelId: updates.modelId || existing.modelId,
        sceneId: updates.sceneId !== undefined ? updates.sceneId : existing.sceneId,
        canonId: updates.canonId !== undefined ? updates.canonId : existing.canonId,
        canonVersion: updates.canonVersion !== undefined ? updates.canonVersion : existing.canonVersion,
        canonVersionId: updates.canonVersionId !== undefined ? updates.canonVersionId : existing.canonVersionId,
        lineageId: updates.lineageId || existing.lineageId,
        generationTimestamp: updates.generationTimestamp || existing.generationTimestamp,
        metadata: updates.metadata ? updateAssetMetadata(existing.metadata, updates.metadata) : existing.metadata
    };
}
export function extractAssetTags(record) {
    const tags = new Set(record.metadata.tags);
    tags.add(record.assetType);
    tags.add(record.providerId);
    tags.add(record.modelId);
    if (record.sceneId) {
        tags.add(`scene:${record.sceneId}`);
    }
    if (record.canonId) {
        tags.add(`canon:${record.canonId}`);
        if (record.canonVersion) {
            tags.add(`canon:${record.canonId}:${record.canonVersion}`);
        }
    }
    if (record.metadata.evaluation) {
        tags.add(`evaluated:${record.metadata.evaluation.evaluatedAt.split('T')[0]}`);
        if (record.metadata.evaluation.finalScore >= 0.8) {
            tags.add('high-quality');
        }
        else if (record.metadata.evaluation.finalScore >= 0.6) {
            tags.add('medium-quality');
        }
        else {
            tags.add('low-quality');
        }
        if (record.metadata.evaluation.warnings.length > 0) {
            tags.add('has-warnings');
        }
        if (record.metadata.evaluation.flags.some(f => f.type === 'error')) {
            tags.add('has-errors');
        }
    }
    return Array.from(tags);
}
export function calculateAssetScore(record) {
    if (!record.metadata.evaluation) {
        return 0;
    }
    return record.metadata.evaluation.finalScore;
}
export function hasAssetIssues(record) {
    if (!record.metadata.evaluation) {
        return {
            hasWarnings: false,
            hasErrors: false,
            issueCount: 0
        };
    }
    const hasWarnings = record.metadata.evaluation.warnings.length > 0 ||
        record.metadata.evaluation.flags.some(f => f.type === 'warning');
    const hasErrors = record.metadata.evaluation.flags.some(f => f.type === 'error');
    const issueCount = record.metadata.evaluation.warnings.length +
        record.metadata.evaluation.flags.filter(f => f.type === 'warning' || f.type === 'error').length;
    return {
        hasWarnings,
        hasErrors,
        issueCount
    };
}
//# sourceMappingURL=asset-record.js.map