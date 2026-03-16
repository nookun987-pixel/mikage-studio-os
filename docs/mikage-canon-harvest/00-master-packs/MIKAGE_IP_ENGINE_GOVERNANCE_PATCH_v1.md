# MIKAGE IP ENGINE — GOVERNANCE PATCH v1

This file adds the three missing governance blocks required to harden the current Mikage IP Engine specification:

1. Canon Promotion Policy  
2. Drift Severity System  
3. Benchmark Asset Layers  

Use this file as an extension layer on top of the current canon, graph, prompt compiler, validation, review, and archive system.

---

## 1) CANON PROMOTION POLICY

### Purpose
Define exactly how any entity, rule, asset, event, or variation moves between canon tiers.

### Canon states

- `draft`
- `validated_soft`
- `canon_candidate`
- `hard_canon_locked`
- `deprecated`
- `retconned`

### State meanings

#### `draft`
Initial state for newly created entities, assets, prompts, experiments, or schema additions.

Characteristics:
- not trusted
- not reusable as canon reference
- may be exploratory
- may not override any existing canon

#### `validated_soft`
Entity or asset has passed baseline validation and is allowed for controlled studio use.

Characteristics:
- usable for exploration, campaigns, soft-canon materials
- may inherit from hard canon
- may not modify hard canon
- may be used in silver-set asset pools

#### `canon_candidate`
Entity or asset has passed repeated validation, review, and consistency checks and is being considered for canon promotion.

Characteristics:
- high internal quality
- consistent with ontology and invariants
- may be proposed for registry inclusion
- may be compared against hard-canon benchmarks

#### `hard_canon_locked`
Entity or asset is officially part of canon and may be used as a gold-set reference.

Characteristics:
- locked against casual editing
- must preserve provenance
- may constrain future outputs
- requires governance approval for change

#### `deprecated`
Entity or asset is no longer recommended for active use, but remains archived for traceability.

Characteristics:
- kept for history
- not used as active reference
- may still be cited in retcon history or evolution notes

#### `retconned`
Entity or asset has been explicitly superseded by a formal canon change.

Characteristics:
- must preserve prior lineage
- must link to replacement decision
- cannot silently disappear

---

### Promotion ladder

```txt
draft
→ validated_soft
→ canon_candidate
→ hard_canon_locked
```

Alternative downgrade / terminal paths:

```txt
draft → rejected
validated_soft → deprecated
canon_candidate → deprecated
hard_canon_locked → retconned
```

---

### Promotion rules

#### Rule A — Draft to validated_soft
Requires:
- full metadata present
- lineage present
- no hard-canon violation
- no critical drift flag
- minimum review completeness

#### Rule B — Validated_soft to canon_candidate
Requires:
- at least one successful review pass
- no unresolved fail-level drift
- linked character/faction/location/timeline context
- compatible with canon constitution
- usable production value

#### Rule C — Canon_candidate to hard_canon_locked
Requires:
- explicit governance approval
- zero ontology violations
- zero invariant violations
- zero critical drift
- stable provenance
- benchmark comparison against gold-set references
- written canon decision record

#### Rule D — Hard canon cannot be promoted by repetition alone
Repeated reuse does **not** automatically create hard canon.

#### Rule E — Soft canon cannot override hard canon
A soft-canon entity may extend presentation, but not contradict:
- ontology
- absolute invariants
- locked faction doctrine
- locked character truth
- locked timeline event
- locked visual governance

---

### Promotion authority

#### Allowed promotion authority

`validated_soft` approval:
- review lead
- visual director
- canon operator

`canon_candidate` approval:
- canon lead
- system architect
- project owner

`hard_canon_locked` approval:
- canon governance authority
- project owner
- designated canon committee

---

### Required decision record for hard canon

Every hard-canon promotion must create a `CanonDecision` record with:

- `decision_id`
- `entity_id`
- `entity_type`
- `previous_state`
- `new_state`
- `approved_by`
- `approval_date`
- `reason_for_promotion`
- `linked_rule_checks`
- `benchmark_comparison_notes`
- `replacement_policy_if_any`

---

### Downgrade and retcon rules

#### Deprecated
Use when:
- entity is still historically valid
- but no longer ideal as production reference

#### Retconned
Use when:
- entity conflicts with a newer canon lock
- a formal rewrite has been approved
- a timeline/state correction is required

#### Rule
No hard-canon object may be deleted without:
- retcon record
- archive retention
- lineage preservation

---

### Canon mutation rules

Forbidden:
- silent property edits on hard canon
- replacing hard canon through soft assets
- “campaign success” being treated as canon proof
- visual popularity overriding ontology

Required:
- every hard-canon mutation must create a revision trail
- every revision must preserve previous version reference

---

## 2) DRIFT SEVERITY SYSTEM

### Purpose
Turn drift flags into enforceable review logic.

### Severity levels

- `info`
- `warning`
- `fail`
- `critical_fail`

---

### Severity definitions

#### `info`
Non-blocking note.  
Does not damage canon integrity by itself.

Examples:
- minor crop imbalance
- slight over-detail
- review note for future polish

Action:
- keep record
- no automatic rejection

#### `warning`
Recoverable issue.  
Asset may still be usable after revision or may remain soft-canon only.

Examples:
- composition slightly off
- environment readability weak
- editorial polish too strong for canon-core
- excessive ornament density without full canon break

Action:
- revision recommended
- cannot promote to hard canon until resolved

#### `fail`
Meaningful canon or production problem.  
Asset should not pass as approved production canon in its current state.

Examples:
- palette drift
- weak damage language
- faction readability failure
- character emotional tone too casual
- technology consequence not visible enough
- incomplete metadata or broken lineage

Action:
- reject from approval
- may be repaired and resubmitted
- cannot enter gold-set
- cannot be promoted

#### `critical_fail`
Direct violation of ontology, invariants, or core identity.

Examples:
- no-cost power
- fake magic behavior
- Mikage reduced to idol/caricature
- fourth ideological pole replacing triangle
- hard-canon contradiction
- fantasy collapse
- clean violence with zero trace in a canon-critical scene

Action:
- immediate rejection
- isolate in red-flag set
- mark as anti-reference example
- block promotion path

---

### Drift categories

Each drift flag should use both:
- `drift_category`
- `severity`

#### Recommended categories

- `ontology_drift`
- `technology_drift`
- `character_drift`
- `faction_drift`
- `timeline_drift`
- `palette_drift`
- `camera_drift`
- `material_drift`
- `composition_drift`
- `archive_drift`
- `editorial_overreach`
- `generic_cyberpunk_drift`

---

### Example matrix

| drift_flag | category | severity | default action |
|---|---|---:|---|
| missing lineage | archive_drift | fail | reject until fixed |
| palette extension without approval | palette_drift | fail | reject until reviewed |
| weak fracture/damage language | material_drift | fail | revise |
| mild silhouette clutter | composition_drift | warning | revise |
| fashion too glossy but still in-family | editorial_overreach | warning | limit to soft canon |
| weapon acts like magic | technology_drift | critical_fail | reject immediately |
| Mikage reads as anime idol | character_drift | critical_fail | reject immediately |
| scene adds fourth worldview pole | ontology_drift | critical_fail | reject immediately |
| environment lacks social logic | world_drift | fail | revise |
| camera too chaotic / shaky | camera_drift | fail | revise |

---

### Severity aggregation rules

#### Rule A — Any critical_fail = full rejection
If any asset, entity, or prompt receives one `critical_fail`, it cannot pass review.

#### Rule B — Two or more fail flags = rejection
Even without critical failure, multiple fail-level drifts indicate instability.

#### Rule C — Warnings cap promotion
Assets with unresolved warnings may remain:
- draft
- validated_soft

But may not become:
- canon_candidate
- hard_canon_locked

#### Rule D — Info flags never block promotion directly
They remain as notes only.

---

### Validator output policy

Every validation result should return:

- `status`
- `drift_flags`
- `highest_severity`
- `promotion_blocked`
- `recommended_action`

#### Valid statuses

- `pass`
- `pass_with_warnings`
- `reject`
- `critical_reject`

---

### Recommended action mapping

| highest_severity | status | recommended_action |
|---|---|---|
| info | pass | archive and continue |
| warning | pass_with_warnings | revise before promotion |
| fail | reject | repair and resubmit |
| critical_fail | critical_reject | isolate and block |

---

### Character-specific critical fails for Mikage

Always treat the following as `critical_fail`:

- childish anime simplification
- exaggerated idol caricature
- cartoon fantasy collapse
- emotionally flippant Mikage in canon-core
- unexplained supernatural behavior
- pristine luxury perfection with zero consequence trace
- removal of porcelain / void / visceral-crimson identity logic in core assets

---

### Technology-specific critical fails

Always treat the following as `critical_fail`:

- system has no energy source
- system has no cost model
- system leaves no trace
- system has no failure mode
- system behaves like intent-reading or telekinesis without physical explanation

---

## 3) BENCHMARK ASSET LAYERS

### Purpose
Create fixed reference layers for validation, training, archive governance, and future fine-tuning.

### Asset benchmark layers

- `gold_set`
- `silver_set`
- `red_flag_set`

---

### A. Gold set

#### Definition
Absolute reference layer.

These are the highest-trust assets in the system and define canon-bearing visual truth.

#### Use cases
- validation comparison
- canon promotion benchmarking
- style lock references
- future training / tuning references
- partner briefing
- review calibration

#### Requirements
Every gold-set asset must have:
- `hard_canon_locked`
- full lineage
- full metadata
- no unresolved warnings
- no fail flags
- no critical drift
- linked rules
- linked entities
- benchmark-approved review notes

#### Recommended gold-set coverage
At minimum include:
- Mikage canon-core portrait
- Mikage luminous fan appeal approved version
- Mikage luxury mystical editorial approved version
- White Monolith flagship environment
- core sacred/threshold environment
- one approved weapon-sheet for Zenith Blade
- one flagship conflict scene showing consequence
- one Japanese grammar bridge reference image lineage example

#### Gold-set rule
Gold-set assets are not just “pretty winners.”  
They are governance references.

---

### B. Silver set

#### Definition
Approved production layer for usable assets that are canon-safe or controlled soft-canon, but not absolute reference anchors.

#### Use cases
- campaigns
- posters
- social assets
- exploratory production
- derivative packages
- monetizable outputs with controlled risk

#### Requirements
Silver-set assets must have:
- approved lineage
- valid metadata
- no critical drift
- no unresolved fail-level canon breach
- clear classification

#### Silver-set can include
- validated_soft
- canon_candidate
- campaign-safe editorial variations
- location and faction assets not yet promoted to gold

#### Silver-set rule
Silver-set is where the studio operates day to day.

---

### C. Red-flag set

#### Definition
Rejected or failed outputs retained as anti-reference material.

#### Use cases
- anti-drift training
- validator tuning
- reviewer training
- prompt failure analysis
- collaboration guardrails

#### Requirements
Every red-flag asset must include:
- rejection reason
- drift category
- severity
- review notes
- prompt lineage
- linked failed rules if known

#### Typical red-flag examples
- generic cyberpunk drift
- idol drift
- fantasy collapse
- no-cost power visuals
- soft editorial glamour with no fracture logic
- invalid palette/camera behavior
- non-functional sacred imagery

#### Red-flag rule
Rejected assets are useful.  
They teach the system what **not** to become.

---

### Benchmark relation model

Recommended graph relations:

- `(:Asset)-[:BENCHMARK_LAYER]->(:BenchmarkLayer {name:"gold_set"})`
- `(:Asset)-[:BENCHMARK_LAYER]->(:BenchmarkLayer {name:"silver_set"})`
- `(:Asset)-[:BENCHMARK_LAYER]->(:BenchmarkLayer {name:"red_flag_set"})`

Optional:
- `(:Asset)-[:COMPARES_AGAINST]->(:Asset)`
- `(:Asset)-[:FAILED_RULE]->(:Rule)`
- `(:Asset)-[:TEACHES_AVOIDANCE_OF]->(:DriftFlag)`

---

### Promotion rules between benchmark layers

#### Draft to silver_set
Allowed if:
- approved for studio use
- no critical drift
- lineage complete

#### Silver_set to gold_set
Allowed if:
- hard_canon_locked
- benchmark-reviewed
- stable as long-term reference
- reusable for future validator calibration

#### Any asset to red_flag_set
Allowed if:
- rejected
- drift clearly identified
- retained intentionally for training or audit

#### Rule
A red-flag asset can never promote directly to gold_set.  
It must be regenerated or substantially revised and re-reviewed as a new asset instance.

---

### Review priority by benchmark layer

#### Gold set
Highest review discipline.
Requires canon governance oversight.

#### Silver set
Operational review discipline.
Requires production review and validator pass.

#### Red-flag set
Documentation discipline.
Requires clear failure annotation.

---

### Minimal benchmark registry schema

```yaml
benchmark_asset_record:
  asset_id: string
  benchmark_layer: gold_set | silver_set | red_flag_set
  canon_status: string
  review_score: integer
  drift_flags: [string]
  linked_rules: [string]
  lineage_complete: boolean
  approved_by: [string]
  benchmark_notes: string
```

---

## Integration rule

These three governance blocks must be plugged into:

- canon graph
- prompt compiler validator
- asset review taxonomy
- archive/indexing system
- future canon committee workflow

### Operational result
After this patch, the system can now answer:

- what is draft vs soft vs hard canon
- who is allowed to promote canon
- what type of drift merely warns vs fully rejects
- which assets define truth
- which assets are usable but not absolute
- which assets are retained as anti-reference material

This patch converts the current spec from strong design doctrine into enforceable governance.
