#!/usr/bin/env tsx

/**
 * Search runs by substring query
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

function parseArgs(): { query: string } | null {
  const args = process.argv.slice(2);
  
  if (args.length !== 2 || args[0] !== '--query') {
    return null;
  }
  
  return { query: args[1] };
}

function main(): void {
  const args = parseArgs();
  
  if (!args) {
    console.log('[FIND] query missing');
    return;
  }
  
  const index = loadIndex();
  
  if (!index) {
    console.log('[FIND] no runs index found');
    return;
  }
  
  if (!index.runs || index.runs.length === 0) {
    console.log('[FIND] empty');
    return;
  }
  
  const query = args.query.toLowerCase();
  const matches = index.runs.filter(run => {
    return (
      run.requestCode.toLowerCase().includes(query) ||
      (run.preset && run.preset.toLowerCase().includes(query)) ||
      (run.resultLabel && run.resultLabel.toLowerCase().includes(query)) ||
      (run.validationDecision && run.validationDecision.toLowerCase().includes(query))
    );
  });
  
  if (matches.length === 0) {
    console.log('[FIND] no match');
    return;
  }
  
  matches.forEach(run => {
    console.log(`[FIND] request: ${run.requestCode}`);
    console.log(`[FIND] preset: ${run.preset || 'unknown'}`);
    console.log(`[FIND] result: ${run.resultLabel || 'UNKNOWN'}`);
    console.log(`[FIND] validation: ${run.validationDecision || 'unknown'}`);
    console.log('[FIND] ---');
  });
  
  console.log(`[FIND] total: ${matches.length}`);
}

main();
