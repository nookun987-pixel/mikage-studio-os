import {
  orchestrationRequestSchema
} from '@mikage/contracts';
import { 
  executeGenerationPipeline,
  orchestrationChainRequestShellSchema
} from '@mikage/runtime-orchestration-boundary';

const mvpOrchestrationRequest = orchestrationRequestSchema.parse({
  requestCode: 'mvp_job_001',
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
      packetCode: 'ctx_world_mvp_001'
    },
    {
      packetKind: 'state_snapshot',
      packetCode: 'ctx_state_mvp_001',
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
    tags: ['mvp', 'demo']
  },
  metadata: {
    initiatedBy: 'run-mvp-job'
  }
});

const chainRequest = orchestrationChainRequestShellSchema.parse({
  commandType: 'execute_generation_pipeline',
  request: mvpOrchestrationRequest,
  compileProfile: {
    compileMode: 'production_prompt',
    systemFrame: 'You are a cinematic visual generation system specializing in Japanese aesthetic integrity.',
    canonConstraints: [
      'Maintain imperial Japanese visual standards',
      'Preserve White Monolith environmental authority',
      'No Neo-Tokyo clutter in imperial contexts',
      'Follow canon-compliant character representations'
    ],
    contextSummaries: [
      'World context: Neo-Tokyo rooftop confrontation during storm',
      'Character state: Mikage in damaged but determined stance'
    ],
    fragmentSummaries: [
      'Environment: Rain-slicked rooftop with neon reflections',
      'Character: Traditional Japanese clothing with modern battle damage'
    ],
    modeInstructions: [
      'Generate cinematic portrait with dramatic lighting',
      'Emphasize emotional tension and character determination',
      'Maintain cultural authenticity throughout composition'
    ],
    outputInstructions: [
      'High detail, 9:16 aspect ratio',
      'Cinematic color grading with blue and amber tones',
      'Dynamic weather effects (rain, wind)'
    ],
    negativeClauses: [
      'modern weapons',
      'western clothing styles',
      'inappropriate content',
      'anachronistic technology'
    ]
  },
  validationProfile: {
    ontologyRequiredTerms: ['mikage'],
    ontologyProhibitedTerms: [],
    ontologyAdvisoryTerms: ['japanese', 'cinematic'],
    invariantRequiredTerms: [],
    invariantProhibitedTerms: [],
    invariantAdvisoryTerms: ['canon'],
    philosophicalRequiredTerms: [],
    philosophicalProhibitedTerms: [],
    philosophicalAdvisoryTerms: ['honor'],
    characterRequiredTerms: [],
    characterProhibitedTerms: [],
    characterAdvisoryTerms: ['leia'],
    visualRequiredTerms: [],
    visualProhibitedTerms: [],
    visualAdvisoryTerms: ['portrait'],
    driftRiskTerms: [],
    driftHardBlockTerms: []
  },
  benchmarkProfile: {
    goldReferenceTerms: ['mikage'],
    silverReferenceTerms: ['cinematic'],
    redBlockedTerms: []
  },
  studioProfile: {
    actionType: 'queue_generation',
    panelCode: 'production_queue',
    panelTitle: 'Production Queue',
    viewCode: 'studio_queue_view',
    filterCode: 'mvp_jobs',
    filterTerms: ['mvp', 'demo', 'mikage']
  }
});

console.log('🚀 Starting MVP Job Execution...');
console.log(`Request Code: ${mvpOrchestrationRequest.requestCode}`);
console.log(`Preset/Variant: ${mvpOrchestrationRequest.presetCode}/${mvpOrchestrationRequest.variantCode}`);
console.log(`Provider: ${mvpOrchestrationRequest.providerCode}`);
console.log(`Output Count: ${mvpOrchestrationRequest.outputCount}`);
console.log('');

try {
  const result = executeGenerationPipeline(chainRequest);
  
  console.log('✅ Pipeline Execution Completed');
  console.log(`Final Status: ${result.finalStatus}`);
  console.log(`Package Code: ${result.packageCode || 'None'}`);
  console.log(`Validation Decision: ${result.validationDecision}`);
  console.log(`Benchmark Decision: ${result.benchmarkDecision || 'None'}`);
  console.log(`Ingestion Code: ${result.ingestionCode || 'None'}`);
  console.log(`Persistence Code: ${result.persistenceCode || 'None'}`);
  console.log(`Studio Action: ${result.studioActionType || 'None'}`);
  console.log('');
  
  console.log('📊 Execution Steps:');
  result.executedSteps.forEach((step: { step: string; status: string; detail: string }, index: number) => {
    const status = step.status === 'completed' ? '✅' : step.status === 'stopped' ? '⏹️' : '⚠️';
    console.log(`${index + 1}. ${status} ${step.step}: ${step.detail}`);
  });
  
  if (result.finalStatus === 'completed') {
    console.log('');
    console.log('🎉 MVP job successfully completed the full generation pipeline!');
  } else {
    console.log('');
    console.log(`⚠️ MVP job stopped at: ${result.finalStatus}`);
  }
  
} catch (error) {
  console.error('❌ Pipeline execution failed:', error);
  process.exit(1);
}
