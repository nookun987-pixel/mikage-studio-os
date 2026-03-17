# Runtime Integration Readme

## Overview

This document provides comprehensive information about the Mikage Studio OS runtime integration, including dependency graph, execution paths, and testing procedures.

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPENDENCY GRAPH                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Runtime Layer                                               │
│  ├── packages/generation-orchestrator/src/pipeline_runtime.ts │
│  ├── packages/generation-orchestrator/src/local_runner.ts    │
│  └── packages/generation-orchestrator/src/types.ts          │
│           │                                                 │
│           ▼                                                 │
│  Validation Layer                                            │
│  ├── packages/canon-validator/src/canon-guard.ts            │
│  ├── packages/canon-validator/src/validator.ts              │
│  └── packages/canon-validator/src/types.ts                 │
│           │                                                 │
│           ▼                                                 │
│  Content Engine Layer                                        │
│  ├── packages/content-engine/src/content_engine_adapter.ts │
│  ├── packages/content-engine/src/pre_generation_hook.ts    │
│  ├── packages/content-engine/src/post_generation_hook.ts   │
│  └── packages/content-engine/src/retry_fallback_adapter.ts │
│           │                                                 │
│           ▼                                                 │
│  Configuration Layer                                         │
│  ├── configs/generation/pipeline_request_schema.json        │
│  ├── configs/generation/pipeline_result_schema.json         │
│  ├── configs/generation/scene_generation_pipeline.json      │
│  └── configs/generation/mode_registry.json                   │
│           │                                                 │
│           ▼                                                 │
│  Documentation Layer                                        │
│  ├── docs/prompt-canon/                                     │
│  ├── docs/style-guardrails/                                │
│  ├── docs/asset-system/                                    │
│  └── datasets/visual-index/                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Package Dependencies

### @mikage/generation-orchestrator
```json
{
  "dependencies": {
    "@mikage/content-engine": "workspace:*",
    "@mikage/canon-validator": "workspace:*",
    "zod": "^3.24.2"
  }
}
```

### @mikage/content-engine
```json
{
  "dependencies": {
    "@mikage/contracts": "workspace:*",
    "@mikage/provider-registry": "workspace:*",
    "@mikage/asset-lineage": "workspace:*",
    "@mikage/generation-evaluator": "workspace:*",
    "@mikage/asset-registry": "workspace:*",
    "@mikage/scene-graph": "workspace:*",
    "@mikage/canon-validator": "workspace:*",
    "zod": "^3.24.2"
  }
}
```

### @mikage/canon-validator
```json
{
  "dependencies": {
    "@mikage/contracts": "workspace:*",
    "zod": "^3.24.2"
  }
}
```

## Real Run Path

### Primary Execution Flow
```
1. Local Runner (CLI)
   ↓
2. Pipeline Runtime (orchestration)
   ↓
3. Reference Selection (scaffolded)
   ↓
4. Prompt Compilation (scaffolded)
   ↓
5. Pre-Generation Validation (canon-validator)
   ↓
6. Content Engine Adapter (content-engine)
   ↓
7. Post-Generation Validation (scaffolded)
   ↓
8. Decision Routing (scaffolded)
   ↓
9. Result Packaging (pipeline_runtime)
```

### Alternative Paths
- **Dry-Run**: Stops after pre-validation
- **Validation-Run**: Includes mock generation and post-validation
- **Compile-Run**: Stops after prompt compilation
- **Full-Run**: Attempts complete pipeline (may fail without generation backend)

## What is Real vs Scaffolded

### Fully Implemented ✅
- **Pipeline orchestration structure**: Complete stage management and error handling
- **Request/response schemas**: JSON schema validation and TypeScript interfaces
- **Content engine adapter integration**: Full integration with retry/fallback logic
- **Canon validator integration**: Pre-generation validation using canon-guard
- **TypeScript type safety**: Complete type coverage and validation
- **CLI runner interface**: Command-line interface with multiple modes
- **Error handling**: Comprehensive error handling and reporting
- **Result normalization**: Consistent result formatting and metadata

### Scaffolded but Functional 🔧
- **Reference selection**: Basic structure with mock data
- **Prompt compilation**: Multi-stage compilation with constraint application
- **Pre-generation validation**: Basic validation checks with confidence scoring
- **Post-generation validation**: Quality assessment framework
- **Decision routing**: Retry/fallback logic with strategy selection
- **Quality metrics**: Technical and artistic quality scoring

### Mock/Stubs 🎭
- **Generation providers**: No real backend, mock responses only
- **Asset registry**: No real asset lookup, mock references only
- **Visual analysis**: No actual image analysis, simulated scores
- **External services**: All external calls are mocked

## Exact Local Test Commands

### Prerequisites
```bash
# Install dependencies
npm install

# Build all packages
npm run build
```

### Basic Pipeline Tests
```bash
# Navigate to orchestrator package
cd packages/generation-orchestrator

# Run TypeScript check
npm run typecheck

# Create sample requests
node dist/local_runner.js create-samples

# Run dry-run mode
node dist/local_runner.js dry-run sample_character_request.json result_dry.json

# Run validation-run mode
node dist/local_runner.js validation-run sample_character_request.json result_validation.json

# Run compile-run mode
node dist/local_runner.js compile-run sample_character_request.json result_compile.json
```

### Full Demo
```bash
# Run complete demo (creates samples and tests all modes)
node dist/local_runner.js demo
```

### Manual Testing
```bash
# Create custom request
cat > my_request.json << EOF
{
  "request_id": "req_test_001",
  "mode": "canon_core",
  "prompt_intent": {
    "primary_intent": "character_portrait",
    "description": "Test portrait generation"
  }
}
EOF

# Run with custom request
node dist/local_runner.js dry-run my_request.json my_result.json

# Check result
cat my_result.json | jq '.final_status'
```

## Expected Output Structure

### Successful Result
```json
{
  "result_id": "result_req_test_001_1234567890",
  "request_metadata": {
    "request_id": "req_test_001",
    "mode": "canon_core",
    "requested_at": "2026-03-17T00:00:00Z",
    "initiated_at": "2026-03-17T00:00:01Z",
    "completed_at": "2026-03-17T00:00:05Z"
  },
  "selected_references": {
    "character_references": [...],
    "environment_references": [...],
    "style_references": [...]
  },
  "compiled_prompt": {
    "final_prompt": "...",
    "compilation_stages": [...],
    "applied_constraints": [...]
  },
  "pre_validation_results": {
    "validation_status": "passed",
    "confidence_score": 0.9,
    "validation_checks": [...]
  },
  "engine_result": {
    "generation_status": "mock",
    "mock_data": true,
    "note": "Dry run mode - no actual generation performed"
  },
  "post_validation_results": null,
  "retry_fallback_recommendation": {
    "final_decision": "accepted",
    "retry_eligible": false,
    "max_retries": 0,
    "current_attempt": 0
  },
  "final_status": {
    "status": "completed",
    "success": true,
    "total_processing_time_ms": 4000,
    "stage_breakdown": {...}
  }
}
```

## Troubleshooting

### Common Issues

#### 1. TypeScript Compilation Errors
```bash
# Check TypeScript version
npx tsc --version

# Clean build
rm -rf packages/*/dist
npm run build

# Check specific package
cd packages/generation-orchestrator
npm run typecheck
```

#### 2. Module Resolution Errors
```bash
# Check workspace setup
npm ls

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check package exports
npm list @mikage/content-engine
npm list @mikage/canon-validator
```

#### 3. Runtime Errors
```bash
# Check Node.js version
node --version

# Run with verbose output
DEBUG=* node dist/local_runner.js dry-run sample_request.json

# Check file permissions
ls -la sample_*.json
```

### Error Scenarios

#### Request Validation Errors
```
Error: Missing required field: request_id
```
**Solution**: Ensure request includes all required fields from schema

#### Canon Validator Errors
```
Error: Canon validation failed: character_not_found
```
**Solution**: Check character references against canon documentation

#### Content Engine Errors
```
Error: Content engine adapter not initialized
```
**Solution**: Ensure content-engine package is properly built

## Performance Monitoring

### Built-in Metrics
Each pipeline result includes performance metrics:
- Total processing time
- Stage breakdown timing
- Validation confidence scores
- Quality assessment results

### Monitoring Commands
```bash
# Extract timing from results
cat result_*.json | jq '.final_status.total_processing_time_ms'

# Check validation confidence
cat result_*.json | jq '.pre_validation_results.confidence_score'

# Stage performance breakdown
cat result_*.json | jq '.final_status.stage_breakdown'
```

### Performance Targets
- **Dry-run**: < 1 second total
- **Validation-run**: < 2 seconds total
- **Compile-run**: < 1.5 seconds total
- **Full-run**: Variable (depends on generation backend)

## Next Missing Execution Layer

### Current State
The pipeline runtime is complete up to the content engine adapter. The missing layer is the actual generation backend.

### Required Components
1. **Generation Provider Interface**
   - Abstract provider interface
   - Provider registry integration
   - Provider health monitoring

2. **Real Generation Backend**
   - Image generation service integration
   - Video generation service integration
   - Text generation service integration

3. **Asset Management System**
   - Real asset registry integration
   - Asset storage and retrieval
   - Asset metadata management

4. **Quality Assessment System**
   - Real visual quality analysis
   - Canon compliance verification
   - Technical quality metrics

### Implementation Priority
1. **High Priority**: Generation provider abstraction
2. **Medium Priority**: Asset registry integration
3. **Low Priority**: Advanced quality assessment

## Integration Testing

### Test Scenarios
1. **Happy Path**: Valid request with all references
2. **Missing References**: Request with incomplete references
3. **Validation Failures**: Canon violations and style issues
4. **Generation Failures**: Provider errors and timeouts
5. **Retry Logic**: Multiple retry attempts and fallbacks

### Test Commands
```bash
# Run all test scenarios
npm run test:pipeline

# Run specific test category
npm run test:validation
npm run test:generation
npm run test:retry

# Performance tests
npm run test:performance
```

## Deployment Considerations

### Local Development
- All components run locally
- No external dependencies required for basic functionality
- Mock generation providers for testing

### Production Deployment
- Requires generation backend integration
- Needs asset registry connectivity
- Requires monitoring and observability setup

### Scaling Considerations
- Pipeline can be horizontally scaled at orchestration layer
- Validation stages can be parallelized
- Generation providers can be load-balanced

## Security Considerations

### Input Validation
- All requests validated against JSON schema
- Prompt content sanitized and checked
- Reference IDs validated against allowed patterns

### Output Security
- Generated content marked as synthetic
- Sensitive metadata filtered
- File paths validated and sandboxed

### Runtime Security
- Resource limits enforced per request
- Memory and CPU usage monitored
- Network access restricted to approved providers

## Maintenance and Updates

### Regular Maintenance
- Update canon documentation references
- Refresh style guardrails rules
- Update generation provider configurations

### Version Compatibility
- Schema versioning for request/response formats
- Backward compatibility for existing integrations
- Migration paths for breaking changes

### Monitoring and Alerting
- Pipeline health monitoring
- Performance threshold alerts
- Error rate tracking and notification
