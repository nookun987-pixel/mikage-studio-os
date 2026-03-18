#!/usr/bin/env tsx

/**
 * Operator Enqueue Command for Mikage Studio OS
 * 
 * Adds preset jobs to the file system queue
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

interface QueueJob {
  id: string;
  preset: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  result?: {
    requestCode: string;
    resultLabel: 'PASS' | 'REJECTED' | 'FAIL';
    validationDecision: string;
    status: string;
    runPath: string;
  };
  error?: string;
}

interface Queue {
  version: '1.0.0';
  lastUpdated: string;
  jobs: QueueJob[];
}

/**
 * Parse CLI arguments
 */
function parseArgs(): { preset: string } {
  const args = process.argv.slice(2);
  
  if (args.length !== 2 || args[0] !== '--preset') {
    console.error('Usage: pnpm operator:enqueue --preset <name>');
    process.exit(1);
  }
  
  const preset = args[1];
  if (!preset) {
    console.error('Error: --preset requires a value');
    process.exit(1);
  }
  
  return { preset };
}

/**
 * Load queue from file
 */
function loadQueue(): Queue {
  const queuePath = 'queue.json';
  
  if (!existsSync(queuePath)) {
    return {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      jobs: []
    };
  }
  
  try {
    const queueData = readFileSync(queuePath, 'utf-8');
    const queue = JSON.parse(queueData) as Queue;
    
    // Validate queue structure
    if (!queue.version || !Array.isArray(queue.jobs)) {
      console.warn('⚠️ Invalid queue structure, creating new queue');
      return {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        jobs: []
      };
    }
    
    return queue;
  } catch (error) {
    console.warn('⚠️ Failed to load queue, creating new queue:', error);
    return {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      jobs: []
    };
  }
}

/**
 * Save queue to file
 */
function saveQueue(queue: Queue): void {
  const queuePath = 'queue.json';
  
  try {
    queue.lastUpdated = new Date().toISOString();
    writeFileSync(queuePath, JSON.stringify(queue, null, 2));
  } catch (error) {
    console.error('❌ Failed to save queue:', error);
    process.exit(1);
  }
}

/**
 * Check if preset exists
 */
function checkPresetExists(preset: string): boolean {
  const presetPath = join('presets', `${preset}.json`);
  return existsSync(presetPath);
}

/**
 * Generate unique job ID
 */
function generateJobId(): string {
  return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Main enqueue function
 */
function main(): void {
  console.log('🎯 MIKAGE STUDIO OS - OPERATOR ENQUEUE');
  console.log('='.repeat(60));
  
  try {
    // Parse arguments
    const { preset } = parseArgs();
    
    // Check if preset exists
    if (!checkPresetExists(preset)) {
      console.error(`❌ Preset "${preset}" not found`);
      console.error('Available presets:');
      
      // List available presets
      const { readdirSync } = require('fs');
      const presetsDir = 'presets';
      if (existsSync(presetsDir)) {
        const files = readdirSync(presetsDir);
        const availablePresets = files
          .filter((file: string) => file.endsWith('.json'))
          .map((file: string) => file.replace('.json', ''));
        
        availablePresets.forEach(p => {
          console.error(`  - ${p}`);
        });
      }
      
      process.exit(1);
    }
    
    // Load queue
    const queue = loadQueue();
    
    // Create new job
    const job: QueueJob = {
      id: generateJobId(),
      preset,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Add to queue
    queue.jobs.push(job);
    
    // Save queue
    saveQueue(queue);
    
    console.log(`✅ Job enqueued successfully`);
    console.log(`Job ID: ${job.id}`);
    console.log(`Preset: ${preset}`);
    console.log(`Status: ${job.status}`);
    console.log(`Queue position: ${queue.jobs.length}`);
    console.log('');
    console.log('📋 Queue Summary:');
    console.log(`Total jobs: ${queue.jobs.length}`);
    console.log(`Pending jobs: ${queue.jobs.filter(j => j.status === 'pending').length}`);
    console.log(`Running jobs: ${queue.jobs.filter(j => j.status === 'running').length}`);
    console.log(`Completed jobs: ${queue.jobs.filter(j => j.status === 'completed').length}`);
    console.log(`Failed jobs: ${queue.jobs.filter(j => j.status === 'failed').length}`);
    
  } catch (error) {
    console.error('❌ Failed to enqueue job:', error);
    process.exit(1);
  }
}

// Run the enqueue function
main();
