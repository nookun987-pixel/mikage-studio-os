/**
 * @package @mikage/asset-registry
 * @wave 14
 *
 * asset-registry.ts
 */
import { validateAssetRecord, mergeAssetRecords, extractAssetTags, calculateAssetScore, hasAssetIssues } from "./asset-record.js";
export class DefaultAssetRegistry {
    assets = new Map();
    async registerAsset(record) {
        const validation = validateAssetRecord(record);
        if (!validation.isValid) {
            throw new Error(`Invalid asset record: ${validation.errors.join(', ')}`);
        }
        if (this.assets.has(record.assetId)) {
            throw new Error(`Asset with id '${record.assetId}' already exists`);
        }
        this.assets.set(record.assetId, record);
    }
    async getAsset(assetId) {
        return this.assets.get(assetId) || null;
    }
    async listAssets(query) {
        let filteredAssets = Array.from(this.assets.values());
        filteredAssets = this.applyFilters(filteredAssets, query);
        filteredAssets = this.applySorting(filteredAssets, query);
        filteredAssets = this.applyPagination(filteredAssets, query);
        const totalCount = this.countTotalAssets(query);
        const hasMore = this.checkHasMore(query, totalCount);
        return {
            assets: filteredAssets,
            totalCount,
            hasMore,
            query
        };
    }
    async listAssetsByScene(sceneId, query = {}) {
        const fullQuery = {
            ...query,
            sceneId
        };
        return this.listAssets(fullQuery);
    }
    async listAssetsByCanon(canonId, query = {}) {
        const fullQuery = {
            ...query,
            canonId
        };
        return this.listAssets(fullQuery);
    }
    async updateAsset(assetId, updates) {
        const existing = this.assets.get(assetId);
        if (!existing) {
            return null;
        }
        const updated = mergeAssetRecords(existing, updates);
        const validation = validateAssetRecord(updated);
        if (!validation.isValid) {
            throw new Error(`Invalid asset update: ${validation.errors.join(', ')}`);
        }
        this.assets.set(assetId, updated);
        return updated;
    }
    async deleteAsset(assetId) {
        return this.assets.delete(assetId);
    }
    async searchAssets(searchTerm, query = {}) {
        const allAssets = Array.from(this.assets.values());
        const searchResults = allAssets.filter(asset => {
            const searchableText = [
                asset.assetId,
                asset.assetType,
                asset.providerId,
                asset.modelId,
                asset.sceneId || '',
                asset.canonId || '',
                asset.canonVersion || '',
                asset.lineageId,
                ...extractAssetTags(asset),
                asset.metadata.storageUri,
                asset.metadata.format,
                ...(asset.metadata.tags || []),
                ...(asset.metadata.categories || [])
            ].join(' ').toLowerCase();
            return searchableText.includes(searchTerm.toLowerCase());
        });
        const fullQuery = {
            ...query
        };
        let filteredResults = this.applyFilters(searchResults, fullQuery);
        filteredResults = this.applySorting(filteredResults, fullQuery);
        filteredResults = this.applyPagination(filteredResults, fullQuery);
        const totalCount = searchResults.length;
        const hasMore = this.checkHasMore(fullQuery, totalCount);
        return {
            assets: filteredResults,
            totalCount,
            hasMore,
            query: fullQuery
        };
    }
    async getAssetStatistics(query) {
        let assets = Array.from(this.assets.values());
        if (query) {
            assets = this.applyFilters(assets, query);
        }
        const assetsByType = {};
        const assetsByProvider = {};
        const assetsByCanon = {};
        const generationTimeline = [];
        let totalEvaluationScore = 0;
        let evaluatedAssetCount = 0;
        let assetsWithWarnings = 0;
        let assetsWithErrors = 0;
        for (const asset of assets) {
            assetsByType[asset.assetType] = (assetsByType[asset.assetType] || 0) + 1;
            assetsByProvider[asset.providerId] = (assetsByProvider[asset.providerId] || 0) + 1;
            if (asset.canonId) {
                assetsByCanon[asset.canonId] = (assetsByCanon[asset.canonId] || 0) + 1;
            }
            const generationDate = asset.generationTimestamp.split('T')[0];
            const existingDate = generationTimeline.find(d => d.date === generationDate);
            if (existingDate) {
                existingDate.count++;
            }
            else {
                generationTimeline.push({ date: generationDate, count: 1 });
            }
            if (asset.metadata.evaluation) {
                totalEvaluationScore += asset.metadata.evaluation.finalScore;
                evaluatedAssetCount++;
            }
            const issues = hasAssetIssues(asset);
            if (issues.hasWarnings) {
                assetsWithWarnings++;
            }
            if (issues.hasErrors) {
                assetsWithErrors++;
            }
        }
        const averageEvaluationScore = evaluatedAssetCount > 0 ? totalEvaluationScore / evaluatedAssetCount : 0;
        generationTimeline.sort((a, b) => a.date.localeCompare(b.date));
        return {
            totalAssets: assets.length,
            assetsByType,
            assetsByProvider,
            assetsByCanon,
            averageEvaluationScore,
            assetsWithWarnings,
            assetsWithErrors,
            generationTimeline
        };
    }
    applyFilters(assets, query) {
        return assets.filter(asset => {
            if (query.assetType && asset.assetType !== query.assetType) {
                return false;
            }
            if (query.providerId && asset.providerId !== query.providerId) {
                return false;
            }
            if (query.modelId && asset.modelId !== query.modelId) {
                return false;
            }
            if (query.sceneId && asset.sceneId !== query.sceneId) {
                return false;
            }
            if (query.canonId && asset.canonId !== query.canonId) {
                return false;
            }
            if (query.canonVersion && asset.canonVersion !== query.canonVersion) {
                return false;
            }
            if (query.lineageId && asset.lineageId !== query.lineageId) {
                return false;
            }
            if (query.mimeType && asset.metadata.mimeType !== query.mimeType) {
                return false;
            }
            if (query.tags && query.tags.length > 0) {
                const assetTags = extractAssetTags(asset);
                const hasAllTags = query.tags.every(tag => assetTags.includes(tag));
                if (!hasAllTags) {
                    return false;
                }
            }
            if (query.categories && query.categories.length > 0) {
                const hasAllCategories = query.categories.every(category => asset.metadata.categories.includes(category));
                if (!hasAllCategories) {
                    return false;
                }
            }
            if (query.generatedAfter && asset.generationTimestamp < query.generatedAfter) {
                return false;
            }
            if (query.generatedBefore && asset.generationTimestamp > query.generatedBefore) {
                return false;
            }
            if (query.minEvaluationScore !== undefined) {
                const score = calculateAssetScore(asset);
                if (score < query.minEvaluationScore) {
                    return false;
                }
            }
            if (query.maxEvaluationScore !== undefined) {
                const score = calculateAssetScore(asset);
                if (score > query.maxEvaluationScore) {
                    return false;
                }
            }
            if (query.hasWarnings !== undefined) {
                const issues = hasAssetIssues(asset);
                if (issues.hasWarnings !== query.hasWarnings) {
                    return false;
                }
            }
            if (query.hasErrors !== undefined) {
                const issues = hasAssetIssues(asset);
                if (issues.hasErrors !== query.hasErrors) {
                    return false;
                }
            }
            return true;
        });
    }
    applySorting(assets, query) {
        const sortBy = query.sortBy || "generationTimestamp";
        const sortOrder = query.sortOrder || "desc";
        return assets.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case "generationTimestamp":
                    comparison = a.generationTimestamp.localeCompare(b.generationTimestamp);
                    break;
                case "evaluationScore":
                    const scoreA = calculateAssetScore(a);
                    const scoreB = calculateAssetScore(b);
                    comparison = scoreA - scoreB;
                    break;
                case "assetType":
                    comparison = a.assetType.localeCompare(b.assetType);
                    break;
                default:
                    comparison = a.generationTimestamp.localeCompare(b.generationTimestamp);
            }
            return sortOrder === "asc" ? comparison : -comparison;
        });
    }
    applyPagination(assets, query) {
        const offset = query.offset || 0;
        const limit = query.limit || 50;
        return assets.slice(offset, offset + limit);
    }
    countTotalAssets(query) {
        return this.applyFilters(Array.from(this.assets.values()), query).length;
    }
    checkHasMore(query, totalCount) {
        const offset = query.offset || 0;
        const limit = query.limit || 50;
        return offset + limit < totalCount;
    }
}
//# sourceMappingURL=asset-registry.js.map