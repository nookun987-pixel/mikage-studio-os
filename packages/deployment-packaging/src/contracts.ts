import { z } from 'zod';

import { runtimeConfigSchema } from '@mikage/runtime-config-layer';

export const deploymentServiceSchema = z.object({
  serviceCode: z.enum(['runtime_service_host', 'worker_runtime_host']),
  packageName: z.string().min(1),
  command: z.array(z.string().min(1)).min(1),
  env: z.record(z.string(), z.string()),
  mounts: z.array(z.string().min(1))
});

export const deploymentPackageSchema = z.object({
  packageCode: z.string().min(1),
  runtimeConfig: runtimeConfigSchema,
  services: z.array(deploymentServiceSchema).length(2),
  localFallbackAdapters: z.array(z.string().min(1)).min(1)
});
