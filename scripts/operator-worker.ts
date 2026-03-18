#!/usr/bin/env tsx

/**
 * Simple Worker Loop for Mikage Studio OS
 * 
 * Auto-processes jobs from queue.json without manual intervention
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { exec } from 'node:child_process';

interface QueueJob {
  id: string;
  preset: string;
  status: 'pending' | 'running' | 'done' | 'failed';
}

interface Queue {
  jobs: QueueJob[];
}

/**
 * Load queue from file
 */
function loadQueue(): Queue {
  const queuePath = 'queue.json';
  
  if (!existsSync(queuePath)) {
    return { jobs: [] };
  }
  
  try {
    const queueData = readFileSync(queuePath, 'utf-8');
    return JSON.parse(queueData);
  } catch (error) {
    console.log('[WORKER] Failed to load queue, starting fresh');
    return { jobs: [] };
  }
}

/**
 * Save queue to file
 */
function saveQueue(queue: Queue): void {
  const queuePath = 'queue.json';
  
  try {
    writeFileSync(queuePath, JSON.stringify(queue, null, 2));
  } catch (error) {
    console.log('[WORKER] Failed to save queue:', error);
  }
}

/**
 * Find first pending job
 */
function findPendingJob(queue: Queue): QueueJob | null {
  return queue.jobs.find(job => job.status === 'pending') || null;
}

/**
 * Update job status
 */
function updateJobStatus(queue: Queue, jobId: string, status: QueueJob['status']): void {
  const job = queue.jobs.find(j => j.id === jobId);
  if (job) {
    job.status = status;
  }
}

/**
 * Execute operator:run command
 */
function executeOperatorRun(preset: string): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`[WORKER] Executing: pnpm operator:run --preset ${preset}`);
    
    exec(`pnpm operator:run --preset ${preset}`, {
      cwd: process.cwd()
    }, (error, stdout, stderr) => {
      if (error) {
        // On Windows, Node.js assertion errors can occur even when execution succeeds
        // Check if the actual operation succeeded despite the error
        const output = stdout.toString();
        const hasSuccessResult = output.includes('OPERATOR RESULT: PASS') || 
                               output.includes('OPERATOR RESULT: REJECTED');
        
        if (hasSuccessResult) {
          console.log(`[WORKER] Command completed despite Windows assertion`);
          resolve(true);
          return;
        }
        
        console.log(`[WORKER] Command failed: ${error.message}`);
        resolve(false);
        return;
      }
      
      // Check if execution was successful
      const output = stdout.toString();
      const success = output.includes('OPERATOR RESULT: PASS') || 
                     output.includes('OPERATOR RESULT: REJECTED');
      
      if (success) {
        console.log(`[WORKER] Execution successful`);
      } else {
        console.log(`[WORKER] Execution output:`, output.substring(0, 200));
      }
      
      resolve(success);
    });
  });
}

/**
 * Main worker loop
 */
async function workerLoop(): Promise<void> {
  console.log('[WORKER] started');
  
  while (true) {
    try {
      // Load queue
      const queue = loadQueue();
      
      // Find pending job
      const job = findPendingJob(queue);
      
      if (!job) {
        console.log('[WORKER] idle...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }
      
      // Mark as running
      console.log(`[WORKER] running job: ${job.id} (preset: ${job.preset})`);
      updateJobStatus(queue, job.id, 'running');
      saveQueue(queue);
      
      // Execute the job
      const success = await executeOperatorRun(job.preset);
      
      // Update status based on result
      if (success) {
        updateJobStatus(queue, job.id, 'done');
        console.log(`[WORKER] done: ${job.id}`);
      } else {
        updateJobStatus(queue, job.id, 'failed');
        console.log(`[WORKER] failed: ${job.id}`);
      }
      
      // Save queue
      saveQueue(queue);
      
      // Wait before next job
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.log('[WORKER] Error in loop:', error);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('[WORKER] stopped');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('[WORKER] stopped');
  process.exit(0);
});

// Start the worker loop
workerLoop().catch(error => {
  console.log('[WORKER] Failed to start:', error);
  process.exit(1);
});
