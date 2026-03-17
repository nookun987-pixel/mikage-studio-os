/**
 * @package @mikage/scene-graph
 * @wave 15
 *
 * scene-builder.ts
 */
import type { Scene, SceneContext, SceneAssetBinding } from "./contracts.js";
export declare class DefaultSceneBuilder {
    buildSceneContext(scene: Scene, cameraId?: string): SceneContext;
    extractSceneAssets(scene: Scene): SceneAssetBinding[];
    generateScenePrompt(context: SceneContext): string;
    extractGenerationParameters(context: SceneContext): Record<string, unknown>;
    private getVisibleCharacters;
    private buildGenerationHints;
    private buildEnvironmentPrompt;
    private buildCharacterPrompt;
    private buildCameraPrompt;
    private buildLightingPrompt;
    private buildStylePrompt;
}
//# sourceMappingURL=scene-builder.d.ts.map