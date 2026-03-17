/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * content_engine_adapter.ts
 */
import type { ContentEngineResult, GenerationRequest } from './types.js';
/**
 * Main adapter entry point for content engine
 * Connects content generation flow to enhanced canon validator and generation config system
 */
export declare class ContentEngineAdapter {
    private canonGuard;
    private preGenerationHook;
    private postGenerationHook;
    private retryFallbackAdapter;
    constructor();
    /**
     * Process a generation request through the full validation and generation pipeline
     */
    processGenerationRequest(request: GenerationRequest): Promise<ContentEngineResult>;
    /**
     * Prepare generation payload based on validation results
     */
    private prepareGenerationPayload;
    /**
     * Execute generation (scaffolded implementation)
     */
    private executeGeneration;
    /**
     * Create normalized content engine result
     */
    private createContentEngineResult;
    /**
     * Create blocked result when pre-generation validation fails
     */
    private createBlockedResult;
    /**
     * Create error result when an exception occurs
     */
    private createErrorResult;
    /**
     * Helper methods
     */
    private adjustGenerationParameters;
    private getMimeTypeForObjective;
    private generateLineageHash;
}
export declare const contentEngineAdapter: ContentEngineAdapter;
//# sourceMappingURL=content_engine_adapter.d.ts.map