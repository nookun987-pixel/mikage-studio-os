#!/usr/bin/env tsx

/**
 * Health check of operator system
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';

interface RunIndexEntry {
  requestCode: string;
  preset?: string;
  resultLabel?: string;
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

function checkPresetsDir(): string {
  if (!existsSync('presets')) {
    return 'missing';
  }
  
  try {
    const files = readdirSync('presets');
    return files.length > 0 ? 'ok' : 'empty';
  } catch {
    return 'broken';
  }
}

function checkRunsDir(): string {
  if (!existsSync('runs')) {
    return 'missing';
  }
  
  try {
    const files = readdirSync('runs');
    return files.length > 0 ? 'ok' : 'empty';
  } catch {
    return 'broken';
  }
}

function checkIndex(): string {
  const index = loadIndex();
  if (!index) {
    return 'missing';
  }
  
  if (!index.runs || !Array.isArray(index.runs)) {
    return 'broken';
  }
  
  return 'ok';
}

function checkLatest(): string {
  const index = loadIndex();
  if (!index || !index.runs || index.runs.length === 0) {
    return 'empty';
  }
  
  const latestRun = index.runs[0];
  if (!latestRun || !latestRun.requestCode) {
    return 'broken';
  }
  
  const runPath = `runs/${latestRun.requestCode}`;
  if (!existsSync(runPath)) {
    return 'missing';
  }
  
  return 'ok';
}

function checkLatestSummary(): string {
  const index = loadIndex();
  if (!index || !index.runs || index.runs.length === 0) {
    return 'empty';
  }
  
  const latestRun = index.runs[0];
  if (!latestRun || !latestRun.requestCode) {
    return 'broken';
  }
  
  const runPath = `runs/${latestRun.requestCode}`;
  const summaryPaths = [
    `${runPath}/summary.txt`,
    `${runPath}/summary.md`,
    `${runPath}/result-summary.txt`,
    `${runPath}/artifacts/summary.txt`,
    `${runPath}/artifacts/summary.md`
  ];
  
  for (const path of summaryPaths) {
    if (existsSync(path)) {
      return 'ok';
    }
  }
  
  return 'missing';
}

function checkLatestArtifacts(): string {
  const index = loadIndex();
  if (!index || !index.runs || index.runs.length === 0) {
    return 'empty';
  }
  
  const latestRun = index.runs[0];
  if (!latestRun || !latestRun.requestCode) {
    return 'broken';
  }
  
  const artifactsPath = `runs/${latestRun.requestCode}/artifacts`;
  if (!existsSync(artifactsPath)) {
    return 'missing';
  }
  
  try {
    const files = readdirSync(artifactsPath);
    return files.length > 0 ? 'ok' : 'empty';
  } catch {
    return 'broken';
  }
}

function calculateOverall(statuses: string[]): string {
  const hasBroken = statuses.some(s => s === 'broken');
  const hasMissing = statuses.some(s => s === 'missing');
  
  if (hasBroken) {
    return 'broken';
  }
  
  if (hasMissing) {
    return 'degraded';
  }
  
  return 'ok';
}

function main(): void {
  const presets = checkPresetsDir();
  const runs = checkRunsDir();
  const index = checkIndex();
  const latest = checkLatest();
  const latestSummary = checkLatestSummary();
  const latestArtifacts = checkLatestArtifacts();
  
  console.log(`[DOCTOR] presets: ${presets}`);
  console.log(`[DOCTOR] runs: ${runs}`);
  console.log(`[DOCTOR] index: ${index}`);
  console.log(`[DOCTOR] latest: ${latest}`);
  console.log(`[DOCTOR] latest_summary: ${latestSummary}`);
  console.log(`[DOCTOR] latest_artifacts: ${latestArtifacts}`);
  
  const overall = calculateOverall([presets, runs, index, latest, latestSummary, latestArtifacts]);
  console.log(`[DOCTOR] overall: ${overall}`);
}

main();
