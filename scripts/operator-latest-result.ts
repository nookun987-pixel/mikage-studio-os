#!/usr/bin/env tsx

/**
 * Get latest run result details
 */

import { readFileSync, existsSync } from 'node:fs';

interface RunIndexEntry {
  requestCode: string;
  preset?: string;
  resultLabel?: string;
  validationDecision?: string;
}

interface RunIndex {
  version?: string;
  runs: RunIndexEntry[];
}

function loadIndex(): RunIndex | null {
  const indexPath = 'runs/index.json';
  
  if (!existsSync(indexPath)) {
    return null;
  }
  
  try {
    const data = readFileSync(indexPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function main(): void {
  const index = loadIndex();
  
  if (!index) {
    console.log('[LATEST_RESULT] no runs index found');
    return;
  }
  
  if (!index.runs || index.runs.length === 0) {
    console.log('[LATEST_RESULT] empty');
    return;
  }
  
  const latestRun = index.runs[0];
  
  if (!latestRun || !latestRun.requestCode) {
    console.log('[LATEST_RESULT] missing');
    return;
  }
  
  const runPath = `runs/${latestRun.requestCode}`;
  if (!existsSync(runPath)) {
    console.log('[LATEST_RESULT] missing');
    return;
  }
  
  console.log(`[LATEST_RESULT] request: ${latestRun.requestCode}`);
  console.log(`[LATEST_RESULT] preset: ${latestRun.preset || 'unknown'}`);
  console.log(`[LATEST_RESULT] result: ${latestRun.resultLabel || 'UNKNOWN'}`);
  console.log(`[LATEST_RESULT] validation: ${latestRun.validationDecision || 'unknown'}`);
  console.log(`[LATEST_RESULT] path: ${runPath}`);
}

main();
