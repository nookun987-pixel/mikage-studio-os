# AGENT PIPELINE SPECIFICATION

## **Official Production Lifecycle**
Chief → Brief → Compile → Mode → Generate → Curate → Review → Canon → Archive

## **Stage 1: Brief Processing**
**Brief Analyzer Agent**
- **Trigger**: Raw user brief received
- **Process**: Extract objective, detect mode, identify references, flag canon risks
- **Output**: Structured brief package
- **Next Stage**: Prompt Compiler
- **Failure Conditions**: Brief parsing failure, mode detection failure, canon risk overflow

## **Stage 2: Prompt Compilation**
**Prompt Compiler Agent**
- **Trigger**: Structured brief from Brief Analyzer
- **Process**: Load prompt modules, assemble compiled prompt, attach negative fragments
- **Support**: Aesthetic Analyst (suggestions), Visual Knowledge Librarian (references)
- **Output**: Compiled prompt package with generation parameters
- **Next Stage**: Mode Director
- **Failure Conditions**: Module loading failure, compilation errors

## **Stage 3: Mode Configuration**
**Mode Director Agent**
- **Trigger**: Compiled prompt requiring mode setup
- **Process**: Confirm mode, adjust parameters per mode definition
- **Output**: Mode-configured prompt package
- **Next Stage**: Generation Controller
- **Failure Conditions**: Invalid mode, parameter configuration errors

## **Stage 4: Asset Generation**
**Generation Controller Agent**
- **Trigger**: Mode-configured prompt ready
- **Process**: Send to provider, monitor run, capture results
- **Output**: Generated assets with generation receipt
- **Next Stage**: Result Curator
- **Failure Conditions**: Provider errors, generation timeouts, provider failure

## **Stage 5: Result Curation**
**Result Curator Agent**
- **Trigger**: Generated assets received
- **Process**: Attach metadata, attach prompt lineage, organize assets
- **Output**: Review package with metadata-enriched assets
- **Next Stage**: Reviewer
- **Failure Conditions**: Metadata processing errors, lineage attachment failure

## **Stage 6: Quality Review**
**Reviewer Agent**
- **Trigger**: Review package from Result Curator
- **Process**: Score using rubric (canon fidelity, composition, material, lighting, emotion, luxury, appeal)
- **Output**: Review scores, review summary, classification recommendation
- **Next Stage**: Canon Gate
- **Failure Conditions**: Scoring errors, rubric application failure

## **Stage 7: Canon Validation**
**Canon Gate Agent**
- **Trigger**: Review package with scores
- **Process**: Validate character identity, palette, emotional signature, detect drift
- **Output**: Canon decision (PASS/REVISE/REJECT), canon notes
- **Next Stage**: Archivist
- **Failure Conditions**: Canon validation errors, identity verification failure

## **Stage 8: Archive Persistence**
**Archivist Agent**
- **Trigger**: Canon decision and review results
- **Process**: Store run results, record lineage, store scores, store decision
- **Output**: Archive record with archive receipt
- **Pipeline Complete**: Yes
- **Failure Conditions**: Archive storage errors, lineage recording failure

## **Support Agent Interactions**

### **Aesthetic Analyst**
- **Trigger**: Visual concept during compilation
- **Process**: Apply Japanese aesthetic principles (Ma, Notan, Ki-sho-ten-ketsu, Oku, Wabi-sabi)
- **Output**: Aesthetic suggestions, composition advice
- **Integration**: Enriches Prompt Compiler

### **Visual Knowledge Librarian**
- **Trigger**: Visual context during compilation
- **Process**: Retrieve motif references, suggest composition patterns, provide material references
- **Output**: Reference sets, visual suggestions
- **Integration**: Enriches Prompt Compiler

## **System Orchestration**

### **Chief Agent Responsibilities**
- Monitor all pipeline stages
- Route tasks between agents
- Ensure workflow stage completion
- Handle stage transitions
- Manage failure routing

### **QA Auditor Responsibilities**
- Verify workflow stage execution
- Verify receipt existence
- Detect missing lineage
- Detect runtime inconsistencies
- Generate audit reports

## **Pipeline Guarantees**

1. **No Stage Skipping**: All stages must complete in order
2. **Receipt Tracking**: Every stage generates traceable receipts
3. **Lineage Preservation**: Full prompt-to-asset lineage maintained
4. **Canon Enforcement**: Canon Gate has final approval authority
5. **Archive Completeness**: All runs (success/failure) archived

## **Failure Recovery**

- **Stage Failure**: Route to Chief Agent for decision
- **Canon Rejection**: Route back to Brief Analyzer for re-interpretation
- **Generation Failure**: Retry with Generation Controller (max 3 attempts)
- **System Failure**: QA Auditor generates system warning
