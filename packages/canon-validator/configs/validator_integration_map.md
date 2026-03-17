# Validator Integration Map

## Overview

This document describes how the canon validator integrates with the Mikage Studio OS generation pipeline, including data flows, integration points, and system boundaries.

## Version Information

- **Integration Map Version**: 1.0.0
- **Last Updated**: 2026-03-17T00:00:00Z
- **Compatible Validator Version**: 1.0.0+

## Pipeline Position

### Generation Pipeline Context

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Reference     │    │   Prompt         │    │   Generation    │
│   Selection     │───▶│   Compilation    │───▶│   Request       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Asset         │    │   Canon          │    │   Generation    │
│   Validation    │◀───│   Validator      │◀───│   Execution     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Asset         │    │   Output         │    │   Generated     │
│   Ingestion     │◀───│   Validation     │◀───│   Asset         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Validation Stages in Pipeline

1. **Pre-Generation Validation**
   - Request validation
   - Mode compliance check
   - Asset reference validation
   - Prompt structure validation

2. **Generation Execution**
   - Monitor generation process
   - Real-time validation checks
   - Error detection and handling

3. **Post-Generation Validation**
   - Output quality assessment
   - Canon compliance verification
   - Drift detection analysis
   - Final approval determination

## Data Flow Integration

### Input Data Sources

#### From configs/generation/

**mode_registry.json**
```typescript
interface ModeRegistryInput {
  supported_modes: ModeDefinition[];
  mode_constraints: ModeConstraints;
  asset_class_permissions: AssetClassPermissions;
  drift_prevention_rules: DriftPreventionRules;
}
```
- **Usage**: Validate mode selection and requirements
- **Authority**: Source of truth for mode specifications
- **Update Frequency**: Low (configuration changes)

**reference_selection_config.json**
```typescript
interface ReferenceSelectionInput {
  priority_order: PriorityOrder;
  conflict_resolution: ConflictResolutionRules;
  fallback_behavior: FallbackBehavior;
}
```
- **Usage**: Validate asset reference selection
- **Authority**: Source of truth for reference logic
- **Update Frequency**: Low (configuration changes)

**output_validation_config.json**
```typescript
interface OutputValidationInput {
  validation_stages: ValidationStage[];
  pass_threshold: number;
  warn_threshold: number;
  failure_routing: FailureRouting;
}
```
- **Usage**: Configure output validation behavior
- **Authority**: Source of truth for validation thresholds
- **Update Frequency**: Low (configuration changes)

**prompt_compilation_rules.json**
```typescript
interface PromptCompilationInput {
  block_order: BlockOrder;
  required_blocks: RequiredBlocks;
  style_enforcement_hooks: StyleEnforcementHooks;
}
```
- **Usage**: Validate prompt structure and compilation
- **Authority**: Source of truth for prompt rules
- **Update Frequency**: Low (configuration changes)

#### From docs/canon/

**generation_modes.json**
```typescript
interface GenerationModesInput {
  modes: GenerationMode[];
  batch_rules: BatchRules;
  mode_specific_parameters: ModeSpecificParameters;
}
```
- **Usage**: Validate generation mode parameters
- **Authority**: Source of truth for mode definitions
- **Update Frequency**: Medium (canon updates)

**negative_prompt_rules.json**
```typescript
interface NegativePromptRulesInput {
  negative_profiles: NegativeProfile[];
  forbidden_drift_labels: string[];
  validator_and_drift_rules: ValidatorDriftRules;
}
```
- **Usage**: Validate negative prompt application
- **Authority**: Source of truth for negative rules
- **Update Frequency**: Medium (canon updates)
- **Unresolved References**: `neg_pop_glamour_excess`

**prompt_structure.md**
```typescript
interface PromptStructureInput {
  compiler_flow: CompilerFlow;
  preset_structure: PresetStructure;
  validation_gates: ValidationGates;
}
```
- **Usage**: Validate prompt compilation flow
- **Authority**: Source of truth for prompt structure
- **Update Frequency**: Low (structural changes)

#### From docs/style-guardrails/

**failure_modes.json**
```typescript
interface FailureModesInput {
  failure_modes: FailureMode[];
  visual_symptoms: VisualSymptom[];
  correction_rules: CorrectionRule[];
}
```
- **Usage**: Detect and classify style failures
- **Authority**: Source of truth for failure patterns
- **Update Frequency**: Medium (style updates)

**canon-guard-architecture.md**
```typescript
interface CanonGuardInput {
  validation_stages: ValidationStage[];
  implemented_validators: ImplementedValidator[];
  integration_points: IntegrationPoint[];
}
```
- **Usage**: Integrate with canon guard system
- **Authority**: Source of truth for guard architecture
- **Update Frequency**: Low (architectural changes)

#### From docs/asset-system/

**asset_selection_rules.md**
```typescript
interface AssetSelectionInput {
  priority_rules: PriorityRules;
  conflict_resolution: ConflictResolution;
  drift_prevention: DriftPrevention;
}
```
- **Usage**: Validate asset selection and usage
- **Authority**: Source of truth for asset rules
- **Update Frequency**: Medium (asset updates)

**asset_review_matrix.json**
```typescript
interface AssetReviewInput {
  review_dimensions: ReviewDimension[];
  quality_criteria: QualityCriteria;
  scoring_weights: ScoringWeights;
}
```
- **Usage**: Assess asset quality and compliance
- **Authority**: Source of truth for review criteria
- **Update Frequency**: Medium (review updates)

### Output Data Destinations

#### To Generation Runtime

```typescript
interface ValidatorToRuntime {
  validation_decision: ValidationDecision;
  generation_approval: GenerationApproval;
  retry_configuration: RetryConfiguration;
  fallback_recommendation: FallbackRecommendation;
}
```

#### To Asset System

```typescript
interface ValidatorToAssetSystem {
  asset_validation_results: AssetValidationResult[];
  asset_classification: AssetClassification;
  quality_assessment: QualityAssessment;
  ingestion_approval: IngestionApproval;
}
```

#### To Style Guardrails

```typescript
interface ValidatorToStyleGuardrails {
  drift_detection_results: DriftDetectionResult[];
  style_violation_reports: StyleViolationReport[];
  guardrail_effectiveness: GuardrailEffectiveness;
  prevention_recommendations: PreventionRecommendation[];
}
```

#### To Canon Registry

```typescript
interface ValidatorToCanonRegistry {
  canon_compliance_report: CanonComplianceReport;
  violation_tracking: ViolationTracking;
  interpretation_feedback: InterpretationFeedback;
  registry_update_suggestions: RegistryUpdateSuggestions;
}
```

## Source of Truth vs Advisory

### Source of Truth Documents

**configs/canon-registry.json**
- **Role**: Ultimate authority on canon structure
- **Usage**: Canon compliance validation
- **Authority Level**: 5 (Constitutional)
- **Update Control**: Canon Council only

**configs/generation/*.json**
- **Role**: Technical configuration authority
- **Usage**: Generation parameter validation
- **Authority Level**: 4 (Technical)
- **Update Control**: System Administration

**docs/canon/*.json**
- **Role**: Canon specification authority
- **Usage**: Canon rule validation
- **Authority Level**: 3 (Canonical)
- **Update Control**: Canon Guard

### Advisory Documents

**docs/style-guardrails/failure_modes.json**
- **Role**: Style failure pattern reference
- **Usage**: Advisory failure detection
- **Authority Level**: 2 (Guidance)
- **Update Control**: Style Review Board

**docs/asset-system/asset_review_matrix.json**
- **Role**: Asset quality assessment guide
- **Usage**: Advisory quality criteria
- **Authority Level**: 2 (Guidance)
- **Update Control**: Asset Management

**docs/philosophy/** (if present)
- **Role**: Philosophical context and guidance
- **Usage**: Contextual understanding only
- **Authority Level**: 1 (Informational)
- **Update Control**: Documentation Team

## System Integration Boundaries

### Canon Validator Package Boundaries

**Internal Components**:
- Rule Registry
- Failure Taxonomy
- Decision Matrix
- Validation Engine

**External Dependencies**:
- Canon Registry (configs/canon-registry.json)
- Generation Configuration (configs/generation/*)
- Style Guardrails (docs/style-guardrails/*)
- Asset System (docs/asset-system/*)

**API Boundaries**:
```typescript
// Public API
export interface CanonValidatorAPI {
  validateRequest(request: ValidationRequest): Promise<ValidationResponse>;
  validateOutput(output: GeneratedAsset): Promise<OutputValidationResponse>;
  getRuleRegistry(): RuleRegistry;
  getFailureTaxonomy(): FailureTaxonomy;
}

// Internal API
export interface CanonValidatorInternal {
  loadConfiguration(): Promise<void>;
  executeRule(rule: ValidationRule, context: ValidationContext): Promise<RuleResult>;
  applyDecisionLogic(results: RuleResult[]): Promise<DecisionResult>;
}
```

### Integration Points

#### With Content Engine

**Integration Type**: Direct API calls
**Data Flow**: Request validation, approval decisions
**Frequency**: High (per generation)
**Latency Requirements**: < 500ms

```typescript
interface ContentEngineIntegration {
  preGenerationValidation(request: GenerationRequest): Promise<ValidationDecision>;
  postGenerationValidation(asset: GeneratedAsset): Promise<ValidationDecision>;
  configurationSync(): Promise<void>;
}
```

#### With Prompt Runtime

**Integration Type**: Event-driven validation
**Data Flow**: Prompt validation, compilation checks
**Frequency**: High (per prompt)
**Latency Requirements**: < 200ms

```typescript
interface PromptRuntimeIntegration {
  validatePrompt(prompt: CompiledPrompt): Promise<PromptValidationResult>;
  validateCompilation(compilation: CompilationResult): Promise<CompilationValidationResult>;
}
```

#### With Generation Orchestrator

**Integration Type**: Orchestration integration
**Data Flow**: Task validation, pipeline coordination
**Frequency**: Medium (per batch)
**Latency Requirements**: < 1 second

```typescript
interface GenerationOrchestratorIntegration {
  validateTask(task: GenerationTask): Promise<TaskValidationResult>;
  validatePipeline(pipeline: PipelineConfig): Promise<PipelineValidationResult>;
}
```

## Known Unresolved References

### neg_pop_glamour_excess

**Description**: Negative profile referenced in generation modes but not fully defined
**Affected Components**:
- Prompt validation (rules: prompt_002, reference_002)
- Negative prompt application
- Style drift prevention

**Current Workaround**:
```typescript
const negPopGlamourExcessProfile: NegativeProfile = {
  profile_id: "neg_pop_glamour_excess",
  status: "placeholder",
  negative_tokens: [], // Empty until properly defined
  impact: "medium",
  resolution_required: true
};
```

**Resolution Path**:
1. Define negative tokens for pop glamour excess
2. Update negative_prompt_rules.json
3. Remove placeholder status
4. Update validator rule registry

**Impact Assessment**: Medium - affects luminous_fan_appeal mode validation

### imperial_upper_zone

**Description**: Domain referenced in style rules but not in domain classifier
**Affected Components**:
- Domain validation (rule: domain_001)
- Environment classification
- Style resolution rules

**Current Workaround**:
```typescript
const domainMapping = {
  "imperial_upper_zone": {
    treated_as: "imperial_domain",
    warning: "Domain not officially classified",
    impact: "low"
  }
};
```

**Resolution Path**:
1. Add to domain_classifier.json or update style references
2. Validate domain consistency
3. Update validation rules
4. Remove workaround

**Impact Assessment**: Low - minor classification inconsistency

## Pipeline Integration Risks

### scene_generation_pipeline Step Alignment

**Risk Description**: Pipeline steps may not align with validation stages
**Affected Components**:
- Pipeline validation (rule: pipeline_001)
- Stage coordination
- Error handling

**Mitigation Strategy**:
```typescript
const pipelineStageMapping = {
  "detect_scene_domain": "pre_generation_validation",
  "apply_domain_classifier": "pre_generation_validation",
  "load_visual_authority": "canon_compliance_validation",
  "apply_style_guardrails": "style_guardrails_validation",
  "apply_character_spec": "asset_system_validation",
  "apply_color_modes": "style_guardrails_validation",
  "apply_composition_grammar": "prompt_input_validation",
  "validate_forbidden_elements": "drift_detection",
  "final_render_prompt": "pre_generation_validation"
};
```

**Resolution Required**:
1. Map pipeline steps to validation stages
2. Ensure consistent terminology
3. Update validation rule registry
4. Test integration end-to-end

### Configuration Synchronization

**Risk Description**: Configuration files may become out of sync
**Affected Components**:
- Mode registry validation
- Reference selection validation
- Output validation configuration

**Mitigation Strategy**:
```typescript
interface ConfigurationSync {
  versionValidation: boolean;
  crossReferenceChecking: boolean;
  dependencyValidation: boolean;
  consistencyReporting: boolean;
}
```

**Monitoring Requirements**:
- Configuration version tracking
- Cross-reference validation
- Dependency graph analysis
- Consistency reporting

## Performance Integration Considerations

### Caching Strategy

**Validation Rule Caching**:
- Cache compiled rules in memory
- Invalidate on configuration changes
- Use version-based cache keys

**Reference Data Caching**:
- Cache frequently accessed reference data
- Implement lazy loading for large datasets
- Use TTL-based cache expiration

### Parallel Processing

**Rule Execution Parallelization**:
- Execute independent rules in parallel
- Respect rule dependencies
- Use worker threads for CPU-intensive rules

**Stage Parallelization**:
- Overlap validation stages where possible
- Pipeline stage execution
- Async result aggregation

### Resource Management

**Memory Management**:
- Limit memory usage per validation
- Implement garbage collection for large objects
- Use streaming for large datasets

**CPU Management**:
- Limit CPU usage per validation
- Implement priority-based scheduling
- Use resource pooling for expensive operations

## Monitoring and Observability Integration

### Metrics Collection

**Validation Metrics**:
- Rule execution times
- Pass/fail rates by category
- Confidence score distributions
- Retry success rates

**Integration Metrics**:
- API response times
- Error rates by integration point
- Data transfer volumes
- Cache hit rates

### Logging Integration

**Structured Logging**:
```typescript
interface ValidationLog {
  timestamp: string;
  request_id: string;
  validation_stage: string;
  rule_id: string;
  result: "pass" | "warn" | "fail";
  execution_time: number;
  confidence: number;
  metadata: Record<string, any>;
}
```

**Log Correlation**:
- Request ID propagation
- Session ID tracking
- Correlation ID for distributed tracing
- Causality chain tracking

### Alerting Integration

**Alert Conditions**:
- Validation failure rate spikes
- Performance degradation
- Configuration inconsistency
- Integration failures

**Alert Routing**:
- Critical alerts to Canon Guard
- Performance alerts to System Admin
- Configuration alerts to Configuration Management
- Integration alerts to respective system owners

## Security Integration

### Authentication and Authorization

**API Security**:
- Token-based authentication
- Role-based access control
- Rate limiting per client
- Audit logging for security events

**Data Security**:
- Encrypted data transmission
- Secure storage of sensitive data
- Data anonymization for logging
- Privacy compliance measures

### Canon Protection

**Canon Integrity**:
- Validation against canon registry
- Prevention of unauthorized modifications
- Audit trail for canon-related activities
- Integration with Canon Guard security

**Access Control**:
- Canon modification restrictions
- Validation rule access control
- Configuration change authorization
- Emergency override procedures

This integration map provides comprehensive guidance for implementing and maintaining the canon validator within the Mikage Studio OS ecosystem while ensuring proper system boundaries and data flow integrity.
