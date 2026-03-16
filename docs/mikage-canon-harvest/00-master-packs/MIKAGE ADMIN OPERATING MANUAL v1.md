# 

## **1\. Mục đích**

Tài liệu này quy định cách team:

* thêm entity mới

* sửa entity cũ

* ingest dữ liệu

* review asset

* promote canon

* rollback canon

* xử lý conflict

Không ai được bỏ qua pipeline và tự sửa graph trực tiếp, trừ trường hợp migration được phê duyệt.

---

## **2\. Vai trò vận hành**

## **2.1 Canon Architect**

Quyền:

* sửa constitution

* duyệt hard canon

* duyệt override hiếm

* phê duyệt thay đổi rule gốc

## **2.2 Lore Operator**

Quyền:

* thêm character/faction/location/event

* không được tự hard-lock canon

## **2.3 Visual Governor**

Quyền:

* review visual asset

* benchmark compare

* chấm drift

* đề xuất reject/promote

## **2.4 Data Operator**

Quyền:

* chạy ingest

* theo dõi report

* xử lý lỗi schema/relation

* không được override canon rule

## **2.5 Archive Custodian**

Quyền:

* quản lý lineage

* quản lý version

* quản lý deprecate/rollback log

---

## **3\. Luật vận hành tuyệt đối**

1. Không entity nào vào graph canon nếu chưa qua ingest pipeline.

2. Không asset nào được promote nếu thiếu lineage.

3. Không override `critical_fail`.

4. Không đổi ID cũ để “sửa tên”.

5. Mọi update phải giữ audit trail.

6. Variant phải là delta-only.

7. Preset không được chứa drift profile thiếu negative controls.

8. Hard canon chỉ được khóa sau benchmark compare \+ governance approval.

---

## **4\. SOP — thêm Character mới**

## **Bước bắt buộc**

1\. tạo file character json  
2\. gán character\_id bất biến  
3\. khai báo core\_truth  
4\. gán faction\_id  
5\. gán era\_id  
6\. gán origin/current location nếu có  
7\. gán governing rules nếu cần  
8\. chạy schema validation  
9\. chạy canon validation  
10\. resolve relation  
11\. ingest graph  
12\. review nội bộ  
13\. set canon\_state phù hợp

## **Reject nếu:**

* không có core\_truth

* không có era

* không có faction và cũng không khai báo factionless rationale

* hành vi/cấu trúc mâu thuẫn constitution

---

## **5\. SOP — thêm Faction mới**

## **Bước bắt buộc**

1\. tạo faction\_id  
2\. viết doctrine 1 câu rõ  
3\. gán philosophical axes  
4\. định nghĩa visual grammar  
5\. khai báo home location  
6\. gán governing rules  
7\. schema validate  
8\. canon validate  
9\. relation resolve  
10\. ingest

## **Reject nếu:**

* doctrine mơ hồ

* không có visual grammar

* trùng vai trò với faction đang có mà không có khác biệt triết học

* drift sang fantasy royalty / pop-glamour / generic sci-fi corps

---

## **6\. SOP — thêm Location mới**

## **Bước bắt buộc**

1\. tạo location\_id  
2\. định nghĩa type  
3\. gán era\_id  
4\. gán faction ownership  
5\. mô tả visual keywords  
6\. schema validate  
7\. canon validate  
8\. ingest

## **Reject nếu:**

* location không có era

* location không có function trong world logic

* visual language drift khỏi Mikage grammar

---

## **7\. SOP — thêm WeaponSystem mới**

## **Bước bắt buộc**

1\. tạo weapon\_id  
2\. gán owner\_character\_id hoặc faction ownership  
3\. định nghĩa energy\_source  
4\. định nghĩa cost\_model  
5\. định nghĩa observable\_trace  
6\. định nghĩa mechanism\_type  
7\. schema validate  
8\. canon validate  
9\. ingest

## **Reject ngay nếu:**

* không có energy source

* không có cost model

* không có observable trace

* hoạt động như phép thuật trá hình

---

## **8\. SOP — thêm PromptPreset mới**

## **Bước bắt buộc**

1\. tạo preset\_id  
2\. bind reference\_style\_id  
3\. định nghĩa prompt\_blocks  
4\. định nghĩa style\_weights  
5\. gán negative\_profile\_ids  
6\. gán seed\_policy\_id  
7\. schema validate  
8\. canon validate  
9\. ingest

## **Reject nếu:**

* thiếu negative profile

* style\_weights đẩy drift\_tolerance quá cao

* preset lặp preset cũ mà không có vai trò riêng

---

## **9\. SOP — thêm PromptVariant mới**

## **Bước bắt buộc**

1\. tạo variant\_id  
2\. bind applies\_to\_presets  
3\. chỉ viết delta\_blocks  
4\. không lặp reference\_style hoặc visual\_defaults cấp preset  
5\. schema validate  
6\. canon validate  
7\. ingest

## **Reject nếu:**

* variant chứa preset-level fields

* không target preset nào

* delta không rõ hoặc vô nghĩa

---

## **10\. SOP — ingest Asset mới**

## **Hồ sơ bắt buộc của asset**

asset file  
asset metadata  
source prompt lineage  
preset\_id  
variant\_id  
reference\_style\_id  
generator model  
file hash  
timestamp

## **Flow**

1\. register asset  
2\. parse metadata  
3\. schema validate  
4\. canon validate  
5\. benchmark compare  
6\. review sheet  
7\. classify  
8\. archive  
9\. promote nếu đạt

## **Reject nếu:**

* thiếu lineage

* drift flag cao

* red\_flag similarity vượt ngưỡng

* validator fail/critical\_fail

---

## **11\. SOP — review Asset**

Reviewer phải chấm đúng form chuẩn:

* soul\_fidelity

* canon\_integrity

* visual\_attraction

* faction\_readability

* material\_integrity

* damage\_language

* tech\_plausibility

* composition\_quality

Không thêm tiêu chí cá nhân ngoài form.  
 Ghi chú được phép, nhưng classification phải theo hệ thống.

---

## **12\. SOP — classification Asset**

## **reject**

Dùng khi:

* fail nặng

* drift mạnh

* lineage hỏng

* ontology sai

## **interesting\_but\_non\_canon**

Dùng khi:

* đẹp

* có giá trị khám phá

* nhưng sai canon hoặc sai identity

## **usable\_asset**

Dùng khi:

* validator pass

* review khá

* dùng marketing/internal/reference được

* chưa đủ lock canon

## **canon\_candidate**

Dùng khi:

* validator pass

* review pass

* gold similarity cao

* lineage complete

## **hard\_canon\_locked**

Dùng khi:

* đã là canon\_candidate

* benchmark compare tốt

* governance approval có thật

* không conflict với hard canon hiện có

---

## **13\. Promotion ladder chính thức**

draft  
↓  
validated\_soft  
↓  
canon\_candidate  
↓  
hard\_canon\_locked

### **draft → validated\_soft**

Cần:

* schema pass

* canon validator pass

* relation resolve pass

### **validated\_soft → canon\_candidate**

Cần:

* review pass

* benchmark compare đủ mạnh

* lineage complete

### **canon\_candidate → hard\_canon\_locked**

Cần:

* governance approval

* không conflict constitution

* không conflict hard canon khác

* archive snapshot tạo xong

---

## **14\. SOP — rollback / deprecate canon**

Rollback không xóa âm thầm.  
 Phải dùng `deprecated` hoặc `archived`.

## **Flow**

1\. xác định entity\_id cần rollback  
2\. ghi lý do  
3\. tạo rollback record  
4\. đổi status/canon\_state  
5\. cập nhật relation nếu cần  
6\. reindex asset/dataset  
7\. thông báo ảnh hưởng xuống pipeline

## **Lý do rollback hợp lệ**

* conflict constitution

* lineage sai

* benchmark sai gắn nhãn

* canon promotion sai quy trình

* duplicate canonical anchor

---

## **15\. Conflict resolution protocol**

Khi hai entity/asset conflict nhau:

1\. ưu tiên constitution  
2\. ưu tiên hard\_canon\_locked  
3\. ưu tiên entity có lineage đầy đủ hơn  
4\. ưu tiên asset có benchmark support mạnh hơn  
5\. nếu vẫn hòa, Canon Architect quyết  
---

## **16\. Override protocol**

Override chỉ được phép nếu:

* không đụng critical\_fail

* không phá constitution

* có ghi chú lý do

* có tên người duyệt

* có thời gian hiệu lực

Schema log:

{  
 "override\_id": "ovr\_0001",  
 "target\_entity\_id": "asset\_2044",  
 "reason": "Temporary archive retention despite fail in faction readability.",  
 "approved\_by": "canon\_architect",  
 "expires\_at": "2026-04-01T00:00:00Z"  
}  
---

## **17\. Benchmark curation SOP**

Khi thêm benchmark asset:

## **Gold set**

Chỉ nhận nếu:

* identity cực ổn

* visual grammar chuẩn

* composition chuẩn

* damage language đúng

* drift gần như 0

## **Silver set**

Nhận nếu:

* usable tốt

* có biến thể hợp lệ

* không phá canon

## **Red flag set**

Nhận nếu:

* là lỗi drift điển hình

* dùng được để đào tạo reviewer/validator

* có reason rõ

---

## **18\. Quy tắc naming**

Mọi ID theo chuẩn:

char\_  
faction\_  
loc\_  
era\_  
weapon\_  
rule\_  
ref\_  
preset\_  
variant\_  
asset\_  
review\_  
event\_  
src\_  
ingest\_  
ovr\_

Không dùng khoảng trắng, không dùng tên cảm tính.

---

## **19\. Governance cadence**

## **Mỗi ingest run**

* Data Operator kiểm report

## **Mỗi batch asset**

* Visual Governor review classification

## **Mỗi lần promote hard canon**

* Canon Architect duyệt

## **Mỗi chu kỳ lớn**

* Archive Custodian chụp snapshot và backup metadata

---

## **20\. Definition of Done**

Mỗi entity chỉ được xem là “done” khi:

### **Entity dữ liệu**

* schema pass

* canon pass

* relation resolve pass

* graph write success

* archive log created

### **Asset**

* metadata đủ

* validator pass

* benchmark compare xong

* review xong

* classification xong

* lineage complete

* archive xong

---

# **PHẦN III — KẾT LUẬN HỆ THỐNG**

Sau bản này, Mikage đã có đủ bộ:

## **Constitution Layer**

* ontology

* invariants

* philosophy

* visual DNA

## **Data Layer**

* seed pack

## **Validation Layer**

* rule pack

## **Generation Layer**

* prompt compiler config

## **Governance Layer**

* benchmark set

* review sheet

## **Operations Layer**

* ingestion pipeline

* admin operating manual

---

# **FINAL VERDICT**

Tới đây Mikage đã đủ khung để được gọi là:

**canon-governed generative IP engine**

Nó đã có khả năng:

* tạo asset liên tục

* kiểm canon tự động

* giữ visual identity

* chống drift

* quản lý lore và asset bằng graph

* review/promotion theo governance

* scale như một studio IP có luật

Điểm còn lại không phải “thiếu mảnh hệ thống” nữa, mà là **triển khai thực thi**:

* code pipeline

* dựng Neo4j ingest

* dựng asset index

* nạp benchmark thật

* vận hành review thật

