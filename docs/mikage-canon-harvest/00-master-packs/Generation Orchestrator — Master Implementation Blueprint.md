Mục tiêu: tạo **runtime coordinator** điều phối toàn bộ pipeline đã có, biến các module rời rạc thành **job lifecycle thực thi**.

---

# **1\. System Role**

Orchestrator chịu trách nhiệm:

* nhận generation request

* chạy pipeline theo thứ tự chuẩn

* quản lý trạng thái job

* ghi execution evidence

* route asset tới review / archive

Pipeline chuẩn:

compile  
→ validate  
→ generate  
→ ingest  
→ embed  
→ drift\_detect  
→ benchmark  
→ review\_route  
→ archive  
→ report  
---

# **2\. Job Model**

Mỗi generation request được chuẩn hóa thành **job object**.

Example schema:

{  
 "job\_id": "job\_20260314\_0001",  
 "job\_type": "cinematic\_frame",  
 "preset": "mikage\_cinematic\_portrait",  
 "variant": "storm\_rooftop\_action",  
 "character": "mikage",  
 "location": "megacity\_rooftop",  
 "era": "late\_entropy\_industrial\_age",  
 "reference\_style": "mikage\_core\_visual\_DNA",  
 "state": "PENDING",  
 "created\_at": "timestamp"  
}  
---

# **3\. Job State Machine**

Job lifecycle phải được quản lý rõ ràng.

States:

PENDING  
COMPILING  
VALIDATING  
GENERATING  
INGESTING  
EMBEDDING  
DRIFT\_CHECK  
BENCHMARKING  
REVIEW\_ROUTING  
ARCHIVED  
COMPLETED  
FAILED  
BLOCKED

State transitions:

PENDING → COMPILING  
COMPILING → VALIDATING  
VALIDATING → GENERATING  
GENERATING → INGESTING  
INGESTING → EMBEDDING  
EMBEDDING → DRIFT\_CHECK  
DRIFT\_CHECK → BENCHMARKING  
BENCHMARKING → REVIEW\_ROUTING  
REVIEW\_ROUTING → ARCHIVED  
ARCHIVED → COMPLETED

Failure states:

VALIDATION\_FAIL → BLOCKED  
GENERATION\_ERROR → FAILED  
DRIFT\_CRITICAL → ESCALATE  
---

# **4\. Execution Evidence Log**

Mỗi bước ghi log runtime.

Log schema:

{  
 "job\_id": "job\_20260314\_0001",  
 "step": "compile",  
 "started\_at": "timestamp",  
 "finished\_at": "timestamp",  
 "runtime\_ms": 234,  
 "status": "SUCCESS"  
}

Artifacts cũng phải lưu:

compiled\_prompt  
negative\_prompt  
generator\_metadata  
embedding\_vector\_id  
benchmark\_scores  
archive\_path  
---

# **5\. Orchestrator Service Layout**

Suggested directory structure:

mikage\_orchestrator/

orchestrator.py  
job\_manager.py  
state\_machine.py  
pipeline\_runner.py

steps/  
   step\_compile.py  
   step\_validate.py  
   step\_generate.py  
   step\_ingest.py  
   step\_embed.py  
   step\_drift.py  
   step\_benchmark.py  
   step\_review\_route.py  
   step\_archive.py

adapters/  
   generator\_adapter.py  
   embedding\_adapter.py  
   drift\_detector.py  
   benchmark\_engine.py

logs/  
   execution\_logs/

jobs/  
   job\_registry.json  
---

# **6\. Pipeline Runner (Core Logic)**

Example simplified logic:

def run\_job(job):

   compile\_result \= compile\_prompt(job)

   validation \= validate\_canon(compile\_result)

   if validation.status \== "BLOCK":  
       return block\_job(job)

   image \= generate\_asset(compile\_result)

   ingest\_record \= ingest\_asset(image)

   embedding \= compute\_embedding(image)

   drift \= detect\_drift(embedding)

   benchmark \= benchmark\_compare(embedding)

   review\_status \= route\_review(drift, benchmark)

   archive\_path \= archive\_asset(image)

   return build\_report(  
       job,  
       compile\_result,  
       validation,  
       drift,  
       benchmark,  
       review\_status,  
       archive\_path  
   )  
---

# **7\. Generator Adapter**

Orchestrator không phụ thuộc generator cụ thể.

Adapter layer:

generate\_asset()

supports:

SDXL  
Flux  
DALL·E  
Midjourney (API bridge)  
future video models

Output:

asset\_file  
generator\_metadata  
seed  
resolution  
model\_version  
---

# **8\. Drift Detector Hook**

Input:

embedding vector  
image metadata  
palette check  
style classifier

Output:

drift\_score  
drift\_flags  
PASS / REVIEW / ESCALATE / BLOCK  
---

# **9\. Benchmark Engine Hook**

Comparison sources:

gold\_set  
silver\_set  
red\_flag\_set

Metrics:

cosine\_similarity  
style\_distance  
palette\_distance  
composition\_score

Output:

gold\_alignment  
silver\_alignment  
red\_flag\_proximity  
duplicate\_risk  
benchmark\_fit  
---

# **10\. Review Routing Logic**

Decision rules example:

if drift \== BLOCK:  
   status \= BLOCK

elif gold\_alignment \> 0.85 and drift\_score \< 0.1:  
   status \= AUTO\_APPROVE

elif duplicate\_risk \> 0.92:  
   status \= REVIEW

else:  
   status \= REVIEW  
---

# **11\. Archive Layer**

Asset saved with lineage.

Example:

archive/generated/asset\_000481.png  
archive/embeddings/asset\_000481.vec  
archive/reports/asset\_000481.json  
archive/logs/job\_20260314\_0001.log  
---

# **12\. Final Report Output**

Orchestrator phải trả gói đầy đủ.

Example:

{  
 "job\_id": "job\_20260314\_0001",  
 "status": "COMPLETED",  
 "canon\_validation": "PASS",  
 "drift\_detection": "PASS",  
 "benchmark\_fit": "STRONG",  
 "review\_status": "AUTO\_APPROVE",  
 "archive\_path": "archive/generated/asset\_000481.png"  
}  
---

# **13\. Minimum Viable Runtime**

Để Mikage **bật sống**, orchestrator cần:

job intake  
pipeline runner  
state machine  
execution logging  
generator adapter  
archive writer

Các phần nâng cao (embedding, drift, benchmark) có thể thêm sau.

---

# **14\. Expected System State After Implementation**

Khi orchestrator chạy thật:

generation request  
→ automated pipeline  
→ asset ingestion  
→ evidence logs  
→ review routing  
→ archive

Mikage chuyển trạng thái thành:

runtime-capable canon-governed IP engine

Sau khi thêm:

review queue UI  
dataset feedback loop

hệ đạt:

self-improving IP operating system  
