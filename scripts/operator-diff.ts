#!/usr/bin/env tsx

/**
 * Compare two runs minimally
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

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

function parseArgs(): { left: string; right: string } | null {
  const args = process.argv.slice(2);
  
  if (args.length !== 4 || args[0] !== '--left' || args[2] !== '--right') {
    return null;
  }
  
  return { left: args[1], right: args[3] };
}

function getRunInfo(index: RunIndex | null, requestId: string): RunIndexEntry | null {
  if (!index || !index.runs) {
    return null;
  }
  
  return index.runs.find(r => r.requestCode === requestId) || null;
}

function countFiles(runPath: string): number {
  try {
    return readdirSync(runPath).length;
  } catch {
    return 0;
  }
}

function countArtifacts(runPath: string): number | string {
  const artifactsPath = join(runPath, 'artifacts');
  
  if (!existsSync(artifactsPath)) {
    return 'missing';
  }
  
  try {
    return readdirSync(artifactsPath).length;
  } catch {
    return 0;
  }
}

function hasSummary(runPath: string): string {
  const summaryPaths = [
    'summary.txt',
    'summary.md',
    'result-summary.txt',
    'artifacts/summary.txt',
    'artifacts/summary.md'
  ];
  
  for (const path of summaryPaths) {
    if (existsSync(join(runPath, path))) {
      return 'present';
    }
  }
  
  return 'missing';
}

function main(): void {
  const args = parseArgs();
  
  if (!args) {
    console.log('[DIFF] left missing');
    console.log('[DIFF] right missing');
    return;
  }
  
  const { left, right } = args;
  const leftPath = `runs/${left}`;
  const rightPath = `runs/${right}`;
  
  // Check if runs exist
  const leftExists = existsSync(leftPath);
  const rightExists = existsSync(rightPath);
  
  if (!leftExists) {
    console.log('[DIFF] left missing');
    return;
  }
  
  if (!rightExists) {
    console.log('[DIFF] right missing');
    return;
  }
  
  const index = loadIndex();
  const leftInfo = getRunInfo(index, left);
  const rightInfo = getRunInfo(index, right);
  
  // Compare basic fields
  const presetSame = leftInfo?.preset === rightInfo?.preset;
  const resultSame = leftInfo?.resultLabel === rightInfo?.resultLabel;
  const validationSame = leftInfo?.validationDecision === rightInfo?.validationDecision;
  
  // Compare counts
  const leftFiles = countFiles(leftPath);
  const rightFiles = countFiles(rightPath);
  const leftArtifacts = countArtifacts(leftPath);
  const rightArtifacts = countArtifacts(rightPath);
  const leftSummary = hasSummary(leftPath);
  const rightSummary = hasSummary(rightPath);
  
  console.log(`[DIFF] left: ${left}`);
  console.log(`[DIFF] right: ${right}`);
  console.log(`[DIFF] preset: ${presetSame ? 'same' : 'different'}`);
  console.log(`[DIFF] result: ${resultSame ? 'same' : 'different'}`);
  console.log(`[DIFF] validation: ${validationSame ? 'same' : 'different'}`);
  console.log(`[DIFF] files: ${leftFiles} vs ${rightFiles}`);
  console.log(`[DIFF] artifacts: ${leftArtifacts} vs ${rightArtifacts}`);
  console.log(`[DIFF] summary: ${leftSummary === rightSummary ? 'same_status' : 'different_status'}`);
}

main();
