import { createHash } from "crypto"
import type {
  ProductionPackage,
  GeneratedAsset
} from "./contracts.js"

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

export function generateAsset(
  pkg: ProductionPackage
): GeneratedAsset {

  assertPackageReady(pkg)

  const mimeType = OBJECTIVE_MIME_MAP[pkg.objective]
  const dimensions = OBJECTIVE_DIMENSIONS[pkg.objective]

  const assetId = deriveAssetId(pkg)
  const storageUri = deriveStorageUri(assetId, mimeType)
  const lineageHash = deriveLineageHash(pkg, assetId)

  const now = new Date().toISOString()

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
      generatedBy: "stub",
      width: mimeType !== "video/mp4" ? dimensions.width : undefined,
      height: mimeType !== "video/mp4" ? dimensions.height : undefined,
      durationMs: mimeType === "video/mp4" ? 5000 : undefined
    },
    generated_at: now
  }
}