/**
 * @package @mikage/canon-validator
 * @wave Canon Guard Layer
 *
 * canon-guard.ts
 */

import { CanonRegistryValidator } from './canon-registry-validator.js';
import type { CanonRegistry, ValidationResult, ValidationIssue, GenerationRequest, CanonValidationConfig } from './types.js';

/**
 * Unified Canon Guard orchestrator
 * Provides defense-in-depth validation for all generation flows
 */
export class CanonGuard {
  private canonValidator: CanonRegistryValidator;

  constructor() {
    this.canonValidator = new CanonRegistryValidator();
  }

  /**
   * Validate all applicable validation stages in deterministic order
   */
  async validateAll(input: {
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
  }> {
    const allIssues: ValidationIssue[] = [];
    const allWarnings: ValidationIssue[] = [];
    let registryVersion = 'v1.0';

    try {
      // Stage A: Generation Task Validation (if task present)
      if (input.task) {
        const taskValid = await this.validateGenerationTask(input.task);
        allIssues.push(...taskValid.issues);
        allWarnings.push(...taskValid.warnings);
        if (taskValid.registryVersion) {
          registryVersion = taskValid.registryVersion;
        }
      }

      // Stage B: Prompt Input Validation (if prompt present)
      if (input.prompt) {
        const promptValid = await this.validatePrompt(input.prompt);
        allIssues.push(...promptValid.issues);
        allWarnings.push(...promptValid.warnings);
        if (promptValid.registryVersion) {
          registryVersion = promptValid.registryVersion;
        }
      }

      // Stage C: Visual Tokens Validation (if visual config present)
      if (input.visual_config) {
        // TODO: Implement visual tokens validation when visual authority is integrated
        // For now, just pass through
      }

      // Stage D: Style Profile Validation (if visual config present)
      if (input.visual_config) {
        // TODO: Implement style profile validation when visual authority is integrated
        // For now, just pass through
      }

    } catch (error) {
      // Add system error as issue
      allIssues.push({
        type: 'system_error',
        severity: 'error',
        message: `Canon guard validation failed: ${error instanceof Error ? error.message : String(error)}`,
        location: 'canon_guard.validateAll'
      });
    }

    return {
      valid: allIssues.length === 0,
      issues: allIssues,
      warnings: allWarnings,
      stage: 'complete',
      registryVersion
    };
  }

  /**
   * Validate generation task only
   */
  async validateGenerationTask(task: {
    id: string;
    prompt: string;
    model?: string;
    parameters?: Record<string, unknown>;
  }): Promise<{ valid: boolean; issues: ValidationIssue[]; warnings: ValidationIssue[]; registryVersion?: string }> {
    try {
      // Use canon validator for generation task validation
      const validationResult = await this.canonValidator.validateGenerationRequest({
        prompt: {
          mode: 'canon_core',
          positive_prompt: task.prompt,
          parameters: {
            sampler: 'DPM++ 2M Karras',
            steps: 30,
            cfg: 6.5,
            ...(task.parameters || {})
          } as any
        },
        visual_config: {
          authority_level: 4,
          domain: 'mikage_application'
        },
        validations: ['canon_registry_compliance', 'prompt_canon_compliance', 'visual_authority_compliance']
      });

      return {
        valid: validationResult.valid,
        issues: validationResult.issues,
        warnings: validationResult.warnings,
        registryVersion: validationResult.registryVersion
      };
    } catch (error) {
      return {
        valid: false,
        issues: [{
          type: 'generation_task_error',
          severity: 'error',
          message: `Generation task validation error: ${error instanceof Error ? error.message : String(error)}`,
          location: 'generation_task',
          stage: 'generation_task'
        }],
        warnings: [],
        registryVersion: 'v1.0'
      };
    }
  }

  /**
   * Validate prompt input only
   */
  async validatePrompt(prompt: {
    id?: string;
    text: string;
    mode?: string;
    parameters?: Record<string, unknown>;
  }): Promise<{ valid: boolean; issues: ValidationIssue[]; warnings: ValidationIssue[]; registryVersion?: string }> {
    try {
      // Use canon validator for prompt validation
      const validationResult = await this.canonValidator.validateGenerationRequest({
        prompt: {
          mode: prompt.mode || 'canon_core',
          positive_prompt: prompt.text,
          parameters: prompt.parameters as any
        },
        visual_config: {
          authority_level: 4,
          domain: 'mikage_application'
        },
        validations: ['canon_registry_compliance', 'prompt_canon_compliance', 'visual_authority_compliance']
      });

      return {
        valid: validationResult.valid,
        issues: validationResult.issues,
        warnings: validationResult.warnings,
        registryVersion: validationResult.registryVersion
      };
    } catch (error) {
      return {
        valid: false,
        issues: [{
          type: 'prompt_validation_error',
          severity: 'error',
          message: `Prompt validation error: ${error instanceof Error ? error.message : String(error)}`,
          location: 'prompt_input',
          stage: 'prompt'
        }],
        warnings: [],
        registryVersion: 'v1.0'
      };
    }
  }

  /**
   * Validate visual tokens only (scaffold)
   */
  async validateVisualTokens(input: {
    visual_config?: {
      authority_level: number;
      domain?: string;
      style_rules?: string[];
    };
  }): Promise<{ valid: boolean; issues: ValidationIssue[]; warnings: ValidationIssue[]; registryVersion?: string }> {
    // TODO: Implement visual tokens validation when visual authority is integrated
    return {
      valid: true,
      issues: [],
      warnings: [],
      registryVersion: 'v1.0'
    };
  }

  /**
   * Validate style profile only (scaffold)
   */
  async validateStyleProfile(input: {
    visual_config?: {
      authority_level: number;
      domain?: string;
      style_rules?: string[];
    };
  }): Promise<{ valid: boolean; issues: ValidationIssue[]; warnings: ValidationIssue[]; registryVersion?: string }> {
    // TODO: Implement style profile validation when visual authority is integrated
    return {
      valid: true,
      issues: [],
      warnings: [],
      registryVersion: 'v1.0'
    };
  }
}

// Export singleton instance for convenience
export const canonGuard = new CanonGuard();

// Export convenience functions
export const validateAll = (input: any) => canonGuard.validateAll(input);
export const validatePrompt = (prompt: any) => canonGuard.validatePrompt(prompt);
export const validateGenerationTask = (task: any) => canonGuard.validateGenerationTask(task);
export const validateVisualTokens = (input: any) => canonGuard.validateVisualTokens(input);
export const validateStyleProfile = (input: any) => canonGuard.validateStyleProfile(input);
