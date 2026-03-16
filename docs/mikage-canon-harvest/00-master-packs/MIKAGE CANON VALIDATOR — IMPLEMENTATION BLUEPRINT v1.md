# **MIKAGE CANON VALIDATOR — IMPLEMENTATION BLUEPRINT v1**

## **1\. System Objective**

Canon Validator là **lớp kiểm soát tự động** giữa Prompt Compiler và Generation Engine.  
Mục tiêu:  
ngăn prompt phá canon  
ngăn asset drift  
ngăn technology trở thành magic  
giữ character identity ổn định  
giữ visual grammar nhất quán  
giữ timeline logic hợp lệ  
Validator phải hoạt động **không phụ thuộc con người** trong phần lớn trường hợp.

# **2\. System Architecture**

**Core components**  
Prompt Compiler  
↓  
Canon Validator  
↓  
Generation Engine  
↓  
Asset Analyzer  
↓  
Asset Index  
↓  
Archive  
**Validator dependency graph**  
Neo4j Canon Graph  
↓  
Rule Library  
↓  
Character Registry  
↓  
Faction Registry  
↓  
World Database  
↓  
Timeline Engine  
↓  
Technology Registry  
↓  
Visual Governance  
Validator đọc dữ liệu từ graph để kiểm canon.

# **3\. Technology Stack**

Recommended stack:  
**component**  
**tech**  
canon graph

# Neo4j

# validator runtime

# Python

# API layer

# FastAPI

# prompt compiler

# Python module

# image analysis

# OpenCV \+ CLIP

# storage

# Postgres \+ object storage

# queue

# Redis / RabbitMQ

# **4\. Graph Data Model (Neo4j)**

**Core nodes**  
Character  
Faction  
Location  
Era  
Event  
WeaponSystem  
TechnologySystem  
Rule  
VisualGrammar  
Palette  
MaterialFamily  
PromptPreset  
PromptVariant  
ReferenceStyle  
Asset  
CanonDecision

**Core relationships**  
(:Character)-\[:BELONGS\_TO\]-\>(:Faction)  
(:Character)-\[:USES\_WEAPON\]-\>(:WeaponSystem)  
(:Asset)-\[:GENERATED\_FROM\]-\>(:PromptVariant)  
(:PromptVariant)-\[:INHERITS\]-\>(:PromptPreset)  
(:PromptPreset)-\[:INHERITS\]-\>(:ReferenceStyle)

(:Character)-\[:CONSTRAINED\_BY\]-\>(:Rule)  
(:WeaponSystem)-\[:CONSTRAINED\_BY\]-\>(:Rule)

(:Event)-\[:IN\_ERA\]-\>(:Era)  
(:Location)-\[:CONTROLLED\_BY\]-\>(:Faction)

(:Asset)-\[:BENCHMARK\_LAYER\]-\>(:BenchmarkLayer)

# **5\. Canon Rule Library**

Rules phải lưu trong graph.  
Example:  
rule\_id: rule\_no\_free\_power  
name: No Free Power  
layer: ontology  
severity: critical\_fail  
test:  
 requires\_cost\_model: true  
Example:  
rule\_palette\_lock  
layer: visual  
severity: fail  
allowed\_palette:  
 - "\#FAFAFA"  
 - "\#0A0A0A"  
 - "\#E60000"

# **6\. Validator Engine Architecture**

Validator gồm **6 modules**:  
OntologyValidator  
TechnologyValidator  
CharacterValidator  
FactionValidator  
TimelineValidator  
VisualValidator

# **7\. Python Validator Structure**

Directory layout:  
canon\_validator/  
│  
├─ core/  
│  ├─ validator\_engine.py  
│  ├─ rule\_loader.py  
│  ├─ graph\_client.py  
│  
├─ validators/  
│  ├─ ontology\_validator.py  
│  ├─ technology\_validator.py  
│  ├─ character\_validator.py  
│  ├─ faction\_validator.py  
│  ├─ timeline\_validator.py  
│  ├─ visual\_validator.py  
│  
├─ image\_analysis/  
│  ├─ palette\_detector.py  
│  ├─ pose\_analyzer.py  
│  ├─ material\_detector.py  
│  
├─ models/  
│  ├─ validation\_result.py  
│  
└─ api/  
  ├─ validator\_api.py

# **8\. Graph Client**

Python client để query Neo4j.  
from neo4j import GraphDatabase

class GraphClient:

   def \_\_init\_\_(self, uri, user, password):  
       self.driver \= GraphDatabase.driver(uri, auth=(user,password))

   def get\_character(self, character\_id):  
       query \= """  
       MATCH (c:Character {character\_id:$id})  
       RETURN c  
       """  
       with self.driver.session() as session:  
           result \= session.run(query,id=character\_id)  
           return result.single()

# **9\. Validator Engine Core**

class CanonValidator:

   def \_\_init\_\_(self, graph):  
       self.graph \= graph

   def validate(self, prompt):

       result \= \[\]

       result.append(OntologyValidator().check(prompt))  
       result.append(TechnologyValidator(self.graph).check(prompt))  
       result.append(CharacterValidator(self.graph).check(prompt))  
       result.append(FactionValidator(self.graph).check(prompt))  
       result.append(TimelineValidator(self.graph).check(prompt))  
       result.append(VisualValidator(self.graph).check(prompt))

       return self.compile\_result(result)

# **10\. Ontology Validator**

class OntologyValidator:

   def check(self,prompt):

       if prompt.weapon and not prompt.weapon.cost\_model:  
           return fail("No Free Power")

       if prompt.weapon and not prompt.weapon.failure\_mode:  
           return fail("Missing failure mode")

       if prompt.effect\_without\_trace:  
           return fail("Power Leaves Trace rule violated")

       return pass\_result()

# **11\. Character Validator**

class CharacterValidator:

   def \_\_init\_\_(self,graph):  
       self.graph \= graph

   def check(self,prompt):

       for char\_id in prompt.characters:

           char \= self.graph.get\_character(char\_id)

           if "idol" in prompt.tags:  
               return critical("Mikage caricature drift")

           if prompt.palette not in char.allowed\_palette:  
               return fail("palette drift")

       return pass\_result()

# **12\. Technology Validator**

class TechnologyValidator:

   def \_\_init\_\_(self,graph):  
       self.graph \= graph

   def check(self,prompt):

       for tech in prompt.technology:

           if not tech.energy\_source:  
               return fail("missing energy source")

           if tech.behavior \== "telepathic":  
               return critical("fake magic")

       return pass\_result()

# **13\. Timeline Validator**

class TimelineValidator:

   def \_\_init\_\_(self,graph):  
       self.graph \= graph

   def check(self,prompt):

       era \= prompt.era

       if not era:  
           return fail("missing era")

       if prompt.event and prompt.event not in era.allowed\_events:  
           return fail("timeline conflict")

       return pass\_result()

# **14\. Visual Validator**

**Palette check**  
def palette\_check(colors):

   allowed \= \["\#FAFAFA","\#0A0A0A","\#E60000"\]

   for c in colors:  
       if c not in allowed:  
           return False

   return True  
**Composition check**  
if prompt.camera \== "shaky\_cam":  
   return fail("camera drift")

# **15\. Image Post-Generation Validator**

Sau khi ảnh generate:  
**Modules**  
palette\_analyzer  
pose\_analyzer  
material\_detector  
composition\_detector  
Example palette detector:  
def detect\_palette(image):

   colors \= extract\_dominant\_colors(image)

   return palette\_check(colors)

# **16\. Validation Output**

Validator trả JSON:  
{  
"status":"pass\_with\_warnings",  
"highest\_severity":"warning",  
"drift\_flags":\[  
  "composition\_warning"  
\],  
"promotion\_blocked":true,  
"recommended\_action":"revise\_prompt"  
}

# **17\. Integration with Prompt Compiler**

Compiler gọi validator:  
compiled\_prompt \= compiler.compile(input)

validation \= validator.validate(compiled\_prompt)

if validation.status in \["reject","critical\_reject"\]:  
   stop\_generation()  
else:  
   generate()

# **18\. Asset Index Integration**

Sau review:  
if validation.status \== "pass":  
   asset.canon\_status \= "validated\_soft"

if validation.status \== "pass\_with\_warnings":  
   asset.canon\_status \= "validated\_soft"

if validation.status \== "reject":  
   asset.canon\_status \= "rejected"

# **19\. Validator Logs**

Every run:  
{  
"validator\_run\_id":"val\_92182",  
"compiled\_prompt\_id":"cmp\_1183",  
"timestamp":"2026-03-14T09:32",  
"validator\_version":"1.0",  
"violations":\[  
  "palette\_drift"  
\]  
}

# **20\. Deployment Architecture**

Recommended microservice setup:  
Prompt Compiler Service  
↓  
Validator API  
↓  
Generation Worker  
↓  
Asset Analyzer Worker  
↓  
Asset Index Service  
↓  
Archive Storage  
Validator API example:  
POST /validate\_prompt  
POST /validate\_asset  
GET /rule\_library

# **21\. Resulting IP Engine**

Sau khi triển khai:  
Canon Constitution  
↓  
Canon Graph (Neo4j)  
↓  
Prompt Compiler  
↓  
Canon Validator  
↓  
Generation  
↓  
Post Analyzer  
↓  
Asset Index  
↓  
Archive  
↓  
Dataset  
Hệ thống này cho phép:  
tự kiểm canon  
tự phát hiện drift  
tự bảo vệ identity IP  
mở rộng universe mà không phá nền tảng