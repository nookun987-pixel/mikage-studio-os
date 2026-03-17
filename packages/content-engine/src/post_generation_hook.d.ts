/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * post_generation_hook.ts
 */
import { CanonGuard } from '@mikage/canon-validator';
import type { PostGenerationHook, GenerationRequest, GenerationResponse, PostGenerationValidationResult } from './types.js';
/**
 * Implementation of post-generation validation hook
 * Handles canon/style/asset validation after generation
 */
export declare class PostGenerationHookImpl implements PostGenerationHook {
    private canonGuard;
    constructor(canonGuard: CanonGuard);
    /**
     * Validate generation result after processing
     */
    validate(request: GenerationRequest, generationResult: GenerationResponse): Promise<PostGenerationValidationResult>;
    /**
     * Check canon compliance of generated content
     */
    checkCanonCompliance(generationResult: GenerationResponse): Promise<number>;
    /**
     * Check style compliance of generated content
     */
    checkStyleCompliance(generationResult: GenerationResponse): Promise<number>;
    /**
     * Check asset quality of generated content
     */
    checkAssetQuality(generationResult: GenerationResponse): Promise<number>;
    /**
     * Helper methods
     */
    private convertToPostGenerationCanonInput;
    private extractIssues;
    private extractBlockingIssues;
    private extractWarnings;
    private calculateQualityScore;
    private determinePostGenerationStatus;
    private calculatePostGenerationConfidence;
    private mapSeverity;
    private mapWarningSeverity;
    private calculateEscalationLevel;
    private estimateResolutionTime;
}
//# sourceMappingURL=post_generation_hook.d.ts.map