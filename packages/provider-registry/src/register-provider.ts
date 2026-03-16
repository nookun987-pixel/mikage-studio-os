/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * register-provider.ts
 */

import type { GenerationProvider, ProviderRegistry } from "./contracts.js"
import type { ProviderId } from "./types.js"

export function registerProvider(
  registry: ProviderRegistry,
  provider: GenerationProvider
): void {
  registry.registerProvider(provider)
}

export function getProvider(
  registry: ProviderRegistry,
  providerId: ProviderId
): GenerationProvider | undefined {
  return registry.getProvider(providerId)
}

export function listProviders(registry: ProviderRegistry): GenerationProvider[] {
  return registry.listProviders()
}
