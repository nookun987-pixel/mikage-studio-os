export * from "./contracts.js";
export * from "./generator.js";
export * from "./social-export.js";

import { generateAsset } from "./generator.js";
import { buildSocialExport } from "./social-export.js";
import type {
  ContentGenerationRequest,
  ContentGenerationResponse
} from "./contracts.js";
import type { ProviderRegistry } from "@mikage/provider-registry";
import type { ILineageService } from "@mikage/asset-lineage";
import type { EvaluationEngine } from "@mikage/generation-evaluator";
import type { AssetRegistry } from "@mikage/asset-registry";
import type { SceneBuilder, SceneContext } from "@mikage/scene-graph";

export async function runContentEngine(
  req: ContentGenerationRequest,
  providerRegistry: ProviderRegistry,
  lineageService: ILineageService,
  evaluationEngine: EvaluationEngine,
  assetRegistry: AssetRegistry,
  sceneBuilder?: SceneBuilder,
  sceneContext?: SceneContext
): Promise<ContentGenerationResponse> {

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