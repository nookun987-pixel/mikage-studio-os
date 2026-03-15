import { executeStudioQuery } from '../packages/studio-query-boundary/src/index.ts';

const packageSummary = executeStudioQuery({
  operation: 'package_summary_lookup',
  recordCode: 'pkg_read_port_happy_001'
});

const lineageSummary = executeStudioQuery({
  operation: 'lineage_summary_lookup',
  recordCode: 'persist_read_port_happy_001_persist_ing_read_port_happy_001_ingest_pkg_read_port_happy_001'
});

const missingRecord = executeStudioQuery({
  operation: 'benchmark_summary_lookup',
  recordCode: 'missing_record_001'
});

console.log(
  JSON.stringify(
    {
      packageSummary: packageSummary.summary,
      lineageSummary: lineageSummary.summary,
      missingRecord: missingRecord.summary
    },
    null,
    2
  )
);
