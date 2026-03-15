import { createRuntimeMemoryAdapters } from '../packages/runtime-memory-adapters/src/index.ts';
import { buildBenchmarkSummaryProjection } from '../packages/persistence-read-port/src/index.ts';
import { dispatchStudioRoute } from '../packages/studio-api-route-adapter/src/index.ts';
import { dispatchStudioJob } from '../packages/studio-job-orchestration/src/index.ts';
import { runStudioSessionApplication } from '../packages/studio-session-application/src/index.ts';

const memory = createRuntimeMemoryAdapters();

memory.saveRoute(
  'studio_query_route',
  dispatchStudioRoute({
    routeCode: 'studio_query_route',
    input: {
      operation: 'package_summary_lookup',
      recordCode: 'pkg_memory_001'
    }
  })
);

memory.saveJob(
  'job_memory_persistence_001',
  dispatchStudioJob({
    jobCode: 'job_memory_persistence_001',
    jobType: 'persistence_review_job',
    input: {
      items: [
        {
          itemCode: 'memory_persistence_review_item',
          category: 'persistence_review',
          title: 'Persistence Review',
          targetCode: 'persist_memory_001',
          sortKey: '1_memory',
          status: 'ready',
          metadata: {}
        }
      ],
      summary: {
        totalItems: 1,
        categories: ['persistence_review']
      }
    }
  })
);

memory.saveSession(
  'session_memory_001',
  runStudioSessionApplication({
    sessionCode: 'session_memory_001',
    worklistRequest: {
      benchmarkSummary: buildBenchmarkSummaryProjection('pkg_memory_001')
    }
  })
);

console.log(JSON.stringify(memory.snapshot(), null, 2));
