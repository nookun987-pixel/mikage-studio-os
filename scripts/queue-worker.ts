#!/usr/bin/env tsx

/**
 * Queue Worker for Mikage Studio OS
 * 
 * Processes jobs from the file system queue
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { exec } from 'node:child_process';

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
 * Load queue from file
 */
function loadQueue(): Queue {
  const queuePath = 'queue.json';
  
  if (!existsSync(queuePath)) {
    console.log('📋 Queue file not found, creating empty queue');
    return {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      jobs: []
    };
  }
  
  try {
    const queueData = readFileSync(queuePath, 'utf-8');
    const queue = JSON.parse(queueData) as Queue;
    return queue;
  } catch (error) {
    console.error('❌ Failed to load queue:', error);
    process.exit(1);
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
 * Find next pending job
 */
function findNextJob(queue: Queue): QueueJob | null {
  return queue.jobs.find(job => job.status === 'pending') || null;
}

/**
 * Update job status
 */
function updateJobStatus(queue: Queue, jobId: string, status: QueueJob['status'], data?: any): void {
  const job = queue.jobs.find(j => j.id === jobId);
  if (!job) {
    console.error(`❌ Job ${jobId} not found`);
    return;
  }
  
  job.status = status;
  
  if (status === 'running') {
    job.startedAt = new Date().toISOString();
  } else if (status === 'completed' || status === 'failed') {
    job.completedAt = new Date().toISOString();
  }
  
  if (data) {
    if (status === 'completed') {
      job.result = data;
    } else if (status === 'failed') {
      job.error = data;
    }
  }
}

/**
 * Execute operator:run command
 */
function executeOperatorRun(preset: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Executing: pnpm operator:run --preset ${preset}`);
    
    exec(`pnpm operator:run --preset ${preset}`, {
      cwd: process.cwd()
    }, (execError, stdout, stderr) => {
      if (execError) {
        reject(execError);
        return;
      }
      
      // Parse output to extract result
      const output = stdout.toString();
      const lines = output.split('\n');
      
      // Look for result information
      let result = null;
      let error = null;
      
      for (const line of lines) {
        if (line.includes('Request Code:')) {
          const requestCode = line.split('Request Code:')[1]?.trim();
          if (requestCode) {
            result = { requestCode };
          }
        }
        
        if (line.includes('Result:')) {
          const resultLabel = line.split('Result:')[1]?.trim();
          if (resultLabel && result) {
            result.resultLabel = resultLabel as 'PASS' | 'REJECTED' | 'FAIL';
          }
        }
        
        if (line.includes('Validation:')) {
          const validationDecision = line.split('Validation:')[1]?.trim();
          if (validationDecision && result) {
            result.validationDecision = validationDecision;
          }
        }
        
        if (line.includes('Status:')) {
          const status = line.split('Status:')[1]?.trim();
          if (status && result) {
            result.status = status;
          }
        }
        
        if (line.includes('Run Folder:')) {
          const runPath = line.split('Run Folder:')[1]?.trim();
          if (runPath && result) {
            result.runPath = runPath;
          }
        }
        
        if (line.includes('OPERATOR RESULT: FAIL')) {
          error = 'Execution failed';
        }
      }
      
      if (error) {
        reject(new Error(error));
      } else if (result && result.requestCode) {
        resolve(result);
      } else {
        reject(new Error('Could not parse execution result'));
      }
    });
  });
}

/**
 * Print queue status
 */
function printQueueStatus(queue: Queue): void {
  const total = queue.jobs.length;
  const pending = queue.jobs.filter(j => j.status === 'pending').length;
  const running = queue.jobs.filter(j => j.status === 'running').length;
  const completed = queue.jobs.filter(j => j.status === 'completed').length;
  const failed = queue.jobs.filter(j => j.status === 'failed').length;
  
  console.log('📊 Queue Status:');
  console.log(`Total jobs: ${total}`);
  console.log(`Pending: ${pending}`);
  console.log(`Running: ${running}`);
  console.log(`Completed: ${completed}`);
  console.log(`Failed: ${failed}`);
}

/**
 * Main worker loop
 */
async function workerLoop(): Promise<void> {
  console.log('🔄 MIKAGE STUDIO OS - QUEUE WORKER');
  console.log('='.repeat(60));
  console.log('Starting worker loop...');
  console.log('Press Ctrl+C to stop');
  console.log('');
  
  while (true) {
    try {
      // Load queue
      const queue = loadQueue();
      
      // Find next job
      const job = findNextJob(queue);
      
      if (!job) {
        console.log('💤 No pending jobs. Sleeping for 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }
      
      console.log(`📋 Found job: ${job.id} (preset: ${job.preset})`);
      
      // Mark job as running
      updateJobStatus(queue, job.id, 'running');
      saveQueue(queue);
      
      try {
        // Execute the job
        const result = await executeOperatorRun(job.preset);
        
        // Mark job as completed
        updateJobStatus(queue, job.id, 'completed', result);
        saveQueue(queue);
        
        console.log(`✅ Job completed: ${job.id}`);
        console.log(`   Request Code: ${result.requestCode}`);
        console.log(`   Result: ${result.resultLabel}`);
        console.log(`   Run Path: ${result.runPath}`);
        
      } catch (error) {
        // Mark job as failed
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        updateJobStatus(queue, job.id, 'failed', errorMessage);
        saveQueue(queue);
        
        console.log(`❌ Job failed: ${job.id}`);
        console.log(`   Error: ${errorMessage}`);
      }
      
      // Print queue status
      printQueueStatus(queue);
      console.log('');
      
      // Small delay between jobs
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('❌ Worker error:', error);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Worker stopped by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Worker terminated');
  process.exit(0);
});

// Start the worker loop
workerLoop().catch(error => {
  console.error('❌ Worker failed to start:', error);
  process.exit(1);
});
