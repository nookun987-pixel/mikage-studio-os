# **MIKAGE — WORLD BIBLE DATABASE PACK**

Dưới đây là **bản pack triển khai hoàn chỉnh đầu tiên** cho World Bible Database của Mikage, theo chuẩn studio-system, dùng được làm nền cho database, validator, narrative engine và generation runtime.

---

# **1\) SYSTEM CONTRACT**

**Tên khối:** `world_bible`

**Vai trò:** canonical memory core của Mikage IP engine

**Nguồn sự thật thắng cuối cùng:**  
 `World Bible > Narrative Draft > Prompt Pack > Generated Asset Metadata`

**Đầu vào**

* canon constitution

* rules seed

* characters seed

* factions seed

* locations seed

* eras seed

* technology definitions

* visual DNA definitions

* approved event drafts

**Đầu ra**

* canonical entity store

* relation graph

* timeline state

* prompt context snapshot

* narrative context snapshot

* contradiction report

* revision history

---

# **2\) ENTITY MODEL — MASTER SET**

Đây là bộ entity chuẩn để hệ chạy được.

## **2.1 Core entities**

* `Character`

* `Faction`

* `Location`

* `Era`

* `TechnologySystem`

* `WeaponSystem`

* `Event`

* `Relationship`

* `VisualDNAProfile`

* `CanonRule`

* `TimelineAnchor`

* `CanonRevision`

## **2.2 Supporting entities**

* `DoctrinePack`

* `InfrastructureSystem`

* `KnowledgeState`

* `InjuryProfile`

* `AssetReference`

* `PromptContextProfile`

---

# **3\) MASTER ENUM REGISTRY**

{  
 "entity\_types": \[  
   "Character",  
   "Faction",  
   "Location",  
   "Era",  
   "TechnologySystem",  
   "WeaponSystem",  
   "Event",  
   "Relationship",  
   "VisualDNAProfile",  
   "CanonRule",  
   "TimelineAnchor",  
   "CanonRevision"  
 \],  
 "canon\_confidence": \[  
   "absolute\_canon",  
   "high\_canon",  
   "soft\_canon",  
   "reported",  
   "unknown",  
   "contested"  
 \],  
 "visibility\_levels": \[  
   "public",  
   "restricted",  
   "classified",  
   "black",  
   "meta\_internal"  
 \],  
 "character\_status": \[  
   "active",  
   "missing",  
   "deceased",  
   "contained",  
   "fragmented",  
   "unknown"  
 \],  
 "faction\_status": \[  
   "rising",  
   "stable",  
   "declining",  
   "fractured",  
   "collapsed",  
   "hidden"  
 \],  
 "location\_types": \[  
   "planetary\_region",  
   "megacity",  
   "district",  
   "industrial\_zone",  
   "rooftop",  
   "facility",  
   "lab",  
   "subterranean\_zone",  
   "transport\_corridor",  
   "ruin"  
 \],  
 "event\_types": \[  
   "birth",  
   "awakening",  
   "injury",  
   "betrayal",  
   "conflict",  
   "deployment",  
   "containment",  
   "discovery",  
   "collapse",  
   "migration",  
   "memory\_loss",  
   "faction\_shift",  
   "technology\_failure"  
 \],  
 "relationship\_types": \[  
   "member\_of",  
   "controls",  
   "opposes",  
   "allied\_with",  
   "located\_at",  
   "participated\_in",  
   "injured\_in",  
   "uses",  
   "developed\_by",  
   "restricted\_to",  
   "part\_of",  
   "causes",  
   "governs\_visual\_identity\_of",  
   "knows\_secret\_of",  
   "owes\_debt\_to",  
   "hunted\_by"  
 \],  
 "rule\_severity": \[  
   "info",  
   "warn",  
   "major",  
   "critical",  
   "fatal"  
 \],  
 "technology\_categories": \[  
   "armor",  
   "mask\_system",  
   "reactor",  
   "surveillance",  
   "mobility",  
   "weapon\_core",  
   "medical",  
   "communications",  
   "industrial",  
   "containment"  
 \],  
 "weapon\_classes": \[  
   "blade",  
   "projectile",  
   "energy\_assisted",  
   "containment",  
   "drone\_platform",  
   "heavy\_platform"  
 \]  
}  
---

# **4\) RELATIONAL ENTITY MODEL — FIELD DESIGN**

---

## **4.1 `Character`**

{  
 "entity\_type": "Character",  
 "required\_fields": \[  
   "id",  
   "canonical\_name",  
   "status",  
   "origin\_era\_id",  
   "identity\_core",  
   "visual\_dna\_profile\_id",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "fields": {  
   "id": "string",  
   "canonical\_name": "string",  
   "aliases": "string\[\]",  
   "status": "enum:character\_status",  
   "origin\_era\_id": "string",  
   "current\_faction\_id": "string|null",  
   "biological\_type": "string",  
   "synthetic\_degree": "number",  
   "identity\_core": "string",  
   "psychological\_profile": "object",  
   "baseline\_capabilities": "object",  
   "baseline\_limitations": "object",  
   "visual\_dna\_profile\_id": "string",  
   "public\_summary": "string",  
   "internal\_notes": "string",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels",  
   "tags": "string\[\]",  
   "created\_at": "string",  
   "updated\_at": "string"  
 }  
}  
---

## **4.2 `Faction`**

{  
 "entity\_type": "Faction",  
 "required\_fields": \[  
   "id",  
   "name",  
   "type",  
   "ideology",  
   "status",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "fields": {  
   "id": "string",  
   "name": "string",  
   "type": "string",  
   "ideology": "string",  
   "governance\_model": "string",  
   "resource\_base": "string\[\]",  
   "military\_capacity": "string",  
   "technology\_bias": "string\[\]",  
   "territorial\_scope": "string\[\]",  
   "status": "enum:faction\_status",  
   "symbolics": "object",  
   "public\_summary": "string",  
   "internal\_notes": "string",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels",  
   "tags": "string\[\]"  
 }  
}  
---

## **4.3 `Location`**

{  
 "entity\_type": "Location",  
 "required\_fields": \[  
   "id",  
   "name",  
   "location\_type",  
   "era\_relevance",  
   "visual\_identity",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "fields": {  
   "id": "string",  
   "name": "string",  
   "location\_type": "enum:location\_types",  
   "parent\_location\_id": "string|null",  
   "era\_relevance": "string\[\]",  
   "climate\_profile": "object",  
   "infrastructure\_profile": "object",  
   "strategic\_value": "string",  
   "visual\_identity": "object",  
   "controlling\_faction\_id": "string|null",  
   "access\_rules": "string\[\]",  
   "known\_hazards": "string\[\]",  
   "public\_summary": "string",  
   "internal\_notes": "string",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels",  
   "tags": "string\[\]"  
 }  
}  
---

## **4.4 `Era`**

{  
 "entity\_type": "Era",  
 "required\_fields": \[  
   "id",  
   "name",  
   "sequence\_order",  
   "civilization\_state",  
   "energy\_regime",  
   "technology\_ceiling",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "fields": {  
   "id": "string",  
   "name": "string",  
   "sequence\_order": "number",  
   "start\_anchor": "string",  
   "end\_anchor": "string|null",  
   "civilization\_state": "string",  
   "energy\_regime": "string",  
   "military\_doctrine": "string",  
   "dominant\_aesthetic": "string\[\]",  
   "forbidden\_elements": "string\[\]",  
   "technology\_ceiling": "string\[\]",  
   "social\_conditions": "string\[\]",  
   "public\_summary": "string",  
   "internal\_notes": "string",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels",  
   "tags": "string\[\]"  
 }  
}  
---

## **4.5 `TechnologySystem`**

{  
 "entity\_type": "TechnologySystem",  
 "required\_fields": \[  
   "id",  
   "name",  
   "category",  
   "operational\_principle",  
   "thermodynamic\_cost",  
   "failure\_modes",  
   "visible\_signatures",  
   "era\_availability",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "fields": {  
   "id": "string",  
   "name": "string",  
   "category": "enum:technology\_categories",  
   "energy\_source": "string",  
   "operational\_principle": "string",  
   "thermodynamic\_cost": "string",  
   "failure\_modes": "string\[\]",  
   "visible\_signatures": "string\[\]",  
   "era\_availability": "string\[\]",  
   "faction\_access": "string\[\]",  
   "weaponization\_potential": "string",  
   "forbidden\_misreadings": "string\[\]",  
   "public\_summary": "string",  
   "internal\_notes": "string",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels",  
   "tags": "string\[\]"  
 }  
}  
---

## **4.6 `WeaponSystem`**

{  
 "entity\_type": "WeaponSystem",  
 "required\_fields": \[  
   "id",  
   "name",  
   "class",  
   "energy\_requirements",  
   "operational\_constraints",  
   "signature\_effects",  
   "era\_validity",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "fields": {  
   "id": "string",  
   "name": "string",  
   "class": "enum:weapon\_classes",  
   "energy\_requirements": "string",  
   "platform\_type": "string",  
   "effective\_range": "string",  
   "operational\_constraints": "string\[\]",  
   "signature\_effects": "string\[\]",  
   "failure\_risks": "string\[\]",  
   "authorized\_factions": "string\[\]",  
   "era\_validity": "string\[\]",  
   "public\_summary": "string",  
   "internal\_notes": "string",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels",  
   "tags": "string\[\]"  
 }  
}  
---

## **4.7 `Event`**

{  
 "entity\_type": "Event",  
 "required\_fields": \[  
   "id",  
   "name",  
   "event\_type",  
   "era\_id",  
   "timeline\_anchor\_id",  
   "location\_id",  
   "trigger",  
   "participants",  
   "immediate\_consequences",  
   "persistent\_consequences",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "fields": {  
   "id": "string",  
   "name": "string",  
   "event\_type": "enum:event\_types",  
   "era\_id": "string",  
   "timeline\_anchor\_id": "string",  
   "start\_time\_label": "string",  
   "end\_time\_label": "string|null",  
   "location\_id": "string",  
   "summary": "string",  
   "trigger": "string",  
   "participants": "string\[\]",  
   "causal\_parents": "string\[\]",  
   "immediate\_consequences": "string\[\]",  
   "persistent\_consequences": "string\[\]",  
   "public\_knowledge\_level": "enum:visibility\_levels",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels",  
   "tags": "string\[\]"  
 }  
}  
---

## **4.8 `Relationship`**

{  
 "entity\_type": "Relationship",  
 "required\_fields": \[  
   "id",  
   "source\_entity\_type",  
   "source\_entity\_id",  
   "target\_entity\_type",  
   "target\_entity\_id",  
   "relationship\_type",  
   "canon\_confidence",  
   "visibility"  
 \],  
 "fields": {  
   "id": "string",  
   "source\_entity\_type": "enum:entity\_types",  
   "source\_entity\_id": "string",  
   "target\_entity\_type": "enum:entity\_types",  
   "target\_entity\_id": "string",  
   "relationship\_type": "enum:relationship\_types",  
   "start\_event\_id": "string|null",  
   "end\_event\_id": "string|null",  
   "strength": "number",  
   "confidence\_score": "number",  
   "visibility": "enum:visibility\_levels",  
   "canon\_confidence": "enum:canon\_confidence",  
   "notes": "string"  
 }  
}  
---

## **4.9 `VisualDNAProfile`**

{  
 "entity\_type": "VisualDNAProfile",  
 "required\_fields": \[  
   "id",  
   "entity\_type",  
   "entity\_id",  
   "palette\_rules",  
   "material\_rules",  
   "silhouette\_rules",  
   "camera\_rules",  
   "forbidden\_visual\_traits",  
   "canon\_confidence",  
   "visibility"  
 \],  
 "fields": {  
   "id": "string",  
   "entity\_type": "enum:entity\_types",  
   "entity\_id": "string",  
   "palette\_rules": "string\[\]",  
   "material\_rules": "string\[\]",  
   "silhouette\_rules": "string\[\]",  
   "camera\_rules": "string\[\]",  
   "damage\_language": "string\[\]",  
   "lighting\_constraints": "string\[\]",  
   "forbidden\_visual\_traits": "string\[\]",  
   "generation\_priority": "number",  
   "canon\_confidence": "enum:canon\_confidence",  
   "visibility": "enum:visibility\_levels"  
 }  
}  
---

## **4.10 `CanonRule`**

{  
 "entity\_type": "CanonRule",  
 "required\_fields": \[  
   "id",  
   "rule\_group",  
   "rule\_text",  
   "severity",  
   "scope",  
   "validator\_binding"  
 \],  
 "fields": {  
   "id": "string",  
   "rule\_group": "string",  
   "rule\_text": "string",  
   "severity": "enum:rule\_severity",  
   "scope": "string\[\]",  
   "examples\_valid": "string\[\]",  
   "examples\_invalid": "string\[\]",  
   "validator\_binding": "string"  
 }  
}  
---

## **4.11 `TimelineAnchor`**

{  
 "entity\_type": "TimelineAnchor",  
 "required\_fields": \[  
   "id",  
   "label",  
   "absolute\_order",  
   "era\_id"  
 \],  
 "fields": {  
   "id": "string",  
   "label": "string",  
   "absolute\_order": "number",  
   "era\_id": "string",  
   "description": "string",  
   "related\_event\_ids": "string\[\]"  
 }  
}  
---

## **4.12 `CanonRevision`**

{  
 "entity\_type": "CanonRevision",  
 "required\_fields": \[  
   "id",  
   "entity\_type",  
   "entity\_id",  
   "changed\_fields",  
   "change\_reason",  
   "author\_role",  
   "timestamp",  
   "impact\_scope"  
 \],  
 "fields": {  
   "id": "string",  
   "entity\_type": "enum:entity\_types",  
   "entity\_id": "string",  
   "changed\_fields": "string\[\]",  
   "change\_reason": "string",  
   "author\_role": "string",  
   "approved\_by": "string|null",  
   "timestamp": "string",  
   "impact\_scope": "string\[\]",  
   "backward\_compatibility": "string"  
 }  
}  
---

# **5\) RELATION MODEL — GRAPH CONTRACT**

Đây là quan hệ chuẩn cho graph layer.

{  
 "allowed\_relations": \[  
   {  
     "from": "Character",  
     "type": "member\_of",  
     "to": "Faction"  
   },  
   {  
     "from": "Faction",  
     "type": "controls",  
     "to": "Location"  
   },  
   {  
     "from": "Character",  
     "type": "located\_at",  
     "to": "Location"  
   },  
   {  
     "from": "Character",  
     "type": "participated\_in",  
     "to": "Event"  
   },  
   {  
     "from": "Character",  
     "type": "injured\_in",  
     "to": "Event"  
   },  
   {  
     "from": "Character",  
     "type": "uses",  
     "to": "TechnologySystem"  
   },  
   {  
     "from": "TechnologySystem",  
     "type": "developed\_by",  
     "to": "Faction"  
   },  
   {  
     "from": "TechnologySystem",  
     "type": "restricted\_to",  
     "to": "Faction"  
   },  
   {  
     "from": "WeaponSystem",  
     "type": "uses",  
     "to": "TechnologySystem"  
   },  
   {  
     "from": "Location",  
     "type": "part\_of",  
     "to": "Location"  
   },  
   {  
     "from": "Event",  
     "type": "located\_at",  
     "to": "Location"  
   },  
   {  
     "from": "Event",  
     "type": "causes",  
     "to": "Event"  
   },  
   {  
     "from": "VisualDNAProfile",  
     "type": "governs\_visual\_identity\_of",  
     "to": "Character"  
   },  
   {  
     "from": "Character",  
     "type": "opposes",  
     "to": "Faction"  
   },  
   {  
     "from": "Faction",  
     "type": "opposes",  
     "to": "Faction"  
   }  
 \]  
}  
---

# **6\) ID CONVENTION**

Tất cả record dùng quy ước ID cố định để tránh drift.

char\_mikage  
fct\_shirogane\_remnant  
fct\_kurovas\_industrial\_directorate  
fct\_helios\_recovery\_bureau

loc\_megacity\_kagetsu  
loc\_kagetsu\_industrial\_district\_09  
loc\_kagetsu\_rooftop\_maintenance\_platform\_12  
loc\_kagetsu\_undercity\_drain\_sector\_4

era\_pre\_collapse\_industrial\_memory  
era\_late\_entropy\_industrial\_age

tech\_mask\_boron\_carbide\_kitsune\_shell  
tech\_porcelain\_composite\_armor\_frame  
tech\_crimson\_reactor\_leakage\_conduit\_model  
tech\_aerial\_surveillance\_mesh\_grid

wpn\_monoblade\_reactive\_edge\_01

evt\_mikage\_foundational\_trauma  
evt\_district\_09\_containment\_breach  
evt\_mikage\_reactor\_body\_damage  
evt\_mikage\_loyalty\_fracture

vis\_mikage\_core\_lock

rule\_no\_free\_power  
rule\_no\_magic\_disguised\_as\_technology  
rule\_beauty\_must\_carry\_damage  
---

# **7\) SEED RECORDS — MASTER INITIAL PACK**

Đây là bộ seed đầu tiên đủ để hệ bắt đầu vận hành.

---

## **7.1 `eras.seed.json`**

\[  
 {  
   "id": "era\_pre\_collapse\_industrial\_memory",  
   "name": "Pre-Collapse Industrial Memory",  
   "sequence\_order": 10,  
   "start\_anchor": "anchor\_pcm\_000",  
   "end\_anchor": "anchor\_pcm\_999",  
   "civilization\_state": "high-density industrial civilization before systemic fragmentation",  
   "energy\_regime": "centralized grid and industrial reactor dependence",  
   "military\_doctrine": "mass infrastructure defense and territorial security",  
   "dominant\_aesthetic": \[  
     "functional industry",  
     "steel density",  
     "pre-fracture order"  
   \],  
   "forbidden\_elements": \[  
     "fantasy rituals",  
     "free energy",  
     "ornamental cyberpunk spectacle"  
   \],  
   "technology\_ceiling": \[  
     "advanced composites",  
     "surveillance mesh",  
     "reactor-dependent armor systems"  
   \],  
   "social\_conditions": \[  
     "stratified labor order",  
     "institutional trust erosion"  
   \],  
   "public\_summary": "The last remembered era before broad systemic entropy accelerated.",  
   "internal\_notes": "Acts as deep memory layer and ideological contrast for later decline.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "meta\_internal",  
   "tags": \["foundation", "era", "memory"\]  
 },  
 {  
   "id": "era\_late\_entropy\_industrial\_age",  
   "name": "Late Entropy Industrial Age",  
   "sequence\_order": 20,  
   "start\_anchor": "anchor\_leia\_000",  
   "end\_anchor": null,  
   "civilization\_state": "fragmented industrial survival order under decaying infrastructure",  
   "energy\_regime": "scarce routed power, damaged conduits, localized reactor dependence",  
   "military\_doctrine": "containment, targeted force projection, infrastructural denial",  
   "dominant\_aesthetic": \[  
     "restrained futurism",  
     "industrial brutality",  
     "porcelain purity against decay",  
     "sacred fracture aesthetics"  
   \],  
   "forbidden\_elements": \[  
     "magic aesthetics",  
     "childish anime drift",  
     "neon carnival overload"  
   \],  
   "technology\_ceiling": \[  
     "damaged reactor systems",  
     "composite armor",  
     "drone surveillance",  
     "scarcity-driven retrofit engineering"  
   \],  
   "social\_conditions": \[  
     "resource stress",  
     "memory distortion",  
     "factional sovereignty",  
     "controlled urban ruin"  
   \],  
   "public\_summary": "An age of damaged systems, surviving industry, and fractured sovereignty.",  
   "internal\_notes": "Primary runtime era for Mikage assets and narrative.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "meta\_internal",  
   "tags": \["runtime", "era", "primary"\]  
 }  
\]  
---

## **7.2 `factions.seed.json`**

\[  
 {  
   "id": "fct\_shirogane\_remnant",  
   "name": "Shirogane Remnant",  
   "type": "post-institutional covert remnant order",  
   "ideology": "identity must survive through discipline, memory selection, and material restraint",  
   "governance\_model": "cellular command under hidden senior custodians",  
   "resource\_base": \[  
     "archived military caches",  
     "material reclamation",  
     "black-distribution supply chains"  
   \],  
   "military\_capacity": "high precision, low volume, asymmetrical capability",  
   "technology\_bias": \[  
     "precision masks",  
     "composite armor",  
     "identity-lock protocols"  
   \],  
   "territorial\_scope": \[  
     "hidden facilities",  
     "transit shadow corridors"  
   \],  
   "status": "hidden",  
   "symbolics": {  
     "primary\_material\_language": \["white ceramic", "black carbon", "restrained crimson"\],  
     "doctrinal\_signature": "purity under damage"  
   },  
   "public\_summary": "A covert remnant order preserving selective fragments of disciplined sovereignty.",  
   "internal\_notes": "Likely closest current alignment source for Mikage.",  
   "canon\_confidence": "high\_canon",  
   "visibility": "restricted",  
   "tags": \["faction", "covert", "precision", "mikage-adjacent"\]  
 },  
 {  
   "id": "fct\_kurovas\_industrial\_directorate",  
   "name": "Kurovas Industrial Directorate",  
   "type": "industrial command-state",  
   "ideology": "production legitimizes rule; continuity is enforced through infrastructure control",  
   "governance\_model": "executive industrial hierarchy",  
   "resource\_base": \[  
     "reactor districts",  
     "freight corridors",  
     "forced labor contracts"  
   \],  
   "military\_capacity": "heavy urban enforcement and infrastructure denial capacity",  
   "technology\_bias": \[  
     "reactor routing",  
     "heavy surveillance",  
     "containment systems"  
   \],  
   "territorial\_scope": \[  
     "industrial districts",  
     "power transfer nodes"  
   \],  
   "status": "stable",  
   "symbolics": {  
     "primary\_material\_language": \["dark steel", "heat-scarred plating", "warning illumination"\],  
     "doctrinal\_signature": "order by throughput"  
   },  
   "public\_summary": "A faction that rules by owning the grid, the routes, and the cost of interruption.",  
   "internal\_notes": "Primary industrial antagonist force.",  
   "canon\_confidence": "high\_canon",  
   "visibility": "public",  
   "tags": \["faction", "industrial", "antagonist"\]  
 },  
 {  
   "id": "fct\_helios\_recovery\_bureau",  
   "name": "Helios Recovery Bureau",  
   "type": "recovery administration and salvage authority",  
   "ideology": "the future belongs to those who recover what others cannot preserve",  
   "governance\_model": "bureaucratic extraction network",  
   "resource\_base": \[  
     "ruin salvage",  
     "archival seizures",  
     "field recovery teams"  
   \],  
   "military\_capacity": "moderate, logistics-heavy, intelligence-enabled",  
   "technology\_bias": \[  
     "recovery drones",  
     "containment kits",  
     "archive extraction tools"  
   \],  
   "territorial\_scope": \[  
     "ruin sectors",  
     "archive zones",  
     "quarantine corridors"  
   \],  
   "status": "rising",  
   "symbolics": {  
     "primary\_material\_language": \["dust metal", "salvage harness", "sterile markings"\],  
     "doctrinal\_signature": "recover first, interpret later"  
   },  
   "public\_summary": "A recovery power that grows by cataloging, extracting, and quietly appropriating the dead world.",  
   "internal\_notes": "Third force suitable for conflict triangulation.",  
   "canon\_confidence": "high\_canon",  
   "visibility": "public",  
   "tags": \["faction", "salvage", "bureau"\]  
 }  
\]  
---

## **7.3 `locations.seed.json`**

\[  
 {  
   "id": "loc\_megacity\_kagetsu",  
   "name": "Kagetsu Megacity",  
   "location\_type": "megacity",  
   "parent\_location\_id": null,  
   "era\_relevance": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "climate\_profile": {  
     "weather\_pattern": "acid rain cycles, steam saturation, industrial wind corridors"  
   },  
   "infrastructure\_profile": {  
     "density": "extreme",  
     "core\_features": \[  
       "steel towers",  
       "antenna arrays",  
       "cooling stacks",  
       "cable spans",  
       "maintenance rooftops"  
     \]  
   },  
   "strategic\_value": "primary industrial survival node",  
   "visual\_identity": {  
     "palette": \["\#0A0A0A", "\#FAFAFA", "\#E60000"\],  
     "motifs": \["vertical mass", "wet concrete", "hard industrial glow"\]  
   },  
   "controlling\_faction\_id": "fct\_kurovas\_industrial\_directorate",  
   "access\_rules": \[  
     "district clearance required",  
     "high roof access restricted"  
   \],  
   "known\_hazards": \[  
     "electrical runoff",  
     "surveillance saturation",  
     "unstable conduits"  
   \],  
   "public\_summary": "A vertical industrial megacity surviving on damaged but still-routed systems.",  
   "internal\_notes": "Primary stage environment for Mikage visual generation.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "public",  
   "tags": \["location", "megacity", "primary-stage"\]  
 },  
 {  
   "id": "loc\_kagetsu\_industrial\_district\_09",  
   "name": "Kagetsu Industrial District 09",  
   "location\_type": "industrial\_zone",  
   "parent\_location\_id": "loc\_megacity\_kagetsu",  
   "era\_relevance": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "climate\_profile": {  
     "weather\_pattern": "heated runoff and heavy particulate air"  
   },  
   "infrastructure\_profile": {  
     "density": "high",  
     "core\_features": \[  
       "reactor piping",  
       "freight rails",  
       "maintenance decks",  
       "containment barriers"  
     \]  
   },  
   "strategic\_value": "power routing and material throughput",  
   "visual\_identity": {  
     "palette": \["\#0A0A0A", "\#3A3A3A", "\#E60000"\],  
     "motifs": \["smoke stacks", "pipe forests", "heat-scarred concrete"\]  
   },  
   "controlling\_faction\_id": "fct\_kurovas\_industrial\_directorate",  
   "access\_rules": \[  
     "restricted industrial badge access"  
   \],  
   "known\_hazards": \[  
     "containment failure",  
     "radiant heat",  
     "armed patrol response"  
   \],  
   "public\_summary": "A district where power, heat, and discipline converge.",  
   "internal\_notes": "Foundational event zone.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "public",  
   "tags": \["location", "district", "industrial"\]  
 },  
 {  
   "id": "loc\_kagetsu\_rooftop\_maintenance\_platform\_12",  
   "name": "Rooftop Maintenance Platform 12",  
   "location\_type": "rooftop",  
   "parent\_location\_id": "loc\_kagetsu\_industrial\_district\_09",  
   "era\_relevance": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "climate\_profile": {  
     "weather\_pattern": "violent rain, crosswind, low-visibility mist"  
   },  
   "infrastructure\_profile": {  
     "density": "sparse functional",  
     "core\_features": \[  
       "wet concrete slabs",  
       "antenna mounts",  
       "railings",  
       "maintenance housings",  
       "drain channels"  
     \]  
   },  
   "strategic\_value": "observation, infiltration, extraction route staging",  
   "visual\_identity": {  
     "palette": \["\#0A0A0A", "\#FAFAFA", "\#E60000"\],  
     "motifs": \["storm silhouette", "slick concrete", "void drop"\]  
   },  
   "controlling\_faction\_id": "fct\_kurovas\_industrial\_directorate",  
   "access\_rules": \[  
     "maintenance key route only"  
   \],  
   "known\_hazards": \[  
     "crosswind",  
     "fall risk",  
     "drone visibility exposure"  
   \],  
   "public\_summary": "A high platform above the city used for maintenance but ideal for clandestine confrontations.",  
   "internal\_notes": "Primary cinematic frame location.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "public",  
   "tags": \["location", "rooftop", "cinematic-core"\]  
 },  
 {  
   "id": "loc\_kagetsu\_undercity\_drain\_sector\_4",  
   "name": "Undercity Drain Sector 4",  
   "location\_type": "subterranean\_zone",  
   "parent\_location\_id": "loc\_megacity\_kagetsu",  
   "era\_relevance": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "climate\_profile": {  
     "weather\_pattern": "humid darkness, chemical runoff accumulation"  
   },  
   "infrastructure\_profile": {  
     "density": "compressed and decayed",  
     "core\_features": \[  
       "storm channels",  
       "service tunnels",  
       "collapsed access shafts"  
     \]  
   },  
   "strategic\_value": "hidden movement and body disposal corridor",  
   "visual\_identity": {  
     "palette": \["\#0A0A0A", "\#202020", "\#5A0000"\],  
     "motifs": \["low steam", "filth sheen", "buried utility lines"\]  
   },  
   "controlling\_faction\_id": null,  
   "access\_rules": \[  
     "unofficial access only"  
   \],  
   "known\_hazards": \[  
     "toxic runoff",  
     "structural collapse",  
     "lost surveillance dead zones"  
   \],  
   "public\_summary": "A hidden undercity network where movement persists beyond formal control.",  
   "internal\_notes": "Useful for covert narrative transitions.",  
   "canon\_confidence": "high\_canon",  
   "visibility": "restricted",  
   "tags": \["location", "undercity", "covert"\]  
 }  
\]  
---

## **7.4 `characters.seed.json`**

\[  
 {  
   "id": "char\_mikage",  
   "canonical\_name": "Mikage",  
   "aliases": \["The Porcelain Ghost", "Kitsune Unit"\],  
   "status": "active",  
   "origin\_era\_id": "era\_late\_entropy\_industrial\_age",  
   "current\_faction\_id": "fct\_shirogane\_remnant",  
   "biological\_type": "human-derived combat operative",  
   "synthetic\_degree": 0.42,  
   "identity\_core": "A disciplined self that preserves agency through pain, memory pressure, and refusal to become ornamental violence.",  
   "psychological\_profile": {  
     "baseline\_traits": \[  
       "controlled",  
       "observant",  
       "emotionally compressed",  
       "high threshold for suffering"  
     \],  
     "identity\_risks": \[  
       "memory fracture",  
       "instrumentalization by faction doctrine",  
       "self-erasure through sacrifice"  
     \]  
   },  
   "baseline\_capabilities": {  
     "combat": "high precision close-quarters lethality",  
     "mobility": "high urban traversal",  
     "stealth": "advanced under industrial conditions"  
   },  
   "baseline\_limitations": {  
     "reactor\_stability": "compromised under extended strain",  
     "repair\_dependency": "specialized composite maintenance required"  
   },  
   "visual\_dna\_profile\_id": "vis\_mikage\_core\_lock",  
   "public\_summary": "A masked operative whose visual purity conceals damage, discipline, and unstable internal cost.",  
   "internal\_notes": "Central character identity lock. No drift allowed toward magical heroine or idolized cyberpunk archetype.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "public",  
   "tags": \["character", "protagonist", "core"\]  
 }  
\]  
---

## **7.5 `visual_dna.seed.json`**

\[  
 {  
   "id": "vis\_mikage\_core\_lock",  
   "entity\_type": "Character",  
   "entity\_id": "char\_mikage",  
   "palette\_rules": \[  
     "primary white ceramic",  
     "void black support structure",  
     "restrained visceral crimson only as internal damage or conduit leakage"  
   \],  
   "material\_rules": \[  
     "glossy white porcelain-like boron-carbide ceramic mask",  
     "fractured porcelain armor plates",  
     "matte black carbon fiber reinforcement",  
     "dark titanium mechanical joints"  
   \],  
   "silhouette\_rules": \[  
     "minimal, sharp, sovereign profile",  
     "fox-ear geometry integrated into mask silhouette only",  
     "long black hair with controlled contrast against white mask"  
   \],  
   "camera\_rules": \[  
     "low-angle anamorphic framing",  
     "controlled composition",  
     "monumental cinematic stillness or restrained motion"  
   \],  
   "damage\_language": \[  
     "beauty must carry damage",  
     "fracture lines may reveal crimson leakage",  
     "damage is technological consequence, never magical aura"  
   \],  
   "lighting\_constraints": \[  
     "chiaroscuro",  
     "hard edge light",  
     "industrial reflections only",  
     "no pop neon glamour wash"  
   \],  
   "forbidden\_visual\_traits": \[  
     "childish anime face coding",  
     "pastel fashion styling",  
     "neon idol palette",  
     "ornamental fantasy glow",  
     "fox mask exaggeration into cartoon iconography"  
   \],  
   "generation\_priority": 100,  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "meta\_internal"  
 }  
\]  
---

## **7.6 `technologies.seed.json`**

\[  
 {  
   "id": "tech\_mask\_boron\_carbide\_kitsune\_shell",  
   "name": "Boron-Carbide Kitsune Shell Mask",  
   "category": "mask\_system",  
   "energy\_source": "passive structural system with low-power embedded identity lock circuits",  
   "operational\_principle": "Ceramic shell provides protection, signature discipline, and identity-coded interface stability.",  
   "thermodynamic\_cost": "low during idle use, moderate under combat-linked sensor activity",  
   "failure\_modes": \[  
     "surface fracture under concentrated impact",  
     "identity lock desync under severe neural stress"  
   \],  
   "visible\_signatures": \[  
     "seamless glossy white ceramic surface",  
     "minimal integrated fox-ear silhouette"  
   \],  
   "era\_availability": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "faction\_access": \[  
     "fct\_shirogane\_remnant"  
   \],  
   "weaponization\_potential": "indirect via tactical identity control and sensor discipline",  
   "forbidden\_misreadings": \[  
     "sacred magical mask",  
     "supernatural spirit artifact"  
   \],  
   "public\_summary": "A mask system of discipline, protection, and identity coding.",  
   "internal\_notes": "Core visual law anchor.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "restricted",  
   "tags": \["technology", "mask", "mikage-core"\]  
 },  
 {  
   "id": "tech\_porcelain\_composite\_armor\_frame",  
   "name": "Porcelain Composite Armor Frame",  
   "category": "armor",  
   "energy\_source": "passive armor structure with optional powered assist coupling",  
   "operational\_principle": "Fracture-tolerant ceramic shell over black composite reinforcement distributes impact while preserving mobility.",  
   "thermodynamic\_cost": "repair and production cost high; runtime cost moderate when linked to powered systems",  
   "failure\_modes": \[  
     "ceramic fracture propagation",  
     "joint overload",  
     "heat stress delamination"  
   \],  
   "visible\_signatures": \[  
     "white fractured plates",  
     "black reinforcement exposure",  
     "controlled damage lines"  
   \],  
   "era\_availability": \[  
     "era\_pre\_collapse\_industrial\_memory",  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "faction\_access": \[  
     "fct\_shirogane\_remnant",  
     "fct\_kurovas\_industrial\_directorate"  
   \],  
   "weaponization\_potential": "high when integrated with mobility or reactor assistance",  
   "forbidden\_misreadings": \[  
     "living armor",  
     "self-healing magical ceramic"  
   \],  
   "public\_summary": "A fracture-tolerant armor system built around discipline of form and consequence of damage.",  
   "internal\_notes": "Locks porcelain purity \+ damage principle.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "restricted",  
   "tags": \["technology", "armor", "composite"\]  
 },  
 {  
   "id": "tech\_crimson\_reactor\_leakage\_conduit\_model",  
   "name": "Crimson Reactor Leakage Conduit Model",  
   "category": "reactor",  
   "energy\_source": "contained power routing through damaged high-density conduit architecture",  
   "operational\_principle": "Under system damage, internal power leakage becomes faintly visible through fracture channels and venting paths.",  
   "thermodynamic\_cost": "severe; leakage implies efficiency loss, instability risk, and long-term body or system damage",  
   "failure\_modes": \[  
     "thermal runaway",  
     "localized conduit burn",  
     "catastrophic shutdown"  
   \],  
   "visible\_signatures": \[  
     "deep restrained crimson glow beneath damaged material seams",  
     "faint leakage in cracks only"  
   \],  
   "era\_availability": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "faction\_access": \[  
     "fct\_kurovas\_industrial\_directorate",  
     "fct\_shirogane\_remnant"  
   \],  
   "weaponization\_potential": "moderate, mostly indirect via power amplification at significant cost",  
   "forbidden\_misreadings": \[  
     "mystic life-force",  
     "soul flame",  
     "magic aura"  
   \],  
   "public\_summary": "A damaged power-routing model whose visible crimson leakage is a failure signature, not a miracle.",  
   "internal\_notes": "Critical rule anchor for crimson accent.",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "restricted",  
   "tags": \["technology", "reactor", "crimson", "failure-signature"\]  
 },  
 {  
   "id": "tech\_aerial\_surveillance\_mesh\_grid",  
   "name": "Aerial Surveillance Mesh Grid",  
   "category": "surveillance",  
   "energy\_source": "district grid-tied drone and antenna network",  
   "operational\_principle": "Layered aerial and antenna observation creates near-continuous urban oversight in controlled districts.",  
   "thermodynamic\_cost": "high at city scale, requiring prioritized routing and blind-zone tradeoffs",  
   "failure\_modes": \[  
     "dead zones during storms",  
     "signal fragmentation",  
     "overload under sabotage"  
   \],  
   "visible\_signatures": \[  
     "beacon lights",  
     "drone arcs",  
     "antenna forests"  
   \],  
   "era\_availability": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "faction\_access": \[  
     "fct\_kurovas\_industrial\_directorate",  
     "fct\_helios\_recovery\_bureau"  
   \],  
   "weaponization\_potential": "high through tracking, targeting, and route denial",  
   "forbidden\_misreadings": \[  
     "omniscient supernatural sight"  
   \],  
   "public\_summary": "A damaged but powerful surveillance field imposed over selected urban sectors.",  
   "internal\_notes": "Important for chase logic and rooftop visibility risk.",  
   "canon\_confidence": "high\_canon",  
   "visibility": "public",  
   "tags": \["technology", "surveillance", "drone"\]  
 }  
\]  
---

## **7.7 `weapon_systems.seed.json`**

\[  
 {  
   "id": "wpn\_monoblade\_reactive\_edge\_01",  
   "name": "Monoblade Reactive Edge 01",  
   "class": "blade",  
   "energy\_requirements": "low to moderate when edge assist is active",  
   "platform\_type": "personal close-quarters weapon",  
   "effective\_range": "close",  
   "operational\_constraints": \[  
     "requires precision handling",  
     "degrades under extended thermal stress"  
   \],  
   "signature\_effects": \[  
     "clean armor scoring",  
     "high-precision strike profile"  
   \],  
   "failure\_risks": \[  
     "edge instability if improperly tuned"  
   \],  
   "authorized\_factions": \[  
     "fct\_shirogane\_remnant"  
   \],  
   "era\_validity": \[  
     "era\_late\_entropy\_industrial\_age"  
   \],  
   "public\_summary": "A precision blade optimized for controlled lethality rather than spectacle.",  
   "internal\_notes": "Fit for Mikage combat language.",  
   "canon\_confidence": "high\_canon",  
   "visibility": "restricted",  
   "tags": \["weapon", "precision", "blade"\]  
 }  
\]  
---

## **7.8 `timeline_anchors.seed.json`**

\[  
 {  
   "id": "anchor\_pcm\_000",  
   "label": "Pre-Collapse Baseline",  
   "absolute\_order": 100,  
   "era\_id": "era\_pre\_collapse\_industrial\_memory",  
   "description": "Stable reference point before deep fragmentation.",  
   "related\_event\_ids": \[\]  
 },  
 {  
   "id": "anchor\_pcm\_999",  
   "label": "Collapse Threshold",  
   "absolute\_order": 199,  
   "era\_id": "era\_pre\_collapse\_industrial\_memory",  
   "description": "The threshold after which continuity becomes fractured.",  
   "related\_event\_ids": \[\]  
 },  
 {  
   "id": "anchor\_leia\_000",  
   "label": "Late Entropy Opening",  
   "absolute\_order": 200,  
   "era\_id": "era\_late\_entropy\_industrial\_age",  
   "description": "Operational beginning of the primary runtime age.",  
   "related\_event\_ids": \[\]  
 },  
 {  
   "id": "anchor\_leia\_041",  
   "label": "District 09 Fracture Sequence",  
   "absolute\_order": 241,  
   "era\_id": "era\_late\_entropy\_industrial\_age",  
   "description": "A cluster of events around industrial containment failure and loyalty breakage.",  
   "related\_event\_ids": \[  
     "evt\_mikage\_foundational\_trauma",  
     "evt\_district\_09\_containment\_breach",  
     "evt\_mikage\_reactor\_body\_damage",  
     "evt\_mikage\_loyalty\_fracture"  
   \]  
 }  
\]  
---

## **7.9 `events.seed.json`**

\[  
 {  
   "id": "evt\_mikage\_foundational\_trauma",  
   "name": "Mikage Foundational Trauma",  
   "event\_type": "betrayal",  
   "era\_id": "era\_late\_entropy\_industrial\_age",  
   "timeline\_anchor\_id": "anchor\_leia\_041",  
   "start\_time\_label": "fracture-sequence / phase-01",  
   "end\_time\_label": null,  
   "location\_id": "loc\_kagetsu\_undercity\_drain\_sector\_4",  
   "summary": "An origin-level betrayal that permanently links Mikage's identity to pain, secrecy, and refusal of ornamental violence.",  
   "trigger": "Operational trust was violated during a covert transfer sequence.",  
   "participants": \[  
     "char\_mikage",  
     "fct\_shirogane\_remnant",  
     "fct\_helios\_recovery\_bureau"  
   \],  
   "causal\_parents": \[\],  
   "immediate\_consequences": \[  
     "loss of trust stability",  
     "memory compartmentalization",  
     "alignment hardening"  
   \],  
   "persistent\_consequences": \[  
     "identity compression",  
     "relationship distrust",  
     "baseline emotional containment"  
   \],  
   "public\_knowledge\_level": "classified",  
   "canon\_confidence": "high\_canon",  
   "visibility": "restricted",  
   "tags": \["event", "trauma", "identity"\]  
 },  
 {  
   "id": "evt\_district\_09\_containment\_breach",  
   "name": "District 09 Containment Breach",  
   "event\_type": "conflict",  
   "era\_id": "era\_late\_entropy\_industrial\_age",  
   "timeline\_anchor\_id": "anchor\_leia\_041",  
   "start\_time\_label": "fracture-sequence / phase-02",  
   "end\_time\_label": null,  
   "location\_id": "loc\_kagetsu\_industrial\_district\_09",  
   "summary": "A controlled district suffered a breach event that escalated faction tension and exposed infrastructure fragility.",  
   "trigger": "Containment routing failed under conflicting intervention priorities.",  
   "participants": \[  
     "fct\_kurovas\_industrial\_directorate",  
     "fct\_helios\_recovery\_bureau",  
     "char\_mikage"  
   \],  
   "causal\_parents": \[  
     "evt\_mikage\_foundational\_trauma"  
   \],  
   "immediate\_consequences": \[  
     "patrol escalation",  
     "surveillance saturation",  
     "district lockdown"  
   \],  
   "persistent\_consequences": \[  
     "hostility increase",  
     "infrastructure paranoia",  
     "urban access tightening"  
   \],  
   "public\_knowledge\_level": "public",  
   "canon\_confidence": "high\_canon",  
   "visibility": "public",  
   "tags": \["event", "conflict", "district"\]  
 },  
 {  
   "id": "evt\_mikage\_reactor\_body\_damage",  
   "name": "Mikage Reactor Body Damage",  
   "event\_type": "injury",  
   "era\_id": "era\_late\_entropy\_industrial\_age",  
   "timeline\_anchor\_id": "anchor\_leia\_041",  
   "start\_time\_label": "fracture-sequence / phase-03",  
   "end\_time\_label": null,  
   "location\_id": "loc\_kagetsu\_industrial\_district\_09",  
   "summary": "Mikage sustained systemic internal damage resulting in visible crimson conduit leakage under armor fracture conditions.",  
   "trigger": "Combat and routing stress exceeded reactor-safe load tolerance.",  
   "participants": \[  
     "char\_mikage"  
   \],  
   "causal\_parents": \[  
     "evt\_district\_09\_containment\_breach"  
   \],  
   "immediate\_consequences": \[  
     "armor fracture",  
     "reactor instability",  
     "pain threshold overload"  
   \],  
   "persistent\_consequences": \[  
     "crimson leakage under damage states",  
     "maintenance dependency",  
     "combat endurance constraint"  
   \],  
   "public\_knowledge\_level": "restricted",  
   "canon\_confidence": "absolute\_canon",  
   "visibility": "restricted",  
   "tags": \["event", "injury", "body-damage", "crimson"\]  
 },  
 {  
   "id": "evt\_mikage\_loyalty\_fracture",  
   "name": "Mikage Loyalty Fracture",  
   "event\_type": "faction\_shift",  
   "era\_id": "era\_late\_entropy\_industrial\_age",  
   "timeline\_anchor\_id": "anchor\_leia\_041",  
   "start\_time\_label": "fracture-sequence / phase-04",  
   "end\_time\_label": null,  
   "location\_id": "loc\_kagetsu\_rooftop\_maintenance\_platform\_12",  
   "summary": "A confrontation crystallized Mikage's break from blind obedience and redirected loyalty toward conditional agency.",  
   "trigger": "Command expectations became incompatible with survival of selfhood.",  
   "participants": \[  
     "char\_mikage",  
     "fct\_shirogane\_remnant"  
   \],  
   "causal\_parents": \[  
     "evt\_mikage\_foundational\_trauma",  
     "evt\_mikage\_reactor\_body\_damage"  
   \],  
   "immediate\_consequences": \[  
     "mission divergence",  
     "trust rupture",  
     "doctrinal tension"  
   \],  
   "persistent\_consequences": \[  
     "conditional faction alignment",  
     "internal conflict",  
     "self-directed decision pattern"  
   \],  
   "public\_knowledge\_level": "classified",  
   "canon\_confidence": "high\_canon",  
   "visibility": "restricted",  
   "tags": \["event", "loyalty", "fracture", "rooftop"\]  
 }  
\]  
---

## **7.10 `relationships.seed.json`**

\[  
 {  
   "id": "rel\_mikage\_member\_shirogane",  
   "source\_entity\_type": "Character",  
   "source\_entity\_id": "char\_mikage",  
   "target\_entity\_type": "Faction",  
   "target\_entity\_id": "fct\_shirogane\_remnant",  
   "relationship\_type": "member\_of",  
   "start\_event\_id": null,  
   "end\_event\_id": null,  
   "strength": 0.68,  
   "confidence\_score": 0.94,  
   "visibility": "restricted",  
   "canon\_confidence": "high\_canon",  
   "notes": "Alignment persists but is no longer unconditional after loyalty fracture."  
 },  
 {  
   "id": "rel\_kurovas\_controls\_district09",  
   "source\_entity\_type": "Faction",  
   "source\_entity\_id": "fct\_kurovas\_industrial\_directorate",  
   "target\_entity\_type": "Location",  
   "target\_entity\_id": "loc\_kagetsu\_industrial\_district\_09",  
   "relationship\_type": "controls",  
   "start\_event\_id": null,  
   "end\_event\_id": null,  
   "strength": 0.91,  
   "confidence\_score": 0.98,  
   "visibility": "public",  
   "canon\_confidence": "absolute\_canon",  
   "notes": "Industrial district remains under directorate control."  
 },  
 {  
   "id": "rel\_rooftop\_part\_of\_district09",  
   "source\_entity\_type": "Location",  
   "source\_entity\_id": "loc\_kagetsu\_rooftop\_maintenance\_platform\_12",  
   "target\_entity\_type": "Location",  
   "target\_entity\_id": "loc\_kagetsu\_industrial\_district\_09",  
   "relationship\_type": "part\_of",  
   "start\_event\_id": null,  
   "end\_event\_id": null,  
   "strength": 1.0,  
   "confidence\_score": 1.0,  
   "visibility": "public",  
   "canon\_confidence": "absolute\_canon",  
   "notes": "Structural hierarchy relation."  
 },  
 {  
   "id": "rel\_mikage\_uses\_mask\_system",  
   "source\_entity\_type": "Character",  
   "source\_entity\_id": "char\_mikage",  
   "target\_entity\_type": "TechnologySystem",  
   "target\_entity\_id": "tech\_mask\_boron\_carbide\_kitsune\_shell",  
   "relationship\_type": "uses",  
   "start\_event\_id": null,  
   "end\_event\_id": null,  
   "strength": 1.0,  
   "confidence\_score": 1.0,  
   "visibility": "restricted",  
   "canon\_confidence": "absolute\_canon",  
   "notes": "Core identity-linked equipment relation."  
 },  
 {  
   "id": "rel\_mikage\_injured\_in\_body\_damage",  
   "source\_entity\_type": "Character",  
   "source\_entity\_id": "char\_mikage",  
   "target\_entity\_type": "Event",  
   "target\_entity\_id": "evt\_mikage\_reactor\_body\_damage",  
   "relationship\_type": "injured\_in",  
   "start\_event\_id": "evt\_mikage\_reactor\_body\_damage",  
   "end\_event\_id": null,  
   "strength": 1.0,  
   "confidence\_score": 1.0,  
   "visibility": "restricted",  
   "canon\_confidence": "absolute\_canon",  
   "notes": "Persistent body-damage origin relation."  
 },  
 {  
   "id": "rel\_breach\_causes\_body\_damage",  
   "source\_entity\_type": "Event",  
   "source\_entity\_id": "evt\_district\_09\_containment\_breach",  
   "target\_entity\_type": "Event",  
   "target\_entity\_id": "evt\_mikage\_reactor\_body\_damage",  
   "relationship\_type": "causes",  
   "start\_event\_id": "evt\_district\_09\_containment\_breach",  
   "end\_event\_id": null,  
   "strength": 0.87,  
   "confidence\_score": 0.94,  
   "visibility": "meta\_internal",  
   "canon\_confidence": "high\_canon",  
   "notes": "Primary causal chain."  
 },  
 {  
   "id": "rel\_visual\_governs\_mikage",  
   "source\_entity\_type": "VisualDNAProfile",  
   "source\_entity\_id": "vis\_mikage\_core\_lock",  
   "target\_entity\_type": "Character",  
   "target\_entity\_id": "char\_mikage",  
   "relationship\_type": "governs\_visual\_identity\_of",  
   "start\_event\_id": null,  
   "end\_event\_id": null,  
   "strength": 1.0,  
   "confidence\_score": 1.0,  
   "visibility": "meta\_internal",  
   "canon\_confidence": "absolute\_canon",  
   "notes": "No visual drift allowed outside this lock."  
 }  
\]  
---

## **7.11 `rules.seed.json`**

\[  
 {  
   "id": "rule\_no\_free\_power",  
   "rule\_group": "absolute\_invariants",  
   "rule\_text": "No system, weapon, armor, or phenomenon may produce meaningful power without an operational source, routing logic, and measurable cost.",  
   "severity": "fatal",  
   "scope": \["TechnologySystem", "WeaponSystem", "Event", "PromptContextProfile"\],  
   "examples\_valid": \[  
     "Crimson leakage appears only as reactor failure signature with thermodynamic consequence."  
   \],  
   "examples\_invalid": \[  
     "A damaged body emits pure energy without source or cost."  
   \],  
   "validator\_binding": "ontology.energy\_cost.required"  
 },  
 {  
   "id": "rule\_no\_magic\_disguised\_as\_technology",  
   "rule\_group": "absolute\_invariants",  
   "rule\_text": "Technology may not behave as supernatural force under decorative pseudo-scientific phrasing.",  
   "severity": "fatal",  
   "scope": \["TechnologySystem", "Event", "NarrativeContext", "PromptContextProfile"\],  
   "examples\_valid": \[  
     "Conduit glow caused by reactor leakage under structural damage."  
   \],  
   "examples\_invalid": \[  
     "The mask awakens spiritually and grants transcendence."  
   \],  
   "validator\_binding": "ontology.anti\_magic.enforced"  
 },  
 {  
   "id": "rule\_beauty\_must\_carry\_damage",  
   "rule\_group": "visual\_philosophy",  
   "rule\_text": "High-value beauty in Mikage visual language must carry trace of damage, cost, or material consequence.",  
   "severity": "major",  
   "scope": \["VisualDNAProfile", "AssetReference", "PromptContextProfile"\],  
   "examples\_valid": \[  
     "Glossy ceramic surface with fracture history or operational wear."  
   \],  
   "examples\_invalid": \[  
     "Perfect ornamental glamor without consequence."  
   \],  
   "validator\_binding": "visual.damage\_language.required"  
 },  
 {  
   "id": "rule\_violence\_has\_consequence",  
   "rule\_group": "world\_logic",  
   "rule\_text": "Every violent act of significance must produce traceable physical, relational, political, or systemic consequence.",  
   "severity": "critical",  
   "scope": \["Event", "NarrativeContext"\],  
   "examples\_valid": \[  
     "Combat event leads to injury, escalation, or access lockdown."  
   \],  
   "examples\_invalid": \[  
     "Massive conflict occurs with no persistent aftermath."  
   \],  
   "validator\_binding": "event.consequence.required"  
 },  
 {  
   "id": "rule\_mikage\_visual\_lock",  
   "rule\_group": "character\_lock",  
   "rule\_text": "Mikage must preserve porcelain purity, void-black support structure, restrained crimson failure accent, and hard sci-fi industrial framing.",  
   "severity": "fatal",  
   "scope": \["VisualDNAProfile", "PromptContextProfile", "AssetReference"\],  
   "examples\_valid": \[  
     "White ceramic mask, black support structure, crimson leakage only through damage."  
   \],  
   "examples\_invalid": \[  
     "Pastel cyber idol Mikage with magical fox fire."  
   \],  
   "validator\_binding": "visual.mikage.lock"  
 }  
\]  
---

# **8\) JSON SCHEMA PACK — FILE CONTENT TEMPLATE**

Dưới đây là format schema để dev có thể dựng validator thật ngay.

## **8.1 `character.schema.json`**

{  
 "$schema": "http://json-schema.org/draft-07/schema\#",  
 "title": "Character",  
 "type": "object",  
 "required": \[  
   "id",  
   "canonical\_name",  
   "status",  
   "origin\_era\_id",  
   "identity\_core",  
   "visual\_dna\_profile\_id",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "properties": {  
   "id": { "type": "string", "pattern": "^char\_\[a-z0-9\_\]+$" },  
   "canonical\_name": { "type": "string", "minLength": 1 },  
   "aliases": {  
     "type": "array",  
     "items": { "type": "string" }  
   },  
   "status": {  
     "type": "string",  
     "enum": \["active", "missing", "deceased", "contained", "fragmented", "unknown"\]  
   },  
   "origin\_era\_id": { "type": "string", "pattern": "^era\_\[a-z0-9\_\]+$" },  
   "current\_faction\_id": {  
     "type": \["string", "null"\],  
     "pattern": "^fct\_\[a-z0-9\_\]+$"  
   },  
   "biological\_type": { "type": "string" },  
   "synthetic\_degree": { "type": "number", "minimum": 0, "maximum": 1 },  
   "identity\_core": { "type": "string", "minLength": 12 },  
   "psychological\_profile": { "type": "object" },  
   "baseline\_capabilities": { "type": "object" },  
   "baseline\_limitations": { "type": "object" },  
   "visual\_dna\_profile\_id": { "type": "string", "pattern": "^vis\_\[a-z0-9\_\]+$" },  
   "public\_summary": { "type": "string" },  
   "internal\_notes": { "type": "string" },  
   "canon\_confidence": {  
     "type": "string",  
     "enum": \["absolute\_canon", "high\_canon", "soft\_canon", "reported", "unknown", "contested"\]  
   },  
   "visibility": {  
     "type": "string",  
     "enum": \["public", "restricted", "classified", "black", "meta\_internal"\]  
   },  
   "tags": {  
     "type": "array",  
     "minItems": 1,  
     "items": { "type": "string" }  
   },  
   "created\_at": { "type": "string" },  
   "updated\_at": { "type": "string" }  
 },  
 "additionalProperties": false  
}

## **8.2 `event.schema.json`**

{  
 "$schema": "http://json-schema.org/draft-07/schema\#",  
 "title": "Event",  
 "type": "object",  
 "required": \[  
   "id",  
   "name",  
   "event\_type",  
   "era\_id",  
   "timeline\_anchor\_id",  
   "location\_id",  
   "trigger",  
   "participants",  
   "immediate\_consequences",  
   "persistent\_consequences",  
   "canon\_confidence",  
   "visibility",  
   "tags"  
 \],  
 "properties": {  
   "id": { "type": "string", "pattern": "^evt\_\[a-z0-9\_\]+$" },  
   "name": { "type": "string", "minLength": 1 },  
   "event\_type": {  
     "type": "string",  
     "enum": \[  
       "birth",  
       "awakening",  
       "injury",  
       "betrayal",  
       "conflict",  
       "deployment",  
       "containment",  
       "discovery",  
       "collapse",  
       "migration",  
       "memory\_loss",  
       "faction\_shift",  
       "technology\_failure"  
     \]  
   },  
   "era\_id": { "type": "string", "pattern": "^era\_\[a-z0-9\_\]+$" },  
   "timeline\_anchor\_id": { "type": "string", "pattern": "^anchor\_\[a-z0-9\_\]+$" },  
   "start\_time\_label": { "type": "string" },  
   "end\_time\_label": { "type": \["string", "null"\] },  
   "location\_id": { "type": "string", "pattern": "^loc\_\[a-z0-9\_\]+$" },  
   "summary": { "type": "string" },  
   "trigger": { "type": "string", "minLength": 10 },  
   "participants": {  
     "type": "array",  
     "minItems": 1,  
     "items": { "type": "string" }  
   },  
   "causal\_parents": {  
     "type": "array",  
     "items": { "type": "string", "pattern": "^evt\_\[a-z0-9\_\]+$" }  
   },  
   "immediate\_consequences": {  
     "type": "array",  
     "minItems": 1,  
     "items": { "type": "string" }  
   },  
   "persistent\_consequences": {  
     "type": "array",  
     "minItems": 1,  
     "items": { "type": "string" }  
   },  
   "public\_knowledge\_level": {  
     "type": "string",  
     "enum": \["public", "restricted", "classified", "black", "meta\_internal"\]  
   },  
   "canon\_confidence": {  
     "type": "string",  
     "enum": \["absolute\_canon", "high\_canon", "soft\_canon", "reported", "unknown", "contested"\]  
   },  
   "visibility": {  
     "type": "string",  
     "enum": \["public", "restricted", "classified", "black", "meta\_internal"\]  
   },  
   "tags": {  
     "type": "array",  
     "minItems": 1,  
     "items": { "type": "string" }  
   }  
 },  
 "additionalProperties": false  
}

## **8.3 `relationship.schema.json`**

{  
 "$schema": "http://json-schema.org/draft-07/schema\#",  
 "title": "Relationship",  
 "type": "object",  
 "required": \[  
   "id",  
   "source\_entity\_type",  
   "source\_entity\_id",  
   "target\_entity\_type",  
   "target\_entity\_id",  
   "relationship\_type",  
   "canon\_confidence",  
   "visibility"  
 \],  
 "properties": {  
   "id": { "type": "string", "pattern": "^rel\_\[a-z0-9\_\]+$" },  
   "source\_entity\_type": {  
     "type": "string",  
     "enum": \[  
       "Character",  
       "Faction",  
       "Location",  
       "Era",  
       "TechnologySystem",  
       "WeaponSystem",  
       "Event",  
       "Relationship",  
       "VisualDNAProfile",  
       "CanonRule",  
       "TimelineAnchor",  
       "CanonRevision"  
     \]  
   },  
   "source\_entity\_id": { "type": "string", "minLength": 3 },  
   "target\_entity\_type": {  
     "type": "string",  
     "enum": \[  
       "Character",  
       "Faction",  
       "Location",  
       "Era",  
       "TechnologySystem",  
       "WeaponSystem",  
       "Event",  
       "Relationship",  
       "VisualDNAProfile",  
       "CanonRule",  
       "TimelineAnchor",  
       "CanonRevision"  
     \]  
   },  
   "target\_entity\_id": { "type": "string", "minLength": 3 },  
   "relationship\_type": {  
     "type": "string",  
     "enum": \[  
       "member\_of",  
       "controls",  
       "opposes",  
       "allied\_with",  
       "located\_at",  
       "participated\_in",  
       "injured\_in",  
       "uses",  
       "developed\_by",  
       "restricted\_to",  
       "part\_of",  
       "causes",  
       "governs\_visual\_identity\_of",  
       "knows\_secret\_of",  
       "owes\_debt\_to",  
       "hunted\_by"  
     \]  
   },  
   "start\_event\_id": {  
     "type": \["string", "null"\]  
   },  
   "end\_event\_id": {  
     "type": \["string", "null"\]  
   },  
   "strength": {  
     "type": "number",  
     "minimum": 0,  
     "maximum": 1  
   },  
   "confidence\_score": {  
     "type": "number",  
     "minimum": 0,  
     "maximum": 1  
   },  
   "visibility": {  
     "type": "string",  
     "enum": \["public", "restricted", "classified", "black", "meta\_internal"\]  
   },  
   "canon\_confidence": {  
     "type": "string",  
     "enum": \["absolute\_canon", "high\_canon", "soft\_canon", "reported", "unknown", "contested"\]  
   },  
   "notes": { "type": "string" }  
 },  
 "additionalProperties": false  
}

Phần còn lại dựng theo cùng format này.

---

# **9\) VALIDATOR RULES — WORLD BIBLE RULEPACK**

## **9.1 `world_bible.rulepack.json`**

{  
 "rulepack\_id": "world\_bible\_core\_v1",  
 "rules": \[  
   {  
     "id": "wb\_required\_ids\_exist",  
     "severity": "fatal",  
     "description": "All referenced IDs must resolve to an existing entity."  
   },  
   {  
     "id": "wb\_event\_requires\_consequences",  
     "severity": "critical",  
     "description": "Every event must have at least one immediate and one persistent consequence."  
   },  
   {  
     "id": "wb\_character\_requires\_visual\_dna",  
     "severity": "fatal",  
     "description": "Every primary character must bind to one visual DNA profile."  
   },  
   {  
     "id": "wb\_location\_hierarchy\_no\_cycle",  
     "severity": "fatal",  
     "description": "Location part-of hierarchy may not contain cycles."  
   },  
   {  
     "id": "wb\_no\_duplicate\_canonical\_name\_same\_scope",  
     "severity": "major",  
     "description": "Canonical names must be unique within same entity type unless aliased intentionally."  
   },  
   {  
     "id": "wb\_relation\_must\_match\_allowed\_registry",  
     "severity": "fatal",  
     "description": "Relationship triples must exist in allowed relation registry."  
   }  
 \]  
}  
---

## **9.2 `ontology.rulepack.json`**

{  
 "rulepack\_id": "world\_bible\_ontology\_v1",  
 "rules": \[  
   {  
     "id": "ont\_no\_free\_power",  
     "severity": "fatal",  
     "description": "No technology, weapon, event, or visual effect may imply free power."  
   },  
   {  
     "id": "ont\_no\_magic\_disguised\_as\_technology",  
     "severity": "fatal",  
     "description": "No supernatural explanation under technical wording."  
   },  
   {  
     "id": "ont\_power\_leaves\_trace",  
     "severity": "critical",  
     "description": "Any high-energy operation must leave measurable or visible trace."  
   },  
   {  
     "id": "ont\_beauty\_requires\_damage\_trace",  
     "severity": "major",  
     "description": "High-value visual beauty must carry cost, wear, fracture, or consequence."  
   }  
 \]  
}  
---

## **9.3 `continuity.rulepack.json`**

{  
 "rulepack\_id": "world\_bible\_continuity\_v1",  
 "rules": \[  
   {  
     "id": "cont\_event\_parent\_must\_precede\_child",  
     "severity": "fatal",  
     "description": "All causal parent events must occur earlier in absolute timeline order."  
   },  
   {  
     "id": "cont\_character\_cannot\_participate\_before\_origin",  
     "severity": "fatal",  
     "description": "Character cannot appear in events before valid existence window."  
   },  
   {  
     "id": "cont\_faction\_control\_must\_match\_time\_window",  
     "severity": "critical",  
     "description": "Location control relations must be valid at event time."  
   },  
   {  
     "id": "cont\_injury\_must\_affect\_later\_state",  
     "severity": "critical",  
     "description": "Major injury events must alter later state or capability context."  
   },  
   {  
     "id": "cont\_loyalty\_shift\_requires\_causal\_basis",  
     "severity": "major",  
     "description": "Faction shift or loyalty fracture must have causal parent chain."  
   }  
 \]  
}  
---

## **9.4 `revision.rulepack.json`**

{  
 "rulepack\_id": "world\_bible\_revision\_v1",  
 "rules": \[  
   {  
     "id": "rev\_absolute\_canon\_changes\_require\_approval",  
     "severity": "fatal",  
     "description": "Any change to absolute canon records must include approval."  
   },  
   {  
     "id": "rev\_event\_change\_requires\_cascade\_scan",  
     "severity": "critical",  
     "description": "Event changes require impact scan across descendants and related states."  
   },  
   {  
     "id": "rev\_visual\_lock\_change\_high\_risk",  
     "severity": "fatal",  
     "description": "Changes to primary visual DNA locks trigger immediate red review."  
   }  
 \]  
}  
---

# **10\) FILE STRUCTURE — STUDIO PACK**

/world\_bible  
 /schemas  
   character.schema.json  
   faction.schema.json  
   location.schema.json  
   era.schema.json  
   technology\_system.schema.json  
   weapon\_system.schema.json  
   event.schema.json  
   relationship.schema.json  
   visual\_dna\_profile.schema.json  
   canon\_rule.schema.json  
   timeline\_anchor.schema.json  
   canon\_revision.schema.json

 /seed  
   characters.seed.json  
   factions.seed.json  
   locations.seed.json  
   eras.seed.json  
   technologies.seed.json  
   weapon\_systems.seed.json  
   events.seed.json  
   relationships.seed.json  
   visual\_dna.seed.json  
   rules.seed.json  
   timeline\_anchors.seed.json

 /registry  
   enum\_registry.json  
   relation\_registry.json  
   entity\_registry.json  
   id\_convention.md

 /validator  
   world\_bible.rulepack.json  
   ontology.rulepack.json  
   continuity.rulepack.json  
   revision.rulepack.json  
   forbidden\_terms.json

 /revisions  
   0001\_initial\_foundation.json

 /exports  
   world\_bible.snapshot.json  
   prompt\_context.snapshot.json  
   narrative\_context.snapshot.json  
   timeline.snapshot.json

 /docs  
   world\_bible\_contract.md  
   data\_entry\_policy.md  
   approval\_workflow.md  
   query\_contracts.md  
---

# **11\) ENTITY REGISTRY TEMPLATE**

## **`entity_registry.json`**

{  
 "core\_entities": \[  
   "Character",  
   "Faction",  
   "Location",  
   "Era",  
   "TechnologySystem",  
   "WeaponSystem",  
   "Event",  
   "Relationship",  
   "VisualDNAProfile",  
   "CanonRule",  
   "TimelineAnchor",  
   "CanonRevision"  
 \],  
 "primary\_character\_ids": \[  
   "char\_mikage"  
 \],  
 "primary\_runtime\_era\_ids": \[  
   "era\_late\_entropy\_industrial\_age"  
 \],  
 "primary\_runtime\_location\_ids": \[  
   "loc\_megacity\_kagetsu",  
   "loc\_kagetsu\_rooftop\_maintenance\_platform\_12"  
 \]  
}  
---

# **12\) FORBIDDEN TERMS PACK**

## **`forbidden_terms.json`**

{  
 "fantasy\_drift\_terms": \[  
   "soul fire",  
   "spirit energy",  
   "divine awakening",  
   "enchanted",  
   "arcane",  
   "mystical aura",  
   "fox spirit blessing",  
   "sacred magic"  
 \],  
 "visual\_drift\_terms": \[  
   "idol",  
   "kawaii",  
   "pastel glam",  
   "cute heroine",  
   "rainbow neon",  
   "magical girl"  
 \],  
 "soft\_warning\_terms": \[  
   "ethereal",  
   "otherworldly",  
   "mythic"  
 \]  
}  
---

# **13\) QUERY CONTRACTS**

## **13.1 Prompt compiler query**

**Input:** character \+ era \+ location \+ objective  
 **Output:**

* visual DNA rules

* era rules

* location motifs

* forbidden pairings

* valid technology range

## **13.2 Narrative engine query**

**Input:** event or timeline anchor  
 **Output:**

* active faction relations

* character current burdens

* unresolved conflicts

* valid causal parents

* known secrets by visibility

## **13.3 Validator query**

**Input:** event draft / prompt pack / scene pack  
 **Output:**

* contradiction list

* ontology violations

* continuity warnings

* approval recommendation

---

# **14\) APPROVAL WORKFLOW**

draft entity  
→ schema validation  
→ relation resolution  
→ ontology validation  
→ continuity validation  
→ human review  
→ canonical publish  
→ snapshot export  
→ downstream sync  
---

# **15\) MVP BUILD ORDER**

Triển khai đúng thứ tự này để không gãy hệ:

## **Phase 1**

* schemas

* enum registry

* relation registry

* ID convention

* seed: eras / factions / locations / character / visual\_dna / rules

## **Phase 2**

* seed: technologies / weapon systems / timeline anchors / events / relationships

## **Phase 3**

* validators

* snapshot exporters

* contradiction scanner

## **Phase 4**

* bind sang narrative engine

* bind sang prompt compiler

* bind sang generation orchestrator

* bind sang studio UI

