# Mikage Studio OS System Map

## Architecture Overview

```
Mikage Studio OS
├── docs/
│   ├── lore-core/           # Canon source
│   ├── style-guardrails/    # Generation constraints
│   └── visual-authority/   # Domain enforcement
├── configs/
│   └── generation/         # Resolution logic
├── datasets/
│   └── visual-index/       # Retrieval layer
└── studio-os/              # Workflow layer
```

## Execution Flow

```
Request → Classification → Prompt Assembly → Validation → Review
    ↓         ↓                ↓              ↓         ↓
studio-os/  configs/         studio-os/      studio-os/ studio-os/
workflow_   generation/      prompt_         canon_    review_
router.json domain_         assembly_       validation loop.json
           classifier.json  flow.json       flow.json
```

## Layer Dependencies

1. **Request Entry** → `studio-os/workflow_router.json`
2. **Domain Classification** → `configs/generation/domain_classifier.json`
3. **Visual Authority Load** → `docs/visual-authority/neo_tokyo_reference_index.json`
4. **Style Guardrails Apply** → `docs/style-guardrails/`
5. **Prompt Assembly** → `studio-os/prompt_assembly_flow.json`
6. **Canon Validation** → `studio-os/canon_validation_flow.json`
7. **Review Loop** → `studio-os/review_loop.json`

## Critical Path

Imperial environments → Domain precedence → Style guardrails → Visual reference
White Monolith protection enforced at validation stage
