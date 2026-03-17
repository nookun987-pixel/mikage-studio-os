/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * content_engine_adapter.ts
 */
import { CanonGuard } from '@mikage/canon-validator';
import { PreGenerationHookImpl } from './pre_generation_hook.js';
import { PostGenerationHookImpl } from './post_generation_hook.js';
import { RetryFallbackAdapterImpl } from './retry_fallback_adapter.js';
/**
 * Main adapter entry point for content engine
 * Connects content generation flow to enhanced canon validator and generation config system
 */
export class ContentEngineAdapter {
    canonGuard;
    preGenerationHook;
    postGenerationHook;
    retryFallbackAdapter;
    constructor() {
        this.canonGuard = new CanonGuard();
        this.preGenerationHook = new PreGenerationHookImpl(this.canonGuard);
        this.postGenerationHook = new PostGenerationHookImpl(this.canonGuard);
        this.retryFallbackAdapter = new RetryFallbackAdapterImpl();
    }
    /**
     * Process a generation request through the full validation and generation pipeline
     */
    async processGenerationRequest(request) {
        const resultId = `result_${request.requestId}_${Date.now()}`;
        const startTime = Date.now();
        try {
            // Step 1: Pre-generation validation
            const preValidationResult = await this.preGenerationHook.validate(request);
            if (preValidationResult.shouldBlock) {
                return this.createBlockedResult(resultId, request, preValidationResult, startTime);
            }
            // Step 2: Route to generation-ready payload
            const generationPayload = await this.prepareGenerationPayload(request, preValidationResult);
            // Step 3: Execute generation (scaffolded - would call actual generation service)
            const generationResult = await this.executeGeneration(generationPayload);
            // Step 4: Post-generation validation
            const postValidationResult = await this.postGenerationHook.validate(request, generationResult);
            // Step 5: Route through retry/fallback logic
            const routingDecision = await this.retryFallbackAdapter.routeDecision(preValidationResult, postValidationResult, generationResult);
            // Step 6: Create normalized result
            return this.createContentEngineResult(resultId, request, preValidationResult, postValidationResult, generationResult, routingDecision, startTime);
        }
        catch (error) {
            return this.createErrorResult(resultId, request, error, startTime);
        }
    }
    /**
     * Prepare generation payload based on validation results
     */
    async prepareGenerationPayload(request, preValidationResult) {
        // Scaffolded: Convert request to generation-ready format
        // This would include:
        // - Prompt compilation with validated parameters
        // - Reference selection based on validation
        // - Mode configuration adjustments
        // - Parameter tuning based on validation feedback
        return {
            requestId: request.requestId,
            productionPackage: request.productionPackage,
            generationConfig: {
                mode: preValidationResult.recommendedMode || request.productionPackage.objective,
                parameters: this.adjustGenerationParameters(request.parameters, preValidationResult),
                references: preValidationResult.validatedReferences || [],
                constraints: preValidationResult.canonConstraints || {}
            },
            validationContext: {
                preValidationPassed: preValidationResult.status === 'accepted',
                confidence: preValidationResult.confidence,
                warnings: preValidationResult.warnings || []
            }
        };
    }
    /**
     * Execute generation (scaffolded implementation)
     */
    async executeGeneration(payload) {
        // Scaffolded: This would call the actual generation service
        // For now, we simulate a successful generation with basic metadata
        const generationStartTime = Date.now();
        // Simulate generation time
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
            assetId: `asset_${payload.requestId}_${Date.now()}`,
            mimeType: this.getMimeTypeForObjective(payload.productionPackage.objective),
            storageUri: `generated://assets/${payload.requestId}/${Date.now()}`,
            lineageHash: this.generateLineageHash(payload),
            metadata: {
                objective: payload.productionPackage.objective,
                generatedBy: 'content_engine_adapter',
                parameters: payload.generationConfig.parameters,
                generatedAt: new Date().toISOString()
            },
            generationTime: Date.now() - generationStartTime,
            success: true
        };
    }
    /**
     * Create normalized content engine result
     */
    createContentEngineResult(resultId, request, preValidationResult, postValidationResult, generationResult, routingDecision, startTime) {
        const completedAt = new Date().toISOString();
        return {
            resultId,
            requestMetadata: {
                requestId: request.requestId,
                productionPackageId: request.productionPackage.production_package_id,
                jobId: request.productionPackage.jobId,
                objective: request.productionPackage.objective,
                generationMode: preValidationResult.recommendedMode || 'canon_core',
                requestedAt: request.requestedAt,
                initiatedAt: new Date(startTime).toISOString()
            },
            validationStatus: {
                preGeneration: {
                    status: preValidationResult.status,
                    confidence: preValidationResult.confidence || 0.8,
                    issuesFound: preValidationResult.issues?.length || 0,
                    blockingIssues: preValidationResult.blockingIssues?.length || 0,
                    validationTimeMs: preValidationResult.validationTime || 0
                },
                postGeneration: postValidationResult ? {
                    status: postValidationResult.status,
                    confidence: postValidationResult.confidence || 0.8,
                    issuesFound: postValidationResult.issues?.length || 0,
                    blockingIssues: postValidationResult.blockingIssues?.length || 0,
                    validationTimeMs: postValidationResult.validationTime || 0
                } : undefined,
                overall: {
                    status: routingDecision.finalDecision,
                    finalConfidence: Math.min(preValidationResult.confidence || 0.8, postValidationResult?.confidence || 0.8),
                    totalValidationTimeMs: (preValidationResult.validationTime || 0) +
                        (postValidationResult?.validationTime || 0)
                }
            },
            generationStatus: {
                status: generationResult.success ? 'completed' : 'failed',
                startedAt: new Date(startTime).toISOString(),
                completedAt: generationResult.completedAt || completedAt,
                generationTimeMs: generationResult.generationTime || 0,
                providerUsed: generationResult.provider || 'stub_provider',
                generationParameters: request.parameters
            },
            retryEligibility: {
                retryEligible: routingDecision.retryEligible || false,
                maxRetries: routingDecision.maxRetries || 0,
                currentAttempt: request.currentAttempt || 0,
                retryReason: routingDecision.retryReason,
                retryStrategy: routingDecision.retryStrategy,
                fallbackEligible: routingDecision.fallbackEligible || false
            },
            fallbackRecommendation: {
                fallbackRequired: routingDecision.fallbackRequired || false,
                fallbackStrategy: routingDecision.fallbackStrategy,
                fallbackConfig: routingDecision.fallbackConfig,
                expectedQualityImpact: routingDecision.qualityImpact,
                successProbability: routingDecision.successProbability
            },
            blockingIssues: [
                ...(preValidationResult.blockingIssues || []),
                ...(postValidationResult?.blockingIssues || [])
            ],
            warnings: [
                ...(preValidationResult.warnings || []),
                ...(postValidationResult?.warnings || [])
            ],
            referencesUsed: {
                styleReferences: preValidationResult.validatedReferences?.filter((r) => r.referenceType === 'style') || [],
                assetReferences: preValidationResult.validatedReferences?.filter((r) => r.referenceType === 'asset') || [],
                canonReferences: preValidationResult.validatedReferences?.filter((r) => r.referenceType === 'canon') || []
            },
            generatedAsset: generationResult.success ? {
                assetId: generationResult.assetId,
                mimeType: generationResult.mimeType,
                storageUri: generationResult.storageUri,
                lineageHash: generationResult.lineageHash,
                metadata: generationResult.metadata
            } : undefined,
            monitoringData: {
                performanceMetrics: {
                    totalProcessingTimeMs: Date.now() - startTime,
                    validationTimeMs: (preValidationResult.validationTime || 0) +
                        (postValidationResult?.validationTime || 0),
                    generationTimeMs: generationResult.generationTime || 0,
                    postProcessingTimeMs: 0
                },
                resourceUsage: {
                    memoryPeakMb: 0, // Scaffolded: would be measured
                    cpuUsagePercent: 0 // Scaffolded: would be measured
                },
                traceId: `trace_${request.requestId}_${Date.now()}`
            },
            completedAt
        };
    }
    /**
     * Create blocked result when pre-generation validation fails
     */
    createBlockedResult(resultId, request, preValidationResult, startTime) {
        const completedAt = new Date().toISOString();
        return {
            resultId,
            requestMetadata: {
                requestId: request.requestId,
                productionPackageId: request.productionPackage.production_package_id,
                jobId: request.productionPackage.jobId,
                objective: request.productionPackage.objective,
                generationMode: 'blocked',
                requestedAt: request.requestedAt,
                initiatedAt: new Date(startTime).toISOString()
            },
            validationStatus: {
                preGeneration: {
                    status: 'rejected',
                    confidence: preValidationResult.confidence || 0,
                    issuesFound: preValidationResult.issues?.length || 0,
                    blockingIssues: preValidationResult.blockingIssues?.length || 0,
                    validationTimeMs: preValidationResult.validationTime || 0
                },
                overall: {
                    status: 'rejected',
                    finalConfidence: 0,
                    totalValidationTimeMs: preValidationResult.validationTime || 0
                }
            },
            generationStatus: {
                status: 'cancelled',
                generationTimeMs: 0
            },
            retryEligibility: {
                retryEligible: false,
                maxRetries: 0,
                currentAttempt: request.currentAttempt || 0,
                fallbackEligible: false
            },
            fallbackRecommendation: {
                fallbackRequired: false
            },
            blockingIssues: preValidationResult.blockingIssues || [],
            warnings: preValidationResult.warnings || [],
            referencesUsed: {
                styleReferences: [],
                assetReferences: [],
                canonReferences: []
            },
            monitoringData: {
                performanceMetrics: {
                    totalProcessingTimeMs: Date.now() - startTime,
                    validationTimeMs: preValidationResult.validationTime || 0,
                    generationTimeMs: 0,
                    postProcessingTimeMs: 0
                },
                resourceUsage: {
                    memoryPeakMb: 0,
                    cpuUsagePercent: 0
                },
                traceId: `trace_${request.requestId}_${Date.now()}`
            },
            completedAt
        };
    }
    /**
     * Create error result when an exception occurs
     */
    createErrorResult(resultId, request, error, startTime) {
        const completedAt = new Date().toISOString();
        return {
            resultId,
            requestMetadata: {
                requestId: request.requestId,
                productionPackageId: request.productionPackage.production_package_id,
                jobId: request.productionPackage.jobId,
                objective: request.productionPackage.objective,
                generationMode: 'error',
                requestedAt: request.requestedAt,
                initiatedAt: new Date(startTime).toISOString()
            },
            validationStatus: {
                preGeneration: {
                    status: 'rejected',
                    confidence: 0,
                    issuesFound: 1,
                    blockingIssues: 1,
                    validationTimeMs: 0
                },
                overall: {
                    status: 'rejected',
                    finalConfidence: 0,
                    totalValidationTimeMs: 0
                }
            },
            generationStatus: {
                status: 'failed',
                generationTimeMs: 0
            },
            retryEligibility: {
                retryEligible: true,
                maxRetries: 3,
                currentAttempt: request.currentAttempt || 0,
                retryReason: 'system_error',
                retryStrategy: 'delayed',
                fallbackEligible: false
            },
            fallbackRecommendation: {
                fallbackRequired: false
            },
            blockingIssues: [{
                    issueId: `error_${resultId}`,
                    issueType: 'system_error',
                    severity: 'critical',
                    description: error.message || 'Unknown error occurred',
                    source: 'content_engine_adapter',
                    blocksGeneration: true,
                    requiresManualIntervention: false,
                    resolutionPath: {
                        immediateAction: 'retry_request',
                        escalationRequired: false
                    }
                }],
            warnings: [],
            referencesUsed: {
                styleReferences: [],
                assetReferences: [],
                canonReferences: []
            },
            monitoringData: {
                performanceMetrics: {
                    totalProcessingTimeMs: Date.now() - startTime,
                    validationTimeMs: 0,
                    generationTimeMs: 0,
                    postProcessingTimeMs: 0
                },
                resourceUsage: {
                    memoryPeakMb: 0,
                    cpuUsagePercent: 0
                },
                traceId: `trace_${request.requestId}_${Date.now()}`
            },
            completedAt
        };
    }
    /**
     * Helper methods
     */
    adjustGenerationParameters(parameters, validationResult) {
        // Scaffolded: Adjust parameters based on validation feedback
        return {
            ...parameters,
            // Would include actual parameter adjustments based on validation
        };
    }
    getMimeTypeForObjective(objective) {
        const mimeMap = {
            cinematic_frame: 'image/png',
            character_portrait: 'image/png',
            trailer_sequence: 'video/mp4'
        };
        return mimeMap[objective] || 'image/png';
    }
    generateLineageHash(payload) {
        // Scaffolded: Generate lineage hash for traceability
        return `lineage_${payload.requestId}_${Date.now()}`;
    }
}
// Export singleton instance for convenience
export const contentEngineAdapter = new ContentEngineAdapter();
//# sourceMappingURL=content_engine_adapter.js.map