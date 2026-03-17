/**
 * @package @mikage/provider-registry
 * @wave 11
 *
 * register-provider.ts
 */
export function registerProvider(registry, provider) {
    registry.registerProvider(provider);
}
export function getProvider(registry, providerId) {
    return registry.getProvider(providerId);
}
export function listProviders(registry) {
    return registry.listProviders();
}
//# sourceMappingURL=register-provider.js.map