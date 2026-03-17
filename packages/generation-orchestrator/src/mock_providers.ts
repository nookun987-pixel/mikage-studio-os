/**
 * @package @mikage/generation-orchestrator
 * @wave Mock Providers
 *
 * mock_providers.ts
 */

import type { 
  GenerationProvider, 
  AssetRegistryProvider,
  GenerationRequest,
  GenerationResponse,
  CharacterReference,
  EnvironmentReference,
  StyleReference
} from './types.js';

/**
 * Mock generation provider for local testing
 */
export class MockGenerationProvider implements GenerationProvider {
  readonly name = 'mock-generation-provider';
  readonly type = 'mock' as const;
  readonly capabilities = ['image', 'text', 'mock'];

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
      success: true,
      assetId: `mock_asset_${request.requestId}_${Date.now()}`,
      mimeType: 'image/png',
      storageUri: `mock://assets/${request.requestId}/${Date.now()}`,
      metadata: {
        provider: this.name,
        generatedAt: new Date().toISOString(),
        parameters: request.parameters,
        mockData: true
      },
      generationTime: 100,
      provider: this.name
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

/**
 * Mock asset registry provider for local testing
 */
export class MockAssetRegistryProvider implements AssetRegistryProvider {
  readonly name = 'mock-asset-registry';
  readonly type = 'mock' as const;

  async lookupCharacter(id: string): Promise<CharacterReference> {
    // Mock character data based on common Mikage characters
    const mockCharacters: Record<string, CharacterReference> = {
      'lyra_0': {
        id: 'lyra_0',
        name: 'Lyra',
        description: 'Luminous character with imperial majesty',
        appearance: {
          hair: 'luminous white',
          eyes: 'blue',
          style: 'ethereal'
        },
        personality: {
          traits: ['graceful', 'majestic', 'luminous'],
          demeanor: 'calm and authoritative'
        },
        confidence: 0.95,
        provenance: 'canon_character_database'
      },
      'neo_tokyo_character': {
        id: 'neo_tokyo_character',
        name: 'Neo Tokyo Character',
        description: 'Character from Neo Tokyo domain',
        appearance: {
          style: 'cyberpunk',
          aesthetic: 'high-tech'
        },
        personality: {
          traits: ['tech-savvy', 'urban'],
          demeanor: 'energetic'
        },
        confidence: 0.8,
        provenance: 'neo_tokyo_canon'
      }
    };

    return mockCharacters[id] || {
      id,
      name: `Unknown Character ${id}`,
      description: 'Character not found in canon',
      appearance: {},
      personality: {},
      confidence: 0.0,
      provenance: 'mock_fallback'
    };
  }

  async lookupEnvironment(id: string): Promise<EnvironmentReference> {
    // Mock environment data
    const mockEnvironments: Record<string, EnvironmentReference> = {
      'white_monolith_core': {
        id: 'white_monolith_core',
        name: 'White Monolith Core',
        domain: 'white_monolith',
        description: 'Central area of the White Monolith with imperial architecture',
        characteristics: {
          architecture: 'imperial',
          atmosphere: 'serene',
          lighting: 'luminous',
          cleanliness: 'pristine'
        },
        confidence: 0.95,
        provenance: 'canon_environment_database'
      },
      'neo_tokyo_underlevels': {
        id: 'neo_tokyo_underlevels',
        name: 'Neo Tokyo Underlevels',
        domain: 'neo_tokyo',
        description: 'Lower levels of Neo Tokyo with cyberpunk aesthetic',
        characteristics: {
          architecture: 'cyberpunk',
          atmosphere: 'dense',
          lighting: 'neon',
          cleanliness: 'variable'
        },
        confidence: 0.85,
        provenance: 'neo_tokyo_canon'
      }
    };

    return mockEnvironments[id] || {
      id,
      name: `Unknown Environment ${id}`,
      domain: 'unknown',
      description: 'Environment not found in canon',
      characteristics: {},
      confidence: 0.0,
      provenance: 'mock_fallback'
    };
  }

  async lookupStyle(id: string): Promise<StyleReference> {
    // Mock style data
    const mockStyles: Record<string, StyleReference> = {
      'mikage_luminous_palette': {
        id: 'mikage_luminous_palette',
        name: 'Mikage Luminous Palette',
        category: 'mikage_palette',
        description: 'Official Mikage color palette with luminous emphasis',
        rules: {
          primary_colors: ['white', 'light_blue', 'luminous_gold'],
          forbidden_colors: ['rust', 'dark_brown', 'messy_grays'],
          style_requirements: ['clean_lines', 'pristine_surfaces']
        },
        weight: 0.8,
        confidence: 0.95,
        provenance: 'canon_style_database'
      },
      'cinematic_composition_rules': {
        id: 'cinematic_composition_rules',
        name: 'Cinematic Composition Rules',
        category: 'composition',
        description: 'Rules for cinematic composition and framing',
        rules: {
          composition: ['rule_of_thirds', 'dramatic_lighting'],
          framing: ['wide_shot', 'establishing_shot'],
          mood: ['dramatic', 'epic']
        },
        weight: 0.9,
        confidence: 0.85,
        provenance: 'cinematic_style_guide'
      }
    };

    return mockStyles[id] || {
      id,
      name: `Unknown Style ${id}`,
      category: 'unknown',
      description: 'Style not found in canon',
      rules: {},
      weight: 0.5,
      confidence: 0.0,
      provenance: 'mock_fallback'
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

/**
 * Provider factory for creating mock providers
 */
export class MockProviderFactory {
  static createGenerationProvider(): GenerationProvider {
    return new MockGenerationProvider();
  }

  static createAssetRegistryProvider(): AssetRegistryProvider {
    return new MockAssetRegistryProvider();
  }

  static createAllProviders(): {
    generation: GenerationProvider;
    assetRegistry: AssetRegistryProvider;
  } {
    return {
      generation: this.createGenerationProvider(),
      assetRegistry: this.createAssetRegistryProvider()
    };
  }
}
