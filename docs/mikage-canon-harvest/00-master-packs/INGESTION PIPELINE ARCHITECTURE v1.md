## **1\. Mục tiêu vận hành**

Pipeline này phải giải quyết đúng 6 việc:

1. nhận file nguồn

2. parse thành typed JSON

3. kiểm schema

4. kiểm canon

5. ghi vào graph/index/archive

6. giữ lineage đầy đủ để mọi asset và lore đều truy vết được

Nó không phải pipeline “upload file cho có”.  
 Nó là **canon ingestion layer**.

---

## **2\. Phạm vi ingest**

Pipeline phải ingest được toàn bộ các loại thực thể sau:

* Rule

* Character

* Faction

* Location

* Era

* WeaponSystem

* ReferenceStyle

* PromptPreset

* PromptVariant

* Asset

* Review

* BenchmarkLabel

* Event

Nguồn vào có thể là:

* `.json`

* `.jsonl`

* `.yaml`

* `.csv` cho review/benchmark bulk

* thư mục asset metadata \+ image path

* prompt lineage record

---

## **3\. Kiến trúc tổng thể**

SOURCE FILES  
↓  
Source Registry  
↓  
Parser Layer  
↓  
Typed Normalizer  
↓  
Schema Validator  
↓  
Canon Validator  
↓  
Relation Resolver  
↓  
Graph Ingest Writer  
↓  
Asset Index Writer  
↓  
Archive Logger  
↓  
Ingest Report  
---

## **4\. Các module bắt buộc**

## **A. Source Registry**

Nhiệm vụ:

* đăng ký file nguồn

* gán `source_id`

* gán `source_type`

* gán version

* tính checksum

* chặn ingest trùng file

Schema tối thiểu:

{  
 "source\_id": "src\_0001",  
 "source\_path": "seed/characters.seed.json",  
 "source\_type": "seed\_pack",  
 "checksum\_sha256": "abc123...",  
 "ingest\_status": "registered",  
 "created\_at": "2026-03-14T10:00:00Z"  
}  
---

## **B. Parser Layer**

Nhiệm vụ:

* đọc file theo định dạng

* parse raw object

* trả về object chưa chuẩn hóa

Parser không làm canon logic.  
 Parser chỉ làm:

* syntax read

* format mapping

* field extraction

Ví dụ parser theo loại:

* `json_parser`

* `yaml_parser`

* `csv_review_parser`

* `asset_manifest_parser`

---

## **C. Typed Normalizer**

Nhiệm vụ:

* ép dữ liệu raw thành schema thống nhất

* chuẩn hóa field name

* bổ sung field mặc định

* chuẩn hóa enum

* chuẩn hóa ID

Ví dụ:

* `character_id` bắt buộc theo format `char_*`

* thiếu `status` thì reject hoặc apply default theo policy

* màu hex viết thường/hoa đều normalize về uppercase

Ví dụ output:

{  
 "entity\_type": "Character",  
 "entity\_id": "char\_mikage",  
 "payload": {  
   "name": "Mikage",  
   "status": "active",  
   "canon\_state": "hard\_canon\_locked"  
 }  
}  
---

## **D. Schema Validator**

Nhiệm vụ:

* kiểm field bắt buộc

* kiểm kiểu dữ liệu

* kiểm enum hợp lệ

* kiểm shape object

* kiểm relation-ready fields

Ví dụ:

* Character phải có `character_id`, `name`, `core_truth`, `faction_id`, `era_id`

* PromptVariant không được có full preset fields

* Asset phải có lineage fields

Nếu schema fail:

* không chạy canon validator

* không ghi graph

* tạo ingest report lỗi

---

## **E. Canon Validator**

Nhiệm vụ:

* dùng `validator.rulepack.json`

* kiểm ontology

* kiểm visual drift

* kiểm timeline

* kiểm character truth

* kiểm promotion gate

Đây là lớp semantic validation.

Schema validator hỏi:

dữ liệu có đúng format không?

Canon validator hỏi:

dữ liệu có được phép tồn tại trong Mikage không?

---

## **F. Relation Resolver**

Nhiệm vụ:

* resolve foreign key

* tạo edge map

* phát hiện orphan reference

* hỗ trợ deferred relation nếu entity phụ thuộc chưa ingest xong

Ví dụ:

* `char_mikage.faction_id -> faction_zenith_reliquary`

* `preset_canon_core.reference_style_id -> ref_porcelain_void`

Nếu relation không resolve được:

* đánh `fail`

* không promote vào canonical graph

---

## **G. Graph Ingest Writer**

Nhiệm vụ:

* upsert node

* upsert relation

* version hóa write operation

* log write status

Graph mục tiêu: **Neo4j**

Node labels:

* Character

* Faction

* Location

* Era

* WeaponSystem

* Rule

* ReferenceStyle

* PromptPreset

* PromptVariant

* Asset

* Review

* Event

Edge types:

* `BELONGS_TO`

* `USES_WEAPON`

* `LOCATED_IN`

* `IN_ERA`

* `CONSTRAINED_BY_RULE`

* `GENERATED_FROM`

* `HAS_REVIEW`

* `BENCHMARK_LAYER`

* `DERIVED_FROM`

* `REFERENCES_STYLE`

---

## **H. Asset Index Writer**

Nhiệm vụ:

* cập nhật asset registry

* cập nhật metadata store

* cập nhật benchmark index

* cập nhật search/index layer

Asset index không thay graph.  
 Nó là lớp để:

* tìm asset

* lọc asset

* audit lineage

* benchmark compare

Asset index fields tối thiểu:

{  
 "asset\_id": "asset\_1023",  
 "preset\_id": "preset\_canon\_core",  
 "variant\_id": "variant\_rooftop\_storm\_advance",  
 "reference\_style\_id": "ref\_porcelain\_void",  
 "validator\_status": "passed",  
 "review\_status": "passed",  
 "classification": "canon\_candidate",  
 "benchmark\_layer": null  
}  
---

## **I. Archive Logger**

Nhiệm vụ:

* lưu toàn bộ ingest run

* giữ before/after snapshot

* log lỗi

* log override

* log actor

* log timestamp

Mọi thay đổi canon phải có audit trail.

---

## **J. Ingest Report**

Pipeline phải luôn trả report chuẩn, không trả mơ hồ.

Ví dụ:

{  
 "ingest\_run\_id": "ingest\_20260314\_0001",  
 "source\_id": "src\_0001",  
 "status": "partial\_success",  
 "summary": {  
   "received": 12,  
   "schema\_pass": 11,  
   "canon\_pass": 9,  
   "written\_to\_graph": 9,  
   "rejected": 3  
 },  
 "rejections": \[  
   {  
     "entity\_id": "variant\_bad\_001",  
     "stage": "schema\_validator",  
     "reason": "Variant contains preset-layer fields."  
   },  
   {  
     "entity\_id": "weapon\_unknown\_09",  
     "stage": "relation\_resolver",  
     "reason": "owner\_character\_id does not exist."  
   }  
 \]  
}  
---

## **5\. Ingestion flow chuẩn theo từng loại**

## **5.1 Seed Pack Ingest**

seed file  
↓  
parse  
↓  
normalize  
↓  
schema validate  
↓  
canon validate  
↓  
resolve relations  
↓  
upsert graph  
↓  
archive log

Áp dụng cho:

* rules

* characters

* factions

* locations

* eras

* weapons

* styles

* presets

* variants

---

## **5.2 Asset Ingest**

asset image/video  
\+ asset metadata.json  
\+ source prompt lineage  
↓  
parse manifest  
↓  
normalize metadata  
↓  
schema validate  
↓  
canon validate  
↓  
benchmark compare  
↓  
create Asset node  
↓  
index write  
↓  
archive

Asset ingest bắt buộc có:

* `asset_id`

* `source_prompt_id`

* `preset_id`

* `variant_id`

* `reference_style_id`

* `generator_model`

* `created_at`

* `file_path`

* `hash`

* `validator_status`

---

## **5.3 Review Ingest**

review csv/json  
↓  
parse review row  
↓  
normalize score ranges  
↓  
schema validate  
↓  
bind asset\_id  
↓  
write Review node  
↓  
create HAS\_REVIEW edge  
↓  
update asset classification  
---

## **5.4 Benchmark Ingest**

benchmark asset list  
↓  
parse  
↓  
validate benchmark layer  
↓  
bind target asset  
↓  
write benchmark metadata  
↓  
update benchmark registry  
---

## **6\. File/folder structure đề xuất**

mikage\_system/  
├── data\_sources/  
│   ├── seed/  
│   ├── rules/  
│   ├── compiler/  
│   ├── assets/  
│   ├── reviews/  
│   └── benchmark/  
├── ingest/  
│   ├── parsers/  
│   ├── normalizers/  
│   ├── validators/  
│   ├── resolvers/  
│   ├── writers/  
│   └── reports/  
├── archive/  
│   ├── ingest\_logs/  
│   ├── rejected/  
│   └── snapshots/  
└── graph/  
   ├── cypher/  
   └── migrations/  
---

## **7\. Canonical ingest order**

Để tránh relation gãy, thứ tự ingest chuẩn là:

1\. eras  
2\. rules  
3\. factions  
4\. locations  
5\. reference styles  
6\. weapons  
7\. characters  
8\. presets  
9\. variants  
10\. events  
11\. assets  
12\. reviews  
13\. benchmark labels  
---

## **8\. Policy xử lý lỗi**

## **Hard reject**

Reject ngay nếu:

* schema sai

* thiếu ID

* enum sai

* critical\_fail từ canon validator

* orphan relation ở entity canon cốt lõi

* asset thiếu lineage

## **Soft reject**

Cho vào hàng chờ nếu:

* warning nhiều nhưng chưa fail

* thiếu metadata không thiết yếu

* review chưa đủ nhưng asset vẫn usable nội bộ

## **Manual review queue**

Đưa vào review queue nếu:

* validator pass nhưng benchmark similarity lửng

* asset đẹp nhưng identity chưa chắc

* faction readability thấp

* canonical conflict nghi ngờ

---

## **9\. Versioning policy**

Mọi file ingest phải có:

* `pack_version`

* `project`

* `entity_type`

Mọi node quan trọng nên có thêm:

* `schema_version`

* `last_ingested_at`

* `source_id`

* `source_checksum`

* `updated_by_pipeline_run`

Không overwrite im lặng.  
 Mọi update phải là:

* upsert có audit

* hoặc deprecate version cũ

---

## **10\. Override policy**

Override chỉ được phép cho:

* `warning`

* một số `fail` không thuộc ontology constitution

Không được override:

* `critical_fail`

* no free power

* no magic disguised as technology

* character truth breach

* lineage missing for promoted asset

---

## **11\. Metadata tối thiểu theo entity**

## **Character**

* character\_id

* name

* core\_truth

* faction\_id

* era\_id

* canon\_state

* status

## **Faction**

* faction\_id

* name

* doctrine

* philosophical\_axes

* visual\_grammar

* canon\_state

* status

## **Location**

* location\_id

* name

* era\_id

* faction\_ownership

* canon\_state

* status

## **WeaponSystem**

* weapon\_id

* owner\_character\_id

* technology.energy\_source

* technology.cost\_model

* technology.observable\_trace

* canon\_state

* status

## **Asset**

* asset\_id

* source\_prompt\_id

* preset\_id

* variant\_id

* reference\_style\_id

* file\_path

* hash

* validator\_status

* canon\_state

* status

---

## **12\. Cypher ingest logic mẫu**

Ví dụ upsert Character:

MERGE (c:Character {character\_id: $character\_id})  
SET c.name \= $name,  
   c.core\_truth \= $core\_truth,  
   c.status \= $status,  
   c.canon\_state \= $canon\_state,  
   c.last\_ingested\_at \= $timestamp  
WITH c  
MATCH (f:Faction {faction\_id: $faction\_id})  
MERGE (c)-\[:BELONGS\_TO\]-\>(f)  
WITH c  
MATCH (e:Era {era\_id: $era\_id})  
MERGE (c)-\[:IN\_ERA\]-\>(e);

Ví dụ upsert Asset:

MERGE (a:Asset {asset\_id: $asset\_id})  
SET a.file\_path \= $file\_path,  
   a.hash \= $hash,  
   a.validator\_status \= $validator\_status,  
   a.review\_status \= $review\_status,  
   a.canon\_state \= $canon\_state,  
   a.status \= $status,  
   a.created\_at \= $created\_at  
WITH a  
MATCH (p:PromptPreset {preset\_id: $preset\_id})  
MERGE (a)-\[:GENERATED\_FROM\]-\>(p)  
WITH a  
MATCH (v:PromptVariant {variant\_id: $variant\_id})  
MERGE (a)-\[:DERIVED\_FROM\]-\>(v)  
WITH a  
MATCH (r:ReferenceStyle {reference\_style\_id: $reference\_style\_id})  
MERGE (a)-\[:REFERENCES\_STYLE\]-\>(r);  
---

## **13\. Ingestion run states**

Chỉ dùng 6 trạng thái:

* `registered`

* `parsing`

* `schema_validating`

* `canon_validating`

* `writing`

* `completed`

* `partial_success`

* `rejected`

---

## **14\. Điều kiện pipeline được coi là production-safe**

Pipeline chỉ được coi là usable khi đủ:

* idempotent ingest

* relation resolution ổn

* audit log đầy đủ

* reject report rõ

* không ghi graph nếu schema fail

* không promote asset nếu lineage thiếu

* benchmark/review update đồng bộ với asset index

---

