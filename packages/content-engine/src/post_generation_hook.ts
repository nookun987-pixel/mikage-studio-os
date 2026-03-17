/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * post_generation_hook.ts
 */

import { CanonGuard } from '@mikage/canon-validator';
import type { CanonValidationInput } from '@mikage/contracts';
import type { 
  PostGenerationHook, 
  GenerationRequest, 
  GenerationResponse,
  PostGenerationValidationResult,
  ValidationWarning 
} from './types.js';

/**
 * Implementation of post-generation validation hook
 * Handles canon/style/asset validation after generation
 */
export class PostGenerationHookImpl implements PostGenerationHook {
  private canonGuard: CanonGuard;

  constructor(canonGuard: CanonGuard) {
    this.canonGuard = canonGuard;
  }

  /**
   * Validate generation result after processing
   */
  async validate(
    request: GenerationRequest, 
    generationResult: GenerationResponse
  ): Promise<PostGenerationValidationResult> {
    const startTime = Date.now();

    try {
      if (!generationResult.success) {
        return {
          status: 'rejected',
          confidence: 0,
          issues: [{
            issueId: `generation_failed_${request.requestId}`,
            type: 'generation_failure',
            severity: 'critical',
            message: generationResult.error || 'Generation failed',
            source: 'generation_provider',
            canAutoCorrect: false,
            requiresManualIntervention: true
          }],
          blockingIssues: [{
            issueId: `gen_block_${request.requestId}`,
            issueType: 'generation_failure',
            severity: 'critical',
            description: generationResult.error || 'Generation failed',
            source: 'generation_provider',
            blocksGeneration: true,
            requiresManualIntervention: true,
            resolutionPath: {
              immediateAction: 'retry_generation',
              escalationRequired: false,
              escalationLevel: 2,
              estimatedResolutionTime: '5 minutes'
            }
          }],
          warnings: [],
          validationTime: Date.now() - startTime
        };
      }

      // Convert to canon validation input for post-generation validation
      const canonInput = this.convertToPostGenerationCanonInput(request, generationResult);

      // Execute canon validation on generated content
      const validationResult = await this.canonGuard.validateAll(canonInput);

      // Extract and normalize results
      const issues = this.extractIssues(validationResult, request.requestId);
      const blockingIssues = this.extractBlockingIssues(validationResult, request.requestId);
      const warnings = this.extractWarnings(validationResult, request.requestId);

      // Perform specific post-generation checks
      const canonComplianceScore = await this.checkCanonCompliance(generationResult);
      const styleComplianceScore = await this.checkStyleCompliance(generationResult);
      const assetQualityScore = await this.checkAssetQuality(generationResult);

      // Calculate overall quality score
      const qualityScore = this.calculateQualityScore(
        canonComplianceScore,
        styleComplianceScore,
        assetQualityScore
      );

      // Determine overall status
      const status = this.determinePostGenerationStatus(
        validationResult.valid,
        qualityScore,
        blockingIssues
      );

      const validationTime = Date.now() - startTime;

      return {
        status,
        confidence: this.calculatePostGenerationConfidence(
          validationResult.valid,
          qualityScore,
          canonComplianceScore,
          styleComplianceScore,
          assetQualityScore
        ),
        issues,
        blockingIssues,
        warnings,
        qualityScore,
        canonCompliance: canonComplianceScore,
        validationTime
      };

    } catch (error) {
      return {
        status: 'rejected',
        confidence: 0,
        issues: [{
          issueId: `post_validation_error_${request.requestId}`,
          type: 'validation_error',
          severity: 'critical',
          message: error instanceof Error ? error.message : 'Unknown post-validation error',
          source: 'post_generation_hook',
          canAutoCorrect: false,
          requiresManualIntervention: true
        }],
        blockingIssues: [{
          issueId: `post_validation_block_${request.requestId}`,
          issueType: 'validation_failure',
          severity: 'critical',
          description: `Post-generation validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          source: 'post_generation_hook',
          blocksGeneration: true,
          requiresManualIntervention: true,
          resolutionPath: {
            immediateAction: 'investigate_post_validation_error',
            escalationRequired: true,
            escalationLevel: 3,
            estimatedResolutionTime: '30 minutes'
          }
        }],
        warnings: [],
        validationTime: Date.now() - startTime
      };
    }
  }

  /**
   * Check canon compliance of generated content
   */
  async checkCanonCompliance(generationResult: GenerationResponse): Promise<number> {
    // Scaffolded: Check canon compliance of generated content
    // This would include:
    // - Visual analysis for canon elements
    // - Character accuracy verification
    // - Location accuracy verification
    // - Style compliance checking
    // - Canon terminology usage

    if (!generationResult.success) {
      return 0.0;
    }

    // For now, return a simulated compliance score
    // In a real implementation, this would analyze the generated asset
    const baseScore = 0.85;
    
    // Simulate some variation based on generation parameters
    const variation = Math.random() * 0.1 - 0.05; // ±5% variation
    
    return Math.max(0.0, Math.min(1.0, baseScore + variation));
  }

  /**
   * Check style compliance of generated content
   */
  async checkStyleCompliance(generationResult: GenerationResponse): Promise<number> {
    // Scaffolded: Check style compliance of generated content
    // This would include:
    // - Visual style analysis
    // - Color palette compliance
    // - Composition style checking
    // - Art style consistency
    // - Style guide adherence

    if (!generationResult.success) {
      return 0.0;
    }

    // Simulate style compliance score
    const baseScore = 0.90;
    const variation = Math.random() * 0.08 - 0.04; // ±4% variation
    
    return Math.max(0.0, Math.min(1.0, baseScore + variation));
  }

  /**
   * Check asset quality of generated content
   */
  async checkAssetQuality(generationResult: GenerationResponse): Promise<number> {
    // Scaffolded: Check technical and artistic quality
    // This would include:
    // - Technical quality (resolution, artifacts, etc.)
    // - Artistic quality (composition, lighting, etc.)
    // - Prompt adherence
    // - Overall aesthetic appeal
    // - Generation consistency

    if (!generationResult.success) {
      return 0.0;
    }

    // Simulate quality score based on generation metadata
    let baseScore = 0.80;

    // Adjust based on generation parameters
    if (generationResult.metadata?.parameters) {
      const params = generationResult.metadata.parameters;
      
      // Higher steps generally mean better quality
      if (params.steps && params.steps > 20) {
        baseScore += 0.05;
      }
      
      // Reasonable CFG range
      if (params.cfg && params.cfg >= 6 && params.cfg <= 8) {
        baseScore += 0.03;
      }
    }

    const variation = Math.random() * 0.1 - 0.05; // ±5% variation
    
    return Math.max(0.0, Math.min(1.0, baseScore + variation));
  }

  /**
   * Helper methods
   */
  private convertToPostGenerationCanonInput(
    request: GenerationRequest, 
    generationResult: GenerationResponse
  ): any {
    return {
      requestCode: `${request.requestId}_post`,
      compiledPrompt: {
        validation: {
          issues: [],
          valid: true
        },
        requestCode: `${request.requestId}_post`,
        compileMode: "production_prompt",
        negativePrompt: {
          clauses: [],
          rendered: ""
        },
        lineage: {
          promptHash: "",
          lineage: []
        },
        sections: [],
        compiledPrompt: request.productionPackage.promptPack.prompts.join(', ')
      },
      queryMode: 'advisory',
      metadata: {
        generation_mode: 'post_generation_validation',
        asset_uri: generationResult.storageUri,
        validation_type: 'post_generation',
        objective: request.productionPackage.objective,
        generatedAssetId: generationResult.assetId,
        generationProvider: generationResult.provider,
        generationTime: generationResult.generationTime
      }
    };
  }

  private extractIssues(validationResult: any, requestId: string): any[] {
    if (validationResult.issues) {
      return validationResult.issues.map((issue: any, index: number) => ({
        issueId: `post_issue_${requestId}_${index}`,
        type: issue.type || 'post_validation_issue',
        severity: this.mapSeverity(issue.severity),
        message: issue.message,
        source: 'canon_validator',
        canAutoCorrect: issue.canAutoCorrect || false,
        requiresManualIntervention: issue.requiresManualIntervention || false
      }));
    }
    return [];
  }

  private extractBlockingIssues(validationResult: any, requestId: string): any[] {
    if (validationResult.issues) {
      return validationResult.issues
        .filter((issue: any) => issue.severity === 'error' || issue.severity === 'critical')
        .map((issue: any, index: number) => ({
          issueId: `post_blocking_${requestId}_${index}`,
          issueType: issue.type || 'post_canon_violation',
          severity: 'critical',
          description: issue.message,
          source: 'canon_validator',
          blocksGeneration: true,
          requiresManualIntervention: issue.severity === 'critical',
          resolutionPath: {
            immediateAction: issue.resolutionAction || 'regenerate_with_adjustments',
            escalationRequired: issue.severity === 'critical',
            escalationLevel: this.calculateEscalationLevel(issue),
            estimatedResolutionTime: this.estimateResolutionTime(issue)
          }
        }));
    }
    return [];
  }

  private extractWarnings(validationResult: any, requestId: string): ValidationWarning[] {
    if (validationResult.warnings) {
      return validationResult.warnings.map((warning: any, index: number) => ({
        warningId: `post_warning_${requestId}_${index}`,
        warningType: warning.type || 'post_generation_warning',
        severity: this.mapWarningSeverity(warning.severity),
        message: warning.message,
        source: 'canon_validator',
        recommendation: warning.recommendation || 'review_generation_quality'
      }));
    }
    return [];
  }

  private calculateQualityScore(
    canonCompliance: number,
    styleCompliance: number,
    assetQuality: number
  ): number {
    // Weighted average of different quality aspects
    const weights = {
      canonCompliance: 0.4,
      styleCompliance: 0.3,
      assetQuality: 0.3
    };

    return (
      canonCompliance * weights.canonCompliance +
      styleCompliance * weights.styleCompliance +
      assetQuality * weights.assetQuality
    );
  }

  private determinePostGenerationStatus(
    canonValid: boolean,
    qualityScore: number,
    blockingIssues: any[]
  ): 'accepted' | 'rejected' | 'retry' | 'fallback' {
    if (blockingIssues.length > 0) {
      return 'rejected';
    }

    if (!canonValid) {
      return 'retry';
    }

    if (qualityScore < 0.6) {
      return 'fallback';
    }

    if (qualityScore < 0.8) {
      return 'retry';
    }

    return 'accepted';
  }

  private calculatePostGenerationConfidence(
    canonValid: boolean,
    qualityScore: number,
    canonCompliance: number,
    styleCompliance: number,
    assetQuality: number
  ): number {
    let confidence = 0.0;

    if (canonValid) confidence += 0.4;
    confidence += qualityScore * 0.3;
    confidence += canonCompliance * 0.1;
    confidence += styleCompliance * 0.1;
    confidence += assetQuality * 0.1;

    return Math.min(confidence, 1.0);
  }

  private mapSeverity(severity: string): 'low' | 'medium' | 'high' | 'critical' {
    const severityMap: Record<string, 'low' | 'medium' | 'high' | 'critical'> = {
      'info': 'low',
      'warning': 'medium',
      'error': 'high',
      'critical': 'critical'
    };
    return severityMap[severity] || 'medium';
  }

  private mapWarningSeverity(severity: string): 'low' | 'medium' | 'high' {
    const severityMap: Record<string, 'low' | 'medium' | 'high'> = {
      'info': 'low',
      'warning': 'medium',
      'error': 'high'
    };
    return severityMap[severity] || 'medium';
  }

  private calculateEscalationLevel(issue: any): number {
    // Post-generation issues might have different escalation levels
    if (issue.type === 'canon_violation') {
      return 4;
    }
    if (issue.type === 'quality_issue') {
      return 2;
    }
    return 3;
  }

  private estimateResolutionTime(issue: any): string {
    const timeMap: Record<string, string> = {
      'canon_violation': '45 minutes',
      'quality_issue': '15 minutes',
      'style_drift': '20 minutes',
      'technical_artifact': '10 minutes'
    };
    return timeMap[issue.type] || '20 minutes';
  }
}
