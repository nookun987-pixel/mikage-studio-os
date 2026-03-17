/**
 * Standalone pipeline runtime for testing without external dependencies
 */

import type { 
  PipelineRequest,
  PipelineResult
} from './types.js';

/**
 * Mock generation provider
 */
class MockGenerationProvider {
  readonly name = 'mock-generation-provider';
  readonly type = 'mock' as const;
  readonly capabilities = ['image', 'text', 'mock'];

  async generate(request: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return {
      success: true,
      assetId: `mock_asset_${request.requestId}_${Date.now()}`,
      mimeType: 'image/png',
      storageUri: `mock://assets/${request.requestId}/${Date.now()}`,
      metadata: {
        provider: this.name,
        generatedAt: new Date().toISOString(),
        mockData: true
      },
      generationTime: 50,
      provider: this.name
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

/**
 * Mock asset registry provider
 */
class MockAssetRegistryProvider {
  readonly name = 'mock-asset-registry';
  readonly type = 'mock' as const;

  async lookupCharacter(id: string): Promise<any> {
    const mockCharacters: Record<string, any> = {
      'lyra_0': {
        id: 'lyra_0',
        name: 'Lyra',
        description: 'Luminous character with imperial majesty',
        confidence: 0.95,
        provenance: 'canon_character_database'
      }
    };
    return mockCharacters[id] || {
      id,
      name: `Unknown Character ${id}`,
      description: 'Character not found in canon',
      confidence: 0.0,
      provenance: 'mock_fallback'
    };
  }

  async lookupEnvironment(id: string): Promise<any> {
    const mockEnvironments: Record<string, any> = {
      'white_monolith_core': {
        id: 'white_monolith_core',
        name: 'White Monolith Core',
        domain: 'white_monolith',
        description: 'Central area of the White Monolith',
        confidence: 0.95,
        provenance: 'canon_environment_database'
      }
    };
    return mockEnvironments[id] || {
      id,
      name: `Unknown Environment ${id}`,
      domain: 'unknown',
      description: 'Environment not found in canon',
      confidence: 0.0,
      provenance: 'mock_fallback'
    };
  }

  async lookupStyle(id: string): Promise<any> {
    const mockStyles: Record<string, any> = {
      'mikage_luminous_palette': {
        id: 'mikage_luminous_palette',
        name: 'Mikage Luminous Palette',
        category: 'mikage_palette',
        description: 'Official Mikage color palette',
        weight: 0.8,
        confidence: 0.95,
        provenance: 'canon_style_database'
      }
    };
    return mockStyles[id] || {
      id,
      name: `Unknown Style ${id}`,
      category: 'unknown',
      description: 'Style not found in canon',
      weight: 0.5,
      confidence: 0.0,
      provenance: 'mock_fallback'
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

/**
 * Mock canon guard
 */
class MockCanonGuard {
  async validateAll(input: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      valid: true,
      issues: [],
      warnings: [],
      stage: 'canon_validation',
      registryVersion: '1.0.0',
      requestCode: input.requestCode || 'mock_request'
    };
  }
}

/**
 * Standalone pipeline runtime
 */
export class StandalonePipelineRuntime {
  private generationProvider: MockGenerationProvider;
  private assetRegistryProvider: MockAssetRegistryProvider;
  private canonGuard: MockCanonGuard;

  constructor() {
    this.generationProvider = new MockGenerationProvider();
    this.assetRegistryProvider = new MockAssetRegistryProvider();
    this.canonGuard = new MockCanonGuard();
  }

  async executePipeline(request: PipelineRequest, mode: 'dry-run' | 'validation-run' | 'compile-run' | 'full-run' = 'dry-run'): Promise<PipelineResult> {
    const startTime = Date.now();
    const resultId = `result_${request.request_id}_${startTime}`;

    try {
      // Stage 1: Request parsing and normalization
      const normalizedRequest = this.parseAndNormalizeRequest(request);

      // Stage 2: Reference and asset selection
      const selectedReferences = await this.selectReferences(normalizedRequest);

      // Stage 3: Prompt compilation
      const compiledPrompt = await this.compilePrompt(normalizedRequest, selectedReferences);

      // Stage 4: Pre-generation validation
      const preValidationResult = await this.runPreValidation(normalizedRequest, compiledPrompt);

      if (preValidationResult.validation_status === 'failed' && mode !== 'dry-run') {
        return this.createValidationFailedResult(resultId, request, preValidationResult, startTime);
      }

      // Stage 5: Generation handoff
      let engineResult = null;
      if (mode === 'full-run') {
        engineResult = await this.handoffToEngine(normalizedRequest, compiledPrompt, selectedReferences);
      } else {
        engineResult = this.createMockEngineResult(mode);
      }

      // Stage 6: Post-generation validation
      let postValidationResult = null;
      if (mode === 'full-run' && engineResult.generation_status === 'completed') {
        postValidationResult = await this.runPostValidation(engineResult, normalizedRequest);
      }

      // Stage 7: Decision routing
      const retryFallbackRecommendation = this.generateRetryFallbackRecommendation(
        preValidationResult,
        postValidationResult,
        engineResult
      );

      // Stage 8: Final packaging
      return this.createPipelineResult(
        resultId,
        request,
        selectedReferences,
        compiledPrompt,
        preValidationResult,
        engineResult,
        postValidationResult,
        retryFallbackRecommendation,
        startTime
      );

    } catch (error) {
      return this.createErrorResult(resultId, request, error, startTime);
    }
  }

  private parseAndNormalizeRequest(request: PipelineRequest): PipelineRequest {
    return {
      ...request,
      request_metadata: {
        ...request.request_metadata
      }
    };
  }

  private async selectReferences(request: PipelineRequest): Promise<any> {
    const selectedReferences = {
      character_references: request.references?.character_references?.map((ref: any) => ({
        ...ref,
        used_in_generation: true,
        confidence: ref.confidence || 0.8
      })) || [],
      environment_references: request.references?.environment_references?.map((ref: any) => ({
        ...ref,
        used_in_generation: true,
        confidence: 0.9
      })) || [],
      style_references: request.references?.style_references?.map((ref: any) => ({
        ...ref,
        used_in_generation: true,
        weight: ref.weight || 0.7
      })) || []
    };

    return selectedReferences;
  }

  private async compilePrompt(request: PipelineRequest, references: any): Promise<any> {
    const basePrompt = request.prompt_intent.description;
    const compiledStages = [
      {
        stage_name: 'base_construction',
        input_prompt: basePrompt,
        output_prompt: basePrompt,
        modifications: [],
        confidence: 1.0
      },
      {
        stage_name: 'reference_integration',
        input_prompt: basePrompt,
        output_prompt: this.integrateReferences(basePrompt, references),
        modifications: ['added_character_references', 'added_environment_context'],
        confidence: 0.9
      },
      {
        stage_name: 'style_application',
        input_prompt: this.integrateReferences(basePrompt, references),
        output_prompt: this.applyStyleConstraints(this.integrateReferences(basePrompt, references), request),
        modifications: ['applied_mikage_palette', 'applied_composition_rules'],
        confidence: 0.85
      }
    ];

    return {
      final_prompt: compiledStages[compiledStages.length - 1].output_prompt,
      compilation_stages: compiledStages,
      applied_constraints: this.extractAppliedConstraints(request),
      generation_parameters: request.asset_hints?.generation_parameters || {
        sampler: 'DPM++ 2M Karras',
        steps: 30,
        cfg_scale: 7.0
      }
    };
  }

  private async runPreValidation(request: PipelineRequest, compiledPrompt: any): Promise<any> {
    const validationChecks = [
      {
        check_name: 'canon_compliance',
        check_type: 'canon_compliance',
        status: 'pass',
        confidence: 0.9,
        issues: []
      },
      {
        check_name: 'style_guardrails',
        check_type: 'style_guardrails',
        status: 'pass',
        confidence: 0.85,
        issues: []
      },
      {
        check_name: 'character_identity',
        check_type: 'character_identity',
        status: 'pass',
        confidence: 0.95,
        issues: []
      }
    ];

    const hasBlockingIssues = validationChecks.some(check => check.status === 'fail');
    const overallConfidence = validationChecks.reduce((sum, check) => sum + check.confidence, 0) / validationChecks.length;

    return {
      validation_status: hasBlockingIssues ? 'failed' : 'passed',
      confidence_score: overallConfidence,
      validation_checks: validationChecks,
      blocking_issues: hasBlockingIssues ? [{
        issue_id: `block_${request.request_id}`,
        issue_type: 'canon_violation',
        severity: 'critical',
        description: 'Critical canon violation detected',
        blocks_generation: true,
        resolution_required: 'Review and fix canon compliance issues'
      }] : []
    };
  }

  private async handoffToEngine(request: PipelineRequest, compiledPrompt: any, references: any): Promise<any> {
    const engineRequest = {
      requestId: request.request_id,
      prompt: compiledPrompt.final_prompt,
      parameters: compiledPrompt.generation_parameters,
      metadata: {
        mode: request.mode,
        references: references
      }
    };

    try {
      const engineResult = await this.generationProvider.generate(engineRequest);
      
      return {
        generation_status: engineResult.success ? 'completed' : 'failed',
        asset_id: engineResult.assetId,
        asset_uri: engineResult.storageUri,
        mime_type: engineResult.mimeType,
        generation_time_ms: engineResult.generationTime,
        provider_used: engineResult.provider,
        metadata: engineResult.metadata,
        quality_metrics: {
          technical_quality: 0.85,
          artistic_quality: 0.8,
          canon_compliance: 0.9
        }
      };
    } catch (error) {
      return {
        generation_status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown generation error'
      };
    }
  }

  private async runPostValidation(engineResult: any, request: PipelineRequest): Promise<any> {
    return {
      validation_status: 'passed',
      confidence_score: 0.85,
      quality_assessment: {
        overall_score: 0.85,
        technical_score: 0.9,
        artistic_score: 0.8,
        canon_compliance_score: 0.85
      },
      validation_checks: [
        {
          check_name: 'visual_analysis',
          check_type: 'visual_analysis',
          status: 'pass',
          confidence: 0.8,
          issues: []
        },
        {
          check_name: 'canon_verification',
          check_type: 'canon_verification',
          status: 'pass',
          confidence: 0.85,
          issues: []
        }
      ]
    };
  }

  private generateRetryFallbackRecommendation(
    preValidation: any,
    postValidation: any,
    engineResult: any
  ): any {
    const generationSuccessful = engineResult?.generation_status === 'completed';
    const validationPassed = (!preValidation || preValidation.validation_status === 'passed') &&
                            (!postValidation || postValidation.validation_status === 'passed');

    if (generationSuccessful && validationPassed) {
      return {
        final_decision: 'accepted',
        retry_eligible: false,
        max_retries: 0,
        current_attempt: 0,
        success_probability: 1.0
      };
    }

    return {
      final_decision: 'retry',
      retry_eligible: true,
      max_retries: 3,
      current_attempt: 0,
      retry_strategy: 'parameter_adjustment',
      fallback_eligible: true,
      fallback_strategy: 'conservative_generation',
      success_probability: 0.7
    };
  }

  private createPipelineResult(
    resultId: string,
    request: PipelineRequest,
    selectedReferences: any,
    compiledPrompt: any,
    preValidation: any,
    engineResult: any,
    postValidation: any,
    retryFallback: any,
    startTime: number
  ): PipelineResult {
    const completedAt = new Date().toISOString();
    const totalTime = Date.now() - startTime;

    return {
      result_id: resultId,
      request_metadata: {
        request_id: request.request_id,
        mode: request.mode,
        requested_at: new Date().toISOString(),
        initiated_at: new Date(startTime).toISOString(),
        completed_at: completedAt
      },
      selected_references: selectedReferences,
      compiled_prompt: compiledPrompt,
      pre_validation_results: preValidation,
      engine_result: engineResult,
      post_validation_results: postValidation,
      retry_fallback_recommendation: retryFallback,
      final_status: {
        status: retryFallback.final_decision === 'accepted' ? 'completed' : 'failed',
        success: retryFallback.final_decision === 'accepted',
        total_processing_time_ms: totalTime,
        stage_breakdown: {
          reference_selection_ms: 100,
          prompt_compilation_ms: 200,
          pre_validation_ms: 300,
          generation_ms: engineResult?.generation_time_ms || 0,
          post_validation_ms: postValidation ? 150 : 0
        }
      }
    };
  }

  private createValidationFailedResult(resultId: string, request: PipelineRequest, validation: any, startTime: number): PipelineResult {
    return {
      result_id: resultId,
      request_metadata: {
        request_id: request.request_id,
        mode: request.mode,
        requested_at: new Date().toISOString(),
        initiated_at: new Date(startTime).toISOString(),
        completed_at: new Date().toISOString()
      },
      selected_references: {},
      compiled_prompt: {
        final_prompt: '',
        compilation_stages: [],
        applied_constraints: []
      },
      pre_validation_results: validation,
      engine_result: {
        generation_status: 'cancelled'
      },
      post_validation_results: undefined,
      retry_fallback_recommendation: {
        final_decision: 'rejected',
        retry_eligible: false,
        max_retries: 0,
        current_attempt: 0
      },
      final_status: {
        status: 'failed',
        success: false,
        total_processing_time_ms: Date.now() - startTime,
        stage_breakdown: {
          reference_selection_ms: 0,
          prompt_compilation_ms: 0,
          pre_validation_ms: Date.now() - startTime,
          generation_ms: 0,
          post_validation_ms: 0
        }
      }
    };
  }

  private createErrorResult(resultId: string, request: PipelineRequest, error: any, startTime: number): PipelineResult {
    return {
      result_id: resultId,
      request_metadata: {
        request_id: request.request_id,
        mode: request.mode,
        requested_at: new Date().toISOString(),
        initiated_at: new Date(startTime).toISOString(),
        completed_at: new Date().toISOString()
      },
      selected_references: {},
      compiled_prompt: {
        final_prompt: '',
        compilation_stages: [],
        applied_constraints: []
      },
      pre_validation_results: {
        validation_status: 'failed',
        confidence_score: 0,
        validation_checks: [],
        blocking_issues: []
      },
      engine_result: {
        generation_status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      post_validation_results: undefined,
      retry_fallback_recommendation: {
        final_decision: 'rejected',
        retry_eligible: true,
        max_retries: 3,
        current_attempt: 0
      },
      final_status: {
        status: 'failed',
        success: false,
        total_processing_time_ms: Date.now() - startTime,
        stage_breakdown: {
          reference_selection_ms: 0,
          prompt_compilation_ms: 0,
          pre_validation_ms: 0,
          generation_ms: 0,
          post_validation_ms: 0
        }
      }
    };
  }

  private createMockEngineResult(mode: string): any {
    if (mode === 'dry-run') {
      return {
        generation_status: 'mock',
        mock_data: true,
        note: 'Dry run mode - no actual generation performed'
      };
    }
    
    return {
      generation_status: 'mock',
      mock_data: true,
      note: `${mode} mode - generation handoff prepared but not executed`
    };
  }

  private integrateReferences(basePrompt: string, references: any): string {
    let enhancedPrompt = basePrompt;
    
    if (references.character_references?.length > 0) {
      enhancedPrompt += ' with character references';
    }
    
    if (references.environment_references?.length > 0) {
      enhancedPrompt += ' in appropriate environment';
    }
    
    return enhancedPrompt;
  }

  private applyStyleConstraints(prompt: string, request: PipelineRequest): string {
    return `${prompt}, following Mikage canon style guidelines`;
  }

  private extractAppliedConstraints(request: PipelineRequest): any[] {
    return [
      {
        constraint_type: 'canon_compliance',
        constraint_value: 'mikage_canon',
        applied: true,
        impact: 'Applied Mikage canon compliance rules'
      }
    ];
  }
}

// Export singleton instance
export const standalonePipelineRuntime = new StandalonePipelineRuntime();
