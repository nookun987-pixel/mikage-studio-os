/**
 * Simple test for pipeline runtime without complex dependencies
 */

import { pipelineRuntime } from './pipeline_runtime.js';

/**
 * Simple test runner
 */
async function runSimpleTest() {
  console.log('🚀 Starting simple pipeline runtime test...');
  
  const testRequest = {
    request_id: 'test_simple_001',
    mode: 'canon_core',
    prompt_intent: {
      primary_intent: 'character_portrait',
      description: 'Test portrait generation for Lyra'
    },
    validation_options: {
      strict_mode: false,
      validation_level: 'standard'
    }
  };

  try {
    console.log('📝 Processing test request...');
    const result = await pipelineRuntime.executePipeline(testRequest, 'dry-run');
    
    console.log('✅ Pipeline completed successfully!');
    console.log(`📊 Status: ${result.final_status.status}`);
    console.log(`⏱️  Processing time: ${result.final_status.total_processing_time_ms}ms`);
    console.log(`🔍 Pre-validation: ${result.pre_validation_results.validation_status}`);
    console.log(`🎯 Final decision: ${result.retry_fallback_recommendation.final_decision}`);
    
    // Show some mock data
    const characterRefs = result.selected_references.character_references;
    if (characterRefs && characterRefs.length > 0) {
      console.log(`👥 Character references: ${characterRefs.length}`);
    }
    
    const compilationStages = result.compiled_prompt.compilation_stages;
    if (compilationStages && compilationStages.length > 0) {
      console.log(`🔧 Prompt compilation stages: ${compilationStages.length}`);
    }
    
    console.log('\n🎉 Simple test completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Pipeline test failed:', error);
    return false;
  }
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  runSimpleTest().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}
