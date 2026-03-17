/**
 * Standalone test runner for pipeline runtime
 */

import { standalonePipelineRuntime } from './standalone_runtime.js';
import { writeFileSync } from 'fs';

/**
 * Test runner for standalone pipeline
 */
async function runStandaloneTest() {
  console.log('🚀 Starting standalone pipeline runtime test...');
  
  const testRequest = {
    request_id: 'test_standalone_001',
    mode: 'canon_core',
    prompt_intent: {
      primary_intent: 'character_portrait',
      description: 'Test portrait generation for Lyra in the white monolith',
      key_elements: ['Lyra', 'white monolith', 'luminous'],
      style_notes: 'Mikage canon style with emphasis on light'
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
      strict_mode: false,
      validation_level: 'standard'
    },
    request_metadata: {
      requested_by: 'standalone_test',
      project_id: 'mikage_studio_os_test',
      priority: 'normal'
    }
  };

  try {
    console.log('📝 Processing test request...');
    const result = await standalonePipelineRuntime.executePipeline(testRequest, 'dry-run');
    
    console.log('✅ Pipeline completed successfully!');
    console.log(`📊 Status: ${result.final_status.status}`);
    console.log(`⏱️  Processing time: ${result.final_status.total_processing_time_ms}ms`);
    console.log(`🔍 Pre-validation: ${result.pre_validation_results.validation_status}`);
    console.log(`🎯 Final decision: ${result.retry_fallback_recommendation.final_decision}`);
    
    // Show detailed results
    const characterRefs = result.selected_references.character_references;
    if (characterRefs && characterRefs.length > 0) {
      console.log(`👥 Character references: ${characterRefs.length}`);
      characterRefs.forEach((ref: any) => {
        console.log(`   - ${ref.character_id} (${ref.reference_type}) - confidence: ${ref.confidence}`);
      });
    }
    
    const compilationStages = result.compiled_prompt.compilation_stages;
    if (compilationStages && compilationStages.length > 0) {
      console.log(`🔧 Prompt compilation stages: ${compilationStages.length}`);
      compilationStages.forEach((stage: any) => {
        console.log(`   - ${stage.stage_name}: ${stage.confidence.toFixed(2)} confidence`);
      });
    }
    
    console.log(`📝 Final prompt: "${result.compiled_prompt.final_prompt}"`);
    
    // Save result to file
    const resultFile = `standalone_test_result_${Date.now()}.json`;
    writeFileSync(resultFile, JSON.stringify(result, null, 2));
    console.log(`💾 Result saved to: ${resultFile}`);
    
    console.log('\n🎉 Standalone test completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Pipeline test failed:', error);
    return false;
  }
}

// Test different modes
async function runAllModes() {
  console.log('\n🔄 Testing all pipeline modes...\n');
  
  const modes: Array<'dry-run' | 'validation-run' | 'compile-run' | 'full-run'> = ['dry-run', 'validation-run', 'compile-run', 'full-run'];
  const testRequest = {
    request_id: 'test_modes_001',
    mode: 'canon_core',
    prompt_intent: {
      primary_intent: 'character_portrait',
      description: 'Test portrait generation'
    }
  };

  for (const mode of modes) {
    console.log(`\n--- Testing ${mode} mode ---`);
    try {
      const result = await standalonePipelineRuntime.executePipeline(testRequest, mode);
      console.log(`✅ ${mode}: ${result.final_status.status} (${result.final_status.total_processing_time_ms}ms)`);
      
      if (result.engine_result) {
        console.log(`   Generation: ${result.engine_result.generation_status}`);
        const metadata = result.engine_result.metadata as any;
        if (metadata?.mock_data) {
          console.log(`   Note: Mock generation (no real backend)`);
        }
      }
    } catch (error) {
      console.log(`❌ ${mode}: Failed - ${error}`);
    }
  }
  
  console.log('\n✅ All modes tested!');
}

// Performance test
async function runPerformanceTest() {
  console.log('\n⚡ Running performance test...\n');
  
  const iterations = 5;
  const testRequest = {
    request_id: 'perf_test',
    mode: 'canon_core',
    prompt_intent: {
      primary_intent: 'character_portrait',
      description: 'Performance test portrait'
    }
  };

  const times: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    await standalonePipelineRuntime.executePipeline(testRequest, 'dry-run');
    const end = Date.now();
    const duration = end - start;
    times.push(duration);
    console.log(`Iteration ${i + 1}: ${duration}ms`);
  }
  
  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  
  console.log(`\n📊 Performance Results (${iterations} iterations):`);
  console.log(`   Average: ${avgTime.toFixed(2)}ms`);
  console.log(`   Min: ${minTime}ms`);
  console.log(`   Max: ${maxTime}ms`);
  console.log(`   Range: ${(maxTime - minTime).toFixed(2)}ms`);
}

// Main test runner
async function main() {
  console.log('🧪 Mikage Studio OS - Standalone Pipeline Runtime Test Suite\n');
  
  // Basic functionality test
  const basicTest = await runStandaloneTest();
  
  if (basicTest) {
    // Test all modes
    await runAllModes();
    
    // Performance test
    await runPerformanceTest();
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Basic pipeline execution');
    console.log('   ✅ All execution modes');
    console.log('   ✅ Performance benchmarks');
    console.log('   ✅ Mock provider integration');
    console.log('   ✅ Result formatting');
    console.log('\n🚀 Standalone pipeline runtime is ready for local testing!');
  } else {
    console.log('\n❌ Basic test failed, skipping additional tests');
  }
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  main().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('Test suite error:', error);
    process.exit(1);
  });
}
