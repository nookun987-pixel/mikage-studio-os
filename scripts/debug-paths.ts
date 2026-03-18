#!/usr/bin/env tsx

/**
 * Debug script to investigate path resolution in server context
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('🔍 Investigating Path Resolution Issues');
console.log('='.repeat(50));

// Check current working directory
console.log('📁 Current Working Directory:');
console.log(`process.cwd(): ${process.cwd()}`);

// Check script location
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log('');
console.log('📄 Script Location:');
console.log(`__filename: ${__filename}`);
console.log(`__dirname: ${__dirname}`);

// Try to determine repo root
function findRepoRoot(currentDir: string): string {
  let dir = currentDir;
  while (dir !== dirname(dir)) { // Stop at root
    if (existsSync(join(dir, 'package.json'))) {
      return dir;
    }
    dir = dirname(dir);
  }
  return currentDir; // Fallback
}

const repoRoot = findRepoRoot(process.cwd());
console.log('');
console.log('📂 Repository Root:');
console.log(`repoRoot: ${repoRoot}`);

// Test different path resolution approaches
const runsDir1 = join(process.cwd(), 'runs');
const runsDir2 = join(repoRoot, 'runs');
const runsDir3 = join(__dirname, '..', '..', 'runs');

console.log('');
console.log('🎯 Potential Runs Directory Paths:');
console.log(`From cwd: ${runsDir1}`);
console.log(`From repo root: ${runsDir2}`);
console.log(`From script relative: ${runsDir3}`);

// Test which one works
console.log('');
console.log('🧪 Testing Directory Creation:');

const testDirs = [
  { name: 'cwd-based', path: runsDir1 },
  { name: 'repo-root-based', path: runsDir2 },
  { name: 'script-relative', path: runsDir3 }
];

for (const testDir of testDirs) {
  try {
    if (!existsSync(testDir.path)) {
      mkdirSync(testDir.path, { recursive: true });
    }
    
    const testFile = join(testDir.path, 'path-test.txt');
    writeFileSync(testFile, `Test from ${testDir.name}\nTimestamp: ${new Date().toISOString()}`);
    
    if (existsSync(testFile)) {
      console.log(`✅ ${testDir.name}: SUCCESS - ${testDir.path}`);
      console.log(`   File created: ${testFile}`);
    } else {
      console.log(`❌ ${testDir.name}: FAILED - File not found after creation`);
    }
  } catch (error) {
    console.log(`❌ ${testDir.name}: ERROR - ${error}`);
  }
}

// Check what the orchestration service would see
console.log('');
console.log('🚀 Orchestration Service Context:');
const serviceDir = join(repoRoot, 'apps', 'orchestration-service');
console.log(`Service dir: ${serviceDir}`);
console.log(`Service exists: ${existsSync(serviceDir)}`);

const serviceMain = join(serviceDir, 'src', 'main.ts');
console.log(`Service main exists: ${existsSync(serviceMain)}`);

// Simulate the server's working directory
const simulatedServerCwd = serviceDir;
console.log(`Simulated server cwd: ${simulatedServerCwd}`);

const runsFromServer = join(simulatedServerCwd, 'runs');
const runsFromServerToRepo = join(simulatedServerCwd, '..', '..', 'runs');

console.log(`Runs from server cwd: ${runsFromServer}`);
console.log(`Runs from server to repo: ${runsFromServerToRepo}`);

console.log('');
console.log('🎯 RECOMMENDATION:');
console.log(`Use repo-root-based path: ${runsDir2}`);
console.log('This ensures consistent artifact location regardless of execution context.');
