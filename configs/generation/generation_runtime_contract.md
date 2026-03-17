# Generation Runtime Contract

## Overview

This document defines the contract between generation clients and the Mikage Studio OS generation runtime, specifying required inputs, expected outputs, and integration points with asset-system and style-guardrails.

## Version Information

- **Contract Version**: 1.0.0
- **Last Updated**: 2026-03-17T00:00:00Z
- **Compatible Runtime Versions**: 1.0.0+

## Required Inputs

### Generation Request Object

```typescript
interface GenerationRequest {
  // Core identification
  request_id: string;
  session_id: string;
  timestamp: string;
  
  // Generation specification
  mode_id: "canon_core" | "luminous_fan_appeal" | "luxury_mystical_editorial";
  character_ids: string[];
  location_ids?: string[];
  objective_id?: string;
  
  // Asset references
  asset_references: {
    character_assets: AssetReference[];
    environment_assets?: AssetReference[];
    material_assets?: AssetReference[];
  };
  
  // Prompt configuration
  prompt_config: {
    preset_id?: string;
    variant_id?: string;
    overrides?: PromptOverrides;
  };
  
  // Technical parameters
  technical_config: {
    seed_policy?: string;
    sampler?: string;
    steps?: number;
    cfg?: number;
    batch_size?: number;
  };
  
  // Validation requirements
  validation_config: {
    skip_validation?: boolean;
    custom_validation_rules?: string[];
    validation_thresholds?: ValidationThresholds;
  };
}
```

### Asset Reference Object

```typescript
interface AssetReference {
  asset_id: string;
  asset_type: "mask" | "armor" | "weapon" | "environment" | "material" | "silhouette";
  asset_class: "canonical" | "approved" | "reference" | "candidate";
  weight: number;
  required: boolean;
  metadata?: Record<string, any>;
}
```

### Prompt Overrides Object

```typescript
interface PromptOverrides {
  append_positive?: string;
  append_negative?: string;
  style_bias?: string;
  intensity?: number;
  camera?: string;
  custom_blocks?: PromptBlock[];
}
```

## Required Outputs

### Generation Response Object

```typescript
interface GenerationResponse {
  // Response identification
  request_id: string;
  session_id: string;
  timestamp: string;
  generation_duration: number;
  
  // Generation results
  results: GenerationResult[];
  
  // Metadata and tracking
  metadata: {
    lineage_id: string;
    prompt_hash: string;
    asset_hash: string;
    generation_version: string;
  };
  
  // Validation results
  validation_results: ValidationResult[];
  
  // Status and errors
  status: "success" | "partial_success" | "failed";
  errors?: GenerationError[];
  warnings?: GenerationWarning[];
}
```

### Generation Result Object

```typescript
interface GenerationResult {
  mode_id: string;
  asset_url: string;
  asset_metadata: {
    file_size: number;
    dimensions: { width: number; height: number };
    format: string;
    quality_score: number;
  };
  
  // Generation parameters used
  generation_parameters: {
    positive_prompt: string;
    negative_prompt: string;
    seed: number;
    sampler: string;
    steps: number;
    cfg: number;
  };
  
  // Asset classification
  classification: {
    asset_class: "canonical" | "approved" | "reference" | "candidate" | "rejected";
    canon_compliance_score: number;
    style_alignment_score: number;
    drift_risk_score: number;
  };
  
  // Review information
  review_info?: {
    score: number;
    classification: "reject" | "interesting_but_non_canon" | "usable_asset" | "canon_candidate";
    note?: string;
    reviewer_id?: string;
    review_timestamp?: string;
  };
}
```

### Validation Result Object

```typescript
interface ValidationResult {
  stage: string;
  validator: string;
  status: "pass" | "warn" | "fail";
  score: number;
  issues: ValidationIssue[];
  recommendations: string[];
  execution_time: number;
}
```

## Minimum Metadata Requirements

### Per Generation Run

Each generation run must include:

```typescript
interface RequiredGenerationMetadata {
  // Identification
  request_id: string;
  lineage_id: string;
  session_id: string;
  
  // Timing
  request_timestamp: string;
  completion_timestamp: string;
  generation_duration: number;
  
  // Mode and configuration
  mode_id: string;
  preset_id?: string;
  variant_id?: string;
  
  // Asset tracking
  asset_references_used: AssetReference[];
  asset_hash: string;
  
  // Prompt tracking
  prompt_hash: string;
  positive_prompt: string;
  negative_prompt: string;
  
  // Technical parameters
  technical_parameters: {
    seed: number;
    sampler: string;
    steps: number;
    cfg: number;
  };
  
  // Validation summary
  validation_summary: {
    overall_status: "pass" | "warn" | "fail";
    canon_compliance_score: number;
    quality_score: number;
    drift_risk_assessment: "low" | "medium" | "high";
  };
}
```

### Per Asset Output

Each generated asset must include:

```typescript
interface RequiredAssetMetadata {
  // Asset identification
  asset_id: string;
  asset_url: string;
  generation_mode: string;
  
  // Technical specifications
  file_specifications: {
    format: string;
    dimensions: { width: number; height: number };
    file_size: number;
    color_space: string;
    dpi?: number;
  };
  
  // Generation parameters
  generation_parameters: {
    positive_prompt: string;
    negative_prompt: string;
    seed: number;
    sampler: string;
    steps: number;
    cfg: number;
  };
  
  // Quality and compliance
  quality_metrics: {
    technical_quality_score: number;
    aesthetic_quality_score: number;
    canon_compliance_score: number;
    style_alignment_score: number;
  };
  
  // Classification and status
  asset_status: {
    classification: string;
    approval_status: "pending" | "approved" | "rejected";
    canon_compliance: boolean;
    drift_risk_level: "low" | "medium" | "high";
  };
}
```

## Expected Validator Outputs

### Canon Registry Validator

```typescript
interface CanonRegistryValidatorOutput {
  validator_name: "canon_registry";
  status: "pass" | "warn" | "fail";
  score: number;
  
  canon_compliance: {
    overall_compliance: boolean;
    authority_level: number;
    violations: CanonViolation[];
  };
  
  mode_compliance: {
    mode_id: string;
    mode_requirements_met: boolean;
    missing_requirements: string[];
  };
  
  reference_validation: {
    reference_style_valid: boolean;
    asset_references_valid: boolean;
    invalid_references: string[];
  };
}
```

### Style Guardrails Validator

```typescript
interface StyleGuardrailsValidatorOutput {
  validator_name: "style_guardrails";
  status: "pass" | "warn" | "fail";
  score: number;
  
  style_analysis: {
    style_alignment_score: number;
    style_violations: StyleViolation[];
    drift_indicators: DriftIndicator[];
  };
  
  aesthetic_check: {
    aesthetic_compliance: boolean;
    aesthetic_issues: string[];
    recommendations: string[];
  };
  
  guardrail_status: {
    all_guardrails_passed: boolean;
    triggered_guardrails: string[];
    prevention_measures_active: string[];
  };
}
```

### Asset System Validator

```typescript
interface AssetSystemValidatorOutput {
  validator_name: "asset_system";
  status: "pass" | "warn" | "fail";
  score: number;
  
  asset_compatibility: {
    system_compatible: boolean;
    asset_class_eligibility: string;
    integration_issues: string[];
  };
  
  reference_analysis: {
    reference_quality_assessment: number;
    reference_canonicality_score: number;
    reference_conflicts: ReferenceConflict[];
  };
  
  asset_readiness: {
    archive_ready: boolean;
    metadata_complete: boolean;
    classification_ready: boolean;
  };
}
```

## Retry and Recovery Handoff Logic

### Retry Eligibility Determination

```typescript
interface RetryEligibilityCheck {
  // Failure analysis
  failure_type: "canon_violation" | "style_violation" | "quality_failure" | "technical_failure" | "system_failure";
  failure_severity: "critical" | "high" | "medium" | "low";
  
  // Retry assessment
  retry_eligible: boolean;
  max_retries_reached: boolean;
  recommended_retry_strategy: "same_parameters" | "adjusted_parameters" | "different_seed" | "escalate";
  
  // Retry configuration
  retry_config?: {
    retry_attempt: number;
    max_retries: number;
    retry_delay: number;
    parameter_adjustments?: ParameterAdjustments;
  };
}
```

### Recovery Handoff Triggers

```typescript
interface RecoveryHandoffTriggers {
  // Automatic escalation
  automatic_escalation: {
    canon_violation_detected: boolean;
    persistent_quality_failure: boolean;
    system_integration_failure: boolean;
    max_retries_exceeded: boolean;
  };
  
  // Manual review required
  manual_review_required: {
    borderline_quality_score: boolean;
    ambiguous_canon_compliance: boolean;
    novel_output_pattern: boolean;
    user_requested_review: boolean;
  };
  
  // System intervention
  system_intervention_required: {
    configuration_error: boolean;
    resource_unavailable: boolean;
    security_concern: boolean;
    data_corruption: boolean;
  };
}
```

## Integration Points

### Asset System Integration

```typescript
interface AssetSystemIntegration {
  // Pre-generation integration
  asset_selection: {
    endpoint: "/asset-system/select-references";
    input: GenerationRequest;
    output: SelectedAssetReferences;
  };
  
  // Post-generation integration
  asset_ingestion: {
    endpoint: "/asset-system/ingest-generated";
    input: GenerationResult;
    output: AssetIngestionResult;
  };
  
  // Validation integration
  asset_validation: {
    endpoint: "/asset-system/validate-asset";
    input: AssetMetadata;
    output: AssetValidationResult;
  };
}
```

### Style Guardrails Integration

```typescript
interface StyleGuardrailsIntegration {
  // Pre-generation validation
  style_validation: {
    endpoint: "/style-guardrails/validate-prompt";
    input: CompiledPrompt;
    output: PromptValidationResult;
  };
  
  // Post-generation validation
  output_validation: {
    endpoint: "/style-guardrails/validate-output";
    input: GeneratedAsset;
    output: OutputValidationResult;
  };
  
  // Drift monitoring
  drift_monitoring: {
    endpoint: "/style-guardrails/monitor-drift";
    input: GenerationBatch;
    output: DriftMonitoringResult;
  };
}
```

### Canon Registry Integration

```typescript
interface CanonRegistryIntegration {
  // Canon compliance validation
  canon_validation: {
    endpoint: "/canon-registry/validate-generation";
    input: GenerationRequest;
    output: CanonValidationResult;
  };
  
  // Mode specification
  mode_specification: {
    endpoint: "/canon-registry/get-mode-specs";
    input: string; // mode_id
    output: ModeSpecification;
  };
  
  // Authority verification
  authority_check: {
    endpoint: "/canon-registry/check-authority";
    input: AssetReference[];
    output: AuthorityCheckResult;
  };
}
```

## Error Handling and Status Codes

### Standard Status Codes

- **200**: Generation successful
- **202**: Generation accepted, processing
- **400**: Invalid generation request
- **401**: Unauthorized access
- **403**: Canon validation failed
- **409**: Resource conflict
- **422**: Unprocessable entity (validation failed)
- **429**: Rate limit exceeded
- **500**: Internal generation error
- **503**: Service unavailable

### Error Response Format

```typescript
interface ErrorResponse {
  error_id: string;
  status_code: number;
  error_type: string;
  message: string;
  details: {
    request_id: string;
    timestamp: string;
    validation_failures?: ValidationFailure[];
    technical_details?: Record<string, any>;
  };
  recovery_suggestions: string[];
  retry_eligible: boolean;
}
```

## Performance Requirements

### Response Time Expectations

- **Simple generation request**: < 2 seconds response time
- **Complex generation request**: < 5 seconds response time
- **Validation processing**: < 30 seconds total
- **Asset ingestion**: < 10 seconds per asset

### Throughput Expectations

- **Concurrent generations**: Support up to 10 concurrent requests
- **Batch processing**: Support up to 50 assets per batch
- **Validation throughput**: 100 validations per minute

### Resource Requirements

- **Memory**: Minimum 2GB per generation instance
- **Storage**: Temporary storage for generation artifacts
- **Network**: Stable connection to asset and style systems

## Monitoring and Observability

### Required Metrics

- **Generation success rate**: Track overall success percentage
- **Average generation time**: Monitor performance trends
- **Validation pass rate**: Track validation effectiveness
- **Canon compliance rate**: Monitor canon adherence
- **Asset quality distribution**: Track quality outcomes

### Logging Requirements

- **Request logging**: Log all generation requests
- **Error logging**: Detailed error information
- **Performance logging**: Timing and resource usage
- **Validation logging**: All validation results

### Health Check Endpoints

- `/health/`: Basic service health
- `/health/generation`: Generation system health
- `/health/integrations`: External integration health
- `/metrics`: Prometheus-compatible metrics

## Security and Compliance

### Authentication Requirements

- API key or token-based authentication
- Session-based request tracking
- Rate limiting per client

### Data Protection

- Secure handling of generated assets
- Encrypted storage of sensitive metadata
- Audit trail for all generation activities

### Canon Protection

- Validation against canon registry
- Prevention of unauthorized canon modifications
- Audit logging of canon-related activities

## Version Compatibility

### Contract Versioning

- Semantic versioning for contract changes
- Backward compatibility for minor versions
- Migration path for major versions

### Runtime Compatibility

- Minimum runtime version requirements
- Deprecated feature notifications
- Feature availability by version

This contract serves as the definitive specification for generation runtime interactions and must be adhered to by all generation clients and runtime implementations.
