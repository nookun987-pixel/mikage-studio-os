import { DefaultProviderRegistry } from '@mikage/provider-registry';
import { MockImageProvider } from '@mikage/providers';

export const serviceName = 'generation-service';

const providerRegistry = new DefaultProviderRegistry();
const mockImageProvider = new MockImageProvider();

// Register the mock provider
providerRegistry.registerProvider(mockImageProvider);

export const bootstrap = () => {
  const providers = providerRegistry.listProviders();
  return `${serviceName} ready with ${providers.length} provider(s) registered: ${providers.map(p => p.name).join(', ')}`;
};

export const getProviderRegistry = () => providerRegistry;
export const getImageProvider = () => providerRegistry.getProvider('mock_image_provider');
