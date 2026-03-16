Cấu trúc dưới đây là **repo khởi động hoàn chỉnh**. Mục tiêu: clone → cài phụ thuộc → chạy ingest → ghi Neo4j → tạo log/archive.

---

# **1\. Cấu trúc repo**

mikage-ip-engine/  
├── README.md  
├── pyproject.toml  
├── requirements.txt  
├── .env.example  
├── config/  
│   ├── pipeline.config.json  
│   ├── graph.mapping.json  
│   ├── review\_thresholds.json  
│   └── benchmark\_thresholds.json  
├── data\_sources/  
│   ├── seed/  
│   │   ├── eras.seed.json  
│   │   ├── factions.seed.json  
│   │   ├── locations.seed.json  
│   │   ├── reference\_styles.seed.json  
│   │   ├── weapons.seed.json  
│   │   ├── characters.seed.json  
│   │   ├── presets.seed.json  
│   │   └── variants.seed.json  
│   ├── rules/  
│   │   └── validator.rulepack.json  
│   ├── compiler/  
│   │   ├── preset\_registry.json  
│   │   ├── variant\_registry.json  
│   │   ├── objective\_registry.json  
│   │   ├── negative\_profiles.json  
│   │   └── seed\_policies.json  
│   ├── assets/  
│   │   └── asset\_manifest.example.json  
│   ├── reviews/  
│   │   └── review\_batch.example.csv  
│   └── benchmark/  
│       └── benchmark\_manifest.example.json  
├── ingest/  
│   ├── \_\_init\_\_.py  
│   ├── runner.py  
│   ├── source\_registry.py  
│   ├── parsers.py  
│   ├── normalizers.py  
│   ├── schema\_validator.py  
│   ├── canon\_validator.py  
│   ├── relation\_resolver.py  
│   ├── graph\_writer.py  
│   ├── asset\_index\_writer.py  
│   ├── archive\_logger.py  
│   ├── benchmark\_engine.py  
│   ├── review\_engine.py  
│   ├── report\_builder.py  
│   └── types.py  
├── graph/  
│   └── cypher/  
│       ├── upsert\_character.cypher  
│       ├── upsert\_faction.cypher  
│       ├── upsert\_location.cypher  
│       ├── upsert\_era.cypher  
│       ├── upsert\_weapon.cypher  
│       ├── upsert\_reference\_style.cypher  
│       ├── upsert\_preset.cypher  
│       ├── upsert\_variant.cypher  
│       ├── upsert\_asset.cypher  
│       └── upsert\_review.cypher  
├── archive/  
│   ├── ingest\_logs/  
│   ├── rejected/  
│   └── snapshots/  
└── docs/  
   └── mikage\_admin\_operating\_manual.md  
---

# **2\. `requirements.txt`**

neo4j\>=5.16  
pydantic\>=2.6  
python-dotenv\>=1.0  
PyYAML\>=6.0  
orjson\>=3.9  
tqdm\>=4.66  
---

# **3\. `.env.example`**

NEO4J\_URI=bolt://localhost:7687  
NEO4J\_USER=neo4j  
NEO4J\_PASSWORD=neo4j\_password

MIKAGE\_ENV=local  
MIKAGE\_PROJECT=mikage  
---

# **4\. `pyproject.toml`**

\[project\]  
name \= "mikage-ip-engine"  
version \= "0.1.0"  
description \= "Canon-governed generative IP engine runtime for Mikage."  
requires-python \= "\>=3.10"

\[tool.black\]  
line-length \= 100  
---

# **5\. `README.md`**

\# Mikage IP Engine

Canon-governed generative IP engine runtime.

\#\# Setup

python \-m venv .venv   
source .venv/bin/activate   
pip install \-r requirements.txt

cp .env.example .env

\#\# Start Neo4j

docker run \-p7687:7687 \-p7474:7474 \-e NEO4J\_AUTH=neo4j/password neo4j:5

\#\# Run ingest

python \-m ingest.runner \--source ./data\_sources/seed/eras.seed.json \--type seed\_pack  
python \-m ingest.runner \--source ./data\_sources/seed/factions.seed.json \--type seed\_pack  
python \-m ingest.runner \--source ./data\_sources/seed/characters.seed.json \--type seed\_pack  
---

# **6\. Neo4j writer thực tế**

`ingest/graph_writer.py`

from neo4j import GraphDatabase  
import os  
from dotenv import load\_dotenv

load\_dotenv()

URI \= os.getenv("NEO4J\_URI")  
USER \= os.getenv("NEO4J\_USER")  
PASSWORD \= os.getenv("NEO4J\_PASSWORD")

driver \= GraphDatabase.driver(URI, auth=(USER, PASSWORD))

def write\_to\_graph(entity):  
   with driver.session() as session:  
       if entity.entity\_type \== "Character":  
           session.run(  
               """  
               MERGE (c:Character {character\_id: $id})  
               SET c \+= $props  
               """,  
               id=entity.entity\_id,  
               props=entity.payload  
           )  
---

# **7\. CLI ingest runner**

`ingest/runner.py` sẽ được gọi bằng CLI.

Ví dụ:

python \-m ingest.runner \\  
 \--source data\_sources/seed/characters.seed.json \\  
 \--type seed\_pack

Runner sẽ:

1. register source

2. parse file

3. normalize entities

4. schema validate

5. canon validate

6. resolve relations

7. write graph

8. update asset index

9. write archive log

---

# **8\. Seed ingest script**

Script tiện chạy toàn bộ seed:

`seed_ingest.sh`

python \-m ingest.runner \--source data\_sources/seed/eras.seed.json \--type seed\_pack  
python \-m ingest.runner \--source data\_sources/seed/factions.seed.json \--type seed\_pack  
python \-m ingest.runner \--source data\_sources/seed/locations.seed.json \--type seed\_pack  
python \-m ingest.runner \--source data\_sources/seed/reference\_styles.seed.json \--type seed\_pack  
python \-m ingest.runner \--source data\_sources/seed/weapons.seed.json \--type seed\_pack  
python \-m ingest.runner \--source data\_sources/seed/characters.seed.json \--type seed\_pack  
python \-m ingest.runner \--source data\_sources/seed/presets.seed.json \--type seed\_pack  
python \-m ingest.runner \--source data\_sources/seed/variants.seed.json \--type seed\_pack  
---

# **9\. Asset ingest example**

python \-m ingest.runner \\  
 \--source data\_sources/assets/asset\_manifest.example.json \\  
 \--type asset\_manifest

Sau ingest:

Neo4j sẽ có node:

Character  
Faction  
Location  
Era  
WeaponSystem  
ReferenceStyle  
PromptPreset  
PromptVariant  
Asset  
Review

và edge:

BELONGS\_TO  
IN\_ERA  
GENERATED\_FROM  
DERIVED\_FROM  
REFERENCES\_STYLE  
HAS\_REVIEW  
---

# **10\. Archive log example**

`archive/ingest_logs/ingest_xxx.json`

{  
 "timestamp": "2026-03-14T11:02:01Z",  
 "status": "completed",  
 "summary": {  
   "received": 10,  
   "schema\_pass": 10,  
   "canon\_pass": 10,  
   "written\_to\_graph": 10,  
   "rejected": 0  
 }  
}  
---

# **11\. Khi repo chạy được**

Hệ Mikage sẽ có:

Neo4j Canon Graph  
Prompt Compiler  
Validator  
Asset Benchmark  
Review Governance  
Ingestion Pipeline  
Admin Operating SOP

Tức là:

**IP Operating System chạy thật.**

