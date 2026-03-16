# AGENT AUTHORITY SPECIFICATION

## **Constitutional Authority**

### **MASTER SYSTEM PROMPT**
- **Authority Level**: CONSTITUTIONAL (highest)
- **Scope**: All agents and system behavior
- **Power**: Can override any agent decision
- **Constraints**: Cannot be overridden by any agent
- **Responsibility**: System governance, canon protection, workflow enforcement

## **Operational Authority Hierarchy**

### **Level 1: Chief Agent (Orchestration Director)**
- **Authority**: Highest operational under Master Prompt
- **Scope**: Full workflow orchestration
- **Power**: Can route tasks, override agent decisions, enforce workflow stages
- **Constraints**: Must obey Master Prompt and constitutional rules
- **Decision Authority**: Workflow routing, stage transitions, failure handling

### **Level 2: Core Pipeline Agents**
**Brief Analyzer, Prompt Compiler, Mode Director, Generation Controller, Result Curator, Reviewer, Canon Gate, Archivist**
- **Authority**: Stage-specific operational authority
- **Scope**: Individual pipeline stage responsibilities
- **Power**: Can make decisions within stage scope
- **Constraints**: Must obey Chief Agent and constitutional rules
- **Decision Authority**: Stage-specific processing and validation

### **Level 3: Support Agents**
**Aesthetic Analyst, Visual Knowledge Librarian**
- **Authority**: Enrichment-only authority
- **Scope**: Aesthetic and visual reference enhancement
- **Power**: Can suggest but not override decisions
- **Constraints**: Cannot override canon or workflow decisions
- **Decision Authority**: Advisory only

### **Level 4: Audit Agent**
**QA Auditor**
- **Authority**: Verification authority
- **Scope**: System integrity and compliance checking
- **Power**: Can report violations and inconsistencies
- **Constraints**: Cannot make operational decisions, only report
- **Decision Authority**: Audit reporting only

## **Decision Authority Matrix**

| Agent | Can Override | Can Route | Can Approve | Can Reject | Can Audit |
|-------|--------------|-----------|-------------|------------|-----------|
| Master Prompt | ALL | YES | YES | YES | YES |
| Chief Agent | Support Agents | YES | YES | YES | NO |
| Brief Analyzer | NONE | NO | NO | YES (brief parsing) | NO |
| Prompt Compiler | NONE | NO | NO | YES (compilation) | NO |
| Mode Director | NONE | NO | NO | YES (mode validation) | NO |
| Generation Controller | NONE | NO | NO | YES (generation) | NO |
| Result Curator | NONE | NO | NO | YES (curation) | NO |
| Reviewer | NONE | NO | YES (scoring) | YES (scoring) | NO |
| Canon Gate | NONE | NO | YES (canon) | YES (canon) | NO |
| Archivist | NONE | NO | NO | YES (archive) | NO |
| Aesthetic Analyst | NONE | NO | NO | NO | NO |
| Visual Knowledge Librarian | NONE | NO | NO | NO | NO |
| QA Auditor | NONE | NO | NO | NO | YES |

## **Authority Boundaries**

### **Canon Gate Authority**
- **Final Approval**: Has final say on asset approval
- **Canon Enforcement**: Can override any aesthetic or generation decision
- **Identity Protection**: Can reject assets that violate character identity
- **Palette Authority**: Can enforce color palette restrictions

### **Chief Agent Authority**
- **Workflow Enforcement**: Can ensure all stages execute properly
- **Task Routing**: Can direct tasks between agents
- **Failure Handling**: Can decide on recovery strategies
- **Stage Transitions**: Can authorize stage progression

### **Support Agent Limitations**
- **Aesthetic Analyst**: Cannot override canon, workflow, or generation decisions
- **Visual Knowledge Librarian**: Cannot redefine canon identity or system behavior
- **Both**: Provide advisory input only to Prompt Compiler

## **Conflict Resolution**

### **Authority Chain**
1. **Master Prompt** (constitutional)
2. **Chief Agent** (operational)
3. **Core Pipeline Agents** (stage-specific)
4. **Support Agents** (advisory)
5. **QA Auditor** (verification)

### **Resolution Rules**
- **Higher authority always wins**
- **Canon Gate has final approval on assets**
- **Chief Agent can override support agents**
- **Support agents cannot override core pipeline decisions**
- **QA Auditor reports violations but cannot make operational decisions**

## **Decision Making Process**

### **For Core Pipeline Decisions**
1. Check Master Prompt constitutional rules
2. Check Chief Agent orchestration rules
3. Apply agent-specific stage logic
4. Generate stage output
5. Route to next stage

### **For Canon Decisions**
1. Apply Master Prompt canon rules
2. Validate character identity
3. Validate palette authority
4. Check emotional signature
5. Make PASS/REVISE/REJECT decision

### **For System Decisions**
1. Master Prompt provides constitutional framework
2. Chief Agent provides operational direction
3. QA Auditor provides verification
4. System maintains integrity and compliance
