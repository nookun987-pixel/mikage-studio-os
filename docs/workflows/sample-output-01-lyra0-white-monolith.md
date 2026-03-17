# Request Summary
- request_type: character_scene
- subject_id: chr_lyra_0
- environment_id: env_white_monolith_01
- scene_domain: imperial
- output_mode: prompt_plus_validation

# Resolved Domain
Imperial (White Monolith) - Maximum precedence enforced, Neo-Tokyo elements blocked

# Applied Sources
- docs/lore-core/lyra_0_character.md
- docs/style-guardrails/visual_grammar_blocks.json
- docs/visual-authority/neo_tokyo_reference_index.json
- configs/generation/domain_classifier.json
- configs/generation/style_resolution_rules.json
- datasets/visual-index/scene_asset_map.json
- studio-os/canon_validation_flow.json

# Final Assembled Prompt
```
masterpiece, ARRI ALEXA 65 85mm anamorphic 2.76:1, clinical lighting, volumetric haze, motion blur, high contrast chiaroscuro

SUBJECT:
Lyra-0 as glitch phantom ARCHON vessel, porcelain white combat armor with micro fractures, matte black carbon fiber understructure, dark titanium joints, cold cyan emission points, plasma magenta energy traces, fiber optic dress with holographic decay, kitsune mask with restrained crimson reactor core, agile hunter silhouette, no biological elements, no gore, no rust

ENVIRONMENT:
White Monolith imperial zone, absolute order architecture, porcelain minimalism, sterile surfaces, clinical lighting, no natural sunlight, no weather effects, no urban clutter, no mess cables, no rust, no decay, clean geometric forms, perfect symmetry, cold cyan accent lighting, volumetric haze

MATERIALS:
porcelain white, matte black carbon fiber, dark titanium, cold cyan emission, plasma magenta, viscous crimson, holographic decay

CINEMATOGRAPHY:
85mm portrait compression, shallow depth of field, clinical lighting, volumetric haze, motion blur, high contrast chiaroscuro, anamorphic lens flares, clean composition

RESTRICTIONS:
no rust, no mess cables, no biological gore, no natural sunlight, no urban clutter in imperial, no weather effects, no decay, no biological elements, no Neo-Tokyo density, no rain neon alley, no vertical signage, no raw concrete, no galvanized steel
```

# Validation Result
PASS - All validation checkpoints cleared, imperial domain protection enforced

# Rejection Risks
- Urban clutter bleed from Neo-Tokyo reference assets
- Biological gore drift in glitch phantom interpretation
- Sunlight/weather contamination in White Monolith environment
- Cross-domain contamination from mixed reference sources
