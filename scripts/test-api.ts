/**
 * Test script for orchestration service API
 */

const apiTestRequest = {
  commandType: 'execute_generation_pipeline',
  request: {
    requestCode: 'api_test_001',
    projectSlug: 'mikage',
    characterCode: 'char_mikage',
    anchorCode: 'anchor_leia_041',
    presetCode: 'mikage_cinematic_portrait',
    variantCode: 'storm_rooftop_action',
    sceneCode: 'scene_rooftop_confrontation',
    shotCode: 'shot_low_angle_heroic_damaged_stillness',
    providerCode: 'mock_image_provider',
    outputCount: 2,
    contextPackets: [
      {
        packetKind: 'world_context',
        packetCode: 'ctx_world_api_001'
      }
    ],
    canonQueryMode: 'blocking',
    sceneBuilderMode: 'scene_seeded',
    scriptBuilderMode: 'outline_only',
    productionPackageMode: 'benchmark_audit_shell',
    benchmarkAudit: {
      benchmarkSetCodes: ['gold_visual_dna'],
      auditProfileCode: 'audit_default',
      requireLineageAudit: true,
      requireBenchmarkPass: false,
      tags: ['api_test']
    },
    metadata: {
      initiatedBy: 'api_test'
    }
  },
  compileProfile: {
    compileMode: 'production_prompt',
    systemFrame: 'You are a cinematic visual generation system.',
    canonConstraints: ['Maintain Japanese aesthetic integrity'],
    contextSummaries: ['API test execution'],
    fragmentSummaries: ['Test scenario'],
    modeInstructions: ['Generate test image'],
    outputInstructions: ['High detail output'],
    negativeClauses: ['no inappropriate content']
  },
  validationProfile: {
    ontologyRequiredTerms: ['mikage'],
    ontologyProhibitedTerms: [],
    ontologyAdvisoryTerms: ['japanese'],
    invariantRequiredTerms: [],
    invariantProhibitedTerms: [],
    invariantAdvisoryTerms: ['canon'],
    philosophicalRequiredTerms: [],
    philosophicalProhibitedTerms: [],
    philosophicalAdvisoryTerms: ['honor'],
    characterRequiredTerms: [],
    characterProhibitedTerms: [],
    characterAdvisoryTerms: ['leia'],
    visualRequiredTerms: [],
    visualProhibitedTerms: [],
    visualAdvisoryTerms: ['portrait'],
    driftRiskTerms: [],
    driftHardBlockTerms: []
  },
  benchmarkProfile: {
    goldReferenceTerms: ['mikage'],
    silverReferenceTerms: ['cinematic'],
    redBlockedTerms: []
  },
  studioProfile: {
    actionType: 'queue_generation',
    panelCode: 'production_queue',
    panelTitle: 'Production Queue',
    viewCode: 'studio_queue_view',
    filterCode: 'api_tests',
    filterTerms: ['api', 'test']
  }
};

console.log('🧪 Orchestration Service API Test');
console.log('=====================================');
console.log('');
console.log('📋 Test Request Preview:');
console.log('- Request Code:', apiTestRequest.request.requestCode);
console.log('- Preset/Variant:', `${apiTestRequest.request.presetCode}/${apiTestRequest.request.variantCode}`);
console.log('- Provider:', apiTestRequest.request.providerCode);
console.log('- Output Count:', apiTestRequest.request.outputCount);
console.log('');
console.log('🚀 To test the API:');
console.log('1. Start the server: pnpm --filter @mikage/orchestration-service dev');
console.log('2. Test health: curl http://localhost:3000/health');
console.log('3. Test pipeline: curl -X POST http://localhost:3000/api/v1/execute \\');
console.log('   -H "Content-Type: application/json" \\');
console.log('   -d \'' + JSON.stringify(apiTestRequest, null, 2) + '\'');
console.log('');
console.log('📊 Expected Response Format:');
console.log('{');
console.log('  "success": true,');
console.log('  "status": "completed",');
console.log('  "requestCode": "api_test_001",');
console.log('  "packageCode": "pkg_...",');
console.log('  "validationDecision": "accepted",');
console.log('  "benchmarkDecision": "approved",');
console.log('  "studioAction": "queue_generation",');
console.log('  "executionSteps": [');
console.log('    {');
console.log('      "step": "layer3_request_boundary",');
console.log('      "status": "completed",');
console.log('      "detail": "Accepted orchestration request..."');
console.log('    },');
console.log('    {');
console.log('      "step": "layer4_prompt_compile",');
console.log('      "status": "completed",');
console.log('      "detail": "Compiled prompt for..."');
console.log('    }');
console.log('    ...');
console.log('  ],');
console.log('  "timestamp": "2025-..."');
console.log('}');
