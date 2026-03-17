/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * register-provider.ts
 */
import type { GenerationProvider, ProviderRegistry } from "./contracts.js";
import type { ProviderId } from "./types.js";
export declare function registerProvider(registry: ProviderRegistry, provider: GenerationProvider): void;
export declare function getProvider(registry: ProviderRegistry, providerId: ProviderId): GenerationProvider | undefined;
export declare function listProviders(registry: ProviderRegistry): GenerationProvider[];
//# sourceMappingURL=register-provider.d.ts.map