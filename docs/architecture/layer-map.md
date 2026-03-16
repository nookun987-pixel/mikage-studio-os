# Mikage — Layer Map

This document defines the architectural layers of the Mikage Studio OS.

Agents must not invent new layers or bypass existing ones.

All new functionality must be mapped to an existing layer or introduced through a clearly defined new wave.

---

# 1. Architectural Principle

Mikage is a **canon-governed generative studio system**.

The system is layered so that:

- narrative integrity
- canon enforcement
- asset generation
- validation
- lineage traceability

are never bypassed.

Layers must always be respected.

---

# 2. Core Pipeline Layers

The canonical pipeline is:

context  
→ narrative  
→ canon validation  
→ production package  
→ generation  
→ benchmark

No implementation may skip or reorder these stages.

---

# 3. Layer Overview

## Layer 1–5 — Workspace and Contracts

Purpose:

- workspace wiring
- core contracts
- shared DTO definitions
- repo configuration

Key files:

- root package.json
- tsconfig.base.json
- pnpm-workspace.yaml
- turbo.json

Agents must read these first.

---

## Layer 6–10 — Studio Core Logic

Purpose:

- narrative construction
- canon enforcement
- production packaging
- generation preparation

Important packages include:

- prompt compiler
- canon validator
- production assembler
- content engine
- benchmark auditor

These packages define the **creative pipeline**.

---

## Layer 11 — Provider Adapters

Purpose:

connect the generation layer to external AI providers.

Examples:

- Gemini image generation
- Seedance video generation

Components:

- provider registry
- image provider adapters
- video provider adapters

Rules:

- adapters must follow strict typed contracts
- provider logic must remain isolated
- generation pipeline must remain deterministic

---

## Layer 12 — Character Casting Layer (Planned)

Purpose:

maintain visual identity consistency across generations.

Components:

- character-reference-registry
- character-embedding-store
- generation-reference-binding
- visual-identity-validator

Goals:

- prevent character visual drift
- bind generation to reference sheets
- enforce identity consistency

---

## Future Layers

Additional layers may include:

- evaluation engines
- automated benchmark scoring
- asset lineage engines
- reproducibility engines

These must integrate with existing pipeline stages.

---

# 4. Layer Rules

Agents must not:

- invent new layers
- bypass existing layers
- merge multiple layers into one
- add shortcuts that skip validation

Any architectural change must be proposed explicitly.

---

# 5. Layer Ownership

Each layer has a clear responsibility.

Example:

| Layer | Responsibility |
|------|---------------|
| Workspace | repo wiring |
| Contracts | shared types |
| Canon | story rules |
| Production | asset preparation |
| Generation | AI execution |
| Benchmark | validation |
| Provider | model integration |
| Character | identity control |

Responsibilities must not overlap unnecessarily.

---

# 6. Implementation Guidance

When implementing new functionality:

1. identify which layer owns the behavior
2. verify contracts of that layer
3. confirm public exports
4. implement within that layer only

Do not move behavior across layers without architectural approval.

---

# 7. Architectural Stability Rule

The layer map is considered **stable architecture**.

Agents must treat it as the structural backbone of the system.

Any deviation must be explicitly approved.