#!/usr/bin/env tsx

/**
 * Run History Retrieval Script for Mikage Studio OS
 * 
 * Scripts to query and display execution history from the run index
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Import the result packager types (we need to replicate this since it's in the orchestration service)
const RUNS_DIR = 'runs';

interface RunIndexEntry {
  requestCode: string;
  timestamp: string;
  success: boolean;
  status: string;
  compileMode: string;
  validationDecision: string;
  benchmarkDecision: string | null;
  studioAction: string | null;
  packageCode: string | null;
  runPath: string;
  resultLabel: 'PASS' | 'REJECTED' | 'FAIL';
}

interface RunIndex {
  version: '1.0.0';
  lastUpdated: string;
  runs: RunIndexEntry[];
}

/**
 * Load the run index
 */
function loadIndex(): RunIndex | null {
  const indexPath = join(RUNS_DIR, 'index.json');
  
  if (!existsSync(indexPath)) {
    console.log('❌ No run index found. No executions have been recorded yet.');
    console.log('💡 Run a pipeline execution first to create the index.');
    return null;
  }
  
  try {
    const indexData = readFileSync(indexPath, 'utf-8');
    return JSON.parse(indexData) as RunIndex;
  } catch (error) {
    console.error('❌ Failed to read run index:', error);
    return null;
  }
}

/**
 * Format timestamp for display
 */
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toISOString().replace('T', ' ').slice(0, 19);
}

/**
 * Get result label with color
 */
function getResultDisplay(resultLabel: string): string {
  switch (resultLabel) {
    case 'PASS':
      return '✅ PASS';
    case 'REJECTED':
      return '⚠️  REJECTED';
    case 'FAIL':
      return '❌ FAIL';
    default:
      return `❓ ${resultLabel}`;
  }
}

/**
 * Display run history
 */
function showHistory(options: {
  limit?: number;
  resultLabel?: 'PASS' | 'REJECTED' | 'FAIL';
  validationDecision?: string;
}): void {
  console.log('📋 Mikage Studio OS - Run History');
  console.log('='.repeat(50));

  const index = loadIndex();
  if (!index) {
    process.exit(1);
  }

  let runs = [...index.runs];
  
  // Filter by result label
  if (options.resultLabel) {
    const originalCount = runs.length;
    runs = runs.filter(run => run.resultLabel === options.resultLabel);
    console.log(`🔍 Filtered by result: ${options.resultLabel} (${runs.length}/${originalCount} runs)`);
  }
  
  // Filter by validation decision
  if (options.validationDecision) {
    const originalCount = runs.length;
    runs = runs.filter(run => run.validationDecision === options.validationDecision);
    console.log(`🔍 Filtered by validation: ${options.validationDecision} (${runs.length}/${originalCount} runs)`);
  }
  
  // Apply limit
  if (options.limit && options.limit > 0) {
    runs = runs.slice(0, options.limit);
    console.log(`📊 Showing latest ${options.limit} runs`);
  }
  
  if (runs.length === 0) {
    console.log('❌ No runs found matching the criteria.');
    process.exit(0);
  }
  
  console.log(`📈 Last updated: ${formatTimestamp(index.lastUpdated)}`);
  console.log('');
  
  // Display each run
  runs.forEach((run, index) => {
    const isLatest = index === 0;
    const marker = isLatest ? '🔥' : '  ';
    
    console.log(`${marker} ${formatTimestamp(run.timestamp)}`);
    console.log(`   Request: ${run.requestCode}`);
    console.log(`   Result: ${getResultDisplay(run.resultLabel)}`);
    console.log(`   Validation: ${run.validationDecision}`);
    console.log(`   Studio Action: ${run.studioAction || 'N/A'}`);
    console.log(`   Path: ${run.runPath}`);
    console.log('');
  });
  
  console.log(`📁 Total runs in index: ${index.runs.length}`);
  console.log(`💾 Index file: ${join(RUNS_DIR, 'index.json')}`);
}

/**
 * Show detailed statistics
 */
function showStats(): void {
  console.log('📊 Mikage Studio OS - Run Statistics');
  console.log('='.repeat(50));

  const index = loadIndex();
  if (!index) {
    process.exit(1);
  }

  const runs = index.runs;
  const total = runs.length;
  
  if (total === 0) {
    console.log('❌ No runs found.');
    process.exit(0);
  }
  
  // Count by result labels
  const passCount = runs.filter(r => r.resultLabel === 'PASS').length;
  const rejectedCount = runs.filter(r => r.resultLabel === 'REJECTED').length;
  const failCount = runs.filter(r => r.resultLabel === 'FAIL').length;
  
  // Count by validation decisions
  const acceptedCount = runs.filter(r => r.validationDecision === 'accepted').length;
  const rejectedValidationCount = runs.filter(r => r.validationDecision === 'rejected').length;
  
  console.log(`📈 Total runs: ${total}`);
  console.log(`📅 Last updated: ${formatTimestamp(index.lastUpdated)}`);
  console.log('');
  console.log('🎯 Results:');
  console.log(`   ✅ Pass: ${passCount} (${((passCount/total)*100).toFixed(1)}%)`);
  console.log(`   ⚠️  Rejected: ${rejectedCount} (${((rejectedCount/total)*100).toFixed(1)}%)`);
  console.log(`   ❌ Fail: ${failCount} (${((failCount/total)*100).toFixed(1)}%)`);
  console.log('');
  console.log('🔍 Validation:');
  console.log(`   ✅ Accepted: ${acceptedCount} (${((acceptedCount/total)*100).toFixed(1)}%)`);
  console.log(`   ❌ Rejected: ${rejectedValidationCount} (${((rejectedValidationCount/total)*100).toFixed(1)}%)`);
  console.log('');
  console.log(`💾 Index file: ${join(RUNS_DIR, 'index.json')}`);
}

// Main execution
function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'latest':
    case 'history':
      const limit = args.includes('--limit') && args[args.indexOf('--limit') + 1] 
        ? parseInt(args[args.indexOf('--limit') + 1]) 
        : undefined;
      showHistory({ limit });
      break;
      
    case 'pass':
    case 'passed':
      showHistory({ resultLabel: 'PASS' });
      break;
      
    case 'rejected':
      showHistory({ resultLabel: 'REJECTED' });
      break;
      
    case 'failed':
    case 'fail':
      showHistory({ resultLabel: 'FAIL' });
      break;
      
    case 'accepted':
      showHistory({ validationDecision: 'accepted' });
      break;
      
    case 'stats':
    case 'statistics':
      showStats();
      break;
      
    default:
      console.log('📋 Mikage Studio OS - Run History');
      console.log('='.repeat(50));
      console.log('');
      console.log('Usage:');
      console.log('  tsx scripts/show-run-history.ts [command] [options]');
      console.log('');
      console.log('Commands:');
      console.log('  latest, history           Show latest runs');
      console.log('  pass, passed              Show only passed runs');
      console.log('  rejected                  Show only rejected runs');
      console.log('  failed, fail              Show only failed runs');
      console.log('  accepted                  Show only accepted validation runs');
      console.log('  stats, statistics         Show run statistics');
      console.log('');
      console.log('Options:');
      console.log('  --limit <number>          Limit number of runs shown');
      console.log('');
      console.log('Examples:');
      console.log('  pnpm run:history');
      console.log('  pnpm run:history --limit 5');
      console.log('  pnpm run:history:pass');
      console.log('  pnpm run:history:rejected');
      console.log('  pnpm run:history:stats');
      break;
  }
}

main();
