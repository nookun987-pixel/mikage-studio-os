# MIKAGE STYLE RECOVERY PROTOCOL

## DRIFT DETECTION AND DIAGNOSIS

### Step 1: Immediate Failure Identification
When output drifts from canon, immediately identify which failure mode(s) are present using the failure_modes.json registry.

**Critical Priority Failures (Stop Generation):**
- `fm_wrong_silhouette` - Mask not recognizable
- `fm_exaggerated_breasts_hips` - Oversexualization
- `fm_neon_cyberpunk_lighting` - Aesthetic corruption
- `fm_glamour_idol_drift` - Tone violation
- `fm_mask_shape_corruption` - Character integrity failure

**High Priority Failures (Pause and Analyze):**
- `fm_thigh_inflation` - Proportion drift
- `fm_anime_face_drift` - Feature exaggeration
- `fm_fantasy_armor_drift` - Material corruption
- `fm_porcelain_material_drift` - Texture failure

### Step 2: Layer Failure Analysis
Determine which layer of the generation system failed:

**Prompt Layer Failure:**
- Negative prompts insufficient
- Style tokens over-weighted
- Missing specific controls
- Reference image issues

**Reference Layer Failure:**
- Wrong reference images used
- Reference quality insufficient
- Reference contains forbidden elements
- Reference doesn't match canon

**Workflow Layer Failure:**
- Generation parameters incorrect
- Model weight issues
- Sampling problems
- Resolution/quality settings

**Validator Layer Failure:**
- Failure mode not detected
- Validation criteria insufficient
- False negative in automated checks
- Human review missed issue

## RECOVERY STRATEGIES BY FAILURE TYPE

### Silhouette Corruption Recovery
**Diagnosis:** Mask or armor silhouette wrong
**Layer Failed:** Prompt + Reference
**Recovery Steps:**
1. Add silhouette-specific negative prompts
2. Include canonical mask reference images
3. Reduce style token weight by 20-30%
4. Add structural reinforcement prompts
5. Regenerate with same seed

**Prompt Patch:**
```
negative_prompt: "distorted silhouette, exaggerated proportions, fantasy armor shape, wrong mask geometry, bulk design, non-functional armor, broken symmetry"
```

### Material Drift Recovery
**Diagnosis:** Materials not authentic (porcelain → plastic/marble)
**Layer Failed:** Prompt + Reference
**Recovery Steps:**
1. Add material-specific negative prompts
2. Include high-quality material references
3. Reinforce material discipline in prompts
4. Add surface quality requirements
5. Reduce decorative elements

**Prompt Patch:**
```
negative_prompt: "marble texture, stone surface, plastic material, shiny finish, wrong material, non-porcelain surface, synthetic texture"
```

### Color Palette Drift Recovery
**Diagnosis:** Forbidden colors appear or palette corrupted
**Layer Failed:** Prompt + Workflow
**Recovery Steps:**
1. Reinforce color palette in positive prompts
2. Add forbidden color negative prompts
3. Check color balance in generation parameters
4. Include palette reference images
5. Reduce color variation weight

**Prompt Patch:**
```
negative_prompt: "green colors, bright yellow, orange, pastel palette, neon colors, rainbow effects, forbidden colors"
```

### Energy System Drift Recovery
**Diagnosis:** Energy uncontained or magical rather than technical
**Layer Failed:** Prompt + Reference
**Recovery Steps:**
1. Add technical containment requirements
2. Include energy system references
3. Reduce glow intensity in prompts
4. Add heat dissipation details
5. Reinforce hard sci-fi principles

**Prompt Patch:**
```
negative_prompt: "magical energy, uncontained light, excessive brightness, magical aura, energy without source, fantasy glow"
```

### Anime Exaggeration Recovery
**Diagnosis:** Features drift toward anime style
**Layer Failed:** Prompt + Reference
**Recovery Steps:**
1. Add anime-specific negative prompts
2. Include realistic face references
3. Reduce facial stylization weight
4. Add subtlety requirements
5. Check reference image quality

**Prompt Patch:**
```
negative_prompt: "anime face, exaggerated eyes, cartoon expression, stylized features, anime proportions, unrealistic face"
```

## ESCALATION LADDER

### Level 1: Prompt Patch (First Attempt)
**When:** Minor drift, single failure mode
**Action:** Apply targeted prompt corrections
**Success Rate:** 60-70%
**Time:** 5-10 minutes

### Level 2: Reference Update (Second Attempt)
**When:** Prompt patch insufficient, reference issues suspected
**Action:** Update reference images, add specific style references
**Success Rate:** 70-80%
**Time:** 15-20 minutes

### Level 3: Workflow Adjustment (Third Attempt)
**When:** Systemic issues, multiple failure modes
**Action:** Adjust generation parameters, model weights, sampling
**Success Rate:** 80-90%
**Time:** 30-45 minutes

### Level 4: Validator Update (System Improvement)
**When:** Recurrent failures, detection gaps
**Action:** Update failure modes, improve validation criteria
**Success Rate:** Prevents future failures
**Time:** 1-2 hours

### Level 5: Canon Review (Last Resort)
**When:** Fundamental canon issues emerge
**Action:** Review and update canon documentation
**Success Rate:** Resolves systemic issues
**Time:** 2-4 hours

## RETRY PROTOCOL

### Immediate Retry (Same Generation Session)
**Conditions:**
- Single failure mode identified
- Clear prompt correction available
- Reference images are correct
- Generation parameters stable

**Process:**
1. Apply prompt patch
2. Keep same seed if possible
3. Generate 1-2 variants
4. Review against failure mode checklist
5. If still failing, escalate to next level

### Session Retry (New Generation Session)
**Conditions:**
- Multiple failure modes
- Prompt patch insufficient
- Reference update needed
- Workflow issues suspected

**Process:**
1. Update reference images
2. Apply comprehensive prompt corrections
3. Adjust generation parameters
4. Generate new batch (3-5 variants)
5. Full review against all criteria

### Full Reset (System Recovery)
**Conditions:**
- Persistent failures across sessions
- Systemic drift detected
- Multiple layers failing
- Canon compliance compromised

**Process:**
1. Stop all generation
2. Review entire prompt structure
3. Validate all reference materials
4. Reset generation parameters
5. Restart with conservative settings

## DISCARD CRITERIA

### Immediate Discard
**Conditions:**
- Critical failure modes present
- Character identity lost
- Cultural integrity violated
- Technical quality unacceptable

**Process:**
1. Mark image as rejected
2. Log failure modes in registry
3. Do not attempt recovery
4. Move to next generation

### Conditional Discard
**Conditions:**
- Multiple high-priority failures
- Recovery effort exceeds value
- Canon damage irreversible
- Time/resource constraints

**Process:**
1. Assess recovery feasibility
2. Estimate resource requirements
3. Compare to generation cost
4. Make discard decision

### Archive Discard
**Conditions:**
- Image has historical/reference value
- Partial success worth documenting
- Learning opportunity for system
- Future recovery possible

**Process:**
1. Mark as "learning example"
2. Document failure analysis
3. Store in separate archive
4. Use for training/validation

## VARIANT BRANCHING DECISIONS

### When to Branch Variants
**Conditions:**
- Core elements successful
- Minor fixable issues
- Multiple valid approaches
- Exploration value high

**Branching Strategy:**
1. Identify successful core elements
2. Isolate fixable issues
3. Create targeted variants
4. Compare against canon
5. Select best variant

### When to Reject Instead
**Conditions:**
- Core elements compromised
- Multiple failure modes
- Canon integrity at risk
- Recovery cost prohibitive

**Rejection Process:**
1. Document all failure modes
2. Identify root causes
3. Update prevention strategies
4. Discard without branching

## PREVENTION STRATEGIES

### Prompt Layer Prevention
- Use comprehensive negative prompts
- Include specific style controls
- Balance positive and negative weights
- Update prompts based on failures

### Reference Layer Prevention
- Validate all reference images
- Use high-quality canonical references
- Regular reference audits
- Multiple reference options

### Workflow Layer Prevention
- Stable generation parameters
- Regular parameter audits
- Quality control checkpoints
- Backup workflow configurations

### Validator Layer Prevention
- Comprehensive failure mode detection
- Regular validation updates
- Automated checking systems
- Human review training

## DOCUMENTATION AND LEARNING

### Failure Logging
For every failure, document:
- Failure mode(s) identified
- Layer(s) that failed
- Recovery attempts made
- Final resolution
- Prevention strategies implemented

### System Improvement
Use failure data to:
- Update failure modes registry
- Improve validation criteria
- Refine prompt templates
- Enhance reference libraries

### Knowledge Sharing
Share recovery insights:
- Update team on new failure modes
- Distribute successful prompt patches
- Train on prevention strategies
- Build collective knowledge

## QUALITY ASSURANCE

### Post-Recovery Validation
After any recovery, validate:
- Original failure resolved
- No new failures introduced
- Canon compliance maintained
- Quality standards met

### Recovery Success Metrics
Track:
- First-attempt recovery rate
- Average recovery time
- Failure recurrence rate
- Prevention effectiveness

### Continuous Improvement
Regularly:
- Review recovery protocols
- Update failure modes
- Refine escalation criteria
- Improve prevention strategies
