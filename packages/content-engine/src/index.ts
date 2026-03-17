export * from "./contracts.js";
export * from "./generator.js";
export * from "./social-export.js";
export * from "./content_engine_adapter.js";
export * from "./types.js";
export * from "./pre_generation_hook.js";
export * from "./post_generation_hook.js";

import { generateAsset } from "./generator.js";
import { buildSocialExport } from "./social-export.js";
import { contentEngineAdapter } from "./content_engine_adapter.js";
import type {
  ContentGenerationRequest,
  ContentGenerationResponse
} from "./contracts.js";
import type { GenerationRequest as AdapterGenerationRequest, ContentEngineResult } from "./types.js";
import type { ProviderRegistry } from "@mikage/provider-registry";
import type { ILineageService } from "@mikage/asset-lineage";
import type { EvaluationEngine } from "@mikage/generation-evaluator";
import type { AssetRegistry } from "@mikage/asset-registry";
import type { SceneBuilder, SceneContext } from "@mikage/scene-graph";
import { validateAll } from "@mikage/canon-validator";

export async function runContentEngine(
  req: ContentGenerationRequest,
  providerRegistry: ProviderRegistry,
  lineageService: ILineageService,
  evaluationEngine: EvaluationEngine,
  assetRegistry: AssetRegistry,
  sceneBuilder?: SceneBuilder,
  sceneContext?: SceneContext
): Promise<ContentGenerationResponse> {

  // Canon validation before generation
  const validationResult = await validateAll({
    prompt: {
      text: req.productionPackage.promptPack.prompts.join(', '),
      mode: 'canon_core', // Default mode for content engine
      parameters: {
        sampler: 'DPM++ 2M Karras',
        steps: 30,
        cfg: 6.5
      }
    },
    visual_config: {
      authority_level: 4,
      domain: 'mikage_application'
    },
    validations: ['canon_registry_compliance', 'prompt_canon_compliance', 'visual_authority_compliance']
  });

  if (!validationResult.valid) {
    throw new Error(`Canon validation failed: ${validationResult.issues.map((i: any) => i.message).join(', ')}`);
  }

  const started = Date.now();

  const asset = await generateAsset(req.productionPackage, providerRegistry, lineageService, evaluationEngine, assetRegistry, sceneBuilder, sceneContext);

  if (req.targetPlatforms) {
    asset.socialExport = buildSocialExport(asset, req.targetPlatforms);
  }

  return {
    asset,
    trace: {
      node: "content_engine",
      started_at: new Date(started).toISOString(),
      completed_at: new Date().toISOString(),
      runtime_ms: Date.now() - started
    }
  };
}

/**
 * Enhanced content engine with adapter integration
 * Connects to canon validator and provides comprehensive validation/routing
 */
export async function runEnhancedContentEngine(
  request: AdapterGenerationRequest
): Promise<ContentEngineResult> {
  return await contentEngineAdapter.processGenerationRequest(request);
}

/**
 * Convert legacy ContentGenerationRequest to adapter format
 */
export function convertToAdapterRequest(
  legacyRequest: ContentGenerationRequest,
  options: {
    currentAttempt?: number;
    maxRetries?: number;
    validationMode?: 'strict' | 'lenient';
    fallbackEnabled?: boolean;
  } = {}
): AdapterGenerationRequest {
  return {
    requestId: legacyRequest.productionPackage.jobId,
    productionPackage: legacyRequest.productionPackage,
    parameters: {
      sampler: 'DPM++ 2M Karras',
      steps: 30,
      cfg: 6.5,
      seed: Math.floor(Math.random() * 1000000),
      ...options
    },
    requestedAt: new Date().toISOString(),
    currentAttempt: options.currentAttempt || 0,
    maxRetries: options.maxRetries || 3,
    validationMode: options.validationMode || 'lenient',
    fallbackEnabled: options.fallbackEnabled !== false
  };
}

/**
 * Run content engine with automatic adapter conversion
 */
export async function runContentEngineWithAdapter(
  legacyRequest: ContentGenerationRequest,
  adapterOptions: {
    currentAttempt?: number;
    maxRetries?: number;
    validationMode?: 'strict' | 'lenient';
    fallbackEnabled?: boolean;
  } = {}
): Promise<ContentEngineResult> {
  const adapterRequest = convertToAdapterRequest(legacyRequest, adapterOptions);
  return await runEnhancedContentEngine(adapterRequest);
}