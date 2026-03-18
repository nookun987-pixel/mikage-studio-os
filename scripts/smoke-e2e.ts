#!/usr/bin/env tsx

/**
 * End-to-End Smoke Test for Mikage Studio OS API
 * 
 * This script validates the complete pipeline by:
 * 1. Sending a real production-like request to the API
 * 2. Validating response structure and key fields
 * 3. Saving test artifacts
 * 4. Returning clear PASS/FAIL status
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Test configuration
const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINT = '/api/v1/execute';
const LOGS_DIR = 'logs';

// Production-like test request
const smokeTestRequest = {
  commandType: 'execute_generation_pipeline',
  request: {
    requestCode: 'smoke_e2e_001',
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
      {
        packetKind: 'world_context',
        packetCode: 'ctx_world_smoke_001'
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
      tags: ['smoke_test', 'e2e']
    },
    metadata: {
      initiatedBy: 'smoke_e2e_test',
      testRun: new Date().toISOString()
    }
  },
  compileProfile: {
    compileMode: 'production_prompt',
    systemFrame: 'You are a cinematic visual generation system for Mikage Studio OS.',
    canonConstraints: ['Maintain Japanese aesthetic integrity', 'Preserve character visual DNA'],
    contextSummaries: ['E2E smoke test execution for production validation'],
    fragmentSummaries: ['Test scenario: cinematic portrait validation'],
    modeInstructions: ['Generate high-quality cinematic portrait', 'Maintain consistent visual style'],
    outputInstructions: ['High detail output', 'Cinematic lighting', 'Character-focused composition'],
    negativeClauses: ['no inappropriate content', 'no inconsistent character features']
  },
  validationProfile: {
    ontologyRequiredTerms: ['mikage'],
    ontologyProhibitedTerms: [],
    ontologyAdvisoryTerms: ['japanese', 'cinematic'],
    invariantRequiredTerms: [],
    invariantProhibitedTerms: [],
    invariantAdvisoryTerms: ['canon', 'consistency'],
    philosophicalRequiredTerms: [],
    philosophicalProhibitedTerms: [],
    philosophicalAdvisoryTerms: ['honor', 'integrity'],
    characterRequiredTerms: ['leia'],
    characterProhibitedTerms: [],
    characterAdvisoryTerms: ['portrait', 'heroic'],
    visualRequiredTerms: [],
    visualProhibitedTerms: [],
    visualAdvisoryTerms: ['cinematic', 'portrait'],
    driftRiskTerms: [],
    driftHardBlockTerms: []
  },
  benchmarkProfile: {
    goldReferenceTerms: ['mikage', 'cinematic', 'portrait'],
    silverReferenceTerms: ['japanese', 'character'],
    redBlockedTerms: []
  },
  studioProfile: {
    actionType: 'queue_generation',
    panelCode: 'production_queue',
    panelTitle: 'Production Queue',
    viewCode: 'studio_queue_view',
    filterCode: 'smoke_tests',
    filterTerms: ['smoke', 'e2e', 'test']
  }
};

// Validation result interface
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Response validation
function validateResponse(response: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Required top-level fields
  const requiredFields = ['success', 'status', 'requestCode', 'packageCode', 'validationDecision', 'benchmarkDecision', 'studioAction', 'executionSteps', 'timestamp'];
  
  for (const field of requiredFields) {
    if (!(field in response)) {
      result.isValid = false;
      result.errors.push(`Missing required field: ${field}`);
    }
  }

  // Field value validation
  if (response.success !== true) {
    result.isValid = false;
    result.errors.push(`Expected success=true, got success=${response.success}`);
  }

  if (!response.requestCode || typeof response.requestCode !== 'string') {
    result.isValid = false;
    result.errors.push(`Invalid requestCode: expected non-empty string, got ${response.requestCode}`);
  }

  if (response.packageCode !== null && (typeof response.packageCode !== 'string' || response.packageCode.trim() === '')) {
    result.isValid = false;
    result.errors.push(`Invalid packageCode: expected non-empty string or null, got ${response.packageCode}`);
  }

  if (!['accepted', 'rejected'].includes(response.validationDecision)) {
    result.isValid = false;
    result.errors.push(`Invalid validationDecision: expected 'accepted' or 'rejected', got ${response.validationDecision}`);
  }

  // Benchmark decision can be null if validation failed
  if (response.benchmarkDecision !== null && !['approved', 'review', 'rejected'].includes(response.benchmarkDecision)) {
    result.isValid = false;
    result.errors.push(`Invalid benchmarkDecision: expected 'approved', 'review', 'rejected', or null, got ${response.benchmarkDecision}`);
  }

  // Studio action can be null if validation failed
  if (response.studioAction !== null && typeof response.studioAction !== 'string') {
    result.isValid = false;
    result.errors.push(`Invalid studioAction: expected string or null, got ${typeof response.studioAction}`);
  }

  if (!Array.isArray(response.executionSteps)) {
    result.isValid = false;
    result.errors.push(`Invalid executionSteps: expected array, got ${typeof response.executionSteps}`);
  } else if (response.executionSteps.length === 0) {
    result.warnings.push('executionSteps array is empty');
  }

  // Check execution step structure
  response.executionSteps?.forEach((step: any, index: number) => {
    const stepFields = ['step', 'status', 'detail'];
    for (const field of stepFields) {
      if (!(field in step)) {
        result.isValid = false;
        result.errors.push(`executionSteps[${index}] missing field: ${field}`);
      }
    }
  });

  return result;
}

// Save test artifacts
function saveArtifacts(response: any, validationResult: ValidationResult): void {
  // Create logs directory if it doesn't exist
  if (!existsSync(LOGS_DIR)) {
    mkdirSync(LOGS_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // Save JSON response
  const jsonLogFile = join(LOGS_DIR, 'smoke-e2e-latest.json');
  const jsonArtifact = {
    timestamp: new Date().toISOString(),
    testResult: validationResult.isValid ? 'PASS' : 'FAIL',
    request: smokeTestRequest,
    response: response,
    validation: validationResult
  };
  writeFileSync(jsonLogFile, JSON.stringify(jsonArtifact, null, 2));

  // Save readable text log
  const textLogFile = join(LOGS_DIR, 'smoke-e2e-latest.txt');
  const textLog = [
    '=' .repeat(60),
    'MIKAGE STUDIO OS - E2E SMOKE TEST',
    '=' .repeat(60),
    `Timestamp: ${new Date().toISOString()}`,
    `Test Result: ${validationResult.isValid ? 'PASS' : 'FAIL'}`,
    '',
    'REQUEST SUMMARY:',
    `- Request Code: ${smokeTestRequest.request.requestCode}`,
    `- Preset/Variant: ${smokeTestRequest.request.presetCode}/${smokeTestRequest.request.variantCode}`,
    `- Provider: ${smokeTestRequest.request.providerCode}`,
    `- Output Count: ${smokeTestRequest.request.outputCount}`,
    '',
    'RESPONSE SUMMARY:',
    `- Success: ${response.success}`,
    `- Status: ${response.status}`,
    `- Request Code: ${response.requestCode}`,
    `- Package Code: ${response.packageCode}`,
    `- Validation Decision: ${response.validationDecision}`,
    `- Benchmark Decision: ${response.benchmarkDecision}`,
    `- Studio Action: ${response.studioAction}`,
    `- Execution Steps: ${response.executionSteps?.length || 0}`,
    '',
    'EXECUTION STEPS:',
    ...response.executionSteps?.map((step: any, index: number) => 
      `${index + 1}. ${step.status === 'completed' ? '✅' : '⚠️'} ${step.step}: ${step.detail}`
    ) || ['No execution steps found'],
    '',
    validationResult.isValid ? '✅ TEST PASSED' : '❌ TEST FAILED',
    ''
  ];

  if (validationResult.errors.length > 0) {
    textLog.push('ERRORS:');
    validationResult.errors.forEach(error => textLog.push(`  - ${error}`));
    textLog.push('');
  }

  if (validationResult.warnings.length > 0) {
    textLog.push('WARNINGS:');
    validationResult.warnings.forEach(warning => textLog.push(`  - ${warning}`));
    textLog.push('');
  }

  textLog.push('=' .repeat(60));

  writeFileSync(textLogFile, textLog.join('\n'));
}

// Main test execution
async function runSmokeTest(): Promise<void> {
  console.log('🚀 Starting Mikage Studio OS E2E Smoke Test');
  console.log('='.repeat(50));

  try {
    // Step 1: Call the API
    console.log('📡 Sending request to API...');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smokeTestRequest),
    });

    console.log(`📥 Response status: ${response.status} ${response.statusText}`);

    // Step 2: Handle HTTP errors
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ HTTP Error:');
      console.error(`  Status: ${response.status} ${response.statusText}`);
      console.error(`  Body: ${errorBody}`);
      process.exit(1);
    }

    // Step 3: Parse JSON response
    let responseData;
    try {
      responseData = await response.json();
      console.log('✅ JSON response parsed successfully');
    } catch (error) {
      console.error('❌ JSON Parse Error:');
      console.error(`  Error: ${error}`);
      process.exit(1);
    }

    // Step 4: Validate response structure
    console.log('🔍 Validating response structure...');
    const validation = validateResponse(responseData);

    if (validation.isValid) {
      console.log('✅ Response validation passed');
    } else {
      console.error('❌ Response validation failed:');
      validation.errors.forEach(error => console.error(`  - ${error}`));
    }

    if (validation.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      validation.warnings.forEach(warning => console.log(`   - ${warning}`));
    }

    // Step 5: Save artifacts
    console.log('💾 Saving test artifacts...');
    saveArtifacts(responseData, validation);

    // Step 6: Final result
    if (validation.isValid) {
      console.log('🎉 E2E SMOKE TEST PASSED');
      console.log(`📄 Artifacts saved to ${LOGS_DIR}/`);
      process.exit(0);
    } else {
      console.log('💥 E2E SMOKE TEST FAILED');
      console.log(`📄 Artifacts saved to ${LOGS_DIR}/`);
      process.exit(1);
    }

  } catch (error) {
    console.error('💥 Unexpected Error:');
    console.error(`  Error: ${error}`);
    process.exit(1);
  }
}

// Run the test
runSmokeTest();
