/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * retry_fallback_adapter.ts
 */
import type { RetryFallbackAdapter, PreGenerationValidationResult, PostGenerationValidationResult, GenerationResponse, ContentEngineResult, RoutingDecision } from './types.js';
/**
 * Implementation of retry/fallback adapter
 * Maps validator decisions to retry/fallback/reject actions
 */
export declare class RetryFallbackAdapterImpl implements RetryFallbackAdapter {
    /**
     * Route decision based on validation results and generation outcome
     */
    routeDecision(preValidationResult: PreGenerationValidationResult, postValidationResult: PostGenerationValidationResult | undefined, generationResult: GenerationResponse): Promise<RoutingDecision>;
    /**
     * Determine if a result should be retried
     */
    shouldRetry(result: ContentEngineResult): boolean;
    /**
     * Determine if fallback should be used
     */
    shouldFallback(result: ContentEngineResult): boolean;
    /**
     * Generate retry configuration
     */
    generateRetryConfig(result: ContentEngineResult): any;
    /**
     * Generate fallback configuration
     */
    generateFallbackConfig(result: ContentEngineResult): any;
    /**
     * Helper methods
     */
    private analyzeResults;
    private applyRoutingRules;
    private generateDecisionConfig;
    private isRetryEligible;
    private isFallbackEligible;
    private calculateMaxRetries;
    private hasRetryableConditions;
    private hasFallbackConditions;
    private calculateRetryDelay;
    private generateParameterAdjustments;
    private identifySubstituteAssets;
    private simplifyPrompt;
    private selectAlternativeStyle;
    private hasCanonViolations;
    private hasQualityIssues;
    private selectFallbackStrategy;
    private determineRetryReason;
    private selectRetryStrategy;
    private generateFallbackConfigBase;
    private calculateRetrySuccessProbability;
}
//# sourceMappingURL=retry_fallback_adapter.d.ts.map