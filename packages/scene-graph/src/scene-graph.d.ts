/**
 * @package @mikage/scene-graph
 * @wave 15
 *
 * scene-graph.ts
 */
import type { SceneGraph, Scene, SceneFilter, SceneAssetBinding } from "./contracts.js";
export declare class DefaultSceneGraph implements SceneGraph {
    private readonly scenes;
    createScene(sceneData: Omit<Scene, "sceneId" | "createdAt" | "updatedAt">): Promise<Scene>;
    getScene(sceneId: string): Promise<Scene | null>;
    updateScene(sceneId: string, changes: Partial<Scene>): Promise<Scene | null>;
    deleteScene(sceneId: string): Promise<boolean>;
    listScenes(filter?: SceneFilter): Promise<Scene[]>;
    resolveSceneAssets(scene: Scene): Promise<SceneAssetBinding[]>;
    private generateSceneId;
    private applyFilter;
}
export declare function validateScene(scene: Scene): {
    isValid: boolean;
    errors: string[];
};
export declare function cloneScene(scene: Scene, newTitle?: string): Scene;
//# sourceMappingURL=scene-graph.d.ts.map