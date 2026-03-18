#!/usr/bin/env tsx

/**
 * Minimal Operator Run Command for Mikage Studio OS
 * 
 * Executes preset-based generation requests with minimal CLI
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Operator configuration
const OPERATOR_LOG = 'logs/operator-run-latest.txt';
const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINT = '/api/v1/execute';
const SERVICE_STARTUP_TIMEOUT = 30000; // 30 seconds

interface PresetConfig {
  presetName: string;
  requestCodePrefix: string;
  compileMode: string;
  scene: {
    sceneId: string;
    intent: string;
    subject: string;
  };
  inputs: {
    character: string;
    weapon: string;
  };
}

interface OperatorResult {
  requestCode: string;
  presetName: string;
  resultLabel: 'PASS' | 'REJECTED' | 'FAIL';
  validationDecision: string;
  status: string;
  runPath: string;
  conclusion: string;
  exitCode: number;
}

/**
 * Parse CLI arguments - only --preset supported
 */
function parseArgs(): { preset: string } {
  const args = process.argv.slice(2);
  
  if (args.length !== 2 || args[0] !== '--preset') {
    console.error('Usage: pnpm operator:run --preset <name>');
    process.exit(1);
  }
  
  const preset = args[1];
  if (!preset) {
    console.error('Error: --preset requires a value');
    process.exit(1);
  }
  
  return { preset };
}

/**
 * Load preset from file system
 */
function loadPreset(name: string): PresetConfig {
  const presetPath = join('presets', `${name}.json`);
  
  if (!existsSync(presetPath)) {
    // List available presets
    const presetsDir = 'presets';
    let availablePresets: string[] = [];
    
    if (existsSync(presetsDir)) {
      const { readdirSync } = require('fs');
      const files = readdirSync(presetsDir);
      availablePresets = files
        .filter((file: string) => file.endsWith('.json'))
        .map((file: string) => file.replace('.json', ''));
    }
    
    console.error('OPERATOR RESULT: FAIL');
    console.error(`Reason: preset "${name}" not found`);
    console.error('Available presets:');
    availablePresets.forEach(preset => {
      console.error(`  - ${preset}`);
    });
    process.exit(1);
  }
  
  try {
    const presetData = readFileSync(presetPath, 'utf-8');
    return JSON.parse(presetData) as PresetConfig;
  } catch (error) {
    console.error('OPERATOR RESULT: FAIL');
    console.error(`Reason: Failed to parse preset "${name}"`);
    process.exit(1);
  }
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
 * Build request payload from preset
 */
function buildRequestPayload(preset: PresetConfig): any {
  const requestCode = `${preset.requestCodePrefix}_${Date.now()}`;

  return {
    commandType: 'execute_generation_pipeline',
    request: {
      requestCode,
      projectSlug: 'mikage',
      characterCode: preset.inputs.character === 'mikage' ? 'char_mikage' : 'char_generic',
      anchorCode: 'anchor_leia_041',
      presetCode: preset.presetName,
      variantCode: preset.scene.sceneId,
      sceneCode: preset.scene.sceneId,
      shotCode: 'shot_medium_closeup_emotional_stillness',
      providerCode: 'mock_image_provider',
      outputCount: 1,
      contextPackets: [
        { packetKind: 'world_context', packetCode: `ctx_world_${preset.presetName}_001` }
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
        tags: ['operator_run', preset.presetName]
      },
      metadata: { 
        initiatedBy: 'operator_run',
        preset: preset.presetName
      }
    },
    compileProfile: {
      compileMode: preset.compileMode,
      systemFrame: `${preset.presetName} system frame for ${preset.scene.intent}`,
      canonConstraints: [`${preset.presetName} constraint set`],
      contextSummaries: [`${preset.presetName} context summary`],
      fragmentSummaries: [`${preset.presetName} fragment summary`],
      modeInstructions: [`${preset.presetName} mode instructions`],
      outputInstructions: [`${preset.presetName} output instructions`],
      negativeClauses: [`${preset.presetName} negative clauses`]
    },
    validationProfile: {
      ontologyRequiredTerms: ['mikage'],
      ontologyAdvisoryTerms: ['japanese', 'cinematic'],
      invariantAdvisoryTerms: ['canon'],
      philosophicalAdvisoryTerms: ['honor'],
      characterAdvisoryTerms: ['leia'],
      visualAdvisoryTerms: ['portrait'],
      driftRiskTerms: [],
      driftHardBlockTerms: []
    },
    benchmarkProfile: {
      goldReferenceTerms: ['mikage', preset.presetName],
      silverReferenceTerms: ['cinematic', 'portrait'],
      redBlockedTerms: []
    },
    studioProfile: {
      actionType: 'queue_generation',
      panelCode: 'production_queue',
      panelTitle: 'Production Queue',
      viewCode: 'studio_queue_view',
      filterCode: 'operator_runs',
      filterTerms: ['operator', 'run', preset.presetName]
    }
  };
}

/**
 * Execute preset request
 */
async function executePresetRequest(preset: PresetConfig): Promise<any> {
  console.log(`📡 Executing preset request: ${preset.presetName}`);
  
  const payload = buildRequestPayload(preset);
  const requestCode = payload.request.requestCode;
  
  console.log(`📋 Request Code: ${requestCode}`);
  console.log(`🎭 Preset: ${preset.presetName}`);
  console.log(`🎬 Scene: ${preset.scene.intent}`);

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120000) // 2 minute timeout
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
function validateResponse(response: any, preset: PresetConfig): OperatorResult {
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
    presetName: preset.presetName,
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
  console.log('🎯 MIKAGE STUDIO OS - OPERATOR RUN SUMMARY');
  console.log('='.repeat(60));
  console.log(`Request Code: ${result.requestCode}`);
  console.log(`Preset: ${result.presetName}`);
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
function createOperatorLog(result: OperatorResult, preset: PresetConfig, startTime: number): string {
  const duration = Date.now() - startTime;
  
  return [
    'MIKAGE STUDIO OS - OPERATOR RUN EXECUTION LOG',
    '=' .repeat(60),
    `Started: ${new Date(startTime).toISOString()}`,
    `Completed: ${new Date().toISOString()}`,
    `Duration: ${duration}ms`,
    '',
    'PRESET CONFIGURATION:',
    `- Preset: ${preset.presetName}`,
    `- Compile Mode: ${preset.compileMode}`,
    `- Scene ID: ${preset.scene.sceneId}`,
    `- Intent: ${preset.scene.intent}`,
    `- Subject: ${preset.scene.subject}`,
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
    '- This was a preset-based execution',
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
  
  console.log('🎯 MIKAGE STUDIO OS - OPERATOR RUN');
  console.log('='.repeat(60));
  
  try {
    // Step 1: Parse arguments and load preset
    const { preset } = parseArgs();
    const presetConfig = loadPreset(preset);
    
    console.log(`🎭 Preset: ${presetConfig.presetName}`);
    console.log(`🎬 Intent: ${presetConfig.scene.intent}`);
    console.log('');
    
    // Step 2: Ensure service is available
    if (!(await isServiceRunning())) {
      if (!(await startService())) {
        throw new Error('Failed to start orchestration service');
      }
    } else {
      console.log('✅ Orchestration service is already running');
    }
    
    // Step 3: Execute preset request
    const response = await executePresetRequest(presetConfig);
    
    // Step 4: Validate and determine result
    const result = validateResponse(response, presetConfig);
    
    // Step 5: Print summary
    printOperatorSummary(result);
    
    // Step 6: Save operator log
    const logContent = createOperatorLog(result, presetConfig, startTime);
    saveOperatorLog(logContent);
    console.log(`📄 Operator log saved: ${OPERATOR_LOG}`);
    
    // Step 7: Exit with appropriate code
    process.exit(result.exitCode);
    
  } catch (error) {
    console.error('');
    console.error('='.repeat(60));
    console.error('❌ OPERATOR RUN FAILED');
    console.error('='.repeat(60));
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error('');
    console.error('OPERATOR RESULT: FAIL');
    console.error('='.repeat(60));
    
    // Save failure log
    const failureLog = [
      'MIKAGE STUDIO OS - OPERATOR RUN EXECUTION LOG (FAILED)',
      '=' .repeat(60),
      `Started: ${new Date(startTime).toISOString()}`,
      `Failed: ${new Date().toISOString()}`,
      `Duration: ${Date.now() - startTime}ms`,
      '',
      'FAILURE REASON:',
      `- Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      '',
      'OPERATOR RESULT: FAIL',
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
