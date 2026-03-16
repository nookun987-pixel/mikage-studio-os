# **MIKAGE — SEED DATA PACK v1**

## **0\. Cấu trúc thư mục chuẩn**

mikage\_seed\_pack/  
├── rules.seed.json  
├── characters.seed.json  
├── factions.seed.json  
├── locations.seed.json  
├── eras.seed.json  
├── weapons.seed.json  
├── reference\_styles.seed.json  
├── presets.seed.json  
└── variants.seed.json  
---

# **1\) `rules.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "Rule",  
 "rules": \[  
   {  
     "rule\_id": "rule\_no\_free\_power",  
     "name": "No Free Power",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "status": "active",  
     "description": "Any power source or high-output system must have explicit energy origin, cost, and consequence.",  
     "conditions": \[  
       "technology.energy\_source \!= null",  
       "technology.cost\_model \!= null",  
       "technology.observable\_trace \!= null"  
     \],  
     "failure\_message": "No Free Power violated.",  
     "resolution\_hint": "Define energy source, energetic cost, and physical trace."  
   },  
   {  
     "rule\_id": "rule\_no\_magic\_disguised\_as\_technology",  
     "name": "No Magic Disguised as Technology",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "status": "active",  
     "description": "Technology must be physically framed and causally bounded.",  
     "conditions": \[  
       "technology.mechanism\_type in \['material','mechanical','electrical','thermal','computational','biochemical'\]",  
       "technology.explanation\_style \!= 'mystical\_shortcut'"  
     \],  
     "failure\_message": "Technology behaves like magic.",  
     "resolution\_hint": "Replace mystical shorthand with material or systems-based explanation."  
   },  
   {  
     "rule\_id": "rule\_power\_leaves\_trace",  
     "name": "Power Leaves Trace",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "status": "active",  
     "description": "Any high-intensity action must leave physical, thermal, informational, or biological trace.",  
     "conditions": \[  
       "event.power\_usage.trace\_type \!= null",  
       "event.power\_usage.trace\_visibility in \['low','medium','high'\]"  
     \],  
     "failure\_message": "Power usage has no trace.",  
     "resolution\_hint": "Define residue, signature, damage, heat, acoustic pattern, or forensic trace."  
   },  
   {  
     "rule\_id": "rule\_beauty\_carries\_damage",  
     "name": "Beauty Must Carry Damage",  
     "layer": "visual",  
     "severity": "fail",  
     "status": "active",  
     "description": "Refined beauty must coexist with fracture, wear, consequence, or material memory.",  
     "conditions": \[  
       "visual.damage\_language \!= null",  
       "visual.perfection\_mode \!= 'sterile\_untouched'"  
     \],  
     "failure\_message": "Visual treatment is too sterile and consequence-free.",  
     "resolution\_hint": "Add fracture logic, wear pattern, scar, repair, residue, or material memory."  
   },  
   {  
     "rule\_id": "rule\_violence\_has\_consequence",  
     "name": "Violence Has Consequence",  
     "layer": "ontology",  
     "severity": "critical\_fail",  
     "status": "active",  
     "description": "Violent action must create bodily, structural, political, or psychological consequence.",  
     "conditions": \[  
       "event.violence\_consequence \!= null"  
     \],  
     "failure\_message": "Violence presented without consequence.",  
     "resolution\_hint": "Add aftermath, damage, trauma, political effect, or tactical cost."  
   },  
   {  
     "rule\_id": "rule\_character\_truth\_integrity",  
     "name": "Character Truth Integrity",  
     "layer": "character",  
     "severity": "critical\_fail",  
     "status": "active",  
     "description": "A character may change behavior but must not betray core truth without cause.",  
     "conditions": \[  
       "character.core\_truth \!= null",  
       "character.behavior\_shift\_requires\_cause \= true"  
     \],  
     "failure\_message": "Character acts outside core truth without narrative cause.",  
     "resolution\_hint": "Define motive, trigger, rupture, or transformation chain."  
   },  
   {  
     "rule\_id": "rule\_memory\_identity\_axis",  
     "name": "Memory vs Identity Axis Presence",  
     "layer": "philosophy",  
     "severity": "warning",  
     "status": "active",  
     "description": "Major character arcs should touch at least one core philosophical axis.",  
     "conditions": \[  
       "arc.philosophical\_axes\_count \>= 1"  
     \],  
     "failure\_message": "Arc lacks philosophical grounding.",  
     "resolution\_hint": "Map arc to one or more canonical philosophical axes."  
   },  
   {  
     "rule\_id": "rule\_palette\_lock",  
     "name": "Palette Lock",  
     "layer": "visual",  
     "severity": "fail",  
     "status": "active",  
     "description": "Core palette must remain anchored to porcelain white, void black, and visceral crimson.",  
     "conditions": \[  
       "visual.palette\_anchor contains '\#FAFAFA'",  
       "visual.palette\_anchor contains '\#0A0A0A'",  
       "visual.palette\_anchor contains '\#E60000'"  
     \],  
     "failure\_message": "Core Mikage palette missing.",  
     "resolution\_hint": "Restore triad palette anchors."  
   },  
   {  
     "rule\_id": "rule\_camera\_discipline",  
     "name": "Camera Discipline",  
     "layer": "visual",  
     "severity": "warning",  
     "status": "active",  
     "description": "Primary visual outputs should preserve anamorphic framing, controlled composition, and high-contrast lighting.",  
     "conditions": \[  
       "visual.camera\_language.anamorphic\_bias \= true",  
       "visual.camera\_language.controlled\_composition \= true",  
       "visual.camera\_language.chiaroscuro\_bias \= true"  
     \],  
     "failure\_message": "Camera language drifts from Mikage grammar.",  
     "resolution\_hint": "Reinstate anamorphic framing, composition restraint, and contrast discipline."  
   },  
   {  
     "rule\_id": "rule\_no\_childish\_idol\_drift",  
     "name": "No Childish Idol Drift",  
     "layer": "visual",  
     "severity": "critical\_fail",  
     "status": "active",  
     "description": "Output must not drift toward childish anime idol aesthetics.",  
     "conditions": \[  
       "visual.drift\_flags does\_not\_contain 'childish\_anime\_idol'"  
     \],  
     "failure\_message": "Childish anime idol drift detected.",  
     "resolution\_hint": "Remove cute-idol proportions, pop-idol styling, and juvenile affect."  
   },  
   {  
     "rule\_id": "rule\_no\_generic\_neon\_overload",  
     "name": "No Generic Cyberpunk Neon Overload",  
     "layer": "visual",  
     "severity": "fail",  
     "status": "active",  
     "description": "Cyberpunk treatment must remain restrained and not collapse into generic neon clutter.",  
     "conditions": \[  
       "visual.drift\_flags does\_not\_contain 'generic\_neon\_overload'"  
     \],  
     "failure\_message": "Generic neon overload detected.",  
     "resolution\_hint": "Reduce neon density, increase material realism, restore compositional restraint."  
   },  
   {  
     "rule\_id": "rule\_no\_fantasy\_magic\_aesthetic",  
     "name": "No Fantasy Magic Aesthetic",  
     "layer": "visual",  
     "severity": "critical\_fail",  
     "status": "active",  
     "description": "Mikage must not drift into fantasy spellcraft or decorative magic aesthetics.",  
     "conditions": \[  
       "visual.drift\_flags does\_not\_contain 'fantasy\_magic\_aesthetic'"  
     \],  
     "failure\_message": "Fantasy magic aesthetic detected.",  
     "resolution\_hint": "Replace arcane/glowing spell motifs with hard-material or system-driven logic."  
   }  
 \]  
}  
---

# **2\) `characters.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "Character",  
 "characters": \[  
   {  
     "character\_id": "char\_mikage",  
     "name": "Mikage",  
     "role": "primary\_protagonist",  
     "status": "active",  
     "aliases": \["The Porcelain Sovereign", "Shard Vessel"\],  
     "core\_truth": "She preserves control through ritual restraint while carrying irreversible fracture within.",  
     "identity\_axes": \[  
       "memory\_vs\_identity",  
       "body\_vs\_self",  
       "beauty\_vs\_cruelty",  
       "love\_vs\_possession",  
       "sacrifice\_vs\_self\_destruction"  
     \],  
     "psychological\_profile": {  
       "baseline\_state": "controlled",  
       "dominant\_traits": \[  
         "disciplined",  
         "observant",  
         "emotionally sealed",  
         "high pain tolerance",  
         "precision-driven"  
       \],  
       "fear\_core": "Loss of self through instrumentalization.",  
       "desire\_core": "To retain sovereign identity under systems that turn bodies into tools."  
     },  
     "body\_state": {  
       "biological\_status": "augmented\_human",  
       "damage\_persistence": true,  
       "visible\_material\_language": \[  
         "porcelain\_surface",  
         "fracture\_memory",  
         "surgical\_precision",  
         "trace\_residue"  
       \]  
     },  
     "faction\_id": "faction\_zenith\_reliquary",  
     "era\_id": "era\_post\_shard\_reconstruction",  
     "origin\_location\_id": "loc\_abyssal\_foundry",  
     "current\_location\_id": "loc\_veil\_city",  
     "signature\_palette": \["\#FAFAFA", "\#0A0A0A", "\#E60000"\],  
     "visual\_identity": {  
       "silhouette\_keywords": \[  
         "restrained",  
         "regal",  
         "blade\_linear",  
         "ceramic\_armor",  
         "sacred\_fracture"  
       \],  
       "forbidden\_drifts": \[  
         "childish\_anime\_idol",  
         "generic\_neon\_overload",  
         "fantasy\_magic\_aesthetic"  
       \]  
     },  
     "weapons": \[  
       "weapon\_zenith\_blade"  
     \],  
     "governing\_rules": \[  
       "rule\_no\_free\_power",  
       "rule\_no\_magic\_disguised\_as\_technology",  
       "rule\_power\_leaves\_trace",  
       "rule\_beauty\_carries\_damage",  
       "rule\_violence\_has\_consequence",  
       "rule\_character\_truth\_integrity",  
       "rule\_palette\_lock",  
       "rule\_camera\_discipline",  
       "rule\_no\_childish\_idol\_drift",  
       "rule\_no\_generic\_neon\_overload",  
       "rule\_no\_fantasy\_magic\_aesthetic"  
     \],  
     "canon\_state": "hard\_canon\_locked",  
     "notes": "Foundational identity anchor character for all visual and lore generation."  
   }  
 \]  
}  
---

# **3\) `factions.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "Faction",  
 "factions": \[  
   {  
     "faction\_id": "faction\_zenith\_reliquary",  
     "name": "Zenith Reliquary",  
     "status": "active",  
     "type": "sovereign\_technocratic\_order",  
     "doctrine": "Beauty is preserved through disciplined containment of damage, memory, and force.",  
     "philosophical\_axes": \[  
       "order\_vs\_freedom",  
       "beauty\_vs\_cruelty",  
       "memory\_vs\_identity"  
     \],  
     "visual\_grammar": {  
       "materials": \[  
         "porcelain\_ceramic",  
         "carbon\_fiber",  
         "oxidized\_titanium",  
         "surgical\_alloys"  
       \],  
       "palette": \["\#FAFAFA", "\#0A0A0A", "\#E60000"\],  
       "keywords": \[  
         "sacred\_fracture",  
         "restrained\_futurism",  
         "industrial\_brutality",  
         "ritual\_precision"  
       \]  
     },  
     "forbidden\_drifts": \[  
       "ornate\_fantasy\_royalty",  
       "soft\_utopian\_cleanroom",  
       "idolized\_pop\_glamour"  
     \],  
     "home\_location\_id": "loc\_veil\_city",  
     "governing\_rules": \[  
       "rule\_no\_free\_power",  
       "rule\_beauty\_carries\_damage",  
       "rule\_palette\_lock"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "faction\_id": "faction\_black\_archive",  
     "name": "Black Archive",  
     "status": "active",  
     "type": "forensic\_state\_apparatus",  
     "doctrine": "Nothing is lost if trace remains.",  
     "philosophical\_axes": \[  
       "memory\_vs\_identity",  
       "order\_vs\_freedom"  
     \],  
     "visual\_grammar": {  
       "materials": \[  
         "obsidian\_composite",  
         "sensor\_glass",  
         "data\_filament",  
         "burned\_metal"  
       \],  
       "palette": \["\#0A0A0A", "\#5A5A5A", "\#E60000"\],  
       "keywords": \[  
         "forensic\_density",  
         "cold\_surveillance",  
         "residue\_logic"  
       \]  
     },  
     "forbidden\_drifts": \[  
       "sleek\_consumer\_tech\_minimalism",  
       "neon\_party\_cyberpunk"  
     \],  
     "home\_location\_id": "loc\_archive\_spine",  
     "governing\_rules": \[  
       "rule\_power\_leaves\_trace",  
       "rule\_violence\_has\_consequence"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "faction\_id": "faction\_free\_shards",  
     "name": "Free Shards",  
     "status": "active",  
     "type": "distributed\_breakaway\_collective",  
     "doctrine": "A broken body may still own itself.",  
     "philosophical\_axes": \[  
       "body\_vs\_self",  
       "order\_vs\_freedom",  
       "sacrifice\_vs\_self\_destruction"  
     \],  
     "visual\_grammar": {  
       "materials": \[  
         "patched\_ceramic",  
         "salvage\_metal",  
         "heat\_scored\_polymer",  
         "field\_repair\_fabric"  
       \],  
       "palette": \["\#FAFAFA", "\#0A0A0A", "\#7A0C0C"\],  
       "keywords": \[  
         "repair\_visible",  
         "survival\_engineering",  
         "scarred\_humanity"  
       \]  
     },  
     "forbidden\_drifts": \[  
       "romanticized\_scrap\_punk",  
       "cartoon\_rebel\_style"  
     \],  
     "home\_location\_id": "loc\_shatter\_district",  
     "governing\_rules": \[  
       "rule\_beauty\_carries\_damage",  
       "rule\_violence\_has\_consequence",  
       "rule\_character\_truth\_integrity"  
     \],  
     "canon\_state": "validated\_soft"  
   }  
 \]  
}  
---

# **4\) `locations.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "Location",  
 "locations": \[  
   {  
     "location\_id": "loc\_veil\_city",  
     "name": "Veil City",  
     "status": "active",  
     "type": "megastructure\_city",  
     "description": "A layered metropolis where ceremonial control, industrial extraction, and political surveillance coexist.",  
     "visual\_keywords": \[  
       "void\_black\_mass",  
       "contained\_lights",  
       "wet\_industrial\_surfaces",  
       "ceramic\_monuments",  
       "cable\_density"  
     \],  
     "faction\_ownership": \[  
       "faction\_zenith\_reliquary",  
       "faction\_black\_archive"  
     \],  
     "era\_id": "era\_post\_shard\_reconstruction",  
     "governing\_rules": \[  
       "rule\_no\_generic\_neon\_overload",  
       "rule\_violence\_has\_consequence"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "location\_id": "loc\_abyssal\_foundry",  
     "name": "Abyssal Foundry",  
     "status": "active",  
     "type": "deep\_material\_forge",  
     "description": "A thermally violent industrial substrate where ceramic armor, structural composites, and body-integrated systems are fabricated and repaired.",  
     "visual\_keywords": \[  
       "heat\_bloom",  
       "oxidized\_metal",  
       "pressure\_chambers",  
       "ceramic\_casting",  
       "industrial\_brutality"  
     \],  
     "faction\_ownership": \[  
       "faction\_zenith\_reliquary"  
     \],  
     "era\_id": "era\_post\_shard\_reconstruction",  
     "governing\_rules": \[  
       "rule\_no\_free\_power",  
       "rule\_power\_leaves\_trace"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "location\_id": "loc\_archive\_spine",  
     "name": "Archive Spine",  
     "status": "active",  
     "type": "forensic\_memory\_infrastructure",  
     "description": "A vertical memory vault system storing residue logs, tactical traces, and identity records.",  
     "visual\_keywords": \[  
       "black\_vaults",  
       "cold\_data\_shafts",  
       "signal\_glow",  
       "forensic\_density"  
     \],  
     "faction\_ownership": \[  
       "faction\_black\_archive"  
     \],  
     "era\_id": "era\_post\_shard\_reconstruction",  
     "governing\_rules": \[  
       "rule\_power\_leaves\_trace",  
       "rule\_memory\_identity\_axis"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "location\_id": "loc\_shatter\_district",  
     "name": "Shatter District",  
     "status": "active",  
     "type": "repair\_frontier\_zone",  
     "description": "A broken urban sector where survival engineering and identity improvisation challenge sovereign order.",  
     "visual\_keywords": \[  
       "fractured\_concrete",  
       "patchwork\_repairs",  
       "low\_light",  
       "heat\_scars",  
       "human\_density"  
     \],  
     "faction\_ownership": \[  
       "faction\_free\_shards"  
     \],  
     "era\_id": "era\_post\_shard\_reconstruction",  
     "governing\_rules": \[  
       "rule\_beauty\_carries\_damage",  
       "rule\_violence\_has\_consequence"  
     \],  
     "canon\_state": "validated\_soft"  
   }  
 \]  
}  
---

# **5\) `eras.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "Era",  
 "eras": \[  
   {  
     "era\_id": "era\_pre\_fracture",  
     "name": "Pre-Fracture",  
     "status": "historical",  
     "sequence\_index": 1,  
     "summary": "High-control techno-civil order before structural rupture and identity crisis escalation.",  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "era\_id": "era\_shard\_collapse",  
     "name": "Shard Collapse",  
     "status": "historical",  
     "sequence\_index": 2,  
     "summary": "Period of systemic failure, body weaponization, and irreversible civic fracture.",  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "era\_id": "era\_post\_shard\_reconstruction",  
     "name": "Post-Shard Reconstruction",  
     "status": "current",  
     "sequence\_index": 3,  
     "summary": "Present operating era defined by containment regimes, repair cultures, and canonized damage aesthetics.",  
     "canon\_state": "hard\_canon\_locked"  
   }  
 \]  
}  
---

# **6\) `weapons.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "WeaponSystem",  
 "weapons": \[  
   {  
     "weapon\_id": "weapon\_zenith\_blade",  
     "name": "Zenith Blade",  
     "status": "active",  
     "weapon\_type": "high\_mass\_edge\_system",  
     "owner\_character\_id": "char\_mikage",  
     "description": "A ceremonial-combat blade system built from ceramic-composite architecture and heat-stressed structural alloys.",  
     "technology": {  
       "energy\_source": "muscular\_assist\_plus\_capacitor\_release",  
       "cost\_model": "high metabolic burden, thermal buildup, edge fatigue, operator strain",  
       "observable\_trace": \[  
         "heat\_signature",  
         "microfracture\_debris",  
         "acoustic\_shear",  
         "residual scoring"  
       \],  
       "mechanism\_type": "material\_mechanical"  
     },  
     "visual\_identity": {  
       "materials": \[  
         "boron\_carbide\_ceramic",  
         "carbon\_fiber\_core",  
         "oxidized\_titanium\_spine"  
       \],  
       "keywords": \[  
         "regal\_mass",  
         "fracture\_authority",  
         "precision\_violence"  
       \]  
     },  
     "governing\_rules": \[  
       "rule\_no\_free\_power",  
       "rule\_no\_magic\_disguised\_as\_technology",  
       "rule\_power\_leaves\_trace",  
       "rule\_violence\_has\_consequence"  
     \],  
     "canon\_state": "validated\_soft"  
   }  
 \]  
}  
---

# **7\) `reference_styles.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "ReferenceStyle",  
 "reference\_styles": \[  
   {  
     "reference\_style\_id": "ref\_porcelain\_void",  
     "name": "Porcelain Void",  
     "status": "active",  
     "purpose": "Core identity anchor for Mikage portrait and hero shots.",  
     "visual\_principles": \[  
       "porcelain\_purity",  
       "void\_black\_contrast",  
       "visceral\_crimson\_accent",  
       "controlled\_composition",  
       "sacred\_fracture\_aesthetic"  
     \],  
     "materials": \[  
       "polished\_ceramic",  
       "matte\_porcelain",  
       "carbon\_fiber",  
       "dark\_titanium"  
     \],  
     "palette": \["\#FAFAFA", "\#0A0A0A", "\#E60000"\],  
     "lighting": \[  
       "high\_contrast\_chiaroscuro",  
       "razor\_rim\_light",  
       "contained\_specular\_reflection"  
     \],  
     "camera\_language": {  
       "anamorphic\_bias": true,  
       "controlled\_composition": true,  
       "chiaroscuro\_bias": true  
     },  
     "forbidden\_drifts": \[  
       "generic\_anime\_gloss",  
       "oversaturated\_neon\_chaos",  
       "fantasy\_spell\_visuals"  
     \],  
     "canon\_state": "hard\_canon\_locked"  
   },  
   {  
     "reference\_style\_id": "ref\_industrial\_fracture",  
     "name": "Industrial Fracture",  
     "status": "active",  
     "purpose": "Environment and combat realism anchor.",  
     "visual\_principles": \[  
       "industrial\_brutality",  
       "material\_consequence",  
       "thermodynamic\_residue",  
       "repair\_visible"  
     \],  
     "materials": \[  
       "oxidized\_metal",  
       "heat\_scored\_polymer",  
       "fractured\_ceramic",  
       "wet\_concrete"  
     \],  
     "palette": \["\#0A0A0A", "\#3A3A3A", "\#E60000"\],  
     "lighting": \[  
       "controlled\_haze",  
       "industrial\_backlight",  
       "low\_key\_reflection"  
     \],  
     "camera\_language": {  
       "anamorphic\_bias": true,  
       "controlled\_composition": true,  
       "chiaroscuro\_bias": true  
     },  
     "forbidden\_drifts": \[  
       "clean\_utopian\_design",  
       "arcane\_runic\_visuals"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "reference\_style\_id": "ref\_luxury\_editorial\_restrain",  
     "name": "Luxury Editorial Restraint",  
     "status": "active",  
     "purpose": "High-fashion mode without canon drift.",  
     "visual\_principles": \[  
       "luxury\_restraint",  
       "museum\_object\_presence",  
       "elevated\_material\_control",  
       "damage\_under\_surface"  
     \],  
     "materials": \[  
       "porcelain\_finish",  
       "couture\_structural\_layers",  
       "minimalist\_ceramic\_armor"  
     \],  
     "palette": \["\#FAFAFA", "\#0A0A0A", "\#6A0000"\],  
     "lighting": \[  
       "studio\_chiaroscuro",  
       "thin\_rim\_isolation",  
       "cold\_specular\_edges"  
     \],  
     "camera\_language": {  
       "anamorphic\_bias": true,  
       "controlled\_composition": true,  
       "chiaroscuro\_bias": true  
     },  
     "forbidden\_drifts": \[  
       "pop\_fashion\_editorial",  
       "cute\_soft\_glamour"  
     \],  
     "canon\_state": "validated\_soft"  
   }  
 \]  
}  
---

# **8\) `presets.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "PromptPreset",  
 "presets": \[  
   {  
     "preset\_id": "preset\_canon\_core",  
     "name": "canon\_core",  
     "status": "active",  
     "description": "Primary canonical generation mode. Maximum identity control, minimum drift tolerance.",  
     "reference\_style\_id": "ref\_porcelain\_void",  
     "goal\_profile": {  
       "identity\_lock": "high",  
       "beauty\_bias": "medium",  
       "narrative\_density": "high",  
       "drift\_tolerance": "low"  
     },  
     "visual\_defaults": {  
       "palette\_anchor": \["\#FAFAFA", "\#0A0A0A", "\#E60000"\],  
       "material\_priority": \[  
         "porcelain",  
         "carbon\_fiber",  
         "titanium",  
         "wet\_industrial\_surfaces"  
       \],  
       "lighting\_priority": \[  
         "high\_contrast\_chiaroscuro",  
         "rim\_light",  
         "contained\_highlights"  
       \]  
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
     "description": "Controlled beauty-forward mode while preserving canon boundaries.",  
     "reference\_style\_id": "ref\_porcelain\_void",  
     "goal\_profile": {  
       "identity\_lock": "high",  
       "beauty\_bias": "high",  
       "narrative\_density": "medium",  
       "drift\_tolerance": "low"  
     },  
     "visual\_defaults": {  
       "palette\_anchor": \["\#FAFAFA", "\#0A0A0A", "\#E60000"\],  
       "material\_priority": \[  
         "polished\_porcelain",  
         "matte\_couture\_surfaces",  
         "subtle\_carbon\_fiber"  
       \],  
       "lighting\_priority": \[  
         "sculpted\_chiaroscuro",  
         "editorial\_rim\_light",  
         "cold\_specular\_control"  
       \]  
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
     "description": "Editorial elevation mode; mystical only in mood, never in ontology.",  
     "reference\_style\_id": "ref\_luxury\_editorial\_restrain",  
     "goal\_profile": {  
       "identity\_lock": "high",  
       "beauty\_bias": "high",  
       "narrative\_density": "medium",  
       "drift\_tolerance": "low"  
     },  
     "visual\_defaults": {  
       "palette\_anchor": \["\#FAFAFA", "\#0A0A0A", "\#E60000"\],  
       "material\_priority": \[  
         "porcelain",  
         "minimal\_armor",  
         "editorial\_structure"  
       \],  
       "lighting\_priority": \[  
         "museum\_darkness",  
         "thin\_rim\_light",  
         "cold\_specular\_edges"  
       \]  
     },  
     "negative\_profile\_ids": \[  
       "neg\_fantasy\_magic",  
       "neg\_soft\_glamour",  
       "neg\_childish\_idol"  
     \],  
     "seed\_policy\_id": "seed\_stable\_identity",  
     "canon\_state": "validated\_soft"  
   }  
 \]  
}  
---

# **9\) `variants.seed.json`**

{  
 "pack\_version": "1.0.0",  
 "project": "mikage",  
 "entity\_type": "PromptVariant",  
 "variants": \[  
   {  
     "variant\_id": "variant\_portrait\_regal\_stillness",  
     "name": "portrait\_regal\_stillness",  
     "status": "active",  
     "applies\_to\_presets": \[  
       "preset\_canon\_core",  
       "preset\_luminous\_fan\_appeal",  
       "preset\_luxury\_mystical\_editorial"  
     \],  
     "delta\_profile": {  
       "shot\_type": "portrait",  
       "pose\_bias": "still",  
       "emotion\_bias": "contained",  
       "environment\_density": "low",  
       "camera\_distance": "medium\_close"  
     },  
     "add\_keywords": \[  
       "regal\_stillness",  
       "sovereign\_presence",  
       "museum\_silence"  
     \],  
     "remove\_keywords": \[  
       "combat\_sprint",  
       "crowded\_background"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "variant\_id": "variant\_rooftop\_storm\_advance",  
     "name": "rooftop\_storm\_advance",  
     "status": "active",  
     "applies\_to\_presets": \[  
       "preset\_canon\_core"  
     \],  
     "delta\_profile": {  
       "shot\_type": "wide\_cinematic",  
       "pose\_bias": "forward\_motion",  
       "emotion\_bias": "determined",  
       "environment\_density": "medium",  
       "camera\_distance": "wide"  
     },  
     "add\_keywords": \[  
       "storm\_rain",  
       "rooftop\_wind",  
       "city\_depth",  
       "kinetic\_forward\_step"  
     \],  
     "remove\_keywords": \[  
       "soft\_daylight",  
       "empty\_void\_studio"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "variant\_id": "variant\_neon\_street\_procession",  
     "name": "neon\_street\_procession",  
     "status": "active",  
     "applies\_to\_presets": \[  
       "preset\_canon\_core",  
       "preset\_luminous\_fan\_appeal"  
     \],  
     "delta\_profile": {  
       "shot\_type": "full\_body",  
       "pose\_bias": "measured\_walk",  
       "emotion\_bias": "sealed",  
       "environment\_density": "medium\_high",  
       "camera\_distance": "full"  
     },  
     "add\_keywords": \[  
       "wet\_street\_reflection",  
       "contained\_neon",  
       "steam\_vents",  
       "urban\_depth"  
     \],  
     "remove\_keywords": \[  
       "festival\_lighting",  
       "chaotic\_signage\_excess"  
     \],  
     "canon\_state": "validated\_soft"  
   },  
   {  
     "variant\_id": "variant\_editorial\_void\_icon",  
     "name": "editorial\_void\_icon",  
     "status": "active",  
     "applies\_to\_presets": \[  
       "preset\_luxury\_mystical\_editorial",  
       "preset\_luminous\_fan\_appeal"  
     \],  
     "delta\_profile": {  
       "shot\_type": "editorial\_portrait",  
       "pose\_bias": "sculptural",  
       "emotion\_bias": "enigmatic",  
       "environment\_density": "minimal",  
       "camera\_distance": "portrait"  
     },  
     "add\_keywords": \[  
       "obsidian\_void",  
       "couture\_silhouette",  
       "sculptural\_isolation"  
     \],  
     "remove\_keywords": \[  
       "combat\_debris",  
       "heavy\_industrial\_clutter"  
     \],  
     "canon\_state": "validated\_soft"  
   }  
 \]  
}  
---

# **10\) Liên kết graph tối thiểu phải sinh ra sau ingest**

Sau khi nạp pack này, graph phải tạo được ít nhất các relation sau:

(char\_mikage)-\[:BELONGS\_TO\]-\>(faction\_zenith\_reliquary)  
(char\_mikage)-\[:LOCATED\_IN\]-\>(loc\_veil\_city)  
(char\_mikage)-\[:IN\_ERA\]-\>(era\_post\_shard\_reconstruction)  
(char\_mikage)-\[:USES\_WEAPON\]-\>(weapon\_zenith\_blade)

(faction\_zenith\_reliquary)-\[:LOCATED\_IN\]-\>(loc\_veil\_city)  
(faction\_black\_archive)-\[:LOCATED\_IN\]-\>(loc\_archive\_spine)  
(faction\_free\_shards)-\[:LOCATED\_IN\]-\>(loc\_shatter\_district)

(preset\_canon\_core)-\[:GENERATED\_FROM\]-\>(ref\_porcelain\_void)  
(preset\_luminous\_fan\_appeal)-\[:GENERATED\_FROM\]-\>(ref\_porcelain\_void)  
(preset\_luxury\_mystical\_editorial)-\[:GENERATED\_FROM\]-\>(ref\_luxury\_editorial\_restrain)

(char\_mikage)-\[:CONSTRAINED\_BY\_RULE\]-\>(rule\_no\_free\_power)  
(char\_mikage)-\[:CONSTRAINED\_BY\_RULE\]-\>(rule\_character\_truth\_integrity)  
(char\_mikage)-\[:CONSTRAINED\_BY\_RULE\]-\>(rule\_no\_fantasy\_magic\_aesthetic)

(loc\_veil\_city)-\[:IN\_ERA\]-\>(era\_post\_shard\_reconstruction)  
(loc\_archive\_spine)-\[:IN\_ERA\]-\>(era\_post\_shard\_reconstruction)  
(loc\_shatter\_district)-\[:IN\_ERA\]-\>(era\_post\_shard\_reconstruction)

(variant\_portrait\_regal\_stillness)-\[:BENCHMARK\_LAYER\]-\>(preset\_canon\_core)  
(variant\_neon\_street\_procession)-\[:BENCHMARK\_LAYER\]-\>(preset\_luminous\_fan\_appeal)  
---

# **11\) Schema discipline bắt buộc cho seed pack**

Mọi file seed sau này phải tuân theo 8 luật dữ liệu sau:

## **1\. ID bất biến**

* mọi entity phải có ID ổn định

* không đổi ID chỉ vì đổi tên hiển thị

## **2\. Không nhập lore tự do**

* mọi mô tả phải phục vụ validation, indexing hoặc generation

* cấm mô tả văn chương dài dòng

## **3\. Mọi entity phải có `canon_state`**

Giá trị hợp lệ:

* `draft`

* `validated_soft`

* `canon_candidate`

* `hard_canon_locked`

## **4\. Mọi entity cần `status`**

Giá trị hợp lệ:

* `active`

* `historical`

* `deprecated`

* `archived`

## **5\. Rule phải tách khỏi code**

* validator đọc rule từ file

* không hardcode toàn bộ trong app

## **6\. Preset không chứa prompt full**

* preset chỉ là control layer

* prompt compiler mới là nơi compile final output

## **7\. Variant chỉ chứa delta**

* variant không được lặp lại toàn bộ preset

* chỉ mô tả phần thay đổi

## **8\. Mọi thực thể cốt lõi phải có relation-ready fields**

Ví dụ:

* character cần `faction_id`, `era_id`, `location_id`

* weapon cần `owner_character_id`

* preset cần `reference_style_id`

---

# **12\) Thứ tự ingest chuẩn cho bộ này**

Để tránh lỗi relation mồ côi, thứ tự nạp nên là:

1\. eras.seed.json  
2\. rules.seed.json  
3\. factions.seed.json  
4\. locations.seed.json  
5\. reference\_styles.seed.json  
6\. weapons.seed.json  
7\. characters.seed.json  
8\. presets.seed.json  
9\. variants.seed.json

Lý do:

* era và rule là nền

* faction/location/reference style là node nền

* weapon trước character để mapping owner ngược hoặc sau cũng được nếu ingest hỗ trợ deferred relation

* preset cần reference style

* variant cần preset

---

# **13\) Bản chốt vận hành**

Với đúng bộ này, Mikage đã có:

* node seed đầu tiên để graph sống

* rule seed đầu tiên để validator map

* style anchor đầu tiên để chống drift

* preset và variant đầu tiên để compiler gọi

* character/faction/location/era/weapon có relation-ready structure

