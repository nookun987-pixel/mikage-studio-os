#!/usr/bin/env tsx

/**
 * List all run request IDs
 */

import { readFileSync, existsSync } from 'node:fs';

interface RunIndexEntry {
  requestCode: string;
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

function main(): void {
  const index = loadIndex();
  
  if (!index) {
    console.log('[LIST] no runs index found');
    return;
  }
  
  if (!index.runs || index.runs.length === 0) {
    console.log('[LIST] empty');
    return;
  }
  
  // Sort by timestamp if available, otherwise keep original order
  const sortedRuns = [...index.runs].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return 0;
  });
  
  sortedRuns.forEach(run => {
    console.log(`[LIST] ${run.requestCode}`);
  });
  
  console.log(`[LIST] total: ${sortedRuns.length}`);
}

main();
