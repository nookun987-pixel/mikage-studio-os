# MIKAGE ASSET SELECTION RULES

## SELECTION OVERVIEW

### Purpose
Define how the Mikage Studio OS chooses reference assets for generation, ensuring consistency, canon compliance, and optimal visual quality.

### Scope
All automated and manual asset selection processes for prompt generation, reference compilation, and visual guidance.

## PRIORITY RULES

### Asset Authority Hierarchy
1. **Canonical Assets** (can_*) - Highest priority, core references
2. **Approved Assets** (app_*) - High priority, validated for use
3. **Reference Assets** (ref_*) - Medium priority, standard references
4. **Candidate Assets** (cand_*) - Low priority, under evaluation

### Domain Priority
1. **Core Canon** - Essential character elements (mask, signature armor)
2. **Supporting Canon** - Important world elements (key environments)
3. **Contextual Canon** - Scene-specific elements (location details)
4. **Reference Material** - Technical and artistic references

### Quality Score Priority
1. **90-100** - Exceptional quality, preferred for all uses
2. **80-89** - High quality, suitable for most uses
3. **70-79** - Good quality, suitable for limited uses
4. **60-69** - Acceptable quality, limited applications
5. **Below 60** - Low quality, avoid unless no alternative

## REFERENCE WEIGHTING LOGIC

### Base Weight Calculation
```
base_weight = (authority_weight * 0.4) + 
              (quality_weight * 0.3) + 
              (relevance_weight * 0.2) + 
              (freshness_weight * 0.1)
```

### Authority Weights
- **canonical**: 1.0
- **approved**: 0.8
- **reference**: 0.6
- **candidate**: 0.3

### Quality Weights
- **90-100**: 1.0
- **80-89**: 0.8
- **70-79**: 0.6
- **60-69**: 0.4
- **below 60**: 0.2

### Relevance Weights
- **exact_match**: 1.0
- **close_match**: 0.8
- **related**: 0.6
- **general**: 0.4

### Freshness Weights
- **recent (0-6 months)**: 1.0
- **current (6-12 months)**: 0.8
- **mature (1-2 years)**: 0.6
- **legacy (2+ years)**: 0.4

## SINGLE VS MULTIPLE REFERENCE USAGE

### Single Reference Usage
**When to Use**:
- Core character elements (mask, signature armor)
- High-confidence canonical assets
- Simple generation requests
- Consistency-critical outputs

**Selection Criteria**:
- Single best asset by weighted score
- Authority level must be canonical or approved
- Quality score must be 80+
- No conflicting alternatives

### Multiple Reference Usage
**When to Use**:
- Complex scenes with multiple elements
- Novel combinations or variations
- Quality improvement through blending
- Creative exploration within canon

**Selection Criteria**:
- Primary reference (highest weight)
- Secondary references (supporting elements)
- Tertiary references (contextual elements)
- Maximum 5 references per generation

### Reference Combination Rules
- **Dominant Reference**: One asset must have 50%+ weight
- **Supporting References**: Must complement, not conflict
- **Style Consistency**: All references must share style alignment
- **Canon Compatibility**: All references must be canon-compliant

## CONFLICT RESOLUTION BETWEEN REFERENCES

### Style Conflicts
**Detection**: References have different aesthetic approaches
**Resolution**:
- Prefer dominant reference style
- Reject conflicting secondary references
- Seek alternative compatible references
- Document conflict for future reference

### Material Conflicts
**Detection**: References show different material treatments
**Resolution**:
- Prioritize canonical material treatment
- Reject non-canonical material references
- Use material-specific reference boards
- Document material discrepancies

### Scale Conflicts
**Detection**: References have inconsistent scale relationships
**Resolution**:
- Use canonical scale references
- Apply scale correction factors
- Reject scale-inconsistent references
- Document scale assumptions

### Quality Conflicts
**Detection**: High-quality reference conflicts with low-quality but more accurate reference
**Resolution**:
- Prioritize accuracy over quality for core elements
- Use high-quality for non-critical elements
- Consider manual review for critical decisions
- Document quality vs accuracy trade-offs

## CATEGORY-SIFIC SELECTION RULES

### Mask Selection Priority
1. **Canonical pristine mask** - Primary character identity
2. **Canonical damaged mask** - Combat/damage states
3. **Approved mask variants** - Alternative expressions
4. **Reference mask details** - Surface and material details

**Special Rules**:
- Always use canonical mask for core character representation
- Mask integrity is highest priority
- Ear geometry must be exact
- Surface material must be porcelain

### Armor Selection Priority
1. **Canonical combat armor** - Standard protection
2. **Canonical ceremonial armor** - Ritual/ceremonial contexts
3. **Approved armor variants** - Alternative configurations
4. **Reference armor details** - Technical and material details

**Special Rules**:
- Armor must be functional and plausible
- Material consistency across armor components
- No fantasy or decorative elements
- Integration with character physiology

### Weapon Selection Priority
1. **Canonical signature weapon** - Character's primary weapon
2. **Approved weapon variants** - Alternative configurations
3. **Reference weapon details** - Technical and energy systems
4. **Reference weapon effects** - Energy and impact effects

**Special Rules**:
- Weapon must be technically plausible
- Energy systems must be contained
- Scale must reflect gravitational effects
- No fantasy weapon properties

### Environment Selection Priority
1. **Canonical key locations** - Essential story locations
2. **Approved environmental elements** - Specific location details
3. **Reference environmental assets** - Atmospheric and lighting
4. **Reference architectural elements** - Building and structure details

**Special Rules**:
- Environment must match domain (imperial, void_space, etc.)
- Atmospheric elements must be present
- Lighting must be diegetic
- Scale must be consistent with character

## DRIFT PREVENTION DURING SELECTION

### Style Drift Prevention
**Measures**:
- Enforce strict style alignment scoring
- Reject references with style inconsistencies
- Use style guardrails validation
- Monitor for cumulative style changes

**Thresholds**:
- Style alignment score must be 80+
- No more than 10% style variance per generation
- Cumulative drift monitored across sessions
- Automatic rejection of high-drift combinations

### Canon Drift Prevention
**Measures**:
- Canonical reference priority enforcement
- Canon compliance validation for all references
- Authority level verification
- Regular canon alignment reviews

**Thresholds**:
- Canon compliance score must be 90+
- No non-canonical elements in core references
- Authority level must be approved or higher
- Monthly canon drift analysis

### Quality Drift Prevention
**Measures**:
- Minimum quality score enforcement
- Quality trend monitoring
- Automatic quality degradation alerts
- Regular quality calibration

**Thresholds**:
- Average quality score must not decline
- Individual reference quality must be 70+
- Quality variance limited to 20 points
- Quarterly quality review

## SELECTION ALGORITHMS

### Greedy Selection
**Use Case**: Fast, straightforward selections
**Algorithm**:
1. Filter by basic criteria
2. Sort by weighted score
3. Select top-ranked asset
4. Validate against constraints

**Advantages**: Fast, predictable, consistent
**Disadvantages**: May miss optimal combinations

### Weighted Random Selection
**Use Case**: Creative exploration within constraints
**Algorithm**:
1. Filter by basic criteria
2. Calculate selection weights
3. Random selection based on weights
4. Validate against constraints

**Advantages**: Introduces variety, explores options
**Disadvantages**: Less predictable, potential inconsistency

### Multi-Objective Optimization
**Use Case**: Complex multi-reference selections
**Algorithm**:
1. Define multiple objectives (quality, relevance, diversity)
2. Generate candidate combinations
3. Score combinations across all objectives
4. Select Pareto-optimal solutions

**Advantages**: Balanced selections, considers multiple factors
**Disadvantages**: Complex, computationally intensive

### Constraint-Based Selection
**Use Case**: Strict requirement compliance
**Algorithm**:
1. Define hard constraints
2. Filter assets by constraints
3. Apply optimization within feasible set
4. Select optimal feasible solution

**Advantages**: Guaranteed constraint compliance
**Disadvantages**: May have limited options

## SELECTION VALIDATION

### Pre-Selection Validation
- Asset availability verification
- Authority level confirmation
- Quality score verification
- Canon compliance check

### Post-Selection Validation
- Combination compatibility check
- Style consistency verification
- Conflict resolution validation
- Final quality assessment

### Runtime Validation
- Generation result monitoring
- Drift detection and alerting
- Performance metric tracking
- Selection effectiveness analysis

## SELECTION METRICS

### Effectiveness Metrics
- Generation success rate
- Output quality scores
- Canon compliance rates
- User satisfaction scores

### Efficiency Metrics
- Selection processing time
- Computational resource usage
- Cache hit rates
- System responsiveness

### Quality Metrics
- Selected asset quality distribution
- Selection accuracy improvement
- Drift prevention effectiveness
- Optimal selection rate

## ADAPTIVE SELECTION

### Learning System
- Track selection outcomes
- Identify successful patterns
- Update weighting factors
- Improve selection algorithms

### Feedback Integration
- User preference learning
- Generation result analysis
- Quality trend adaptation
- Canon evolution accommodation

### Continuous Improvement
- Regular selection rule reviews
- Algorithm optimization
- Threshold calibration
- System performance tuning
