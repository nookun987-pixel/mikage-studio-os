# Mikage Prompt Canon Pack — prompt_structure

## Scope
This pack normalizes the missing prompt-canon layer for Mikage using only existing project sources. It does not add new lore, new modes, or new canon entities.

## Canon source stack
Use these sources as the canonical prompt basis:
1. `MIKAGE_PROJECT_MASTER.md`
2. `03_Mikage_Prompt_Pack.txt`
3. `04_Studio_Test_Workflow.txt`
4. `MIKAGE — PROMPT COMPILER CONFIG PACK v1.md`
5. `MIKAGE — SEED DATA PACK v1.md`
6. `MIKAGE — CANON VALIDATOR RULE PACK v1.md`
7. `MIKAGE — RUNTIME UPGRADE PACK v2.md`
8. Japanese visual grammar packs when a prompt explicitly uses Japanese art grammar or reference-style grounding.

## Fixed generation law
All Mikage visual test runs must compile and generate exactly three modes:
- `canon_core`
- `luminous_fan_appeal`
- `luxury_mystical_editorial`

A valid generation package for any mode must include:
- positive prompt
- negative prompt
- sampler
- steps
- cfg
- seed rule / seed policy
- receipt-ready metadata

## Compiler flow
Input:
- `preset_id`
- `variant_id`
- `objective_id`
- `seed_policy` or inherited `seed_policy_id`
- optional allowed overrides only

Load:
- `preset_registry`
- `variant_registry`
- `objective_registry`
- `negative_profiles`
- `seed_policies`
- optional graph-linked constraints

Merge order:
1. preset
2. variant delta
3. objective emphasis
4. optional graph constraints
5. allowed overrides
6. validator prune
7. final compile

Apply:
- negative profile block(s)
- seed policy
- canon validator preflight

Return:
- `compiled_prompt`
- `negative_prompt`
- `seed`
- `style_weights`
- `lineage_id`
- `prompt_hash`
- `preset_id`
- `variant_id`
- `objective_id`

## Preset structure
A preset is the baseline identity mode. It must contain:
- `preset_id`
- `name`
- `status`
- `reference_style_id`
- `prompt_blocks`
- `style_weights`
- `negative_profile_ids`
- `seed_policy_id`
- `canon_state`

### Allowed preset prompt blocks
Current source material defines these prompt block families:
- `subject_identity`
- `material_language`
- `environment_language`
- `lighting_language`
- `camera_language`

These blocks are additive source banks, not freeform lore containers.

## Variant structure
A variant is delta-only. It must contain:
- `variant_id`
- `applies_to_presets`
- `delta_blocks`

### Variant rule
A variant must not repeat preset-layer fields such as `reference_style_id` or full visual defaults.

### Current delta block families in source
- `environment_language`
- `pose_language`

## Objective structure
An objective controls generation emphasis. It must contain:
- `objective_id`
- `description`
- `emphasis.character_presence`
- `emphasis.environment_complexity`
- `emphasis.cinematic_scale`

## Reference-style binding
Every preset must bind to a valid `reference_style_id`.

Current source-bound prompt reference styles in this pack:
- `ref_porcelain_void`
- `ref_luxury_editorial_restrain`

## Positive prompt assembly order
Recommended assembly order for deterministic compile:
1. identity anchor
2. silhouette / pose cue
3. material language
4. environment language
5. lighting language
6. camera language
7. objective emphasis cue
8. reference-style cue
9. optional allowed append-positive override

## Negative prompt assembly order
Recommended assembly order:
1. preset negative profiles
2. mode-level negative prompt from prompt pack
3. house/global negative prompt block when enabled
4. validator / drift-derived safety negatives
5. optional allowed append-negative override

## Seed rules
Seed logic must stay reproducible.

Available source policies:
- `seed_stable_identity`
  - strategy: `fixed_seed_range`
  - range: `100000–100500`
  - diversity_level: `0.2`
- `seed_exploration`
  - strategy: `random_seed`
  - diversity_level: `0.7`

Mode-specific runtime seed behavior from the three-mode prompt pack:
- `canon_core`: seed lock
- `luminous_fan_appeal`: reuse seed from `canon_core`
- `luxury_mystical_editorial`: lock independent seed

## Validation gates
Compiled prompts must be checked before generation.

Minimum preflight checks:
- reference style exists
- negative profile protection exists
- no forbidden drift removal
- no ontology break
- no fantasy-magic collapse
- no childish idol drift
- no generic neon overload without restraint

## Allowed overrides
Allowed:
- `character_ids`
- `location_ids`
- `camera`
- `style_bias`
- `seed`
- `append_positive`
- `append_negative`
- `intensity`

Denied:
- ontology class
- absolute invariants
- forbidden drift removals
- canon constitution strings

## Receipt / archive minimum
Each generated job must archive:
- mode
- prompt
- negative prompt
- seed
- sampler
- steps
- cfg
- timestamp
- asset URL
- review score
- classification
- note

## Known source inconsistency
`preset_luminous_fan_appeal` references `neg_pop_glamour_excess`, but the provided negative profile registry only defines:
- `neg_childish_idol`
- `neg_generic_neon`
- `neg_fantasy_magic`
- `neg_soft_glamour`

This pack preserves that mismatch as an unresolved source reference rather than inventing a missing token list.
