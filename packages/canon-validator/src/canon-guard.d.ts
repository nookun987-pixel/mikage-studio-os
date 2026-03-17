/**
 * @package @mikage/canon-validator
 * @wave Canon Guard Layer
 *
 * canon-guard.ts
 */
import type { ValidationIssue } from './types.js';
/**
 * Unified Canon Guard orchestrator
 * Provides defense-in-depth validation for all generation flows
 */
export declare class CanonGuard {
    private canonValidator;
    constructor();
    /**
     * Validate all applicable validation stages in deterministic order
     */
    validateAll(input: {
        prompt?: {
            id?: string;
            text: string;
            mode?: string;
            parameters?: Record<string, unknown>;
        };
        task?: {
            id: string;
            prompt: string;
            model?: string;
            parameters?: Record<string, unknown>;
        };
        visual_config?: {
            authority_level: number;
            domain?: string;
            style_rules?: string[];
        };
        validations?: string[];
    }): Promise<{
        valid: boolean;
        issues: ValidationIssue[];
        warnings: ValidationIssue[];
        stage: string;
        registryVersion?: string;
    }>;
    /**
     * Validate generation task only
     */
    validateGenerationTask(task: {
        id: string;
        prompt: string;
        model?: string;
        parameters?: Record<string, unknown>;
    }): Promise<{
        valid: boolean;
        issues: ValidationIssue[];
        warnings: ValidationIssue[];
        registryVersion?: string;
    }>;
    /**
     * Validate prompt input only
     */
    validatePrompt(prompt: {
        id?: string;
        text: string;
        mode?: string;
        parameters?: Record<string, unknown>;
    }): Promise<{
        valid: boolean;
        issues: ValidationIssue[];
        warnings: ValidationIssue[];
        registryVersion?: string;
    }>;
    /**
     * Validate visual tokens only (scaffold)
     */
    validateVisualTokens(input: {
        visual_config?: {
            authority_level: number;
            domain?: string;
            style_rules?: string[];
        };
    }): Promise<{
        valid: boolean;
        issues: ValidationIssue[];
        warnings: ValidationIssue[];
        registryVersion?: string;
    }>;
    /**
     * Validate style profile only (scaffold)
     */
    validateStyleProfile(input: {
        visual_config?: {
            authority_level: number;
            domain?: string;
            style_rules?: string[];
        };
    }): Promise<{
        valid: boolean;
        issues: ValidationIssue[];
        warnings: ValidationIssue[];
        registryVersion?: string;
    }>;
}
export declare const canonGuard: CanonGuard;
export declare const validateAll: (input: any) => Promise<{
    valid: boolean;
    issues: ValidationIssue[];
    warnings: ValidationIssue[];
    stage: string;
    registryVersion?: string;
}>;
export declare const validatePrompt: (prompt: any) => Promise<{
    valid: boolean;
    issues: ValidationIssue[];
    warnings: ValidationIssue[];
    registryVersion?: string;
}>;
export declare const validateGenerationTask: (task: any) => Promise<{
    valid: boolean;
    issues: ValidationIssue[];
    warnings: ValidationIssue[];
    registryVersion?: string;
}>;
export declare const validateVisualTokens: (input: any) => Promise<{
    valid: boolean;
    issues: ValidationIssue[];
    warnings: ValidationIssue[];
    registryVersion?: string;
}>;
export declare const validateStyleProfile: (input: any) => Promise<{
    valid: boolean;
    issues: ValidationIssue[];
    warnings: ValidationIssue[];
    registryVersion?: string;
}>;
//# sourceMappingURL=canon-guard.d.ts.map