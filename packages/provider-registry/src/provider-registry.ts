/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * provider-registry.ts
 */

import type { 
  GenerationProvider, 
  ProviderRegistry, 
  ProviderRegistration 
} from "./contracts.js"
import type { ProviderId } from "./types.js"

export class DefaultProviderRegistry implements ProviderRegistry {
  private readonly providers = new Map<ProviderId, ProviderRegistration>()

  registerProvider(provider: GenerationProvider): void {
    if (this.providers.has(provider.id)) {
      throw new Error(`Provider with id '${provider.id}' is already registered`)
    }

    this.providers.set(provider.id, {
      provider,
      registeredAt: new Date().toISOString()
    })
  }

  getProvider(providerId: ProviderId): GenerationProvider | undefined {
    const registration = this.providers.get(providerId)
    return registration?.provider
  }

  listProviders(): GenerationProvider[] {
    return Array.from(this.providers.values()).map(reg => reg.provider)
  }
}
