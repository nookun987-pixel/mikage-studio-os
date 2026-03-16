## **Scope**

Bản này bổ sung 3 runtime block còn thiếu:

1. **Embedding Index for Asset Similarity**

2. **Visual Drift Detector**

3. **Prompt Compiler API**

Mục tiêu: cắm trực tiếp vào codebase hiện tại, không đổi triết lý hệ, chỉ operationalize runtime.

---

# **0\. REPO EXPANSION**

mikage/  
├─ config/  
│  ├─ pipeline.config.json  
│  ├─ graph.mapping.json  
│  ├─ review\_thresholds.json  
│  ├─ benchmark\_thresholds.json  
│  ├─ embedding.config.json  
│  ├─ similarity.thresholds.json  
│  ├─ drift\_detector.config.json  
│  ├─ drift\_labels.json  
│  ├─ prompt\_api.config.json  
│  ├─ api\_error\_codes.json  
│  └─ storage.config.json  
│  
├─ data\_sources/  
│  ├─ seeds/  
│  ├─ manifests/  
│  └─ reviews/  
│  
├─ ingest/  
│  ├─ types.py  
│  ├─ source\_registry.py  
│  ├─ parsers.py  
│  ├─ normalizers.py  
│  ├─ schema\_validator.py  
│  ├─ canon\_validator.py  
│  ├─ relation\_resolver.py  
│  ├─ graph\_writer.py  
│  ├─ asset\_index\_writer.py  
│  ├─ archive\_logger.py  
│  ├─ benchmark\_engine.py  
│  ├─ review\_engine.py  
│  ├─ report\_builder.py  
│  └─ runner.py  
│  
├─ embeddings/  
│  ├─ encoder.py  
│  ├─ preprocess.py  
│  ├─ vector\_store.py  
│  ├─ similarity\_engine.py  
│  ├─ asset\_embed\_runner.py  
│  ├─ backfill\_runner.py  
│  └─ embedding\_report.py  
│  
├─ drift/  
│  ├─ label\_registry.py  
│  ├─ rules\_engine.py  
│  ├─ embedding\_drift.py  
│  ├─ decision\_engine.py  
│  ├─ false\_positive\_guard.py  
│  ├─ drift\_runner.py  
│  └─ drift\_report.py  
│  
├─ services/  
│  ├─ prompt\_api/  
│  │  ├─ app.py  
│  │  ├─ routes.py  
│  │  ├─ schemas.py  
│  │  ├─ compile\_service.py  
│  │  ├─ validation\_service.py  
│  │  ├─ lineage\_service.py  
│  │  ├─ graph\_client.py  
│  │  ├─ archive\_client.py  
│  │  ├─ error\_model.py  
│  │  └─ auth.py  
│  
├─ graph/  
│  └─ cypher/  
│     ├─ upsert\_character.cypher  
│     ├─ upsert\_prompt\_preset.cypher  
│     ├─ upsert\_asset.cypher  
│     ├─ upsert\_embedding.cypher  
│     ├─ upsert\_drift\_report.cypher  
│     └─ upsert\_compile\_request.cypher  
│  
├─ archive/  
│  ├─ raw/  
│  ├─ processed/  
│  ├─ embeddings/  
│  ├─ drift\_reports/  
│  └─ compile\_logs/  
│  
├─ docs/  
│  ├─ admin\_manual.md  
│  ├─ embedding\_index\_runtime.md  
│  ├─ drift\_detector\_runtime.md  
│  └─ prompt\_api\_runtime.md  
│  
├─ requirements.txt  
├─ pyproject.toml  
└─ README.md  
---

# **1\. EMBEDDING INDEX FOR ASSET SIMILARITY**

## **1.1 Runtime Objective**

Dùng embedding image-text space để:

* index toàn bộ `gold_set`, `silver_set`, `red_flag_set`

* index generated assets mới

* benchmark compare

* retrieval asset gần nhất

* candidate ranking cho review

* support drift detector và prompt feedback loop

---

## **1.2 Model Policy**

### **Supported models**

{  
 "supported\_models": \[  
   "openai/clip-vit-large-patch14",  
   "google/siglip-so400m-patch14-384",  
   "google/siglip-base-patch16-224"  
 \],  
 "default\_model": "google/siglip-so400m-patch14-384",  
 "fallback\_model": "openai/clip-vit-large-patch14"  
}

### **Model selection law**

* **SigLIP** \= default cho ranking và similarity ổn định

* **CLIP** \= fallback / compatibility / comparative diagnostics

* Chỉ 1 active production encoder tại một thời điểm

* Mọi vector phải lưu kèm `model_id`, `embedding_dim`, `preprocess_version`

---

## **1.3 Storage Model**

## **1.3.1 Vector store strategy**

Hỗ trợ 2 mode:

1. **Local FAISS**

2. **pgvector / external vector DB**

### **storage.config.json**

{  
 "vector\_backend": "faiss",  
 "faiss": {  
   "index\_type": "IVF\_FLAT",  
   "metric": "cosine",  
   "nlist": 256,  
   "probe": 16,  
   "persist\_path": "archive/embeddings/faiss\_asset.index",  
   "idmap\_path": "archive/embeddings/faiss\_asset\_ids.json"  
 },  
 "pgvector": {  
   "enabled": false,  
   "table": "asset\_embeddings",  
   "metric": "cosine"  
 }  
}  
---

## **1.3.2 Neo4j extension nodes**

### **New nodes**

* `EmbeddingIndex`

* `EmbeddingVector`

* `SimilarityMatch`

### **New relations**

* `(:Asset)-[:HAS_EMBEDDING]->(:EmbeddingVector)`

* `(:EmbeddingVector)-[:INDEXED_IN]->(:EmbeddingIndex)`

* `(:Asset)-[:SIMILAR_TO {score, layer, model_id}]->(:Asset)`

### **Asset embedding node schema**

{  
 "node": "EmbeddingVector",  
 "properties": {  
   "embedding\_id": "string",  
   "asset\_id": "string",  
   "model\_id": "string",  
   "embedding\_dim": "int",  
   "preprocess\_version": "string",  
   "vector\_checksum": "string",  
   "source\_type": "string",  
   "created\_at": "datetime",  
   "storage\_backend": "string",  
   "storage\_ref": "string"  
 }  
}

### **Similarity edge policy**

Chỉ ghi quan hệ `SIMILAR_TO` cho top-K quan trọng:

* top 5 gold matches

* top 5 silver matches

* top 5 red\_flag matches

* top 10 nearest neighbors nội bộ generated assets

Không ghi full dense graph.

---

## **1.4 Asset Similarity Labels**

### **Canon benchmark layers**

* `gold`

* `silver`

* `red_flag`

* `generated`

* `reference_style`

### **Similarity compare dimensions**

* `visual_identity_similarity`

* `composition_similarity`

* `palette_similarity`

* `silhouette_similarity`

* `materiality_similarity`

* `drift_proximity`

Lưu ý:

* embedding global không đủ để tách tất cả dim chuyên biệt

* production v1 dùng **global semantic-visual similarity**

* dim phụ là derived score từ metadata \+ review tags \+ drift score

---

## **1.5 Config Pack**

### **embedding.config.json**

{  
 "model\_id": "google/siglip-so400m-patch14-384",  
 "device": "cuda",  
 "batch\_size": 16,  
 "normalize\_vectors": true,  
 "preprocess\_version": "v1.0.0",  
 "image": {  
   "resize": 384,  
   "center\_crop": true,  
   "convert\_rgb": true  
 },  
 "text": {  
   "enabled": true,  
   "fields": \["title", "caption", "preset\_id", "variant\_id", "tags"\]  
 },  
 "fusion": {  
   "enabled": false,  
   "mode": "image\_only"  
 }  
}

### **similarity.thresholds.json**

{  
 "score\_metric": "cosine",  
 "top\_k": {  
   "gold": 5,  
   "silver": 5,  
   "red\_flag": 5,  
   "generated": 10  
 },  
 "thresholds": {  
   "gold\_strong\_match": 0.86,  
   "gold\_possible\_match": 0.80,  
   "silver\_strong\_match": 0.82,  
   "red\_flag\_alert": 0.83,  
   "red\_flag\_hard\_alert": 0.88,  
   "generated\_duplicate\_warning": 0.94  
 },  
 "ranking\_weights": {  
   "gold\_alignment": 0.45,  
   "silver\_alignment": 0.20,  
   "red\_flag\_penalty": 0.25,  
   "review\_quality\_bonus": 0.10  
 }  
}  
---

## **1.6 Asset Embedding Manifest Schema**

{  
 "$schema": "mikage.asset.embedding.manifest.v1",  
 "asset\_id": "asset\_000481",  
 "file\_path": "archive/processed/generated/asset\_000481.png",  
 "asset\_type": "image",  
 "benchmark\_layer": "generated",  
 "preset\_id": "portrait\_editorial",  
 "variant\_id": "mikage\_void\_01",  
 "objective\_id": "hero\_key\_visual",  
 "character\_ids": \["mikage"\],  
 "faction\_ids": \[\],  
 "location\_ids": \["void\_stage"\],  
 "style\_tags": \[  
   "porcelain",  
   "void\_black",  
   "crimson\_accent",  
   "restrained\_futurism"  
 \],  
 "review\_status": "pending",  
 "created\_at": "2026-03-14T15:00:00+07:00"  
}  
---

## **1.7 Pipeline Flow**

asset ingest complete  
→ asset manifest resolved  
→ image load \+ preprocess  
→ embedding encode  
→ vector normalize  
→ write vector backend  
→ write EmbeddingVector node  
→ run similarity search against benchmark partitions  
→ compute score bundle  
→ write SimilarityMatch report  
→ attach top matches to Asset  
→ pass downstream to review / drift  
---

## **1.8 Similarity Score Bundle Schema**

{  
 "$schema": "mikage.similarity.report.v1",  
 "report\_id": "sim\_000481",  
 "asset\_id": "asset\_000481",  
 "model\_id": "google/siglip-so400m-patch14-384",  
 "embedding\_id": "emb\_000481",  
 "score\_metric": "cosine",  
 "top\_matches": {  
   "gold": \[  
     {"asset\_id": "gold\_0012", "score": 0.89},  
     {"asset\_id": "gold\_0031", "score": 0.87}  
   \],  
   "silver": \[  
     {"asset\_id": "silver\_0022", "score": 0.84}  
   \],  
   "red\_flag": \[  
     {"asset\_id": "red\_0009", "score": 0.41}  
   \],  
   "generated": \[  
     {"asset\_id": "asset\_000441", "score": 0.95}  
   \]  
 },  
 "derived\_scores": {  
   "gold\_alignment": 0.89,  
   "silver\_alignment": 0.84,  
   "red\_flag\_proximity": 0.41,  
   "duplicate\_risk": 0.95  
 },  
 "decision\_hints": {  
   "benchmark\_fit": "strong",  
   "duplicate\_warning": true,  
   "review\_priority": "high"  
 },  
 "created\_at": "2026-03-14T15:01:20+07:00"  
}  
---

## **1.9 Scoring Policy**

## **1.9.1 Primary similarity logic**

For asset `A`:

* `gold_alignment = max(cosine(A, gold_i))`

* `silver_alignment = max(cosine(A, silver_i))`

* `red_flag_proximity = max(cosine(A, red_i))`

* `duplicate_risk = max(cosine(A, generated_i))`

## **1.9.2 Composite review rank**

review\_rank\_score \=  
 (gold\_alignment \* 0.45)  
\+ (silver\_alignment \* 0.20)  
\- (red\_flag\_proximity \* 0.25)  
\+ (review\_quality\_bonus \* 0.10)

### **review\_quality\_bonus**

Derived from:

* approved preset lineage

* approved variant lineage

* prior accepted assets same branch

* no severe validator hit

Range: `0.00 - 0.10`

---

## **1.10 Threshold Policy**

## **1.10.1 Acceptance hints**

if gold\_alignment \>= 0.86 and red\_flag\_proximity \< 0.70:  
   benchmark\_fit \= "strong"

elif gold\_alignment \>= 0.80 and red\_flag\_proximity \< 0.75:  
   benchmark\_fit \= "possible"

else:  
   benchmark\_fit \= "weak"

## **1.10.2 Duplicate warning**

if duplicate\_risk \>= 0.94:  
   duplicate\_warning \= true

## **1.10.3 Red flag escalation**

if red\_flag\_proximity \>= 0.88:  
   severity \= "critical"  
elif red\_flag\_proximity \>= 0.83:  
   severity \= "high"  
else:  
   severity \= "normal"  
---

## **1.11 Pseudo-code Runner**

\# embeddings/asset\_embed\_runner.py

from embeddings.encoder import load\_model, encode\_image  
from embeddings.preprocess import load\_image, preprocess\_image  
from embeddings.vector\_store import VectorStore  
from embeddings.similarity\_engine import search\_partitions  
from ingest.asset\_index\_writer import write\_similarity\_report  
from ingest.graph\_writer import write\_embedding\_node, write\_similarity\_edges

def run\_asset\_embedding(asset\_manifest: dict, cfg: dict, storage\_cfg: dict, threshold\_cfg: dict):  
   model \= load\_model(cfg\["model\_id"\], device=cfg\["device"\])  
   store \= VectorStore(storage\_cfg)

   image \= load\_image(asset\_manifest\["file\_path"\])  
   tensor \= preprocess\_image(image, cfg\["image"\])  
   vector \= encode\_image(model, tensor, normalize=cfg\["normalize\_vectors"\])

   embedding\_id \= f"emb\_{asset\_manifest\['asset\_id'\]}"  
   storage\_ref \= store.upsert\_vector(  
       vector\_id=embedding\_id,  
       vector=vector,  
       metadata={  
           "asset\_id": asset\_manifest\["asset\_id"\],  
           "benchmark\_layer": asset\_manifest\["benchmark\_layer"\],  
           "preset\_id": asset\_manifest\["preset\_id"\],  
           "variant\_id": asset\_manifest\["variant\_id"\]  
       }  
   )

   write\_embedding\_node(  
       asset\_id=asset\_manifest\["asset\_id"\],  
       embedding\_id=embedding\_id,  
       model\_id=cfg\["model\_id"\],  
       embedding\_dim=len(vector),  
       preprocess\_version=cfg\["preprocess\_version"\],  
       storage\_backend=storage\_cfg\["vector\_backend"\],  
       storage\_ref=storage\_ref  
   )

   matches \= search\_partitions(  
       store=store,  
       query\_vector=vector,  
       top\_k=threshold\_cfg\["top\_k"\],  
       partitions=\["gold", "silver", "red\_flag", "generated"\],  
       exclude\_asset\_id=asset\_manifest\["asset\_id"\]  
   )

   gold\_alignment \= max(\[m\["score"\] for m in matches\["gold"\]\], default=0.0)  
   silver\_alignment \= max(\[m\["score"\] for m in matches\["silver"\]\], default=0.0)  
   red\_flag\_proximity \= max(\[m\["score"\] for m in matches\["red\_flag"\]\], default=0.0)  
   duplicate\_risk \= max(\[m\["score"\] for m in matches\["generated"\]\], default=0.0)

   report \= {  
       "asset\_id": asset\_manifest\["asset\_id"\],  
       "embedding\_id": embedding\_id,  
       "model\_id": cfg\["model\_id"\],  
       "top\_matches": matches,  
       "derived\_scores": {  
           "gold\_alignment": gold\_alignment,  
           "silver\_alignment": silver\_alignment,  
           "red\_flag\_proximity": red\_flag\_proximity,  
           "duplicate\_risk": duplicate\_risk  
       }  
   }

   write\_similarity\_report(report)  
   write\_similarity\_edges(asset\_manifest\["asset\_id"\], matches, cfg\["model\_id"\])

   return report  
---

## **1.12 Vector Backfill Runner**

\# embeddings/backfill\_runner.py

def backfill\_all\_assets(asset\_manifests: list\[dict\], cfg: dict, storage\_cfg: dict, threshold\_cfg: dict):  
   results \= \[\]  
   for manifest in asset\_manifests:  
       result \= run\_asset\_embedding(manifest, cfg, storage\_cfg, threshold\_cfg)  
       results.append(result)  
   return results  
---

## **1.13 Integration Points**

### **Upstream**

* `ingest/runner.py`

* `review_engine.py`

* `benchmark_engine.py`

### **Downstream**

* `drift/drift_runner.py`

* `services/prompt_api/compile_service.py`

* `archive_logger.py`

### **Graph write points**

* on asset ingest complete

* on benchmark pack refresh

* on model re-embedding migration

---

# **2\. VISUAL DRIFT DETECTOR**

## **2.1 Runtime Objective**

Phát hiện drift theo 2 lớp:

1. **rule-based detector**

2. **embedding-based drift proximity**

Kết quả là score bundle \+ label bundle \+ decision severity.

---

## **2.2 Drift Classes**

### **Primary forbidden drift labels**

* `childish_anime_idol`

* `generic_neon_overload`

* `fantasy_magic_aesthetic`

* `soft_glamour_pastel`

* `pop_fashion_drift`

### **Secondary sublabels**

* `oversaturated_palette`

* `cute_face_proportion_bias`

* `idol_costume_bias`

* `glitter_spell_fx`

* `ornamental_magic_sigils`

* `fashion_runway_editorial_pop`

* `bubblegum_palette`

* `excessive_neon_bloom`

* `fantasy_weapon_glow`

* `decorative_nonfunctional_tech`

---

## **2.3 Detector Architecture**

Asset  
→ metadata load  
→ prompt lineage load  
→ similarity report load  
→ rule feature extraction  
→ embedding drift search  
→ false positive guard  
→ decision fusion  
→ severity map  
→ drift report  
→ canon gate / review queue  
---

## **2.4 Input Sources**

### **Detector inputs**

* asset image

* asset manifest

* compiled prompt lineage

* negative prompt lineage

* similarity report

* review tags

* preset / variant / objective metadata

---

## **2.5 Drift Label Registry**

### **drift\_labels.json**

{  
 "labels": \[  
   {  
     "label\_id": "childish\_anime\_idol",  
     "severity\_default": "high",  
     "rule\_weight": 0.55,  
     "embedding\_weight": 0.45,  
     "subsignals": \[  
       "cute\_face\_proportion\_bias",  
       "idol\_costume\_bias",  
       "bubblegum\_palette"  
     \]  
   },  
   {  
     "label\_id": "generic\_neon\_overload",  
     "severity\_default": "high",  
     "rule\_weight": 0.40,  
     "embedding\_weight": 0.60,  
     "subsignals": \[  
       "oversaturated\_palette",  
       "excessive\_neon\_bloom"  
     \]  
   },  
   {  
     "label\_id": "fantasy\_magic\_aesthetic",  
     "severity\_default": "critical",  
     "rule\_weight": 0.60,  
     "embedding\_weight": 0.40,  
     "subsignals": \[  
       "ornamental\_magic\_sigils",  
       "glitter\_spell\_fx",  
       "fantasy\_weapon\_glow"  
     \]  
   },  
   {  
     "label\_id": "soft\_glamour\_pastel",  
     "severity\_default": "medium",  
     "rule\_weight": 0.50,  
     "embedding\_weight": 0.50,  
     "subsignals": \[  
       "bubblegum\_palette",  
       "fashion\_runway\_editorial\_pop"  
     \]  
   },  
   {  
     "label\_id": "pop\_fashion\_drift",  
     "severity\_default": "medium",  
     "rule\_weight": 0.55,  
     "embedding\_weight": 0.45,  
     "subsignals": \[  
       "fashion\_runway\_editorial\_pop",  
       "idol\_costume\_bias"  
     \]  
   }  
 \]  
}  
---

## **2.6 Rule-based Features**

## **2.6.1 Metadata/prompt feature rules**

Phân tích:

* positive tokens

* negative tokens thiếu / không đủ

* override tokens

* preset mismatch

* variant mismatch

### **Example rule triggers**

{  
 "token\_rules": {  
   "childish\_anime\_idol": {  
     "positive\_hits": \["cute", "idol", "school uniform", "kawaii", "smile pose"\],  
     "negative\_missing": \["adult", "severe", "scarred elegance", "industrial materiality"\],  
     "boost\_per\_hit": 0.12  
   },  
   "generic\_neon\_overload": {  
     "positive\_hits": \["neon city", "glowing signs", "magenta blue", "cyberpunk street", "hologram overload"\],  
     "negative\_missing": \["restrained palette", "controlled highlights", "limited crimson"\],  
     "boost\_per\_hit": 0.08  
   },  
   "fantasy\_magic\_aesthetic": {  
     "positive\_hits": \["spell", "magic", "runes", "enchanted", "mystic aura", "sorceress"\],  
     "negative\_missing": \["hard sci-fi", "traceable power", "mechanical causality"\],  
     "boost\_per\_hit": 0.20  
   }  
 }  
}

## **2.6.2 Review-tag rules**

Nếu prior reviewers gắn tag:

* `too_anime`

* `too_neon`

* `fantasy_feel`

* `fashion_magazine_pop`

* `too_soft`

thì tăng prior risk.

## **2.6.3 Palette rules**

Từ ảnh thực:

* saturation mean

* magenta/cyan occupancy

* pastel occupancy

* bloom/highlight spread

### **Example**

if magenta\_cyan\_pixel\_ratio \> 0.32 and crimson\_ratio \< 0.04:  
   generic\_neon\_overload \+= 0.18

if pastel\_ratio \> 0.22:  
   soft\_glamour\_pastel \+= 0.20

## **2.6.4 Composition/material rules**

* thiếu black void contrast

* thiếu porcelain-white dominance

* thiếu damage/fracture cues

* xuất hiện ornamental glow không có cơ chế vật lý

---

## **2.7 Embedding-based Drift Logic**

## **2.7.1 Drift benchmark partitions**

Cần curate vector benchmark riêng:

* `drift_redset_childish_anime_idol`

* `drift_redset_generic_neon_overload`

* `drift_redset_fantasy_magic_aesthetic`

* `drift_redset_soft_glamour_pastel`

* `drift_redset_pop_fashion_drift`

Mỗi drift class:

* 50–300 representative assets

* reviewed and locked

* versioned

## **2.7.2 Drift proximity score**

drift\_embedding\_score(label) \= max cosine(query, drift\_redset\_label)

## **2.7.3 Canon anchor score**

Để tránh false positive, so cả với canon anchor:

canon\_anchor\_score \= max cosine(query, gold\_set)

Nếu drift cao nhưng canon anchor cũng rất cao, cần guard layer.

---

## **2.8 Decision Fusion**

### **Formula**

final\_drift\_score(label) \=  
 (rule\_score(label) \* rule\_weight(label))  
\+ (embedding\_score(label) \* embedding\_weight(label))  
\- (canon\_anchor\_score \* anchor\_guard\_weight)

### **Default guard**

{  
 "anchor\_guard\_weight": 0.20  
}  
---

## **2.9 Threshold Policy**

### **drift\_detector.config.json**

{  
 "anchor\_guard\_weight": 0.20,  
 "decision\_thresholds": {  
   "critical\_block": 0.82,  
   "high\_alert": 0.72,  
   "medium\_review": 0.58,  
   "low\_watch": 0.45  
 },  
 "false\_positive\_policy": {  
   "require\_dual\_signal\_for\_critical": true,  
   "require\_embedding\_min\_for\_block": 0.70,  
   "require\_rule\_min\_for\_block": 0.45  
 },  
 "label\_overrides": {  
   "fantasy\_magic\_aesthetic": {  
     "critical\_block": 0.78  
   },  
   "generic\_neon\_overload": {  
     "critical\_block": 0.84  
   }  
 }  
}

### **Decision mapping**

if final\_drift\_score \>= critical\_block and rule\_score \>= min\_rule and embedding\_score \>= min\_embedding:  
   decision \= BLOCK

elif final\_drift\_score \>= high\_alert:  
   decision \= ESCALATE\_REVIEW

elif final\_drift\_score \>= medium\_review:  
   decision \= REVIEW

else:  
   decision \= PASS  
---

## **2.10 False Positive Guard**

## **2.10.1 Guard cases**

Không block cứng nếu:

* neon xuất hiện nhưng vẫn palette constrained

* fashion editorial nhưng vẫn giữ porcelain/void/crimson discipline

* anime-like eye shape nhẹ do stylization nhưng không idol/cute grammar

* glow tồn tại nhưng có tech trace / energy system / hard-sci-fi explanation

## **2.10.2 Guard rules**

if canon\_anchor\_score \>= 0.88 and gold\_alignment \>= 0.86:  
   downgrade one severity band

if final\_drift\_score high but no rule hit and only embedding hit:  
   cap at REVIEW

if fantasy score triggered but prompt lineage contains valid weapon-system energy language and no mystic tokens:  
   subtract 0.12  
---

## **2.11 Output Schema**

{  
 "$schema": "mikage.drift.report.v1",  
 "report\_id": "drift\_000481",  
 "asset\_id": "asset\_000481",  
 "model\_id": "google/siglip-so400m-patch14-384",  
 "canon\_anchor\_score": 0.87,  
 "labels": \[  
   {  
     "label\_id": "generic\_neon\_overload",  
     "rule\_score": 0.41,  
     "embedding\_score": 0.74,  
     "final\_score": 0.61,  
     "decision": "REVIEW",  
     "severity": "medium",  
     "signals": \[  
       "excessive\_neon\_bloom",  
       "oversaturated\_palette"  
     \]  
   }  
 \],  
 "global\_decision": "REVIEW",  
 "global\_severity": "medium",  
 "blocking\_labels": \[\],  
 "review\_notes": \[  
   "palette drift toward magenta/cyan dominance",  
   "crimson accent underrepresented",  
   "still close to canon anchor, not hard block"  
 \],  
 "created\_at": "2026-03-14T15:02:10+07:00"  
}  
---

## **2.12 Pseudo-code**

\# drift/drift\_runner.py

from drift.rules\_engine import compute\_rule\_scores  
from drift.embedding\_drift import compute\_embedding\_scores  
from drift.false\_positive\_guard import apply\_false\_positive\_guard  
from drift.decision\_engine import fuse\_scores, map\_decision  
from ingest.asset\_index\_writer import write\_drift\_report

def run\_drift\_detection(asset\_manifest, similarity\_report, compiled\_prompt, cfg, labels\_cfg):  
   rule\_scores \= compute\_rule\_scores(  
       asset\_manifest=asset\_manifest,  
       compiled\_prompt=compiled\_prompt,  
       similarity\_report=similarity\_report,  
       cfg=cfg  
   )

   embedding\_scores, canon\_anchor\_score \= compute\_embedding\_scores(  
       asset\_id=asset\_manifest\["asset\_id"\],  
       cfg=cfg  
   )

   fused \= \[\]  
   for label in labels\_cfg\["labels"\]:  
       label\_id \= label\["label\_id"\]  
       final\_score \= fuse\_scores(  
           rule\_score=rule\_scores.get(label\_id, 0.0),  
           embedding\_score=embedding\_scores.get(label\_id, 0.0),  
           canon\_anchor\_score=canon\_anchor\_score,  
           rule\_weight=label\["rule\_weight"\],  
           embedding\_weight=label\["embedding\_weight"\],  
           anchor\_guard\_weight=cfg\["anchor\_guard\_weight"\]  
       )

       decision \= map\_decision(  
           label\_id=label\_id,  
           final\_score=final\_score,  
           rule\_score=rule\_scores.get(label\_id, 0.0),  
           embedding\_score=embedding\_scores.get(label\_id, 0.0),  
           cfg=cfg  
       )

       fused.append({  
           "label\_id": label\_id,  
           "rule\_score": rule\_scores.get(label\_id, 0.0),  
           "embedding\_score": embedding\_scores.get(label\_id, 0.0),  
           "final\_score": final\_score,  
           "decision": decision  
       })

   fused \= apply\_false\_positive\_guard(  
       fused=fused,  
       canon\_anchor\_score=canon\_anchor\_score,  
       similarity\_report=similarity\_report,  
       compiled\_prompt=compiled\_prompt,  
       cfg=cfg  
   )

   global\_decision \= max(  
       \[x\["decision"\] for x in fused\],  
       key=lambda d: \["PASS", "REVIEW", "ESCALATE\_REVIEW", "BLOCK"\].index(d)  
   )

   report \= {  
       "asset\_id": asset\_manifest\["asset\_id"\],  
       "canon\_anchor\_score": canon\_anchor\_score,  
       "labels": fused,  
       "global\_decision": global\_decision  
   }

   write\_drift\_report(report)  
   return report  
---

## **2.13 Canon Gate Integration**

### **Gate policy**

* `BLOCK` → không promote, không ingest vào canon dataset

* `ESCALATE_REVIEW` → review thủ công bắt buộc

* `REVIEW` → cho vào pending lane

* `PASS` → cho tiếp sang review engine / candidate promote

### **Review priority bump**

if drift.global\_decision in \["BLOCK", "ESCALATE\_REVIEW"\]:  
   review\_priority \= "urgent"  
---

# **3\. PROMPT COMPILER API**

## **3.1 Runtime Objective**

Expose prompt compiler thành service thật để:

* compile prompt deterministic

* validate input contract

* resolve preset/variant/objective

* apply overrides có kiểm soát

* attach lineage metadata

* integrate validator / graph / archive

* log compile history

---

## **3.2 Service Scope**

### **Core responsibilities**

* resolve config registries

* fetch graph-linked metadata

* generate prompt package

* return negative prompt

* assign seed

* compute style weights

* record compile lineage

* archive request/response

### **Non-responsibilities**

* không trực tiếp generate image

* không trực tiếp promote canon

* không bypass validator

---

## **3.3 API Endpoints**

## **3.3.1 Health**

`GET /health`

Response:

{  
 "status": "ok",  
 "service": "mikage-prompt-api",  
 "version": "1.0.0"  
}

## **3.3.2 Compile**

`POST /v1/compile`

## **3.3.3 Validate-only**

`POST /v1/validate`

## **3.3.4 Registry lookup**

* `GET /v1/presets/{preset_id}`

* `GET /v1/variants/{variant_id}`

* `GET /v1/objectives/{objective_id}`

## **3.3.5 Compile history**

`GET /v1/compile/{compile_id}`

---

## **3.4 Request Schema**

{  
 "$schema": "mikage.prompt.compile.request.v1",  
 "preset\_id": "portrait\_editorial",  
 "variant\_id": "mikage\_void\_01",  
 "objective\_id": "hero\_key\_visual",  
 "overrides": {  
   "character\_ids": \["mikage"\],  
   "location\_ids": \["void\_stage"\],  
   "intensity": "high",  
   "camera": {  
     "shot\_type": "close\_up",  
     "lens": "85mm\_anamorphic"  
   },  
   "style\_bias": {  
     "porcelain\_purity": 1.0,  
     "industrial\_brutality": 0.65,  
     "crimson\_accent": 0.45  
   },  
   "seed": 48102219,  
   "append\_positive": \[  
     "sacred fracture restraint",  
     "museum-grade surface fidelity"  
   \],  
   "append\_negative": \[  
     "pastel fashion editorial",  
     "idol pose"  
   \]  
 },  
 "request\_meta": {  
   "requested\_by": "system",  
   "source": "admin\_panel"  
 }  
}  
---

## **3.5 Response Schema**

{  
 "$schema": "mikage.prompt.compile.response.v1",  
 "compile\_id": "cmp\_000481",  
 "status": "success",  
 "compiled\_prompt": "master prompt string ...",  
 "negative\_prompt": "negative prompt string ...",  
 "seed": 48102219,  
 "style\_weights": {  
   "porcelain\_purity": 1.0,  
   "void\_black\_contrast": 0.95,  
   "visceral\_crimson\_accent": 0.45,  
   "restrained\_futurism": 0.82,  
   "industrial\_brutality": 0.65,  
   "sacred\_fracture\_aesthetics": 0.76  
 },  
 "lineage": {  
   "preset\_id": "portrait\_editorial",  
   "variant\_id": "mikage\_void\_01",  
   "objective\_id": "hero\_key\_visual",  
   "seed\_policy": "deterministic\_override",  
   "preset\_version": "1.0.0",  
   "variant\_version": "1.0.2",  
   "objective\_version": "1.0.0",  
   "compiler\_version": "1.0.0"  
 },  
 "validation": {  
   "passed": true,  
   "violations": \[\]  
 },  
 "archive\_refs": {  
   "compile\_log\_path": "archive/compile\_logs/2026/03/14/cmp\_000481.json"  
 }  
}  
---

## **3.6 Validation-only Response**

{  
 "status": "valid",  
 "resolved": {  
   "preset\_id": "portrait\_editorial",  
   "variant\_id": "mikage\_void\_01",  
   "objective\_id": "hero\_key\_visual"  
 },  
 "violations": \[\],  
 "warnings": \[  
   "override style\_bias.crimson\_accent lower than preset baseline"  
 \]  
}  
---

## **3.7 Compile Flow**

request receive  
→ auth  
→ schema validate  
→ resolve preset\_id  
→ resolve variant\_id  
→ resolve objective\_id  
→ fetch graph-linked constraints  
→ merge preset \+ variant \+ objective  
→ apply seed policy  
→ apply override policy  
→ build positive prompt blocks  
→ build negative prompt blocks  
→ run validator preflight  
→ assemble style weights  
→ generate lineage metadata  
→ archive request/response  
→ optionally graph-write compile record  
→ return response  
---

## **3.8 Compile Logic Layers**

## **3.8.1 Base sources**

* `preset_registry.json`

* `variant_registry.json`

* `objective_registry.json`

* `negative_profiles.json`

* `seed_policies.json`

## **3.8.2 Graph enrichment**

Optional fetch from Neo4j:

* character truth constraints

* faction restrictions

* location grammar

* weapon-system causality cues

* banned pairings

* canon rules

## **3.8.3 Merge order**

preset  
→ variant  
→ objective  
→ graph constraints  
→ overrides  
→ validator prune  
→ final compile  
---

## **3.9 Override Policy**

### **Allowed override fields**

* `character_ids`

* `location_ids`

* `camera`

* `style_bias`

* `seed`

* `append_positive`

* `append_negative`

* `intensity`

### **Denied override fields**

* ontology class

* absolute invariants

* locked forbidden drift negatives

* banned rule removals

* canon constitution strings

### **Policy table**

{  
 "override\_policy": {  
   "allowed\_fields": \[  
     "character\_ids",  
     "location\_ids",  
     "camera",  
     "style\_bias",  
     "seed",  
     "append\_positive",  
     "append\_negative",  
     "intensity"  
   \],  
   "denied\_fields": \[  
     "ontology",  
     "absolute\_invariants",  
     "forbidden\_drifts",  
     "canon\_constitution"  
   \],  
   "style\_bias\_range": {  
     "min": 0.0,  
     "max": 1.0  
   }  
 }  
}  
---

## **3.10 Error Model**

### **api\_error\_codes.json**

{  
 "errors": \[  
   {  
     "code": "INVALID\_SCHEMA",  
     "http\_status": 400,  
     "message": "Request body failed schema validation"  
   },  
   {  
     "code": "PRESET\_NOT\_FOUND",  
     "http\_status": 404,  
     "message": "preset\_id not found"  
   },  
   {  
     "code": "VARIANT\_NOT\_FOUND",  
     "http\_status": 404,  
     "message": "variant\_id not found"  
   },  
   {  
     "code": "OBJECTIVE\_NOT\_FOUND",  
     "http\_status": 404,  
     "message": "objective\_id not found"  
   },  
   {  
     "code": "OVERRIDE\_NOT\_ALLOWED",  
     "http\_status": 400,  
     "message": "Override field is not allowed"  
   },  
   {  
     "code": "CANON\_VALIDATION\_FAILED",  
     "http\_status": 422,  
     "message": "Compiled prompt violates canon rules"  
   },  
   {  
     "code": "GRAPH\_UNAVAILABLE",  
     "http\_status": 503,  
     "message": "Graph dependency unavailable"  
   },  
   {  
     "code": "ARCHIVE\_WRITE\_FAILED",  
     "http\_status": 500,  
     "message": "Compile log archive failed"  
   }  
 \]  
}

### **Error response example**

{  
 "status": "error",  
 "error": {  
   "code": "CANON\_VALIDATION\_FAILED",  
   "message": "Compiled prompt violates canon rules",  
   "details": \[  
     {  
       "rule\_id": "ABS\_NO\_MAGIC\_DISGUISED\_AS\_TECH",  
       "severity": "critical",  
       "path": "compiled\_prompt"  
     }  
   \]  
 }  
}  
---

## **3.11 FastAPI Server Skeleton**

\# services/prompt\_api/app.py

from fastapi import FastAPI  
from services.prompt\_api.routes import router

app \= FastAPI(title="Mikage Prompt Compiler API", version="1.0.0")  
app.include\_router(router)  
\# services/prompt\_api/routes.py

from fastapi import APIRouter, HTTPException  
from services.prompt\_api.schemas import CompileRequest, CompileResponse  
from services.prompt\_api.compile\_service import compile\_prompt\_package  
from services.prompt\_api.validation\_service import validate\_request\_only

router \= APIRouter()

@router.get("/health")  
def health():  
   return {"status": "ok", "service": "mikage-prompt-api", "version": "1.0.0"}

@router.post("/v1/validate")  
def validate(req: CompileRequest):  
   return validate\_request\_only(req)

@router.post("/v1/compile", response\_model=CompileResponse)  
def compile(req: CompileRequest):  
   result \= compile\_prompt\_package(req)  
   if result\["status"\] \== "error":  
       raise HTTPException(status\_code=result\["error"\]\["http\_status"\], detail=result\["error"\])  
   return result

@router.get("/v1/compile/{compile\_id}")  
def get\_compile(compile\_id: str):  
   \# archive read stub  
   return {"compile\_id": compile\_id, "status": "stub"}  
\# services/prompt\_api/schemas.py

from pydantic import BaseModel, Field  
from typing import Optional, Dict, List

class CameraOverride(BaseModel):  
   shot\_type: Optional\[str\] \= None  
   lens: Optional\[str\] \= None

class OverridePayload(BaseModel):  
   character\_ids: Optional\[List\[str\]\] \= None  
   location\_ids: Optional\[List\[str\]\] \= None  
   intensity: Optional\[str\] \= None  
   camera: Optional\[CameraOverride\] \= None  
   style\_bias: Optional\[Dict\[str, float\]\] \= None  
   seed: Optional\[int\] \= None  
   append\_positive: Optional\[List\[str\]\] \= None  
   append\_negative: Optional\[List\[str\]\] \= None

class RequestMeta(BaseModel):  
   requested\_by: Optional\[str\] \= None  
   source: Optional\[str\] \= None

class CompileRequest(BaseModel):  
   preset\_id: str  
   variant\_id: str  
   objective\_id: str  
   overrides: Optional\[OverridePayload\] \= None  
   request\_meta: Optional\[RequestMeta\] \= None

class CompileResponse(BaseModel):  
   compile\_id: str  
   status: str  
   compiled\_prompt: str  
   negative\_prompt: str  
   seed: int  
   style\_weights: Dict\[str, float\]  
   lineage: Dict\[str, str\]  
   validation: Dict  
   archive\_refs: Dict\[str, str\]  
---

## **3.12 Compile Service Pseudo-code**

\# services/prompt\_api/compile\_service.py

from services.prompt\_api.validation\_service import (  
   validate\_schema\_rules,  
   validate\_override\_policy,  
   validate\_compiled\_prompt  
)  
from services.prompt\_api.lineage\_service import build\_lineage  
from services.prompt\_api.graph\_client import fetch\_graph\_constraints  
from services.prompt\_api.archive\_client import archive\_compile\_log  
from ingest.canon\_validator import validate\_prompt\_against\_rulepack

def compile\_prompt\_package(req):  
   resolved \= resolve\_registry\_triplet(  
       preset\_id=req.preset\_id,  
       variant\_id=req.variant\_id,  
       objective\_id=req.objective\_id  
   )  
   if resolved.get("error"):  
       return resolved

   schema\_check \= validate\_schema\_rules(req)  
   if schema\_check.get("error"):  
       return schema\_check

   override\_check \= validate\_override\_policy(req.overrides)  
   if override\_check.get("error"):  
       return override\_check

   graph\_constraints \= fetch\_graph\_constraints(req)

   merged \= merge\_compile\_layers(  
       preset=resolved\["preset"\],  
       variant=resolved\["variant"\],  
       objective=resolved\["objective"\],  
       graph\_constraints=graph\_constraints,  
       overrides=req.overrides  
   )

   seed \= resolve\_seed(  
       override\_seed=getattr(req.overrides, "seed", None),  
       seed\_policy=resolved\["preset"\].get("seed\_policy", "deterministic\_hash"),  
       merged=merged  
   )

   compiled\_prompt \= build\_positive\_prompt(merged)  
   negative\_prompt \= build\_negative\_prompt(merged)

   validation \= validate\_prompt\_against\_rulepack(  
       compiled\_prompt=compiled\_prompt,  
       negative\_prompt=negative\_prompt  
   )

   if not validation\["passed"\]:  
       return {  
           "status": "error",  
           "error": {  
               "code": "CANON\_VALIDATION\_FAILED",  
               "http\_status": 422,  
               "message": "Compiled prompt violates canon rules",  
               "details": validation\["violations"\]  
           }  
       }

   style\_weights \= compute\_style\_weights(merged)  
   lineage \= build\_lineage(req, resolved, seed)

   compile\_id \= lineage\["compile\_id"\]

   archive\_ref \= archive\_compile\_log({  
       "compile\_id": compile\_id,  
       "request": req.model\_dump(),  
       "compiled\_prompt": compiled\_prompt,  
       "negative\_prompt": negative\_prompt,  
       "seed": seed,  
       "style\_weights": style\_weights,  
       "lineage": lineage,  
       "validation": validation  
   })

   write\_compile\_record\_graph(  
       compile\_id=compile\_id,  
       req=req.model\_dump(),  
       lineage=lineage,  
       archive\_ref=archive\_ref  
   )

   return {  
       "compile\_id": compile\_id,  
       "status": "success",  
       "compiled\_prompt": compiled\_prompt,  
       "negative\_prompt": negative\_prompt,  
       "seed": seed,  
       "style\_weights": style\_weights,  
       "lineage": lineage,  
       "validation": validation,  
       "archive\_refs": {  
           "compile\_log\_path": archive\_ref  
       }  
   }  
---

## **3.13 Graph Integration**

### **New node**

* `CompileRequest`

### **New relations**

* `(:CompileRequest)-[:USES_PRESET]->(:PromptPreset)`

* `(:CompileRequest)-[:USES_VARIANT]->(:PromptVariant)`

* `(:CompileRequest)-[:TARGETS_OBJECTIVE]->(:Rule)` or `(:Objective)` if node added

* `(:CompileRequest)-[:GENERATED_ASSET]->(:Asset)`

* `(:CompileRequest)-[:VALIDATED_BY]->(:Review)` optional

### **Compile node schema**

{  
 "node": "CompileRequest",  
 "properties": {  
   "compile\_id": "string",  
   "preset\_id": "string",  
   "variant\_id": "string",  
   "objective\_id": "string",  
   "seed": "int",  
   "compiler\_version": "string",  
   "status": "string",  
   "requested\_by": "string",  
   "source": "string",  
   "archive\_ref": "string",  
   "created\_at": "datetime"  
 }  
}  
---

## **3.14 Archive Log Schema**

{  
 "$schema": "mikage.compile.log.v1",  
 "compile\_id": "cmp\_000481",  
 "request": {  
   "preset\_id": "portrait\_editorial",  
   "variant\_id": "mikage\_void\_01",  
   "objective\_id": "hero\_key\_visual",  
   "overrides": {  
     "seed": 48102219  
   }  
 },  
 "resolved": {  
   "preset\_version": "1.0.0",  
   "variant\_version": "1.0.2",  
   "objective\_version": "1.0.0"  
 },  
 "compiled\_prompt": "master prompt string ...",  
 "negative\_prompt": "anime idol, pastel glamour, fantasy spell effects ...",  
 "seed": 48102219,  
 "style\_weights": {  
   "porcelain\_purity": 1.0,  
   "void\_black\_contrast": 0.95  
 },  
 "validation": {  
   "passed": true,  
   "violations": \[\]  
 },  
 "created\_at": "2026-03-14T15:03:00+07:00"  
}  
---

# **4\. CROSS-SYSTEM INTEGRATION FLOW**

POST /v1/compile  
→ compile prompt package  
→ archive compile log  
→ downstream image generation  
→ asset ingest manifest created  
→ embedding runner  
→ similarity report  
→ drift detector  
→ review engine  
→ canon gate  
→ asset index \+ archive  
---

# **5\. ORCHESTRATION ORDER TO IMPLEMENT NOW**

## **Phase 1 — Embeddings first**

Vì 2 hệ còn lại phụ thuộc.

### **Build order**

1. `embedding.config.json`

2. `storage.config.json`

3. `embeddings/encoder.py`

4. `embeddings/vector_store.py`

5. `embeddings/similarity_engine.py`

6. `embeddings/asset_embed_runner.py`

7. graph `upsert_embedding.cypher`

8. benchmark backfill runner

## **Phase 2 — Drift detector**

Sau khi có vector benchmark.

### **Build order**

1. `drift_labels.json`

2. `drift_detector.config.json`

3. `drift/rules_engine.py`

4. `drift/embedding_drift.py`

5. `drift/decision_engine.py`

6. `drift/false_positive_guard.py`

7. `drift/drift_runner.py`

8. graph `upsert_drift_report.cypher`

## **Phase 3 — Prompt API**

Sau khi compile lineage có thể feed sang embedding \+ drift.

### **Build order**

1. `prompt_api.config.json`

2. `api_error_codes.json`

3. `services/prompt_api/schemas.py`

4. `validation_service.py`

5. `compile_service.py`

6. `archive_client.py`

7. `graph_client.py`

8. `routes.py`

9. `app.py`

---

# **6\. MINIMUM CONFIG PACK**

## **prompt\_api.config.json**

{  
 "service\_name": "mikage-prompt-api",  
 "version": "1.0.0",  
 "host": "0.0.0.0",  
 "port": 8080,  
 "auth": {  
   "enabled": false,  
   "mode": "header\_token"  
 },  
 "compiler": {  
   "seed\_policy\_default": "deterministic\_hash",  
   "allow\_graph\_enrichment": true,  
   "allow\_archive\_write": true  
 }  
}  
---

# **7\. CYTHER / GRAPH WRITE STUBS**

## **upsert\_embedding.cypher**

MERGE (a:Asset {asset\_id: $asset\_id})  
MERGE (e:EmbeddingVector {embedding\_id: $embedding\_id})  
SET e.model\_id \= $model\_id,  
   e.embedding\_dim \= $embedding\_dim,  
   e.preprocess\_version \= $preprocess\_version,  
   e.storage\_backend \= $storage\_backend,  
   e.storage\_ref \= $storage\_ref,  
   e.created\_at \= datetime($created\_at)  
MERGE (a)-\[:HAS\_EMBEDDING\]-\>(e);

## **upsert\_drift\_report.cypher**

MERGE (a:Asset {asset\_id: $asset\_id})  
MERGE (r:Review {review\_id: $report\_id})  
SET r.review\_type \= "drift\_report",  
   r.global\_decision \= $global\_decision,  
   r.global\_severity \= $global\_severity,  
   r.created\_at \= datetime($created\_at)  
MERGE (a)-\[:HAS\_REVIEW\]-\>(r);

## **upsert\_compile\_request.cypher**

MERGE (c:CompileRequest {compile\_id: $compile\_id})  
SET c.preset\_id \= $preset\_id,  
   c.variant\_id \= $variant\_id,  
   c.objective\_id \= $objective\_id,  
   c.seed \= $seed,  
   c.status \= $status,  
   c.archive\_ref \= $archive\_ref,  
   c.created\_at \= datetime($created\_at)  
WITH c  
MATCH (p:PromptPreset {preset\_id: $preset\_id})  
MERGE (c)-\[:USES\_PRESET\]-\>(p)  
WITH c  
MATCH (v:PromptVariant {variant\_id: $variant\_id})  
MERGE (c)-\[:USES\_VARIANT\]-\>(v);  
---

# **8\. HARD DECISION LAW**

## **Embedding Index**

* không dùng raw file-path lookup làm similarity truth

* chỉ embedding có version \+ model\_id mới hợp lệ

* re-embed toàn bộ khi đổi model production

## **Drift Detector**

* không block chỉ bằng 1 tín hiệu yếu

* class `fantasy_magic_aesthetic` có quyền block sớm hơn các drift khác

* mọi false positive guard phải log được

## **Prompt API**

* compile xong bắt buộc preflight validator

* override không được đụng invariant

* mọi compile request phải archive

---

# **9\. ACCEPTANCE CRITERIA**

## **Embedding Index done when**

* benchmark assets được backfill đầy đủ vector

* generated asset mới auto index

* top-k similarity report sinh tự động

* duplicate risk và red-flag proximity hoạt động

## **Drift Detector done when**

* 5 drift class chính có score output

* rule \+ embedding fusion hoạt động

* có global decision `PASS/REVIEW/ESCALATE_REVIEW/BLOCK`

* false positive guard hoạt động và log được

## **Prompt API done when**

* `/v1/compile` trả đủ compiled prompt package

* `/v1/validate` chạy độc lập

* compile request ghi archive

* validator preflight chặn violation

---

# **10\. FIRST IMPLEMENTATION PRIORITY FILES**

config/embedding.config.json  
config/storage.config.json  
config/similarity.thresholds.json  
config/drift\_labels.json  
config/drift\_detector.config.json  
config/prompt\_api.config.json  
config/api\_error\_codes.json

embeddings/encoder.py  
embeddings/vector\_store.py  
embeddings/similarity\_engine.py  
embeddings/asset\_embed\_runner.py

drift/rules\_engine.py  
drift/embedding\_drift.py  
drift/decision\_engine.py  
drift/false\_positive\_guard.py  
drift/drift\_runner.py

services/prompt\_api/schemas.py  
services/prompt\_api/validation\_service.py  
services/prompt\_api/compile\_service.py  
services/prompt\_api/routes.py  
services/prompt\_api/app.py

graph/cypher/upsert\_embedding.cypher  
graph/cypher/upsert\_drift\_report.cypher  
graph/cypher/upsert\_compile\_request.cypher  
---

# **11\. FINAL SYSTEM RESULT**

Sau 3 nâng cấp này, Mikage không còn chỉ là implementation-ready spec.  
 Nó chuyển sang **runtime-governed IP engine** với 3 năng lực mới:

* **semantic visual memory** qua embedding index

* **automated visual canon defense** qua drift detector

* **deterministic prompt serving layer** qua prompt compiler API

Đây là mốc chuyển từ:

* structured system

sang:

* **operational runtime system**

