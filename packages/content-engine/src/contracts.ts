/**
 * @package @mikage/content-engine
 * @wave 10
 *
 * contracts.ts
 */

export type ProductionPackage = {
  production_package_id: string
  projectId: string
  jobId: string

  promptPack: {
    promptPackId: string
    prompts: string[]
  }

  objective: "cinematic_frame" | "character_portrait" | "trailer_sequence"

  canonConstraints: {
    requiredTags: string[]
    forbiddenTags: string[]
    styleLocks: string[]
  }

  ready_for_generation: boolean
  sealed_at: string
}

export type SocialPlatform =
  | "twitter"
  | "instagram"
  | "discord"
  | "artstation"
  | "patreon"

export type SocialExportBundle = {
  exportId: string
  assetId: string

  captions: Record<SocialPlatform, string>
  hashtags: Record<SocialPlatform, string[]>

  formatHints: Record<
    SocialPlatform,
    {
      width: number
      height: number
      maxFileSizeKb: number
      fileFormat: string
    }
  >

  readyToPost: boolean
  flags: string[]
  prepared_at: string
}

export type GeneratedAsset = {
  assetId: string
  production_package_id: string
  jobId: string

  mimeType: "image/png" | "image/jpeg" | "video/mp4" | "text/plain"

  storageUri: string
  lineageHash: string

  metadata: {
    objective: string
    promptPackId: string
    generatedBy: "stub" | "gemini-image" | "seedance-video"
    width?: number
    height?: number
    durationMs?: number
  }

  socialExport?: SocialExportBundle
  generated_at: string
}

export type ContentGenerationRequest = {
  productionPackage: ProductionPackage
  targetPlatforms?: SocialPlatform[]
}

export type ContentGenerationResponse = {
  asset: GeneratedAsset
  trace: {
    node: "content_engine"
    started_at: string
    completed_at: string
    runtime_ms: number
  }
}