/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * contracts.ts
 */

import type { 
  ProviderId, 
  ProviderCapabilities,
  GenerationRequest,
  GenerationResponse,
  TextGenerationRequest,
  ImageGenerationRequest,
  VideoGenerationRequest
} from "./types.js"

export interface GenerationProvider {
  readonly id: ProviderId
  readonly name: string
  readonly capabilities: ProviderCapabilities
  
  generateText(request: TextGenerationRequest): Promise<GenerationResponse>
  generateImage(request: ImageGenerationRequest): Promise<GenerationResponse>
  generateAsset(request: GenerationRequest): Promise<GenerationResponse>
}

export interface ProviderRegistry {
  registerProvider(provider: GenerationProvider): void
  getProvider(providerId: ProviderId): GenerationProvider | undefined
  listProviders(): GenerationProvider[]
}

export interface ProviderRegistration {
  provider: GenerationProvider
  registeredAt: string
}
