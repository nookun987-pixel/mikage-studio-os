import { createHash } from "crypto"
import type {
  ProductionPackage,
  GeneratedAsset
} from "./contracts.js"
import type { 
  ProviderRegistry, 
  GenerationProvider,
  TextGenerationRequest,
  ImageGenerationRequest,
  VideoGenerationRequest
} from "@mikage/provider-registry"
import type {
  ILineageService
} from "@mikage/asset-lineage"
import {
  AssetLineageGraphImpl,
  createLineageRecord,
  createLineageEdge,
  generateNodeId
} from "@mikage/asset-lineage"
import type {
  EvaluationEngine,
  EvaluationContext,
  GenerationEvaluation
} from "@mikage/generation-evaluator"
import type {
  AssetRegistry,
  AssetRecord,
  AssetMetadata
} from "@mikage/asset-registry"
import type {
  SceneBuilder,
  SceneContext
} from "@mikage/scene-graph"

const OBJECTIVE_MIME_MAP: Record<
  ProductionPackage["objective"],
  GeneratedAsset["mimeType"]
> = {
  cinematic_frame: "image/png",
  character_portrait: "image/png",
  trailer_sequence: "video/mp4"
}

const OBJECTIVE_DIMENSIONS: Record<
  ProductionPackage["objective"],
  { width: number; height: number }
> = {
  cinematic_frame: { width: 1920, height: 1080 },
  character_portrait: { width: 1024, height: 1024 },
  trailer_sequence: { width: 1920, height: 1080 }
}

function deriveAssetId(pkg: ProductionPackage): string {
  const seed = [
    pkg.production_package_id,
    pkg.promptPack.promptPackId,
    pkg.objective
  ].join(":")

  const hash = createHash("sha256")
    .update(seed)
    .digest("hex")
    .slice(0, 16)

  return `asset_stub_${hash}`
}

function deriveStorageUri(
  assetId: string,
  mimeType: GeneratedAsset["mimeType"]
): string {
  const ext = mimeType === "video/mp4" ? "mp4" : "png"
  return `stub://mikage-assets/generated/${assetId}.${ext}`
}

function deriveLineageHash(
  pkg: ProductionPackage,
  assetId: string
): string {
  return createHash("sha256")
    .update(`${pkg.promptPack.promptPackId}:${assetId}`)
    .digest("hex")
}

function assertPackageReady(pkg: ProductionPackage) {
  if (!pkg.ready_for_generation) {
    throw new Error(
      `[content-engine] ProductionPackage ${pkg.production_package_id} not ready`
    )
  }
}

function resolveProviderForObjective(
  objective: ProductionPackage["objective"],
  providerRegistry: ProviderRegistry
): GeneratedAsset["metadata"]["generatedBy"] {
  const providers = providerRegistry.listProviders()
  
  const preferredProviders = {
    cinematic_frame: ["gemini-image", "dalle-3"],
    character_portrait: ["gemini-image", "dalle-3"], 
    trailer_sequence: ["seedance-video", "runway"]
  }

  const preferred = preferredProviders[objective]
  
  for (const providerId of preferred) {
    const provider = providers.find((p: GenerationProvider) => p.id === providerId)
    if (provider) {
      return providerId as GeneratedAsset["metadata"]["generatedBy"]
    }
  }

  const fallbackProvider = providers.find((p: GenerationProvider) => 
    objective === "trailer_sequence" 
      ? p.capabilities.videoGeneration
      : p.capabilities.imageGeneration
  )

  if (fallbackProvider) {
    return fallbackProvider.id as GeneratedAsset["metadata"]["generatedBy"]
  }

  return "stub"
}

async function generateWithProvider(
  pkg: ProductionPackage,
  provider: GenerationProvider
): Promise<void> {
  const prompt = pkg.promptPack.prompts.join(" ")
  
  switch (pkg.objective) {
    case "cinematic_frame":
    case "character_portrait":
      const imageRequest: ImageGenerationRequest = {
        type: "image",
        prompt,
        width: pkg.objective === "character_portrait" ? 1024 : 1920,
        height: pkg.objective === "character_portrait" ? 1024 : 1080,
        format: "png"
      }
      await provider.generateImage(imageRequest)
      break
      
    case "trailer_sequence":
      const videoRequest: VideoGenerationRequest = {
        type: "video",
        prompt,
        duration: 5000,
        fps: 30,
        format: "mp4"
      }
      await provider.generateAsset(videoRequest)
      break
  }
}

export async function generateAsset(
  pkg: ProductionPackage,
  providerRegistry: ProviderRegistry,
  lineageService: ILineageService,
  evaluationEngine: EvaluationEngine,
  assetRegistry: AssetRegistry,
  sceneBuilder?: SceneBuilder,
  sceneContext?: SceneContext
): Promise<GeneratedAsset> {

  assertPackageReady(pkg)

  const mimeType = OBJECTIVE_MIME_MAP[pkg.objective]
  const dimensions = OBJECTIVE_DIMENSIONS[pkg.objective]

  const assetId = deriveAssetId(pkg)
  const storageUri = deriveStorageUri(assetId, mimeType)
  const lineageHash = deriveLineageHash(pkg, assetId)

  const now = new Date().toISOString()
  const generatedBy = resolveProviderForObjective(pkg.objective, providerRegistry)

  const basePrompt = pkg.promptPack.prompts.join(" ")
  const finalPrompt = sceneBuilder && sceneContext ? sceneBuilder.generateScenePrompt(sceneContext) : basePrompt
  const sceneParameters = sceneBuilder && sceneContext ? sceneBuilder.extractGenerationParameters(sceneContext) : {}

  // Create lineage graph and nodes for tracking
  const lineageGraph = new AssetLineageGraphImpl()
  
  // Create prompt node
  const promptNodeId = generateNodeId("prompt")
  const promptNode = createLineageRecord({
    nodeId: promptNodeId,
    nodeType: "prompt",
    data: {
      text: finalPrompt,
      source: pkg.promptPack.promptPackId
    }
  })
  lineageService.registerNode(promptNode)

  // Create asset node
  const assetNodeId = generateNodeId("asset")
  const assetNode = createLineageRecord({
    nodeId: assetNodeId,
    nodeType: "asset",
    data: {
      assetId,
      assetType: pkg.objective,
      providerId: generatedBy,
      modelId: `${generatedBy}-v1.0`,
      generationParams: {
        width: dimensions.width,
        height: dimensions.height,
        format: mimeType === "video/mp4" ? "mp4" : "png",
        ...sceneParameters
      },
      sourceProductionPackageId: pkg.production_package_id,
      sourceCanonId: pkg.canonConstraints.requiredTags.join("-"),
      sourceSceneId: sceneContext?.scene.sceneId,
      outputMetadata: {
        mimeType,
        width: mimeType !== "video/mp4" ? dimensions.width : undefined,
        height: mimeType !== "video/mp4" ? dimensions.height : undefined,
        durationMs: mimeType === "video/mp4" ? 5000 : undefined,
        format: mimeType === "video/mp4" ? "mp4" : "png"
      }
    }
  })
  lineageService.registerNode(assetNode)

  // Link prompt to asset
  const promptToAssetEdge = createLineageEdge({
    from: promptNodeId,
    to: assetNodeId,
    relation: "generated_by",
    metadata: {
      timestamp: now,
      seed: `seed_${assetId}`
    }
  })
  lineageService.link(promptToAssetEdge)

  // If scene context exists, link scene to prompt
  if (sceneContext) {
    const sceneNodeId = generateNodeId("scene")
    const sceneNode = createLineageRecord({
      nodeId: sceneNodeId,
      nodeType: "scene",
      data: {
        sceneId: sceneContext.scene.sceneId,
        metadata: sceneContext.scene.metadata
      }
    })
    lineageService.registerNode(sceneNode)

    const sceneToPromptEdge = createLineageEdge({
      from: sceneNodeId,
      to: promptNodeId,
      relation: "used_in_scene",
      metadata: {
        timestamp: now
      }
    })
    lineageService.link(sceneToPromptEdge)
  }

  const evaluationContext: EvaluationContext = {
    assetId,
    assetType: pkg.objective,
    providerId: generatedBy,
    modelId: `${generatedBy}-v1.0`,
    prompt: finalPrompt,
    generationParams: {
      width: dimensions.width,
      height: dimensions.height,
      format: mimeType === "video/mp4" ? "mp4" : "png",
      ...sceneParameters
    },
    referenceInputs: [],
    canonConstraints: pkg.canonConstraints,
    objective: pkg.objective
  }

  const evaluation: GenerationEvaluation = await evaluationEngine.evaluateGeneration(evaluationContext)

  const assetMetadata: AssetMetadata = {
    mimeType,
    width: mimeType !== "video/mp4" ? dimensions.width : undefined,
    height: mimeType !== "video/mp4" ? dimensions.height : undefined,
    durationMs: mimeType === "video/mp4" ? 5000 : undefined,
    storageUri,
    format: mimeType === "video/mp4" ? "mp4" : "png",
    evaluation: {
      finalScore: evaluation.finalScore,
      scores: evaluation.scores,
      warnings: evaluation.warnings,
      flags: evaluation.flags,
      evaluatedAt: evaluation.evaluationTimestamp
    },
    tags: [pkg.objective, generatedBy],
    categories: ["generated", pkg.objective]
  }

  const assetRecord: AssetRecord = {
    assetId,
    assetType: pkg.objective,
    providerId: generatedBy,
    modelId: `${generatedBy}-v1.0`,
    sceneId: sceneContext?.scene.sceneId,
    canonId: sceneContext?.scene.metadata.canonId || pkg.canonConstraints.requiredTags[0],
    canonVersion: sceneContext?.scene.metadata.canonVersion,
    canonVersionId: sceneContext?.scene.metadata.canonVersionId,
    lineageId: assetId,
    generationTimestamp: now,
    metadata: assetMetadata
  }

  await assetRegistry.registerAsset(assetRecord)

  return {
    assetId,
    production_package_id: pkg.production_package_id,
    jobId: pkg.jobId,
    mimeType,
    storageUri,
    lineageHash,
    metadata: {
      objective: pkg.objective,
      promptPackId: pkg.promptPack.promptPackId,
      generatedBy,
      width: mimeType !== "video/mp4" ? dimensions.width : undefined,
      height: mimeType !== "video/mp4" ? dimensions.height : undefined,
      durationMs: mimeType === "video/mp4" ? 5000 : undefined,
      evaluation: {
        finalScore: evaluation.finalScore,
        scores: evaluation.scores,
        warnings: evaluation.warnings,
        flags: evaluation.flags,
        evaluatedAt: evaluation.evaluationTimestamp
      }
    },
    generated_at: now
  }
}