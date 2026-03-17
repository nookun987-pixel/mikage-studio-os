/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * provider-registry.ts
 */
export class DefaultProviderRegistry {
    providers = new Map();
    registerProvider(provider) {
        if (this.providers.has(provider.id)) {
            throw new Error(`Provider with id '${provider.id}' is already registered`);
        }
        this.providers.set(provider.id, {
            provider,
            registeredAt: new Date().toISOString()
        });
    }
    getProvider(providerId) {
        const registration = this.providers.get(providerId);
        return registration?.provider;
    }
    listProviders() {
        return Array.from(this.providers.values()).map(reg => reg.provider);
    }
}
//# sourceMappingURL=provider-registry.js.map