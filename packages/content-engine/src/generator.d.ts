import type { ProductionPackage, GeneratedAsset } from "./contracts.js";
import type { ProviderRegistry } from "@mikage/provider-registry";
import type { ILineageService } from "@mikage/asset-lineage";
import type { EvaluationEngine } from "@mikage/generation-evaluator";
import type { AssetRegistry } from "@mikage/asset-registry";
import type { SceneBuilder, SceneContext } from "@mikage/scene-graph";
export declare function generateAsset(pkg: ProductionPackage, providerRegistry: ProviderRegistry, lineageService: ILineageService, evaluationEngine: EvaluationEngine, assetRegistry: AssetRegistry, sceneBuilder?: SceneBuilder, sceneContext?: SceneContext): Promise<GeneratedAsset>;
//# sourceMappingURL=generator.d.ts.map