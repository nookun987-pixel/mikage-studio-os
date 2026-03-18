/**
 * @package @mikage/providers
 * @wave 11
 *
 * mock-image-provider.ts
 * 
 * A realistic mock image generation provider that simulates
 * actual image generation with proper timing and metadata.
 */

import type { 
  GenerationProvider,
  ProviderCapabilities
} from '@mikage/provider-registry';
import type { 
  ProviderId,
  TextGenerationRequest,
  ImageGenerationRequest,
  GenerationRequest,
  GenerationResponse
} from '@mikage/provider-registry';

export class MockImageProvider implements GenerationProvider {
  readonly id: ProviderId = 'mock_image_provider';
  readonly name = 'Mock Image Generation Provider';
  readonly capabilities: ProviderCapabilities = {
    textGeneration: false,
    imageGeneration: true,
    videoGeneration: false,
    assetGeneration: true
  };

  async generateText(request: TextGenerationRequest): Promise<GenerationResponse> {
    throw new Error('Text generation not supported by MockImageProvider');
  }

  async generateImage(request: ImageGenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now();
    
    // Simulate processing time based on image size
    const processingTime = this.calculateProcessingTime(request);
    await this.delay(processingTime);

    // Generate mock image data (base64 encoded 1x1 pixel PNG)
    const mockImageData = this.generateMockImage(request);
    
    const completedAt = Date.now();
    
    return {
      content: mockImageData,
      metadata: {
        width: request.width || 512,
        height: request.height || 512,
        format: request.format || 'png',
        prompt: request.prompt,
        processing_time_ms: processingTime,
        model: 'mock-image-v1',
        seed: this.generateSeed(request)
      },
      trace: {
        provider: this.id,
        started_at: new Date(startTime).toISOString(),
        completed_at: new Date(completedAt).toISOString(),
        runtime_ms: completedAt - startTime
      }
    };
  }

  async generateAsset(request: GenerationRequest): Promise<GenerationResponse> {
    // Default to image generation for assets
    return this.generateImage({
      ...request,
      type: 'image',
      width: 512,
      height: 512,
      format: 'png'
    });
  }

  private calculateProcessingTime(request: ImageGenerationRequest): number {
    const baseTime = 1000; // 1 second base
    const width = request.width || 512;
    const height = request.height || 512;
    const pixelCount = width * height;
    
    // Scale processing time with image size
    const sizeMultiplier = pixelCount / (512 * 512);
    const variance = Math.random() * 500; // 0-500ms variance
    
    return Math.floor(baseTime * sizeMultiplier + variance);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateMockImage(request: ImageGenerationRequest): Uint8Array {
    // Generate a simple 1x1 PNG pixel (minimal but valid image data)
    // This represents a placeholder that would be a real generated image
    const pngHeader = new Uint8Array([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
      0x49, 0x48, 0x44, 0x52, // IHDR
      (request.width || 512) >> 24 & 0xFF, // width (4 bytes, big-endian)
      (request.width || 512) >> 16 & 0xFF,
      (request.width || 512) >> 8 & 0xFF,
      (request.width || 512) & 0xFF,
      (request.height || 512) >> 24 & 0xFF, // height (4 bytes, big-endian)
      (request.height || 512) >> 16 & 0xFF,
      (request.height || 512) >> 8 & 0xFF,
      (request.height || 512) & 0xFF,
      0x08, 0x02, 0x00, 0x00, 0x00, // bit depth, color type, compression, filter, interlace
      0x4B, 0x6D, 0x29, 0xDC, // CRC
      0x00, 0x00, 0x00, 0x0C, // IDAT chunk length
      0x49, 0x44, 0x41, 0x54, // IDAT
      0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // compressed image data
      0x00, 0x00, 0x00, 0x00, // IEND chunk length
      0x49, 0x45, 0x4E, 0x44, // IEND
      0xAE, 0x42, 0x60, 0x82  // CRC
    ]);
    
    return pngHeader;
  }

  private generateSeed(request: ImageGenerationRequest): number {
    // Generate deterministic seed based on prompt
    let hash = 0;
    for (let i = 0; i < request.prompt.length; i++) {
      const char = request.prompt.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}
