/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * types.ts
 */
export type ProviderId = string;
export type ProviderCapabilities = {
    textGeneration: boolean;
    imageGeneration: boolean;
    videoGeneration: boolean;
    assetGeneration: boolean;
};
export type GenerationRequest = {
    prompt: string;
    options?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
};
export type GenerationResponse = {
    content: string | Uint8Array;
    metadata?: Record<string, unknown>;
    trace?: {
        provider: ProviderId;
        started_at: string;
        completed_at: string;
        runtime_ms: number;
    };
};
export type TextGenerationRequest = GenerationRequest & {
    type: "text";
    maxLength?: number;
    temperature?: number;
};
export type ImageGenerationRequest = GenerationRequest & {
    type: "image";
    width?: number;
    height?: number;
    format?: "png" | "jpeg";
};
export type VideoGenerationRequest = GenerationRequest & {
    type: "video";
    duration?: number;
    fps?: number;
    format?: "mp4";
};
export type AssetGenerationRequest = TextGenerationRequest | ImageGenerationRequest | VideoGenerationRequest;
//# sourceMappingURL=types.d.ts.map