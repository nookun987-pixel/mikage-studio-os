## **1\) Cấu trúc thư mục triển khai**

mikage\_runtime/  
├── config/  
│   ├── pipeline.config.json  
│   ├── graph.mapping.json  
│   ├── review\_thresholds.json  
│   └── benchmark\_thresholds.json  
├── data\_sources/  
│   ├── seed/  
│   ├── rules/  
│   ├── compiler/  
│   ├── assets/  
│   ├── reviews/  
│   └── benchmark/  
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
├── archive/  
│   ├── ingest\_logs/  
│   ├── rejected/  
│   └── snapshots/  
└── graph/  
   └── cypher/  
       ├── upsert\_character.cypher  
       ├── upsert\_faction.cypher  
       ├── upsert\_location.cypher  
       ├── upsert\_era.cypher  
       ├── upsert\_weapon.cypher  
       ├── upsert\_reference\_style.cypher  
       ├── upsert\_preset.cypher  
       ├── upsert\_variant.cypher  
       ├── upsert\_asset.cypher  
       └── upsert\_review.cypher  
---

# **2\) `config/pipeline.config.json`**

{  
 "project": "mikage",  
 "pipeline\_version": "1.0.0",  
 "environment": "studio\_local",  
 "paths": {  
   "archive\_logs": "./archive/ingest\_logs",  
   "archive\_rejected": "./archive/rejected",  
   "archive\_snapshots": "./archive/snapshots"  
 },  
 "policies": {  
   "reject\_on\_schema\_fail": true,  
   "reject\_on\_canon\_fail": true,  
   "reject\_on\_critical\_fail": true,  
   "allow\_override": false,  
   "allow\_partial\_success": true,  
   "require\_lineage\_for\_assets": true,  
   "require\_review\_for\_promotion": true,  
   "require\_benchmark\_for\_hardcanon": true  
 },  
 "supported\_source\_types": \[  
   "seed\_pack",  
   "rule\_pack",  
   "compiler\_pack",  
   "asset\_manifest",  
   "review\_batch",  
   "benchmark\_batch"  
 \],  
 "supported\_file\_formats": \[  
   ".json",  
   ".jsonl",  
   ".yaml",  
   ".yml",  
   ".csv"  
 \]  
}  
---

# **3\) `config/graph.mapping.json`**

{  
 "node\_labels": {  
   "Character": "Character",  
   "Faction": "Faction",  
   "Location": "Location",  
   "Era": "Era",  
   "WeaponSystem": "WeaponSystem",  
   "Rule": "Rule",  
   "ReferenceStyle": "ReferenceStyle",  
   "PromptPreset": "PromptPreset",  
   "PromptVariant": "PromptVariant",  
   "Asset": "Asset",  
   "Review": "Review",  
   "Event": "Event"  
 },  
 "edge\_types": {  
   "character\_to\_faction": "BELONGS\_TO",  
   "character\_to\_era": "IN\_ERA",  
   "character\_to\_weapon": "USES\_WEAPON",  
   "character\_to\_location": "LOCATED\_IN",  
   "entity\_to\_rule": "CONSTRAINED\_BY\_RULE",  
   "preset\_to\_reference\_style": "GENERATED\_FROM",  
   "asset\_to\_preset": "GENERATED\_FROM",  
   "asset\_to\_variant": "DERIVED\_FROM",  
   "asset\_to\_reference\_style": "REFERENCES\_STYLE",  
   "asset\_to\_review": "HAS\_REVIEW",  
   "entity\_to\_benchmark": "BENCHMARK\_LAYER"  
 }  
}  
---

# **4\) `config/review_thresholds.json`**

{  
 "score\_ranges": {  
   "min": 0.0,  
   "max": 1.0  
 },  
 "classification\_thresholds": {  
   "reject\_if\_red\_flag\_similarity\_gte": 0.25,  
   "usable\_asset\_min\_gold\_similarity": 0.50,  
   "canon\_candidate\_min\_gold\_similarity": 0.75,  
   "hard\_canon\_min\_gold\_similarity": 0.82  
 },  
 "minimum\_review\_scores": {  
   "soul\_fidelity": 0.75,  
   "canon\_integrity": 0.80,  
   "material\_integrity": 0.75,  
   "damage\_language": 0.70,  
   "tech\_plausibility": 0.75,  
   "composition\_quality": 0.75  
 }  
}  
---

# **5\) `config/benchmark_thresholds.json`**

{  
 "layers": \[  
   "gold\_set",  
   "silver\_set",  
   "red\_flag\_set"  
 \],  
 "policies": {  
   "gold\_anchor\_required\_for\_hardcanon": true,  
   "red\_flag\_reject\_threshold": 0.25,  
   "gold\_candidate\_threshold": 0.75,  
   "silver\_useful\_threshold": 0.60  
 }  
}  
---

# **6\) `ingest/types.py`**

from \_\_future\_\_ import annotations

from dataclasses import dataclass, field  
from typing import Any, Dict, List, Optional

@dataclass  
class SourceRecord:  
   source\_id: str  
   source\_path: str  
   source\_type: str  
   checksum\_sha256: str  
   ingest\_status: str  
   created\_at: str

@dataclass  
class NormalizedEntity:  
   entity\_type: str  
   entity\_id: str  
   payload: Dict\[str, Any\]  
   source\_id: str  
   source\_path: str

@dataclass  
class ValidationFinding:  
   rule\_id: str  
   severity: str  
   status: str  
   message: str  
   resolution\_hint: Optional\[str\] \= None

@dataclass  
class ValidationResult:  
   entity\_id: str  
   entity\_type: str  
   result: str  
   summary: Dict\[str, int\]  
   findings: List\[ValidationFinding\] \= field(default\_factory=list)

@dataclass  
class RelationResolutionResult:  
   entity\_id: str  
   passed: bool  
   missing\_references: List\[str\] \= field(default\_factory=list)

@dataclass  
class IngestEntityResult:  
   entity\_id: str  
   entity\_type: str  
   stage: str  
   status: str  
   reason: Optional\[str\] \= None

@dataclass  
class IngestRunReport:  
   ingest\_run\_id: str  
   source\_id: str  
   status: str  
   summary: Dict\[str, int\]  
   rejections: List\[Dict\[str, Any\]\]  
---

# **7\) `ingest/source_registry.py`**

from \_\_future\_\_ import annotations

import hashlib  
import os  
from datetime import datetime, timezone

from .types import SourceRecord

def sha256\_file(path: str) \-\> str:  
   hasher \= hashlib.sha256()  
   with open(path, "rb") as f:  
       for chunk in iter(lambda: f.read(8192), b""):  
           hasher.update(chunk)  
   return hasher.hexdigest()

def register\_source(source\_path: str, source\_type: str) \-\> SourceRecord:  
   checksum \= sha256\_file(source\_path)  
   source\_id \= f"src\_{checksum\[:12\]}"  
   return SourceRecord(  
       source\_id=source\_id,  
       source\_path=os.path.abspath(source\_path),  
       source\_type=source\_type,  
       checksum\_sha256=checksum,  
       ingest\_status="registered",  
       created\_at=datetime.now(timezone.utc).isoformat()  
   )  
---

# **8\) `ingest/parsers.py`**

from \_\_future\_\_ import annotations

import csv  
import json  
from pathlib import Path  
from typing import Any, Dict, List

try:  
   import yaml  
except ImportError:  
   yaml \= None

def parse\_file(path: str) \-\> Any:  
   ext \= Path(path).suffix.lower()

   if ext \== ".json":  
       with open(path, "r", encoding="utf-8") as f:  
           return json.load(f)

   if ext \== ".jsonl":  
       rows: List\[Dict\[str, Any\]\] \= \[\]  
       with open(path, "r", encoding="utf-8") as f:  
           for line in f:  
               line \= line.strip()  
               if line:  
                   rows.append(json.loads(line))  
       return rows

   if ext in {".yaml", ".yml"}:  
       if yaml is None:  
           raise RuntimeError("PyYAML is not installed.")  
       with open(path, "r", encoding="utf-8") as f:  
           return yaml.safe\_load(f)

   if ext \== ".csv":  
       with open(path, "r", encoding="utf-8-sig") as f:  
           return list(csv.DictReader(f))

   raise ValueError(f"Unsupported file extension: {ext}")  
---

# **9\) `ingest/normalizers.py`**

from \_\_future\_\_ import annotations

from typing import Any, Dict, List

from .types import NormalizedEntity

ENTITY\_KEY\_MAP \= {  
   "Character": ("characters", "character\_id"),  
   "Faction": ("factions", "faction\_id"),  
   "Location": ("locations", "location\_id"),  
   "Era": ("eras", "era\_id"),  
   "WeaponSystem": ("weapons", "weapon\_id"),  
   "Rule": ("rules", "rule\_id"),  
   "ReferenceStyle": ("reference\_styles", "reference\_style\_id"),  
   "PromptPreset": ("presets", "preset\_id"),  
   "PromptVariant": ("variants", "variant\_id"),  
   "Asset": ("assets", "asset\_id"),  
   "Review": ("reviews", "review\_id"),  
   "Event": ("events", "event\_id")  
}

def normalize\_seed\_document(doc: Dict\[str, Any\], source\_id: str, source\_path: str) \-\> List\[NormalizedEntity\]:  
   entity\_type \= doc.get("entity\_type")  
   if entity\_type not in ENTITY\_KEY\_MAP:  
       raise ValueError(f"Unsupported entity\_type: {entity\_type}")

   collection\_key, id\_key \= ENTITY\_KEY\_MAP\[entity\_type\]  
   raw\_entities \= doc.get(collection\_key, \[\])  
   normalized: List\[NormalizedEntity\] \= \[\]

   for item in raw\_entities:  
       entity\_id \= item.get(id\_key)  
       if not entity\_id:  
           raise ValueError(f"Missing {id\_key} in {entity\_type}")

       if "status" not in item:  
           item\["status"\] \= "active"

       normalized.append(  
           NormalizedEntity(  
               entity\_type=entity\_type,  
               entity\_id=entity\_id,  
               payload=item,  
               source\_id=source\_id,  
               source\_path=source\_path,  
           )  
       )

   return normalized  
---

# **10\) `ingest/schema_validator.py`**

from \_\_future\_\_ import annotations

from typing import Dict, List, Tuple

from .types import NormalizedEntity

REQUIRED\_FIELDS \= {  
   "Character": \["character\_id", "name", "core\_truth", "faction\_id", "era\_id", "canon\_state", "status"\],  
   "Faction": \["faction\_id", "name", "doctrine", "philosophical\_axes", "visual\_grammar", "canon\_state", "status"\],  
   "Location": \["location\_id", "name", "era\_id", "canon\_state", "status"\],  
   "Era": \["era\_id", "name", "sequence\_index", "canon\_state", "status"\],  
   "WeaponSystem": \["weapon\_id", "name", "technology", "canon\_state", "status"\],  
   "ReferenceStyle": \["reference\_style\_id", "name", "palette", "canon\_state", "status"\],  
   "PromptPreset": \["preset\_id", "name", "reference\_style\_id", "negative\_profile\_ids", "seed\_policy\_id", "canon\_state", "status"\],  
   "PromptVariant": \["variant\_id", "name", "applies\_to\_presets", "delta\_profile", "canon\_state", "status"\],  
   "Rule": \["rule\_id", "name", "layer", "severity", "canon\_state", "status"\]  
}

def validate\_schema(entity: NormalizedEntity) \-\> Tuple\[bool, List\[str\]\]:  
   payload \= entity.payload  
   required \= REQUIRED\_FIELDS.get(entity.entity\_type, \[\])  
   errors: List\[str\] \= \[\]

   for field in required:  
       if field not in payload or payload\[field\] is None:  
           errors.append(f"Missing required field: {field}")

   if entity.entity\_type \== "PromptVariant":  
       if "reference\_style\_id" in payload or "visual\_defaults" in payload:  
           errors.append("PromptVariant contains preset-layer fields.")

   if entity.entity\_type \== "WeaponSystem":  
       technology \= payload.get("technology", {})  
       for k in \["energy\_source", "cost\_model", "observable\_trace"\]:  
           if k not in technology or technology\[k\] is None:  
               errors.append(f"WeaponSystem.technology missing: {k}")

   return (len(errors) \== 0, errors)  
---

# **11\) `ingest/canon_validator.py`**

from \_\_future\_\_ import annotations

from typing import Dict, List

from .types import NormalizedEntity, ValidationFinding, ValidationResult

def validate\_canon(entity: NormalizedEntity) \-\> ValidationResult:  
   findings: List\[ValidationFinding\] \= \[\]  
   payload \= entity.payload

   \# Minimal executable rules for v1 runtime skeleton.  
   if entity.entity\_type \== "Character":  
       if not payload.get("core\_truth"):  
           findings.append(  
               ValidationFinding(  
                   rule\_id="val\_character\_core\_truth\_required",  
                   severity="critical\_fail",  
                   status="fail",  
                   message="Character has no locked core truth.",  
                   resolution\_hint="Define non-negotiable internal truth."  
               )  
           )

   if entity.entity\_type \== "WeaponSystem":  
       technology \= payload.get("technology", {})  
       if not technology.get("energy\_source"):  
           findings.append(  
               ValidationFinding(  
                   rule\_id="val\_technology\_energy\_source\_required",  
                   severity="critical\_fail",  
                   status="fail",  
                   message="No energy source defined.",  
                   resolution\_hint="Specify energy source."  
               )  
           )  
       if technology.get("explanation\_style") \== "mystical\_shortcut":  
           findings.append(  
               ValidationFinding(  
                   rule\_id="val\_ontology\_no\_magic\_tech",  
                   severity="critical\_fail",  
                   status="fail",  
                   message="Technology logic collapses into mystical shortcut.",  
                   resolution\_hint="Use material/system explanation."  
               )  
           )

   if entity.entity\_type in {"Character", "Faction", "ReferenceStyle", "PromptPreset"}:  
       palette \= (  
           payload.get("signature\_palette")  
           or payload.get("palette")  
           or payload.get("visual\_grammar", {}).get("palette")  
           or payload.get("visual\_defaults", {}).get("palette\_anchor")  
           or \[\]  
       )  
       palette\_set \= set(palette)  
       if "\#FAFAFA" not in palette\_set or "\#0A0A0A" not in palette\_set:  
           findings.append(  
               ValidationFinding(  
                   rule\_id="val\_visual\_palette\_lock",  
                   severity="fail",  
                   status="fail",  
                   message="Core palette anchors missing.",  
                   resolution\_hint="Restore porcelain white and void black."  
               )  
           )

   summary \= {"info": 0, "warning": 0, "fail": 0, "critical\_fail": 0}  
   for f in findings:  
       summary\[f.severity\] \+= 1

   result \= "pass"  
   if summary\["critical\_fail"\] \> 0 or summary\["fail"\] \> 0:  
       result \= "reject"

   return ValidationResult(  
       entity\_id=entity.entity\_id,  
       entity\_type=entity.entity\_type,  
       result=result,  
       summary=summary,  
       findings=findings  
   )  
---

# **12\) `ingest/relation_resolver.py`**

from \_\_future\_\_ import annotations

from typing import Dict, List, Set

from .types import NormalizedEntity, RelationResolutionResult

def resolve\_relations(entity: NormalizedEntity, existing\_ids: Dict\[str, Set\[str\]\]) \-\> RelationResolutionResult:  
   missing: List\[str\] \= \[\]  
   payload \= entity.payload

   relation\_checks \= \[\]

   if entity.entity\_type \== "Character":  
       relation\_checks.extend(\[  
           ("Faction", payload.get("faction\_id")),  
           ("Era", payload.get("era\_id"))  
       \])

   if entity.entity\_type \== "Location":  
       relation\_checks.append(("Era", payload.get("era\_id")))

   if entity.entity\_type \== "PromptPreset":  
       relation\_checks.append(("ReferenceStyle", payload.get("reference\_style\_id")))

   if entity.entity\_type \== "PromptVariant":  
       for preset\_id in payload.get("applies\_to\_presets", \[\]):  
           relation\_checks.append(("PromptPreset", preset\_id))

   for target\_type, target\_id in relation\_checks:  
       if target\_id and target\_id not in existing\_ids.get(target\_type, set()):  
           missing.append(f"{target\_type}:{target\_id}")

   return RelationResolutionResult(  
       entity\_id=entity.entity\_id,  
       passed=len(missing) \== 0,  
       missing\_references=missing  
   )  
---

# **13\) `ingest/graph_writer.py`**

from \_\_future\_\_ import annotations

from typing import Any

from .types import NormalizedEntity

def write\_to\_graph(entity: NormalizedEntity) \-\> None:  
   \# Stub for Neo4j driver integration.  
   \# Replace with actual neo4j.Session.run(...) calls.  
   print(f"\[GRAPH\_WRITE\] {entity.entity\_type}::{entity.entity\_id}")  
---

# **14\) `ingest/asset_index_writer.py`**

from \_\_future\_\_ import annotations

from .types import NormalizedEntity

def write\_asset\_index(entity: NormalizedEntity) \-\> None:  
   if entity.entity\_type \!= "Asset":  
       return  
   print(f"\[ASSET\_INDEX\] {entity.entity\_id}")  
---

# **15\) `ingest/archive_logger.py`**

from \_\_future\_\_ import annotations

import json  
import os  
from datetime import datetime, timezone  
from typing import Any, Dict

def write\_archive\_log(base\_dir: str, ingest\_run\_id: str, payload: Dict\[str, Any\]) \-\> str:  
   os.makedirs(base\_dir, exist\_ok=True)  
   path \= os.path.join(base\_dir, f"{ingest\_run\_id}.json")  
   with open(path, "w", encoding="utf-8") as f:  
       json.dump(payload, f, ensure\_ascii=False, indent=2)  
   return path

def utc\_now\_iso() \-\> str:  
   return datetime.now(timezone.utc).isoformat()  
---

# **16\) `ingest/benchmark_engine.py`**

from \_\_future\_\_ import annotations

from typing import Dict

def compare\_to\_benchmark(asset\_payload: Dict) \-\> Dict\[str, float\]:  
   \# Placeholder scoring model.  
   \# Replace later with CLIP/embedding/image-feature similarity.  
   return {  
       "gold\_similarity": asset\_payload.get("benchmark\_mock", {}).get("gold\_similarity", 0.0),  
       "silver\_similarity": asset\_payload.get("benchmark\_mock", {}).get("silver\_similarity", 0.0),  
       "red\_flag\_similarity": asset\_payload.get("benchmark\_mock", {}).get("red\_flag\_similarity", 0.0)  
   }  
---

# **17\) `ingest/review_engine.py`**

from \_\_future\_\_ import annotations

from typing import Dict

def classify\_asset(benchmark: Dict\[str, float\], validator\_status: str, lineage\_complete: bool) \-\> str:  
   if validator\_status \!= "passed":  
       return "reject"  
   if not lineage\_complete:  
       return "reject"  
   if benchmark\["red\_flag\_similarity"\] \>= 0.25:  
       return "reject"  
   if benchmark\["gold\_similarity"\] \>= 0.82:  
       return "hard\_canon\_locked"  
   if benchmark\["gold\_similarity"\] \>= 0.75:  
       return "canon\_candidate"  
   if benchmark\["gold\_similarity"\] \>= 0.50:  
       return "usable\_asset"  
   return "interesting\_but\_non\_canon"  
---

# **18\) `ingest/report_builder.py`**

from \_\_future\_\_ import annotations

from typing import Any, Dict, List

from .types import IngestRunReport

def build\_report(  
   ingest\_run\_id: str,  
   source\_id: str,  
   received: int,  
   schema\_pass: int,  
   canon\_pass: int,  
   written\_to\_graph: int,  
   rejections: List\[Dict\[str, Any\]\]  
) \-\> IngestRunReport:  
   status \= "completed"  
   if rejections and written\_to\_graph \> 0:  
       status \= "partial\_success"  
   elif rejections and written\_to\_graph \== 0:  
       status \= "rejected"

   return IngestRunReport(  
       ingest\_run\_id=ingest\_run\_id,  
       source\_id=source\_id,  
       status=status,  
       summary={  
           "received": received,  
           "schema\_pass": schema\_pass,  
           "canon\_pass": canon\_pass,  
           "written\_to\_graph": written\_to\_graph,  
           "rejected": len(rejections)  
       },  
       rejections=rejections  
   )  
---

# **19\) `ingest/runner.py`**

from \_\_future\_\_ import annotations

import json  
import uuid  
from pathlib import Path  
from typing import Dict, List, Set

from .archive\_logger import utc\_now\_iso, write\_archive\_log  
from .asset\_index\_writer import write\_asset\_index  
from .canon\_validator import validate\_canon  
from .graph\_writer import write\_to\_graph  
from .normalizers import normalize\_seed\_document  
from .parsers import parse\_file  
from .relation\_resolver import resolve\_relations  
from .report\_builder import build\_report  
from .schema\_validator import validate\_schema  
from .source\_registry import register\_source

def run\_ingest(source\_path: str, source\_type: str, archive\_dir: str \= "./archive/ingest\_logs") \-\> Dict:  
   source \= register\_source(source\_path, source\_type)  
   ingest\_run\_id \= f"ingest\_{uuid.uuid4().hex\[:12\]}"

   raw \= parse\_file(source\_path)  
   if not isinstance(raw, dict):  
       raise ValueError("Seed/rule/compiler ingest expects a dict root document.")

   normalized\_entities \= normalize\_seed\_document(raw, source.source\_id, source.source\_path)

   existing\_ids: Dict\[str, Set\[str\]\] \= {}  
   received \= len(normalized\_entities)  
   schema\_pass \= 0  
   canon\_pass \= 0  
   written\_to\_graph \= 0  
   rejections: List\[Dict\] \= \[\]

   for entity in normalized\_entities:  
       ok\_schema, schema\_errors \= validate\_schema(entity)  
       if not ok\_schema:  
           rejections.append({  
               "entity\_id": entity.entity\_id,  
               "stage": "schema\_validator",  
               "reason": "; ".join(schema\_errors)  
           })  
           continue

       schema\_pass \+= 1

       canon\_result \= validate\_canon(entity)  
       if canon\_result.result \!= "pass":  
           reasons \= "; ".join(\[f.message for f in canon\_result.findings if f.status \== "fail"\])  
           rejections.append({  
               "entity\_id": entity.entity\_id,  
               "stage": "canon\_validator",  
               "reason": reasons  
           })  
           continue

       canon\_pass \+= 1

       relation\_result \= resolve\_relations(entity, existing\_ids)  
       if not relation\_result.passed:  
           rejections.append({  
               "entity\_id": entity.entity\_id,  
               "stage": "relation\_resolver",  
               "reason": f"Missing refs: {relation\_result.missing\_references}"  
           })  
           continue

       write\_to\_graph(entity)  
       write\_asset\_index(entity)  
       written\_to\_graph \+= 1  
       existing\_ids.setdefault(entity.entity\_type, set()).add(entity.entity\_id)

   report \= build\_report(  
       ingest\_run\_id=ingest\_run\_id,  
       source\_id=source.source\_id,  
       received=received,  
       schema\_pass=schema\_pass,  
       canon\_pass=canon\_pass,  
       written\_to\_graph=written\_to\_graph,  
       rejections=rejections  
   )

   archive\_payload \= {  
       "timestamp": utc\_now\_iso(),  
       "source": source.\_\_dict\_\_,  
       "report": {  
           "ingest\_run\_id": report.ingest\_run\_id,  
           "source\_id": report.source\_id,  
           "status": report.status,  
           "summary": report.summary,  
           "rejections": report.rejections  
       }  
   }

   write\_archive\_log(archive\_dir, ingest\_run\_id, archive\_payload)  
   return archive\_payload

if \_\_name\_\_ \== "\_\_main\_\_":  
   import argparse

   parser \= argparse.ArgumentParser()  
   parser.add\_argument("--source", required=True, help="Path to source file")  
   parser.add\_argument("--type", required=True, help="Source type, e.g. seed\_pack")  
   args \= parser.parse\_args()

   result \= run\_ingest(args.source, args.type)  
   print(json.dumps(result, ensure\_ascii=False, indent=2))  
---

# **20\) Cypher mẫu thực chiến**

## **`graph/cypher/upsert_character.cypher`**

MERGE (c:Character {character\_id: $character\_id})  
SET c \+= $properties  
WITH c  
MATCH (f:Faction {faction\_id: $faction\_id})  
MERGE (c)-\[:BELONGS\_TO\]-\>(f)  
WITH c  
MATCH (e:Era {era\_id: $era\_id})  
MERGE (c)-\[:IN\_ERA\]-\>(e)  
RETURN c;

## **`graph/cypher/upsert_preset.cypher`**

MERGE (p:PromptPreset {preset\_id: $preset\_id})  
SET p \+= $properties  
WITH p  
MATCH (r:ReferenceStyle {reference\_style\_id: $reference\_style\_id})  
MERGE (p)-\[:GENERATED\_FROM\]-\>(r)  
RETURN p;

## **`graph/cypher/upsert_asset.cypher`**

MERGE (a:Asset {asset\_id: $asset\_id})  
SET a \+= $properties  
WITH a  
MATCH (p:PromptPreset {preset\_id: $preset\_id})  
MERGE (a)-\[:GENERATED\_FROM\]-\>(p)  
WITH a  
MATCH (v:PromptVariant {variant\_id: $variant\_id})  
MERGE (a)-\[:DERIVED\_FROM\]-\>(v)  
WITH a  
MATCH (r:ReferenceStyle {reference\_style\_id: $reference\_style\_id})  
MERGE (a)-\[:REFERENCES\_STYLE\]-\>(r)  
RETURN a;  
---

# **21\) Asset manifest chuẩn**

## **`data_sources/assets/asset_manifest.example.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "Asset",  
 "assets": \[  
   {  
     "asset\_id": "asset\_1023",  
     "status": "active",  
     "canon\_state": "draft",  
     "source\_prompt\_id": "prompt\_0001",  
     "preset\_id": "preset\_canon\_core",  
     "variant\_id": "variant\_rooftop\_storm\_advance",  
     "reference\_style\_id": "ref\_porcelain\_void",  
     "generator\_model": "gpt-image-1",  
     "file\_path": "assets/asset\_1023.png",  
     "hash": "sha256\_placeholder",  
     "created\_at": "2026-03-14T10:30:00Z",  
     "validator\_status": "passed",  
     "review\_status": "pending",  
     "benchmark\_mock": {  
       "gold\_similarity": 0.78,  
       "silver\_similarity": 0.71,  
       "red\_flag\_similarity": 0.05  
     }  
   }  
 \]  
}  
---

# **22\) Review batch chuẩn**

## **`data_sources/reviews/review_batch.example.csv`**

review\_id,asset\_id,reviewer,soul\_fidelity,canon\_integrity,visual\_attraction,faction\_readability,material\_integrity,damage\_language,tech\_plausibility,composition\_quality,validator\_status,lineage\_complete,reviewer\_notes  
review\_0001,asset\_1023,human\_reviewer,0.92,0.95,0.88,0.82,0.90,0.87,0.91,0.89,passed,true,"Strong identity preservation and clean material language."  
---

# **23\) Admin Operating Doc — file chính thức**

## **`mikage_admin_operating_manual.md`**

\# MIKAGE ADMIN OPERATING MANUAL v1

\#\# 1\. Core rule  
Không entity nào được vào canonical graph nếu chưa qua ingest pipeline.

\#\# 2\. Roles  
\- Canon Architect  
\- Lore Operator  
\- Visual Governor  
\- Data Operator  
\- Archive Custodian

\#\# 3\. Absolute laws  
\- Không override critical\_fail  
\- Không đổi ID cũ để sửa tên  
\- Không promote asset nếu thiếu lineage  
\- Variant phải là delta-only  
\- Hard canon cần benchmark compare \+ governance approval

\#\# 4\. SOP thêm Character  
1\. Tạo character\_id  
2\. Khóa core\_truth  
3\. Gán faction\_id  
4\. Gán era\_id  
5\. Chạy schema validate  
6\. Chạy canon validate  
7\. Resolve relation  
8\. Ingest graph  
9\. Review  
10\. Gán canon\_state

\#\# 5\. SOP thêm Faction  
1\. Tạo faction\_id  
2\. Viết doctrine rõ  
3\. Gán philosophical\_axes  
4\. Định nghĩa visual\_grammar  
5\. Gán home location  
6\. Validate  
7\. Ingest

\#\# 6\. SOP thêm WeaponSystem  
1\. Tạo weapon\_id  
2\. Gán owner  
3\. Định nghĩa energy\_source  
4\. Định nghĩa cost\_model  
5\. Định nghĩa observable\_trace  
6\. Validate  
7\. Ingest

\#\# 7\. SOP ingest Asset  
1\. Register asset  
2\. Parse metadata  
3\. Schema validate  
4\. Canon validate  
5\. Benchmark compare  
6\. Review  
7\. Classification  
8\. Archive  
9\. Promote nếu đạt

\#\# 8\. Classification  
\- reject  
\- interesting\_but\_non\_canon  
\- usable\_asset  
\- canon\_candidate  
\- hard\_canon\_locked

\#\# 9\. Promotion ladder  
draft \-\> validated\_soft \-\> canon\_candidate \-\> hard\_canon\_locked

\#\# 10\. Rollback  
Không xóa âm thầm.  
Dùng deprecated hoặc archived, log lý do, reindex dataset.

\#\# 11\. Conflict resolution  
Ưu tiên:  
1\. Constitution  
2\. hard\_canon\_locked  
3\. entity có lineage đầy đủ hơn  
4\. entity có benchmark support mạnh hơn  
5\. Canon Architect quyết định  
---

# **24\) Lệnh chạy mẫu**

python \-m ingest.runner \--source ./data\_sources/seed/characters.seed.json \--type seed\_pack  
python \-m ingest.runner \--source ./data\_sources/seed/factions.seed.json \--type seed\_pack  
python \-m ingest.runner \--source ./data\_sources/compiler/presets.seed.json \--type compiler\_pack  
python \-m ingest.runner \--source ./data\_sources/assets/asset\_manifest.example.json \--type asset\_manifest  
---

# **25\) Thứ tự chạy thực chiến**

1\. eras  
2\. rules  
3\. factions  
4\. locations  
5\. reference\_styles  
6\. weapons  
7\. characters  
8\. presets  
9\. variants  
10\. assets  
11\. reviews  
12\. benchmark labels  
---

# **26\) Definition of Done**

Mikage được coi là **đủ bộ engine vận hành** khi:

* seed files ingest pass

* relation resolve pass

* Neo4j upsert pass

* asset manifest ingest pass

* review \+ benchmark classification chạy được

* archive logs sinh ra đầy đủ

* admin manual được team dùng làm SOP thật

