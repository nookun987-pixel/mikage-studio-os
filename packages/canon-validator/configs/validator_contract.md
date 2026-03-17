# Validator Contract

## Overview

This document defines the contract for the Mikage Studio OS validator system, specifying expected inputs, outputs, metadata requirements, and integration points with other system components.

## Version Information

- **Contract Version**: 1.0.0
- **Last Updated**: 2026-03-17T00:00:00Z
- **Compatible Validator Version**: 1.0.0+

## Expected Validator Input

### Core Validation Request

```typescript
interface ValidationRequest {
  // Request identification
  request_id: string;
  session_id: string;
  timestamp: string;
  validation_type: "pre_generation" | "post_generation" | "prompt_only" | "asset_only";
  
  // Generation specification
  generation_request: {
    mode_id: string;
    character_ids: string[];
    location_ids?: string[];
    asset_references: AssetReference[];
    prompt_config: PromptConfig;
    technical_config: TechnicalConfig;
  };
  
  // Content for validation
  content: {
    compiled_prompt?: CompiledPrompt;
    generated_asset?: GeneratedAsset;
    asset_metadata?: AssetMetadata;
  };
  
  // Validation configuration
  validation_config: {
    validation_stages: string[];
    strict_mode: boolean;
    enable_fallback: boolean;
    custom_thresholds?: ValidationThresholds;
    skip_validations?: string[];
  };
  
  // Context information
  context: {
    previous_attempts: number;
    system_load: SystemLoadMetrics;
    user_preferences: UserPreferences;
    time_constraints: TimeConstraints;
  };
}
```

### Asset Reference Input

```typescript
interface AssetReference {
  asset_id: string;
  asset_type: "mask" | "armor" | "weapon" | "environment" | "material" | "silhouette";
  asset_class: "canonical" | "approved" | "reference" | "candidate";
  weight: number;
  required: boolean;
  metadata: {
    quality_score: number;
    authority_level: number;
    canonical_source?: string;
    last_validated: string;
  };
}
```

### Prompt Configuration Input

```typescript
interface PromptConfig {
  preset_id?: string;
  variant_id?: string;
  objective_id?: string;
  reference_style_id: string;
  negative_profile_ids: string[];
  prompt_overrides: {
    append_positive?: string;
    append_negative?: string;
    style_bias?: string;
  };
}
```

### Technical Configuration Input

```typescript
interface TechnicalConfig {
  seed_policy: string;
  seed_value?: number;
  sampler: string;
  steps: number;
  cfg: number;
  batch_size: number;
  model_version: string;
}
```

### Compiled Prompt Input

```typescript
interface CompiledPrompt {
  positive_prompt: string;
  negative_prompt: string;
  prompt_blocks: PromptBlock[];
  compilation_metadata: {
    lineage_id: string;
    prompt_hash: string;
    compilation_timestamp: string;
    compiler_version: string;
  };
}

interface PromptBlock {
  block_type: string;
  content: string;
  order: number;
  required: boolean;
  source: string;
}
```

### Generated Asset Input

```typescript
interface GeneratedAsset {
  asset_url: string;
  asset_metadata: {
    file_size: number;
    dimensions: { width: number; height: number };
    format: string;
    color_space: string;
    generation_timestamp: string;
  };
  generation_parameters: {
    positive_prompt: string;
    negative_prompt: string;
    seed: number;
    sampler: string;
    steps: number;
    cfg: number;
  };
}
```

## Expected Validator Output

### Core Validation Response

```typescript
interface ValidationResponse {
  // Response identification
  request_id: string;
  session_id: string;
  timestamp: string;
  validation_duration: number;
  
  // Validation decision
  decision: {
    overall_state: "pass" | "warn" | "fail" | "block" | "defer";
    confidence: number;
    reasoning: string[];
    recommendation: string;
  };
  
  // Detailed results
  validation_results: ValidationResult[];
  
  // Action recommendations
  actions: ValidationAction[];
  
  // Retry and fallback information
  retry_decision?: RetryDecision;
  fallback_recommendation?: FallbackRecommendation;
  
  // Metadata and tracking
  metadata: {
    validator_version: string;
    canon_version: string;
    validation_stages_completed: string[];
    total_rules_evaluated: number;
    rules_passed: number;
    rules_failed: number;
    rules_warned: number;
  };
}
```

### Validation Result Output

```typescript
interface ValidationResult {
  rule_id: string;
  rule_name: string;
  rule_category: string;
  severity: "critical" | "high" | "medium" | "low";
  
  // Result status
  status: "pass" | "warn" | "fail";
  score: number;
  confidence: number;
  
  // Detailed findings
  findings: ValidationFinding[];
  
  // Execution metadata
  execution_metadata: {
    stage: string;
    execution_time: number;
    input_fields_used: string[];
    source_of_truth: string;
  };
  
  // Recommendations
  recommendations: string[];
  blocking_issues: BlockingIssue[];
}
```

### Validation Finding Output

```typescript
interface ValidationFinding {
  finding_id: string;
  type: "violation" | "warning" | "information";
  severity: "critical" | "high" | "medium" | "low";
  
  // Finding description
  message: string;
  description: string;
  location: string;
  
  // Finding context
  context: {
    trigger_condition: string;
    detected_value: any;
    expected_value: any;
    threshold: number;
  };
  
  // Impact assessment
  impact: {
    on_generation: "blocking" | "degrading" | "cosmetic";
    on_canon_compliance: "violation" | "drift" | "acceptable";
    on_quality: "severe" | "moderate" | "minor";
  };
  
  // Resolution information
  resolution: {
    auto_correctable: boolean;
    retry_eligible: boolean;
    manual_review_required: boolean;
    escalation_level: number;
  };
}
```

### Blocking Issue Output

```typescript
interface BlockingIssue {
  issue_id: string;
  issue_type: string;
  severity: "critical" | "high";
  
  // Issue description
  description: string;
  symptoms: string[];
  likely_causes: string[];
  
  // Blocking behavior
  blocks_generation: boolean;
  blocks_retry: boolean;
  requires_manual_intervention: boolean;
  
  // Resolution path
  resolution_path: {
    immediate_action: string;
    escalation_required: boolean;
    escalation_level: number;
    estimated_resolution_time: string;
  };
}
```

### Validation Action Output

```typescript
interface ValidationAction {
  action_id: string;
  action_type: "correction" | "retry" | "escalation" | "monitoring" | "documentation";
  priority: "immediate" | "high" | "medium" | "low";
  
  // Action specification
  specification: {
    description: string;
    target_component: string;
    parameters: Record<string, any>;
    expected_outcome: string;
  };
  
  // Execution requirements
  execution: {
    automatic: boolean;
    manual_approval_required: boolean;
    estimated_duration: number;
    resource_requirements: string[];
  };
  
  // Success criteria
  success_criteria: {
    validation_passed: boolean;
    quality_improved: boolean;
    canon_compliance_maintained: boolean;
  };
}
```

## Required Metadata

### Request Metadata

```typescript
interface RequestMetadata {
  // Identification
  request_id: string;
  session_id: string;
  correlation_id: string;
  
  // Timing
  request_timestamp: string;
  validation_start_timestamp: string;
  validation_completion_timestamp: string;
  
  // Provenance
  client_id: string;
  user_id?: string;
  api_version: string;
  
  // Context
  generation_context: {
    mode_id: string;
    previous_attempts: number;
    batch_id?: string;
    experiment_id?: string;
  };
  
  // System state
  system_state: {
    validator_version: string;
    canon_version: string;
    configuration_version: string;
    environment: "development" | "staging" | "production";
  };
}
```

### Response Metadata

```typescript
interface ResponseMetadata {
  // Identification
  request_id: string;
  session_id: string;
  correlation_id: string;
  
  // Performance metrics
  performance: {
    total_validation_time: number;
    stage_execution_times: Record<string, number>;
    rule_evaluation_times: Record<string, number>;
    memory_usage: number;
    cpu_usage: number;
  };
  
  // Validation summary
  validation_summary: {
    total_rules_evaluated: number;
    critical_rules_count: number;
    high_severity_rules_count: number;
    medium_severity_rules_count: number;
    low_severity_rules_count: number;
    
    rules_passed: number;
    rules_warned: number;
    rules_failed: number;
    
    overall_score: number;
    confidence_score: number;
  };
  
  // Compliance metrics
  compliance_metrics: {
    canon_compliance_score: number;
    style_alignment_score: number;
    asset_quality_score: number;
    drift_risk_score: number;
  };
  
  // Decision tracking
  decision_tracking: {
    final_decision: string;
    decision_confidence: number;
    decision_factors: string[];
    alternative_decisions_considered: string[];
  };
}
```

## Confidence Fields

### Confidence Calculation

```typescript
interface ConfidenceCalculation {
  // Overall confidence
  overall_confidence: number;
  
  // Component confidences
  component_confidences: {
    canon_compliance_confidence: number;
    style_validation_confidence: number;
    asset_validation_confidence: number;
    technical_validation_confidence: number;
  };
  
  // Confidence factors
  confidence_factors: {
    data_quality: number;
    rule_completeness: number;
    source_reliability: number;
    contextual_clarity: number;
  };
  
  // Confidence thresholds
  confidence_thresholds: {
    high_confidence: number;      // ≥ 0.9
    medium_confidence: number;    // ≥ 0.7
    low_confidence: number;       // ≥ 0.5
    minimal_confidence: number;   // ≥ 0.3
  };
  
  // Uncertainty indicators
  uncertainty_indicators: {
    missing_data: string[];
    conflicting_rules: string[];
    ambiguous_references: string[];
    system_constraints: string[];
  };
}
```

### Confidence Scoring Algorithm

```typescript
function calculateConfidence(
  validationResults: ValidationResult[],
  context: ValidationContext
): ConfidenceCalculation {
  
  // Base confidence from rule results
  const ruleConfidence = validationResults.reduce((acc, result) => {
    return acc + (result.score * result.confidence);
  }, 0) / validationResults.length;
  
  // Adjust for data quality
  const dataQualityFactor = calculateDataQuality(context);
  
  // Adjust for source reliability
  const sourceReliabilityFactor = calculateSourceReliability(validationResults);
  
  // Adjust for contextual clarity
  const contextualClarityFactor = calculateContextualClarity(context);
  
  // Calculate overall confidence
  const overallConfidence = ruleConfidence * 
    dataQualityFactor * 
    sourceReliabilityFactor * 
    contextualClarityFactor;
  
  return {
    overall_confidence: overallConfidence,
    component_confidences: calculateComponentConfidences(validationResults),
    confidence_factors: {
      data_quality: dataQualityFactor,
      rule_completeness: calculateRuleCompleteness(validationResults),
      source_reliability: sourceReliabilityFactor,
      contextual_clarity: contextualClarityFactor
    },
    confidence_thresholds: {
      high_confidence: 0.9,
      medium_confidence: 0.7,
      low_confidence: 0.5,
      minimal_confidence: 0.3
    },
    uncertainty_indicators: identifyUncertaintyIndicators(validationResults, context)
  };
}
```

## Failure Object Structure

### Failure Classification

```typescript
interface ValidationFailure {
  // Failure identification
  failure_id: string;
  failure_type: string;
  failure_family: string;
  
  // Failure classification
  classification: {
    severity: "critical" | "high" | "medium" | "low";
    category: string;
    retryable: boolean;
    escalatable: boolean;
  };
  
  // Failure description
  description: {
    message: string;
    detailed_description: string;
    symptoms: string[];
    likely_causes: string[];
    impact_assessment: string;
  };
  
  // Failure context
  context: {
    trigger_condition: string;
    detection_method: string;
    detection_stage: string;
    affected_components: string[];
  };
  
  // Resolution information
  resolution: {
    auto_correctable: boolean;
    manual_intervention_required: boolean;
    retry_strategy: RetryStrategy;
    escalation_path: EscalationPath;
    fallback_options: FallbackOption[];
  };
  
  // Failure metadata
  metadata: {
    timestamp: string;
    occurrence_count: number;
    similar_failures: string[];
    prevention_measures: string[];
    learning_opportunities: string[];
  };
}
```

### Retry Strategy

```typescript
interface RetryStrategy {
  retry_eligible: boolean;
  max_retries: number;
  current_attempt: number;
  
  retry_configuration: {
    backoff_strategy: "exponential" | "linear" | "fixed";
    initial_delay: number;
    max_delay: number;
    jitter_enabled: boolean;
  };
  
  retry_adjustments: {
    parameter_changes: ParameterChange[];
    alternative_selections: AlternativeSelection[];
    configuration_modifications: ConfigurationModification[];
  };
  
  success_probability: number;
  estimated_resolution_time: number;
}
```

### Escalation Path

```typescript
interface EscalationPath {
  escalation_required: boolean;
  current_level: number;
  target_level: number;
  
  escalation_criteria: {
    severity_threshold: number;
    retry_exhausted: boolean;
    manual_intervention_required: boolean;
    time_threshold_exceeded: boolean;
  };
  
  escalation_process: {
    notification_required: boolean;
    approval_required: boolean;
    documentation_required: boolean;
    estimated_response_time: number;
  };
  
  escalation_contacts: {
    primary_contact: string;
    secondary_contacts: string[];
    escalation_team: string;
    emergency_contacts: string[];
  };
}
```

## Integration with Configuration Files

### With output_validation_config.json

```typescript
interface OutputValidationIntegration {
  // Validation stage mapping
  stage_mapping: {
    "immediate_post_generation": "post_generation_validation",
    "canon_compliance_validation": "canon_compliance_stage",
    "quality_assessment": "quality_validation_stage",
    "drift_detection": "drift_analysis_stage",
    "final_approval": "final_validation_stage"
  };
  
  // Threshold application
  threshold_application: {
    pass_threshold: number;
    warn_threshold: number;
    fail_threshold: number;
    custom_thresholds: Record<string, number>;
  };
  
  // Validation check mapping
  check_mapping: {
    "file_integrity_check": "asset_validation_rule",
    "canon_registry_compliance": "canon_compliance_rule",
    "style_guardrails_validation": "style_validation_rule",
    "asset_system_integration": "asset_integration_rule"
  };
  
  // Failure routing
  failure_routing: {
    "canon_violation": "critical_escalation",
    "style_violation": "style_escalation",
    "quality_failure": "quality_escalation",
    "technical_failure": "technical_escalation"
  };
}
```

### With style_guardrails/failure_modes.json

```typescript
interface StyleGuardrailsIntegration {
  // Failure mode mapping
  failure_mode_mapping: {
    "fm_wrong_silhouette": "silhouette_validation_rule",
    "fm_thigh_inflation": "proportion_validation_rule",
    "fm_fantasy_magic": "drift_prevention_rule",
    "fm_childish_anime": "style_drift_rule"
  };
  
  // Visual symptom detection
  symptom_detection: {
    detection_methods: string[];
    confidence_thresholds: Record<string, number>;
    false_positive_handling: string;
  };
  
  // Correction rule application
  correction_application: {
    prompt_patches: string[];
    parameter_adjustments: Record<string, any>;
    reference_modifications: string[];
  };
  
  // Prevention measure integration
  prevention_integration: {
    proactive_measures: string[];
    monitoring_requirements: string[];
    learning_adaptations: string[];
  };
}
```

### With asset_system/asset_review_matrix.json

```typescript
interface AssetSystemIntegration {
  // Review dimension mapping
  dimension_mapping: {
    "silhouette_accuracy": "silhouette_validation_rule",
    "material_fidelity": "material_validation_rule",
    "technical_quality": "quality_validation_rule",
    "canon_compliance": "canon_compliance_rule"
  };
  
  // Score calculation integration
  score_calculation: {
    weight_application: Record<string, number>;
    score_aggregation: string;
    threshold_comparison: string;
  };
  
  // Criteria validation
  criteria_validation: {
    excellent_criteria: string[];
    good_criteria: string[];
    acceptable_criteria: string[];
    poor_criteria: string[];
  };
  
  // Review outcome mapping
  outcome_mapping: {
    "excellent": "pass_with_high_confidence",
    "good": "pass_with_medium_confidence",
    "acceptable": "warn_with_conditions",
    "poor": "fail_with_recommendations"
  };
}
```

## Error Handling and Response Codes

### Standard Response Codes

```typescript
enum ValidationResponseCode {
  SUCCESS = 200,
  ACCEPTED_WITH_WARNINGS = 202,
  VALIDATION_FAILED = 400,
  CANON_VIOLATION = 403,
  RESOURCE_UNAVAILABLE = 503,
  INTERNAL_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}
```

### Error Response Structure

```typescript
interface ValidationErrorResponse {
  error_id: string;
  response_code: ValidationResponseCode;
  error_type: string;
  message: string;
  
  // Error details
  details: {
    request_id: string;
    timestamp: string;
    validation_stage: string;
    failed_rules: string[];
    error_context: Record<string, any>;
  };
  
  // Recovery information
  recovery: {
    retry_eligible: boolean;
    fallback_available: boolean;
    manual_intervention_required: boolean;
    estimated_resolution_time: string;
  };
  
  // Support information
  support: {
    documentation_references: string[];
    support_contacts: string[];
    troubleshooting_steps: string[];
  };
}
```

## Performance Requirements

### Response Time Expectations

- **Simple validation**: < 500ms
- **Complex validation**: < 2 seconds
- **Multi-stage validation**: < 5 seconds
- **Batch validation**: < 30 seconds

### Throughput Expectations

- **Concurrent validations**: Support up to 50 concurrent requests
- **Batch processing**: Support up to 100 validations per batch
- **Validation throughput**: 1000 validations per minute

### Resource Requirements

- **Memory**: Minimum 512MB per validation instance
- **CPU**: Moderate CPU usage for complex validations
- **Storage**: Temporary storage for validation artifacts
- **Network**: Stable connection to integrated systems

## Security and Compliance

### Authentication Requirements

- API key or token-based authentication
- Session-based request tracking
- Rate limiting per client
- Audit logging for all validations

### Data Protection

- Secure handling of sensitive content
- Encrypted storage of validation results
- Data retention policies
- Privacy compliance measures

### Canon Protection

- Validation against canon registry
- Prevention of unauthorized canon modifications
- Audit trail for canon-related activities
- Integration with Canon Guard security

This contract serves as the definitive specification for validator system interactions and must be adhered to by all validator implementations and client systems.
