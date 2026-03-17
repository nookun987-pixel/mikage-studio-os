# Request Summary
- request_type: environment_only
- subject_id: env_neo_tokyo_generic
- scene_domain: neo_tokyo
- output_mode: cinematic_render_spec

# Resolved Domain
Neo-Tokyo - Urban density and technology integration allowed, imperial restrictions not applied

# Applied Sources
- docs/visual-authority/neo_tokyo_reference_index.json
- docs/style-guardrails/visual_grammar_blocks.json
- configs/generation/domain_classifier.json
- datasets/visual-index/visual_tag_registry.json
- datasets/visual-index/scene_asset_map.json
- studio-os/prompt_assembly_flow.json

# Final Assembled Prompt
```
cinematic environment render, ARRI ALEXA 65 85mm anamorphic 2.76:1, Neo-Tokyo urban density, atmospheric perspective, volumetric haze

ENVIRONMENT:
Neo-Tokyo district, multi-level urban density, vertical stacks, readable density, disciplined signage, megastructure towers, skybridges, underground infrastructure, environmental display systems, rain neon alley with wet reflections, narrow corridor depth, noisy-light restraint, cyber shrine with threshold frames, silent megacity with large voids, slow framing, low-noise atmosphere

MATERIALS:
raw concrete, galvanized steel, dark titanium, fiber optic cables, holographic displays, weathered urban materials, controlled decay, urban wear patterns

LIGHTING:
volumetric haze, neon glow, holographic light sources, wet surface reflections, atmospheric perspective, deep shadows, controlled neon accents, cyberpunk lighting restraint

CINEMATOGRAPHY:
wide establishing shots, vertical composition, deep focus, atmospheric depth, motion blur for rain effects, high contrast lighting, anamorphic lens characteristics, urban scale cinematography

ATMOSPHERE:
rain-soaked streets, neon reflections on wet surfaces, volumetric fog, controlled urban decay, lived-in environment, functional technology integration, community density, vertical urban planning

RESTRICTIONS:
no sterile porcelain imperial dominance, no over-clean symmetry, no loss of urban density, no biological gore, no natural sunlight, no rust in critical infrastructure, no mess cables in visible areas, no western architectural elements
```

# Validation Result
PASS - Neo-Tokyo domain properly classified, urban density maintained

# Rejection Risks
- Imperial porcelain contamination from over-clean surfaces or symmetry
- Over-clean symmetry losing urban character and density
- Loss of urban density from excessive minimalism
- Western architectural elements contaminating Japanese aesthetic
- Excessive neon saturation violating disciplined signage principles
