# SIMPLIFIED ORCHESTRATION MODEL FOR MIKAGE STUDIO OS

## **Core Architecture**

### **Executive Layer**
- **Chief Agent** (Orchestration Director)
- **MASTER SYSTEM PROMPT** (Constitutional Authority)

### **Production Pipeline** (8 stages)
1. **Brief Analyzer** → 2. **Prompt Compiler** → 3. **Mode Director** → 
4. **Generation Controller** → 5. **Result Curator** → 6. **Reviewer** → 
7. **Canon Gate** → 8. **Archivist**

### **Support Services** (2 agents)
- **Aesthetic Analyst** (enrichment)
- **Visual Knowledge Librarian** (references)

### **Quality Assurance** (1 agent)
- **QA Auditor** (system integrity)

## **Integration with Mikage Studio OS**

### **Package Mapping**
```
@mikage/studio-kernel → Chief Agent + Master Prompt
@mikage/provider-registry → Generation Controller
@mikage/prompt-runtime → Prompt Compiler + Mode Director
@mikage/asset-registry → Result Curator + Archivist
@mikage/review-workflow → Reviewer + Canon Gate
@mikage/studio-observability → QA Auditor
@mikage/studio-search → Visual Knowledge Librarian
```

### **System Integration Points**

#### **1. Entry Point (Brief Analyzer)**
- **Input**: User brief via Studio Control Interface
- **Integration**: Studio Kernel routes to Brief Analyzer
- **Output**: Structured brief to Prompt Compiler

#### **2. Prompt Construction (Prompt Compiler + Mode Director)**
- **Integration**: Uses @mikage/prompt-runtime modules
- **Support**: Aesthetic Analyst + Visual Knowledge Librarian enrich prompts
- **Output**: Compiled prompt to Generation Controller

#### **3. Asset Generation (Generation Controller)**
- **Integration**: Uses @mikage/provider-registry for model access
- **Output**: Generated assets to Result Curator

#### **4. Quality Evaluation (Result Curator → Reviewer → Canon Gate)**
- **Integration**: Uses @mikage/review-workflow for evaluation
- **Canon Gate**: Validates against canon rules from @mikage/canon-versioning
- **Output**: Canon decision to Archivist

#### **5. Persistence (Archivist)**
- **Integration**: Uses @mikage/asset-registry for storage
- **Lineage Tracking**: Uses @mikage/asset-lineage for graph tracking
- **Output**: Archive record to Studio Kernel

#### **6. System Monitoring (QA Auditor)**
- **Integration**: Uses @mikage/studio-observability for logging
- **Audit**: Verifies pipeline integrity and compliance
- **Output**: Audit reports to Studio Kernel

## **Simplified Data Flow**

```
User Request → Studio Kernel → Brief Analyzer → Prompt Compiler → 
Mode Director → Generation Controller → Result Curator → Reviewer → 
Canon Gate → Archivist → Studio Kernel → User Response
```

## **Decision Authority Simplified**

### **Layer 1: Constitutional**
- **MASTER SYSTEM PROMPT**: All system rules and canon protection

### **Layer 2: Operational**
- **Chief Agent**: Workflow orchestration and routing
- **Studio Kernel**: System integration and coordination

### **Layer 3: Execution**
- **Pipeline Agents**: Stage-specific processing and decisions
- **Support Agents**: Enrichment and reference services

### **Layer 4: Verification**
- **QA Auditor**: System integrity and compliance checking

## **Failure Handling**

### **Stage Failures**
- **Detection**: Individual agent detects failure
- **Routing**: Chief Agent decides recovery strategy
- **Retry**: Up to 3 attempts per stage
- **Escalation**: Failure → QA Auditor → Studio Kernel

### **Canon Failures**
- **Detection**: Canon Gate detects canon violation
- **Action**: Automatic REJECT decision
- **Routing**: Back to Brief Analyzer for re-interpretation
- **Recording**: Full failure lineage archived

## **Performance Optimization**

### **Parallel Processing**
- **Support Agents** (Aesthetic Analyst, Visual Knowledge Librarian) can run in parallel
- **QA Auditor** can run in background during pipeline execution
- **Archivist** can begin processing while Canon Gate finishes

### **Caching Strategy**
- **Visual references** cached by Visual Knowledge Librarian
- **Aesthetic principles** cached by Aesthetic Analyst
- **Canon rules** cached by Canon Gate
- **Prompt modules** cached by Prompt Compiler

### **Resource Management**
- **Generation Controller** manages provider connections
- **Result Curator** manages temporary asset storage
- **Archivist** manages long-term storage and cleanup

## **Implementation Priority**

### **Phase 1: Core Pipeline**
1. Chief Agent + Master Prompt
2. Brief Analyzer + Prompt Compiler + Mode Director
3. Generation Controller + Result Curator
4. Reviewer + Canon Gate + Archivist

### **Phase 2: Support Services**
5. Aesthetic Analyst + Visual Knowledge Librarian
6. QA Auditor

### **Phase 3: Integration**
7. Studio Kernel integration
8. Package system mapping
9. Performance optimization

## **Success Metrics**

- **Pipeline Completion Rate**: >95%
- **Canon Compliance Rate**: >98%
- **Average Processing Time**: <5 minutes per request
- **System Availability**: >99%
- **Audit Pass Rate**: >90%

This simplified model provides a clear path for integrating the agent system with Mikage Studio OS while maintaining the constitutional authority and workflow integrity defined in the original agent architecture.
