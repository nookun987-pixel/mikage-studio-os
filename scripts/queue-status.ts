#!/usr/bin/env tsx

/**
 * Queue Status Command for Mikage Studio OS
 * 
 * Shows current queue status and job details
 */

import { readFileSync, existsSync } from 'node:fs';

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
function loadQueue(): Queue | null {
  const queuePath = 'queue.json';
  
  if (!existsSync(queuePath)) {
    console.log('📋 Queue file not found');
    return null;
  }
  
  try {
    const queueData = readFileSync(queuePath, 'utf-8');
    return JSON.parse(queueData) as Queue;
  } catch (error) {
    console.error('❌ Failed to load queue:', error);
    return null;
  }
}

/**
 * Format timestamp
 */
function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * Format duration
 */
function formatDuration(start: string, end?: string): string {
  const startTime = new Date(start).getTime();
  const endTime = end ? new Date(end).getTime() : Date.now();
  const duration = endTime - startTime;
  
  if (duration < 1000) {
    return `${duration}ms`;
  } else if (duration < 60000) {
    return `${(duration / 1000).toFixed(1)}s`;
  } else {
    return `${(duration / 60000).toFixed(1)}m`;
  }
}

/**
 * Get status icon
 */
function getStatusIcon(status: QueueJob['status']): string {
  switch (status) {
    case 'pending': return '⏳';
    case 'running': return '🔄';
    case 'completed': return '✅';
    case 'failed': return '❌';
    default: return '❓';
  }
}

/**
 * Print job details
 */
function printJobDetails(job: QueueJob, showAll: boolean = false): void {
  const icon = getStatusIcon(job.status);
  const duration = job.startedAt ? formatDuration(job.startedAt, job.completedAt) : 'N/A';
  
  console.log(`${icon} ${job.id}`);
  console.log(`   Preset: ${job.preset}`);
  console.log(`   Status: ${job.status}`);
  console.log(`   Created: ${formatTimestamp(job.createdAt)}`);
  
  if (job.startedAt) {
    console.log(`   Started: ${formatTimestamp(job.startedAt)}`);
    console.log(`   Duration: ${duration}`);
  }
  
  if (job.completedAt) {
    console.log(`   Completed: ${formatTimestamp(job.completedAt)}`);
  }
  
  if (job.result) {
    console.log(`   Result: ${job.result.resultLabel}`);
    console.log(`   Request Code: ${job.result.requestCode}`);
    console.log(`   Run Path: ${job.result.runPath}`);
  }
  
  if (job.error) {
    console.log(`   Error: ${job.error}`);
  }
  
  console.log('');
}

/**
 * Main status function
 */
function main(): void {
  console.log('📊 MIKAGE STUDIO OS - QUEUE STATUS');
  console.log('='.repeat(60));
  
  const queue = loadQueue();
  
  if (!queue) {
    console.log('No queue found. Run "pnpm operator:enqueue --preset <name>" to add jobs.');
    return;
  }
  
  console.log(`Queue Version: ${queue.version}`);
  console.log(`Last Updated: ${formatTimestamp(queue.lastUpdated)}`);
  console.log('');
  
  // Count jobs by status
  const total = queue.jobs.length;
  const pending = queue.jobs.filter(j => j.status === 'pending').length;
  const running = queue.jobs.filter(j => j.status === 'running').length;
  const completed = queue.jobs.filter(j => j.status === 'completed').length;
  const failed = queue.jobs.filter(j => j.status === 'failed').length;
  
  console.log('📈 Summary:');
  console.log(`Total Jobs: ${total}`);
  console.log(`⏳ Pending: ${pending}`);
  console.log(`🔄 Running: ${running}`);
  console.log(`✅ Completed: ${completed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('');
  
  if (total === 0) {
    console.log('Queue is empty.');
    return;
  }
  
  // Show recent jobs
  const recentJobs = queue.jobs.slice(-10).reverse(); // Last 10 jobs, newest first
  
  console.log('📋 Recent Jobs (Last 10):');
  console.log('');
  
  recentJobs.forEach(job => {
    printJobDetails(job);
  });
  
  if (total > 10) {
    console.log(`... and ${total - 10} older jobs`);
  }
}

// Run the status function
main();
