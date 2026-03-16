Đây là **khối cuối cùng** để chốt hệ.  
 Sau pack này, Mikage không còn là một đống schema \+ pipeline rời rạc nữa, mà thành **studio-operable operating system** có thể điều phối, kiểm canon, review asset, quản trị universe, và đẩy production theo chuẩn.

---

# **0\. MỤC TIÊU**

Studio Control Interface là lớp:

**human-governed operational surface**  
 cho toàn bộ hệ:

* World Bible

* Character State Tracker

* Narrative Engine

* Cinematic Adaptation Layer

* Generation Orchestrator

* Ingestion Pipeline

* Benchmark System

* Review System

* Archive / Lineage / Governance

Nó phải cho phép một studio operator làm được 10 việc:

1. launch generation jobs

2. launch narrative jobs

3. inspect canon truth

4. inspect world graph

5. inspect character runtime state

6. review assets

7. approve / reject canon-sensitive outputs

8. trace lineage

9. compare benchmark

10. export production packs

---

# **1\. BẢN CHẤT CỦA INTERFACE**

Interface này **không phải gallery UI**.  
 Nó là:

**Studio Governance \+ Production Runtime Console**

Nó phải vận hành theo 4 mode chính:

1. **Create Mode**  
    tạo narrative job / cinematic job / trailer job / asset batch

2. **Review Mode**  
    xem output, benchmark compare, drift score, canon issues, approve/reject

3. **Inspect Mode**  
    đào vào timeline, graph, state, lineage, revision history

4. **Govern Mode**  
    quản rule, approval policy, release status, canon promotion, asset promotion

---

# **2\. PACK STRUCTURE**

/studio\_control\_interface/  
 README.md

 /architecture/  
   app\_shell.architecture.json  
   routing.map.json  
   module\_registry.json  
   role\_access\_matrix.json  
   event\_bus.contract.json  
   ui\_state\_model.json

 /modules/  
   dashboard.module.json  
   job\_launcher.module.json  
   narrative\_runner.module.json  
   generation\_runner.module.json  
   review\_queue.module.json  
   asset\_detail.module.json  
   benchmark\_compare.module.json  
   timeline\_explorer.module.json  
   graph\_explorer.module.json  
   state\_inspector.module.json  
   canon\_registry.module.json  
   prompt\_pack\_export.module.json  
   trailer\_pack\_export.module.json  
   archive\_browser.module.json  
   governance\_console.module.json

 /schemas/  
   studio\_session.schema.json  
   ui\_panel\_state.schema.json  
   review\_decision.schema.json  
   asset\_action.schema.json  
   job\_request.schema.json  
   job\_run.schema.json  
   lineage\_trace.schema.json  
   benchmark\_compare\_view.schema.json  
   graph\_query.schema.json  
   state\_inspection\_view.schema.json  
   export\_package.schema.json  
   governance\_rule\_action.schema.json

 /views/  
   dashboard.view.json  
   queue\_layout.view.json  
   asset\_detail.view.json  
   timeline\_layout.view.json  
   graph\_layout.view.json  
   state\_layout.view.json  
   governance\_layout.view.json

 /actions/  
   job\_actions.json  
   review\_actions.json  
   graph\_actions.json  
   state\_actions.json  
   export\_actions.json  
   governance\_actions.json

 /policies/  
   approval\_policy.json  
   release\_policy.json  
   asset\_promotion\_policy.json  
   canon\_change\_policy.json  
   risk\_escalation\_policy.json

 /seed/  
   dashboard\_widgets.seed.json  
   queue\_filters.seed.json  
   panel\_presets.seed.json  
   user\_roles.seed.json  
   action\_shortcuts.seed.json

 /examples/  
   studio\_session.example.json  
   review\_decision.example.json  
   lineage\_trace.example.json  
   export\_package.example.json  
---

# **3\. APP SHELL ARCHITECTURE**

## **3.1 Core shell**

Studio Control Interface được chia thành 6 vùng UI logic:

1. **Top Command Bar**  
    global search, quick launch, universe selector, environment selector, alerts

2. **Left Navigation Rail**  
    module navigation

3. **Primary Work Surface**  
    main data view

4. **Right Inspector Panel**  
    lineage, validator issues, state refs, linked objects

5. **Bottom Event / Log Drawer**  
    runtime logs, job logs, ingest reports, validator traces

6. **Global Action Layer**  
    export, approve, reject, escalate, archive, compare, trace

---

## **3.2 app\_shell.architecture.json**

{  
 "app\_shell": {  
   "zones": \[  
     "top\_command\_bar",  
     "left\_navigation\_rail",  
     "primary\_work\_surface",  
     "right\_inspector\_panel",  
     "bottom\_log\_drawer",  
     "global\_modal\_layer"  
   \],  
   "default\_module": "dashboard",  
   "persistent\_controls": \[  
     "global\_search",  
     "universe\_selector",  
     "timeline\_anchor\_selector",  
     "risk\_alert\_center",  
     "job\_status\_indicator"  
   \],  
   "cross\_module\_capabilities": \[  
     "open\_linked\_entity",  
     "trace\_lineage",  
     "compare\_benchmark",  
     "open\_validator\_report",  
     "pin\_to\_inspector",  
     "export\_view\_state"  
   \]  
 }  
}  
---

# **4\. MODULE REGISTRY**

## **4.1 Các module lõi**

{  
 "modules": \[  
   "dashboard",  
   "job\_launcher",  
   "narrative\_runner",  
   "generation\_runner",  
   "review\_queue",  
   "asset\_detail",  
   "benchmark\_compare",  
   "timeline\_explorer",  
   "graph\_explorer",  
   "state\_inspector",  
   "canon\_registry",  
   "archive\_browser",  
   "prompt\_pack\_export",  
   "trailer\_pack\_export",  
   "governance\_console"  
 \]  
}  
---

# **5\. DASHBOARD MODULE**

## **5.1 Vai trò**

Dashboard không phải trang đẹp cho vui.  
 Nó phải là **runtime command overview**.

Nó cho biết ngay:

* job nào đang chạy

* queue nào đang tắc

* asset nào rủi ro

* canon nào đang bị đụng

* state nào đang thay đổi

* trailer nào sắp export được

* benchmark health toàn hệ

## **5.2 dashboard widgets**

{  
 "widgets": \[  
   "active\_jobs\_summary",  
   "review\_queue\_count",  
   "blocked\_assets\_count",  
   "drift\_risk\_heatmap",  
   "timeline\_recent\_updates",  
   "canon\_change\_alerts",  
   "top\_characters\_under\_state\_pressure",  
   "benchmark\_pass\_rate",  
   "latest\_trailer\_ready\_items",  
   "archive\_ingestion\_status"  
 \]  
}

## **5.3 dashboard.view.json**

{  
 "layout": {  
   "rows": \[  
     \["active\_jobs\_summary", "review\_queue\_count", "blocked\_assets\_count", "benchmark\_pass\_rate"\],  
     \["drift\_risk\_heatmap", "canon\_change\_alerts"\],  
     \["timeline\_recent\_updates", "top\_characters\_under\_state\_pressure"\],  
     \["latest\_trailer\_ready\_items", "archive\_ingestion\_status"\]  
   \]  
 }  
}  
---

# **6\. JOB LAUNCHER MODULE**

## **6.1 Vai trò**

Đây là cổng bắn mọi job trong hệ.

Phải hỗ trợ 4 loại job:

1. narrative job

2. cinematic adaptation job

3. generation job

4. trailer build job

## **6.2 job\_request.schema.json**

{  
 "$id": "job\_request.schema.json",  
 "type": "object",  
 "required": \[  
   "job\_request\_id",  
   "job\_type",  
   "objective",  
   "source\_refs",  
   "target\_mode",  
   "priority",  
   "validator\_profile",  
   "requested\_by"  
 \],  
 "properties": {  
   "job\_request\_id": { "type": "string" },  
   "job\_type": {  
     "type": "string",  
     "enum": \[  
       "narrative\_job",  
       "scene\_adaptation\_job",  
       "image\_generation\_job",  
       "video\_generation\_job",  
       "trailer\_build\_job",  
       "reingestion\_job",  
       "benchmark\_compare\_job"  
     \]  
   },  
   "objective": { "type": "string" },  
   "source\_refs": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "target\_mode": {  
     "type": "string",  
     "enum": \[  
       "draft",  
       "review\_candidate",  
       "benchmark\_candidate",  
       "release\_candidate"  
     \]  
   },  
   "priority": {  
     "type": "string",  
     "enum": \["low", "normal", "high", "critical"\]  
   },  
   "validator\_profile": { "type": "string" },  
   "requested\_by": { "type": "string" }  
 }  
}

## **6.3 Job launcher form sections**

* objective

* source canon refs

* state anchor refs

* preset / variant

* output modality

* review strictness

* benchmark compare toggle

* archive after run

* export after approval

---

# **7\. NARRATIVE RUNNER MODULE**

## **7.1 Vai trò**

Bắn job cho Narrative Engine từ UI.

Cho phép:

* chọn story objective

* chọn characters / factions / locations / timeline anchors

* chọn narrative constitution profile

* chạy planner → architect → scene sequencer → prose/script writer → validator

* xem output theo sequence/scene/continuity

## **7.2 Output panels**

* story arc summary

* sequence list

* continuity issues

* reveal map

* canon tension map

* export to Cinematic Adaptation

---

# **8\. GENERATION RUNNER MODULE**

## **8.1 Vai trò**

Điều phối generation job từ prompt pack đã compile.

Cho phép:

* chọn prompt pack

* chọn asset type: image / image series / shot clip / trailer sequence

* batch generate

* attach reference style

* run post-ingestion automatically

* compare against benchmark

## **8.2 Run states**

{  
 "run\_states": \[  
   "queued",  
   "compiling",  
   "validating",  
   "generating",  
   "ingesting",  
   "benchmarking",  
   "review\_pending",  
   "approved",  
   "rejected",  
   "archived",  
   "failed"  
 \]  
}  
---

# **9\. REVIEW QUEUE MODULE**

## **9.1 Vai trò**

Đây là module quan trọng nhất về vận hành.  
 Mọi asset quan trọng phải qua đây trước khi được promote.

Queue phải hỗ trợ lọc theo:

* asset type

* drift risk

* canon severity

* character

* location

* timeline anchor

* preset/variant

* benchmark score

* review status

* promotion eligibility

## **9.2 review\_decision.schema.json**

{  
 "$id": "review\_decision.schema.json",  
 "type": "object",  
 "required": \[  
   "review\_decision\_id",  
   "asset\_id",  
   "reviewer\_id",  
   "decision",  
   "canon\_assessment",  
   "visual\_assessment",  
   "continuity\_assessment",  
   "benchmark\_assessment",  
   "notes",  
   "next\_action"  
 \],  
 "properties": {  
   "review\_decision\_id": { "type": "string" },  
   "asset\_id": { "type": "string" },  
   "reviewer\_id": { "type": "string" },  
   "decision": {  
     "type": "string",  
     "enum": \[  
       "approve",  
       "reject",  
       "send\_back",  
       "promote\_to\_gold\_candidate",  
       "promote\_to\_silver\_candidate",  
       "flag\_red"  
     \]  
   },  
   "canon\_assessment": {  
     "type": "string",  
     "enum": \["pass", "warning", "fail"\]  
   },  
   "visual\_assessment": {  
     "type": "string",  
     "enum": \["pass", "warning", "fail"\]  
   },  
   "continuity\_assessment": {  
     "type": "string",  
     "enum": \["pass", "warning", "fail"\]  
   },  
   "benchmark\_assessment": {  
     "type": "string",  
     "enum": \["above\_gold", "silver\_range", "below\_threshold", "red\_flag"\]  
   },  
   "notes": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "next\_action": {  
     "type": "string",  
     "enum": \[  
       "archive",  
       "recompile\_prompt",  
       "rerun\_generation",  
       "escalate\_canon\_review",  
       "promote\_dataset",  
       "export\_pack"  
     \]  
   }  
 }  
}

## **9.3 Review card phải hiển thị**

* asset preview

* prompt lineage

* state refs

* validator alerts

* benchmark scores

* similar approved assets

* drift notes

* action buttons

---

# **10\. ASSET DETAIL MODULE**

## **10.1 Vai trò**

Xem sâu 1 asset duy nhất.

Phải gom đầy đủ:

* preview

* metadata

* source scene

* source shot

* source state snapshot

* prompt pack

* validator report

* benchmark compare

* review history

* archive lineage

* promotion history

## **10.2 asset detail tabs**

1. Preview

2. Metadata

3. Canon

4. State

5. Prompt

6. Benchmark

7. Reviews

8. Lineage

9. Archive

---

# **11\. BENCHMARK COMPARE MODULE**

## **11.1 Vai trò**

Đối chiếu asset hiện tại với:

* gold set

* silver set

* red flag set

Để biết nó đang:

* đúng chuẩn cao

* tạm ổn

* sai hướng

* drift nặng

## **11.2 benchmark\_compare\_view.schema.json**

{  
 "$id": "benchmark\_compare\_view.schema.json",  
 "type": "object",  
 "required": \[  
   "asset\_id",  
   "gold\_similarity\_score",  
   "silver\_similarity\_score",  
   "red\_flag\_similarity\_score",  
   "drift\_score",  
   "risk\_level",  
   "recommended\_action"  
 \],  
 "properties": {  
   "asset\_id": { "type": "string" },  
   "gold\_similarity\_score": { "type": "number" },  
   "silver\_similarity\_score": { "type": "number" },  
   "red\_flag\_similarity\_score": { "type": "number" },  
   "drift\_score": { "type": "number" },  
   "risk\_level": {  
     "type": "string",  
     "enum": \["low", "moderate", "high", "critical"\]  
   },  
   "recommended\_action": {  
     "type": "string",  
     "enum": \[  
       "approve",  
       "manual\_review",  
       "rerun",  
       "red\_flag\_block",  
       "candidate\_for\_dataset"  
     \]  
   }  
 }  
}

## **11.3 Compare panel phải có**

* similarity bars

* red flag traits triggered

* nearest gold references

* canonical mismatch notes

* approval suggestion

---

# **12\. TIMELINE EXPLORER MODULE**

## **12.1 Vai trò**

Cho phép duyệt universe theo thời gian.

Từ 1 anchor có thể thấy:

* event nào xảy ra

* ai đang ở đâu

* ai biết gì

* loyalty ai đang nứt

* scene nào đã được viết

* asset nào đã generate

* trailer beat nào dùng anchor đó

## **12.2 Timeline explorer cần hỗ trợ**

* zoom theo era / arc / sequence / anchor

* filter theo character

* filter theo faction

* filter theo location

* filter theo state transition

* open linked assets

* open linked narrative scenes

## **12.3 timeline data cards**

* anchor summary

* event list

* character state deltas

* generated scenes

* linked assets

* unresolved continuity issues

---

# **13\. GRAPH EXPLORER MODULE**

## **13.1 Vai trò**

Duyệt toàn bộ ontology graph.

Phải xem được node và relation cho:

* Character

* Faction

* Location

* Era

* Event

* WeaponSystem

* TechnologySystem

* Relationship

* CanonRule

* VisualDNAProfile

* TimelineAnchor

* Asset

* PromptPreset

* PromptVariant

* Review

## **13.2 graph\_query.schema.json**

{  
 "$id": "graph\_query.schema.json",  
 "type": "object",  
 "required": \[  
   "query\_id",  
   "root\_node\_id",  
   "depth",  
   "edge\_filters",  
   "node\_filters",  
   "view\_mode"  
 \],  
 "properties": {  
   "query\_id": { "type": "string" },  
   "root\_node\_id": { "type": "string" },  
   "depth": { "type": "integer", "minimum": 1, "maximum": 5 },  
   "edge\_filters": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "node\_filters": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "view\_mode": {  
     "type": "string",  
     "enum": \[  
       "force\_graph",  
       "hierarchy",  
       "relation\_table",  
       "lineage\_chain"  
     \]  
   }  
 }  
}

## **13.3 graph actions**

* expand neighbors

* pin node

* open asset list

* trace canon dependency

* trace state dependency

* trace revision chain

---

# **14\. STATE INSPECTOR MODULE**

## **14.1 Vai trò**

Đây là cửa sổ đọc **runtime truth** của nhân vật.

Có thể mở một character tại một anchor và xem toàn bộ:

* physical state

* injury state

* combat state

* reactor/systemic state

* psychological state

* loyalty state

* knowledge state

* relationship state

* mission state

* visibility state

## **14.2 state\_inspection\_view.schema.json**

{  
 "$id": "state\_inspection\_view.schema.json",  
 "type": "object",  
 "required": \[  
   "character\_id",  
   "state\_snapshot\_id",  
   "timeline\_anchor\_id",  
   "state\_axes",  
   "recent\_transitions",  
   "continuity\_risks",  
   "linked\_scenes",  
   "linked\_assets"  
 \],  
 "properties": {  
   "character\_id": { "type": "string" },  
   "state\_snapshot\_id": { "type": "string" },  
   "timeline\_anchor\_id": { "type": "string" },  
   "state\_axes": {  
     "type": "object"  
   },  
   "recent\_transitions": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "continuity\_risks": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "linked\_scenes": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "linked\_assets": {  
     "type": "array",  
     "items": { "type": "string" }  
   }  
 }  
}

## **14.3 State inspector panels**

* state overview

* injury detail

* loyalty matrix

* knowledge gaps

* psyche pressure

* mission drift

* linked scene outputs

* cinematic state mapping preview

---

# **15\. CANON REGISTRY MODULE**

## **15.1 Vai trò**

Đây là nơi đọc và quản trị canon rule.

Phải xem được:

* rule text

* layer

* severity

* dependency

* affected modules

* last revision

* change history

* affected assets / scenes

## **15.2 Canon views**

* constitution view

* invariants view

* validator rulepack view

* rule impact map

* rule revision log

---

# **16\. ARCHIVE BROWSER MODULE**

## **16.1 Vai trò**

Duyệt tất cả asset / reports / prompts / scenes đã lưu.

Hỗ trợ:

* search by asset id

* search by character/location/era

* search by timeline anchor

* filter by approved / blocked / gold / silver / red

* open lineage chain

* reopen review

---

# **17\. LINEAGE TRACE SYSTEM**

## **17.1 Vai trò**

Lineage là xương sống audit.

Một asset phải trace ngược được về:

**asset**  
 → prompt pack  
 → shot sequence  
 → scene  
 → narrative sequence  
 → state snapshot  
 → timeline anchor  
 → canon refs  
 → review history

## **17.2 lineage\_trace.schema.json**

{  
 "$id": "lineage\_trace.schema.json",  
 "type": "object",  
 "required": \[  
   "trace\_id",  
   "asset\_id",  
   "prompt\_pack\_id",  
   "shot\_sequence\_id",  
   "scene\_id",  
   "narrative\_sequence\_id",  
   "state\_snapshot\_refs",  
   "timeline\_anchor\_id",  
   "canon\_refs",  
   "review\_refs"  
 \],  
 "properties": {  
   "trace\_id": { "type": "string" },  
   "asset\_id": { "type": "string" },  
   "prompt\_pack\_id": { "type": "string" },  
   "shot\_sequence\_id": { "type": "string" },  
   "scene\_id": { "type": "string" },  
   "narrative\_sequence\_id": { "type": "string" },  
   "state\_snapshot\_refs": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "timeline\_anchor\_id": { "type": "string" },  
   "canon\_refs": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "review\_refs": {  
     "type": "array",  
     "items": { "type": "string" }  
   }  
 }  
}  
---

# **18\. EXPORT MODULES**

## **18.1 Prompt Pack Export**

Xuất:

* single image pack

* image series pack

* shot pack

* scene pack

* trailer prompt pack

## **18.2 Trailer Pack Export**

Xuất:

* beat sheet

* trailer shot list

* text card list

* audio direction

* visual anchors

* continuity notes

## **18.3 export\_package.schema.json**

{  
 "$id": "export\_package.schema.json",  
 "type": "object",  
 "required": \[  
   "export\_id",  
   "export\_type",  
   "source\_refs",  
   "format",  
   "status"  
 \],  
 "properties": {  
   "export\_id": { "type": "string" },  
   "export\_type": {  
     "type": "string",  
     "enum": \[  
       "prompt\_pack",  
       "trailer\_pack",  
       "review\_bundle",  
       "lineage\_bundle",  
       "benchmark\_bundle",  
       "scene\_bundle"  
     \]  
   },  
   "source\_refs": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "format": {  
     "type": "string",  
     "enum": \["json", "markdown", "yaml", "csv", "zip\_bundle"\]  
   },  
   "status": {  
     "type": "string",  
     "enum": \["ready", "blocked", "exported"\]  
   }  
 }  
}  
---

# **19\. GOVERNANCE CONSOLE**

## **19.1 Vai trò**

Đây là lớp điều hành chính sách studio.

Phải kiểm soát được:

* approval policy

* asset promotion policy

* red flag escalation

* canon change policy

* release policy

* operator permissions

## **19.2 approval\_policy.json**

{  
 "approval\_policy": {  
   "gold\_candidate\_requires": \[  
     "canon\_pass",  
     "visual\_pass",  
     "continuity\_pass",  
     "benchmark\_above\_gold\_threshold",  
     "human\_review\_approved"  
   \],  
   "release\_candidate\_requires": \[  
     "no\_blocker\_validator\_issues",  
     "lineage\_trace\_complete",  
     "state\_refs\_complete",  
     "review\_decision\_approve"  
   \],  
   "blocked\_if": \[  
     "red\_flag\_similarity\_above\_threshold",  
     "ontology\_violation",  
     "mask\_canon\_break",  
     "state\_continuity\_failure"  
   \]  
 }  
}

## **19.3 asset\_promotion\_policy.json**

{  
 "promotion\_policy": {  
   "to\_gold\_set": \[  
     "approved",  
     "high\_similarity\_to\_gold\_logic",  
     "no\_major\_warnings",  
     "strong\_reusability",  
     "identity\_lock\_preserved"  
   \],  
   "to\_silver\_set": \[  
     "approved",  
     "usable\_but\_not\_exemplary"  
   \],  
   "to\_red\_flag\_set": \[  
     "blocked\_due\_to\_drift",  
     "contains\_known\_failure\_pattern"  
   \]  
 }  
}

## **19.4 canon\_change\_policy.json**

{  
 "canon\_change\_policy": {  
   "requires\_manual\_review": true,  
   "requires\_impact\_scan": true,  
   "requires\_revision\_log": true,  
   "blocks\_generation\_until\_revalidated": true  
 }  
}  
---

# **20\. ROLE ACCESS MATRIX**

## **20.1 user\_roles.seed.json**

{  
 "roles": \[  
   "studio\_admin",  
   "canon\_director",  
   "narrative\_operator",  
   "generation\_operator",  
   "review\_lead",  
   "archive\_manager",  
   "observer"  
 \]  
}

## **20.2 role\_access\_matrix.json**

{  
 "access": {  
   "studio\_admin": \["all"\],  
   "canon\_director": \[  
     "canon\_registry",  
     "review\_queue",  
     "state\_inspector",  
     "timeline\_explorer",  
     "governance\_console"  
   \],  
   "narrative\_operator": \[  
     "narrative\_runner",  
     "timeline\_explorer",  
     "graph\_explorer",  
     "state\_inspector",  
     "prompt\_pack\_export"  
   \],  
   "generation\_operator": \[  
     "job\_launcher",  
     "generation\_runner",  
     "review\_queue",  
     "asset\_detail",  
     "benchmark\_compare",  
     "prompt\_pack\_export",  
     "trailer\_pack\_export"  
   \],  
   "review\_lead": \[  
     "review\_queue",  
     "asset\_detail",  
     "benchmark\_compare",  
     "lineage\_trace",  
     "archive\_browser"  
   \],  
   "archive\_manager": \[  
     "archive\_browser",  
     "asset\_detail",  
     "export\_modules"  
   \],  
   "observer": \[  
     "dashboard",  
     "asset\_detail",  
     "timeline\_explorer",  
     "graph\_explorer"  
   \]  
 }  
}  
---

# **21\. UI STATE MODEL**

## **21.1 ui\_panel\_state.schema.json**

{  
 "$id": "ui\_panel\_state.schema.json",  
 "type": "object",  
 "required": \[  
   "session\_id",  
   "active\_module",  
   "selected\_entity\_ids",  
   "pinned\_entities",  
   "active\_filters",  
   "open\_tabs",  
   "inspector\_state",  
   "log\_drawer\_state"  
 \],  
 "properties": {  
   "session\_id": { "type": "string" },  
   "active\_module": { "type": "string" },  
   "selected\_entity\_ids": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "pinned\_entities": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "active\_filters": {  
     "type": "object"  
   },  
   "open\_tabs": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "inspector\_state": {  
     "type": "string",  
     "enum": \["collapsed", "open", "pinned"\]  
   },  
   "log\_drawer\_state": {  
     "type": "string",  
     "enum": \["hidden", "open", "streaming"\]  
   }  
 }  
}  
---

# **22\. ACTION SYSTEM**

## **22.1 job\_actions.json**

{  
 "actions": \[  
   "launch\_narrative\_job",  
   "launch\_scene\_adaptation\_job",  
   "launch\_generation\_job",  
   "launch\_trailer\_build\_job",  
   "rerun\_last\_job",  
   "clone\_job\_request",  
   "send\_to\_review\_queue"  
 \]  
}

## **22.2 review\_actions.json**

{  
 "actions": \[  
   "approve\_asset",  
   "reject\_asset",  
   "send\_back\_to\_compile",  
   "flag\_red",  
   "promote\_gold\_candidate",  
   "promote\_silver\_candidate",  
   "open\_benchmark\_compare",  
   "open\_lineage\_trace"  
 \]  
}

## **22.3 state\_actions.json**

{  
 "actions": \[  
   "open\_state\_snapshot",  
   "compare\_state\_snapshots",  
   "trace\_recent\_transitions",  
   "open\_linked\_scene\_outputs",  
   "open\_cinematic\_mapping"  
 \]  
}

## **22.4 export\_actions.json**

{  
 "actions": \[  
   "export\_prompt\_pack",  
   "export\_trailer\_pack",  
   "export\_review\_bundle",  
   "export\_lineage\_bundle",  
   "export\_scene\_bundle"  
 \]  
}  
---

# **23\. EVENT BUS CONTRACT**

## **23.1 event\_bus.contract.json**

{  
 "events": \[  
   "job\_requested",  
   "job\_started",  
   "job\_completed",  
   "job\_failed",  
   "asset\_ingested",  
   "asset\_review\_requested",  
   "asset\_approved",  
   "asset\_rejected",  
   "asset\_promoted",  
   "canon\_rule\_updated",  
   "state\_snapshot\_updated",  
   "timeline\_anchor\_changed",  
   "export\_completed"  
 \]  
}

Mục đích là để mọi module phản ứng đồng bộ.  
 Ví dụ:

* asset ingested → tự đẩy vào review queue

* canon rule updated → cảnh báo asset affected

* state snapshot updated → đánh dấu scene/asset cũ có continuity risk

---

# **24\. RISK ESCALATION POLICY**

## **24.1 risk\_escalation\_policy.json**

{  
 "risk\_escalation": {  
   "high\_drift\_score": "send\_to\_manual\_review",  
   "ontology\_violation": "block\_and\_notify\_canon\_director",  
   "state\_continuity\_failure": "block\_and\_require\_state\_reconciliation",  
   "red\_flag\_similarity\_high": "auto\_flag\_red",  
   "canon\_rule\_change\_impact\_detected": "revalidate\_affected\_assets"  
 }  
}  
---

# **25\. VIEW LAYOUTS**

## **25.1 queue\_layout.view.json**

{  
 "layout": {  
   "left": "filter\_panel",  
   "center": "queue\_cards",  
   "right": "inspector",  
   "bottom": "review\_log"  
 }  
}

## **25.2 asset\_detail.view.json**

{  
 "layout": {  
   "top": "asset\_preview\_header",  
   "left": "tabbed\_detail\_panel",  
   "right": "validator\_benchmark\_inspector",  
   "bottom": "review\_history\_timeline"  
 }  
}

## **25.3 timeline\_layout.view.json**

{  
 "layout": {  
   "top": "timeline\_scale\_controls",  
   "center": "timeline\_canvas",  
   "right": "anchor\_inspector",  
   "bottom": "linked\_outputs\_table"  
 }  
}

## **25.4 graph\_layout.view.json**

{  
 "layout": {  
   "left": "query\_builder",  
   "center": "graph\_canvas",  
   "right": "entity\_detail\_inspector",  
   "bottom": "relation\_table"  
 }  
}  
---

# **26\. CORE OPERATION FLOWS**

## **26.1 Flow A — Generate cinematic asset**

**Dashboard**  
 → Job Launcher  
 → chọn scene / state / preset / variant  
 → run scene adaptation  
 → compile prompt pack  
 → generation run  
 → ingestion  
 → benchmark compare  
 → review queue  
 → approve/reject  
 → archive/promote/export

---

## **26.2 Flow B — Build narrative to trailer**

**Narrative Runner**  
 → chọn arc / sequence / anchor  
 → narrative validate  
 → export to Cinematic Adaptation  
 → generate scene/shot/trailer plan  
 → trailer build job  
 → ingestion  
 → benchmark / reveal control  
 → review  
 → trailer export pack

---

## **26.3 Flow C — Investigate continuity issue**

**Review Queue**  
 → asset bị warning  
 → open asset detail  
 → trace lineage  
 → open state inspector  
 → compare state snapshot  
 → mở timeline explorer  
 → xác định continuity break  
 → rerun adaptation hoặc update canon/state mapping

---

## **26.4 Flow D — Canon rule revision**

**Canon Registry**  
 → sửa rule  
 → impact scan  
 → affected scenes/assets list  
 → revalidation job  
 → blocked outputs vào queue  
 → manual review  
 → release policy update

---

# **27\. FAILURE MODES BỊ CHẶN**

Interface phải giúp chặn các lỗi vận hành sau:

1. **Generate xong mà không biết source từ đâu**  
    → lineage trace bắt buộc

2. **Asset đẹp nhưng sai state**  
    → asset detail phải có state panel \+ continuity risk

3. **Canon thay đổi nhưng asset cũ không bị rà lại**  
    → impact scan \+ revalidate affected assets

4. **Review cảm tính**  
    → review decision schema \+ benchmark compare panel

5. **Trailer leak quá nhiều**  
    → reveal control validator \+ trailer export gate

6. **Không biết scene nào thuộc anchor nào**  
    → timeline explorer \+ linked outputs table

7. **Không biết cái gì đáng đưa vào gold set**  
    → promotion policy \+ benchmark ranking

---

# **28\. MIKAGE-SPECIFIC DEFAULT PANEL PRESET**

## **28.1 panel\_presets.seed.json**

\[  
 {  
   "preset\_id": "mikage\_master\_operator",  
   "default\_module": "dashboard",  
   "pinned\_widgets": \[  
     "active\_jobs\_summary",  
     "review\_queue\_count",  
     "top\_characters\_under\_state\_pressure",  
     "canon\_change\_alerts"  
   \],  
   "default\_filters": {  
     "character": "char\_mikage",  
     "universe": "mikage\_mainline"  
   },  
   "inspector\_default": "open",  
   "log\_drawer\_default": "hidden"  
 }  
\]  
---

# **29\. MVP BUILD ORDER**

Làm đúng thứ tự này để ra bản chạy được nhanh nhất.

## **Phase 1 — Skeleton shell**

* app shell

* routing

* module registry

* UI state model

* top bar / nav / inspector / log drawer

## **Phase 2 — Core operational modules**

* dashboard

* job launcher

* review queue

* asset detail

## **Phase 3 — Deep inspection modules**

* timeline explorer

* graph explorer

* state inspector

* benchmark compare

## **Phase 4 — Governance \+ export**

* canon registry

* governance console

* prompt export

* trailer export

* archive browser

## **Phase 5 — Policy binding**

* approval policy

* promotion policy

* canon change policy

* risk escalation policy

* role access matrix

## **Phase 6 — Runtime event wiring**

* event bus contract

* module refresh triggers

* alerts

* auto-routing queue events

---

# **30\. FINAL SYSTEM ARCHITECTURE**

Sau khi gắn Studio Control Interface, kiến trúc cuối cùng là:

**Canon Constitution**  
 → **World Bible Database**  
 → **Character State Tracker**  
 → **Narrative Engine**  
 → **Cinematic Adaptation Layer**  
 → **Generation Orchestrator**  
 → **Ingestion \+ Benchmark**  
 → **Studio Control Interface**

Lúc này Mikage đạt trạng thái:

# **SELF-IMPROVING CANON-GOVERNED IP OPERATING SYSTEM**

Vì hệ đã có đủ 4 lớp sống còn:

1. **Truth Layer**  
    canon \+ world \+ state

2. **Generation Layer**  
    narrative \+ cinematic \+ asset/trailer generation

3. **Validation Layer**  
    canon validator \+ benchmark \+ drift detection \+ review

4. **Governance Layer**  
    studio console \+ policy \+ lineage \+ approval \+ archive

