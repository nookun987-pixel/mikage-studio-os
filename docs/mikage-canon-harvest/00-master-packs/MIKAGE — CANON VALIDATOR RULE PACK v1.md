# **1\) `validator.severity.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "severity\_levels": \[  
   {  
     "severity": "info",  
     "rank": 1,  
     "reject\_generation": false,  
     "requires\_manual\_review": false,  
     "description": "Non-blocking informational signal."  
   },  
   {  
     "severity": "warning",  
     "rank": 2,  
     "reject\_generation": false,  
     "requires\_manual\_review": true,  
     "description": "Potential canon weakness or incomplete grounding."  
   },  
   {  
     "severity": "fail",  
     "rank": 3,  
     "reject\_generation": true,  
     "requires\_manual\_review": true,  
     "description": "Canon violation that blocks promotion and should block generation unless explicitly overridden."  
   },  
   {  
     "severity": "critical\_fail",  
     "rank": 4,  
     "reject\_generation": true,  
     "requires\_manual\_review": true,  
     "description": "Core constitution breach. Automatic rejection."  
   }  
 \]  
}  
---

# **2\) `validator.layers.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "layers": \[  
   {  
     "layer\_id": "ontology",  
     "description": "Hard sci-fi logic, causality, cost, entropy, physical consequence."  
   },  
   {  
     "layer\_id": "technology",  
     "description": "Mechanism plausibility, energy source, cost model, traceability."  
   },  
   {  
     "layer\_id": "character",  
     "description": "Core truth, motive continuity, identity integrity."  
   },  
   {  
     "layer\_id": "faction",  
     "description": "Doctrine coherence, ideology fit, ownership and role consistency."  
   },  
   {  
     "layer\_id": "timeline",  
     "description": "Era coherence, event order, historical consistency."  
   },  
   {  
     "layer\_id": "visual",  
     "description": "Palette, material language, camera grammar, drift control."  
   },  
   {  
     "layer\_id": "philosophy",  
     "description": "Presence of canonical thematic axes."  
   },  
   {  
     "layer\_id": "archive",  
     "description": "Lineage, source traceability, completeness of metadata."  
   }  
 \]  
}  
---

# **3\) `validator.enums.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "enums": {  
   "valid\_entity\_types": \[  
     "Character",  
     "Faction",  
     "Location",  
     "Era",  
     "WeaponSystem",  
     "Rule",  
     "PromptPreset",  
     "PromptVariant",  
     "ReferenceStyle",  
     "Asset",  
     "Event"  
   \],  
   "valid\_canon\_states": \[  
     "draft",  
     "validated\_soft",  
     "canon\_candidate",  
     "hard\_canon\_locked"  
   \],  
   "valid\_status\_values": \[  
     "active",  
     "historical",  
     "deprecated",  
     "archived"  
   \],  
   "valid\_trace\_visibility": \[  
     "low",  
     "medium",  
     "high"  
   \],  
   "valid\_mechanism\_types": \[  
     "material",  
     "mechanical",  
     "electrical",  
     "thermal",  
     "computational",  
     "biochemical",  
     "material\_mechanical",  
     "electro\_mechanical",  
     "thermo\_mechanical",  
     "bio\_mechanical"  
   \],  
   "valid\_visual\_modes": \[  
     "canon\_core",  
     "luminous\_fan\_appeal",  
     "luxury\_mystical\_editorial"  
   \],  
   "valid\_asset\_classifications": \[  
     "reject",  
     "interesting\_but\_non\_canon",  
     "usable\_asset",  
     "canon\_candidate",  
     "hard\_canon\_locked"  
   \],  
   "valid\_benchmark\_layers": \[  
     "gold\_set",  
     "silver\_set",  
     "red\_flag\_set"  
   \]  
 }  
}  
---

# **4\) `validator.rulepack.json`**

Đây là file lõi.

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "rulepack\_id": "mikage\_validator\_core\_v1",  
 "default\_policy": {  
   "reject\_on\_fail": true,  
   "reject\_on\_critical\_fail": true,  
   "manual\_review\_on\_warning": true,  
   "allow\_override": false  
 },  
 "rules": \[  
   {  
     "rule\_id": "val\_ontology\_no\_free\_power",  
     "name": "No Free Power",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "scope": \[  
       "WeaponSystem",  
       "Event",  
       "Asset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "technology.energy\_source",  
         "operator": "not\_null"  
       },  
       {  
         "path": "technology.cost\_model",  
         "operator": "not\_null"  
       },  
       {  
         "path": "technology.observable\_trace",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "System expresses power without explicit source, cost, and trace.",  
     "resolution\_hint": "Define energy source, operational cost, and observable consequence."  
   },  
   {  
     "rule\_id": "val\_ontology\_no\_magic\_tech",  
     "name": "No Magic Disguised as Technology",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "scope": \[  
       "WeaponSystem",  
       "Event",  
       "Asset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "technology.mechanism\_type",  
         "operator": "in",  
         "value": \[  
           "material",  
           "mechanical",  
           "electrical",  
           "thermal",  
           "computational",  
           "biochemical",  
           "material\_mechanical",  
           "electro\_mechanical",  
           "thermo\_mechanical",  
           "bio\_mechanical"  
         \]  
       },  
       {  
         "path": "technology.explanation\_style",  
         "operator": "not\_equals",  
         "value": "mystical\_shortcut"  
       }  
     \],  
     "message": "Technology logic collapses into mystical shortcut.",  
     "resolution\_hint": "Replace vague supernatural framing with material or systems explanation."  
   },  
   {  
     "rule\_id": "val\_ontology\_power\_trace",  
     "name": "Power Leaves Trace",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "scope": \[  
       "WeaponSystem",  
       "Event",  
       "Asset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "event.power\_usage.trace\_type",  
         "operator": "not\_null"  
       },  
       {  
         "path": "event.power\_usage.trace\_visibility",  
         "operator": "in",  
         "value": \["low", "medium", "high"\]  
       }  
     \],  
     "message": "High-energy action has no defined forensic or material trace.",  
     "resolution\_hint": "Add heat, residue, debris, acoustic signature, damage scar, or sensor signature."  
   },  
   {  
     "rule\_id": "val\_ontology\_violence\_consequence",  
     "name": "Violence Has Consequence",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Event",  
       "Asset",  
       "Character"  
     \],  
     "logic\_mode": "any",  
     "conditions": \[  
       {  
         "path": "event.violence\_consequence",  
         "operator": "not\_null"  
       },  
       {  
         "path": "asset.aftermath",  
         "operator": "not\_null"  
       },  
       {  
         "path": "character.damage\_persistence",  
         "operator": "equals",  
         "value": true  
       }  
     \],  
     "message": "Violence appears consequence-free.",  
     "resolution\_hint": "Add bodily, structural, political, tactical, or psychological aftermath."  
   },  
   {  
     "rule\_id": "val\_ontology\_entropy\_logic",  
     "name": "Entropy Logic Presence",  
     "layer": "ontology",  
     "severity": "fail",  
     "scope": \[  
       "WeaponSystem",  
       "Event",  
       "Asset",  
       "Location"  
     \],  
     "logic\_mode": "any",  
     "conditions": \[  
       {  
         "path": "technology.cost\_model",  
         "operator": "contains\_any",  
         "value": \[  
           "heat",  
           "fatigue",  
           "degradation",  
           "strain",  
           "loss",  
           "wear"  
         \]  
       },  
       {  
         "path": "material\_consequence",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "System lacks entropy or degradation logic.",  
     "resolution\_hint": "Add wear, thermal stress, fatigue, loss, or irreversible material change."  
   },  
   {  
     "rule\_id": "val\_technology\_energy\_source\_required",  
     "name": "Energy Source Required",  
     "layer": "technology",  
     "severity": "critical\_fail",  
     "scope": \[  
       "WeaponSystem",  
       "Event"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "technology.energy\_source",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "No energy source defined.",  
     "resolution\_hint": "Specify biological, electrical, thermal, chemical, or hybrid energy source."  
   },  
   {  
     "rule\_id": "val\_technology\_cost\_model\_required",  
     "name": "Cost Model Required",  
     "layer": "technology",  
     "severity": "critical\_fail",  
     "scope": \[  
       "WeaponSystem",  
       "Event"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "technology.cost\_model",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "No cost model defined.",  
     "resolution\_hint": "Define strain, heat, fuel, maintenance, material fatigue, or operator burden."  
   },  
   {  
     "rule\_id": "val\_technology\_trace\_required",  
     "name": "Observable Trace Required",  
     "layer": "technology",  
     "severity": "fail",  
     "scope": \[  
       "WeaponSystem",  
       "Event"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "technology.observable\_trace",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "No observable trace defined.",  
     "resolution\_hint": "Add residue, signal, fracture, debris, noise, or thermal footprint."  
   },  
   {  
     "rule\_id": "val\_character\_core\_truth\_required",  
     "name": "Character Core Truth Required",  
     "layer": "character",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Character"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "core\_truth",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Character has no locked core truth.",  
     "resolution\_hint": "Define non-negotiable internal truth of the character."  
   },  
   {  
     "rule\_id": "val\_character\_behavior\_shift\_causality",  
     "name": "Behavior Shift Requires Cause",  
     "layer": "character",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Character",  
       "Event",  
       "Asset"  
     \],  
     "logic\_mode": "any",  
     "conditions": \[  
       {  
         "path": "character.behavior\_shift\_requires\_cause",  
         "operator": "equals",  
         "value": true  
       },  
       {  
         "path": "event.behavior\_shift\_cause",  
         "operator": "not\_null"  
       },  
       {  
         "path": "asset.character\_shift\_reason",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Character behavior changed without causal grounding.",  
     "resolution\_hint": "Define trigger, trauma, revelation, coercion, or strategic necessity."  
   },  
   {  
     "rule\_id": "val\_character\_identity\_axes\_required",  
     "name": "Identity Axis Presence",  
     "layer": "character",  
     "severity": "warning",  
     "scope": \[  
       "Character"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "identity\_axes",  
         "operator": "min\_length",  
         "value": 1  
       }  
     \],  
     "message": "Character lacks explicit philosophical grounding.",  
     "resolution\_hint": "Map character to one or more canonical axes."  
   },  
   {  
     "rule\_id": "val\_character\_faction\_required",  
     "name": "Faction Link Required",  
     "layer": "character",  
     "severity": "fail",  
     "scope": \[  
       "Character"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "faction\_id",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Character has no faction binding.",  
     "resolution\_hint": "Bind character to a faction or define explicit factionless status."  
   },  
   {  
     "rule\_id": "val\_character\_era\_required",  
     "name": "Era Link Required",  
     "layer": "timeline",  
     "severity": "fail",  
     "scope": \[  
       "Character",  
       "Location",  
       "WeaponSystem",  
       "Event"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "era\_id",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Entity lacks era binding.",  
     "resolution\_hint": "Attach entity to a valid era."  
   },  
   {  
     "rule\_id": "val\_faction\_doctrine\_required",  
     "name": "Faction Doctrine Required",  
     "layer": "faction",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Faction"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "doctrine",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Faction has no governing doctrine.",  
     "resolution\_hint": "Define ideological doctrine and operational worldview."  
   },  
   {  
     "rule\_id": "val\_faction\_axes\_required",  
     "name": "Faction Philosophical Axes Required",  
     "layer": "faction",  
     "severity": "warning",  
     "scope": \[  
       "Faction"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "philosophical\_axes",  
         "operator": "min\_length",  
         "value": 1  
       }  
     \],  
     "message": "Faction lacks philosophical placement.",  
     "resolution\_hint": "Map faction to one or more canonical axes."  
   },  
   {  
     "rule\_id": "val\_faction\_visual\_grammar\_required",  
     "name": "Faction Visual Grammar Required",  
     "layer": "faction",  
     "severity": "fail",  
     "scope": \[  
       "Faction"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "visual\_grammar.materials",  
         "operator": "min\_length",  
         "value": 1  
       },  
       {  
         "path": "visual\_grammar.palette",  
         "operator": "min\_length",  
         "value": 1  
       },  
       {  
         "path": "visual\_grammar.keywords",  
         "operator": "min\_length",  
         "value": 1  
       }  
     \],  
     "message": "Faction visual grammar is incomplete.",  
     "resolution\_hint": "Define materials, palette anchors, and visual keywords."  
   },  
   {  
     "rule\_id": "val\_timeline\_sequence\_index\_required",  
     "name": "Era Sequence Index Required",  
     "layer": "timeline",  
     "severity": "fail",  
     "scope": \[  
       "Era"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "sequence\_index",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Era has no sequence index.",  
     "resolution\_hint": "Assign stable chronological order."  
   },  
   {  
     "rule\_id": "val\_timeline\_current\_era\_unique",  
     "name": "Current Era Must Be Unique",  
     "layer": "timeline",  
     "severity": "fail",  
     "scope": \[  
       "Era"  
     \],  
     "logic\_mode": "global\_exactly\_one",  
     "conditions": \[  
       {  
         "path": "status",  
         "operator": "equals",  
         "value": "current"  
       }  
     \],  
     "message": "There must be exactly one current era.",  
     "resolution\_hint": "Ensure only one era is marked current."  
   },  
   {  
     "rule\_id": "val\_visual\_palette\_lock",  
     "name": "Palette Lock",  
     "layer": "visual",  
     "severity": "fail",  
     "scope": \[  
       "Character",  
       "Faction",  
       "ReferenceStyle",  
       "PromptPreset",  
       "Asset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "signature\_palette|visual\_grammar.palette|palette|visual\_defaults.palette\_anchor|asset.palette\_anchor",  
         "operator": "contains\_any",  
         "value": \["\#FAFAFA"\]  
       },  
       {  
         "path": "signature\_palette|visual\_grammar.palette|palette|visual\_defaults.palette\_anchor|asset.palette\_anchor",  
         "operator": "contains\_any",  
         "value": \["\#0A0A0A"\]  
       },  
       {  
         "path": "signature\_palette|visual\_grammar.palette|palette|visual\_defaults.palette\_anchor|asset.palette\_anchor",  
         "operator": "contains\_any",  
         "value": \["\#E60000", "\#6A0000", "\#7A0C0C"\]  
       }  
     \],  
     "message": "Core Mikage palette anchors missing.",  
     "resolution\_hint": "Restore porcelain white, void black, and crimson anchor."  
   },  
   {  
     "rule\_id": "val\_visual\_camera\_discipline",  
     "name": "Camera Discipline",  
     "layer": "visual",  
     "severity": "warning",  
     "scope": \[  
       "ReferenceStyle",  
       "PromptPreset",  
       "Asset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "camera\_language.anamorphic\_bias|asset.camera\_language.anamorphic\_bias",  
         "operator": "equals",  
         "value": true  
       },  
       {  
         "path": "camera\_language.controlled\_composition|asset.camera\_language.controlled\_composition",  
         "operator": "equals",  
         "value": true  
       },  
       {  
         "path": "camera\_language.chiaroscuro\_bias|asset.camera\_language.chiaroscuro\_bias",  
         "operator": "equals",  
         "value": true  
       }  
     \],  
     "message": "Camera language drift detected.",  
     "resolution\_hint": "Reinstate anamorphic framing, controlled composition, and chiaroscuro logic."  
   },  
   {  
     "rule\_id": "val\_visual\_beauty\_damage\_coupling",  
     "name": "Beauty Must Carry Damage",  
     "layer": "visual",  
     "severity": "fail",  
     "scope": \[  
       "Character",  
       "Asset",  
       "ReferenceStyle"  
     \],  
     "logic\_mode": "any",  
     "conditions": \[  
       {  
         "path": "body\_state.visible\_material\_language",  
         "operator": "contains\_any",  
         "value": \[  
           "fracture\_memory",  
           "damage\_language",  
           "trace\_residue",  
           "repair\_visible"  
         \]  
       },  
       {  
         "path": "asset.damage\_language",  
         "operator": "not\_null"  
       },  
       {  
         "path": "visual\_principles",  
         "operator": "contains\_any",  
         "value": \[  
           "sacred\_fracture\_aesthetic",  
           "damage\_under\_surface",  
           "material\_consequence"  
         \]  
       }  
     \],  
     "message": "Beauty is presented without damage memory.",  
     "resolution\_hint": "Add fracture, scar, residue, repair, or pressure history."  
   },  
   {  
     "rule\_id": "val\_visual\_no\_childish\_idol",  
     "name": "No Childish Idol Drift",  
     "layer": "visual",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Character",  
       "Faction",  
       "ReferenceStyle",  
       "PromptPreset",  
       "PromptVariant",  
       "Asset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "forbidden\_drifts|negative\_profile\_ids|asset.drift\_flags",  
         "operator": "does\_not\_contain",  
         "value": "childish\_anime\_idol"  
       }  
     \],  
     "message": "Childish anime idol drift detected.",  
     "resolution\_hint": "Remove juvenile proportions, cute affect, idol styling, and pop-glamour softness."  
   },  
   {  
     "rule\_id": "val\_visual\_no\_generic\_neon\_overload",  
     "name": "No Generic Neon Overload",  
     "layer": "visual",  
     "severity": "fail",  
     "scope": \[  
       "Character",  
       "ReferenceStyle",  
       "PromptPreset",  
       "PromptVariant",  
       "Asset",  
       "Location"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "forbidden\_drifts|asset.drift\_flags",  
         "operator": "does\_not\_contain",  
         "value": "generic\_neon\_overload"  
       }  
     \],  
     "message": "Generic cyberpunk neon overload detected.",  
     "resolution\_hint": "Reduce signage clutter, oversaturation, and moodless neon density."  
   },  
   {  
     "rule\_id": "val\_visual\_no\_fantasy\_magic",  
     "name": "No Fantasy Magic Aesthetic",  
     "layer": "visual",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Character",  
       "ReferenceStyle",  
       "PromptPreset",  
       "PromptVariant",  
       "Asset",  
       "WeaponSystem"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "forbidden\_drifts|negative\_profile\_ids|asset.drift\_flags",  
         "operator": "does\_not\_contain",  
         "value": "fantasy\_magic\_aesthetic"  
       }  
     \],  
     "message": "Fantasy magic aesthetic detected.",  
     "resolution\_hint": "Replace arcane, spell-like, rune-like, ethereal fantasy cues with hard-material logic."  
   },  
   {  
     "rule\_id": "val\_visual\_material\_integrity",  
     "name": "Material Integrity Presence",  
     "layer": "visual",  
     "severity": "warning",  
     "scope": \[  
       "Character",  
       "Faction",  
       "ReferenceStyle",  
       "Asset",  
       "WeaponSystem"  
     \],  
     "logic\_mode": "any",  
     "conditions": \[  
       {  
         "path": "body\_state.visible\_material\_language",  
         "operator": "min\_length",  
         "value": 1  
       },  
       {  
         "path": "visual\_grammar.materials",  
         "operator": "min\_length",  
         "value": 1  
       },  
       {  
         "path": "materials",  
         "operator": "min\_length",  
         "value": 1  
       },  
       {  
         "path": "asset.materials",  
         "operator": "min\_length",  
         "value": 1  
       }  
     \],  
     "message": "Material language is too abstract or undefined.",  
     "resolution\_hint": "Specify ceramic, carbon fiber, titanium, concrete, metal, residue, or repair material."  
   },  
   {  
     "rule\_id": "val\_preset\_reference\_style\_required",  
     "name": "Preset Reference Style Required",  
     "layer": "visual",  
     "severity": "critical\_fail",  
     "scope": \[  
       "PromptPreset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "reference\_style\_id",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Preset lacks reference style binding.",  
     "resolution\_hint": "Bind preset to a valid reference style."  
   },  
   {  
     "rule\_id": "val\_preset\_negative\_profiles\_required",  
     "name": "Negative Profiles Required",  
     "layer": "visual",  
     "severity": "fail",  
     "scope": \[  
       "PromptPreset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "negative\_profile\_ids",  
         "operator": "min\_length",  
         "value": 1  
       }  
     \],  
     "message": "Preset lacks negative profile protection.",  
     "resolution\_hint": "Assign negative profiles for drift suppression."  
   },  
   {  
     "rule\_id": "val\_variant\_delta\_only",  
     "name": "Variant Must Be Delta-Only",  
     "layer": "archive",  
     "severity": "fail",  
     "scope": \[  
       "PromptVariant"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "delta\_profile",  
         "operator": "not\_null"  
       },  
       {  
         "path": "reference\_style\_id",  
         "operator": "is\_null"  
       },  
       {  
         "path": "visual\_defaults",  
         "operator": "is\_null"  
       }  
     \],  
     "message": "Variant is duplicating preset-layer information instead of delta-only behavior.",  
     "resolution\_hint": "Keep only delta profile and change-specific fields inside variants."  
   },  
   {  
     "rule\_id": "val\_variant\_preset\_binding\_required",  
     "name": "Variant Preset Binding Required",  
     "layer": "archive",  
     "severity": "critical\_fail",  
     "scope": \[  
       "PromptVariant"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "applies\_to\_presets",  
         "operator": "min\_length",  
         "value": 1  
       }  
     \],  
     "message": "Variant does not target any preset.",  
     "resolution\_hint": "Bind variant to at least one preset."  
   },  
   {  
     "rule\_id": "val\_reference\_style\_forbidden\_drifts\_required",  
     "name": "Reference Style Must Declare Forbidden Drifts",  
     "layer": "visual",  
     "severity": "fail",  
     "scope": \[  
       "ReferenceStyle"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "forbidden\_drifts",  
         "operator": "min\_length",  
         "value": 1  
       }  
     \],  
     "message": "Reference style has no drift bans.",  
     "resolution\_hint": "Declare explicit forbidden visual drifts."  
   },  
   {  
     "rule\_id": "val\_archive\_canon\_state\_required",  
     "name": "Canon State Required",  
     "layer": "archive",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Character",  
       "Faction",  
       "Location",  
       "Era",  
       "WeaponSystem",  
       "Rule",  
       "PromptPreset",  
       "PromptVariant",  
       "ReferenceStyle",  
       "Asset",  
       "Event"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "canon\_state",  
         "operator": "in",  
         "value": \[  
           "draft",  
           "validated\_soft",  
           "canon\_candidate",  
           "hard\_canon\_locked"  
         \]  
       }  
     \],  
     "message": "Entity has invalid or missing canon state.",  
     "resolution\_hint": "Assign valid canon state."  
   },  
   {  
     "rule\_id": "val\_archive\_status\_required",  
     "name": "Status Required",  
     "layer": "archive",  
     "severity": "fail",  
     "scope": \[  
       "Character",  
       "Faction",  
       "Location",  
       "Era",  
       "WeaponSystem",  
       "Rule",  
       "PromptPreset",  
       "PromptVariant",  
       "ReferenceStyle",  
       "Asset",  
       "Event"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "status",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Entity has no status field.",  
     "resolution\_hint": "Assign active, historical, deprecated, archived, or appropriate lifecycle value."  
   },  
   {  
     "rule\_id": "val\_archive\_lineage\_required\_for\_asset",  
     "name": "Asset Lineage Required",  
     "layer": "archive",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Asset"  
     \],  
     "logic\_mode": "all",  
     "conditions": \[  
       {  
         "path": "asset.source\_prompt\_id",  
         "operator": "not\_null"  
       },  
       {  
         "path": "asset.preset\_id",  
         "operator": "not\_null"  
       },  
       {  
         "path": "asset.variant\_id",  
         "operator": "not\_null"  
       },  
       {  
         "path": "asset.reference\_style\_id",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Asset lineage is incomplete.",  
     "resolution\_hint": "Attach source prompt, preset, variant, and reference style lineage."  
   },  
   {  
     "rule\_id": "val\_archive\_review\_required\_for\_promotion",  
     "name": "Review Required For Promotion",  
     "layer": "archive",  
     "severity": "critical\_fail",  
     "scope": \[  
       "Asset"  
     \],  
     "logic\_mode": "conditional\_all",  
     "when": \[  
       {  
         "path": "canon\_state",  
         "operator": "in",  
         "value": \[  
           "canon\_candidate",  
           "hard\_canon\_locked"  
         \]  
       }  
     \],  
     "conditions": \[  
       {  
         "path": "asset.review\_status",  
         "operator": "equals",  
         "value": "passed"  
       },  
       {  
         "path": "asset.validator\_status",  
         "operator": "equals",  
         "value": "passed"  
       }  
     \],  
     "message": "Promoted asset lacks successful review or validation.",  
     "resolution\_hint": "Pass validator and review before promotion."  
   },  
   {  
     "rule\_id": "val\_archive\_benchmark\_required\_for\_hardcanon",  
     "name": "Benchmark Comparison Required For Hard Canon",  
     "layer": "archive",  
     "severity": "fail",  
     "scope": \[  
       "Asset"  
     \],  
     "logic\_mode": "conditional\_all",  
     "when": \[  
       {  
         "path": "canon\_state",  
         "operator": "equals",  
         "value": "hard\_canon\_locked"  
       }  
     \],  
     "conditions": \[  
       {  
         "path": "asset.benchmark\_compare\_set",  
         "operator": "not\_null"  
       }  
     \],  
     "message": "Hard-canon asset lacks benchmark comparison record.",  
     "resolution\_hint": "Compare against gold/silver/red benchmark layers before hard lock."  
   }  
 \]  
}  
---

# **5\) Toán tử validator cần hỗ trợ**

Để chạy được rule pack này, engine validator phải hỗ trợ ít nhất các operator sau:

not\_null  
is\_null  
equals  
not\_equals  
in  
contains\_any  
does\_not\_contain  
min\_length  
global\_exactly\_one  
conditional\_all  
all  
any  
---

# **6\) Chuẩn interpret logic**

## **`logic_mode = "all"`**

Tất cả conditions phải pass.

## **`logic_mode = "any"`**

Chỉ cần 1 condition pass.

## **`logic_mode = "conditional_all"`**

Nếu phần `when` đúng thì toàn bộ `conditions` bắt buộc đúng.

## **`logic_mode = "global_exactly_one"`**

Dùng cho dataset-level validation, không phải entity-level.  
 Ví dụ:

* chỉ có 1 era được mark là `current`

---

# **7\) Mapping layer → nơi áp dụng thật**

## **Ontology**

Chặn:

* free energy

* pseudo-magic

* consequence-free violence

* entropy-free systems

## **Technology**

Bắt buộc:

* energy source

* cost model

* observable trace

* mechanism type hợp lệ

## **Character**

Bắt buộc:

* core truth

* causal shift

* faction / era grounding

* identity axis tối thiểu

## **Faction**

Bắt buộc:

* doctrine

* triết lý

* visual grammar

* operational coherence

## **Timeline**

Bắt buộc:

* era binding

* chronology

* uniqueness của current era

## **Visual**

Khóa:

* palette

* camera discipline

* damage language

* anti-drift

* material integrity

## **Archive**

Bắt buộc:

* canon\_state

* status

* lineage

* review/validator status khi promote

* benchmark compare khi hard canon

---

# **8\) Cách validator trả output chuẩn**

Output không trả kiểu văn xuôi.  
 Phải trả theo dạng như sau:

{  
 "entity\_id": "char\_mikage",  
 "entity\_type": "Character",  
 "validator\_run\_id": "run\_0001",  
 "result": "pass",  
 "summary": {  
   "info": 0,  
   "warning": 1,  
   "fail": 0,  
   "critical\_fail": 0  
 },  
 "findings": \[  
   {  
     "rule\_id": "val\_character\_identity\_axes\_required",  
     "severity": "warning",  
     "status": "pass",  
     "message": "Character has philosophical grounding."  
   }  
 \]  
}

Nếu fail:

{  
 "entity\_id": "weapon\_zenith\_blade",  
 "entity\_type": "WeaponSystem",  
 "validator\_run\_id": "run\_0002",  
 "result": "reject",  
 "summary": {  
   "info": 0,  
   "warning": 0,  
   "fail": 1,  
   "critical\_fail": 1  
 },  
 "findings": \[  
   {  
     "rule\_id": "val\_technology\_energy\_source\_required",  
     "severity": "critical\_fail",  
     "status": "fail",  
     "message": "No energy source defined.",  
     "resolution\_hint": "Specify biological, electrical, thermal, chemical, or hybrid energy source."  
   },  
   {  
     "rule\_id": "val\_ontology\_entropy\_logic",  
     "severity": "fail",  
     "status": "fail",  
     "message": "System lacks entropy or degradation logic.",  
     "resolution\_hint": "Add wear, thermal stress, fatigue, loss, or irreversible material change."  
   }  
 \]  
}  
---

# **9\) Quy tắc chặn promotion**

Validator phải chốt theo luật này:

## **Từ `draft` → `validated_soft`**

* không có `critical_fail`

* không có `fail`

## **Từ `validated_soft` → `canon_candidate`**

* validator pass

* review pass

* lineage complete

## **Từ `canon_candidate` → `hard_canon_locked`**

* validator pass

* review pass

* lineage complete

* benchmark compare complete

* governance approval true

---

# **10\) Thứ còn thiếu sau Rule Pack này**

Sau khi có **Seed Data Pack v1** và **Canon Validator Rule Pack v1**, hệ đã có:

* dữ liệu nền để graph sống

* luật validator để machine check

* severity semantics rõ

* layer semantics rõ

* archive gating logic rõ

