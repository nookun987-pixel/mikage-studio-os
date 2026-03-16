Mục tiêu: một **project Python tối thiểu chạy thật** để điều phối pipeline.  
 Chạy local trước. Sau này mới mở rộng API/UI.

---

# **1\. Thư mục Project**

Tạo cấu trúc này:

mikage\_runtime/

orchestrator/  
   orchestrator.py  
   job\_manager.py  
   state\_machine.py  
   pipeline\_runner.py

steps/  
   step\_compile.py  
   step\_validate.py  
   step\_generate.py  
   step\_ingest.py  
   step\_archive.py

jobs/  
   job\_request.json

archive/  
   generated/  
   reports/

logs/  
   execution.log  
---

# **2\. Job Input**

File:

jobs/job\_request.json  
{  
 "job\_type": "cinematic\_frame",  
 "preset": "mikage\_cinematic\_portrait",  
 "variant": "storm\_rooftop\_action",  
 "character": "mikage",  
 "location": "megacity\_rooftop",  
 "era": "late\_entropy\_industrial\_age",  
 "reference\_style": "mikage\_core\_visual\_DNA"  
}  
---

# **3\. Orchestrator Entry**

File:

orchestrator/orchestrator.py  
import json  
from pipeline\_runner import run\_pipeline

def main():

   with open("jobs/job\_request.json") as f:  
       job \= json.load(f)

   result \= run\_pipeline(job)

   print("FINAL RESULT:")  
   print(result)

if \_\_name\_\_ \== "\_\_main\_\_":  
   main()  
---

# **4\. Pipeline Runner**

File:

orchestrator/pipeline\_runner.py  
from steps.step\_compile import compile\_prompt  
from steps.step\_validate import validate\_canon  
from steps.step\_generate import generate\_asset  
from steps.step\_ingest import ingest\_asset  
from steps.step\_archive import archive\_asset

def run\_pipeline(job):

   compiled \= compile\_prompt(job)

   validation \= validate\_canon(compiled)

   if validation\["status"\] \== "BLOCK":  
       return {"status": "BLOCKED", "reason": validation}

   image\_path \= generate\_asset(compiled)

   asset\_id \= ingest\_asset(image\_path, compiled)

   archive\_path \= archive\_asset(image\_path, asset\_id)

   return {  
       "status": "COMPLETED",  
       "asset\_id": asset\_id,  
       "archive\_path": archive\_path  
   }  
---

# **5\. Step Compile**

File:

steps/step\_compile.py  
def compile\_prompt(job):

   prompt \= f"""  
   Mikage cinematic scene.  
   preset: {job\['preset'\]}  
   variant: {job\['variant'\]}  
   character: {job\['character'\]}  
   location: {job\['location'\]}  
   era: {job\['era'\]}  
   """

   return {  
       "compiled\_prompt": prompt,  
       "negative\_prompt": "anime, kawaii, fantasy magic"  
   }  
---

# **6\. Step Validate**

File:

steps/step\_validate.py  
def validate\_canon(compiled):

   prompt \= compiled\["compiled\_prompt"\]

   if "magic" in prompt:  
       return {  
           "status": "BLOCK",  
           "reason": "magic detected"  
       }

   return {"status": "PASS"}  
---

# **7\. Step Generate (Mock Generator)**

File:

steps/step\_generate.py  
import os  
from datetime import datetime

def generate\_asset(compiled):

   filename \= f"generated\_{datetime.now().timestamp()}.txt"  
   path \= f"archive/generated/{filename}"

   with open(path, "w") as f:  
       f.write(compiled\["compiled\_prompt"\])

   return path

Bản đầu **chỉ tạo file** để chứng minh pipeline chạy.

Sau này thay bằng:

SDXL  
Flux  
DALL-E  
video model  
---

# **8\. Step Ingest**

File:

steps/step\_ingest.py  
import uuid

def ingest\_asset(path, compiled):

   asset\_id \= f"asset\_{uuid.uuid4().hex\[:8\]}"

   return asset\_id  
---

# **9\. Step Archive**

File:

steps/step\_archive.py  
import json

def archive\_asset(path, asset\_id):

   report \= {  
       "asset\_id": asset\_id,  
       "source\_file": path  
   }

   report\_path \= f"archive/reports/{asset\_id}.json"

   with open(report\_path, "w") as f:  
       json.dump(report, f, indent=2)

   return report\_path  
---

# **10\. Chạy Runtime**

Tại root project:

python orchestrator/orchestrator.py

Output ví dụ:

FINAL RESULT:  
{  
 "status": "COMPLETED",  
 "asset\_id": "asset\_3f2a1b9c",  
 "archive\_path": "archive/reports/asset\_3f2a1b9c.json"  
}

# **11\. Điều quan trọng nhất**

Khi chạy xong sẽ có:

archive/generated/xxx.txt  
archive/reports/asset\_xxx.json

Đây là **execution evidence đầu tiên**.

