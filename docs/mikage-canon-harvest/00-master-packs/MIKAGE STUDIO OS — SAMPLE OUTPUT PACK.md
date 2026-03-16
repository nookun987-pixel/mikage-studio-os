Đây là **bản master hoàn chỉnh duy nhất** cho **Sample Output Pack** của Mikage Studio OS, ở dạng **production-grade, copy-paste-ready**.

---

# **1\. PACK PURPOSE**

Pack này dùng để:

* làm mẫu chuẩn cho toàn bộ hệ Mikage Studio OS

* test form input của 6 mode trong Opal

* test forced JSON output của 8 node Gemini

* chứng minh 1 pipeline hoàn chỉnh từ user request → final production JSON

* làm benchmark mẫu để sau này QA, regression test, drift audit

---

# **2\. GLOBAL SAMPLE CONTEXT**

## **2.1 Canon baseline dùng cho toàn bộ sample**

project\_id: mikage\_studio\_os  
universe\_id: mikage\_prime  
canon\_version: v1.0  
ontology:  
 genre: hard\_sci\_fi  
 physics: physical\_causality  
 energy\_rule: no\_free\_power  
 damage\_rule: power\_leaves\_trace  
 aesthetic\_rule: beauty\_must\_carry\_damage  
 violence\_rule: violence\_has\_consequence  
drift\_policy:  
 forbid\_fantasy: true  
 forbid\_magic\_tech: true  
 forbid\_anime\_exaggeration: true  
 forbid\_neon\_cyberpunk\_excess: true  
character\_baseline:  
 id: char\_mikage\_001  
 name: Mikage  
 silhouette: tall\_slender\_combat\_feminine  
 signature\_mask: seamless\_white\_kitsune\_mask  
 armor\_language: fractured\_white\_ceramic\_over\_black\_structure  
 internal\_light: restrained\_crimson\_damage\_glow\_only  
 hair: long\_black  
visual\_grammar:  
 palette:  
   \- porcelain\_white  
   \- carbon\_black  
   \- dark\_titanium  
   \- restrained\_crimson  
   \- storm\_grey  
 texture\_rules:  
   \- ceramic\_crack\_detail  
   \- wet\_industrial\_surfaces  
   \- matte\_black\_structural\_reinforcement  
 camera\_rules:  
   \- cinematic  
   \- monumental\_scale  
   \- hard\_sci\_fi\_discipline  
   \- no\_anime\_framing  
---

# **3\. SAMPLE INPUTS FOR 6 OPAL MODES**

---

## **3.1 OPAL MODE — CANON QUERY**

## **Sample Input**

{  
 "mode": "canon\_query",  
 "request\_id": "opal-cq-001",  
 "user\_goal": "Kiểm tra Mikage trong một cảnh rooftop mưa bão có được dùng crimson glow mạnh hay không, và giới hạn visual của city background là gì.",  
 "query\_type": "rule\_lookup",  
 "target\_entities": \[  
   "Mikage",  
   "storm rooftop scene",  
   "city background",  
   "crimson glow"  
 \],  
 "questions": \[  
   "Crimson glow của Mikage được phép mạnh đến mức nào?",  
   "City background được phép futuristic đến mức nào trước khi thành cyberpunk drift?",  
   "Có được thêm energy aura quanh người không?"  
 \],  
 "required\_output": "concise\_canon\_answer",  
 "canon\_version": "v1.0"  
}

## **Sample Output Expectation**

{  
 "mode": "canon\_query",  
 "status": "resolved",  
 "answer\_packet": {  
   "entity": "Mikage",  
   "rules": \[  
     {  
       "rule": "crimson\_glow\_limit",  
       "answer": "Allowed only as restrained internal damage leakage from cracks, conduits, or reactor stress. Never full-body emission."  
     },  
     {  
       "rule": "city\_background\_limit",  
       "answer": "Industrial hard sci-fi megacity is allowed; excessive neon spectacle, hologram overload, and decorative cyberpunk density are forbidden."  
     },  
     {  
       "rule": "energy\_aura",  
       "answer": "Forbidden. No magical aura, no supernatural halo, no unexplained atmospheric power field."  
     }  
   \],  
   "verdict": "Use restrained crimson trace only. Keep city brutalist-industrial, not neon-cyberpunk."  
 }  
}  
---

## **3.2 OPAL MODE — SCENE BUILDER**

## **Sample Input**

{  
 "mode": "scene\_builder",  
 "request\_id": "opal-sb-001",  
 "scene\_id": "scene\_rooftop\_storm\_001",  
 "character": "Mikage",  
 "intent": "heroic\_confrontation",  
 "location": "upper maintenance deck of brutalist megacity rooftop",  
 "time": "night",  
 "weather": "violent rainstorm",  
 "dramatic\_goal": "Show Mikage as calm, damaged, sovereign, and dangerous before battle.",  
 "constraints": {  
   "camera\_feel": "anamorphic cinematic low-angle",  
   "power\_display": "restrained",  
   "background\_density": "industrial monumental",  
   "forbidden\_elements": \[  
     "anime face exaggeration",  
     "fantasy aura",  
     "neon cyberpunk overload",  
     "floating magic particles"  
   \]  
 },  
 "required\_output": "scene\_packet"  
}

## **Sample Output Expectation**

{  
 "mode": "scene\_builder",  
 "status": "resolved",  
 "scene\_packet": {  
   "scene\_id": "scene\_rooftop\_storm\_001",  
   "core\_beat": "Mikage stands at the edge of a storm-lashed rooftop moments before a decisive confrontation.",  
   "environment": {  
     "location\_type": "brutalist\_megacity\_rooftop",  
     "surface\_state": "wet concrete, drainage overflow, maintenance rails, exposed housings",  
     "atmosphere": "rain, mist, crosswind, industrial haze",  
     "background": "colossal steel towers, antenna forests, cooling stacks, sparse sodium lights"  
   },  
   "character\_presentation": {  
     "pose": "upright, still, forward-facing slight angle",  
     "emotion": "cold restraint",  
     "damage\_visibility": "ceramic fractures with faint crimson leakage",  
     "hair\_motion": "violent wind displacement"  
   },  
   "camera": {  
     "framing": "low-angle wide anamorphic",  
     "scale": "monumental",  
     "contrast": "extreme chiaroscuro"  
   },  
   "canon\_risk\_flags": \[\],  
   "build\_status": "ready\_for\_narrative\_translation"  
 }  
}  
---

## **3.3 OPAL MODE — SCRIPT BUILDER**

## **Sample Input**

{  
 "mode": "script\_builder",  
 "request\_id": "opal-sc-001",  
 "scene\_id": "scene\_rooftop\_storm\_001",  
 "story\_function": "pre\_battle\_character\_reveal",  
 "length\_target": "short\_scene",  
 "dialogue\_density": "minimal",  
 "character\_focus": \[  
   "Mikage"  
 \],  
 "narrative\_constraints": {  
   "preserve\_mystique": true,  
   "avoid\_exposition\_dump": true,  
   "show\_damage\_cost": true,  
   "show\_consequence\_tension": true  
 },  
 "required\_output": "cinematic\_script\_fragment"  
}

## **Sample Output Expectation**

{  
 "mode": "script\_builder",  
 "status": "resolved",  
 "script\_packet": {  
   "scene\_id": "scene\_rooftop\_storm\_001",  
   "slugline": "EXT. MEGACITY ROOFTOP \- NIGHT \- STORM",  
   "narrative\_purpose": "Reveal Mikage's controlled power and visible cost before combat.",  
   "beats": \[  
     "Rain lashes the rooftop.",  
     "Mikage stands motionless at the ledge, white mask cold against the storm.",  
     "Crimson light leaks faintly from cracked ceramic armor beneath the rain.",  
     "The city below hums like an exhausted machine.",  
     "She turns slightly toward the unseen threat."  
   \],  
   "dialogue": \[  
     {  
       "speaker": "Mikage",  
       "line": "If you came to witness strength, then witness the damage that paid for it."  
     }  
   \],  
   "tone": "sacred, brutal, restrained"  
 }  
}  
---

## **3.4 OPAL MODE — PRODUCTION PACKAGE**

## **Sample Input**

{  
 "mode": "production\_package",  
 "request\_id": "opal-pp-001",  
 "scene\_id": "scene\_rooftop\_storm\_001",  
 "output\_type": "cinematic\_keyframe",  
 "target\_model\_family": "image\_generation",  
 "quality\_tier": "production\_grade",  
 "include\_negative\_prompt": true,  
 "include\_metadata": true,  
 "include\_lineage": true,  
 "required\_output": "production\_asset\_package"  
}

## **Sample Output Expectation**

{  
 "mode": "production\_package",  
 "status": "resolved",  
 "production\_package": {  
   "asset\_type": "cinematic\_keyframe",  
   "prompt": "A monumental hard sci-fi cinematic frame of Mikage on a storm-lashed brutalist megacity rooftop at night...",  
   "negative\_prompt": "anime, fantasy aura, neon cyberpunk overload, magical particles, colorful hologram city, soft cute face, cartoon, exaggerated proportions...",  
   "render\_intent": {  
     "camera": "low-angle wide anamorphic",  
     "lighting": "extreme chiaroscuro with restrained crimson internal leakage",  
     "material\_focus": "white ceramic, black carbon structure, wet concrete, dark titanium"  
   },  
   "metadata": {  
     "character\_id": "char\_mikage\_001",  
     "scene\_id": "scene\_rooftop\_storm\_001",  
     "canon\_version": "v1.0"  
   },  
   "lineage": {  
     "source\_mode": "production\_package",  
     "upstream\_packets": \[  
       "opal-sb-001",  
       "opal-sc-001"  
     \]  
   }  
 }  
}  
---

## **3.5 OPAL MODE — CANON AUDIT**

## **Sample Input**

{  
 "mode": "canon\_audit",  
 "request\_id": "opal-ca-001",  
 "asset\_candidate": {  
   "type": "prompt\_text",  
   "content": "Mikage stands on a neon rooftop with blazing red aura while holographic dragons spiral behind her in the storm."  
 },  
 "audit\_scope": \[  
   "ontology",  
   "visual\_grammar",  
   "character\_integrity",  
   "power\_logic"  
 \],  
 "required\_output": "audit\_report"  
}

## **Sample Output Expectation**

{  
 "mode": "canon\_audit",  
 "status": "resolved",  
 "audit\_report": {  
   "pass": false,  
   "score": 22,  
   "violations": \[  
     {  
       "type": "ontology\_violation",  
       "issue": "holographic dragons imply fantasy-coded spectacle"  
     },  
     {  
       "type": "power\_logic\_violation",  
       "issue": "blazing red aura exceeds allowed restrained internal leakage"  
     },  
     {  
       "type": "visual\_drift",  
       "issue": "neon rooftop shifts world toward cyberpunk excess"  
     }  
   \],  
   "repair\_actions": \[  
     "Remove dragons entirely",  
     "Replace aura with faint damage-conduit leakage",  
     "Replace neon skyline with industrial steel megacity grammar"  
   \],  
   "verdict": "reject\_and\_rewrite"  
 }  
}  
---

## **3.6 OPAL MODE — ASSET REVIEW**

## **Sample Input**

{  
 "mode": "asset\_review",  
 "request\_id": "opal-ar-001",  
 "asset\_id": "asset\_img\_001",  
 "asset\_summary": {  
   "type": "image",  
   "scene": "Mikage rooftop storm",  
   "observed\_traits": \[  
     "white mask preserved",  
     "good rain atmosphere",  
     "city too colorful",  
     "crimson glow slightly too strong",  
     "armor silhouette correct"  
   \]  
 },  
 "benchmark\_targets": \[  
   "gold\_visual\_dna\_mikage",  
   "silver\_rooftop\_storm\_set"  
 \],  
 "required\_output": "review\_verdict"  
}

## **Sample Output Expectation**

{  
 "mode": "asset\_review",  
 "status": "resolved",  
 "review\_verdict": {  
   "approval\_status": "revise",  
   "similarity": {  
     "gold\_visual\_dna\_mikage": 0.84,  
     "silver\_rooftop\_storm\_set": 0.88  
   },  
   "risk\_scores": {  
     "canon\_drift": 0.31,  
     "visual\_drift": 0.42,  
     "production\_readiness": 0.73  
   },  
   "issues": \[  
     "city saturation too high",  
     "crimson emission exceeds restraint threshold"  
   \],  
   "revision\_directives": \[  
     "desaturate city background",  
     "reduce crimson intensity by 35%",  
     "increase ceramic fracture detail",  
     "preserve current silhouette and weather composition"  
   \],  
   "verdict": "conditional\_revision\_required"  
 }  
}  
---

# **4\. SAMPLE OUTPUTS FOR 8 GEMINI NODES**

Dưới đây là mẫu output chuẩn cho 8 node trong pipeline agent.

---

## **4.1 NODE 1 — STUDIO DIRECTOR**

{  
 "node": "studio\_director",  
 "status": "ok",  
 "request\_packet": {  
   "request\_id": "req\_master\_001",  
   "user\_intent": "Create a production-grade cinematic keyframe of Mikage on a storm rooftop.",  
   "requested\_deliverable": "production\_asset\_package",  
   "priority": "high",  
   "routing\_decision": {  
     "needs\_context": true,  
     "needs\_narrative": true,  
     "needs\_canon\_validation": true,  
     "needs\_benchmark\_review": true  
   },  
   "selected\_pipeline": \[  
     "request\_classifier",  
     "context\_gatherer",  
     "narrative\_builder",  
     "canon\_validator",  
     "production\_packager",  
     "benchmark\_auditor",  
     "decision\_formatter"  
   \]  
 }  
}  
---

## **4.2 NODE 2 — REQUEST CLASSIFIER**

{  
 "node": "request\_classifier",  
 "status": "ok",  
 "classification": {  
   "request\_id": "req\_master\_001",  
   "primary\_type": "asset\_generation",  
   "secondary\_type": "cinematic\_keyframe",  
   "domain": "character\_cinematic\_scene",  
   "entity\_targets": \[  
     "Mikage"  
   \],  
   "required\_inputs": \[  
     "canon\_context",  
     "character\_state",  
     "scene\_frame",  
     "visual\_constraints"  
   \],  
   "blocked\_if\_missing": \[  
     "canon\_context"  
   \]  
 }  
}  
---

## **4.3 NODE 3 — CONTEXT GATHERER**

{  
 "node": "context\_gatherer",  
 "status": "ok",  
 "context\_packet": {  
   "request\_id": "req\_master\_001",  
   "canon\_context": {  
     "ontology": "hard\_sci\_fi",  
     "invariants": \[  
       "no\_free\_power",  
       "power\_leaves\_trace",  
       "beauty\_must\_carry\_damage",  
       "violence\_has\_consequence"  
     \],  
     "drift\_forbidden": \[  
       "fantasy",  
       "anime\_exaggeration",  
       "neon\_cyberpunk\_excess"  
     \]  
   },  
   "character\_context": {  
     "character\_id": "char\_mikage\_001",  
     "mask": "seamless\_white\_kitsune\_mask",  
     "armor": "fractured\_white\_ceramic\_black\_structure",  
     "internal\_glow\_policy": "restrained\_crimson\_damage\_only"  
   },  
   "scene\_context": {  
     "location": "brutalist\_megacity\_rooftop",  
     "weather": "violent\_storm",  
     "time": "night"  
   },  
   "context\_completeness": "sufficient"  
 }  
}  
---

## **4.4 NODE 4 — NARRATIVE BUILDER**

{  
 "node": "narrative\_builder",  
 "status": "ok",  
 "narrative\_packet": {  
   "request\_id": "req\_master\_001",  
   "dramatic\_purpose": "pre-battle sovereign reveal",  
   "scene\_beat": "Mikage stands motionless at the edge of a storm rooftop before confrontation.",  
   "emotional\_vector": \[  
     "restraint",  
     "damage",  
     "authority",  
     "consequence"  
   \],  
   "visual\_story\_logic": \[  
     "power must be visible as cost",  
     "environment reflects civilizational brutality",  
     "composition must preserve mystique"  
   \],  
   "dialogue\_required": false  
 }  
}  
---

## **4.5 NODE 5 — CANON VALIDATOR**

{  
 "node": "canon\_validator",  
 "status": "ok",  
 "validation\_report": {  
   "request\_id": "req\_master\_001",  
   "pass": true,  
   "checks": \[  
     {  
       "name": "ontology\_check",  
       "result": "pass"  
     },  
     {  
       "name": "power\_logic\_check",  
       "result": "pass"  
     },  
     {  
       "name": "visual\_grammar\_check",  
       "result": "pass"  
     },  
     {  
       "name": "character\_integrity\_check",  
       "result": "pass"  
     }  
   \],  
   "warnings": \[  
     "Keep crimson glow below dominant-light threshold."  
   \],  
   "routing\_status": "approved\_for\_packaging"  
 }  
}  
---

## **4.6 NODE 6 — PRODUCTION PACKAGER**

{  
 "node": "production\_packager",  
 "status": "ok",  
 "production\_asset\_package": {  
   "request\_id": "req\_master\_001",  
   "asset\_type": "cinematic\_keyframe",  
   "compiled\_prompt": "A monumental hard sci-fi cinematic frame depicting Mikage standing at the edge of a brutalist megacity rooftop during a violent storm at night. She wears a seamless glossy white kitsune mask with minimal integrated fox-ear geometry, perfectly symmetrical and immaculate. Her armor consists of fractured white ceramic plates over matte black carbon structure and dark titanium joints. Faint restrained crimson light leaks only from damaged internal conduits beneath ceramic fractures. Long black hair lashes in the crosswind. The rooftop is wet concrete with rails, drainage overflow, antenna structures, and rusted maintenance housings. Far below stretches an immense industrial megacity of steel towers, cooling stacks, antenna forests, cables, sparse sodium lights, and atmospheric haze. Use low-angle wide anamorphic cinematic framing, monumental scale, extreme chiaroscuro, hard sci-fi discipline, porcelain purity, void-black contrast, and restrained futurist brutality.",  
   "negative\_prompt": "anime, cartoon, fantasy aura, magic particles, glowing halo, holographic dragons, colorful cyberpunk neon overload, soft cute proportions, magical effects, supernatural light field, ornamental sci-fi clutter, oversexualized pose",  
   "render\_spec": {  
     "camera": "low-angle wide anamorphic",  
     "lighting": "storm darkness with restrained crimson internal leakage only",  
     "texture\_priority": \[  
       "white ceramic fracture detail",  
       "wet concrete",  
       "matte black carbon reinforcement",  
       "dark titanium structure"  
     \]  
   },  
   "metadata": {  
     "character\_id": "char\_mikage\_001",  
     "scene\_id": "scene\_rooftop\_storm\_001",  
     "canon\_version": "v1.0",  
     "generation\_profile": "mikage\_cinematic\_portrait"  
   }  
 }  
}  
---

## **4.7 NODE 7 — BENCHMARK AUDITOR**

{  
 "node": "benchmark\_auditor",  
 "status": "ok",  
 "benchmark\_report": {  
   "request\_id": "req\_master\_001",  
   "benchmark\_sets": \[  
     "gold\_visual\_dna\_mikage",  
     "silver\_rooftop\_storm\_set",  
     "red\_drift\_examples"  
   \],  
   "estimated\_similarity": {  
     "gold\_visual\_dna\_mikage": 0.91,  
     "silver\_rooftop\_storm\_set": 0.89  
   },  
   "risk\_assessment": {  
     "canon\_drift": 0.12,  
     "visual\_drift": 0.18,  
     "ontology\_break": 0.04  
   },  
   "audit\_notes": \[  
     "Prompt preserves signature ceramic-mask identity.",  
     "Industrial city language stays within hard sci-fi bounds.",  
     "Crimson usage remains controlled."  
   \],  
   "verdict": "benchmark\_pass"  
 }  
}  
---

## **4.8 NODE 8 — DECISION FORMATTER**

{  
 "node": "decision\_formatter",  
 "status": "ok",  
 "final\_decision": {  
   "request\_id": "req\_master\_001",  
   "approval": "approved",  
   "delivery\_type": "production\_asset\_package",  
   "output": {  
     "asset\_type": "cinematic\_keyframe",  
     "ready\_for\_generation": true,  
     "compiled\_prompt\_ref": "included",  
     "negative\_prompt\_ref": "included",  
     "metadata\_ref": "included"  
   },  
   "governance\_trace": {  
     "context\_present": true,  
     "narrative\_built": true,  
     "canon\_validated": true,  
     "benchmark\_audited": true  
   },  
   "operator\_message": "Approved for generation. Use production package as-is."  
 }  
}  
---

# **5\. ONE COMPLETE END-TO-END PIPELINE EXAMPLE**

Đây là ví dụ full-chain chuẩn từ **user request → final JSON**.

---

## **5.1 USER REQUEST**

Tạo cho tôi một cinematic keyframe production-grade của Mikage đứng trên rooftop siêu đô thị trong mưa bão ban đêm. Tôi muốn cảm giác uy nghi, lạnh, hư hại nhưng đẹp. Giữ đúng canon hard sci-fi, không fantasy, không anime drift.  
---

## **5.2 STAGE A — REQUEST NORMALIZATION**

{  
 "request\_id": "req\_master\_001",  
 "normalized\_user\_request": {  
   "goal": "generate\_production\_grade\_cinematic\_keyframe",  
   "subject": "Mikage",  
   "scene": "storm rooftop megacity at night",  
   "emotional\_targets": \[  
     "sovereign",  
     "cold",  
     "damaged",  
     "beautiful"  
   \],  
   "constraints": \[  
     "hard\_sci\_fi\_only",  
     "no\_fantasy",  
     "no\_anime\_drift"  
   \]  
 }  
}  
---

## **5.3 STAGE B — REQUEST CLASSIFICATION**

{  
 "request\_id": "req\_master\_001",  
 "classification": {  
   "type": "asset\_generation",  
   "subtype": "cinematic\_keyframe",  
   "requires": \[  
     "canon\_context",  
     "scene\_packet",  
     "narrative\_packet",  
     "canon\_validation",  
     "benchmark\_audit"  
   \]  
 }  
}  
---

## **5.4 STAGE C — CONTEXT PACKET**

{  
 "request\_id": "req\_master\_001",  
 "context\_packet": {  
   "canon": {  
     "ontology": "hard\_sci\_fi",  
     "power\_rules": \[  
       "no\_free\_power",  
       "power\_leaves\_trace"  
     \],  
     "aesthetic\_rules": \[  
       "beauty\_must\_carry\_damage"  
     \],  
     "drift\_forbidden": \[  
       "fantasy",  
       "anime",  
       "neon\_cyberpunk\_overload"  
     \]  
   },  
   "character": {  
     "name": "Mikage",  
     "signature\_mask": "seamless\_white\_kitsune\_mask",  
     "armor\_language": "fractured\_white\_ceramic\_over\_black\_structure",  
     "energy\_policy": "restrained\_crimson\_internal\_damage\_only"  
   },  
   "scene\_seed": {  
     "location": "brutalist\_megacity\_rooftop",  
     "weather": "violent\_rainstorm",  
     "time": "night"  
   }  
 }  
}  
---

## **5.5 STAGE D — NARRATIVE PACKET**

{  
 "request\_id": "req\_master\_001",  
 "narrative\_packet": {  
   "story\_function": "pre\_battle\_character\_reveal",  
   "dramatic\_core": "Power is present, but the cost is visible.",  
   "scene\_beat": "Mikage stands at the ledge as a sovereign damaged figure before confrontation.",  
   "emotion\_stack": \[  
     "restraint",  
     "authority",  
     "wound",  
     "fatal beauty"  
   \],  
   "visual\_story\_rules": \[  
     "Do not show supernatural power",  
     "Show damage through fracture and leakage",  
     "City must feel industrial-civilizational, not decorative cyberpunk"  
   \]  
 }  
}  
---

## **5.6 STAGE E — CANON VALIDATION REPORT**

{  
 "request\_id": "req\_master\_001",  
 "validation\_report": {  
   "pass": true,  
   "checks": {  
     "ontology": "pass",  
     "character\_integrity": "pass",  
     "power\_logic": "pass",  
     "visual\_grammar": "pass"  
   },  
   "warnings": \[  
     "Keep red glow faint and localized."  
   \]  
 }  
}  
---

## **5.7 STAGE F — PRODUCTION PACKAGE**

{  
 "request\_id": "req\_master\_001",  
 "production\_package": {  
   "asset\_type": "cinematic\_keyframe",  
   "compiled\_prompt": "A monumental hard sci-fi cinematic frame depicting Mikage standing at the edge of a brutalist megacity rooftop during a violent storm at night. She wears a seamless glossy white kitsune mask with integrated minimal fox-ear geometry, immaculate and perfectly symmetrical. Her armor is formed from fractured white ceramic plates over matte black carbon reinforcement and dark titanium joints. Faint restrained crimson light leaks only through damaged internal conduits beneath ceramic cracks, suggesting costly internal reactor strain rather than supernatural energy. Her long black hair is driven violently by crosswind and rain. The rooftop is stark wet concrete with antenna structures, maintenance rails, drainage channels, rusted housings, and wind-driven spray. Far below extends an immense industrial megacity of steel towers, cooling stacks, cables, sparse sodium lights, and atmospheric haze. Use low-angle wide anamorphic framing, monumental scale, extreme chiaroscuro, hard sci-fi discipline, void-black contrast, porcelain purity, restrained futurism, and sacred fracture aesthetics.",  
   "negative\_prompt": "anime, fantasy, magic aura, glowing halo, neon cyberpunk overload, holographic dragons, colorful spectacle skyline, cartoon proportions, magical particles, supernatural effects, soft glam look, decorative sci-fi clutter",  
   "metadata": {  
     "character\_id": "char\_mikage\_001",  
     "scene\_id": "scene\_rooftop\_storm\_001",  
     "profile": "mikage\_cinematic\_portrait",  
     "canon\_version": "v1.0"  
   },  
   "lineage": {  
     "request\_id": "req\_master\_001",  
     "source\_packets": \[  
       "context\_packet",  
       "narrative\_packet",  
       "validation\_report"  
     \]  
   }  
 }  
}  
---

## **5.8 STAGE G — BENCHMARK AUDIT**

{  
 "request\_id": "req\_master\_001",  
 "benchmark\_report": {  
   "benchmark\_pass": true,  
   "similarity\_scores": {  
     "gold\_visual\_dna\_mikage": 0.91,  
     "silver\_rooftop\_storm\_set": 0.89  
   },  
   "risk\_scores": {  
     "canon\_drift": 0.12,  
     "visual\_drift": 0.18,  
     "style\_instability": 0.14  
   },  
   "notes": \[  
     "Strong mask integrity",  
     "Good ceramic-black material balance",  
     "Crimson intensity remains within allowed threshold"  
   \]  
 }  
}  
---

## **5.9 STAGE H — FINAL JSON**

Đây là format cuối có thể dùng làm **master delivery object**.

{  
 "request\_id": "req\_master\_001",  
 "status": "approved",  
 "system": "mikage\_studio\_os",  
 "delivery": {  
   "type": "production\_asset\_package",  
   "asset\_type": "cinematic\_keyframe",  
   "ready\_for\_generation": true  
 },  
 "final\_output": {  
   "compiled\_prompt": "A monumental hard sci-fi cinematic frame depicting Mikage standing at the edge of a brutalist megacity rooftop during a violent storm at night. She wears a seamless glossy white kitsune mask with integrated minimal fox-ear geometry, immaculate and perfectly symmetrical. Her armor is formed from fractured white ceramic plates over matte black carbon reinforcement and dark titanium joints. Faint restrained crimson light leaks only through damaged internal conduits beneath ceramic cracks, suggesting costly internal reactor strain rather than supernatural energy. Her long black hair is driven violently by crosswind and rain. The rooftop is stark wet concrete with antenna structures, maintenance rails, drainage channels, rusted housings, and wind-driven spray. Far below extends an immense industrial megacity of steel towers, cooling stacks, cables, sparse sodium lights, and atmospheric haze. Use low-angle wide anamorphic framing, monumental scale, extreme chiaroscuro, hard sci-fi discipline, void-black contrast, porcelain purity, restrained futurism, and sacred fracture aesthetics.",  
   "negative\_prompt": "anime, fantasy, magic aura, glowing halo, neon cyberpunk overload, holographic dragons, colorful spectacle skyline, cartoon proportions, magical particles, supernatural effects, soft glam look, decorative sci-fi clutter",  
   "render\_spec": {  
     "camera": "low-angle wide anamorphic",  
     "lighting": "storm darkness with restrained crimson internal leakage only",  
     "material\_priority": \[  
       "white ceramic",  
       "matte black carbon reinforcement",  
       "dark titanium joints",  
       "wet brutalist concrete"  
     \],  
     "composition": "monumental solitary rooftop confrontation"  
   },  
   "metadata": {  
     "project\_id": "mikage\_studio\_os",  
     "universe\_id": "mikage\_prime",  
     "character\_id": "char\_mikage\_001",  
     "scene\_id": "scene\_rooftop\_storm\_001",  
     "canon\_version": "v1.0",  
     "generation\_profile": "mikage\_cinematic\_portrait"  
   }  
 },  
 "governance\_trace": {  
   "context\_packet\_present": true,  
   "narrative\_built": true,  
   "canon\_validation\_passed": true,  
   "benchmark\_audit\_passed": true  
 },  
 "operator\_action": "generate\_asset"  
}  
---

# **6\. QUICK REGRESSION TEST CASES**

Dùng để test pipeline có đang chạy đúng hay không.

## **Test Case 1 — Valid Request**

{  
 "input": "Create Mikage rooftop storm cinematic frame with hard sci-fi discipline.",  
 "expected": "approved"  
}

## **Test Case 2 — Missing Context**

{  
 "input": "Generate final production package now.",  
 "expected": "blocked\_missing\_context\_packet"  
}

## **Test Case 3 — Canon Violation**

{  
 "input": "Add glowing spirit fox aura around Mikage.",  
 "expected": "reject\_ontology\_violation"  
}

## **Test Case 4 — Visual Drift**

{  
 "input": "Make the city full neon purple holograms and giant anime moon.",  
 "expected": "reject\_visual\_drift"  
}  
---

# **7\. MASTER IMPLEMENTATION NOTE**

Thứ tự dùng pack này trong vận hành thật:

1. user nhập từ Opal mode

2. Opal form đẩy packet đúng schema

3. Gemini nodes xử lý theo pipeline

4. mọi node trả JSON cưỡng bức

5. node cuối trả final decision object

6. chỉ khi `canon_validation_passed = true` và `benchmark_audit_passed = true` mới được `generate_asset`

---

# **8\. FINAL MASTER SUMMARY**

Pack này đã hoàn tất:

* sample input cho **6 mode Opal**

* sample output cho **8 node Gemini**

* **1 full-chain example** từ user request → final JSON

* giữ đúng governance:

  * không context thì không chạy narrative

  * không validate thì không package

  * không benchmark thì không approval

  * không cho fantasy/anime drift

  * power luôn có cost \+ trace \+ consequence

