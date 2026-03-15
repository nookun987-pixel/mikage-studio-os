import { existsSync } from 'node:fs';

import { buildDeploymentPackage } from '../packages/deployment-packaging/src/index.ts';
import { createLocalRuntimeConfig } from '../packages/runtime-config-layer/src/index.ts';

const composePath = 'D:\\mikage-studio-os\\infra\\compose\\docker-compose.production.yml';
const main = async () => {
  const deploymentPackage = buildDeploymentPackage({
    packageCode: 'deploy_layer54_001',
    runtimeConfig: createLocalRuntimeConfig({
      workspaceRoot: 'D:\\mikage-studio-os',
      port: 43154
    })
  });

  console.log(
    JSON.stringify(
      {
        packageCode: deploymentPackage.packageCode,
        runtimeService: deploymentPackage.services[0]?.serviceCode ?? null,
        workerService: deploymentPackage.services[1]?.serviceCode ?? null,
        fallbackCount: deploymentPackage.localFallbackAdapters.length,
        composeExists: existsSync(composePath)
      },
      null,
      2
    )
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
