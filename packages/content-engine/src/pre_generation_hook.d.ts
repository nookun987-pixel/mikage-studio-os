/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * pre_generation_hook.ts
 */
import { CanonGuard } from '@mikage/canon-validator';
import type { PreGenerationHook, GenerationRequest, PreGenerationValidationResult } from './types.js';
/**
 * Implementation of pre-generation validation hook
 * Handles request validation, mode/reference/prompt readiness checks
 */
export declare class PreGenerationHookImpl implements PreGenerationHook {
    private canonGuard;
    constructor(canonGuard: CanonGuard);
    /**
     * Validate generation request before processing
     */
    validate(request: GenerationRequest): Promise<PreGenerationValidationResult>;
    /**
     * Check if generation mode is ready and available
     */
    checkModeReadiness(request: GenerationRequest): Promise<boolean>;
    /**
     * Check if required references are available
     */
    checkReferenceAvailability(request: GenerationRequest): Promise<boolean>;
    /**
     * Check prompt compliance with canon requirements
     */
    checkPromptCompliance(request: GenerationRequest): Promise<boolean>;
    /**
     * Helper methods
     */
    private convertToCanonValidationInput;
    private extractIssues;
    private extractBlockingIssues;
    private extractWarnings;
    private determineValidationStatus;
    private calculateConfidence;
    private recommendGenerationMode;
    private extractValidatedReferences;
    private extractCanonConstraints;
    private getModeForObjective;
    private mapSeverity;
    private mapWarningSeverity;
    private calculateEscalationLevel;
    private estimateResolutionTime;
}
//# sourceMappingURL=pre_generation_hook.d.ts.map