Mục đích của lớp này:

* chuẩn hóa **đánh giá asset**

* tạo **mẫu chuẩn visual canon**

* tạo dataset để **so sánh drift**

* tạo dữ liệu cho **fine-tune / ranking sau này**

Benchmark system gồm **2 phần duy nhất**:

1. **Benchmark Asset Set**

2. **Review Sheet (QA Form)**

---

# **1\. BENCHMARK ASSET CURATION SYSTEM**

## **Phân lớp benchmark**

gold\_set  
silver\_set  
red\_flag\_set  
---

## **GOLD SET**

Vai trò:

* chuẩn **canon visual tuyệt đối**

* anchor cho identity

* mọi asset canon phải **gần gold hơn silver**

Số lượng tối thiểu:

5 asset  
---

### **Ví dụ gold asset schema**

{  
 "asset\_id": "asset\_gold\_001",

 "benchmark\_layer": "gold\_set",

 "preset\_id": "preset\_canon\_core",  
 "variant\_id": "variant\_portrait\_regal\_stillness",

 "description": "Mikage portrait in void",

 "visual\_signature": {  
   "palette": \[  
     "\#FAFAFA",  
     "\#0A0A0A",  
     "\#E60000"  
   \],

   "materials": \[  
     "porcelain",  
     "carbon\_fiber",  
     "titanium"  
   \],

   "lighting": \[  
     "chiaroscuro",  
     "rim\_light"  
   \],

   "camera": \[  
     "anamorphic",  
     "controlled composition"  
   \]  
 },

 "identity\_features": \[  
   "kitsune porcelain mask",  
   "long black hair",  
   "ceramic armor",  
   "fracture lines"  
 \],

 "canon\_state": "hard\_canon\_locked"  
}  
---

### **GOLD SET nên gồm**

1 hero portrait  
1 full body hero  
1 cinematic rooftop scene  
1 neon street walk  
1 editorial void portrait  
---

# **2\. SILVER SET**

Vai trò:

* canon **mềm**

* chấp nhận variation

* dùng để **đánh giá creativity**

Số lượng:

10 asset  
---

### **Silver schema**

{  
 "asset\_id": "asset\_silver\_001",

 "benchmark\_layer": "silver\_set",

 "preset\_id": "preset\_luminous\_fan\_appeal",

 "visual\_signature": {  
   "identity\_match": 0.8,  
   "visual\_quality": 0.9,  
   "drift\_risk": 0.2  
 },

 "classification": "usable\_asset"  
}  
---

# **3\. RED FLAG SET**

Vai trò:

* dataset **để validator nhận drift**

* training reviewer

* training ranking

Số lượng:

10 asset  
---

### **Ví dụ red flag**

{  
 "asset\_id": "asset\_red\_001",

 "benchmark\_layer": "red\_flag\_set",

 "drift\_flags": \[  
   "childish\_anime\_idol"  
 \],

 "reason": "proportions and facial style drift toward anime idol aesthetic",

 "classification": "reject"  
}  
---

### **Drift phổ biến**

anime idol style  
fantasy magic aura  
generic neon overload  
cute fashion glamour  
soft pastel palette  
superhero comic exaggeration  
---

# **4\. BENCHMARK COMPARISON**

Khi asset mới sinh ra, hệ thống so sánh với benchmark.

Ví dụ:

{  
 "asset\_id": "asset\_1023",

 "benchmark\_similarity": {  
   "gold\_similarity": 0.82,  
   "silver\_similarity": 0.74,  
   "red\_flag\_similarity": 0.09  
 }  
}  
---

### **Luật đánh giá**

gold\_similarity \> 0.75  
→ candidate canon

red\_flag\_similarity \> 0.25  
→ reject  
---

# **5\. REVIEW SHEET (QA FORM)**

Đây là form **duy nhất** dùng để review asset.

Không được tạo form khác.

---

## **Schema**

{  
 "review\_id": "review\_0001",

 "asset\_id": "asset\_1023",

 "reviewer": "human\_reviewer",

 "scores": {

   "soul\_fidelity": 0.92,

   "canon\_integrity": 0.95,

   "visual\_attraction": 0.88,

   "faction\_readability": 0.82,

   "material\_integrity": 0.90,

   "damage\_language": 0.87,

   "tech\_plausibility": 0.91,

   "composition\_quality": 0.89

 },

 "benchmark\_compare": {

   "gold\_similarity": 0.83,

   "silver\_similarity": 0.72,

   "red\_flag\_similarity": 0.04  
 },

 "validator\_status": "passed",

 "lineage\_complete": true,

 "final\_classification": "canon\_candidate",

 "promotion\_recommendation": "yes",

 "reviewer\_notes": "Strong identity preservation and clean material language."  
}  
---

# **6\. REVIEW SCORE EXPLANATION**

## **soul\_fidelity**

Câu hỏi reviewer phải trả lời:

nhìn vào có nhận ra Mikage ngay không?  
---

## **canon\_integrity**

Kiểm:

vi phạm rule không  
---

## **visual\_attraction**

Độ hấp dẫn thị giác.

---

## **faction\_readability**

Có đọc được faction visual grammar không.

---

## **material\_integrity**

Material có:

ceramic  
carbon fiber  
titanium  
industrial surfaces

hay không.

---

## **damage\_language**

Có:

fracture  
scar  
repair  
trace

hay không.

---

## **tech\_plausibility**

Công nghệ có hợp ontology không.

---

## **composition\_quality**

Camera discipline:

anamorphic  
chiaroscuro  
controlled composition  
---

# **7\. FINAL CLASSIFICATION**

Review sheet chỉ cho 5 kết quả:

reject  
interesting\_but\_non\_canon  
usable\_asset  
canon\_candidate  
hard\_canon\_locked  
---

# **8\. PROMOTION RULE**

### **usable\_asset**

validator pass  
review pass  
gold similarity \> 0.5  
---

### **canon\_candidate**

validator pass  
review pass  
gold similarity \> 0.75  
lineage complete  
---

### **hard\_canon\_locked**

canon\_candidate  
benchmark compare pass  
governance approval  
---

# **9\. REVIEW PIPELINE**

Flow chuẩn:

generation  
↓  
validator  
↓  
benchmark compare  
↓  
human review  
↓  
classification  
↓  
archive  
---

# **10\. Sau bước này hệ đã có**

4 lớp hoàn chỉnh:

Canon foundation  
↓  
Validator rule pack  
↓  
Prompt compiler  
↓  
Benchmark \+ Review  
---

# **11\. Còn 2 mảnh cuối**

Để hệ thật sự **production-grade**.

### **1\. Ingestion Pipeline**

để nạp:

seed data  
rules  
lore  
assets  
benchmark

vào graph tự động

---

### **2\. Admin Operating Doc**

file vận hành nội bộ:

thêm character  
thêm faction  
promote asset  
rollback canon  
