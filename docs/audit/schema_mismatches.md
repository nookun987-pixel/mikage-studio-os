# SCHEMA MISMATCHES

## **Package Schema Inconsistencies**

### **Issue 1: Inconsistent Package.json Structures**
**Files Affected**: `packages/*/package.json` (92 files)
**Mismatch Type**: Structural inconsistency across packages

**Specific Issues**:
- Some packages use `@mikage/` scope, others don't
- Inconsistent dependency declaration patterns
- Variable `main` vs `index.js` entry points
- Different export patterns (CommonJS vs ES modules)

**Examples**:
```json
// Package A (consistent)
{
  "name": "@mikage/asset-lineage",
  "version": "1.0.0",
  "main": "dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  }
}

// Package B (inconsistent)
{
  "name": "canon-validator",
  "version": "1.0.0",
  "main": "src/index.ts",
  "dependencies": {
    "some-lib": "^1.0.0"
  }
}
```

**Impact**: Build system confusion, import inconsistencies
**Fix Required**: Standardize all package.json files to use consistent schema

---

### **Issue 2: Mode Definition Schema Mismatch**
**Files Affected**: 
- `docs/canon/generation_modes.json`
- `docs/visual-authority/visual_authority_index.json`
- `docs/canon/visual_system_3_mode_briefs.md`

**Mismatch Type**: Mode definition structure inconsistency

**Specific Issues**:
- `generation_modes.json` uses `preset_id` field
- `visual_authority_index.json` uses `mode_id` field
- Visual briefs use different mode names

**Examples**:
```json
// generation_modes.json
{
  "mode": "canon_core",
  "preset_id": "preset_canon_core"
}

// visual_authority_index.json
{
  "mode_id": "mikage_canon_porcelain"
}

// visual_system_3_mode_briefs.md
Uses: "canon_core", "luminous_fan_appeal", "luxury_mystical_editorial"
```

**Impact**: Mode registry confusion, inconsistent mode handling
**Fix Required**: Standardize mode definition schema across all files

---

## **Data Structure Mismatches**

### **Issue 3: Visual Authority Index Structure**
**Files Affected**: `docs/visual-authority/visual_authority_index.json`
**Mismatch Type**: Inconsistent data structure within domains

**Specific Issues**:
- Some domains have `core_concepts` arrays, others don't
- Inconsistent `source_files` structure
- Variable `authority_level` numbering

**Examples**:
```json
// Consistent domain
"aesthetic_philosophy": {
  "domain_id": "aesthetic_philosophy",
  "authority_level": 1,
  "core_concepts": ["wabi_sabi", "ma", "notan"],
  "source_files": ["file1.md", "file2.json"]
}

// Inconsistent domain
"some_other_domain": {
  "domain_id": "some_other_domain",
  "authority_level": "different_format",
  "missing_core_concepts": [],
  "source_files": "different_structure"
}
```

**Impact**: Inconsistent data access patterns
**Fix Required**: Standardize domain structure across visual authority index

---

## **Configuration Schema Mismatches**

### **Issue 4: Prompt Configuration Inconsistencies**
**Files Affected**: Various prompt and configuration files
**Mismatch Type**: Inconsistent configuration data structures

**Specific Issues**:
- Different field names for similar concepts
- Inconsistent nesting patterns
- Variable data types for same concepts

**Examples**:
```json
// Consistent structure
{
  "prompt": {
    "positive": "...",
    "negative": "...",
    "parameters": {
      "sampler": "DPM++ 2M Karras",
      "steps": 30,
      "cfg": 6.5
    }
  }
}

// Inconsistent structure
{
  "positive_prompt": "...",
  "negative_prompt": "...",
  "sampler": "DPM++ 2M Karras",
  "steps": 30,
  "cfg": 6.5
}
```

**Impact**: Configuration parsing errors
**Fix Required**: Standardize all configuration schemas

---

## **Canon Reference Mismatches**

### **Issue 5: Canon File Reference Inconsistencies**
**Files Affected**: Various canon and system files
**Mismatch Type**: Inconsistent cross-references between canon files

**Specific Issues**:
- Different file path references
- Inconsistent naming conventions
- Broken cross-links between related concepts

**Examples**:
```markdown
// Consistent reference
See: [Canon Authority Chain](./canon_authority_chain.md)

// Inconsistent reference
See: ../canon/canon_authority_chain.md
See: ./canon_authority.md (missing file)
```

**Impact**: Broken documentation navigation
**Fix Required**: Standardize all internal references

---

## **Fix Priority Matrix**

| Priority | Issue | Files Affected | Complexity | Impact |
|----------|---------|----------------|------------|--------|
| HIGH | Package schema inconsistencies | 92 package.json files | HIGH | HIGH |
| HIGH | Mode definition schema | 3+ mode files | MEDIUM | HIGH |
| MEDIUM | Visual authority structure | 1 index file | MEDIUM | MEDIUM |
| MEDIUM | Configuration schemas | 10+ config files | MEDIUM | MEDIUM |
| LOW | Canon reference links | 20+ documentation files | LOW | LOW |

---

## **Standardization Requirements**

### **Package.json Standard Schema**
```json
{
  "name": "@mikage/package-name",
  "version": "1.0.0",
  "description": "Package description",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./types": "./dist/index.d.ts"
  },
  "dependencies": {
    "@mikage/dependency": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "scripts": {
    "build": "tsc",
    "test": "jest"
  }
}
```

### **Mode Definition Standard Schema**
```json
{
  "mode_id": "canon_core",
  "mode_name": "Canon Core",
  "preset_id": "preset_canon_core",
  "authority_level": 3,
  "characteristics": ["clean", "minimal", "elegant"],
  "use_cases": ["lore", "reference"],
  "visual_intention": "Mode description",
  "prompt_profile": {
    "positive": "...",
    "negative": "...",
    "parameters": {...}
  }
}
```

### **Visual Authority Standard Schema**
```json
{
  "domain_id": "domain_name",
  "title": "Domain Title",
  "authority_level": 1,
  "core_concepts": ["concept1", "concept2"],
  "source_files": ["file1.md", "file2.json"],
  "sub_domains": {
    "subdomain1": {...}
  }
}
```

---

## **Implementation Plan**

### **Phase 1: Schema Standardization (Week 1)**
1. Create standard package.json template
2. Apply to all 92 package files
3. Standardize mode definition schemas
4. Update visual authority index structure

### **Phase 2: Reference Cleanup (Week 2)**
1. Fix all internal documentation references
2. Standardize naming conventions
3. Validate cross-file consistency
4. Update all configuration files

### **Phase 3: Validation (Week 3)**
1. Create schema validation scripts
2. Test all standardized schemas
3. Validate cross-file consistency
4. Update documentation

---

## **Risk Assessment**

**High Risk**: Package schema inconsistencies affect build system
**Medium Risk**: Mode definition inconsistencies affect generation
**Low Risk**: Documentation reference issues affect usability

**Mitigation**: Phase-by-phase implementation with validation at each step

---

## **Success Criteria**

### **Phase 1 Complete**
- [ ] All package.json files standardized
- [ ] Mode definitions consistent
- [ ] Visual authority index structure consistent
- [ ] Configuration schemas standardized

### **Phase 2 Complete**
- [ ] All internal references fixed
- [ ] Naming conventions standardized
- [ ] Cross-file consistency validated
- [ ] Documentation updated

### **Phase 3 Complete**
- [ ] Schema validation implemented
- [ ] All schemas tested
- [ ] Consistency verified
- [ ] Documentation complete

---

## **Final Assessment**

**Current State**: Multiple schema inconsistencies affecting system integration
**Time to Fix**: 2-3 weeks
**Complexity**: Medium-High (92 files to update)
**Recommendation**: Implement standardization before canon lock
**Impact**: Critical for production readiness
