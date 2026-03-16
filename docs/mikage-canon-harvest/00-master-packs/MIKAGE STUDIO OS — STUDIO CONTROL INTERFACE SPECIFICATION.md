Human Control Layer Master Specification (Production-Grade)

---

# **1\. PURPOSE OF THE CONTROL LAYER**

Studio Control Interface (SCI) là lớp **human governance layer** của Mikage Studio OS.

Nhiệm vụ:

* quan sát toàn bộ pipeline

* kiểm soát execution của agent system

* kiểm tra canon integrity

* review benchmark quality

* duyệt asset production

* kiểm soát state của universe

* audit toàn bộ lineage

SCI **không tạo nội dung**.

SCI chỉ:

* trigger pipeline

* inspect state

* approve / reject

* override trong phạm vi governance rules

---

# **2\. CONTROL LAYER ARCHITECTURE**

Control Layer kết nối trực tiếp với 5 runtime surfaces:

Operator Interface  
       ↓  
Control Gateway  
       ↓  
Orchestration Engine  
       ↓  
Runtime Pipeline  
       ↓  
Persistence Layer

### **Control Gateway responsibilities**

* authenticate operator

* authorize actions

* transform UI action → runtime command

* attach lineage metadata

* enforce governance guards

---

# **3\. TOP LEVEL DASHBOARD ARCHITECTURE**

Dashboard gồm 5 vùng chính:

GLOBAL STATUS BAR  
↓  
OPERATIONAL DASHBOARD  
↓  
PIPELINE MONITOR  
↓  
SYSTEM HEALTH  
↓  
ALERT STREAM  
---

## **3.1 Global Status Bar**

Hiển thị:

* system status

* pipeline load

* queue size

* canon integrity

* benchmark pass rate

* asset approval rate

Indicators:

System Status: RUNNING / DEGRADED / HALTED  
Pipeline Load: %  
Queue Depth  
Canon Violations (last 24h)  
Benchmark Fail Rate  
---

# **4\. PAGE MAP (PRIMARY NAVIGATION)**

Dashboard  
Requests  
Pipeline Monitor  
Node Inspector  
Canon Control  
Benchmark Review  
Memory Browser  
Lineage Graph  
Character State  
World Bible  
Asset Approval  
Audit Logs  
System Governance  
---

# **5\. DASHBOARD PAGE**

## **Panels**

### **Active Requests**

request\_id  
request\_type  
status  
queue\_position  
time\_elapsed

Actions:

* open request

* cancel request

* reprioritize

---

### **Pipeline Health**

node\_success\_rate  
node\_latency  
retry\_rate  
fail\_rate  
---

### **Canon Integrity**

violations\_today  
open\_violations  
auto\_resolved  
manual\_review\_required  
---

### **Asset Production**

assets\_generated  
assets\_pending\_review  
assets\_approved  
assets\_rejected  
---

### **Benchmark Metrics**

gold\_similarity\_avg  
silver\_similarity\_avg  
red\_flag\_rate  
drift\_score\_avg  
---

# **6\. REQUEST QUEUE VIEW**

Displays pending requests.

Columns:

request\_id  
operator  
request\_type  
priority  
creation\_time  
pipeline\_state  
estimated\_completion

Actions:

open  
pause  
cancel  
prioritize  
reroute

Guard:

request cannot execute if:

context\_packet\_missing  
canon\_unvalidated  
runtime\_locked  
---

# **7\. PIPELINE STATUS MONITOR**

Visual directed execution graph.

Request  
↓  
Context Gatherer  
↓  
Narrative Builder  
↓  
Canon Validator  
↓  
Production Packager  
↓  
Benchmark Auditor  
↓  
Decision Formatter

Each node shows:

state  
execution\_time  
retry\_count  
output\_hash  
lineage\_id

Node states:

PENDING  
RUNNING  
PASSED  
FAILED  
RETRYING  
BLOCKED  
---

# **8\. NODE EXECUTION INSPECTOR**

Node detail panel.

Displays:

node\_input\_packet  
node\_output\_packet  
validation\_reports  
runtime\_logs

Actions:

rerun node  
force retry  
mark resolved  
attach manual annotation

Guard:

node rerun allowed only if:

state \!= locked  
dependency nodes valid  
---

# **9\. CANON VIOLATION PANEL**

Displays violations detected by Canon Validator.

Columns:

violation\_id  
entity  
violation\_type  
severity  
timestamp  
pipeline\_source

Types:

ontology violation  
character truth violation  
tech realism violation  
visual grammar drift  
lore contradiction

Actions:

accept correction  
reject asset  
send to narrative revision  
flag systemic issue  
---

# **10\. BENCHMARK REVIEW PANEL**

Displays asset similarity metrics.

Metrics:

gold\_similarity  
silver\_similarity  
red\_similarity  
drift\_score  
novelty\_score

Decision options:

approve  
reject  
manual\_override  
retest

Guard:

override requires:

senior\_role  
override\_reason  
audit\_record  
---

# **11\. MEMORY BROWSER**

Access to Persistent Memory Layer.

Views:

entity records  
event history  
asset lineage  
state transitions  
memory embeddings

Functions:

search memory  
inspect record  
trace lineage  
diff state

Write operations restricted.

---

# **12\. LINEAGE GRAPH VIEWER**

Visual graph of asset lineage.

Nodes:

request  
narrative  
scene  
production package  
asset  
benchmark record

Edges:

generated\_from  
validated\_by  
benchmarked\_by  
approved\_by

Capabilities:

trace origin  
identify branch divergence  
detect drift lineage  
---

# **13\. CHARACTER STATE CONTROL PANEL**

Displays:

character\_id  
current\_state  
health\_state  
injury\_model  
loyalty\_model  
knowledge\_state  
timeline\_position

Actions:

propose state update  
review transition  
approve state change  
rollback illegal state

Guard:

state change requires:

narrative justification  
tracker validation  
timeline sync  
---

# **14\. WORLD / CANON ADMIN PANEL**

Controls canonical database.

Sections:

ontology registry  
technology registry  
faction registry  
location registry  
artifact registry

Admin operations:

add record  
modify record  
lock record  
archive record

Canon edits require:

admin role  
impact analysis  
version snapshot  
---

# **15\. ASSET APPROVAL COCKPIT**

Final production gate.

Displays asset:

preview  
metadata  
prompt lineage  
benchmark report  
canon validation

Decision:

approve  
reject  
send revision  
archive

Approval triggers:

asset\_publish  
memory\_writeback  
lineage\_update  
---

# **16\. AUDIT LOG VIEW**

Complete operator log.

Fields:

action\_id  
operator  
action\_type  
timestamp  
affected\_entity  
reason

Immutable.

---

# **17\. ROLE / PERMISSION MODEL**

Roles:

Observer  
Operator  
Senior Operator  
Canon Admin  
System Admin  
---

### **Observer**

read-only

---

### **Operator**

submit request  
inspect pipeline  
review assets  
---

### **Senior Operator**

override benchmark  
approve asset  
resolve canon issues  
---

### **Canon Admin**

modify canon  
edit world bible  
manage ontology  
---

### **System Admin**

pipeline control  
system halt  
governance rules  
user management  
---

# **18\. UI STATE MODEL**

Core UI states:

idle  
loading  
processing  
warning  
error  
locked

Each panel must expose:

state  
error\_reason  
last\_update  
operator\_action  
---

# **19\. OPERATOR WORKFLOWS**

### **Workflow: Asset Generation**

submit request  
↓  
request queued  
↓  
pipeline executes  
↓  
monitor pipeline  
↓  
benchmark review  
↓  
asset approval  
---

### **Workflow: Canon Violation**

violation detected  
↓  
review panel  
↓  
decide resolution  
↓  
apply correction  
---

### **Workflow: Character State Update**

narrative proposes change  
↓  
tracker validation  
↓  
operator approval  
↓  
state writeback  
---

# **20\. ERROR STATES**

Possible failures:

node crash  
benchmark timeout  
canon conflict  
memory write failure  
pipeline deadlock

Each error must include:

error\_code  
error\_message  
runtime\_trace  
suggested\_action  
---

# **21\. CONTROL SAFEGUARDS**

Critical protections.

### **No Canon Bypass**

Asset approval impossible if:

canon validation failed  
---

### **Benchmark Gate**

Asset cannot publish if:

benchmark audit incomplete  
---

### **State Integrity**

Character state change blocked if:

timeline conflict  
---

### **Memory Protection**

Writeback only if:

approved\_asset  
valid\_lineage  
---

# **22\. UI → RUNTIME ACTION CONTRACTS**

Example:

### **Submit Request**

UI action:

submit\_request

Runtime command:

create\_request\_packet  
enqueue\_request  
attach\_lineage\_root  
---

### **Approve Asset**

UI action:

approve\_asset

Runtime:

publish\_asset  
write\_memory\_record  
update\_lineage\_graph  
emit\_audit\_log  
---

### **Override Benchmark**

UI action:

override\_benchmark

Runtime:

record\_override  
require\_reason  
update\_audit\_log  
---

# **23\. REQUIRED SAFETY LOGIC**

Operator action must always include:

operator\_id  
timestamp  
action\_reason  
affected\_entity  
lineage\_reference  
---

# **24\. MINIMUM FRONTEND COMPONENT STRUCTURE**

/studio-control-interface

dashboard  
request-queue  
pipeline-monitor  
node-inspector  
canon-panel  
benchmark-panel  
memory-browser  
lineage-viewer  
character-panel  
world-admin  
asset-cockpit  
audit-log

Each module:

page  
panels  
api client  
state model  
action handlers  
---

# **25\. FINAL RESULT**

Sau khi lớp này hoàn thành, Mikage Studio OS sẽ có đủ:

canon foundation  
runtime pipeline  
agent orchestration  
database \+ memory layer  
benchmark system  
human control layer

→ hệ thống có thể vận hành như **AI-native IP studio pipeline**.

