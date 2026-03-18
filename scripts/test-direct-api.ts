#!/usr/bin/env tsx

/**
 * Direct API test to check artifact creation
 */

async function testApiArtifactCreation() {
  console.log('🧪 Testing API Artifact Creation');
  console.log('='.repeat(40));

  const testRequest = {
    commandType: 'execute_generation_pipeline',
    request: {
      requestCode: 'direct_api_test_001',
      projectSlug: 'mikage',
      characterCode: 'char_mikage',
      anchorCode: 'anchor_leia_041',
      presetCode: 'mikage_cinematic_portrait',
      variantCode: 'storm_rooftop_action',
      sceneCode: 'scene_rooftop_confrontation',
      shotCode: 'shot_low_angle_heroic_damaged_stillness',
      providerCode: 'mock_image_provider',
      outputCount: 1,
      contextPackets: [
        { packetKind: 'world_context', packetCode: 'ctx_world_direct_001' }
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
        tags: ['direct_test']
      },
      metadata: { initiatedBy: 'direct_api_test' }
    },
    compileProfile: {
      compileMode: 'production_prompt',
      systemFrame: 'Test system frame',
      canonConstraints: ['Test constraint'],
      contextSummaries: ['Test context'],
      fragmentSummaries: ['Test fragment'],
      modeInstructions: ['Test instruction'],
      outputInstructions: ['Test output'],
      negativeClauses: ['Test negative']
    },
    validationProfile: {
      ontologyRequiredTerms: ['mikage'],
      ontologyAdvisoryTerms: ['japanese'],
      invariantAdvisoryTerms: ['canon'],
      philosophicalAdvisoryTerms: ['honor'],
      characterAdvisoryTerms: ['leia'],
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
      filterCode: 'direct_tests',
      filterTerms: ['direct', 'test']
    }
  };

  try {
    console.log('📡 Sending request to API...');
    const response = await fetch('http://localhost:3001/api/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRequest),
    });

    console.log(`📥 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ HTTP Error:', errorBody);
      return;
    }

    const responseData = await response.json();
    console.log('✅ API Response received');
    console.log(`- Success: ${responseData.success}`);
    console.log(`- Request Code: ${responseData.requestCode}`);
    console.log(`- Status: ${responseData.status}`);

    // Wait a moment for artifact creation
    console.log('⏳ Waiting for artifact creation...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if artifact was created
    const fs = require('fs');
    const artifactPath = `runs/${testRequest.request.requestCode}`;
    
    if (fs.existsSync(artifactPath)) {
      console.log('✅ Artifact directory created');
      
      const files = fs.readdirSync(artifactPath);
      console.log('📄 Artifact files:', files);
      
      // Read summary if exists
      const summaryPath = `${artifactPath}/summary.txt`;
      if (fs.existsSync(summaryPath)) {
        const summary = fs.readFileSync(summaryPath, 'utf-8');
        console.log('📋 Summary preview:');
        console.log(summary.split('\n').slice(0, 10).join('\n'));
      }
    } else {
      console.log('❌ Artifact directory not found');
      console.log(`Expected path: ${artifactPath}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testApiArtifactCreation();
