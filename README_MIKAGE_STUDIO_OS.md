# Mikage Studio OS

Mikage Studio OS is a canon-compliant visual generation system that enforces Japanese cultural and aesthetic integrity through structured layers of validation, authority, and workflow management.

## Core Folders

- `docs/lore-core` - Canon source of truth
- `docs/style-guardrails` - Active generation constraints
- `docs/visual-authority` - Reference authority + domain enforcement
- `configs/generation` - Resolution logic and classification
- `datasets/visual-index` - Retrieval and indexing layer
- `studio-os` - Workflow and runtime layer

## System Layers

1. **Canon Source** (`docs/lore-core`) - Immutable lore and character definitions
2. **Style Guardrails** (`docs/style-guardrails`) - Active generation constraints and forbidden elements
3. **Visual Authority** (`docs/visual-authority`) - Reference authority with domain enforcement
4. **Generation Configs** (`configs/generation`) - Classification, resolution, and pipeline logic
5. **Visual Index** (`datasets/visual-index`) - Asset taxonomy, tagging, and scene mapping
6. **Studio OS** (`studio-os`) - Workflow routing, validation, and runtime management

## Precedence Rules

1. **Scene Domain** - Imperial vs Neo-Tokyo classification
2. **Environment Authority** - White Monolith and imperial preservation zones
3. **Character Identity** - Canon-compliant character specifications
4. **Style Guardrails** - Material, color, and composition constraints
5. **Visual Reference** - Asset retrieval and reference authority

**Critical Rule:** White Monolith and imperial porcelain environments always override Neo-Tokyo clutter logic.

## Safe Operating Rules

- Always classify scene domain before generation
- Apply environment authority before visual references
- Never allow Neo-Tokyo elements in imperial contexts
- Preserve canon-first behavior in all workflows
- Use validation flow to prevent cross-domain contamination

## Recommended Workflow Order

1. Detect scene domain using `configs/generation/domain_classifier.json`
2. Load visual authority from `docs/visual-authority/neo_tokyo_reference_index.json`
3. Apply style guardrails from `docs/style-guardrails/`
4. Assemble prompt using `studio-os/prompt_assembly_flow.json`
5. Validate using `studio-os/canon_validation_flow.json`
6. Review and approve using `studio-os/review_loop.json`

This workflow ensures canon compliance while maintaining operational efficiency.
