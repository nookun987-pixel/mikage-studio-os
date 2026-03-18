#!/usr/bin/env tsx

/**
 * Quick review for latest run
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
  const index = loadIndex();
  
  if (!index) {
    console.log('[LATEST_REVIEW] no runs index found');
    return;
  }
  
  if (!index.runs || index.runs.length === 0) {
    console.log('[LATEST_REVIEW] empty');
    return;
  }
  
  const latestRun = index.runs[0];
  
  if (!latestRun || !latestRun.requestCode) {
    console.log('[LATEST_REVIEW] missing');
    return;
  }
  
  const runPath = `runs/${latestRun.requestCode}`;
  if (!existsSync(runPath)) {
    console.log('[LATEST_REVIEW] missing');
    return;
  }
  
  const filesCount = countFiles(runPath);
  const artifactsCount = countArtifacts(runPath);
  const summaryStatus = hasSummary(runPath);
  const status = calculateStatus(filesCount, artifactsCount, summaryStatus);
  
  console.log(`[LATEST_REVIEW] request: ${latestRun.requestCode}`);
  console.log(`[LATEST_REVIEW] preset: ${latestRun.preset || 'unknown'}`);
  console.log(`[LATEST_REVIEW] result: ${latestRun.resultLabel || 'UNKNOWN'}`);
  console.log(`[LATEST_REVIEW] validation: ${latestRun.validationDecision || 'unknown'}`);
  console.log(`[LATEST_REVIEW] files: ${filesCount}`);
  console.log(`[LATEST_REVIEW] artifacts: ${artifactsCount}`);
  console.log(`[LATEST_REVIEW] summary: ${summaryStatus}`);
  console.log(`[LATEST_REVIEW] status: ${status}`);
}

main();
