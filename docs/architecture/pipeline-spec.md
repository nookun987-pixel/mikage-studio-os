# Mikage — Pipeline Specification

This document defines the canonical production pipeline used by the Mikage Studio OS.

Agents must not alter the order of these stages.

---

# 1. Pipeline Overview

The Mikage creative pipeline is:

context  
→ narrative  
→ canon validation  
→ production package  
→ generation  
→ benchmark

Each stage must complete before the next stage begins.

---

# 2. Stage Definitions

## Context Stage

Purpose:

collect the information required to construct a story request.

Inputs may include:

- project identity
- character references
- world state
- scene request
- narrative intent

Outputs:

Context Packet.

---

## Narrative Stage

Purpose:

convert context into structured narrative instructions.

This stage defines:

- scene composition
- narrative beats
- character actions
- emotional tone
- environment description

Outputs:

Narrative Packet.

---

## Canon Validation Stage

Purpose:

ensure narrative instructions obey world rules.

Validation checks include:

- canon consistency
- world physics rules
- character state validity
- narrative contradictions

If validation fails, generation must not proceed.

Outputs:

Validated Narrative.

---

## Production Package Stage

Purpose:

convert validated narrative into generation-ready data.

The production package includes:

- prompt pack
- canon constraints
- style locks
- generation objective
- metadata required for lineage

Outputs:

Production Package.

---

## Generation Stage

Purpose:

produce assets using AI models.

Examples:

- cinematic frames
- character portraits
- trailer sequences

Generation must preserve:

- prompt trace
- model identity
- seed
- reference inputs

Outputs:

Generated Asset.

---

## Benchmark Stage

Purpose:

evaluate the generated asset.

Checks may include:

- style compliance
- canon alignment
- quality thresholds
- visual identity consistency

Assets may be:

- approved
- flagged for review
- rejected

Outputs:

Benchmark Report.

---

# 3. Pipeline Safety Rules

Agents must not:

- skip canon validation
- generate assets directly from context
- bypass production packaging
- approve assets without benchmark checks

The pipeline must remain intact.

---

# 4. Lineage and Traceability

Every generated asset must preserve:

- production package ID
- prompt pack ID
- model identifier
- seed
- generation timestamp
- lineage hash

Traceability must never be weakened.

---

# 5. Character Consistency (Future Integration)

Future character systems will require:

- character reference binding
- identity embeddings
- visual drift validation

Generation involving characters must reference approved character packages.

---

# 6. Failure Handling

If any stage fails:

- the pipeline must stop
- failure reason must be recorded
- upstream stages must not be bypassed

Recovery must restart from the correct stage.

---

# 7. Pipeline Stability

The pipeline specification is part of the core Mikage architecture.

Agents must treat it as non-negotiable system behavior.