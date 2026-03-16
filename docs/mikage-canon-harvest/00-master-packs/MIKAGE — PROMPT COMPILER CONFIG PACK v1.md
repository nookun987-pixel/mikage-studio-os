# **MIKAGE — PROMPT COMPILER CONFIG PACK v1**

Mục tiêu của pack này:

* biến preset \+ variant thành **prompt generator chạy được**

* kiểm soát **visual drift**

* đảm bảo **identity stability**

* cho phép **controlled diversity**

* giữ **reproducibility**

Pack này là lớp nằm giữa:

Prompt Request  
↓  
Prompt Compiler  
↓  
Generation Model  
---

# **0\) Cấu trúc thư mục**

mikage\_prompt\_compiler\_config/  
├── preset\_registry.json  
├── variant\_registry.json  
├── objective\_registry.json  
├── negative\_profiles.json  
└── seed\_policies.json  
---

# **1\) `preset_registry.json`**

Preset là **baseline identity mode**.

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "PromptPresetRegistry",  
 "presets": \[  
   {  
     "preset\_id": "preset\_canon\_core",  
     "name": "canon\_core",  
     "status": "active",  
     "reference\_style\_id": "ref\_porcelain\_void",

     "prompt\_blocks": {  
       "subject\_identity": \[  
         "Mikage, sovereign porcelain warrior",  
         "perfectly symmetrical glossy white porcelain Kitsune mask",  
         "minimalist and pristine geometry",  
         "long black hair moving with restrained elegance"  
       \],

       "material\_language": \[  
         "ceramic armor plates",  
         "matte carbon fiber reinforcement",  
         "oxidized titanium joints",  
         "fine fracture lines revealing crimson internal energy"  
       \],

       "environment\_language": \[  
         "industrial megacity structures",  
         "wet surfaces reflecting faint light",  
         "dense cables and brutalist architecture"  
       \],

       "lighting\_language": \[  
         "high contrast chiaroscuro lighting",  
         "sharp rim light outlining silhouette",  
         "cold reflections sliding across porcelain surface"  
       \],

       "camera\_language": \[  
         "cinematic anamorphic composition",  
         "controlled framing",  
         "extreme depth of field",  
         "ARRI Alexa 65 cinematic photography"  
       \]  
     },

     "style\_weights": {  
       "identity\_lock": 1.0,  
       "beauty\_bias": 0.6,  
       "environment\_complexity": 0.6,  
       "visual\_drift\_tolerance": 0.1  
     },

     "negative\_profile\_ids": \[  
       "neg\_childish\_idol",  
       "neg\_generic\_neon",  
       "neg\_fantasy\_magic"  
     \],

     "seed\_policy\_id": "seed\_stable\_identity",

     "canon\_state": "hard\_canon\_locked"  
   },

   {  
     "preset\_id": "preset\_luminous\_fan\_appeal",  
     "name": "luminous\_fan\_appeal",  
     "status": "active",  
     "reference\_style\_id": "ref\_porcelain\_void",

     "prompt\_blocks": {  
       "subject\_identity": \[  
         "Mikage standing with calm authority",  
         "mirror polished porcelain mask",  
         "elegant warrior silhouette"  
       \],

       "material\_language": \[  
         "polished porcelain armor",  
         "refined carbon fiber textures"  
       \],

       "environment\_language": \[  
         "cinematic urban environment",  
         "controlled neon reflections",  
         "wet reflective surfaces"  
       \],

       "lighting\_language": \[  
         "dramatic cinematic rim light",  
         "soft cold reflections"  
       \],

       "camera\_language": \[  
         "cinematic portrait framing",  
         "ultra-detailed 8k photography"  
       \]  
     },

     "style\_weights": {  
       "identity\_lock": 0.9,  
       "beauty\_bias": 0.9,  
       "environment\_complexity": 0.5,  
       "visual\_drift\_tolerance": 0.15  
     },

     "negative\_profile\_ids": \[  
       "neg\_childish\_idol",  
       "neg\_pop\_glamour\_excess",  
       "neg\_fantasy\_magic"  
     \],

     "seed\_policy\_id": "seed\_stable\_identity",

     "canon\_state": "validated\_soft"  
   },

   {  
     "preset\_id": "preset\_luxury\_mystical\_editorial",  
     "name": "luxury\_mystical\_editorial",  
     "status": "active",  
     "reference\_style\_id": "ref\_luxury\_editorial\_restrain",

     "prompt\_blocks": {  
       "subject\_identity": \[  
         "Mikage standing like a museum sculpture",  
         "porcelain mask reflecting subtle highlights"  
       \],

       "material\_language": \[  
         "minimal porcelain couture armor",  
         "structured sculptural garment"  
       \],

       "environment\_language": \[  
         "pure obsidian black void",  
         "subtle atmospheric haze"  
       \],

       "lighting\_language": \[  
         "studio chiaroscuro lighting",  
         "thin rim light isolating silhouette"  
       \],

       "camera\_language": \[  
         "high fashion editorial photography",  
         "85mm anamorphic portrait lens"  
       \]  
     },

     "style\_weights": {  
       "identity\_lock": 0.9,  
       "beauty\_bias": 1.0,  
       "environment\_complexity": 0.2,  
       "visual\_drift\_tolerance": 0.1  
     },

     "negative\_profile\_ids": \[  
       "neg\_childish\_idol",  
       "neg\_soft\_glamour",  
       "neg\_fantasy\_magic"  
     \],

     "seed\_policy\_id": "seed\_stable\_identity",

     "canon\_state": "validated\_soft"  
   }  
 \]  
}  
---

# **2\) `variant_registry.json`**

Variant chỉ chứa **delta thay đổi**.

{  
 "pack\_version": "1.0.0",  
 "entity\_type": "PromptVariantRegistry",  
 "variants": \[  
   {  
     "variant\_id": "variant\_rooftop\_storm",  
     "applies\_to\_presets": \[  
       "preset\_canon\_core"  
     \],

     "delta\_blocks": {  
       "environment\_language": \[  
         "storm rain sweeping across rooftop",  
         "vast cyberpunk skyline behind",  
         "wind moving through cables"  
       \],

       "pose\_language": \[  
         "stepping forward through rain",  
         "long hair moving in wind"  
       \]  
     }  
   },

   {  
     "variant\_id": "variant\_neon\_street",  
     "applies\_to\_presets": \[  
       "preset\_canon\_core",  
       "preset\_luminous\_fan\_appeal"  
     \],

     "delta\_blocks": {  
       "environment\_language": \[  
         "rain soaked neon street",  
         "steam rising from vents",  
         "reflections on wet asphalt"  
       \]  
     }  
   },

   {  
     "variant\_id": "variant\_void\_editorial",  
     "applies\_to\_presets": \[  
       "preset\_luxury\_mystical\_editorial"  
     \],

     "delta\_blocks": {  
       "environment\_language": \[  
         "absolute black void",  
         "minimal atmospheric fog"  
       \],

       "pose\_language": \[  
         "still sculptural posture"  
       \]  
     }  
   }  
 \]  
}  
---

# **3\) `objective_registry.json`**

Objective quyết **mục tiêu generation**.

{  
 "pack\_version": "1.0.0",  
 "entity\_type": "ObjectiveRegistry",  
 "objectives": \[

   {  
     "objective\_id": "obj\_hero\_key\_visual",  
     "description": "hero identity visual",  
     "emphasis": {  
       "character\_presence": 1.0,  
       "environment\_complexity": 0.4,  
       "cinematic\_scale": 0.8  
     }  
   },

   {  
     "objective\_id": "obj\_character\_portrait",  
     "description": "identity portrait",  
     "emphasis": {  
       "character\_presence": 1.0,  
       "environment\_complexity": 0.1,  
       "cinematic\_scale": 0.6  
     }  
   },

   {  
     "objective\_id": "obj\_action\_scene",  
     "description": "combat cinematic moment",  
     "emphasis": {  
       "character\_presence": 0.8,  
       "environment\_complexity": 0.8,  
       "cinematic\_scale": 1.0  
     }  
   }

 \]  
}  
---

# **4\) `negative_profiles.json`**

Negative profile dùng để **chặn drift**.

{  
 "pack\_version": "1.0.0",  
 "entity\_type": "NegativeProfiles",  
 "profiles": \[

   {  
     "profile\_id": "neg\_childish\_idol",  
     "negative\_tokens": \[  
       "anime idol",  
       "cute chibi style",  
       "childlike proportions",  
       "kawaii aesthetic"  
     \]  
   },

   {  
     "profile\_id": "neg\_generic\_neon",  
     "negative\_tokens": \[  
       "oversaturated neon chaos",  
       "cyberpunk nightclub vibe",  
       "colorful neon overload"  
     \]  
   },

   {  
     "profile\_id": "neg\_fantasy\_magic",  
     "negative\_tokens": \[  
       "fantasy magic aura",  
       "glowing runes",  
       "wizard spell effects"  
     \]  
   },

   {  
     "profile\_id": "neg\_soft\_glamour",  
     "negative\_tokens": \[  
       "soft pastel fashion",  
       "romantic beauty glamour",  
       "cute fashion editorial"  
     \]  
   }

 \]  
}  
---

# **5\) `seed_policies.json`**

Seed policy giúp **reproducibility**.

{  
 "pack\_version": "1.0.0",  
 "entity\_type": "SeedPolicies",

 "policies": \[

   {  
     "seed\_policy\_id": "seed\_stable\_identity",  
     "description": "Identity stable generation",  
     "seed\_strategy": "fixed\_seed\_range",

     "seed\_range": {  
       "min": 100000,  
       "max": 100500  
     },

     "diversity\_level": 0.2  
   },

   {  
     "seed\_policy\_id": "seed\_exploration",  
     "description": "Exploration mode",

     "seed\_strategy": "random\_seed",

     "diversity\_level": 0.7  
   }

 \]  
}  
---

# **6\) Prompt Compiler Flow**

Compiler phải chạy theo flow sau:

INPUT  
preset\_id  
variant\_id  
objective\_id  
seed\_policy

↓

LOAD  
preset\_registry  
variant\_registry  
objective\_registry

↓

MERGE

preset blocks  
\+ variant delta  
\+ objective emphasis

↓

APPLY

negative profile  
seed policy

↓

COMPILE

final prompt  
---

# **7\) Prompt Output Structure**

Compiler không trả text đơn lẻ.

Nó trả structured output:

{  
 "preset": "preset\_canon\_core",  
 "variant": "variant\_rooftop\_storm",  
 "objective": "obj\_action\_scene",

 "prompt": "...compiled prompt...",

 "negative\_prompt": "...",

 "seed": 100221,

 "style\_weights": {  
   "identity\_lock": 1.0,  
   "beauty\_bias": 0.6  
 }  
}  
---

# **8\) Sau bước này hệ đã có**

3 lớp quan trọng:

### **Canon Layer**

Seed Data Pack

### **Governance Layer**

Validator Rule Pack

### **Generation Layer**

Prompt Compiler Config Pack

---

# **9\) Hệ thống Mikage lúc này đã đạt mức**

Canon-governed generation system

Có thể:

* generate asset

* kiểm canon

* khóa identity

* chống visual drift

* reproducible prompt generation

---

# **10\) Hai mảnh cuối để hệ hoàn chỉnh**

Còn lại:

### **1\. Review Sheet (QA Form)**

chuẩn hóa đánh giá asset

### **2\. Ingestion Pipeline**

nạp:

* lore

* rule

* asset

* prompt preset

* benchmark

vào graph tự động

