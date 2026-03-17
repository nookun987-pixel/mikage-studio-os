/**
 * @package @mikage/runtime-types
 * @wave Shared Runtime Types
 *
 * index.ts
 */

/**
 * Pipeline request interface
 */
export interface PipelineRequest {
  request_id: string;
  mode: string;
  prompt_intent: {
    primary_intent: string;
    description: string;
    key_elements?: string[];
    style_notes?: string;
  };
  references?: {
    character_references?: Array<{
      character_id: string;
      reference_type: string;
      confidence?: number;
    }>;
    environment_references?: Array<{
      environment_id: string;
      domain: string;
      time_period?: string;
    }>;
    style_references?: Array<{
      style_id: string;
      style_category: string;
      weight?: number;
    }>;
  };
  asset_hints?: {
    resolution?: {
      width?: number;
      height?: number;
      aspect_ratio?: string;
    };
    quality_level?: string;
    generation_parameters?: {
      sampler?: string;
      steps?: number;
      cfg_scale?: number;
      seed?: number;
    };
  };
  validation_options?: {
    strict_mode?: boolean;
    validation_level?: string;
    forbidden_elements?: string[];
    required_elements?: string[];
  };
  output_expectations?: {
    output_format?: string;
    metadata_requirements?: string[];
    delivery_options?: {
      include_references?: boolean;
      include_validation_report?: boolean;
      include_generation_log?: boolean;
    };
  };
  request_metadata?: {
    requested_by?: string;
    project_id?: string;
    session_id?: string;
    priority?: string;
    deadline?: string;
    tags?: string[];
  };
}

/**
 * Pipeline result interface
 */
export interface PipelineResult {
  result_id: string;
  request_metadata: {
    request_id: string;
    mode: string;
    requested_at: string;
    initiated_at: string;
    completed_at: string;
  };
  selected_references: {
    character_references?: Array<{
      character_id: string;
      reference_type: string;
      confidence: number;
      used_in_generation: boolean;
    }>;
    environment_references?: Array<{
      environment_id: string;
      domain: string;
      confidence: number;
      used_in_generation: boolean;
    }>;
    style_references?: Array<{
      style_id: string;
      style_category: string;
      weight: number;
      used_in_generation: boolean;
    }>;
  };
  compiled_prompt: {
    final_prompt: string;
    compilation_stages: Array<{
      stage_name: string;
      input_prompt: string;
      output_prompt: string;
      modifications: string[];
      confidence: number;
    }>;
    applied_constraints: Array<{
      constraint_type: string;
      constraint_value: string;
      applied: boolean;
      impact?: string;
    }>;
    generation_parameters?: {
      sampler?: string;
      steps?: number;
      cfg_scale?: number;
      seed?: number;
    };
  };
  pre_validation_results: {
    validation_status: string;
    confidence_score: number;
    validation_checks: Array<{
      check_name: string;
      check_type: string;
      status: string;
      confidence: number;
      issues?: Array<{
        issue_type: string;
        severity: string;
        description: string;
        resolution?: string;
      }>;
    }>;
    blocking_issues?: Array<{
      issue_id: string;
      issue_type: string;
      severity: string;
      description: string;
      blocks_generation: boolean;
      resolution_required: string;
    }>;
  };
  engine_result?: {
    generation_status: string;
    asset_id?: string;
    asset_uri?: string;
    mime_type?: string;
    generation_time_ms?: number;
    provider_used?: string;
    metadata?: any;
    quality_metrics?: {
      technical_quality?: number;
      artistic_quality?: number;
      canon_compliance?: number;
    };
    error?: string;
  };
  post_validation_results?: {
    validation_status: string;
    confidence_score: number;
    quality_assessment: {
      overall_score: number;
      technical_score?: number;
      artistic_score?: number;
      canon_compliance_score?: number;
    };
    validation_checks: Array<{
      check_name: string;
      check_type: string;
      status: string;
      confidence: number;
      issues?: Array<{
        issue_type: string;
        severity: string;
        description: string;
        resolution?: string;
      }>;
    }>;
  };
  retry_fallback_recommendation: {
    final_decision: string;
    retry_eligible: boolean;
    max_retries: number;
    current_attempt: number;
    retry_strategy?: string;
    fallback_eligible?: boolean;
    fallback_strategy?: string;
    success_probability?: number;
  };
  final_status: {
    status: string;
    success: boolean;
    total_processing_time_ms: number;
    stage_breakdown: {
      reference_selection_ms: number;
      prompt_compilation_ms: number;
      pre_validation_ms: number;
      generation_ms: number;
      post_validation_ms: number;
    };
  };
}

/**
 * Provider interfaces
 */
export interface GenerationProvider {
  readonly name: string;
  readonly type: 'mock' | 'real';
  readonly capabilities: string[];
  
  generate(request: GenerationRequest): Promise<GenerationResponse>;
  healthCheck(): Promise<boolean>;
}

export interface AssetRegistryProvider {
  readonly name: string;
  readonly type: 'mock' | 'real';
  
  lookupCharacter(id: string): Promise<CharacterReference>;
  lookupEnvironment(id: string): Promise<EnvironmentReference>;
  lookupStyle(id: string): Promise<StyleReference>;
  healthCheck(): Promise<boolean>;
}

/**
 * Generation request/response interfaces
 */
export interface GenerationRequest {
  requestId: string;
  prompt: string;
  parameters: {
    sampler?: string;
    steps?: number;
    cfg?: number;
    seed?: number;
  };
  metadata?: Record<string, any>;
}

export interface GenerationResponse {
  success: boolean;
  assetId?: string;
  mimeType?: string;
  storageUri?: string;
  metadata?: Record<string, any>;
  generationTime?: number;
  provider?: string;
  error?: string;
}

/**
 * Reference interfaces
 */
export interface CharacterReference {
  id: string;
  name: string;
  description: string;
  appearance: Record<string, any>;
  personality: Record<string, any>;
  confidence: number;
  provenance: string;
}

export interface EnvironmentReference {
  id: string;
  name: string;
  domain: string;
  description: string;
  characteristics: Record<string, any>;
  confidence: number;
  provenance: string;
}

export interface StyleReference {
  id: string;
  name: string;
  category: string;
  description: string;
  rules: Record<string, any>;
  weight: number;
  confidence: number;
  provenance: string;
}

/**
 * Validation interfaces
 */
export interface ValidationResult {
  status: 'passed' | 'failed' | 'warning';
  confidence: number;
  issues: ValidationIssue[];
  blocking_issues: BlockingIssue[];
}

export interface ValidationIssue {
  issue_id: string;
  issue_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  source: string;
  can_auto_correct: boolean;
  requires_manual_intervention: boolean;
}

export interface BlockingIssue {
  issue_id: string;
  issue_type: string;
  severity: 'high' | 'critical';
  description: string;
  source: string;
  blocks_generation: boolean;
  requires_manual_intervention: boolean;
  resolution_path: {
    immediate_action?: string;
    escalation_required: boolean;
    escalation_level?: number;
    estimated_resolution_time?: string;
  };
}
