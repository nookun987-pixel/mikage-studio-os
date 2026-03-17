export * from "./contracts.js";
export * from "./generator.js";
export * from "./social-export.js";
export * from "./content_engine_adapter.js";
export * from "./types.js";
export * from "./pre_generation_hook.js";
export * from "./post_generation_hook.js";
import type { ContentGenerationRequest, ContentGenerationResponse } from "./contracts.js";
import type { GenerationRequest as AdapterGenerationRequest, ContentEngineResult } from "./types.js";
import type { ProviderRegistry } from "@mikage/provider-registry";
import type { ILineageService } from "@mikage/asset-lineage";
import type { EvaluationEngine } from "@mikage/generation-evaluator";
import type { AssetRegistry } from "@mikage/asset-registry";
import type { SceneBuilder, SceneContext } from "@mikage/scene-graph";
export declare function runContentEngine(req: ContentGenerationRequest, providerRegistry: ProviderRegistry, lineageService: ILineageService, evaluationEngine: EvaluationEngine, assetRegistry: AssetRegistry, sceneBuilder?: SceneBuilder, sceneContext?: SceneContext): Promise<ContentGenerationResponse>;
/**
 * Enhanced content engine with adapter integration
 * Connects to canon validator and provides comprehensive validation/routing
 */
export declare function runEnhancedContentEngine(request: AdapterGenerationRequest): Promise<ContentEngineResult>;
/**
 * Convert legacy ContentGenerationRequest to adapter format
 */
export declare function convertToAdapterRequest(legacyRequest: ContentGenerationRequest, options?: {
    currentAttempt?: number;
    maxRetries?: number;
    validationMode?: 'strict' | 'lenient';
    fallbackEnabled?: boolean;
}): AdapterGenerationRequest;
/**
 * Run content engine with automatic adapter conversion
 */
export declare function runContentEngineWithAdapter(legacyRequest: ContentGenerationRequest, adapterOptions?: {
    currentAttempt?: number;
    maxRetries?: number;
    validationMode?: 'strict' | 'lenient';
    fallbackEnabled?: boolean;
}): Promise<ContentEngineResult>;
//# sourceMappingURL=index.d.ts.map