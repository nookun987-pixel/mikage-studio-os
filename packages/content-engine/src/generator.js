import { createHash } from "crypto";
import { AssetLineageGraphImpl, createLineageRecord, createLineageEdge, generateNodeId } from "@mikage/asset-lineage";
import { CanonRegistryValidator } from "@mikage/canon-validator";
const OBJECTIVE_MIME_MAP = {
    cinematic_frame: "image/png",
    character_portrait: "image/png",
    trailer_sequence: "video/mp4"
};
const OBJECTIVE_DIMENSIONS = {
    cinematic_frame: { width: 1920, height: 1080 },
    character_portrait: { width: 1024, height: 1024 },
    trailer_sequence: { width: 1920, height: 1080 }
};
function deriveAssetId(pkg) {
    const seed = [
        pkg.production_package_id,
        pkg.promptPack.promptPackId,
        pkg.objective
    ].join(":");
    const hash = createHash("sha256")
        .update(seed)
        .digest("hex")
        .slice(0, 16);
    return `asset_stub_${hash}`;
}
function deriveStorageUri(assetId, mimeType) {
    const ext = mimeType === "video/mp4" ? "mp4" : "png";
    return `stub://mikage-assets/generated/${assetId}.${ext}`;
}
function deriveLineageHash(pkg, assetId) {
    return createHash("sha256")
        .update(`${pkg.promptPack.promptPackId}:${assetId}`)
        .digest("hex");
}
function assertPackageReady(pkg) {
    if (!pkg.ready_for_generation) {
        throw new Error(`[content-engine] ProductionPackage ${pkg.production_package_id} not ready`);
    }
}
function resolveProviderForObjective(objective, providerRegistry) {
    const providers = providerRegistry.listProviders();
    const preferredProviders = {
        cinematic_frame: ["gemini-image", "dalle-3"],
        character_portrait: ["gemini-image", "dalle-3"],
        trailer_sequence: ["seedance-video", "runway"]
    };
    const preferred = preferredProviders[objective];
    for (const providerId of preferred) {
        const provider = providers.find((p) => p.id === providerId);
        if (provider) {
            return providerId;
        }
    }
    const fallbackProvider = providers.find((p) => objective === "trailer_sequence"
        ? p.capabilities.videoGeneration
        : p.capabilities.imageGeneration);
    if (fallbackProvider) {
        return fallbackProvider.id;
    }
    return "stub";
}
async function generateWithProvider(pkg, provider) {
    const prompt = pkg.promptPack.prompts.join(" ");
    // Canon validation before provider generation
    const canonValidator = new CanonRegistryValidator();
    const validationResult = await canonValidator.validateGenerationRequest({
        prompt: {
            mode: 'canon_core', // Default mode for content engine
            positive_prompt: prompt,
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
        throw new Error(`Canon validation failed: ${validationResult.issues.map(i => i.message).join(', ')}`);
    }
    switch (pkg.objective) {
        case "cinematic_frame":
        case "character_portrait":
            const imageRequest = {
                type: "image",
                prompt,
                width: pkg.objective === "character_portrait" ? 1024 : 1920,
                height: pkg.objective === "character_portrait" ? 1024 : 1080,
                format: "png"
            };
            await provider.generateImage(imageRequest);
            break;
        case "trailer_sequence":
            const videoRequest = {
                type: "video",
                prompt,
                duration: 5000,
                fps: 30,
                format: "mp4"
            };
            await provider.generateAsset(videoRequest);
            break;
    }
}
export async function generateAsset(pkg, providerRegistry, lineageService, evaluationEngine, assetRegistry, sceneBuilder, sceneContext) {
    assertPackageReady(pkg);
    const mimeType = OBJECTIVE_MIME_MAP[pkg.objective];
    const dimensions = OBJECTIVE_DIMENSIONS[pkg.objective];
    const assetId = deriveAssetId(pkg);
    const storageUri = deriveStorageUri(assetId, mimeType);
    const lineageHash = deriveLineageHash(pkg, assetId);
    const now = new Date().toISOString();
    const generatedBy = resolveProviderForObjective(pkg.objective, providerRegistry);
    const basePrompt = pkg.promptPack.prompts.join(" ");
    const finalPrompt = sceneBuilder && sceneContext ? sceneBuilder.generateScenePrompt(sceneContext) : basePrompt;
    const sceneParameters = sceneBuilder && sceneContext ? sceneBuilder.extractGenerationParameters(sceneContext) : {};
    // Create lineage graph and nodes for tracking
    const lineageGraph = new AssetLineageGraphImpl();
    // Create prompt node
    const promptNodeId = generateNodeId("prompt");
    const promptNode = createLineageRecord({
        nodeId: promptNodeId,
        nodeType: "prompt",
        data: {
            text: finalPrompt,
            source: pkg.promptPack.promptPackId
        }
    });
    lineageService.registerNode(promptNode);
    // Create asset node
    const assetNodeId = generateNodeId("asset");
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
    });
    lineageService.registerNode(assetNode);
    // Link prompt to asset
    const promptToAssetEdge = createLineageEdge({
        from: promptNodeId,
        to: assetNodeId,
        relation: "generated_by",
        metadata: {
            timestamp: now,
            seed: `seed_${assetId}`
        }
    });
    lineageService.link(promptToAssetEdge);
    // If scene context exists, link scene to prompt
    if (sceneContext) {
        const sceneNodeId = generateNodeId("scene");
        const sceneNode = createLineageRecord({
            nodeId: sceneNodeId,
            nodeType: "scene",
            data: {
                sceneId: sceneContext.scene.sceneId,
                metadata: sceneContext.scene.metadata
            }
        });
        lineageService.registerNode(sceneNode);
        const sceneToPromptEdge = createLineageEdge({
            from: sceneNodeId,
            to: promptNodeId,
            relation: "used_in_scene",
            metadata: {
                timestamp: now
            }
        });
        lineageService.link(sceneToPromptEdge);
    }
    const evaluationContext = {
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
    };
    const evaluation = await evaluationEngine.evaluateGeneration(evaluationContext);
    const assetMetadata = {
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
    };
    const assetRecord = {
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
    };
    await assetRegistry.registerAsset(assetRecord);
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
    };
}
//# sourceMappingURL=generator.js.map