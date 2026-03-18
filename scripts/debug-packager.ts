#!/usr/bin/env tsx

/**
 * Debug test for result packaging
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RUNS_DIR = 'runs';

// Test basic file system operations
console.log('🔍 Testing file system operations...');

try {
  // Test directory creation
  if (!existsSync(RUNS_DIR)) {
    console.log(`Creating directory: ${RUNS_DIR}`);
    mkdirSync(RUNS_DIR, { recursive: true });
  } else {
    console.log(`Directory already exists: ${RUNS_DIR}`);
  }

  // Test file creation
  const testFile = join(RUNS_DIR, 'test.txt');
  console.log(`Creating test file: ${testFile}`);
  writeFileSync(testFile, 'Hello World');
  
  console.log('✅ Basic file system operations work');
  
  // Test if directory exists now
  if (existsSync(RUNS_DIR)) {
    console.log('✅ Directory exists after creation');
  } else {
    console.log('❌ Directory still does not exist');
  }
  
} catch (error) {
  console.error('❌ File system test failed:', error);
}

// Test a simple mock of the result packager logic
try {
  console.log('🔍 Testing mock result packager...');
  
  const mockRequest = {
    request: { requestCode: 'debug_test_001' }
  };
  
  const mockResponse = {
    success: true,
    status: 'completed',
    requestCode: 'debug_test_001',
    packageCode: 'pkg_debug_test_001',
    validationDecision: 'accepted',
    benchmarkDecision: 'approved',
    studioAction: 'queue_generation',
    executionSteps: [
      { step: 'test_step', status: 'completed', detail: 'Test detail' }
    ],
    timestamp: new Date().toISOString()
  };
  
  const runDir = join(RUNS_DIR, mockRequest.request.requestCode);
  console.log(`Creating run directory: ${runDir}`);
  
  if (!existsSync(runDir)) {
    mkdirSync(runDir, { recursive: true });
  }
  
  // Write mock files
  writeFileSync(join(runDir, 'request.json'), JSON.stringify(mockRequest, null, 2));
  writeFileSync(join(runDir, 'response.json'), JSON.stringify(mockResponse, null, 2));
  
  const summary = [
    'TEST SUMMARY',
    `Request Code: ${mockRequest.request.requestCode}`,
    `Success: ${mockResponse.success}`,
    `Status: ${mockResponse.status}`,
    'RESULT: PASS'
  ];
  
  writeFileSync(join(runDir, 'summary.txt'), summary.join('\n'));
  
  console.log('✅ Mock result packager test passed');
  console.log(`📁 Created artifacts in: ${runDir}`);
  
} catch (error) {
  console.error('❌ Mock result packager test failed:', error);
}
