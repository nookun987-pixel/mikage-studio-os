import { createLocalRuntimeConfig, mergeRuntimeConfig } from '../packages/runtime-config-layer/src/index.ts';

const base = createLocalRuntimeConfig({
  workspaceRoot: 'D:\\mikage-studio-os',
  port: 43143
});
const merged = mergeRuntimeConfig(base, {
  queue: {
    synchronousFallback: true
  }
});

console.log(
  JSON.stringify(
    {
      host: merged.host,
      sessionsFilePath: merged.storage.sessionsFilePath,
      queueFilePath: merged.storage.queueFilePath,
      logsFilePath: merged.storage.logsFilePath,
      diagnostics: merged.diagnostics
    },
    null,
    2
  )
);
