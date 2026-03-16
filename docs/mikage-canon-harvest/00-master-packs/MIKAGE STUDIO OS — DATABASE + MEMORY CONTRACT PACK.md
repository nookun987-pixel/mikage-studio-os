Đây là **bản master hoàn chỉnh duy nhất** cho bước kế tiếp: nối toàn bộ Studio OS từ mức prompt/pipeline sang **lớp dữ liệu vận hành thật**.

Mục tiêu của pack này:

* biến toàn bộ logic của Mikage Studio OS thành hệ có thể lưu, đọc, truy vết, audit

* khóa canon bằng contract thay vì chỉ bằng prompt

* cho phép memory bền vững giữa các lần chạy

* giữ lineage đầy đủ từ request → context → validation → package → benchmark → final decision

* chuẩn bị nền cho runtime orchestration và studio control interface

---

# **1\. CORE DESIGN PRINCIPLE**

Database của Mikage Studio OS **không phải kho lưu file đơn thuần**.

Nó là:

**canon-governed operational memory system**

Nó phải lưu được 5 loại sự thật:

1. **canon truth**  
    luật bất biến của universe

2. **entity truth**  
    world, character, faction, location, artifact, technology

3. **state truth**  
    trạng thái hiện tại của nhân vật / thế giới / scene timeline

4. **generation truth**  
    request nào sinh ra output nào, qua pipeline nào, dùng context nào

5. **decision truth**  
    tại sao asset được approve / reject / revise

---

# **2\. DATABASE LAYERS**

## **2.1 Canon Layer**

Lưu hiến pháp canon và visual grammar.

## **2.2 World Layer**

Lưu world bible, entities, locations, factions, technologies, event history.

## **2.3 Character State Layer**

Lưu state hiện tại và state transition của nhân vật.

## **2.4 Production Layer**

Lưu request, packets, prompts, outputs, benchmark result, review result.

## **2.5 Memory Layer**

Lưu memory bền vững cho inference ở lần chạy sau.

## **2.6 Governance Layer**

Lưu audit trail, violation log, approval trace.

---

# **3\. MASTER ENTITY MAP**

Đây là bản entity map lõi.

canon\_constitutions  
canon\_rules  
visual\_grammars  
world\_entities  
world\_relations  
locations  
factions  
technologies  
events  
characters  
character\_states  
character\_state\_transitions  
scene\_packets  
narrative\_packets  
requests  
context\_packets  
validation\_reports  
production\_packages  
generated\_assets  
benchmark\_reports  
review\_reports  
decision\_records  
memory\_records  
lineage\_edges  
violation\_logs  
operator\_actions  
---

# **4\. CONTRACT PHILOSOPHY**

Mọi object đi qua hệ phải có contract rõ ràng:

* có `id`

* có `type`

* có `version`

* có `source`

* có `created_at`

* có `canon_scope`

* có `lineage_ref`

* có `validation_status`

Không object nào được coi là production-valid nếu thiếu contract metadata.

---

# **5\. GLOBAL BASE CONTRACT**

Đây là contract gốc cho gần như mọi record.

{  
 "id": "string",  
 "type": "string",  
 "version": "string",  
 "status": "active",  
 "source": {  
   "system": "mikage\_studio\_os",  
   "module": "string",  
   "origin\_request\_id": "string"  
 },  
 "canon\_scope": {  
   "project\_id": "mikage\_studio\_os",  
   "universe\_id": "mikage\_prime",  
   "canon\_version": "v1.0"  
 },  
 "lineage\_ref": {  
   "parent\_ids": \[\],  
   "upstream\_packet\_ids": \[\],  
   "trace\_id": "string"  
 },  
 "timestamps": {  
   "created\_at": "ISO\_DATETIME",  
   "updated\_at": "ISO\_DATETIME"  
 },  
 "validation\_status": {  
   "canon\_validated": false,  
   "schema\_validated": false,  
   "benchmark\_validated": false  
 }  
}  
---

# **6\. TABLE / COLLECTION CONTRACTS**

## **6.1 canon\_constitutions**

Lưu hiến pháp canon cao nhất.

{  
 "id": "canon\_constitution\_v1",  
 "type": "canon\_constitution",  
 "version": "v1.0",  
 "title": "Mikage Prime Constitution",  
 "ontology": {  
   "genre": "hard\_sci\_fi",  
   "physics\_mode": "physical\_causality",  
   "energy\_rule": "no\_free\_power",  
   "damage\_rule": "power\_leaves\_trace"  
 },  
 "absolute\_invariants": \[  
   "no\_free\_power",  
   "power\_leaves\_trace",  
   "no\_magic\_disguised\_as\_technology",  
   "beauty\_must\_carry\_damage",  
   "violence\_has\_consequence"  
 \],  
 "philosophical\_axes": \[  
   "memory\_vs\_identity",  
   "body\_vs\_self",  
   "order\_vs\_freedom",  
   "beauty\_vs\_cruelty",  
   "love\_vs\_possession",  
   "sacrifice\_vs\_self\_destruction"  
 \],  
 "drift\_forbidden": \[  
   "fantasy",  
   "anime\_exaggeration",  
   "neon\_cyberpunk\_excess",  
   "supernatural\_aura"  
 \]  
}  
---

## **6.2 canon\_rules**

Lưu rule chi tiết để query/audit.

{  
 "id": "rule\_crimson\_glow\_limit\_001",  
 "type": "canon\_rule",  
 "version": "v1.0",  
 "rule\_domain": "character\_visual\_power\_logic",  
 "target\_entity": "Mikage",  
 "rule\_key": "crimson\_glow\_limit",  
 "rule\_text": "Crimson emission is allowed only as restrained internal damage leakage through cracks, conduits, or reactor stress points.",  
 "severity": "critical",  
 "violation\_effect": "reject\_or\_rewrite",  
 "examples\_allowed": \[  
   "faint leakage through ceramic fractures",  
   "localized conduit stress glow"  
 \],  
 "examples\_forbidden": \[  
   "full body aura",  
   "halo field",  
   "explosive magical red energy"  
 \]  
}  
---

## **6.3 visual\_grammars**

Lưu visual DNA có thể dùng làm retrieval/reference.

{  
 "id": "visual\_grammar\_mikage\_core\_001",  
 "type": "visual\_grammar",  
 "version": "v1.0",  
 "subject": "Mikage",  
 "palette": \[  
   "porcelain\_white",  
   "carbon\_black",  
   "dark\_titanium",  
   "restrained\_crimson",  
   "storm\_grey"  
 \],  
 "materials": \[  
   "fractured\_white\_ceramic",  
   "matte\_black\_carbon\_structure",  
   "dark\_titanium\_joints",  
   "wet\_brutalist\_concrete"  
 \],  
 "composition\_rules": \[  
   "monumental\_scale",  
   "extreme\_chiaroscuro",  
   "hard\_sci\_fi\_discipline",  
   "no\_anime\_framing"  
 \],  
 "forbidden\_visuals": \[  
   "cute\_face\_softening",  
   "neon\_city\_spectacle",  
   "fantasy\_particle\_fields",  
   "decorative\_magic\_symbolism"  
 \]  
}  
---

## **6.4 world\_entities**

Bảng cha cho entity tổng quát.

{  
 "id": "entity\_char\_mikage\_001",  
 "type": "world\_entity",  
 "entity\_class": "character",  
 "canonical\_name": "Mikage",  
 "slug": "mikage",  
 "summary": "Sovereign damaged combat figure within the Mikage Prime hard sci-fi universe.",  
 "tags": \[  
   "character",  
   "primary\_protagonist",  
   "combat",  
   "sacred\_fracture\_aesthetic"  
 \],  
 "status": "active"  
}  
---

## **6.5 characters**

Bảng chuyên biệt cho character.

{  
 "id": "char\_mikage\_001",  
 "type": "character",  
 "entity\_ref": "entity\_char\_mikage\_001",  
 "name": "Mikage",  
 "role": "primary\_character",  
 "signature\_traits": {  
   "mask": "seamless\_white\_kitsune\_mask",  
   "armor": "fractured\_white\_ceramic\_over\_black\_structure",  
   "hair": "long\_black",  
   "internal\_light\_policy": "restrained\_crimson\_damage\_only",  
   "silhouette": "tall\_slender\_combat\_feminine"  
 },  
 "identity\_lock": {  
   "must\_preserve": \[  
     "mask\_integrity",  
     "ceramic\_black\_material\_language",  
     "restraint\_over\_spectacle"  
   \],  
   "forbidden": \[  
     "anime\_exaggeration",  
     "fantasy\_transformation",  
     "unexplained\_power\_bloom"  
   \]  
 }  
}  
---

## **6.6 character\_states**

State sống hiện tại của nhân vật.

{  
 "id": "char\_state\_mikage\_001\_current",  
 "type": "character\_state",  
 "character\_id": "char\_mikage\_001",  
 "state\_version": 12,  
 "timeline\_position": "post\_event\_iron\_rooftop\_003",  
 "physical\_state": {  
   "armor\_integrity": 0.67,  
   "injury\_level": 0.42,  
   "mobility": 0.81,  
   "reactor\_stress": 0.58  
 },  
 "psychological\_state": {  
   "composure": 0.92,  
   "rage\_suppression": 0.71,  
   "trust\_index": 0.24,  
   "self\_preservation": 0.39  
 },  
 "knowledge\_state": {  
   "known\_factions": \[  
     "faction\_ashen\_court",  
     "faction\_iron\_chorus"  
   \],  
   "unknown\_truths": \[  
     "origin\_of\_black\_archive\_signal"  
   \]  
 },  
 "canon\_locked\_fields": \[  
   "signature\_mask",  
   "material\_language",  
   "core\_identity\_axis"  
 \]  
}  
---

## **6.7 character\_state\_transitions**

Bảng log thay đổi state.

{  
 "id": "char\_transition\_001938",  
 "type": "character\_state\_transition",  
 "character\_id": "char\_mikage\_001",  
 "from\_state\_id": "char\_state\_mikage\_001\_v11",  
 "to\_state\_id": "char\_state\_mikage\_001\_current",  
 "trigger\_event\_id": "event\_iron\_rooftop\_003",  
 "transition\_reason": "combat\_damage\_and\_revelation",  
 "changes": {  
   "armor\_integrity": {  
     "from": 0.79,  
     "to": 0.67  
   },  
   "reactor\_stress": {  
     "from": 0.33,  
     "to": 0.58  
   },  
   "trust\_index": {  
     "from": 0.29,  
     "to": 0.24  
   }  
 },  
 "approved\_by\_governance": true  
}  
---

## **6.8 requests**

Đơn gốc từ user/operator.

{  
 "id": "req\_master\_001",  
 "type": "request",  
 "request\_class": "asset\_generation",  
 "request\_subclass": "cinematic\_keyframe",  
 "user\_input\_raw": "Tạo cinematic keyframe Mikage rooftop storm, hard sci-fi, không fantasy, không anime drift.",  
 "normalized\_intent": {  
   "subject": "Mikage",  
   "scene": "storm\_rooftop\_night",  
   "output": "production\_asset\_package",  
   "constraints": \[  
     "hard\_sci\_fi",  
     "no\_fantasy",  
     "no\_anime\_drift"  
   \]  
 },  
 "routing\_status": "classified"  
}  
---

## **6.9 context\_packets**

Packet context tổng hợp cho runtime.

{  
 "id": "ctx\_req\_master\_001",  
 "type": "context\_packet",  
 "request\_id": "req\_master\_001",  
 "context\_sources": {  
   "canon\_constitution\_id": "canon\_constitution\_v1",  
   "visual\_grammar\_id": "visual\_grammar\_mikage\_core\_001",  
   "character\_id": "char\_mikage\_001",  
   "character\_state\_id": "char\_state\_mikage\_001\_current"  
 },  
 "scene\_seed": {  
   "location": "brutalist\_megacity\_rooftop",  
   "weather": "violent\_storm",  
   "time": "night"  
 },  
 "context\_completeness": "sufficient",  
 "blocking\_flags": \[\]  
}  
---

## **6.10 scene\_packets**

{  
 "id": "scene\_packet\_001",  
 "type": "scene\_packet",  
 "request\_id": "req\_master\_001",  
 "core\_beat": "Mikage stands at the edge of a storm-lashed rooftop before confrontation.",  
 "environment": {  
   "location\_type": "brutalist\_megacity\_rooftop",  
   "surface\_state": "wet\_concrete\_drainage\_rails\_antenna\_housings",  
   "atmosphere": "rain\_mist\_crosswind\_industrial\_haze"  
 },  
 "camera": {  
   "framing": "low\_angle\_wide\_anamorphic",  
   "contrast": "extreme\_chiaroscuro",  
   "scale": "monumental"  
 },  
 "canon\_risk\_flags": \[\]  
}  
---

## **6.11 narrative\_packets**

{  
 "id": "narrative\_packet\_001",  
 "type": "narrative\_packet",  
 "request\_id": "req\_master\_001",  
 "scene\_packet\_id": "scene\_packet\_001",  
 "dramatic\_purpose": "pre\_battle\_sovereign\_reveal",  
 "emotion\_stack": \[  
   "restraint",  
   "authority",  
   "damage",  
   "fatal\_beauty"  
 \],  
 "narrative\_rules": \[  
   "show\_cost\_not\_magic",  
   "preserve\_mystique",  
   "avoid\_exposition\_dump"  
 \],  
 "dialogue\_required": false  
}  
---

## **6.12 validation\_reports**

{  
 "id": "validation\_req\_master\_001",  
 "type": "validation\_report",  
 "request\_id": "req\_master\_001",  
 "pass": true,  
 "checks": {  
   "schema\_check": "pass",  
   "ontology\_check": "pass",  
   "power\_logic\_check": "pass",  
   "visual\_grammar\_check": "pass",  
   "character\_integrity\_check": "pass"  
 },  
 "warnings": \[  
   "keep\_crimson\_below\_dominant\_light\_threshold"  
 \],  
 "violations": \[\]  
}  
---

## **6.13 production\_packages**

{  
 "id": "prod\_pack\_001",  
 "type": "production\_package",  
 "request\_id": "req\_master\_001",  
 "context\_packet\_id": "ctx\_req\_master\_001",  
 "narrative\_packet\_id": "narrative\_packet\_001",  
 "validation\_report\_id": "validation\_req\_master\_001",  
 "asset\_type": "cinematic\_keyframe",  
 "compiled\_prompt": "A monumental hard sci-fi cinematic frame depicting Mikage standing at the edge of a brutalist megacity rooftop during a violent storm at night...",  
 "negative\_prompt": "anime, fantasy aura, neon cyberpunk overload, magical particles, glowing halo...",  
 "render\_spec": {  
   "camera": "low\_angle\_wide\_anamorphic",  
   "lighting": "storm\_darkness\_with\_restrained\_crimson\_internal\_leakage\_only",  
   "material\_priority": \[  
     "white\_ceramic",  
     "matte\_black\_carbon",  
     "dark\_titanium",  
     "wet\_concrete"  
   \]  
 },  
 "ready\_for\_generation": true  
}  
---

## **6.14 generated\_assets**

{  
 "id": "asset\_img\_001",  
 "type": "generated\_asset",  
 "request\_id": "req\_master\_001",  
 "production\_package\_id": "prod\_pack\_001",  
 "asset\_modality": "image",  
 "asset\_role": "cinematic\_keyframe",  
 "storage": {  
   "uri": "s3://mikage/assets/asset\_img\_001.png",  
   "thumbnail\_uri": "s3://mikage/assets/thumb\_asset\_img\_001.png"  
 },  
 "generation\_engine": {  
   "provider": "model\_provider\_name",  
   "model": "model\_name",  
   "generation\_params": {  
     "steps": 30,  
     "aspect\_ratio": "16:9"  
   }  
 },  
 "asset\_status": "generated"  
}  
---

## **6.15 benchmark\_reports**

{  
 "id": "benchmark\_asset\_img\_001",  
 "type": "benchmark\_report",  
 "asset\_id": "asset\_img\_001",  
 "benchmark\_sets": \[  
   "gold\_visual\_dna\_mikage",  
   "silver\_rooftop\_storm\_set",  
   "red\_drift\_examples"  
 \],  
 "similarity\_scores": {  
   "gold\_visual\_dna\_mikage": 0.91,  
   "silver\_rooftop\_storm\_set": 0.88  
 },  
 "risk\_scores": {  
   "canon\_drift": 0.14,  
   "visual\_drift": 0.19,  
   "style\_instability": 0.12  
 },  
 "benchmark\_pass": true  
}  
---

## **6.16 review\_reports**

{  
 "id": "review\_asset\_img\_001",  
 "type": "review\_report",  
 "asset\_id": "asset\_img\_001",  
 "benchmark\_report\_id": "benchmark\_asset\_img\_001",  
 "review\_status": "conditional\_approve",  
 "issues": \[  
   "city\_saturation\_slightly\_high"  
 \],  
 "revision\_directives": \[  
   "desaturate\_background\_15\_percent",  
   "preserve\_current\_mask\_and\_armor\_silhouette"  
 \],  
 "final\_operator\_note": "Strong asset, minor environmental correction only."  
}  
---

## **6.17 decision\_records**

{  
 "id": "decision\_req\_master\_001",  
 "type": "decision\_record",  
 "request\_id": "req\_master\_001",  
 "asset\_id": "asset\_img\_001",  
 "approval": "approved\_with\_minor\_revision",  
 "governance\_trace": {  
   "context\_present": true,  
   "narrative\_built": true,  
   "canon\_validated": true,  
   "benchmark\_audited": true  
 },  
 "decision\_reason": "Asset preserves core character identity and remains within hard sci-fi canon bounds.",  
 "next\_action": "revise\_then\_publish"  
}  
---

## **6.18 memory\_records**

Đây là lõi của persistent memory.

{  
 "id": "memory\_mikage\_visual\_rule\_001",  
 "type": "memory\_record",  
 "memory\_domain": "visual\_identity",  
 "subject\_ref": "char\_mikage\_001",  
 "memory\_key": "mikage\_crimson\_usage\_policy",  
 "memory\_value": {  
   "rule": "restrained\_internal\_damage\_only",  
   "operator\_summary": "Never allow crimson to become aura or dominant spectacle."  
 },  
 "retrieval\_priority": "high",  
 "stability": "long\_term",  
 "overwrite\_policy": "governance\_only",  
 "activated\_by": \[  
   "scene\_builder",  
   "production\_packager",  
   "canon\_validator",  
   "asset\_review"  
 \]  
}  
---

## **6.19 lineage\_edges**

Bảng graph để truy vết.

{  
 "id": "edge\_001",  
 "type": "lineage\_edge",  
 "from\_id": "req\_master\_001",  
 "to\_id": "ctx\_req\_master\_001",  
 "edge\_type": "produced\_context",  
 "trace\_id": "trace\_req\_master\_001"  
}

Ví dụ lineage chain:

req\_master\_001 \-\> ctx\_req\_master\_001  
ctx\_req\_master\_001 \-\> scene\_packet\_001  
scene\_packet\_001 \-\> narrative\_packet\_001  
narrative\_packet\_001 \-\> validation\_req\_master\_001  
validation\_req\_master\_001 \-\> prod\_pack\_001  
prod\_pack\_001 \-\> asset\_img\_001  
asset\_img\_001 \-\> benchmark\_asset\_img\_001  
benchmark\_asset\_img\_001 \-\> review\_asset\_img\_001  
review\_asset\_img\_001 \-\> decision\_req\_master\_001  
---

## **6.20 violation\_logs**

{  
 "id": "violation\_001",  
 "type": "violation\_log",  
 "request\_id": "req\_bad\_001",  
 "domain": "ontology",  
 "severity": "critical",  
 "issue\_key": "fantasy\_aura\_detected",  
 "issue\_text": "Prompt introduced magical red aura around Mikage.",  
 "detected\_by": "canon\_validator",  
 "enforcement\_action": "reject\_and\_rewrite"  
}  
---

# **7\. MEMORY SYSTEM DESIGN**

## **7.1 Memory classes**

long\_term\_canon\_memory:  
 use: immutable canon retrieval  
 overwrite: governance\_only

long\_term\_entity\_memory:  
 use: stable character/world facts  
 overwrite: controlled\_update

state\_memory:  
 use: latest dynamic state of entity  
 overwrite: append\_new\_version

production\_memory:  
 use: past prompts, outputs, benchmark patterns  
 overwrite: append\_only

review\_memory:  
 use: recurring failure patterns, drift patterns  
 overwrite: append\_only  
---

## **7.2 Retrieval priority order**

Khi runtime cần context, memory phải được kéo theo thứ tự:

1. canon constitution

2. critical canon rules

3. visual grammar

4. character identity lock

5. latest character state

6. scene-relevant event memory

7. recent production memory

8. review/drift memory

---

## **7.3 Memory injection policy**

Memory **không được đổ toàn bộ** vào prompt/runtime.

Chỉ inject:

* memory có `retrieval_priority = high`

* memory liên quan trực tiếp request class

* memory có `stability = long_term` hoặc state mới nhất

* memory không mâu thuẫn state timeline hiện tại

---

# **8\. DATABASE GOVERNANCE RULES**

## **8.1 Write rules**

* không tạo `production_package` nếu chưa có `context_packet`

* không set `ready_for_generation = true` nếu `validation_report.pass != true`

* không approve asset nếu chưa có `benchmark_report`

* không update `character_state` trực tiếp; phải tạo state version mới

* không overwrite canon rules bằng runtime output

## **8.2 Read rules**

* node narrative chỉ đọc canonical context \+ relevant state

* node production chỉ đọc packet đã validated

* node review chỉ đọc generated asset \+ benchmark \+ canon thresholds

* UI control panel chỉ hiển thị object có governance trace đầy đủ

## **8.3 Delete rules**

* canon và decision record: không xóa mềm tùy tiện

* generated asset: có thể archive

* state transition: append-only

* violation log: append-only

---

# **9\. VERSIONING POLICY**

## **9.1 Canon version**

Dùng cho thay đổi luật nền.

Ví dụ:

v1.0  
v1.1  
v2.0

## **9.2 Entity version**

Dùng cho đổi schema/entity facts.

## **9.3 State version**

Dùng cho diễn tiến timeline.

Ví dụ:

char\_state\_mikage\_v10  
char\_state\_mikage\_v11  
char\_state\_mikage\_v12

## **9.4 Prompt/package version**

Dùng cho lineage và regression.

---

# **10\. SUGGESTED PRISMA-STYLE DATA MODEL**

Đây là khung model mức scaffold.

model Request {  
 id                String   @id  
 type              String  
 requestClass      String  
 requestSubclass   String?  
 userInputRaw      String  
 normalizedIntent  Json  
 routingStatus     String  
 createdAt         DateTime @default(now())  
 updatedAt         DateTime @updatedAt  
}

model ContextPacket {  
 id                 String   @id  
 requestId          String  
 contextSources     Json  
 sceneSeed          Json  
 contextCompleteness String  
 blockingFlags      Json  
 createdAt          DateTime @default(now())  
 updatedAt          DateTime @updatedAt  
}

model Character {  
 id             String   @id  
 entityRef      String  
 name           String  
 role           String  
 signatureTraits Json  
 identityLock   Json  
 createdAt      DateTime @default(now())  
 updatedAt      DateTime @updatedAt  
}

model CharacterState {  
 id                String   @id  
 characterId       String  
 stateVersion      Int  
 timelinePosition  String  
 physicalState     Json  
 psychologicalState Json  
 knowledgeState    Json  
 canonLockedFields Json  
 createdAt         DateTime @default(now())  
}

model ValidationReport {  
 id          String   @id  
 requestId   String  
 pass        Boolean  
 checks      Json  
 warnings    Json  
 violations  Json  
 createdAt   DateTime @default(now())  
}

model ProductionPackage {  
 id                   String   @id  
 requestId            String  
 contextPacketId      String  
 narrativePacketId    String?  
 validationReportId   String  
 assetType            String  
 compiledPrompt       String  
 negativePrompt       String?  
 renderSpec           Json  
 readyForGeneration   Boolean  
 createdAt            DateTime @default(now())  
}

model GeneratedAsset {  
 id                  String   @id  
 requestId           String  
 productionPackageId String  
 assetModality       String  
 assetRole           String  
 storage             Json  
 generationEngine    Json  
 assetStatus         String  
 createdAt           DateTime @default(now())  
}

model BenchmarkReport {  
 id                String   @id  
 assetId           String  
 benchmarkSets     Json  
 similarityScores  Json  
 riskScores        Json  
 benchmarkPass     Boolean  
 createdAt         DateTime @default(now())  
}

model ReviewReport {  
 id                 String   @id  
 assetId            String  
 benchmarkReportId  String  
 reviewStatus       String  
 issues             Json  
 revisionDirectives Json  
 finalOperatorNote  String?  
 createdAt          DateTime @default(now())  
}

model DecisionRecord {  
 id               String   @id  
 requestId        String  
 assetId          String?  
 approval         String  
 governanceTrace  Json  
 decisionReason   String  
 nextAction       String  
 createdAt        DateTime @default(now())  
}

model MemoryRecord {  
 id               String   @id  
 memoryDomain     String  
 subjectRef       String?  
 memoryKey        String  
 memoryValue      Json  
 retrievalPriority String  
 stability        String  
 overwritePolicy  String  
 activatedBy      Json  
 createdAt        DateTime @default(now())  
 updatedAt        DateTime @updatedAt  
}  
---

# **11\. STORAGE SPLIT**

Để vận hành ổn định, nên tách storage làm 3 lớp:

## **11.1 Relational DB**

Lưu contract, state, decision, lineage, governance.

## **11.2 Object Storage**

Lưu image/video/audio/json export/file asset.

## **11.3 Vector / Retrieval Store**

Lưu embeddings cho:

* canon chunks

* world bible fragments

* character state summaries

* visual benchmark descriptors

* historical review patterns

---

# **12\. MEMORY CONTRACT FOR RUNTIME**

Runtime gọi memory bằng packet chuẩn này:

{  
 "request\_id": "req\_master\_001",  
 "memory\_pull\_contract": {  
   "request\_class": "asset\_generation",  
   "subject\_refs": \[  
     "char\_mikage\_001"  
   \],  
   "domains\_needed": \[  
     "canon",  
     "visual\_identity",  
     "character\_state",  
     "review\_memory"  
   \],  
   "priority\_only": true,  
   "max\_records": 12  
 }  
}

Output retrieval chuẩn:

{  
 "request\_id": "req\_master\_001",  
 "memory\_context\_bundle": {  
   "records": \[  
     {  
       "memory\_id": "memory\_mikage\_visual\_rule\_001",  
       "domain": "visual\_identity",  
       "summary": "Mikage crimson usage must remain restrained internal damage leakage only.",  
       "priority": "high"  
     }  
   \],  
   "bundle\_status": "sufficient"  
 }  
}  
---

# **13\. END-TO-END DATA FLOW**

Đây là chuỗi data flow chuẩn.

user\_request  
\-\> request\_record  
\-\> request\_classifier  
\-\> context\_packet  
\-\> memory\_pull  
\-\> scene\_packet  
\-\> narrative\_packet  
\-\> validation\_report  
\-\> production\_package  
\-\> generated\_asset  
\-\> benchmark\_report  
\-\> review\_report  
\-\> decision\_record  
\-\> memory\_writeback  
---

# **14\. MEMORY WRITEBACK RULES**

Chỉ được ghi vào memory khi thỏa ít nhất 1 trong 4 điều:

1. phát hiện rule quan trọng lặp lại nhiều lần

2. có drift pattern rõ ràng cần nhớ cho lần sau

3. có state transition chính thức của character/world

4. có operator-approved correction trở thành practice chuẩn

Không ghi memory cho:

* output tạm

* prompt thử nghiệm lỗi

* asset bị reject vì nonsense

* dữ liệu chưa qua governance

---

# **15\. SAMPLE MEMORY WRITEBACK**

Ví dụ sau một vòng review thấy lỗi neon city lặp lại nhiều lần.

{  
 "id": "memory\_review\_pattern\_004",  
 "type": "memory\_record",  
 "memory\_domain": "review\_memory",  
 "subject\_ref": "char\_mikage\_001",  
 "memory\_key": "common\_drift\_neon\_city\_overexposure",  
 "memory\_value": {  
   "pattern": "background\_city\_often\_becomes\_too\_colorful",  
   "correction": "reduce\_saturation\_and\_remove\_spectacle\_density",  
   "severity": "medium"  
 },  
 "retrieval\_priority": "medium",  
 "stability": "long\_term",  
 "overwrite\_policy": "append\_or\_refine"  
}  
---

# **16\. REPOSITORY FILE STRUCTURE SUGGESTION**

/apps  
 /studio-api  
 /studio-worker  
 /studio-control-ui

/packages  
 /contracts  
   base.contract.ts  
   request.contract.ts  
   context.contract.ts  
   character.contract.ts  
   state.contract.ts  
   validation.contract.ts  
   production.contract.ts  
   benchmark.contract.ts  
   review.contract.ts  
   decision.contract.ts  
   memory.contract.ts

 /canon  
   constitution/  
   rules/  
   visual-grammar/

 /world  
   entities/  
   relations/  
   events/  
   locations/  
   factions/  
   technologies/

 /memory  
   retrieval/  
   writeback/  
   ranking/  
   summarizers/

 /runtime  
   orchestration/  
   guards/  
   routers/  
   pipeline/

 /db  
   prisma/  
   migrations/  
   seed/

 /benchmarks  
   gold/  
   silver/  
   red/

 /schemas  
   json/  
   zod/  
---

# **17\. REQUIRED RUNTIME GUARDS**

Các guard này phải tồn tại ở tầng code.

## **17.1 Guard: requireContextPacket**

Block nếu chưa có context packet.

## **17.2 Guard: requireValidationPass**

Block nếu validation fail.

## **17.3 Guard: requireBenchmarkBeforeApproval**

Không cho decision approved nếu thiếu benchmark.

## **17.4 Guard: requireStateTransitionRecord**

Không cho đổi character state trực tiếp.

## **17.5 Guard: preventCanonOverwrite**

Không cho runtime output ghi đè canon constitution/rules.

---

# **18\. MINIMUM SEED RECORDS**

Để bootstrap chạy thật, cần ít nhất các seed này:

canon\_constitution\_v1  
rule\_crimson\_glow\_limit\_001  
rule\_no\_fantasy\_tech\_001  
rule\_no\_neon\_excess\_001  
visual\_grammar\_mikage\_core\_001  
entity\_char\_mikage\_001  
char\_mikage\_001  
char\_state\_mikage\_001\_current  
benchmark\_set\_gold\_mikage  
benchmark\_set\_silver\_rooftop  
benchmark\_set\_red\_drift  
---

# **19\. WHAT THIS PACK SOLVES**

Pack này giải quyết 6 lỗ hổng lớn:

1. prompt không còn trôi nổi, vì đã có lineage

2. canon không còn nằm rải rác, vì đã có constitution \+ rules

3. character không còn bị đổi tùy tiện, vì có state contract

4. asset không còn approve cảm tính, vì có benchmark/report/decision record

5. memory không còn mơ hồ, vì có retrieval \+ writeback policy

6. runtime không còn “gọi đại”, vì đã có data flow và guard

---

# **20\. MASTER SUMMARY**

Bản này đã dựng xong:

* entity map hoàn chỉnh

* base contract cho toàn hệ

* contract cho canon / world / state / production / memory / governance

* schema logic cho persistent memory

* lineage model để truy vết toàn pipeline

* write/read/delete governance rules

* Prisma-style scaffold

* repo structure gợi ý

* runtime guard requirements

* minimum seed records

