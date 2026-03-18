#!/usr/bin/env tsx

/**
 * One-Command Operator Flow for Mikage Studio OS
 * 
 * Executes the complete local pipeline with a single command
 * and provides a final readable outcome for operators.
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Operator configuration
const OPERATOR_LOG = 'logs/operator-smoke-latest.txt';
const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINT = '/api/v1/execute';
const SERVICE_STARTUP_TIMEOUT = 30000; // 30 seconds

interface OperatorResult {
  requestCode: string;
  timestamp: string;
  resultLabel: 'PASS' | 'REJECTED' | 'FAIL';
  validationDecision: string;
  status: string;
  runPath: string;
  conclusion: string;
  exitCode: number;
}

/**
 * Ensure logs directory exists
 */
function ensureLogsDir(): void {
  const logsDir = 'logs';
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
  }
}

/**
 * Save operator log
 */
function saveOperatorLog(content: string): void {
  ensureLogsDir();
  writeFileSync(OPERATOR_LOG, content);
}

/**
 * Check if orchestration service is running
 */
async function isServiceRunning(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Start orchestration service in background
 */
async function startService(): Promise<boolean> {
  console.log('🚀 Starting orchestration service...');
  
  try {
    const { exec } = require('child_process');
    
    // Start service in background using shell
    exec('pnpm --filter @mikage/orchestration-service dev', {
      detached: true,
      stdio: 'ignore',
      cwd: process.cwd()
    });
    
    console.log('⏳ Waiting for service to be ready...');
    
    // Wait for service to be ready
    const startTime = Date.now();
    while (Date.now() - startTime < SERVICE_STARTUP_TIMEOUT) {
      if (await isServiceRunning()) {
        console.log('✅ Orchestration service is ready');
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Check every 2 seconds
    }
    
    console.log('❌ Service failed to start within timeout');
    return false;
    
  } catch (error) {
    console.error('❌ Failed to start service:', error);
    return false;
  }
}

/**
 * Execute smoke request
 */
async function executeSmokeRequest(): Promise<any> {
  console.log('📡 Executing smoke request...');
  
  const smokeRequest = {
    commandType: 'execute_generation_pipeline',
    request: {
      requestCode: `operator_smoke_${Date.now()}`,
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
        { packetKind: 'world_context', packetCode: 'ctx_world_operator_001' }
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
        tags: ['operator_smoke']
      },
      metadata: { initiatedBy: 'operator_smoke' }
    },
    compileProfile: {
      compileMode: 'production_prompt',
      systemFrame: 'Operator smoke test system frame',
      canonConstraints: ['Operator smoke constraint'],
      contextSummaries: ['Operator smoke context'],
      fragmentSummaries: ['Operator smoke fragment'],
      modeInstructions: ['Operator smoke instruction'],
      outputInstructions: ['Operator smoke output'],
      negativeClauses: ['Operator smoke negative']
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
      filterCode: 'operator_tests',
      filterTerms: ['operator', 'smoke']
    }
  };

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smokeRequest),
      signal: AbortSignal.timeout(60000) // 60 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
    
  } catch (error) {
    throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate response and determine result
 */
function validateResponse(response: any): OperatorResult {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response: not an object');
  }

  const required = ['success', 'status', 'requestCode', 'validationDecision'];
  const missing = required.filter(field => !(field in response));
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  // Determine result label
  let resultLabel: 'PASS' | 'REJECTED' | 'FAIL';
  let exitCode: number;
  
  if (response.success && response.validationDecision === 'accepted') {
    resultLabel = 'PASS';
    exitCode = 0;
  } else if (response.validationDecision === 'rejected') {
    resultLabel = 'REJECTED';
    exitCode = 0; // Rejection is not a system failure
  } else {
    resultLabel = 'FAIL';
    exitCode = 1; // Actual failure
  }

  return {
    requestCode: response.requestCode,
    timestamp: response.timestamp || new Date().toISOString(),
    resultLabel,
    validationDecision: response.validationDecision,
    status: response.status,
    runPath: `runs/${response.requestCode}`,
    conclusion: resultLabel === 'PASS' ? 'OPERATOR RESULT: PASS' : 
              resultLabel === 'REJECTED' ? 'OPERATOR RESULT: REJECTED' : 
              'OPERATOR RESULT: FAIL',
    exitCode
  };
}

/**
 * Print final operator summary
 */
function printOperatorSummary(result: OperatorResult): void {
  console.log('');
  console.log('='.repeat(60));
  console.log('🎯 MIKAGE STUDIO OS - OPERATOR SUMMARY');
  console.log('='.repeat(60));
  console.log(`Request Code: ${result.requestCode}`);
  console.log(`Timestamp: ${result.timestamp}`);
  console.log(`Result: ${result.resultLabel}`);
  console.log(`Validation: ${result.validationDecision}`);
  console.log(`Status: ${result.status}`);
  console.log(`Run Folder: ${result.runPath}`);
  console.log('');
  console.log(result.conclusion);
  console.log('='.repeat(60));
}

/**
 * Create operator log content
 */
function createOperatorLog(result: OperatorResult, startTime: number): string {
  const duration = Date.now() - startTime;
  
  return [
    'MIKAGE STUDIO OS - OPERATOR EXECUTION LOG',
    '=' .repeat(60),
    `Started: ${new Date(startTime).toISOString()}`,
    `Completed: ${result.timestamp}`,
    `Duration: ${duration}ms`,
    '',
    'EXECUTION RESULT:',
    `- Request Code: ${result.requestCode}`,
    `- Result Label: ${result.resultLabel}`,
    `- Validation Decision: ${result.validationDecision}`,
    `- Status: ${result.status}`,
    `- Run Path: ${result.runPath}`,
    `- Conclusion: ${result.conclusion}`,
    `- Exit Code: ${result.exitCode}`,
    '',
    'OPERATOR NOTES:',
    '- Validation rejection is not a system failure',
    '- Artifacts and index have been updated automatically',
    '- Use "pnpm run:latest" to view full run details',
    '- Use "pnpm run:history" to view execution history',
    '',
    '=' .repeat(60),
    `Log saved: ${OPERATOR_LOG}`,
    '=' .repeat(60)
  ].join('\n');
}

/**
 * Main operator flow
 */
async function runOperatorFlow(): Promise<void> {
  const startTime = Date.now();
  
  console.log('🎯 MIKAGE STUDIO OS - OPERATOR FLOW');
  console.log('='.repeat(60));
  console.log('Starting one-command operator execution...');
  
  try {
    // Step 1: Ensure service is available
    if (!(await isServiceRunning())) {
      if (!(await startService())) {
        throw new Error('Failed to start orchestration service');
      }
    } else {
      console.log('✅ Orchestration service is already running');
    }
    
    // Step 2: Execute smoke request
    const response = await executeSmokeRequest();
    
    // Step 3: Validate and determine result
    const result = validateResponse(response);
    
    // Step 4: Print summary
    printOperatorSummary(result);
    
    // Step 5: Save operator log
    const logContent = createOperatorLog(result, startTime);
    saveOperatorLog(logContent);
    console.log(`📄 Operator log saved: ${OPERATOR_LOG}`);
    
    // Step 6: Exit with appropriate code
    process.exit(result.exitCode);
    
  } catch (error) {
    console.error('');
    console.error('='.repeat(60));
    console.error('❌ OPERATOR FLOW FAILED');
    console.error('='.repeat(60));
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error('');
    console.error('OPERATOR RESULT: SYSTEM FAILURE');
    console.error('='.repeat(60));
    
    // Save failure log
    const failureLog = [
      'MIKAGE STUDIO OS - OPERATOR EXECUTION LOG (FAILED)',
      '=' .repeat(60),
      `Started: ${new Date(startTime).toISOString()}`,
      `Failed: ${new Date().toISOString()}`,
      `Duration: ${Date.now() - startTime}ms`,
      '',
      'FAILURE REASON:',
      `- Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      '',
      'OPERATOR RESULT: SYSTEM FAILURE',
      `Exit Code: 1`,
      '',
      '=' .repeat(60)
    ].join('\n');
    
    saveOperatorLog(failureLog);
    console.error(`📄 Failure log saved: ${OPERATOR_LOG}`);
    
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Promise Rejection:', reason);
  process.exit(1);
});

// Run the operator flow
runOperatorFlow();
