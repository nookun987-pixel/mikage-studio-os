/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * provider-registry.ts
 */
import type { GenerationProvider, ProviderRegistry } from "./contracts.js";
import type { ProviderId } from "./types.js";
export declare class DefaultProviderRegistry implements ProviderRegistry {
    private readonly providers;
    registerProvider(provider: GenerationProvider): void;
    getProvider(providerId: ProviderId): GenerationProvider | undefined;
    listProviders(): GenerationProvider[];
}
//# sourceMappingURL=provider-registry.d.ts.map