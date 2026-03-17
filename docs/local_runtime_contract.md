# Local Runtime Contract

## Overview

This document defines the minimal local runtime contract for the Mikage Studio OS generation pipeline.

## Minimal Local Run Path

```
Input Request
    ↓
Request Parsing & Normalization
    ↓
Reference/Asset Selection
    ↓
Prompt Compilation
    ↓
Pre-Generation Validation
    ↓
Generation Handoff (Optional)
    ↓
Post-Generation Validation (Optional)
    ↓
Retry/Fallback Recommendation
    ↓
Normalized Pipeline Result
```

## Required Input

### Pipeline Request Schema
- **File**: `configs/generation/pipeline_request_schema.json`
- **Format**: JSON
- **Validation**: Schema validation required
- **Required Fields**:
  - `request_id` (string, pattern: `req_[a-zA-Z0-9_]+_[0-9]+`)
  - `mode` (enum: canon_core, luminous_fan_appeal, imperial_majesty, cinematic_drama, reference_sheet)
  - `prompt_intent` (object with primary_intent and description)

### Minimal Request Example
```json
{
  "request_id": "req_character_portrait_001",
  "mode": "canon_core",
  "prompt_intent": {
    "primary_intent": "character_portrait",
    "description": "Generate a portrait of Lyra in the white monolith"
  }
}
```

## Expected Output

### Pipeline Result Schema
- **File**: `configs/generation/pipeline_result_schema.json`
- **Format**: JSON
- **Required Fields**:
  - `result_id` (string)
  - `request_metadata` (object)
  - `compiled_prompt` (object)
  - `pre_validation_results` (object)
  - `final_status` (object)

### Minimal Result Example
```json
{
  "result_id": "result_req_character_portrait_001_1234567890",
  "request_metadata": {
    "request_id": "req_character_portrait_001",
    "mode": "canon_core",
    "requested_at": "2026-03-17T00:00:00Z",
    "initiated_at": "2026-03-17T00:00:01Z",
    "completed_at": "2026-03-17T00:00:05Z"
  },
  "compiled_prompt": {
    "final_prompt": "Portrait of Lyra in the white monolith, following Mikage canon style guidelines",
    "compilation_stages": [...],
    "applied_constraints": [...]
  },
  "pre_validation_results": {
    "validation_status": "passed",
    "confidence_score": 0.9,
    "validation_checks": [...]
  },
  "final_status": {
    "status": "completed",
    "success": true,
    "total_processing_time_ms": 4000,
    "stage_breakdown": {...}
  }
}
```

## Package Call Hierarchy

```
packages/generation-orchestrator/src/pipeline_runtime.ts
    ├── packages/canon-validator/src/canon-guard.ts
    ├── packages/content-engine/src/content_engine_adapter.ts
    └── configs/generation/*.json
```

### Call Flow
1. **PipelineRuntime** (entry point)
2. **CanonGuard** (validation)
3. **ContentEngineAdapter** (generation handoff)
4. **Reference/Prompt compilation** (internal)

## Current Runtime Assumptions

### Implemented Components
- ✅ Request parsing and normalization
- ✅ Reference selection (scaffolded)
- ✅ Prompt compilation (scaffolded)
- ✅ Pre-generation validation (scaffolded)
- ✅ Content engine adapter integration
- ✅ Retry/fallback recommendation (scaffolded)
- ✅ Result normalization

### External Dependencies
- **Content Engine Adapter**: Fully integrated
- **Canon Validator**: Fully integrated
- **Generation Providers**: Mock/stubbed (no real backend)

### Configuration Dependencies
- `configs/generation/pipeline_request_schema.json`
- `configs/generation/pipeline_result_schema.json`
- `configs/generation/scene_generation_pipeline.json`

## Known Limitations

### Generation Backend
- **Status**: No real generation backend exists
- **Workaround**: Mock generation results provided
- **Impact**: Full end-to-end generation not possible
- **Next Step**: Implement or integrate generation provider

### Reference System
- **Status**: Reference lookup is scaffolded
- **Workaround**: Mock reference data provided
- **Impact**: Limited reference validation and selection
- **Next Step**: Implement asset registry integration

### Validation Depth
- **Status**: Canon validation is basic
- **Workaround**: Simplified validation rules
- **Impact**: Limited canon compliance checking
- **Next Step: Enhance canon validator with full rule set**

## What is Implemented vs Scaffolded

### Fully Implemented
- Pipeline orchestration structure
- Request/response schema validation
- Content engine adapter integration
- Error handling and result packaging
- TypeScript type safety

### Scaffolded but Functional
- Reference selection logic
- Prompt compilation stages
- Pre-generation validation checks
- Post-generation validation
- Retry/fallback decision routing

### Mock/Stubs
- Generation provider calls
- Asset registry lookups
- External service integrations
- Real-time quality assessment

## Execution Modes

### Dry-Run Mode
- **Purpose**: Validate request and pipeline flow
- **Generation**: Skipped
- **Validation**: Full pre-validation
- **Output**: Complete result with mock generation data

### Validation-Run Mode
- **Purpose**: Test validation logic only
- **Generation**: Skipped
- **Validation**: Full pre and post-validation
- **Output**: Validation results only

### Compile-Run Mode
- **Purpose**: Test prompt compilation
- **Generation**: Skipped
- **Validation**: Pre-validation only
- **Output**: Compiled prompt and references

### Full-Run Mode
- **Purpose**: Complete pipeline execution
- **Generation**: Attempted (may fail without backend)
- **Validation**: Full validation
- **Output**: Complete result with real generation (if available)

## Error Handling

### Expected Error Types
- **Request Validation Errors**: Invalid request schema
- **Reference Errors**: Missing or invalid references
- **Validation Errors**: Canon compliance failures
- **Generation Errors**: Provider failures
- **System Errors**: Runtime exceptions

### Error Response Format
```json
{
  "result_id": "result_req_001_error",
  "final_status": {
    "status": "failed",
    "success": false,
    "total_processing_time_ms": 1000
  },
  "engine_result": {
    "generation_status": "failed",
    "error": "Specific error message"
  }
}
```

## Performance Expectations

### Target Performance (per request)
- **Request Parsing**: < 50ms
- **Reference Selection**: < 100ms
- **Prompt Compilation**: < 200ms
- **Pre-Validation**: < 500ms
- **Generation**: Variable (mock: < 100ms)
- **Post-Validation**: < 300ms
- **Total**: < 1.5s (excluding real generation)

### Resource Requirements
- **Memory**: < 100MB per request
- **CPU**: Minimal for validation stages
- **Storage**: Temporary only, < 10MB per request

## Security Considerations

### Input Validation
- All requests validated against JSON schema
- Prompt content sanitized
- Reference IDs validated against allowed patterns
- Generation parameters bounded

### Output Sanitization
- All generated content marked as synthetic
- Sensitive metadata filtered
- File paths validated
- Error messages sanitized

## Monitoring and Observability

### Required Metrics
- Request processing time
- Stage execution times
- Validation success rates
- Error rates by type
- Resource utilization

### Log Format
```json
{
  "timestamp": "2026-03-17T00:00:00Z",
  "request_id": "req_character_portrait_001",
  "stage": "pre_validation",
  "status": "completed",
  "duration_ms": 250,
  "metadata": {...}
}
```

## Testing Requirements

### Unit Tests
- Request parsing and normalization
- Reference selection logic
- Prompt compilation stages
- Validation checks
- Error handling

### Integration Tests
- Full pipeline execution
- Content engine adapter integration
- Canon validator integration
- Schema validation

### End-to-End Tests
- Complete request flow
- Error scenarios
- Performance benchmarks
- Resource usage validation

## Future Enhancements

### Short Term (Next Sprint)
- Real reference system integration
- Enhanced validation rules
- Generation provider abstraction
- Improved error messages

### Medium Term (Next Month)
- Real generation backend integration
- Advanced prompt optimization
- Quality assessment algorithms
- Performance optimization

### Long Term (Next Quarter)
- Distributed execution support
- Advanced retry strategies
- Machine learning optimization
- Real-time monitoring dashboard
