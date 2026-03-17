# Pipeline Stage Map

## Overview

This document maps the actual stages of the Mikage Studio OS generation pipeline, aligned with existing configurations and studio-os workflows.

## Pipeline Stage Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PIPELINE STAGES                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Request Intake                                          │
│     ├── Schema validation                                   │
│     ├── Request normalization                               │
│     └── Mode selection                                       │
│                                                             │
│  2. Asset/Reference Selection                               │
│     ├── Character reference lookup                           │
│     ├── Environment reference validation                     │
│     ├── Style reference application                          │
│     └── Asset availability checking                         │
│                                                             │
│  3. Prompt Compile                                           │
│     ├── Base prompt construction                            │
│     ├── Reference integration                               │
│     ├── Style constraint application                        │
│     └── Final prompt optimization                          │
│                                                             │
│  4. Pre-Validation                                         │
│     ├── Canon compliance check                              │
│     ├── Style guardrails validation                        │
│     ├── Character identity verification                     │
│     ├── Environment domain check                           │
│     └── Forbidden elements detection                       │
│                                                             │
│  5. Generation Handoff                                     │
│     ├── Content engine adapter call                        │
│     ├── Provider selection                                  │
│     ├── Parameter optimization                             │
│     └── Generation execution                               │
│                                                             │
│  6. Post-Validation                                        │
│     ├── Visual quality assessment                           │
│     ├── Canon verification                                  │
│     ├── Style compliance check                             │
│     └── Technical validation                               │
│                                                             │
│  7. Decision Routing                                        │
│     ├── Result acceptance/rejection                         │
│     ├── Retry strategy selection                           │
│     ├── Fallback option evaluation                         │
│     └── Final recommendation                               │
│                                                             │
│  8. Final Packaging                                        │
│     ├── Result normalization                               │
│     ├── Metadata assembly                                  │
│     ├── Performance metrics                                │
│     └── Output formatting                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Stage Details

### 1. Request Intake

**Purpose**: Accept and normalize generation requests

**Input**: Raw pipeline request (JSON)

**Processing**:
- Schema validation against `pipeline_request_schema.json`
- Request field normalization and defaults
- Mode validation and capability checking
- Request metadata enrichment

**Output**: Normalized request object

**Dependencies**:
- `configs/generation/pipeline_request_schema.json`
- `packages/generation-orchestrator/src/types.ts`

**Error Conditions**:
- Invalid request schema
- Unsupported mode
- Missing required fields

**Success Criteria**:
- Request validates against schema
- All required fields present
- Mode is supported

---

### 2. Asset/Reference Selection

**Purpose**: Select and validate references for generation

**Input**: Normalized request object

**Processing**:
- Character reference lookup from canon
- Environment reference validation
- Style reference application and weighting
- Asset availability and accessibility checking

**Output**: Selected references object

**Dependencies**:
- `docs/prompt-canon/` (character data)
- `docs/asset-system/` (asset metadata)
- `datasets/visual-index/` (reference assets)

**Error Conditions**:
- Invalid character references
- Missing environment data
- Unavailable assets

**Success Criteria**:
- All references validated
- Asset availability confirmed
- Reference confidence scores calculated

---

### 3. Prompt Compile

**Purpose**: Compile and optimize generation prompt

**Input**: Normalized request + selected references

**Processing**:
- Base prompt construction from intent
- Reference integration and context building
- Style constraint application
- Canon terminology integration
- Final prompt optimization

**Output**: Compiled prompt object

**Dependencies**:
- `docs/prompt-canon/` (terminology)
- `docs/style-guardrails/` (style rules)
- `configs/generation/scene_generation_pipeline.json`

**Error Conditions**:
- Reference integration failures
- Style constraint conflicts
- Canon terminology violations

**Success Criteria**:
- Prompt includes all required elements
- References properly integrated
- Style constraints applied
- Canon compliance maintained

---

### 4. Pre-Validation

**Purpose**: Validate request and prompt before generation

**Input**: Compiled prompt + references

**Processing**:
- Canon compliance checking
- Style guardrails validation
- Character identity verification
- Environment domain validation
- Forbidden elements detection

**Output**: Pre-validation result object

**Dependencies**:
- `packages/canon-validator/src/canon-guard.ts`
- `studio-os/canon_validation_flow.json`
- `configs/generation/scene_generation_pipeline.json`

**Validation Order** (from `canon_validation_flow.json`):
1. character_identity_check
2. environment_domain_check
3. palette_check
4. material_check
5. forbidden_elements_check
6. cross_domain_contamination_check
7. final_canon_pass

**Error Conditions**:
- Canon violations (critical)
- Style guardrails failures
- Character identity mismatches
- Forbidden elements present

**Success Criteria**:
- All validation checks pass
- No blocking issues found
- Confidence score above threshold

---

### 5. Generation Handoff

**Purpose**: Execute content generation

**Input**: Validated prompt + generation parameters

**Processing**:
- Content engine adapter invocation
- Provider selection and routing
- Generation parameter optimization
- Generation execution
- Asset storage and metadata

**Output**: Generation result object

**Dependencies**:
- `packages/content-engine/src/content_engine_adapter.ts`
- Generation providers (external/stubbed)

**Error Conditions**:
- Provider failures
- Generation timeouts
- Resource constraints
- Quality threshold failures

**Success Criteria**:
- Generation completes successfully
- Asset generated and stored
- Quality metrics acceptable

---

### 6. Post-Validation

**Purpose**: Validate generated content

**Input**: Generation result + original request

**Processing**:
- Visual quality assessment
- Canon verification of generated content
- Style compliance checking
- Technical specification validation
- Overall quality scoring

**Output**: Post-validation result object

**Dependencies**:
- `packages/canon-validator/src/canon-guard.ts`
- Quality assessment algorithms (scaffolded)

**Error Conditions**:
- Quality below threshold
- Canon violations in generated content
- Style compliance failures
- Technical specification mismatches

**Success Criteria**:
- Quality score acceptable
- Canon compliance maintained
- Style requirements met
- Technical specs satisfied

---

### 7. Decision Routing

**Purpose**: Determine final disposition of generation result

**Input**: Pre-validation + generation + post-validation results

**Processing**:
- Result acceptance/rejection determination
- Retry strategy evaluation
- Fallback option assessment
- Success probability calculation
- Final recommendation generation

**Output**: Decision routing recommendation

**Dependencies**:
- `packages/content-engine/src/retry_fallback_adapter.ts`
- Decision routing algorithms (scaffolded)

**Decision Logic**:
- **Accept**: All validations pass, quality acceptable
- **Retry**: Recoverable issues, retry available
- **Fallback**: Quality issues but fallback possible
- **Reject**: Critical failures, no recovery options

**Success Criteria**:
- Clear decision rendered
- Retry/fallback strategy defined if needed
- Success probability calculated

---

### 8. Final Packaging

**Purpose**: Assemble final pipeline result

**Input**: All previous stage results + decision

**Processing**:
- Result normalization and formatting
- Metadata assembly and enrichment
- Performance metrics calculation
- Output formatting according to schema
- Final validation of result structure

**Output**: Final pipeline result

**Dependencies**:
- `configs/generation/pipeline_result_schema.json`
- All previous stage outputs

**Error Conditions**:
- Result formatting failures
- Metadata assembly issues
- Schema validation failures

**Success Criteria**:
- Result conforms to schema
- All required fields present
- Performance metrics calculated
- Output properly formatted

## Stage Dependencies

### Critical Path
```
Request Intake → Asset Selection → Prompt Compile → Pre-Validation → Generation Handoff → Post-Validation → Decision Routing → Final Packaging
```

### Parallel Processing Opportunities
- Reference validation can run in parallel with prompt compilation
- Quality assessment can start during generation
- Multiple validation checks can run concurrently

### Conditional Execution
- Post-Validation only if generation succeeds
- Decision routing depends on all previous results
- Retry/fallback loops can re-enter generation stage

## Configuration Alignment

### Scene Generation Pipeline Alignment
The pipeline stages align with `configs/generation/scene_generation_pipeline.json`:

| Studio OS Stage | Pipeline Stage | Status |
|------------------|------------------|---------|
| detect_scene_domain | Asset/Reference Selection | ✅ Aligned |
| apply_domain_classifier | Pre-Validation | ✅ Aligned |
| load_visual_authority | Prompt Compile | ✅ Aligned |
| apply_style_guardrails | Pre-Validation | ✅ Aligned |
| apply_character_spec | Asset/Reference Selection | ✅ Aligned |
| apply_color_modes | Prompt Compile | ✅ Aligned |
| apply_composition_grammar | Prompt Compile | ✅ Aligned |
| validate_forbidden_elements | Pre-Validation | ✅ Aligned |
| final_render_prompt | Prompt Compile | ✅ Aligned |

### Studio OS Workflow Integration
Integration points with `studio-os/` workflows:

| Workflow | Pipeline Stage | Integration Point |
|----------|------------------|------------------|
| workflow_router | Request Intake | Entry point routing |
| prompt_assembly_flow | Prompt Compile | Prompt construction |
| canon_validation_flow | Pre-Validation | Validation sequence |
| review_loop | Decision Routing | Retry/fallback logic |
| render_request_contract | Generation Handoff | Generation request |

## Performance Considerations

### Stage Timing Targets
- **Request Intake**: < 50ms
- **Asset Selection**: < 100ms
- **Prompt Compile**: < 200ms
- **Pre-Validation**: < 500ms
- **Generation Handoff**: Variable (mock: < 100ms)
- **Post-Validation**: < 300ms
- **Decision Routing**: < 50ms
- **Final Packaging**: < 50ms

### Resource Utilization
- **Memory**: Peak during generation stage
- **CPU**: Validation stages most intensive
- **I/O**: Reference lookup and asset storage
- **Network**: Generation provider calls

### Bottleneck Identification
1. **Pre-Validation**: Most computationally intensive
2. **Generation Handoff**: External dependency
3. **Reference Selection**: Asset lookup latency

## Error Recovery Strategies

### Stage-Level Recovery
- **Request Intake**: Input sanitization, default values
- **Asset Selection**: Alternative references, graceful degradation
- **Prompt Compile**: Simplified prompts, fallback styles
- **Pre-Validation**: Warnings vs. failures, partial validation
- **Generation Handoff**: Provider failover, parameter adjustment
- **Post-Validation**: Quality thresholds, acceptance criteria
- **Decision Routing**: Multiple retry strategies, fallback options
- **Final Packaging**: Schema validation, error formatting

### Cross-Stage Recovery
- **Validation Failures**: Prompt recompilation with different parameters
- **Generation Failures**: Alternative providers, parameter adjustment
- **Quality Issues**: Retry with enhanced parameters, fallback generation

## Monitoring and Observability

### Stage Metrics
- Execution time per stage
- Success/failure rates
- Resource utilization
- Error types and frequencies

### End-to-End Metrics
- Total pipeline execution time
- Overall success rate
- User satisfaction indicators
- System health indicators

### Alerting Conditions
- Stage execution time > 2x target
- Error rate > 10% for any stage
- Resource utilization > 80%
- End-to-end failure rate > 5%

## Future Enhancements

### Stage Optimizations
- Parallel validation execution
- Cached reference lookups
- Optimized prompt compilation
- Enhanced quality assessment

### New Stages
- Content optimization
- Style transfer
- Asset enhancement
- Batch processing

### Advanced Features
- Real-time progress tracking
- Dynamic stage routing
- Adaptive parameter tuning
- Learning-based optimization
