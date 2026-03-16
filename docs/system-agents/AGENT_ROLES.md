# AGENT ROLES SPECIFICATION

## **1. Chief Agent (Orchestration Director)**
- **Role**: System coordinator and workflow router
- **Trigger**: Incoming brief or system request
- **Output**: Structured run instructions, workflow routing decisions
- **Authority**: Highest operational authority under Master Prompt
- **Failure**: Workflow routing errors, stage skipping

## **2. Brief Analyzer Agent**
- **Role**: Brief structuring and intent extraction
- **Trigger**: Raw user brief received
- **Output**: Structured brief, mode suggestion, risk flags
- **Authority**: Brief interpretation only
- **Failure**: Brief parsing errors, mode detection failure

## **3. Prompt Compiler Agent**
- **Role**: Prompt construction from modules
- **Trigger**: Structured brief from Brief Analyzer
- **Output**: Compiled prompt, negative prompt, generation params
- **Authority**: Prompt assembly using official modules
- **Failure**: Module loading errors, compilation failure

## **4. Mode Director Agent**
- **Role**: Mode configuration and parameter adjustment
- **Trigger**: Compiled prompt requiring mode setup
- **Output**: Mode configuration, mode-adjusted prompt package
- **Authority**: Mode enforcement using official definitions
- **Failure**: Invalid mode, parameter configuration errors

## **5. Generation Controller Agent**
- **Role**: Asset generation execution
- **Trigger**: Mode-configured prompt ready for generation
- **Output**: Generated assets, generation receipt
- **Authority**: Provider interaction management
- **Failure**: Provider errors, generation timeouts

## **6. Result Curator Agent**
- **Role**: Output preparation for evaluation
- **Trigger**: Generated assets received
- **Output**: Review package, metadata-enriched assets
- **Authority**: Metadata attachment only
- **Failure**: Metadata processing errors

## **7. Reviewer Agent**
- **Role**: Quality evaluation using rubric
- **Trigger**: Review package from Result Curator
- **Output**: Review scores, review summary, classification
- **Authority**: Scoring based on official rubric
- **Failure**: Scoring errors, rubric application failure

## **8. Canon Gate Agent**
- **Role**: Canon validation and identity protection
- **Trigger**: Review package with scores
- **Output**: Canon decision (PASS/REVISE/REJECT), canon notes
- **Authority**: Canon law enforcement
- **Failure**: Canon validation errors

## **9. Aesthetic Analyst Agent**
- **Role**: Aesthetic intelligence enrichment
- **Trigger**: Visual concept requiring aesthetic input
- **Output**: Aesthetic suggestions, composition advice
- **Authority**: Aesthetic principles (cannot override canon)
- **Failure**: Aesthetic analysis errors

## **10. Visual Knowledge Librarian Agent**
- **Role**: Visual reference management
- **Trigger**: Visual context requiring references
- **Output**: Reference sets, visual suggestions
- **Authority**: Reference serving (cannot redefine canon)
- **Failure**: Reference retrieval errors

## **11. Archivist Agent**
- **Role**: Data persistence and lineage recording
- **Trigger**: Canon decision and review results
- **Output**: Archive record, archive receipt
- **Authority**: Data storage and lineage tracking
- **Failure**: Archive storage errors

## **12. QA Auditor Agent**
- **Role**: System integrity verification
- **Trigger**: Run completion or system audit request
- **Output**: Audit report, system warnings
- **Authority**: System-wide verification
- **Failure**: Audit detection errors
