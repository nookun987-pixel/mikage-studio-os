/**
 * @package @mikage/generation-orchestrator
 * @wave Local Runner
 *
 * local_runner.ts
 */

import { pipelineRuntime } from './pipeline_runtime.js';
import type { PipelineRequest, PipelineResult } from './types.js';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Local runner for pipeline execution
 */
export class LocalRunner {
  /**
   * Run pipeline from command line
   */
  static async runFromArgs(args: string[]): Promise<void> {
    const mode = args[0] as 'dry-run' | 'validation-run' | 'compile-run' | 'full-run' || 'dry-run';
    const inputFile = args[1];
    const outputFile = args[2] || `result_${Date.now()}.json`;

    if (!inputFile) {
      console.error('Usage: local-runner <mode> <input-file> [output-file]');
      console.error('Modes: dry-run, validation-run, compile-run, full-run');
      process.exit(1);
    }

    try {
      const result = await this.runPipeline(mode, inputFile);
      writeFileSync(outputFile, JSON.stringify(result, null, 2));
      console.log(`Pipeline completed successfully. Result saved to: ${outputFile}`);
      console.log(`Status: ${result.final_status.status}`);
      console.log(`Success: ${result.final_status.success}`);
      console.log(`Processing time: ${result.final_status.total_processing_time_ms}ms`);
    } catch (error) {
      console.error('Pipeline execution failed:', error);
      process.exit(1);
    }
  }

  /**
   * Run pipeline with request file
   */
  static async runPipeline(mode: 'dry-run' | 'validation-run' | 'compile-run' | 'full-run', inputFile: string): Promise<PipelineResult> {
    // Load and parse request
    const request = this.loadRequest(inputFile);
    
    // Validate request
    this.validateRequest(request);
    
    // Execute pipeline
    console.log(`Starting pipeline execution in ${mode} mode...`);
    const startTime = Date.now();
    
    const result = await pipelineRuntime.executePipeline(request, mode);
    
    const endTime = Date.now();
    console.log(`Pipeline completed in ${endTime - startTime}ms`);
    
    return result;
  }

  /**
   * Load request from file
   */
  private static loadRequest(inputFile: string): PipelineRequest {
    try {
      const content = readFileSync(inputFile, 'utf-8');
      return JSON.parse(content) as PipelineRequest;
    } catch (error) {
      throw new Error(`Failed to load request from ${inputFile}: ${error}`);
    }
  }

  /**
   * Validate request structure
   */
  private static validateRequest(request: any): void {
    if (!request.request_id) {
      throw new Error('Missing required field: request_id');
    }
    
    if (!request.mode) {
      throw new Error('Missing required field: mode');
    }
    
    if (!request.prompt_intent) {
      throw new Error('Missing required field: prompt_intent');
    }
    
    if (!request.prompt_intent.primary_intent) {
      throw new Error('Missing required field: prompt_intent.primary_intent');
    }
    
    if (!request.prompt_intent.description) {
      throw new Error('Missing required field: prompt_intent.description');
    }
  }

  /**
   * Create sample request files
   */
  static createSampleRequests(): void {
    const samples = [
      {
        filename: 'sample_character_request.json',
        request: {
          request_id: 'req_character_portrait_001',
          mode: 'canon_core',
          prompt_intent: {
            primary_intent: 'character_portrait',
            description: 'Generate a portrait of Lyra in the white monolith, showing her luminous qualities and imperial majesty',
            key_elements: ['Lyra', 'white monolith', 'luminous', 'imperial'],
            style_notes: 'Mikage canon style with emphasis on light and majesty'
          },
          references: {
            character_references: [
              {
                character_id: 'lyra_0',
                reference_type: 'appearance',
                confidence: 0.95
              }
            ],
            environment_references: [
              {
                environment_id: 'white_monolith_core',
                domain: 'white_monolith',
                time_period: 'current_canon'
              }
            ],
            style_references: [
              {
                style_id: 'mikage_luminous_palette',
                style_category: 'mikage_palette',
                weight: 0.8
              }
            ]
          },
          asset_hints: {
            resolution: {
              width: 1024,
              height: 1024,
              aspect_ratio: '1:1'
            },
            quality_level: 'high',
            generation_parameters: {
              sampler: 'DPM++ 2M Karras',
              steps: 30,
              cfg_scale: 7.0
            }
          },
          validation_options: {
            strict_mode: true,
            validation_level: 'comprehensive',
            forbidden_elements: ['neo_tokyo_clutter', 'rust', 'messy_cables'],
            required_elements: ['mikage_palette_lock']
          },
          output_expectations: {
            output_format: 'image/png',
            metadata_requirements: ['generation_parameters', 'validation_report'],
            delivery_options: {
              include_references: true,
              include_validation_report: true,
              include_generation_log: false
            }
          },
          request_metadata: {
            requested_by: 'local_runner',
            project_id: 'mikage_studio_os_demo',
            session_id: 'session_001',
            priority: 'normal',
            tags: ['character', 'portrait', 'lyra']
          }
        }
      },
      {
        filename: 'sample_environment_request.json',
        request: {
          request_id: 'req_environment_scene_001',
          mode: 'cinematic_drama',
          prompt_intent: {
            primary_intent: 'environment_scene',
            description: 'Generate a cinematic view of the white monolith interior, showing imperial architecture and clean lines',
            key_elements: ['white monolith', 'interior', 'imperial architecture', 'clean lines'],
            style_notes: 'Cinematic composition with dramatic lighting'
          },
          references: {
            environment_references: [
              {
                environment_id: 'white_monolith_throne_room',
                domain: 'white_monolith',
                time_period: 'current_canon'
              }
            ],
            style_references: [
              {
                style_id: 'cinematic_composition_rules',
                style_category: 'composition',
                weight: 0.9
              }
            ]
          },
          asset_hints: {
            resolution: {
              width: 1920,
              height: 1080,
              aspect_ratio: '16:9'
            },
            quality_level: 'ultra',
            generation_parameters: {
              sampler: 'DPM++ 2M Karras',
              steps: 50,
              cfg_scale: 8.0
            }
          },
          validation_options: {
            strict_mode: true,
            validation_level: 'comprehensive'
          },
          request_metadata: {
            requested_by: 'local_runner',
            project_id: 'mikage_studio_os_demo',
            priority: 'high'
          }
        }
      },
      {
        filename: 'sample_reference_request.json',
        request: {
          request_id: 'req_reference_sheet_001',
          mode: 'reference_sheet',
          prompt_intent: {
            primary_intent: 'reference_sheet',
            description: 'Generate a reference sheet showing Lyra\'s character design from multiple angles',
            key_elements: ['Lyra', 'character design', 'multiple angles', 'reference sheet'],
            style_notes: 'Clean reference sheet style with consistent character representation'
          },
          references: {
            character_references: [
              {
                character_id: 'lyra_0',
                reference_type: 'appearance',
                confidence: 0.95
              },
              {
                character_id: 'lyra_0',
                reference_type: 'personality',
                confidence: 0.9
              }
            ]
          },
          asset_hints: {
            resolution: {
              width: 2048,
              height: 1536,
              aspect_ratio: '4:3'
            },
            quality_level: 'high'
          },
          validation_options: {
            strict_mode: false,
            validation_level: 'standard'
          },
          request_metadata: {
            requested_by: 'local_runner',
            project_id: 'mikage_studio_os_demo'
          }
        }
      }
    ];

    samples.forEach(({ filename, request }) => {
      const filepath = resolve(process.cwd(), filename);
      writeFileSync(filepath, JSON.stringify(request, null, 2));
      console.log(`Created sample request: ${filename}`);
    });
  }

  /**
   * Run demonstration
   */
  static async runDemo(): Promise<void> {
    console.log('Creating sample request files...');
    this.createSampleRequests();
    
    console.log('\nRunning demo pipeline executions...\n');
    
    // Test each mode with sample requests
    const modes: Array<'dry-run' | 'validation-run' | 'compile-run'> = ['dry-run', 'validation-run', 'compile-run'];
    const sampleFiles = ['sample_character_request.json', 'sample_environment_request.json'];
    
    for (const mode of modes) {
      console.log(`\n=== Testing ${mode} mode ===`);
      
      for (const sampleFile of sampleFiles) {
        try {
          console.log(`\nProcessing ${sampleFile} in ${mode} mode...`);
          const result = await this.runPipeline(mode, sampleFile);
          
          console.log(`✅ Success: ${result.final_status.status}`);
          console.log(`   Processing time: ${result.final_status.total_processing_time_ms}ms`);
          console.log(`   Pre-validation: ${result.pre_validation_results.validation_status}`);
          console.log(`   Final decision: ${result.retry_fallback_recommendation.final_decision}`);
          
        } catch (error) {
          console.log(`❌ Failed: ${error}`);
        }
      }
    }
    
    console.log('\n=== Demo completed ===');
    console.log('Check the generated result files for detailed output.');
  }
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  LocalRunner.runFromArgs(process.argv.slice(2)).catch(console.error);
}
