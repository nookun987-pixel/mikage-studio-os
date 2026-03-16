# **MIKAGE STUDIO — MASTER ARCHITECTURE MAP**

**RUNTIME TRUTH V1**

# Tài liệu này xác định **kiến trúc dữ liệu và quyền lực của từng file trong hệ Mikage Studio** để tránh tình trạng nhiều nguồn sự thật. Hệ thống chỉ có một runtime hierarchy rõ ràng.

# **1\. HIERARCHY QUYỀN LỰC TOÀN HỆ THỐNG**

Tất cả file trong dự án phải tuân theo thứ tự ưu tiên sau:  
SYSTEM LAW  
↓  
CANON LAW  
↓  
WORKFLOW LAW  
↓  
GENERATION INTELLIGENCE  
↓  
AESTHETIC INTELLIGENCE  
↓  
VISUAL KNOWLEDGE  
Nếu có xung đột dữ liệu:  
SYSTEM \> CANON \> WORKFLOW \> GENERATION \> AESTHETIC \> VISUAL

# **2\. TIER 1 — SYSTEM LAW**

**Source of truth duy nhất cho hệ thống runtime**  
FILE  
SYSTEM\_MASTER.md  
Vai trò:  
Studio system architecture  
Agent roles  
Execution environment  
Runtime orchestration rules  
Data contracts  
Storage logic  
Pipeline governance  
File này quyết định:  
Studio OS behavior  
Agent hierarchy  
Infrastructure expectations  
Runtime execution rules  
Không file nào được override tầng này.

# **3\. TIER 2 — CANON LAW**

**Nguồn xác định identity của IP Mikage**  
FILES  
MIKAGE\_PROJECT\_MASTER.md  
01\_Mikage\_Core\_Spec.txt  
Vai trò:  
Character canon  
Identity invariants  
Emotional signature  
Visual restrictions  
Color system  
Anti-drift rules  
Tầng này xác định:  
Mikage được phép xuất hiện theo kiểu nào  
Phong cách nào bị cấm  
Palette nào được phép  
Tông cảm xúc nào hợp lệ  
Tầng dưới không được phép thay đổi canon.

# **4\. TIER 3 — WORKFLOW LAW**

**Nguồn xác định pipeline vận hành của Studio**  
FILES  
04\_Studio\_Test\_Workflow.txt  
MIKAGE\_WORKFLOW\_MASTER.md  
Pipeline chuẩn:  
Chief  
→ Compile  
→ Generate  
→ Review  
→ Canon Gate  
→ Archive  
Vai trò:  
define run lifecycle  
define compile logic  
define review structure  
define archive process  
define learning loop

# **5\. TIER 4 — GENERATION INTELLIGENCE**

**Hệ thống logic tạo prompt và preset**  
FILES  
03\_Mikage\_Prompt\_Pack.txt  
02\_Mikage\_3\_Mode\_Visual\_Briefs.txt  
Vai trò:  
prompt modules  
generation modes  
compiled prompt recipes  
negative prompt fragments  
generation parameters  
review rubric  
classification rules  
Các file này:  
được phép sinh prompt  
được phép tạo preset  
được phép định nghĩa mode  
Nhưng **không được override canon**.

# **6\. TIER 5 — AESTHETIC INTELLIGENCE**

**Tầng nghiên cứu mỹ học phục vụ hệ Mikage**  
FILE  
Japanese Visual Aesthetics AI Knowledge [Packs.md](http://packs.md)  
Vai trò:  
aesthetic doctrine  
semiotic analysis  
Japanese cultural aesthetics  
visual philosophy  
motif analysis  
composition logic  
File này cung cấp:  
Ma  
Notan  
Ki-sho-ten-ketsu  
Oku  
Wabi-sabi  
Neo-Tokyo aesthetics  
Shinto motifs  
Japanese material culture  
Vai trò của nó:  
nguồn học thuyết  
nguồn sinh knowledge packs  
nguồn giải thích triết lý mỹ thuật  
Không được override:  
canon palette  
character identity  
system workflow

# **7\. TIER 6 — VISUAL KNOWLEDGE**

**Dataset mỹ thuật dùng để enrich generation**  
FILES  
JAPANESE\_TRADITIONAL\_VISUAL\_REFERENCE.MASTER PACK.json  
JAPANESE ART GRAMMAR FOR STUDIO.json  
Vai trò:  
visual grammar  
composition references  
material rendering knowledge  
historical motifs  
color atmospheres  
pattern libraries  
Các pack này dùng để:  
seed presets  
suggest composition  
improve prompt richness  
generate visual variants

# **8\. STUDIO DATA FLOW**

Runtime pipeline của Studio:  
User Brief  
↓  
Prompt Compiler  
↓  
Prompt Pack Modules  
↓  
Mode Visual Brief  
↓  
Compiled Prompt  
↓  
Image Model  
↓  
Generated Assets  
↓  
Review Rubric  
↓  
Canon Gate  
↓  
Archive

# **9\. RUN DATA SCHEMA**

Mỗi generation run nên lưu dữ liệu dạng:  
run\_id  
timestamp  
brief  
mode  
compiled\_prompt  
negative\_prompt  
model  
params  
seed  
generated\_assets  
review\_scores  
canon\_status  
classification  
archive\_status  
metadata

# **10\. REVIEW SYSTEM**

Rubric đánh giá:  
Canon Fidelity  
Composition Strength  
Material Realism  
Lighting Quality  
Emotional Presence  
Luxury Signal  
Fan Appeal  
Visual Novelty  
Output classification:  
PASS  
REVISE  
REJECT

# **11\. LEARNING LOOP**

Archive lưu các dữ liệu sau:  
prompt lineage  
visual references  
generation parameters  
review scores  
canon results  
preset used  
mode used  
Dữ liệu này dùng để:  
refine prompts  
improve presets  
detect visual drift  
optimize model usage

# **12\. FILE STRUCTURE CHUẨN**

Khuyến nghị tổ chức repository:  
/mikage-studio-system

/system  
SYSTEM\_MASTER.md

/canon  
MIKAGE\_PROJECT\_MASTER.md  
01\_Mikage\_Core\_Spec.txt

/workflow  
04\_Studio\_Test\_Workflow.txt  
MIKAGE\_WORKFLOW\_MASTER.md

/generation  
03\_Mikage\_Prompt\_Pack.txt  
02\_Mikage\_3\_Mode\_Visual\_Briefs.txt

/aesthetic  
Japanese Visual Aesthetics AI Knowledge [Packs.md](http://packs.md)

/visual\_knowledge  
JAPANESE\_TRADITIONAL\_VISUAL\_REFERENCE.MASTER PACK.json  
JAPANESE ART GRAMMAR FOR STUDIO.json

# **13\. AGENT DATA ACCESS ORDER**

AI agents trong hệ phải đọc dữ liệu theo thứ tự:  
1 SYSTEM\_MASTER  
2 CANON MASTER  
3 WORKFLOW  
4 GENERATION  
5 AESTHETIC RESEARCH  
6 VISUAL KNOWLEDGE

# **14\. HỆ THỐNG FILE QUYỀN LỰC CAO NHẤT**

Ba file có quyền lực cao nhất trong hệ:  
SYSTEM\_MASTER.md  
MIKAGE\_PROJECT\_MASTER.md  
04\_Studio\_Test\_Workflow.txt  
Tất cả các file khác chỉ đóng vai trò:  
generation modules  
aesthetic intelligence  
visual reference knowledge

# **15\. KẾT LUẬN**

Hệ Mikage Studio hoạt động theo nguyên tắc:  
SYSTEM điều khiển hệ  
CANON giữ identity  
WORKFLOW vận hành pipeline  
GENERATION tạo nội dung  
AESTHETIC cung cấp triết lý  
VISUAL KNOWLEDGE cung cấp dữ liệu  
Kiến trúc này đảm bảo:  
không có multiple truths  
không có canon drift  
không có workflow confusion  
không có prompt chaos  
Và biến Mikage Studio thành **một visual production system có khả năng học và tiến hóa theo từng run.**