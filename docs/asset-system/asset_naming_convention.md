# MIKAGE ASSET NAMING CONVENTION

## FOLDER NAMING RULES

### Primary Structure
```
assets/
├── character/
├── armor/
├── mask/
├── weapon/
├── environment/
├── architecture/
├── material/
├── motif/
├── lighting/
├── cinematography/
├── ui_symbol/
└── reference_board/
```

### Subfolder Naming
- Use snake_case for all subfolders
- No spaces or special characters except underscores
- Maximum 3 levels deep for practical navigation
- Use descriptive, functional names

### Category-Specific Patterns
```
character/{character_name}/{asset_type}/{variant}
armor/{armor_type}/{component}/{condition}
mask/{mask_type}/{condition}/{variant}
weapon/{weapon_class}/{type}/{configuration}
environment/{domain}/{location}/{perspective}
material/{material_name}/{surface_condition}/{application}
```

## FILE NAMING RULES

### Core Format
```
{prefix}_{category}_{subtype}_{identifier}_{suffix}.{extension}
```

### Prefix System
- **ref_** - Reference asset (canon-compliant)
- **cand_** - Candidate asset (under review)
- **app_** - Approved asset (validated)
- **can_** - Canonical asset (core reference)
- **dep_** - Deprecated asset (obsolete)
- **rej_** - Rejected asset (failed validation)

### Category Codes
- **char** - Character
- **arm** - Armor
- **mask** - Mask
- **wpn** - Weapon
- **env** - Environment
- **arch** - Architecture
- **mat** - Material
- **motif** - Motif
- **light** - Lighting
- **cin** - Cinematography
- **ui** - UI Symbol
- **board** - Reference Board

### Identifier Patterns
- Use 3-digit sequential numbers (001, 002, 003)
- Reset sequence per category/subtype combination
- No gaps in numbering
- Leading zeros required

### Suffix System
- **_raw** - Unprocessed original
- **_proc** - Processed/optimized
- **_comp** - Composite/multi-element
- **_var** - Variant
- **_detail** - Detail/macro shot
- **_wide** - Wide/environmental shot
- **_angle** - Specific angle view
- **_light** - Lighting reference

## VERSION NAMING

### Version Format
```
{base_name}_v{major}.{minor}.{patch}
```

### Version Rules
- **Major (X.0.0)**: Breaking changes, reclassification
- **Minor (0.Y.0)**: New features, significant improvements
- **Patch (0.0.Z)**: Bug fixes, metadata updates

### Version Examples
```
ref_char_mikage_001_v1.0.0.png
ref_arm_porcelain_001_v1.2.0.jpg
cand_mask_kitsune_001_v0.1.0.png
can_wpn_energy_001_v2.0.1.jpg
```

## APPROVED SUFFIXES

### Asset State Suffixes
- **_raw** - Original unprocessed file
- **_proc** - Processed/optimized for use
- **_comp** - Composite of multiple elements
- **_clean** - Cleaned/corrected version

### View Type Suffixes
- **_front** - Front view
- **_side** - Side view
- **_back** - Back view
- **_detail** - Detail/macro view
- **_wide** - Wide/environmental view
- **_angle** - Specific angle (e.g., _angle45, _angle90)
- **_close** - Close-up view

### Functional Suffixes
- **_ref** - Reference material
- **_guide** - Guide/template
- **_example** - Example usage
- **_test** - Test/validation asset
- **_demo** - Demonstration asset

## SHOT/VIEW NAMING

### Camera Angle Naming
- **_front** - Direct front view
- **_profile** - Side profile view
- **_threequarter** - 3/4 angle view
- **_overhead** - Top-down view
- **_low** - Low angle view
- **_dutch** - Dutch angle view
- **_macro** - Extreme close-up
- **_wide** - Wide establishing shot

### Lighting Condition Naming
- **_studio** - Studio lighting
- **_ambient** - Ambient lighting
- **_dramatic** - High contrast lighting
- **_soft** - Soft diffused lighting
- **_hard** - Hard directional lighting
- **_backlit** - Backlit situation

### Context Naming
- **_neutral** - Neutral background
- **_context** - In environmental context
- **_isolated** - Isolated on plain background
- **_composite** - Composed with other elements

## REFERENCE VS CANDIDATE VS APPROVED NAMING

### Reference Assets (ref_)
- Canon-compliant, validated assets
- Safe for automated generation
- Highest confidence level
- Example: `ref_mask_kitsune_001.png`

### Candidate Assets (cand_)
- Under review, not yet validated
- Limited usage permissions
- Requires human approval
- Example: `cand_char_mikage_001.png`

### Approved Assets (app_)
- Validated but not core canon
- Approved for specific use cases
- Medium confidence level
- Example: `app_arm_tactical_001.png`

### Canonical Assets (can_)
- Core canon assets, essential references
- Highest authority level
- Cannot be modified without approval
- Example: `can_mask_kitsune_001.png`

## FORBIDDEN AMBIGUOUS NAMES

### Forbidden Patterns
- **temp_** - Temporary files (use proper naming)
- **test_** - Test files (use _test suffix)
- **final_** - Final versions (use version system)
- **new_** - New versions (use version system)
- **old_** - Old versions (use version system)
- **copy_** - Copy files (use proper naming)
- **backup_** - Backup files (use version control)

### Forbidden Characters
- Spaces (use underscores)
- Hyphens (use underscores)
- Special characters (!@#$%^&*)
- Unicode characters beyond ASCII
- Mixed case (use lowercase only)

### Forbidden Lengths
- Maximum 64 characters total
- Maximum 32 characters before suffix
- Maximum 8 characters for suffix
- Maximum 8 characters for extension

## METADATA FILE NAMING

### Metadata File Format
```
{asset_name}.meta.json
```

### Metadata Examples
```
ref_char_mikage_001.png.meta.json
cand_arm_porcelain_001.jpg.meta.json
app_mask_kitsune_001_v1.0.0.png.meta.json
```

### Thumbnail Naming
```
{asset_name}_thumb.{extension}
```

### Thumbnail Examples
```
ref_char_mikage_001_thumb.jpg
cand_arm_porcelain_001_thumb.jpg
```

## BATCH NAMING CONVENTIONS

### Batch Operations
- Preserve original naming when possible
- Add batch identifier only when necessary
- Document batch operations in metadata
- Maintain version control for batch changes

### Batch Identifier Format
```
{base_name}_batch{batch_id}_{suffix}
```

### Batch Examples
```
ref_char_mikage_001_batch001_clean.png
ref_arm_porcelain_001_batch002_proc.jpg
```

## SPECIAL CASES

### Animated Assets
```
{prefix}_{category}_{subtype}_{identifier}_anim{frame}.{extension}
```

### Texture Maps
```
{prefix}_{category}_{subtype}_{identifier}_{map_type}.{extension}
```

### 3D Models
```
{prefix}_{category}_{subtype}_{identifier}_3d.{extension}
```

### Color Variants
```
{prefix}_{category}_{subtype}_{identifier}_{color}_{suffix}.{extension}
```

## VALIDATION RULES

### Required Elements
- Prefix must be valid
- Category code must be valid
- Identifier must be numeric
- Extension must be appropriate
- No forbidden characters

### Naming Consistency
- Same asset type uses same pattern
- Versions follow semantic versioning
- Suffixes are from approved list
- Metadata files match asset names

### Automated Validation
- Check against naming schema
- Verify prefix/category combinations
- Validate identifier sequences
- Ensure metadata consistency
