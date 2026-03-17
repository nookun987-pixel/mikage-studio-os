# Test Matrix

| Test ID | Scenario | Input Type | Expected Domain | Expected Result | Critical Checks |
|---------|----------|------------|-----------------|-----------------|-----------------|
| TM-001 | Lyra-0 in White Monolith | character_scene | imperial | PASS | No Neo-Tokyo clutter, glitch phantom identity preserved |
| TM-002 | Mikage character sheet | reference_sheet | character_only | PASS | Material accuracy, silhouette integrity, palette lock |
| TM-003 | Neo-Tokyo environment scene | environment_only | neo_tokyo | PASS | Urban density maintained, no imperial contamination |
| TM-004 | Imperial with Neo-Tokyo contamination | character_scene | imperial | REJECT | White Monolith protection, cross-domain blocking |
| TM-005 | Lyra-0 biological gore drift | character_scene | imperial | REJECT | Non-biological identity enforcement |
| TM-006 | Mikage palette contamination | reference_sheet | character_only | REJECT | Material lock enforcement, forbidden colors blocked |
| TM-007 | Mixed domain reference assets | character_scene | transition | PASS | Proper domain classification, clean separation |
| TM-008 | Forbidden weather in imperial | environment_only | imperial | REJECT | Weather restrictions enforced |
