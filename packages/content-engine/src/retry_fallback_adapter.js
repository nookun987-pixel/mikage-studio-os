/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * retry_fallback_adapter.ts
 */
/**
 * Implementation of retry/fallback adapter
 * Maps validator decisions to retry/fallback/reject actions
 */
export class RetryFallbackAdapterImpl {
    /**
     * Route decision based on validation results and generation outcome
     */
    async routeDecision(preValidationResult, postValidationResult, generationResult) {
        // Analyze the results to determine the best course of action
        const analysis = this.analyzeResults(preValidationResult, postValidationResult, generationResult);
        // Apply routing rules to determine decision
        const decision = this.applyRoutingRules(analysis);
        // Generate specific configuration for the decision
        const config = this.generateDecisionConfig(decision, analysis);
        return {
            finalDecision: decision,
            retryEligible: this.isRetryEligible(decision, analysis),
            maxRetries: this.calculateMaxRetries(decision, analysis),
            retryReason: config.retryReason,
            retryStrategy: config.retryStrategy,
            fallbackEligible: this.isFallbackEligible(decision, analysis),
            fallbackRequired: decision === 'fallback',
            fallbackStrategy: config.fallbackStrategy,
            fallbackConfig: config.fallbackConfig,
            qualityImpact: config.qualityImpact,
            successProbability: config.successProbability
        };
    }
    /**
     * Determine if a result should be retried
     */
    shouldRetry(result) {
        // Check if retry is eligible and within limits
        if (!result.retryEligibility.retryEligible) {
            return false;
        }
        if (result.retryEligibility.currentAttempt >= result.retryEligibility.maxRetries) {
            return false;
        }
        // Check specific conditions that warrant retry
        return this.hasRetryableConditions(result);
    }
    /**
     * Determine if fallback should be used
     */
    shouldFallback(result) {
        // Check if fallback is required or recommended
        if (result.fallbackRecommendation.fallbackRequired) {
            return true;
        }
        if (!result.retryEligibility.fallbackEligible) {
            return false;
        }
        // Check if conditions suggest fallback over retry
        return this.hasFallbackConditions(result);
    }
    /**
     * Generate retry configuration
     */
    generateRetryConfig(result) {
        const strategy = result.retryEligibility.retryStrategy;
        switch (strategy) {
            case 'immediate':
                return {
                    type: 'immediate',
                    delay: 0,
                    adjustments: this.generateParameterAdjustments(result, 'retry')
                };
            case 'delayed':
                return {
                    type: 'delayed',
                    delay: this.calculateRetryDelay(result.retryEligibility.currentAttempt),
                    adjustments: this.generateParameterAdjustments(result, 'retry')
                };
            case 'parameter_adjustment':
                return {
                    type: 'parameter_adjustment',
                    delay: this.calculateRetryDelay(result.retryEligibility.currentAttempt),
                    adjustments: this.generateParameterAdjustments(result, 'parameter_focus')
                };
            case 'fallback':
                return {
                    type: 'fallback',
                    delay: 0,
                    adjustments: this.generateParameterAdjustments(result, 'fallback')
                };
            default:
                return {
                    type: 'delayed',
                    delay: 5000,
                    adjustments: {}
                };
        }
    }
    /**
     * Generate fallback configuration
     */
    generateFallbackConfig(result) {
        const strategy = result.fallbackRecommendation.fallbackStrategy;
        switch (strategy) {
            case 'conservative_generation':
                return {
                    strategy: 'conservative_generation',
                    parameters: {
                        steps: Math.max(20, (result.generationStatus.generationParameters?.steps || 30) - 10),
                        cfg: Math.max(6, Math.min(8, (result.generationStatus.generationParameters?.cfg || 7) - 0.5)),
                        sampler: 'DPM++ 2M Karras' // More stable sampler
                    },
                    qualityExpectation: 'medium',
                    successProbability: 0.8
                };
            case 'asset_substitution':
                return {
                    strategy: 'asset_substitution',
                    substituteAssets: this.identifySubstituteAssets(result),
                    parameters: result.generationStatus.generationParameters,
                    qualityExpectation: 'medium',
                    successProbability: 0.7
                };
            case 'parameter_reduction':
                return {
                    strategy: 'parameter_reduction',
                    simplifiedPrompt: this.simplifyPrompt(result),
                    parameters: {
                        steps: 20,
                        cfg: 7.0,
                        sampler: 'Euler a'
                    },
                    qualityExpectation: 'low',
                    successProbability: 0.9
                };
            case 'style_adjustment':
                return {
                    strategy: 'style_adjustment',
                    adjustedStyle: this.selectAlternativeStyle(result),
                    parameters: result.generationStatus.generationParameters,
                    qualityExpectation: 'medium',
                    successProbability: 0.75
                };
            default:
                return {
                    strategy: 'conservative_generation',
                    parameters: {
                        steps: 20,
                        cfg: 7.0,
                        sampler: 'DPM++ 2M Karras'
                    },
                    qualityExpectation: 'medium',
                    successProbability: 0.8
                };
        }
    }
    /**
     * Helper methods
     */
    analyzeResults(preValidationResult, postValidationResult, generationResult) {
        return {
            preValidationStatus: preValidationResult.status,
            postValidationStatus: postValidationResult?.status,
            generationSuccess: generationResult.success,
            preValidationConfidence: preValidationResult.confidence,
            postValidationConfidence: postValidationResult?.confidence || 0,
            qualityScore: postValidationResult?.qualityScore || 0,
            blockingIssuesCount: (preValidationResult.blockingIssues?.length || 0) + (postValidationResult?.blockingIssues?.length || 0),
            warningsCount: (preValidationResult.warnings?.length || 0) + (postValidationResult?.warnings?.length || 0),
            hasCanonViolations: this.hasCanonViolations(preValidationResult, postValidationResult),
            hasQualityIssues: this.hasQualityIssues(postValidationResult),
            hasTechnicalIssues: !generationResult.success
        };
    }
    applyRoutingRules(analysis) {
        // Rule 1: Critical blocking issues -> reject
        if (analysis.blockingIssuesCount > 0) {
            return 'rejected';
        }
        // Rule 2: Technical generation failure -> retry
        if (analysis.hasTechnicalIssues) {
            return 'retry';
        }
        // Rule 3: Canon violations -> retry (unless too severe)
        if (analysis.hasCanonViolations) {
            if (analysis.preValidationStatus === 'rejected') {
                return 'rejected';
            }
            return 'retry';
        }
        // Rule 4: Low quality but technically successful -> fallback
        if (analysis.qualityScore < 0.6 && analysis.generationSuccess) {
            return 'fallback';
        }
        // Rule 5: Medium quality with warnings -> retry
        if (analysis.qualityScore < 0.8 && analysis.warningsCount > 0) {
            return 'retry';
        }
        // Rule 6: Good quality -> accept
        if (analysis.qualityScore >= 0.8 && analysis.generationSuccess) {
            return 'accepted';
        }
        // Default: retry for unknown issues
        return 'retry';
    }
    generateDecisionConfig(decision, analysis) {
        switch (decision) {
            case 'retry':
                return {
                    retryReason: this.determineRetryReason(analysis),
                    retryStrategy: this.selectRetryStrategy(analysis),
                    fallbackStrategy: undefined,
                    fallbackConfig: undefined,
                    qualityImpact: 'medium',
                    successProbability: this.calculateRetrySuccessProbability(analysis)
                };
            case 'fallback':
                return {
                    retryReason: undefined,
                    retryStrategy: undefined,
                    fallbackStrategy: this.selectFallbackStrategy(analysis),
                    fallbackConfig: this.generateFallbackConfigBase(analysis),
                    qualityImpact: 'medium',
                    successProbability: 0.75
                };
            case 'rejected':
                return {
                    retryReason: 'blocking_issues',
                    retryStrategy: undefined,
                    fallbackStrategy: undefined,
                    fallbackConfig: undefined,
                    qualityImpact: 'high',
                    successProbability: 0.0
                };
            default:
                return {
                    qualityImpact: 'low',
                    successProbability: 1.0
                };
        }
    }
    isRetryEligible(decision, analysis) {
        return decision === 'retry' && !analysis.hasTechnicalIssues;
    }
    isFallbackEligible(decision, analysis) {
        return decision === 'fallback' || (decision === 'retry' && analysis.qualityScore < 0.6);
    }
    calculateMaxRetries(decision, analysis) {
        if (decision === 'retry') {
            if (analysis.hasTechnicalIssues)
                return 3;
            if (analysis.hasCanonViolations)
                return 2;
            if (analysis.qualityScore < 0.8)
                return 2;
            return 1;
        }
        return 0;
    }
    hasRetryableConditions(result) {
        // Check for specific retryable conditions
        const retryableIssues = ['quality_issue', 'style_drift', 'parameter_optimization'];
        return result.blockingIssues.some(issue => retryableIssues.includes(issue.issueType)) || result.warnings.length > 0;
    }
    hasFallbackConditions(result) {
        // Check for conditions that suggest fallback
        return (result.validationStatus.overall.finalConfidence < 0.7 ||
            result.blockingIssues.some(issue => issue.severity === 'high') ||
            result.warnings.length > 3);
    }
    calculateRetryDelay(attempt) {
        // Exponential backoff with jitter
        const baseDelay = 1000; // 1 second
        const maxDelay = 30000; // 30 seconds
        const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        return delay + Math.random() * 1000; // Add jitter
    }
    generateParameterAdjustments(result, type) {
        const currentParams = result.generationStatus.generationParameters || {};
        switch (type) {
            case 'retry':
                return {
                    steps: Math.min(50, (currentParams.steps || 30) + 5),
                    cfg: Math.max(6, Math.min(8, (currentParams.cfg || 7) + 0.2)),
                    seed: undefined // New seed for retry
                };
            case 'parameter_focus':
                return {
                    steps: Math.max(20, (currentParams.steps || 30) - 5),
                    cfg: 7.0, // Reset to standard
                    sampler: 'DPM++ 2M Karras', // More stable
                    seed: undefined
                };
            case 'fallback':
                return {
                    steps: 20,
                    cfg: 7.0,
                    sampler: 'Euler a', // Fast and stable
                    seed: undefined
                };
            default:
                return {};
        }
    }
    identifySubstituteAssets(result) {
        // Scaffolded: Identify alternative assets for substitution
        return result.referencesUsed.assetReferences.map(ref => ({
            originalAssetId: ref.assetId,
            substituteType: ref.assetType,
            confidence: ref.confidence * 0.8 // Lower confidence for substitutes
        }));
    }
    simplifyPrompt(result) {
        // Scaffolded: Simplify prompt for fallback generation
        // This would extract key elements and remove complex modifiers
        return "simplified_prompt_for_fallback";
    }
    selectAlternativeStyle(result) {
        // Scaffolded: Select alternative style based on current references
        const currentStyles = result.referencesUsed.styleReferences.map(r => r.referenceType);
        // Return a different style as fallback
        if (currentStyles.includes('style')) {
            return 'character';
        }
        return 'style';
    }
    hasCanonViolations(preValidationResult, postValidationResult) {
        return ((preValidationResult.blockingIssues?.some(issue => issue.issueType.includes('canon') || issue.source === 'canon_validator') || false) ||
            (postValidationResult?.blockingIssues?.some(issue => issue.issueType.includes('canon') || issue.source === 'canon_validator') || false));
    }
    hasQualityIssues(postValidationResult) {
        if (!postValidationResult)
            return false;
        return ((postValidationResult.qualityScore !== undefined && postValidationResult.qualityScore < 0.7) ||
            (postValidationResult.issues?.some(issue => issue.type.includes('quality')) || false));
    }
    selectFallbackStrategy(analysis) {
        if (analysis.qualityScore < 0.5)
            return 'conservative_generation';
        if (analysis.hasCanonViolations)
            return 'style_adjustment';
        return 'parameter_reduction';
    }
    determineRetryReason(analysis) {
        if (analysis.hasTechnicalIssues)
            return 'technical_failure';
        if (analysis.hasCanonViolations)
            return 'canon_violation';
        if (analysis.qualityScore < 0.8)
            return 'quality_improvement';
        return 'general_retry';
    }
    selectRetryStrategy(analysis) {
        if (analysis.hasTechnicalIssues)
            return 'delayed';
        if (analysis.hasCanonViolations)
            return 'parameter_adjustment';
        if (analysis.qualityScore < 0.6)
            return 'fallback';
        return 'delayed';
    }
    generateFallbackConfigBase(analysis) {
        return {
            strategy: 'conservative_generation',
            parameters: {
                steps: 20,
                cfg: 7.0,
                sampler: 'DPM++ 2M Karras'
            },
            qualityExpectation: 'medium'
        };
    }
    calculateRetrySuccessProbability(analysis) {
        let probability = 0.8; // Base probability
        if (analysis.hasTechnicalIssues)
            probability -= 0.2;
        if (analysis.hasCanonViolations)
            probability -= 0.3;
        if (analysis.qualityScore < 0.6)
            probability -= 0.2;
        if (analysis.warningsCount > 2)
            probability -= 0.1;
        return Math.max(0.1, probability);
    }
}
//# sourceMappingURL=retry_fallback_adapter.js.map