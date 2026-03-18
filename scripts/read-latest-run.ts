#!/usr/bin/env tsx

/**
 * Run Retrieval Scripts for Mikage Studio OS
 * 
 * Scripts to read and display pipeline execution artifacts
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Import the result packager (we need to replicate this logic since it's in the orchestration service)
const RUNS_DIR = 'runs';

/**
 * Read the latest run summary
 */
function readLatestRun(): void {
  console.log('📖 Reading Latest Run Summary');
  console.log('='.repeat(40));

  if (!existsSync(RUNS_DIR)) {
    console.log('❌ No runs directory found. No executions have been recorded yet.');
    console.log('💡 Run a pipeline execution first to create artifacts.');
    process.exit(1);
  }

  try {
    const fs = require('fs');
    const runs = fs.readdirSync(RUNS_DIR)
      .filter((name: string) => !name.startsWith('.'))
      .map((name: string) => ({
        name,
        path: join(RUNS_DIR, name),
        stat: fs.statSync(join(RUNS_DIR, name))
      }))
      .filter((run: any) => run.stat.isDirectory())
      .sort((a: any, b: any) => b.stat.mtime.getTime() - a.stat.mtime.getTime());

    if (runs.length === 0) {
      console.log('❌ No run directories found.');
      process.exit(1);
    }

    const latestRun = runs[0];
    const summaryPath = join(latestRun.path, 'summary.txt');
    
    if (!existsSync(summaryPath)) {
      console.log(`❌ Summary file not found: ${summaryPath}`);
      process.exit(1);
    }

    const summary = readFileSync(summaryPath, 'utf-8');
    console.log(summary);
    console.log('');
    console.log(`📁 Full artifact path: ${latestRun.path}`);
    console.log('📄 Available files:');
    
    const files = fs.readdirSync(latestRun.path);
    files.forEach((file: string) => {
      console.log(`   - ${file}`);
    });

  } catch (error) {
    console.error('❌ Failed to read latest run:', error);
    process.exit(1);
  }
}

/**
 * List all available runs
 */
function listRuns(): void {
  console.log('📋 Available Pipeline Runs');
  console.log('='.repeat(40));

  if (!existsSync(RUNS_DIR)) {
    console.log('❌ No runs directory found.');
    process.exit(1);
  }

  try {
    const fs = require('fs');
    const runs = fs.readdirSync(RUNS_DIR)
      .filter((name: string) => !name.startsWith('.'))
      .map((name: string) => ({
        requestCode: name,
        path: join(RUNS_DIR, name),
        modified: fs.statSync(join(RUNS_DIR, name)).mtime
      }))
      .filter((run: any) => existsSync(run.path) && fs.statSync(run.path).isDirectory())
      .sort((a: any, b: any) => b.modified.getTime() - a.modified.getTime());

    if (runs.length === 0) {
      console.log('❌ No run directories found.');
      process.exit(1);
    }

    console.log(`Found ${runs.length} run(s):`);
    console.log('');
    
    runs.forEach((run: any, index: number) => {
      const isLatest = index === 0;
      const marker = isLatest ? '🔥' : '  ';
      console.log(`${marker} ${run.requestCode}`);
      console.log(`   Path: ${run.path}`);
      console.log(`   Modified: ${run.modified.toISOString()}`);
      
      // Try to read the result from summary
      const summaryPath = join(run.path, 'summary.txt');
      if (existsSync(summaryPath)) {
        try {
          const summary = readFileSync(summaryPath, 'utf-8');
          const resultLine = summary.split('\n').find((line: string) => line.startsWith('RESULT:'));
          if (resultLine) {
            console.log(`   ${resultLine}`);
          }
        } catch (e) {
          // Ignore summary read errors
        }
      }
      console.log('');
    });

  } catch (error) {
    console.error('❌ Failed to list runs:', error);
    process.exit(1);
  }
}

/**
 * Show detailed info about a specific run
 */
function showRunDetails(requestCode: string): void {
  console.log(`🔍 Run Details: ${requestCode}`);
  console.log('='.repeat(40));

  const runPath = join(RUNS_DIR, requestCode);
  
  if (!existsSync(runPath)) {
    console.log(`❌ Run directory not found: ${runPath}`);
    process.exit(1);
  }

  try {
    const fs = require('fs');
    
    // Show summary
    const summaryPath = join(runPath, 'summary.txt');
    if (existsSync(summaryPath)) {
      const summary = readFileSync(summaryPath, 'utf-8');
      console.log(summary);
    } else {
      console.log('❌ Summary file not found.');
    }

    console.log('');
    console.log('📁 Available Artifacts:');
    
    const files = fs.readdirSync(runPath);
    files.forEach((file: string) => {
      const filePath = join(runPath, file);
      const stat = fs.statSync(filePath);
      const size = stat.isFile() ? ` (${stat.size} bytes)` : ' (directory)';
      console.log(`   - ${file}${size}`);
    });

  } catch (error) {
    console.error('❌ Failed to read run details:', error);
    process.exit(1);
  }
}

// Main execution
function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'latest':
      readLatestRun();
      break;
      
    case 'list':
      listRuns();
      break;
      
    case 'show':
      if (!args[1]) {
        console.error('❌ Please provide a request code: tsx scripts/read-latest-run.ts show <requestCode>');
        process.exit(1);
      }
      showRunDetails(args[1]);
      break;
      
    default:
      console.log('📖 Mikage Studio OS - Run Retrieval');
      console.log('='.repeat(40));
      console.log('');
      console.log('Usage:');
      console.log('  tsx scripts/read-latest-run.ts latest    # Show latest run summary');
      console.log('  tsx scripts/read-latest-run.ts list      # List all available runs');
      console.log('  tsx scripts/read-latest-run.ts show <id> # Show details for specific run');
      console.log('');
      console.log('Examples:');
      console.log('  pnpm run:latest');
      console.log('  pnpm run:list');
      console.log('  pnpm run:show smoke_e2e_001');
      break;
  }
}

main();
