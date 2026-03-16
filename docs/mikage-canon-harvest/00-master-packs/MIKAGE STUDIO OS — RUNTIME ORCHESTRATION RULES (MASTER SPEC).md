Đây là **bản master duy nhất** định nghĩa cách **toàn bộ pipeline vận hành thật** khi hệ chạy.  
 Nó khóa:

* thứ tự node

* điều kiện chạy

* guard bắt buộc

* retry policy

* fail policy

* state update policy

* memory read/write

* decision formatting

Runtime orchestration đảm bảo rằng **không prompt nào, asset nào, hay state nào có thể đi tắt pipeline**.

---

# **1\. RUNTIME ARCHITECTURE OVERVIEW**

Pipeline runtime của Mikage Studio OS luôn chạy theo **Directed Execution Graph**.

User / Operator Request  
       ↓  
Studio Director  
       ↓  
Request Classifier  
       ↓  
Context Gatherer  
       ↓  
Memory Retrieval  
       ↓  
Scene Builder  
       ↓  
Narrative Builder  
       ↓  
Canon Validator  
       ↓  
Production Packager  
       ↓  
Asset Generation  
       ↓  
Benchmark Auditor  
       ↓  
Asset Review  
       ↓  
Decision Formatter  
       ↓  
Memory Writeback

Mỗi node phải:

* nhận packet contract

* validate input

* trả JSON contract

* cập nhật lineage

---

# **2\. RUNTIME EXECUTION CONTRACT**

Mọi node runtime phải tuân theo contract sau:

{  
 "node": "node\_name",  
 "request\_id": "string",  
 "input\_packet\_refs": \[\],  
 "output\_packet\_id": "string",  
 "status": "ok | blocked | error",  
 "execution\_trace": {  
   "started\_at": "ISO\_DATETIME",  
   "completed\_at": "ISO\_DATETIME",  
   "runtime\_ms": 0  
 },  
 "errors": \[\],  
 "warnings": \[\]  
}  
---

# **3\. NODE EXECUTION RULES**

## **3.1 STUDIO DIRECTOR**

### **Purpose**

Điểm vào duy nhất của hệ.

### **Input**

User request.

### **Output**

Normalized request packet \+ pipeline selection.

### **Guard**

Block nếu:

* request trống

* request không parse được intent

### **Example output**

{  
 "node": "studio\_director",  
 "request\_id": "req\_001",  
 "pipeline\_selected": "asset\_generation\_pipeline",  
 "priority": "normal",  
 "status": "ok"  
}  
---

## **3.2 REQUEST CLASSIFIER**

### **Purpose**

Xác định loại request.

### **Output**

{  
 "request\_class": "asset\_generation",  
 "subclass": "cinematic\_keyframe",  
 "entities": \["Mikage"\],  
 "required\_inputs": \[  
   "canon\_context",  
   "character\_state",  
   "scene\_packet"  
 \]  
}

### **Guard**

Block nếu:

* entity không tồn tại trong world\_entities

* request đòi entity chưa có canon

---

## **3.3 CONTEXT GATHERER**

### **Purpose**

Tập hợp context:

* canon

* visual grammar

* character state

* scene seed

### **Required sources**

canon\_constitution  
canon\_rules  
visual\_grammar  
character\_identity  
latest\_character\_state

### **Guard**

Block nếu thiếu:

* canon constitution

* character identity

* character state

---

# **4\. MEMORY RETRIEVAL NODE**

### **Purpose**

Kéo memory relevant.

### **Retrieval policy**

priority\_order:  
 \- canon\_memory  
 \- visual\_identity\_memory  
 \- character\_state\_memory  
 \- review\_memory  
 \- production\_memory

### **Retrieval limit**

max\_records: 12  
max\_tokens\_context: 4000

### **Output**

{  
 "memory\_bundle": \[  
   {  
     "memory\_key": "mikage\_crimson\_usage\_policy",  
     "summary": "Crimson glow must remain restrained internal leakage."  
   }  
 \]  
}  
---

# **5\. SCENE BUILDER**

### **Purpose**

Chuyển request \+ context → scene packet.

### **Output**

{  
 "scene\_packet\_id": "scene\_001",  
 "environment": {  
   "location": "brutalist\_megacity\_rooftop",  
   "weather": "storm",  
   "time": "night"  
 },  
 "camera": {  
   "framing": "low\_angle\_anamorphic",  
   "scale": "monumental"  
 },  
 "risk\_flags": \[\]  
}

### **Guard**

Block nếu:

* location vi phạm ontology

* scene có fantasy marker

---

# **6\. NARRATIVE BUILDER**

### **Purpose**

Sinh narrative logic cho scene.

### **Output**

{  
 "narrative\_packet\_id": "narrative\_001",  
 "dramatic\_purpose": "pre\_battle\_reveal",  
 "emotion\_stack": \[  
   "restraint",  
   "authority",  
   "damage"  
 \],  
 "dialogue\_required": false  
}

### **Guard**

Block nếu:

* chưa có context packet

* scene packet invalid

---

# **7\. CANON VALIDATOR**

### **Purpose**

Kiểm tra:

* ontology

* character integrity

* power logic

* visual grammar

### **Output**

{  
 "validation\_pass": true,  
 "warnings": \[  
   "limit\_crimson\_intensity"  
 \],  
 "violations": \[\]  
}

### **Fail policy**

Nếu fail:

action: reject\_or\_rewrite  
---

# **8\. PRODUCTION PACKAGER**

### **Purpose**

Compile prompt production-grade.

### **Input**

* scene packet

* narrative packet

* canon context

### **Output**

{  
 "production\_package\_id": "prod\_pack\_001",  
 "compiled\_prompt": "A monumental hard sci-fi cinematic frame...",  
 "negative\_prompt": "anime, fantasy, neon cyberpunk...",  
 "ready\_for\_generation": true  
}

### **Guard**

Block nếu:

* validation fail

* missing context

---

# **9\. ASSET GENERATION NODE**

### **Purpose**

Gọi engine generate image/video/audio.

### **Input**

production package.

### **Output**

{  
 "asset\_id": "asset\_img\_001",  
 "generation\_engine": {  
   "provider": "model\_provider",  
   "model": "model\_name"  
 },  
 "status": "generated"  
}

### **Retry policy**

max\_attempts: 3  
retry\_on:  
 \- timeout  
 \- model\_error  
---

# **10\. BENCHMARK AUDITOR**

### **Purpose**

So asset với benchmark.

### **Benchmark sets**

gold\_visual\_dna  
silver\_scene\_set  
red\_drift\_examples

### **Output**

{  
 "benchmark\_pass": true,  
 "similarity\_scores": {  
   "gold": 0.91,  
   "silver": 0.88  
 },  
 "risk\_scores": {  
   "canon\_drift": 0.14  
 }  
}

### **Guard**

Block approval nếu:

canon\_drift \> 0.35  
---

# **11\. ASSET REVIEW**

### **Purpose**

Đánh giá final asset.

### **Output**

{  
 "review\_status": "approve",  
 "issues": \[\],  
 "revision\_directives": \[\]  
}

Possible statuses:

approve  
approve\_with\_revision  
revise  
reject  
---

# **12\. DECISION FORMATTER**

### **Purpose**

Sinh final decision object.

### **Output**

{  
 "decision\_id": "decision\_001",  
 "approval": "approved",  
 "next\_action": "publish\_asset",  
 "governance\_trace": {  
   "context\_present": true,  
   "canon\_validated": true,  
   "benchmark\_audited": true  
 }  
}  
---

# **13\. MEMORY WRITEBACK**

### **Purpose**

Ghi memory mới nếu cần.

### **Write conditions**

allowed\_if:  
 \- repeated\_drift\_pattern  
 \- new\_character\_state  
 \- operator\_approved\_rule  
 \- recurring\_review\_correction

### **Output**

{  
 "memory\_id": "memory\_review\_pattern\_001",  
 "status": "written"  
}  
---

# **14\. PIPELINE FAILURE RULES**

## **14.1 Hard Fail**

Pipeline dừng ngay khi:

canon\_validator\_fail  
missing\_context\_packet  
missing\_character\_identity  
ontology\_violation

## **14.2 Soft Fail**

Cho phép retry:

asset\_generation\_timeout  
benchmark\_timeout  
external\_model\_error  
---

# **15\. PIPELINE RETRY POLICY**

max\_pipeline\_retry: 2

retry\_nodes:  
 \- asset\_generation  
 \- benchmark\_auditor

Không retry:

canon\_validator  
request\_classifier  
context\_gatherer  
---

# **16\. RUNTIME STATE LOCKS**

Trong runtime:

Các object sau **không được thay đổi**:

canon\_constitution  
canon\_rules  
visual\_grammar  
character\_identity  
---

# **17\. STATE TRANSITION RULE**

Character state chỉ update nếu:

event\_record\_exists \= true  
governance\_approval \= true  
state\_transition\_record\_created \= true  
---

# **18\. LINEAGE GRAPH UPDATE**

Sau mỗi node:

Phải tạo lineage edge.

Example:

req\_001 \-\> ctx\_001  
ctx\_001 \-\> scene\_001  
scene\_001 \-\> narrative\_001  
narrative\_001 \-\> validation\_001  
validation\_001 \-\> prod\_pack\_001  
prod\_pack\_001 \-\> asset\_001  
asset\_001 \-\> benchmark\_001  
benchmark\_001 \-\> review\_001  
review\_001 \-\> decision\_001  
---

# **19\. PIPELINE TIME LIMITS**

studio\_director: 100ms  
request\_classifier: 200ms  
context\_gatherer: 500ms  
memory\_retrieval: 300ms  
scene\_builder: 800ms  
narrative\_builder: 1000ms  
canon\_validator: 400ms  
production\_packager: 600ms  
asset\_generation: external  
benchmark\_auditor: 800ms  
asset\_review: 600ms  
decision\_formatter: 200ms  
---

# **20\. OBSERVABILITY**

Runtime phải log:

execution\_trace  
node\_latency  
validation\_failures  
drift\_patterns  
asset\_success\_rate  
review\_statistics  
---

# **21\. PIPELINE VISUAL GRAPH**

REQUEST  
  │  
Studio Director  
  │  
Request Classifier  
  │  
Context Gatherer  
  │  
Memory Retrieval  
  │  
Scene Builder  
  │  
Narrative Builder  
  │  
Canon Validator  
  │  
Production Packager  
  │  
Asset Generation  
  │  
Benchmark Auditor  
  │  
Asset Review  
  │  
Decision Formatter  
  │  
Memory Writeback  
---

# **22\. GUARANTEES OF THIS RUNTIME**

Runtime này đảm bảo:

1. Không asset nào vượt canon.

2. Không prompt nào bỏ qua validation.

3. Character identity không bị phá.

4. Asset phải qua benchmark trước khi publish.

5. Mọi quyết định đều có lineage.

6. Memory không bị ghi rác.

---

# **23\. MASTER SUMMARY**

Runtime orchestration rules này đã khóa:

* pipeline execution graph

* node contracts

* guard conditions

* retry policy

* failure policy

* lineage graph update

* memory retrieval/writeback

* benchmark gating

* decision formatting

* observability

Sau bước này, Mikage Studio OS đã có:

1. Sample Output Pack

2. Database \+ Memory Contract Pack

3. Runtime Orchestration Rules

