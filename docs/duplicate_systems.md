# DUPLICATE SYSTEMS ANALYSIS

## **Canon Documents - MATCH**

### **Zenith Single Source of Truth**
**Legacy**: `D:/Zenith core/MIKAGE ZENITH - SINGLE SOURCE OF TRUTH (V1.3).md`
**Current**: `docs/mikage-canon-harvest/00-master-packs/` (multiple canon documents)
**Status**: **MATCH** - Same canon content, different organization
**Action**: Consolidate into single authoritative document

### **Core Specifications**
**Legacy**: `D:/repo cũ 1/main 1/01_Mikage_Core_Spec.txt`
**Current**: `docs/mikage-canon-harvest/00-master-packs/MIKAGE NARRATIVE CONSTITUTION.md`
**Status**: **MATCH** - Same core philosophy, different language
**Action**: Merge Vietnamese insights into English constitution

### **Visual Mode Briefs**
**Legacy**: `D:/repo cũ 1/main 1/02_Mikage_3_Mode_Visual_Briefs.txt`
**Current**: `docs/visual-authority/02_Mikage_3_Mode_Visual_Briefs.txt`
**Status**: **MATCH** - Identical content
**Action**: Keep current, legacy is duplicate

---

## **Visual Grammar - SUPERSEDED**

### **Japanese Art Grammar**
**Legacy**: `D:/repo cũ 1/main 1/JAPANESE ART GRAMMAR FOR STUDIO.json`
**Current**: `docs/visual-authority/JAPANESE ART GRAMMAR FOR STUDIO.json`
**Status**: **SUPERSEDED** - Current version is more complete
**Action**: Legacy version can be discarded

### **Traditional Visual References**
**Legacy**: `D:/repo cũ 1/main 1/JAPANESE_TRADITIONAL_VISUAL_REFERENCE.MASTER PACK.json`
**Current**: `docs/visual-authority/JAPANESE_TRADITIONAL_VISUAL_REFERENCE.MASTER PACK.json`
**Status**: **SUPERSEDED** - Identical content, current is authoritative
**Action**: Legacy version is redundant

---

## **Workflow Systems - MATCH**

### **Studio Test Workflow**
**Legacy**: `D:/repo cũ 1/main 1/04_Studio_Test_Workflow.txt`
**Current**: `docs/system-agents/AGENT_PIPELINE.md` (7-stage pipeline)
**Status**: **MATCH** - Same 7-stage workflow, different format
**Action**: Merge legacy details into current pipeline

### **System Master**
**Legacy**: `D:/repo cũ 1/main 1/studio.brain.masters/SYSTEM_MASTER.md`
**Current**: `docs/system-agents/MASTER SYSTEM PROMPT DUY NHẤT.txt`
**Status**: **MATCH** - Same system philosophy, different language
**Action**: Merge Vietnamese system insights into current master prompt

---

## **Agent Architecture - PARTIAL**

### **Agent Development Rules**
**Legacy**: `D:/repo cũ 1/main 1/AGENTS.md`
**Current**: `docs/system-agents/AGENT_ROLES.md` (12 agents defined)
**Status**: **PARTIAL** - Legacy has development rules, current has runtime roles
**Action**: Extract development guidelines, merge with current roles

### **Project Master**
**Legacy**: `D:/repo cũ 1/main 1/studio.brain.masters/MIKAGE_PROJECT_MASTER.md`
**Current**: `docs/mikage-canon-harvest/00-master-packs/` (distributed across multiple files)
**Status**: **PARTIAL** - Legacy has unified project view, current is distributed
**Action**: Consolidate project master insights

---

## **Prompt Systems - MATCH**

### **Prompt Pack**
**Legacy**: `D:/repo cũ 1/main 1/03_Mikage_Prompt_Pack.txt`
**Current**: `docs/visual-authority/prompt_modules.json` (structured modules)
**Status**: **MATCH** - Same content, different format
**Action**: Legacy templates can inform current module system

---

## **Quality Systems - PARTIAL**

### **Canon Invariants**
**Legacy**: `D:/repo cũ 1/main 1/canon_invariants.json.txt`
**Current**: `docs/mikage-canon-harvest/99-audit-output/06-resolved-canon.md`
**Status**: **PARTIAL** - Legacy has validation rules, current has resolved conflicts
**Action**: Extract validation logic, integrate with current system

### **Review Rubric**
**Legacy**: `D:/repo cũ 1/main 1/review_rubric.json.txt`
**Current**: `docs/system-agents/AGENT_ROLES.md` (Reviewer agent)
**Status**: **PARTIAL** - Legacy has scoring criteria, current has agent roles
**Action**: Merge scoring criteria into Reviewer agent

---

## **Data Structures - SUPERSEDED**

### **Studio Data Organization**
**Legacy**: `D:/repo cũ 1/main 1/studio-data/` (archetypes, environments, presets)
**Current**: `docs/visual-authority/visual_authority_index.json` (structured index)
**Status**: **SUPERSEDED** - Current system is more comprehensive
**Action**: Legacy data can inform current datasets

### **Environment Registry**
**Legacy**: `D:/repo cũ 1/main 1/environmentsenvironment_registry.json`
**Current**: `configs/` (distributed configuration)
**Status**: **SUPERSEDED** - Current system is more modular
**Action**: Extract any unique environment definitions

---

## **Technical Infrastructure - SUPERSEDED**

### **Package Configuration**
**Legacy**: `D:/repo cũ 1/main 1/package.json` (single monorepo)
**Current**: `packages/` (modular monorepo with 12 packages)
**Status**: **SUPERSEDED** - Current architecture is superior
**Action**: Legacy configuration is obsolete

### **Build System**
**Legacy**: `D:/repo cũ 1/main 1/vite.config.ts` (Vite frontend)
**Current**: Turborepo + TypeScript packages
**Status**: **SUPERSEDED** - Current build system is enterprise-grade
**Action**: Legacy build system is obsolete

---

## **Summary by Category**

### **IDENTICAL MATCHES (Keep Current, Archive Legacy)**
- Japanese Art Grammar
- Traditional Visual References
- Visual Mode Briefs
- Prompt Pack content

### **COMPATIBLE MATCHES (Merge Insights)**
- Zenith Single Source of Truth
- Core Specifications
- Workflow Systems
- System Master

### **PARTIAL OVERLAPS (Extract Value)**
- Agent Architecture
- Quality Systems
- Project Master
- Data Structures

### **SUPERSEDED (Discard Legacy)**
- Technical Infrastructure
- Build System
- Package Configuration
- Data Organization

---

## **Migration Strategy**

### **Phase 1: Critical Merges**
1. Merge Zenith V1.3 insights into current canon
2. Integrate Vietnamese core specifications
3. Enhance workflow with legacy details
4. Update system master with legacy philosophy

### **Phase 2: Value Extraction**
1. Extract agent development guidelines
2. Merge quality system logic
3. Consolidate project master insights
4. Harvest unique data definitions

### **Phase 3: Cleanup**
1. Archive duplicate files
2. Remove superseded systems
3. Standardize formats
4. Update documentation

---

## **Risk Assessment**

### **LOW RISK**
- Identical content (Japanese Art Grammar, Visual References)
- Superseded technical infrastructure

### **MEDIUM RISK**
- Partial overlaps (agent systems, quality systems)
- Format standardization requirements

### **HIGH RISK**
- Canon consolidation (must preserve all insights)
- System master integration (philosophy alignment)

**Overall Risk**: MEDIUM - Most duplicates are safe, canon consolidation requires care

**Recommendation**: Proceed with Phase 1 merges, validate canon integrity, then continue with value extraction.
