import {
  benchmarkRequestSchema,
  canonValidationRequestSchema,
  orchestrationRequestAcceptedResponseSchema,
  orchestrationRequestSchema
} from '@mikage/contracts';

const orchestrationRequest = orchestrationRequestSchema.parse({
  requestCode: 'req_layer3_smoke_001',
  projectSlug: 'mikage',
  characterCode: 'char_mikage',
  anchorCode: 'anchor_leia_041',
  presetCode: 'mikage_cinematic_portrait',
  variantCode: 'storm_rooftop_action',
  sceneCode: 'scene_rooftop_confrontation',
  shotCode: 'shot_low_angle_heroic_damaged_stillness',
  providerCode: 'mock_image_provider',
  outputCount: 4,
  contextPackets: [
    {
      packetKind: 'world_context',
      packetCode: 'ctx_world_001'
    },
    {
      packetKind: 'state_snapshot',
      packetCode: 'ctx_state_001',
      packetVersion: 2
    }
  ],
  canonQueryMode: 'blocking',
  sceneBuilderMode: 'scene_seeded',
  scriptBuilderMode: 'outline_only',
  productionPackageMode: 'benchmark_audit_shell',
  benchmarkAudit: {
    benchmarkSetCodes: ['gold_visual_dna'],
    auditProfileCode: 'audit_default',
    requireLineageAudit: true,
    requireBenchmarkPass: false,
    tags: ['layer3', 'smoke']
  },
  metadata: {
    initiatedBy: 'smoke-layer3'
  }
});

const canonRequest = canonValidationRequestSchema.parse({
  promptPackCode: 'pp_layer3_001',
  queryMode: orchestrationRequest.canonQueryMode
});

const benchmarkShell = benchmarkRequestSchema.parse({
  assetCode: 'asset_smoke_001',
  benchmarkSetCodes: orchestrationRequest.benchmarkAudit.benchmarkSetCodes,
  includeAuditShell: true
});

const acceptedResponse = orchestrationRequestAcceptedResponseSchema.parse({
  requestCode: orchestrationRequest.requestCode,
  status: 'validated',
  acceptedAt: new Date('2026-03-15T00:00:00.000Z').toISOString(),
  boundaryPacket: {
    packetKind: 'orchestration_request',
    packetCode: orchestrationRequest.requestCode,
    packetVersion: 1
  },
  downstreamPackets: [
    ...orchestrationRequest.contextPackets,
    {
      packetKind: 'benchmark_audit',
      packetCode: 'audit_shell_001',
      packetVersion: 1
    }
  ],
  metadata: {
    benchmarkShell,
    canonRequest
  }
});

console.log(
  JSON.stringify(
    {
      requestCode: orchestrationRequest.requestCode,
      contextPacketCount: orchestrationRequest.contextPackets.length,
      canonQueryMode: canonRequest.queryMode,
      productionPackageMode: orchestrationRequest.productionPackageMode,
      acceptedStatus: acceptedResponse.status
    },
    null,
    2
  )
);
