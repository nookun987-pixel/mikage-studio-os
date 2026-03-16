# **MIKAGE CANON VALIDATOR SPEC v1**

## **1\. Purpose**

Canon Validator là **cổng kiểm soát trung tâm** của Mikage IP Engine.  
Nó đảm bảo rằng:  
prompt không phá canon  
asset không phá ontology  
character không drift  
technology không biến thành magic  
visual không lệch identity  
timeline không tự mâu thuẫn  
Validator hoạt động ở **3 stage**:  
Pre-Compile Validation  
↓  
Pre-Generation Validation  
↓  
Post-Generation Validation

# **2\. Validator Position in System**

Validator nằm giữa Prompt Compiler và Generation.  
Reference  
↓  
Preset  
↓  
Variant  
↓  
Objective  
↓  
Prompt Compiler  
↓  
CANON VALIDATOR  
↓  
Generate  
↓  
Review  
↓  
Asset Index  
↓  
Archive  
Nếu validator fail → **generation bị block**.

# **3\. Validator Inputs**

Validator nhận dữ liệu từ compiler:  
compiled\_prompt  
character\_ids  
faction\_ids  
location\_ids  
era\_id  
technology\_ids  
visual\_constraints  
lore\_constraints  
prompt\_lineage  
seed\_policy  
Ngoài ra validator truy vấn **Canon Graph**:  
Character Registry  
Faction Registry  
World DB  
Timeline Engine  
Technology Registry  
Rule Library  
Visual Governance

# **4\. Validation Layers**

Validator chạy 6 lớp kiểm tra.  
1 Ontology Validator  
2 Technology Validator  
3 Character Validator  
4 Faction Validator  
5 Timeline Validator  
6 Visual Validator

# **5\. Ontology Validator**

Kiểm tra luật nền.  
**Rules**  
No Free Power  
No Fake Magic  
Power Leaves Trace  
Beauty Requires Damage  
Violence Has Consequence  
Identity Drift Requires Cause  
**Validation Logic**  
Reject nếu:  
weapon.has\_cost \== false  
technology.energy\_source \== null  
technology.failure\_mode \== null  
scene.effect\_without\_trace \== true  
**Output**  
ontology\_status: pass | fail  
violated\_rules: \[\]

# **6\. Technology Validator**

Kiểm tra mọi hệ thống công nghệ.  
**Required Fields**  
principle\_of\_operation  
energy\_source  
cost\_model  
entropy\_consequence  
thermal\_trace  
failure\_mode  
**Reject Logic**  
Reject nếu:  
energy\_source \== null  
cost\_model \== null  
failure\_mode \== null  
technology.behavior \== supernatural  
**Example Reject**  
weapon obeys thought  
weapon floats weightlessly  
weapon leaves no damage

# **7\. Character Validator**

Kiểm tra character drift.  
**Required Mapping**  
character → faction  
character → timeline  
character → visual invariants  
**Mikage Critical Rules**  
Reject nếu:  
emotion \== bubbly\_idol  
design \== childish\_anime  
palette not in canonical palette  
behavior contradicts core\_truth  
**Drift Checks**  
silhouette\_drift  
emotion\_drift  
material\_drift  
identity\_drift

# **8\. Faction Validator**

Kiểm tra worldview.  
**Required**  
faction.philosophy\_position  
faction.power\_model  
faction.visual\_grammar  
**Triangle Enforcement**  
Only 3 worldview centers allowed:  
White Monolith  
ARCHON-IX  
Mikage Axis  
Reject nếu:  
new faction overrides triangle  
Subfactions allowed.

# **9\. Timeline Validator**

Kiểm tra state machine.  
**Required Links**  
asset → era  
event → era  
character → timeline\_state  
Reject nếu:  
character state change without event  
weapon appears before invention  
faction exists before formation

# **10\. Visual Validator**

Kiểm tra identity drift.  
**Locked Elements**  
palette  
material families  
camera discipline  
composition logic  
character identity  
**Palette Lock**  
Allowed:  
\#FAFAFA  
\#0A0A0A  
\#E60000  
Controlled extensions:  
indigo  
moss  
cyan  
purple  
aged gold  
Reject nếu:  
random palette  
generic neon cyberpunk

# **11\. Validator Severity System**

Validator dùng drift severity:  
info  
warning  
fail  
critical\_fail  
**Severity Rules**  
critical\_fail → reject immediately  
fail → reject generation  
warning → allow but block canon promotion  
info → allow

# **12\. Validator Decision Engine**

Validator trả output chuẩn:  
validation\_result:

status: pass | pass\_with\_warnings | reject | critical\_reject

drift\_flags:  
\- palette\_drift  
\- character\_drift  
\- technology\_drift  
\- ontology\_drift

highest\_severity: info | warning | fail | critical\_fail

promotion\_blocked: true | false

recommended\_action:  
\- generate  
\- revise\_prompt  
\- reject\_generation

# **13\. Validator Rule Execution Order**

Luôn chạy theo thứ tự:  
Ontology  
↓  
Technology  
↓  
Character  
↓  
Faction  
↓  
Timeline  
↓  
Visual  
Nếu Ontology fail → stop immediately.

# **14\. Validator Pseudocode**

function validate(prompt):

 result \= {}

 ontology \= checkOntology(prompt)  
 if ontology.fail:  
     return reject("ontology violation")

 tech \= checkTechnology(prompt)  
 if tech.fail:  
     return reject("invalid technology")

 character \= checkCharacter(prompt)  
 if character.fail:  
     return reject("character drift")

 faction \= checkFaction(prompt)  
 if faction.fail:  
     return reject("faction worldview violation")

 timeline \= checkTimeline(prompt)  
 if timeline.fail:  
     return reject("timeline conflict")

 visual \= checkVisual(prompt)

 return compileValidationResult()

# **15\. Integration with Prompt Compiler**

Compiler gọi validator trước generation.  
compiled\_prompt  
↓  
validator.check()  
↓  
if pass → generate  
if reject → stop

# **16\. Post-Generation Validation**

Sau khi ảnh được tạo, validator chạy thêm:  
image\_classifier  
material\_detector  
palette\_analyzer  
pose\_analyzer  
Để phát hiện:  
idol drift  
fantasy drift  
palette drift  
material drift

# **17\. Asset Promotion Gate**

Validator cũng kiểm canon promotion.  
draft → validated\_soft  
validated\_soft → canon\_candidate  
canon\_candidate → hard\_canon\_locked  
Promotion chỉ xảy ra nếu:  
validator\_status \== pass  
drift\_flags \== none

# **18\. Validator Logs**

Mỗi run tạo log:  
validator\_run\_id  
compiled\_prompt\_id  
timestamp  
validator\_version  
rules\_checked  
violations  
status

# **19\. Validator Dataset**

Validator học từ:  
gold\_set  
silver\_set  
red\_flag\_set  
Gold set dùng làm **reference baseline**.

# **20\. Final Result**

Sau khi validator tồn tại:  
Mikage system sẽ có:  
Canon Constitution  
↓  
Canon Graph  
↓  
Prompt Compiler  
↓  
Canon Validator  
↓  
Generation  
↓  
Review  
↓  
Asset Index  
↓  
Archive  
Đây chính là **IP Operating System hoàn chỉnh**.