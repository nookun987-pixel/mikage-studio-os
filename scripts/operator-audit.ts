#!/usr/bin/env tsx

/**
 * Audit consistency between index and directories
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';

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

function getRunDirs(): string[] {
  const runsDir = 'runs';
  
  if (!existsSync(runsDir)) {
    return [];
  }
  
  try {
    return readdirSync(runsDir)
      .filter(name => name !== 'index.json')
      .filter(name => !name.startsWith('.'))
      .sort();
  } catch {
    return [];
  }
}

function main(): void {
  const index = loadIndex();
  const runDirs = getRunDirs();
  
  if (!index) {
    console.log('[AUDIT] no runs index found');
    return;
  }
  
  if (runDirs.length === 0) {
    console.log('[AUDIT] runs missing');
    return;
  }
  
  const indexRecords = index.runs || [];
  const indexRequestCodes = new Set(indexRecords.map(r => r.requestCode));
  const runDirSet = new Set(runDirs);
  
  // Find missing directories (in index but not in filesystem)
  const missingDirs = Array.from(indexRequestCodes).filter(id => !runDirSet.has(id));
  
  // Find orphan directories (in filesystem but not in index)
  const orphanDirs = Array.from(runDirSet).filter(dir => !indexRequestCodes.has(dir));
  
  console.log(`[AUDIT] index_records: ${indexRecords.length}`);
  console.log(`[AUDIT] run_dirs: ${runDirs.length}`);
  console.log(`[AUDIT] missing_dirs: ${missingDirs.length}`);
  console.log(`[AUDIT] orphan_dirs: ${orphanDirs.length}`);
  
  if (missingDirs.length > 0) {
    missingDirs.forEach(id => {
      console.log(`[AUDIT] missing: ${id}`);
    });
  }
  
  if (orphanDirs.length > 0) {
    orphanDirs.forEach(dir => {
      console.log(`[AUDIT] orphan: ${dir}`);
    });
  }
  
  if (missingDirs.length === 0 && orphanDirs.length === 0) {
    console.log('[AUDIT] ok');
  }
}

main();
