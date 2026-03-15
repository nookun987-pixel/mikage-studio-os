import { runtimeConfigSchema } from '@mikage/runtime-config-layer';

import { deploymentPackageSchema } from './contracts.js';

export const buildDeploymentPackage = (rawInput: {
  packageCode: string;
  runtimeConfig: Parameters<typeof runtimeConfigSchema.parse>[0];
}) => {
  const runtimeConfig = runtimeConfigSchema.parse(rawInput.runtimeConfig);

  return deploymentPackageSchema.parse({
    packageCode: rawInput.packageCode,
    runtimeConfig,
    services: [
      {
        serviceCode: 'runtime_service_host',
        packageName: '@mikage/runtime-service-host',
        command: ['pnpm', 'tsx', 'scripts/run-runtime-service-host.ts'],
        env: {
          MIKAGE_HOST: runtimeConfig.host.host,
          MIKAGE_PORT: String(runtimeConfig.host.port),
          MIKAGE_RUNTIME_ROOT: runtimeConfig.storage.rootPath
        },
        mounts: [runtimeConfig.storage.rootPath]
      },
      {
        serviceCode: 'worker_runtime_host',
        packageName: '@mikage/worker-runtime-host',
        command: ['pnpm', 'tsx', 'scripts/run-worker-runtime-host.ts'],
        env: {
          MIKAGE_RUNTIME_ROOT: runtimeConfig.storage.rootPath,
          MIKAGE_QUEUE_FILE: runtimeConfig.storage.queueFilePath
        },
        mounts: [runtimeConfig.storage.rootPath]
      }
    ],
    localFallbackAdapters: [
      '@mikage/runtime-session-store',
      '@mikage/runtime-job-queue-adapter',
      '@mikage/runtime-memory-adapters'
    ]
  });
};
