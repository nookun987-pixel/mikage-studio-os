# Canon Guard Architecture

## Purpose

The Canon Guard layer provides unified, defense-in-depth validation for all Mikage Studio OS generation flows. It ensures canon compliance at every generation entry point while maintaining clean separation of concerns and enabling future extensibility.

## Validation Stages

Canon Guard orchestrates validation in a deterministic order:

1. **Generation Task Validation** - Validates generation task objects
2. **Prompt Input Validation** - Validates prompt text and parameters
3. **Visual Tokens Validation** - Validates visual token compliance
4. **Style Profile Validation** - Validates style profile constraints

## Current Implemented Validators

### Canon Registry Validator
- **Location**: `@mikage/canon-validator`
- **Purpose**: Core canon compliance validation
- **Scope**: Canon registry, prompt canon, visual authority
- **Status**: Fully implemented

### Visual Tokens Validator
- **Location**: `packages/canon-validator/src/visual-tokens.ts`
- **Purpose**: Visual token and aesthetic validation
- **Scope**: Forbidden tokens, allowed aesthetics, token classes
- **Status**: Scaffold implementation
- **TODO**: Integrate with visual authority token system

### Style Profile Validator
- **Location**: `packages/canon-validator/src/style-profile.ts`
- **Purpose**: Style profile and constraint validation
- **Scope**: Silhouette rules, material constraints, reactor/fracture rules
- **Status**: Scaffold implementation
- **TODO**: Integrate with visual authority style system

## Protected Generation Flow

All generation flows now follow this pattern:

```
Generation Request
    ↓
CanonGuard.validateAll(...)
    ↓
Stage A: Generation Task Validation (if applicable)
    ↓
Stage B: Prompt Input Validation (if applicable)
    ↓
Stage C: Visual Tokens Validation (if applicable)
    ↓
Stage D: Style Profile Validation (if applicable)
    ↓
Generation Proceeds (if all validations pass)
```

## Entry Points Using Canon Guard

### Content Engine
- **Location**: `packages/content-engine/src/index.ts`
- **Method**: Uses `CanonGuard.validateAll()` before generation
- **Coverage**: Full validation pipeline

### Prompt Runtime
- **Location**: `packages/prompt-runtime/src/runtime.ts`
- **Method**: Uses `CanonGuard.validatePrompt()` before adapter generation
- **Coverage**: Prompt-only validation

### Generation Orchestrator
- **Location**: `packages/generation-orchestrator/src/orchestrator.ts`
- **Method**: Uses `CanonGuard.validateGenerationTask()` before task execution
- **Coverage**: Task-only validation

## Future Canon Rule Pack Integration

### Visual Authority Integration Points

#### Visual Tokens
- **File**: `packages/canon-validator/src/visual-tokens.ts`
- **Integration**: Load token rules from `docs/visual-authority/visual_authority_index.json`
- **Data Sources**: 
  - `mikage_japanese_motif_tags.json`
  - `mikage_color_modes.json`
  - `japanese_visual_knowledge_master.json`

#### Style Profiles
- **File**: `packages/canon-validator/src/style-profile.ts`
- **Integration**: Load style rules from `docs/visual-authority/visual_authority_map.md`
- **Data Sources**:
  - `01_aesthetic_philosophy/`
  - `02_edo_visual_grammar/`
  - `03_motif_library/`
  - `04_color_system/`
  - `05_calligraphy_line_system/`

### Canon Registry Integration
- **File**: `configs/canon-registry.json`
- **Purpose**: Central canon configuration and validation rules
- **Status**: Fully integrated

## Current Integration Status

**Full Integration**:
- **Content Engine**: Uses `@mikage/canon-validator.validateAll()` for complete validation pipeline

**Local Validation** (build-clean, ready for migration):
- **Prompt Runtime**: Uses local `validatePromptInput()` - TODO: migrate to `@mikage/canon-validator.validatePrompt()`
- **Generation Orchestrator**: Uses basic task validation - TODO: migrate to `@mikage/canon-validator.validateGenerationTask()`

**Migration Condition**: When monorepo TypeScript constraints allow cross-package imports without rootDir conflicts, local validation functions should be replaced with corresponding canon-validator calls.

## API Usage

### Basic Validation
```typescript
import { validateAll } from '@mikage/canon-validator';

const result = await validateAll({
  prompt: {
    text: "Mikage portrait",
    mode: "canon_core"
  },
  visual_config: {
    authority_level: 4,
    domain: "mikage_application"
  }
});

if (!result.valid) {
  throw new Error(`Canon validation failed: ${result.issues.map(i => i.message).join(', ')}`);
}
```

### Individual Stage Validation
```typescript
import { validatePrompt, validateVisualTokens } from '@mikage/canon-validator';

// Validate prompt only
const promptResult = await validatePrompt({ text: "Mikage portrait" });

// Validate visual tokens only
const visualResult = await validateVisualTokens({
  visual_config: { authority_level: 4, domain: "mikage_application" }
});
```

## Error Handling

Canon Guard uses consistent error reporting:

- **Issues**: Critical validation failures that block generation
- **Warnings**: Non-critical concerns that don't block generation
- **Stages**: Each validation result includes the stage that generated it
- **Registry Version**: Tracks which canon version was used for validation

## Architecture Benefits

1. **Defense in Depth**: Multiple validation layers ensure comprehensive canon compliance
2. **Centralized Orchestration**: Single entry point for all validation logic
3. **Extensibility**: Easy to add new validation stages without changing existing code
4. **Consistency**: Standardized error reporting and validation patterns
5. **Future-Proof**: Clear integration points for future canon rule packs

## Dependencies and Constraints

- **Core Dependency**: `@mikage/canon-validator` for fundamental validation
- **Package Boundaries**: Respects existing package boundaries and dependencies
- **No Circular Dependencies**: Clean dependency graph without circular imports
- **Backward Compatibility**: Existing validation APIs remain functional

## Testing Strategy

- **Unit Tests**: Individual validator function tests
- **Integration Tests**: End-to-end validation flow tests
- **Mock Data**: Test canon violations and edge cases
- **Performance**: Ensure validation doesn't significantly impact generation speed

## Maintenance Notes

- **Scaffold Validators**: Visual tokens and style profile validators are scaffolds awaiting integration
- **TODO Items**: Each scaffold validator includes clear integration TODOs
- **Canon Versioning**: Validation results include canon version for tracking
- **Error Monitoring**: Validation failures should be monitored for canon drift detection
