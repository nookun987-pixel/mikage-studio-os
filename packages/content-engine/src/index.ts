export * from "./contracts.js";
export * from "./generator.js";
export * from "./social-export.js";

import { generateAsset } from "./generator.js";
import { buildSocialExport } from "./social-export.js";
import type {
  ContentGenerationRequest,
  ContentGenerationResponse
} from "./contracts.js";

export async function runContentEngine(
  req: ContentGenerationRequest
): Promise<ContentGenerationResponse> {

  const started = Date.now();

  const asset = await generateAsset(req.productionPackage);

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