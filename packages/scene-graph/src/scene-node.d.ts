/**
 * @package @mikage/scene-graph
 * @wave 15
 *
 * scene-node.ts
 */
import type { SceneNode, Vector3 } from "./contracts.js";
export declare function createSceneNode(params: {
    nodeId: string;
    nodeType: "character" | "environment" | "prop" | "light" | "camera";
    name: string;
    position?: Vector3;
    rotation?: Vector3;
    scale?: Vector3;
    visible?: boolean;
    properties?: Record<string, unknown>;
    children?: SceneNode[];
    parentId?: string;
}): SceneNode;
export declare function createVector3(x: number, y: number, z: number): Vector3;
export declare function addVector3(a: Vector3, b: Vector3): Vector3;
export declare function subtractVector3(a: Vector3, b: Vector3): Vector3;
export declare function multiplyVector3(vector: Vector3, scalar: number): Vector3;
export declare function normalizeVector3(vector: Vector3): Vector3;
export declare function distanceVector3(a: Vector3, b: Vector3): number;
export declare function lookAt(position: Vector3, target: Vector3): Vector3;
export declare function addChildNode(parent: SceneNode, child: SceneNode): SceneNode;
export declare function removeChildNode(parent: SceneNode, childNodeId: string): SceneNode;
export declare function findNodeById(root: SceneNode, nodeId: string): SceneNode | null;
export declare function findNodesByType(root: SceneNode, nodeType: SceneNode["nodeType"]): SceneNode[];
export declare function traverseSceneNode(root: SceneNode, callback: (node: SceneNode) => void): void;
export declare function getWorldTransform(node: SceneNode, parentTransform?: {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
}): {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
};
export declare function validateSceneNode(node: SceneNode): {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=scene-node.d.ts.map