/**
 * @package @mikage/scene-graph
 * @wave 15
 *
 * scene-builder.ts
 */
export class DefaultSceneBuilder {
    buildSceneContext(scene, cameraId) {
        const activeCamera = cameraId
            ? scene.camera.cameraId === cameraId ? scene.camera : scene.camera
            : scene.camera;
        const visibleCharacters = this.getVisibleCharacters(scene, activeCamera);
        const environmentDetails = scene.environment.details;
        const assetBindings = scene.assets;
        const generationHints = this.buildGenerationHints(scene, activeCamera, visibleCharacters);
        return {
            scene,
            activeCamera,
            visibleCharacters,
            environmentDetails,
            assetBindings,
            generationHints
        };
    }
    extractSceneAssets(scene) {
        const assets = [];
        for (const character of scene.characters) {
            if (character.appearance.style) {
                assets.push({
                    assetId: `char_style_${character.characterId}`,
                    assetType: "reference",
                    bindingType: "character_appearance",
                    targetNodeId: character.characterId,
                    targetProperty: "style",
                    weight: 0.8,
                    description: `Style reference for ${character.name}`
                });
            }
            for (const clothing of character.clothing || []) {
                assets.push({
                    assetId: `char_clothing_${character.characterId}_${clothing}`,
                    assetType: "reference",
                    bindingType: "character_appearance",
                    targetNodeId: character.characterId,
                    targetProperty: "clothing",
                    weight: 0.6,
                    description: `Clothing: ${clothing} for ${character.name}`
                });
            }
            if (character.pose) {
                assets.push({
                    assetId: `char_pose_${character.characterId}`,
                    assetType: "reference",
                    bindingType: "character_appearance",
                    targetNodeId: character.characterId,
                    targetProperty: "pose",
                    weight: 0.7,
                    description: `Pose reference for ${character.name}: ${character.pose}`
                });
            }
        }
        for (const detail of scene.environment.details) {
            assets.push({
                assetId: `env_detail_${detail.detailId}`,
                assetType: detail.type === "texture" ? "texture" : "reference",
                bindingType: "environment_texture",
                targetNodeId: scene.environment.environmentId,
                targetProperty: detail.type,
                weight: 0.5,
                description: `Environment ${detail.type}: ${detail.name}`
            });
        }
        assets.push(...scene.assets);
        return assets;
    }
    generateScenePrompt(context) {
        const { scene, activeCamera, visibleCharacters, environmentDetails } = context;
        const promptParts = [];
        promptParts.push(this.buildEnvironmentPrompt(scene.environment));
        promptParts.push(this.buildCharacterPrompt(visibleCharacters));
        promptParts.push(this.buildCameraPrompt(activeCamera));
        promptParts.push(this.buildLightingPrompt(scene.lighting));
        promptParts.push(this.buildStylePrompt(scene.metadata));
        return promptParts.filter(part => part.length > 0).join(", ");
    }
    extractGenerationParameters(context) {
        const { scene, activeCamera } = context;
        const params = {
            sceneId: scene.sceneId,
            sceneType: scene.sceneType,
            cameraType: activeCamera.cameraType,
            shotType: activeCamera.shotType,
            angle: activeCamera.angle,
            fov: activeCamera.fov,
            lightingSetup: scene.lighting.setup,
            mood: scene.environment.mood,
            atmosphere: scene.environment.atmosphere,
            timeOfDay: scene.environment.timeOfDay,
            weather: scene.environment.weather,
            season: scene.environment.season
        };
        if (activeCamera.position) {
            params.cameraPosition = activeCamera.position;
        }
        if (activeCamera.target) {
            params.cameraTarget = activeCamera.target;
        }
        if (scene.lighting.colorTemperature) {
            params.colorTemperature = scene.lighting.colorTemperature;
        }
        if (scene.lighting.intensity) {
            params.lightingIntensity = scene.lighting.intensity;
        }
        return params;
    }
    getVisibleCharacters(scene, camera) {
        return scene.characters
            .filter(character => character.importance > 0.1)
            .sort((a, b) => b.importance - a.importance)
            .slice(0, 3);
    }
    buildGenerationHints(scene, camera, characters) {
        const hints = [];
        hints.push({
            hintId: "composition_shot_type",
            type: "composition",
            priority: 1,
            content: `${camera.shotType} shot from ${camera.angle} angle`,
            weight: 0.9,
            appliesTo: ["composition"]
        });
        hints.push({
            hintId: "environment_mood",
            type: "environment",
            priority: 2,
            content: `${scene.environment.mood} atmosphere, ${scene.environment.atmosphere} feeling`,
            weight: 0.8,
            appliesTo: ["environment", "lighting"]
        });
        hints.push({
            hintId: "lighting_setup",
            type: "lighting",
            priority: 2,
            content: `${scene.lighting.setup} lighting with ${scene.lighting.mood} mood`,
            weight: 0.7,
            appliesTo: ["lighting"]
        });
        if (characters.length > 0) {
            const mainCharacter = characters[0];
            hints.push({
                hintId: "character_focus",
                type: "character",
                priority: 1,
                content: `Focus on ${mainCharacter.name}, ${mainCharacter.role} with ${mainCharacter.appearance.style} style`,
                weight: 0.8,
                appliesTo: ["character"]
            });
        }
        hints.push({
            hintId: "style_guide",
            type: "style",
            priority: 3,
            content: scene.metadata.style,
            weight: 0.6,
            appliesTo: ["style"]
        });
        return hints.sort((a, b) => a.priority - b.priority);
    }
    buildEnvironmentPrompt(environment) {
        const parts = [];
        parts.push(environment.name);
        parts.push(environment.type);
        parts.push(environment.location);
        if (environment.timeOfDay) {
            parts.push(environment.timeOfDay);
        }
        if (environment.weather) {
            parts.push(environment.weather);
        }
        if (environment.season) {
            parts.push(environment.season);
        }
        parts.push(environment.mood);
        parts.push(environment.atmosphere);
        return parts.join(" ");
    }
    buildCharacterPrompt(characters) {
        if (characters.length === 0) {
            return "";
        }
        return characters
            .map(character => {
            const parts = [];
            parts.push(character.name);
            parts.push(character.role);
            if (character.appearance.gender) {
                parts.push(character.appearance.gender);
            }
            if (character.appearance.age) {
                parts.push(character.appearance.age);
            }
            if (character.appearance.style) {
                parts.push(character.appearance.style);
            }
            if (character.clothing && character.clothing.length > 0) {
                parts.push(`wearing ${character.clothing.join(", ")}`);
            }
            if (character.pose) {
                parts.push(character.pose);
            }
            if (character.expression) {
                parts.push(character.expression);
            }
            return parts.join(" ");
        })
            .join(", ");
    }
    buildCameraPrompt(camera) {
        const parts = [];
        parts.push(`${camera.shotType} shot`);
        parts.push(`${camera.angle} angle`);
        if (camera.movement && camera.movement !== "static") {
            parts.push(`${camera.movement} camera`);
        }
        parts.push(`focused on ${camera.focus}`);
        return parts.join(" ");
    }
    buildLightingPrompt(lighting) {
        const parts = [];
        parts.push(`${lighting.setup} lighting`);
        parts.push(lighting.mood);
        if (lighting.intensity) {
            parts.push(`${Math.round(lighting.intensity * 100)}% intensity`);
        }
        if (lighting.colorTemperature) {
            const temp = lighting.colorTemperature;
            if (temp < 3000) {
                parts.push("warm light");
            }
            else if (temp > 6000) {
                parts.push("cool light");
            }
            else {
                parts.push("neutral light");
            }
        }
        parts.push(`${lighting.shadows} shadows`);
        return parts.join(" ");
    }
    buildStylePrompt(metadata) {
        const parts = [];
        parts.push(metadata.style);
        if (metadata.genre) {
            parts.push(metadata.genre);
        }
        if (metadata.theme) {
            parts.push(metadata.theme);
        }
        if (metadata.period) {
            parts.push(metadata.period);
        }
        if (metadata.culturalContext) {
            parts.push(metadata.culturalContext);
        }
        return parts.join(" ");
    }
}
//# sourceMappingURL=scene-builder.js.map