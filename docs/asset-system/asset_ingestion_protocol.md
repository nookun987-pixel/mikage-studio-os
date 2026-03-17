# MIKAGE ASSET INGESTION PROTOCOL

## INGESTION OVERVIEW

### Purpose
Standardized process for bringing new visual assets into the Mikage Studio OS asset system with proper classification, metadata, and validation.

### Scope
All visual assets intended for use in generation, reference, or archival within the Mikage ecosystem.

## INTAKE STEPS

### Step 1: Initial Reception
**Trigger**: New asset submission or automated import
**Actions**:
- Receive asset files
- Generate unique intake ID
- Create temporary raw record
- Log source and timestamp
- Assign initial processor

**Requirements**:
- File must be valid image format (PNG, JPG, WEBP)
- File size under 50MB
- No obvious corruption
- Source identification available

### Step 2: Preliminary Processing
**Actions**:
- Virus/malware scanning
- File format validation
- Basic quality assessment
- Duplicate detection
- Format standardization

**Quality Thresholds**:
- Minimum resolution: 1024x1024
- Maximum compression artifacts: Low
- No severe color cast
- No major distortion

### Step 3: Metadata Collection
**Required Fields**:
- Asset title/description
- Source attribution
- Creation date (if known)
- Initial category classification
- Preliminary tags

**Optional Fields**:
- Creator information
- Technical specifications
- Usage rights
- Related assets

### Step 4: Initial Classification
**Category Assignment**:
- Primary category (character, armor, mask, etc.)
- Subtype identification
- Domain association (imperial, void_space, etc.)
- Preliminary authority level

**Usage Scope**:
- prompt_safe potential
- character_only restriction
- reference_only classification
- experimental designation

### Step 5: Quality Assessment
**Automated Checks**:
- Resolution verification
- Color space validation
- Noise level assessment
- Sharpness evaluation
- Composition analysis

**Manual Review**:
- Visual quality confirmation
- Canon relevance assessment
- Appropriateness evaluation
- Technical adequacy

## REQUIRED METADATA

### Core Metadata
```json
{
  "asset_id": "auto_generated_unique_id",
  "intake_id": "intake_session_identifier",
  "source": {
    "type": "upload|import|scan|generation",
    "origin": "specific_source_description",
    "attribution": "creator_or_provider",
    "date": "YYYY-MM-DD",
    "rights": "usage_rights_information"
  },
  "file_info": {
    "original_name": "original_filename",
    "file_size": "size_in_bytes",
    "format": "PNG|JPG|WEBP",
    "resolution": "widthxheight",
    "color_space": "sRGB|AdobeRGB|etc"
  }
}
```

### Classification Metadata
```json
{
  "classification": {
    "category": "primary_category",
    "subtype": "specific_subtype",
    "domain": "imperial|void_space|transition_zone|ritual_space",
    "authority_level": "core_canon|supporting_canon|contextual_canon|reference_material",
    "usage_scope": ["prompt_safe", "character_only", "reference_only"]
  },
  "tags": {
    "technical": ["technical_tags"],
    "visual": ["visual_descriptors"],
    "functional": ["functional_tags"],
    "canonical": ["canon_relevance_tags"]
  }
}
```

### Quality Metadata
```json
{
  "quality_metrics": {
    "resolution_score": "0-100",
    "sharpness_score": "0-100",
    "noise_level": "low|medium|high",
    "color_accuracy": "0-100",
    "composition_score": "0-100",
    "overall_quality": "0-100"
  },
  "technical_assessment": {
    "lighting_quality": "excellent|good|fair|poor",
    "focus_clarity": "sharp|soft|blurry",
    "color_balance": "accurate|warm|cool|cast",
    "exposure": "proper|under|over"
  }
}
```

## TAGGING SYSTEM

### Source Tagging
- **creation_method**: photograph, digital_art, 3d_render, scan
- **source_type**: official, fan_art, commission, stock, reference
- **creator_type**: official_artist, community_member, professional, amateur

### Angle Tagging
- **view_angle**: front, side, back, threequarter, overhead, low_angle
- **shot_type**: portrait, full_body, detail, wide, environmental
- **camera_distance**: close, medium, long, extreme

### Material Tagging
- **primary_material**: porcelain, carbon_fiber, dark_titanium, etc.
- **surface_condition**: pristine, weathered, damaged, aged
- **material_state**: raw, polished, textured, treated

### Canon Relevance Tagging
- **canon_alignment**: high, medium, low, none
- **character_accuracy**: exact, close, approximate, symbolic
- **environment_authenticity**: canonical, inspired, generic
- **style_compliance**: strict, moderate, loose, experimental

### Confidence Tagging
- **classification_confidence**: high (90-100), medium (70-89), low (50-69)
- **quality_confidence**: high, medium, low
- **canon_confidence**: high, medium, low
- **usage_confidence**: high, medium, low

## DUPLICATE HANDLING

### Exact Duplicate Detection
**Criteria**:
- Identical file hash
- Identical dimensions
- Identical file size
- Identical metadata

**Process**:
- Flag as exact duplicate
- Compare authority levels
- Keep highest authority version
- Archive lower authority versions
- Link to primary asset

### Near Duplicate Detection
**Criteria**:
- Similar visual content (85%+ similarity)
- Same subject/character
- Similar composition
- Similar technical quality

**Process**:
- Flag as near duplicate
- Human review required
- Determine if variants serve different purposes
- Keep both if justified
- Document differences

### Variant Handling
**Acceptable Variants**:
- Different angles/views
- Different lighting conditions
- Different states (damaged/pristine)
- Different resolutions

**Process**:
- Link to parent asset
- Document variant characteristics
- Maintain separate metadata
- Cross-reference in searches

## LOW-QUALITY DISCARD RULES

### Automatic Discard Criteria
**Technical Failures**:
- Resolution below 512x512
- Severe compression artifacts
- Major color casts or distortion
- Extreme noise levels
- Corrupted file structure

**Content Failures**:
- Obvious canon violations
- Forbidden content (neon, fantasy, etc.)
- Poor character representation
- Inappropriate content
- Copyright violations

**Quality Failures**:
- Overall quality score below 30
- Multiple technical failures
- Unusable for any purpose
- Better alternatives exist

### Manual Discard Review
**Borderline Cases**:
- Quality score 30-40
- Minor technical issues
- Limited usefulness
- Potential for improvement

**Process**:
- Reviewer evaluation
- Improvement possibility assessment
- Cost-benefit analysis
- Final discard decision

## CONFLICT INTAKE HANDLING

### Classification Conflicts
**Scenario**: Asset could fit multiple categories
**Resolution**:
- Primary category based on main subject
- Secondary categories noted in metadata
- Cross-referencing enabled
- Reviewer confirmation required

### Canon Alignment Conflicts
**Scenario**: Asset has mixed canon relevance
**Resolution**:
- Lowest common denominator for canon level
- Specific usage limitations noted
- Conditional approval possible
- Senior review required for high-value assets

### Authority Conflicts
**Scenario**: Asset claims higher authority than justified
**Resolution**:
- Authority level downgraded
- Justification required for upgrade
- Review board approval for high authority
- Temporary status with review pending

### Usage Scope Conflicts
**Scenario**: Asset suitable for multiple usage scopes
**Resolution**:
- Most restrictive scope applied
- Extended scope requires additional review
- Conditional usage permissions
- Clear documentation of limitations

## INGESTION WORKFLOW

### Automated Intake
**Trigger**: System-detected assets, bulk imports
**Process**:
- Automated processing through all steps
- Human review at decision points
- Fast-track for high-confidence assets
- Queue creation for uncertain cases

### Manual Intake
**Trigger**: Curated submissions, high-value assets
**Process**:
- Direct assignment to expert reviewers
- Enhanced quality assessment
- Detailed metadata collection
- Priority processing

### Bulk Intake
**Trigger**: Large asset collections, archives
**Process**:
- Batch processing with automated checks
- Sampling for quality verification
- Progressive metadata enrichment
- Phased review process

## QUALITY GATES

### Gate 1: Technical Validation
- File format verification
- Basic quality thresholds
- Duplicate detection
- Initial metadata validation

### Gate 2: Content Validation
- Canon compliance check
- Appropriateness review
- Classification accuracy
- Usage scope determination

### Gate 3: Quality Validation
- Comprehensive quality assessment
- Technical adequacy verification
- Visual quality confirmation
- Final approval decision

## INGESTION METRICS

### Processing Metrics
- Intake volume over time
- Processing time per asset
- Automation success rate
- Human review requirement rate

### Quality Metrics
- Approval rates by category
- Common rejection reasons
- Quality score distributions
- Improvement over time

### Efficiency Metrics
- Bottleneck identification
- Processing cost analysis
- Resource utilization
- Throughput optimization

## INTEGRATION POINTS

### Asset System Integration
- Automatic asset record creation
- Status model integration
- Taxonomy assignment
- Naming convention application

### Validation System Integration
- Canon validator integration
- Quality assessment integration
- Style guardrails integration
- Automated rule checking

### Workflow System Integration
- Review workflow triggering
- Task assignment
- Progress tracking
- Notification systems

### Storage System Integration
- File storage organization
- Backup procedures
- Access control
- Retention policies
