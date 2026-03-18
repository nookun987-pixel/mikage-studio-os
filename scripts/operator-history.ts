#!/usr/bin/env tsx

/**
 * Show recent runs with limit
 */

import { readFileSync, existsSync } from 'node:fs';

interface RunIndexEntry {
  requestCode: string;
  preset?: string;
  resultLabel?: string;
  validationDecision?: string;
  timestamp?: string;
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

function parseArgs(): { limit: number } {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    return { limit: 10 };
  }
  
  if (args.length === 2 && args[0] === '--limit') {
    const limit = parseInt(args[1], 10);
    return { limit: isNaN(limit) || limit < 1 ? 10 : limit };
  }
  
  return { limit: 10 };
}

function main(): void {
  const { limit } = parseArgs();
  const index = loadIndex();
  
  if (!index) {
    console.log('[HISTORY] no runs index found');
    return;
  }
  
  if (!index.runs || index.runs.length === 0) {
    console.log('[HISTORY] empty');
    return;
  }
  
  // Sort by timestamp if available, newest first
  const sortedRuns = [...index.runs].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return 0;
  });
  
  const limitedRuns = sortedRuns.slice(0, limit);
  
  limitedRuns.forEach(run => {
    console.log(`[HISTORY] request: ${run.requestCode}`);
    console.log(`[HISTORY] preset: ${run.preset || 'unknown'}`);
    console.log(`[HISTORY] result: ${run.resultLabel || 'UNKNOWN'}`);
    console.log(`[HISTORY] validation: ${run.validationDecision || 'unknown'}`);
    console.log('[HISTORY] ---');
  });
  
  console.log(`[HISTORY] total: ${limitedRuns.length}`);
}

main();
