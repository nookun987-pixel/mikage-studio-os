import { z } from 'zod';

import {
  boundaryMetadataSchema,
  boundaryStatusSchema,
  packetRefSchema
} from '../core/index.js';

export const canonQueryModeSchema = z.enum([
  'disabled',
  'advisory',
  'blocking'
]);

export const sceneBuilderModeSchema = z.enum([
  'canonical_only',
  'scene_seeded',
  'scene_locked'
]);

export const scriptBuilderModeSchema = z.enum([
  'disabled',
  'outline_only',
  'full_script'
]);

export const productionPackageModeSchema = z.enum([
  'prompt_pack_only',
  'production_shell',
  'benchmark_audit_shell'
]);

export const contextPacketReferenceSchema = packetRefSchema.extend({
  packetKind: z.enum(['world_context', 'state_snapshot', 'canon_report'])
});

export const benchmarkAuditRequestShellSchema = z.object({
  benchmarkSetCodes: z.array(z.string().min(1)).default([]),
  auditProfileCode: z.string().min(1).optional(),
  requireLineageAudit: z.boolean().default(true),
  requireBenchmarkPass: z.boolean().default(false),
  tags: z.array(z.string().min(1)).default([])
});

export const orchestrationRequestSchema = z.object({
  requestCode: z.string().min(1),
  projectSlug: z.string().min(1),
  characterCode: z.string().min(1),
  anchorCode: z.string().min(1),
  presetCode: z.string().min(1),
  variantCode: z.string().min(1),
  sceneCode: z.string().min(1),
  shotCode: z.string().min(1),
  providerCode: z.string().min(1),
  outputCount: z.coerce.number().int().positive(),
  contextPackets: z.array(contextPacketReferenceSchema).default([]),
  canonQueryMode: canonQueryModeSchema.default('blocking'),
  sceneBuilderMode: sceneBuilderModeSchema.default('scene_seeded'),
  scriptBuilderMode: scriptBuilderModeSchema.default('outline_only'),
  productionPackageMode: productionPackageModeSchema.default('production_shell'),
  benchmarkAudit: benchmarkAuditRequestShellSchema.default({}),
  metadata: boundaryMetadataSchema
});

export const orchestrationRequestAcceptedResponseSchema = z.object({
  requestCode: z.string().min(1),
  status: boundaryStatusSchema,
  acceptedAt: z.string().datetime(),
  boundaryPacket: packetRefSchema.extend({
    packetKind: z.literal('orchestration_request')
  }),
  downstreamPackets: z.array(packetRefSchema).default([]),
  metadata: boundaryMetadataSchema
});

export const cinematicJobRequestSchema = orchestrationRequestSchema.pick({
  projectSlug: true,
  characterCode: true,
  anchorCode: true,
  presetCode: true,
  variantCode: true,
  sceneCode: true,
  shotCode: true,
  providerCode: true,
  outputCount: true
});

export type CanonQueryMode = z.infer<typeof canonQueryModeSchema>;
export type SceneBuilderMode = z.infer<typeof sceneBuilderModeSchema>;
export type ScriptBuilderMode = z.infer<typeof scriptBuilderModeSchema>;
export type ProductionPackageMode = z.infer<typeof productionPackageModeSchema>;
export type ContextPacketReference = z.infer<typeof contextPacketReferenceSchema>;
export type BenchmarkAuditRequestShell = z.infer<
  typeof benchmarkAuditRequestShellSchema
>;
export type OrchestrationRequest = z.infer<typeof orchestrationRequestSchema>;
export type OrchestrationRequestAcceptedResponse = z.infer<
  typeof orchestrationRequestAcceptedResponseSchema
>;
