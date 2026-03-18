#!/usr/bin/env tsx

/**
 * Get latest run important paths
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

interface RunIndexEntry {
  requestCode: string;
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

function findSummaryPath(runPath: string): string | null {
  const summaryPaths = [
    'summary.txt',
    'summary.md',
    'result-summary.txt',
    'artifacts/summary.txt',
    'artifacts/summary.md'
  ];
  
  for (const path of summaryPaths) {
    if (existsSync(join(runPath, path))) {
      return path;
    }
  }
  
  return null;
}

function main(): void {
  const index = loadIndex();
  
  if (!index) {
    console.log('[LATEST_PATHS] no runs index found');
    return;
  }
  
  if (!index.runs || index.runs.length === 0) {
    console.log('[LATEST_PATHS] empty');
    return;
  }
  
  const latestRun = index.runs[0];
  
  if (!latestRun || !latestRun.requestCode) {
    console.log('[LATEST_PATHS] missing');
    return;
  }
  
  const runPath = `runs/${latestRun.requestCode}`;
  if (!existsSync(runPath)) {
    console.log('[LATEST_PATHS] run missing');
    return;
  }
  
  console.log(`[LATEST_PATHS] request: ${latestRun.requestCode}`);
  console.log(`[LATEST_PATHS] run: ${runPath}`);
  
  // Check summary
  const summaryPath = findSummaryPath(runPath);
  if (summaryPath) {
    console.log(`[LATEST_PATHS] summary: ${runPath}/${summaryPath}`);
  }
  
  // Check artifacts
  const artifactsPath = join(runPath, 'artifacts');
  if (existsSync(artifactsPath)) {
    console.log(`[LATEST_PATHS] artifacts: ${artifactsPath}`);
  }
  
  // Check request and response files
  const requestPath = join(runPath, 'request.json');
  if (existsSync(requestPath)) {
    console.log(`[LATEST_PATHS] request_file: ${requestPath}`);
  }
  
  const responsePath = join(runPath, 'response.json');
  if (existsSync(responsePath)) {
    console.log(`[LATEST_PATHS] response_file: ${responsePath}`);
  }
}

main();
