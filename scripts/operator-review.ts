#!/usr/bin/env tsx

/**
 * Quick review for a specific run
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

function parseArgs(): { request: string } | null {
  const args = process.argv.slice(2);
  
  if (args.length !== 2 || args[0] !== '--request') {
    return null;
  }
  
  return { request: args[1] };
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

function calculateStatus(filesCount: number, artifactsCount: number | string, summaryStatus: string): string {
  const hasArtifacts = artifactsCount !== 'missing' && typeof artifactsCount === 'number' && artifactsCount > 0;
  const hasFiles = filesCount > 0;
  const hasSummary = summaryStatus === 'present';
  
  if (hasFiles && (hasArtifacts || hasSummary)) {
    return 'ok';
  }
  
  if (hasFiles) {
    return 'partial';
  }
  
  return 'broken';
}

function main(): void {
  const args = parseArgs();
  
  if (!args) {
    console.log('[REVIEW] request missing');
    return;
  }
  
  const index = loadIndex();
  const runPath = `runs/${args.request}`;
  
  if (!existsSync(runPath)) {
    console.log('[REVIEW] missing');
    return;
  }
  
  // Get run info from index or fallback
  let runInfo: RunIndexEntry | null = null;
  if (index && index.runs) {
    runInfo = index.runs.find(r => r.requestCode === args.request) || null;
  }
  
  const filesCount = countFiles(runPath);
  const artifactsCount = countArtifacts(runPath);
  const summaryStatus = hasSummary(runPath);
  const status = calculateStatus(filesCount, artifactsCount, summaryStatus);
  
  console.log(`[REVIEW] request: ${args.request}`);
  console.log(`[REVIEW] preset: ${runInfo?.preset || 'unknown'}`);
  console.log(`[REVIEW] result: ${runInfo?.resultLabel || 'UNKNOWN'}`);
  console.log(`[REVIEW] validation: ${runInfo?.validationDecision || 'unknown'}`);
  console.log(`[REVIEW] files: ${filesCount}`);
  console.log(`[REVIEW] artifacts: ${artifactsCount}`);
  console.log(`[REVIEW] summary: ${summaryStatus}`);
  console.log(`[REVIEW] status: ${status}`);
}

main();
