Now I have everything needed. Let me produce the Phase 3 plan.Check IP governance patch for any additional canonical constraints on the rebuildCheck IP governance patch for any additional canonical constraints on the rebuildAll canonical sources read. Producing Phase 3.

PHASE 3 — INTEGRATION PLAN
Mikage Studio OS · Clean Rebuild
Date: 2026-03-15
Authority: IP Operating System project files only
Legacy sources: Read-only salvage mines — no legacy structure preserved
Canonical repo name: mikage

A. SALVAGE HOLDING LAYOUT
A temporary, read-only directory that sits adjacent to the new canonical repo. Nothing in this structure is ever imported directly — it is a reading room only. Every file here must be explicitly extracted and rewritten into the canonical repo.
mikage-salvage/
│
├── README.md                          ← describes holding purpose, Phase 2 audit ref, access rules
│
├── implementation/                    ← logic EXTRACT targets — read before writing canonical code
│   ├── generation/
│   │   ├── imagenService.mjs          ← ADOPT source (content verified — Phase 2 C5)
│   │   ├── assetSchema.mjs            ← read with imagenService
│   │   ├── assetStorage.mjs           ← read with imagenService
│   │   └── mikageGenerationProvider.mjs
│   ├── orchestration/
│   │   ├── mikageStudioWorkflow.js    ← highest-value workflow logic
│   │   ├── mikageStudioWorkflow.test.js
│   │   ├── mikageAgentOrchestrator.mjs
│   │   ├── studioWorkflowModel.js
│   │   ├── runState.js
│   │   ├── productionRouter.js
│   │   ├── intakeValidation.js
│   │   ├── renderReadiness.mjs
│   │   ├── renderErrors.mjs
│   │   └── mikageWorkflowStore.mjs    ← schema fields only, NOT persistence logic
│   ├── prompt/
│   │   ├── studioOsPromptCompiler.mjs ← read first (most evolved)
│   │   ├── studioPromptCompiler.mjs   ← diff against above
│   │   ├── promptCompilerService.mjs  ← read last (likely wrapper)
│   │   ├── studioVisualGrammarCompiler.mjs ← independent, no conflict
│   │   ├── promptCompiler.ts          ← TS version (src/studio/)
│   │   ├── promptCompiler.service.ts  ← TS version (services/)
│   │   ├── buildPromptPackage.js
│   │   ├── promptPayload.js
│   │   └── studioPresets.mjs
│   ├── canon/
│   │   ├── mikageAgentConstitution.mjs
│   │   └── mikageLawRegistry.mjs
│   ├── types/
│   │   ├── studio.ts                  ← central TS type definitions
│   │   ├── mikageRuntimeContract.mjs
│   │   └── studioMappers.ts
│   ├── persistence-reference/         ← schema ideas only, never run
│   │   ├── studioReceiptStore.mjs
│   │   ├── assetSchema.mjs
│   │   ├── auditStore.mjs
│   │   └── proofAssetPackStore.mjs
│   ├── observability/
│   │   ├── slaTracking.mjs
│   │   ├── queueAlertPolicy.mjs
│   │   ├── generationHealthSummary.mjs
│   │   ├── generationMetrics.mjs
│   │   └── generationTelemetryStore.mjs
│   └── ui/
│       ├── pages/
│       │   ├── ControlRoom.jsx
│       │   ├── Dashboard.jsx
│       │   ├── CanonGate.jsx
│       │   ├── ProofBoard.jsx
│       │   ├── JobDetail.jsx
│       │   ├── IntakeNew.jsx
│       │   ├── CanonAssetBrowser.jsx
│       │   └── StudioChief.jsx
│       ├── components/
│       │   ├── StatusPill.jsx
│       │   ├── MetricCard.jsx
│       │   ├── DetailPanel.jsx
│       │   ├── GalleryGrid.jsx
│       │   ├── SidebarNavItem.jsx
│       │   ├── SearchFilterRow.jsx
│       │   ├── MetadataChip.jsx
│       │   ├── PrimaryActionBar.jsx
│       │   ├── SectionHeader.jsx
│       │   ├── StudioWorkflowStrip.jsx
│       │   └── JobReceipt.tsx
│       └── state/
│           ├── studioStore.ts
│           └── studioMappers.test.ts
│
├── migrations-reference/              ← SQL schema reference — read only, never run
│   ├── 002_create_jobs.up.sql
│   ├── 004_create_audit_logs.up.sql
│   ├── 005_add_pilot_fields_to_jobs.up.sql
│   ├── 007_add_sla_fields_to_jobs.up.sql
│   ├── 008_add_sla_hardening_fields_to_jobs.up.sql
│   ├── 010_create_proof_asset_packs.up.sql
│   ├── 011_create_imagen_jobs.up.sql
│   ├── 012_add_imagen_retry_columns.up.sql
│   ├── 013_create_imagen_runtime_state.up.sql
│   └── 014_create_generation_telemetry.up.sql
│
├── data/                              ← ADOPT targets — seed/rules/benchmarks
│   ├── rules/
│   │   ├── canon_invariants.json.txt
│   │   ├── classification_rules.json.txt
│   │   ├── review_rubric.json.txt
│   │   ├── studio_pipeline_rules.json.txt
│   │   └── qc_checklists.json
│   ├── compiler/
│   │   ├── preset_registry.json
│   │   ├── prompt_compiler_rules.json
│   │   └── compatibility_matrix.json
│   ├── seed/
│   │   ├── environment_registry.json
│   │   ├── archetype_registry.json
│   │   └── japanese-art-grammar.seed.json
│   ├── reference/
│   │   ├── JAPANESE_TRADITIONAL_VISUAL_REFERENCE.MASTER PACK.json
│   │   └── mikage-core/
│   │       ├── 01_Mikage_Core_Spec.source.txt
│   │       ├── 02_Mikage_3_Mode_Visual_Briefs.source.txt
│   │       ├── 03_Mikage_Prompt_Pack.source.txt
│   │       └── 04_Studio_Test_Workflow.source.txt
│   ├── generation-receipts/
│   │   └── generation_receipt_schema.json.txt
│   └── workflow-snapshots/
│       ├── mikage-workflow.json
│       ├── archive-runs.json
│       ├── mikage-demo-run.json
│       └── archive-assets.json
│
├── benchmark/                         ← visual + text benchmark candidates
│   ├── UKIYOE_LIBRARY/
│   │   ├── studio_reference_samurai/        ← 29 PNGs
│   │   ├── studio_reference_ukiyoe_landscape/ ← 19 PNGs
│   │   ├── studio_reference_ukiyoe_yokai/   ← 21 PNGs
│   │   └── studio_referenc_ukiyoe_bijin/    ← 9 PNGs
│   ├── japanese-medieval/                   ← extracted from thi?u/, clean names
│   │   ├── edo_ukiyoe/                      ← 23 PNGs
│   │   ├── momoyama_byobu/                  ← 2 PNGs
│   │   └── yamatoe_screen/                  ← 7 PNGs
│   ├── generated-images/                    ← 200+ production run PNGs (timestamped)
│   └── job-prompt-outputs/                  ← UUID job text outputs, by preset
│       ├── canon_core/
│       ├── luminous_fan_appeal/
│       └── luxury_mystical_editorial/
│
├── tests/                             ← test fixture EXTRACT sources
│   ├── fixtures/
│   │   ├── mikageBrief.json           ← ADOPT as canonical request fixture
│   │   └── mockGenerationResponse.json ← ADOPT as provider mock fixture
│   ├── api/
│   │   ├── mikage.full-pipeline.test.ts
│   │   ├── mikage.pipeline.test.ts
│   │   ├── mikage.control-room-assets-references.test.ts
│   │   └── studio.os.test.ts
│   └── scripts/
│       ├── test-intake-validation.mjs
│       ├── test-studio-prompt-compiler.mjs
│       ├── test-studio-visual-grammar-compiler.mjs
│       ├── test-generate-endpoint.mjs
│       ├── test-sla-endpoint.mjs
│       ├── test-sla-logic.mjs
│       ├── verify-mikage-agent-runtime.mjs
│       └── verify-mikage-architecture-compliance.mjs
│
└── provenance/                        ← spec lineage docs — coverage gap reading only
    ├── MIKAGE_ZENITH_V1.3.md
    ├── studio-brain/
    │   ├── studio_brain_01_master_blueprint.md
    │   ├── studio_brain_02_agent_roles.md
    │   ├── studio_brain_03_system_architecture.md
    │   ├── studio_brain_04_governance_rules.md
    │   ├── studio_brain_05_master_prompt.md
    │   ├── systemstudio-canon.yaml
    │   ├── systemruntime-contract.yaml
    │   ├── systemmemory-schema.yaml
    │   └── systemtask-router.yaml
    └── brain-masters/
        ├── MIKAGE_PROJECT_MASTER.md
        ├── MIKAGE_WORKFLOW_MASTER.md
        └── SYSTEM_MASTER.md

B. CLEAN CANONICAL REPO LAYOUT
This is the target repository. Initialized clean. No legacy structure.
mikage/
│
├── apps/
│   ├── api-gateway/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── health/
│   │   │   │   └── health.controller.ts
│   │   │   └── proxies/
│   │   │       ├── orchestration.proxy.ts
│   │   │       ├── generation.proxy.ts
│   │   │       └── review.proxy.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── canon-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── canon.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── canon.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── canon-rules.service.ts
│   │   │   │   └── canon-validation.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── canon-rules.repository.ts
│   │   │   │   └── validator-rulepack.repository.ts
│   │   │   └── dto/
│   │   │       ├── validate-prompt-pack.request.ts
│   │   │       └── validate-prompt-pack.response.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── world-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── world.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── world.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── world-entity.service.ts
│   │   │   │   ├── timeline.service.ts
│   │   │   │   └── scene.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── world-entity.repository.ts
│   │   │   │   └── timeline-anchor.repository.ts
│   │   │   ├── graph/
│   │   │   │   └── world-graph-writer.ts
│   │   │   └── dto/
│   │   │       └── resolve-context.request.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── state-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── state.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── state.controller.ts
│   │   │   ├── services/
│   │   │   │   └── character-state.service.ts
│   │   │   ├── repositories/
│   │   │   │   └── character-state-snapshot.repository.ts
│   │   │   └── dto/
│   │   │       └── resolve-snapshot.request.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── prompt-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── prompt.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── prompt.controller.ts
│   │   │   ├── services/
│   │   │   │   └── prompt-compiler.service.ts
│   │   │   ├── compilers/
│   │   │   │   ├── prompt-compiler.ts          ← extracted from studioOsPromptCompiler + TS versions
│   │   │   │   ├── visual-grammar-compiler.ts  ← extracted from studioVisualGrammarCompiler
│   │   │   │   └── negative-profile-compiler.ts
│   │   │   ├── repositories/
│   │   │   │   ├── preset.repository.ts
│   │   │   │   ├── variant.repository.ts
│   │   │   │   └── negative-profile.repository.ts
│   │   │   └── dto/
│   │   │       ├── compile-prompt.request.ts
│   │   │       └── compile-prompt.response.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── generation-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── generation.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── generation.controller.ts
│   │   │   ├── services/
│   │   │   │   └── generation.service.ts       ← extracted from imagenService generateViaVertexImagen
│   │   │   ├── config/
│   │   │   │   └── generation-config.ts        ← extracted from readConfig()
│   │   │   ├── providers/
│   │   │   │   ├── provider-resolver.ts        ← extracted from resolveProvider + assertImagenProviderReady
│   │   │   │   ├── imagen-adapter.ts           ← extracted from generateWithVertex
│   │   │   │   ├── openai-adapter.ts           ← extracted from generateWithOpenAi
│   │   │   │   └── mock-adapter.ts             ← extracted from generateMockImages (includes fail simulation)
│   │   │   ├── normalizers/
│   │   │   │   └── asset-normalizer.ts         ← extracted from normalizeProviderImages + validateAndHydrateProviderAssets
│   │   │   ├── workers/
│   │   │   │   └── generation.worker.ts        ← rewritten from imagenWorker concept for BullMQ
│   │   │   └── dto/
│   │   │       ├── generate-request.dto.ts     ← adopted from validatePayload() contract
│   │   │       └── generation-output.dto.ts
│   │   ├── test/
│   │   │   ├── fixtures/
│   │   │   │   └── mockGenerationResponse.json ← ADOPT from salvage
│   │   │   └── providers/
│   │   │       └── imagen-adapter.spec.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ingestion-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── ingestion.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── ingestion.controller.ts
│   │   │   ├── services/
│   │   │   │   └── ingestion.service.ts
│   │   │   ├── processors/
│   │   │   │   ├── asset-normalizer.processor.ts
│   │   │   │   └── lineage-graph-writer.processor.ts
│   │   │   ├── repositories/
│   │   │   │   ├── asset.repository.ts
│   │   │   │   └── ingestion-report.repository.ts
│   │   │   └── dto/
│   │   │       └── ingest-generation-output.request.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── benchmark-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── benchmark.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── benchmark.controller.ts
│   │   │   ├── services/
│   │   │   │   └── benchmark.service.ts
│   │   │   ├── compare/
│   │   │   │   ├── metadata-scorer.ts
│   │   │   │   ├── negative-term-scanner.ts
│   │   │   │   └── drift-detector.ts
│   │   │   └── dto/
│   │   │       ├── compare-asset.request.ts
│   │   │       └── benchmark-score.response.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── review-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── review.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── review.controller.ts
│   │   │   ├── services/
│   │   │   │   └── review.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── review-task.repository.ts
│   │   │   │   └── review-decision.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-review-task.request.ts
│   │   │       └── review-decision.request.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── orchestration-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── orchestration.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── orchestration.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── orchestration.service.ts
│   │   │   │   ├── job-tracker.service.ts
│   │   │   │   └── lineage-check.service.ts
│   │   │   ├── workflows/
│   │   │   │   └── cinematic-image.workflow.ts ← rewritten from mikageStudioWorkflow concept
│   │   │   ├── workers/
│   │   │   │   └── cinematic-image.worker.ts   ← BullMQ worker, concept from imagenWorker
│   │   │   └── dto/
│   │   │       ├── create-cinematic-job.request.ts
│   │   │       └── job-status.response.ts
│   │   ├── test/
│   │   │   ├── fixtures/
│   │   │   │   └── mikageBrief.json            ← ADOPT from salvage
│   │   │   ├── workflows/
│   │   │   │   └── cinematic-image.workflow.spec.ts
│   │   │   └── integration/
│   │   │       └── full-pipeline.spec.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── studio-web/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx                         ← redirects to /dashboard
│       │   ├── dashboard/
│       │   │   └── page.tsx                     ← extracted from ControlRoom + Dashboard concept
│       │   ├── jobs/
│       │   │   ├── page.tsx                     ← extracted from IntakeNew concept
│       │   │   └── [jobCode]/
│       │   │       └── page.tsx                 ← extracted from JobDetail concept
│       │   ├── canon/
│       │   │   └── page.tsx                     ← extracted from CanonGate concept
│       │   ├── assets/
│       │   │   └── page.tsx                     ← extracted from ProofBoard concept
│       │   ├── review/
│       │   │   └── page.tsx
│       │   ├── world/
│       │   │   └── page.tsx
│       │   └── audit/
│       │       └── page.tsx
│       ├── components/
│       │   ├── ui/
│       │   │   ├── StatusPill.tsx               ← ADOPT, JSX→TSX
│       │   │   ├── MetricCard.tsx               ← ADOPT
│       │   │   ├── DetailPanel.tsx              ← ADOPT
│       │   │   ├── GalleryGrid.tsx              ← ADOPT
│       │   │   ├── SidebarNavItem.tsx           ← ADOPT
│       │   │   ├── SearchFilterRow.tsx          ← ADOPT
│       │   │   ├── MetadataChip.tsx             ← ADOPT
│       │   │   ├── PrimaryActionBar.tsx         ← ADOPT
│       │   │   ├── SectionHeader.tsx            ← ADOPT
│       │   │   ├── StudioWorkflowStrip.tsx      ← EXTRACT concept, rewrite TSX
│       │   │   └── SkeletonCard.tsx             ← ADOPT
│       │   └── JobReceipt.tsx                   ← ADOPT (already .tsx)
│       ├── lib/
│       │   └── api/
│       │       ├── orchestration.client.ts      ← rewritten from studioOsClient concept
│       │       ├── generation.client.ts
│       │       └── review.client.ts
│       ├── stores/
│       │   └── studio.store.ts                  ← rewritten from studioStore concept
│       ├── package.json
│       ├── next.config.ts
│       └── tsconfig.json
│
├── packages/
│   ├── config/
│   │   ├── src/
│   │   │   ├── env.ts                           ← extracted from envValidation.mjs pattern
│   │   │   ├── services.ts
│   │   │   ├── storage.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── contracts/
│   │   ├── src/
│   │   │   ├── canon/
│   │   │   │   ├── canon-rule.ts                ← from canonical spec + canon_invariants extract
│   │   │   │   ├── validator-rulepack.ts
│   │   │   │   └── index.ts
│   │   │   ├── world/
│   │   │   │   ├── world-entity.ts
│   │   │   │   ├── character.ts
│   │   │   │   ├── faction.ts
│   │   │   │   ├── location.ts
│   │   │   │   ├── timeline-anchor.ts
│   │   │   │   ├── scene.ts
│   │   │   │   ├── shot.ts
│   │   │   │   └── index.ts
│   │   │   ├── state/
│   │   │   │   ├── character-state-snapshot.ts
│   │   │   │   └── index.ts
│   │   │   ├── prompt/
│   │   │   │   ├── prompt-preset.ts
│   │   │   │   ├── prompt-variant.ts
│   │   │   │   ├── compiled-prompt-pack.ts
│   │   │   │   └── index.ts
│   │   │   ├── generation/
│   │   │   │   ├── generate-request.ts          ← ADOPT from imagenService validatePayload contract
│   │   │   │   ├── generate-payload.ts          ← confirmed from imagenService content read
│   │   │   │   ├── generation-output.ts
│   │   │   │   ├── provider-profile.ts
│   │   │   │   └── index.ts
│   │   │   ├── ingestion/
│   │   │   │   ├── asset.ts
│   │   │   │   ├── asset-manifest.ts
│   │   │   │   ├── ingestion-report.ts
│   │   │   │   └── index.ts
│   │   │   ├── benchmark/
│   │   │   │   ├── benchmark-score.ts
│   │   │   │   ├── drift-report.ts
│   │   │   │   └── index.ts
│   │   │   ├── review/
│   │   │   │   ├── review-task.ts
│   │   │   │   ├── review-decision.ts
│   │   │   │   └── index.ts
│   │   │   ├── orchestration/
│   │   │   │   ├── cinematic-job-request.ts
│   │   │   │   ├── cinematic-job-result.ts
│   │   │   │   ├── pipeline-node-contract.ts   ← extracted from mikageRuntimeContract
│   │   │   │   └── index.ts
│   │   │   ├── errors/
│   │   │   │   └── generation-errors.ts         ← ADOPT from renderErrors + attachGenerationErrorContext
│   │   │   ├── events/
│   │   │   │   ├── job-created.event.ts
│   │   │   │   ├── prompt-compiled.event.ts
│   │   │   │   ├── asset-ingested.event.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── database/
│   │   ├── prisma/
│   │   │   ├── schema.prisma                    ← all 26 canonical tables from MVP spec
│   │   │   └── migrations/
│   │   │       └── 0001_initial.sql
│   │   ├── src/
│   │   │   ├── prisma.ts
│   │   │   ├── neo4j.ts
│   │   │   ├── redis.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── domain/
│   │   ├── src/
│   │   │   ├── enums/
│   │   │   │   ├── entity-kind.enum.ts
│   │   │   │   ├── canon-severity.enum.ts       ← ADOPT from canon_invariants + governance patch
│   │   │   │   ├── job-status.enum.ts           ← ADOPT from mikageRuntimeContract + studioStore
│   │   │   │   ├── job-step-status.enum.ts
│   │   │   │   ├── review-status.enum.ts
│   │   │   │   ├── asset-status.enum.ts
│   │   │   │   ├── canon-promotion-state.enum.ts ← from IP governance patch
│   │   │   │   ├── benchmark-set-kind.enum.ts
│   │   │   │   ├── generation-modality.enum.ts
│   │   │   │   ├── provider-capability.enum.ts  ← from imagenService resolveProvider
│   │   │   │   └── lineage-link-kind.enum.ts
│   │   │   ├── errors/
│   │   │   │   └── pipeline-errors.ts
│   │   │   └── utils/
│   │   │       └── dimensions.ts                ← ADOPT from mapAspectRatioToDimensions()
│   │   └── package.json
│   │
│   ├── queue/
│   │   ├── src/
│   │   │   ├── bullmq.ts
│   │   │   ├── queues.ts                        ← queue names: cinematic-image, generation, ingestion
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── storage/
│   │   ├── src/
│   │   │   ├── s3.ts                            ← MinIO/S3 client (rewrite of assetStorage concept)
│   │   │   ├── object-paths.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── logging/
│   │   ├── src/
│   │   │   ├── logger.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── testing/
│   │   ├── src/
│   │   │   ├── fixtures/
│   │   │   │   ├── mikage-brief.fixture.ts      ← ADOPT from mikageBrief.json
│   │   │   │   └── mock-generation.fixture.ts   ← ADOPT from mockGenerationResponse.json
│   │   │   ├── builders/
│   │   │   │   └── job.builder.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── ui/
│       ├── src/
│       │   └── index.ts
│       └── package.json
│
├── data/
│   ├── seeds/
│   │   ├── 000_projects.seed.json
│   │   ├── 001_canon_rules.seed.json            ← populated from canon_invariants ADOPT
│   │   ├── 002_validator_rulepacks.seed.json     ← populated from review_rubric + qc_checklists ADOPT
│   │   ├── 003_world_entities.seed.json
│   │   ├── 004_world_entity_versions.seed.json
│   │   ├── 005_timeline_anchors.seed.json
│   │   ├── 006_character_state_snapshots.seed.json
│   │   ├── 007_story_projects.seed.json
│   │   ├── 008_scenes.seed.json
│   │   ├── 009_shots.seed.json
│   │   ├── 010_prompt_presets.seed.json         ← populated from preset_registry ADOPT
│   │   ├── 011_prompt_variants.seed.json
│   │   ├── 012_negative_profiles.seed.json
│   │   ├── 013_benchmark_sets.seed.json
│   │   └── 014_provider_profiles.seed.json
│   ├── neo4j/
│   │   ├── constraints.cypher                   ← from canonical spec
│   │   ├── indexes.cypher
│   │   └── seed.cypher
│   └── fixtures/
│       ├── prompt-packs/
│       ├── manifests/
│       └── mock-outputs/
│
├── infra/
│   ├── compose/
│   │   ├── docker-compose.local.yml
│   │   └── .env.compose
│   └── docker/
│
├── scripts/
│   ├── bootstrap.sh
│   ├── dev-up.sh
│   ├── migrate.ts
│   ├── seed.ts
│   ├── seed-neo4j.ts
│   ├── smoke-test.ts
│   └── run-mvp-job.ts
│
├── tests/
│   ├── integration/
│   ├── e2e/
│   └── smoke/
│
├── docs/
│   ├── architecture/
│   ├── decisions/
│   └── ops/
│
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── biome.json
├── Makefile
└── README.md
Root config files — locked values:
pnpm-workspace.yaml:
yamlpackages:
  - "apps/*"
  - "packages/*"
turbo.json pipelines: build, dev, lint, typecheck, test
tsconfig.base.json path aliases:

@mikage/contracts/*
@mikage/domain/*
@mikage/database/*
@mikage/config/*
@mikage/queue/*
@mikage/storage/*
@mikage/logging/*
@mikage/testing/*
@mikage/ui/*


C. EXTRACTION MAP
Ordered by canonical build priority. Each row is a concrete action: copy source into salvage holding, read it, extract the named logic, write the named canonical file from scratch incorporating that logic.
C.1 Confirmed ADOPT — minimal transformation required
Source (salvage holding)What to extractCanonical destinationTransformationdata/rules/canon_invariants.json.txtRule definitions: rule_code, layer, severity, description, expressiondata/seeds/001_canon_rules.seed.jsonMap fields to canonical CanonRule schema. Diff against CANON_VALIDATOR_RULE_PACK_v1 — canonical wins on conflict.data/rules/classification_rules.json.txtClassification rule set for request type routingapps/orchestration-service/src/workflows/cinematic-image.workflow.ts (guard constants)Extract rule content as TypeScript constants. Discard any rule execution mechanism.data/rules/review_rubric.json.txtScoring dimensions, thresholds, weightsdata/seeds/002_validator_rulepacks.seed.json + apps/benchmark-service/src/compare/Map rubric dimensions to canonical BenchmarkScore criteria fields.data/rules/qc_checklists.jsonQC checklist items for asset reviewdata/seeds/002_validator_rulepacks.seed.jsonAppend as review-layer rules in the validator rulepack seed.data/compiler/preset_registry.jsonPreset definitions with codes, objectives, modalitiesdata/seeds/010_prompt_presets.seed.jsonSchema-map to canonical PromptPreset table columns. Verify preset_code matches expected format.data/compiler/prompt_compiler_rules.jsonCompiler rule setapps/prompt-service/src/compilers/prompt-compiler.ts (rule constants)Extract rules as TypeScript constants consumed by the canonical compiler.data/compiler/compatibility_matrix.jsonPreset-variant compatibility constraintsapps/prompt-service/src/services/prompt-compiler.service.ts (validation step)Implement a validateCompatibility(presetCode, variantCode) function using this data as the constraint source.data/seed/environment_registry.jsonLocation/environment definitionsdata/seeds/003_world_entities.seed.jsonMap "environment" → canonical Location entity_kind. Verify field names against WorldEntity schema.data/seed/japanese-art-grammar.seed.jsonReferenceStyle entities for Japanese art grammardata/seeds/003_world_entities.seed.json (entity_kind: visual_dna_profile)Map to canonical WorldEntity with entity_kind = visual_dna_profile. Store full grammar data in world_entity_versions.data JSONB.data/reference/JAPANESE_TRADITIONAL_VISUAL_REFERENCE.MASTER PACK.jsonMaster visual reference datadata/seeds/003_world_entities.seed.json + docs/provenance/Treat as superset of grammar seed. If richer, use this as primary. Store in world_entity_versions. Preserve original as provenance doc.tests/fixtures/mikageBrief.jsonComplete Mikage request packet structurepackages/testing/src/fixtures/mikage-brief.fixture.tsWrap in typed TypeScript fixture factory. Validate shape against CinematicJobRequestSchema.tests/fixtures/mockGenerationResponse.jsonProvider mock response structurepackages/testing/src/fixtures/mock-generation.fixture.tsWrap in typed factory. Validate against GenerationOutput schema derived from imagenService content read.data/workflow-snapshots/mikage-demo-run.jsonSerialized pipeline runpackages/testing/src/fixtures/Use as integration test reference fixture.data/workflow-snapshots/mikage-workflow.jsonSerialized workflow definitionpackages/testing/src/fixtures/Use as workflow validation reference fixture.implementation/ui/components/StatusPill.jsxStatus → color/label mapping + renderapps/studio-web/components/ui/StatusPill.tsxJSX → TSX conversion. Replace inline styles with canonical design system tokens. Map status enum to canonical JobStatus, AssetStatus, ReviewStatus.implementation/ui/components/MetricCard.jsxMetric label + value + trend displayapps/studio-web/components/ui/MetricCard.tsxJSX → TSX. Replace props with typed interface.implementation/ui/components/DetailPanel.jsxDetail inspection panel layoutapps/studio-web/components/ui/DetailPanel.tsxJSX → TSX.implementation/ui/components/GalleryGrid.jsxAsset grid layoutapps/studio-web/components/ui/GalleryGrid.tsxJSX → TSX.implementation/ui/components/SidebarNavItem.jsxNav item with active stateapps/studio-web/components/ui/SidebarNavItem.tsxJSX → TSX. Route paths updated to canonical SCI page map.implementation/ui/components/SearchFilterRow.jsxSearch + filter barapps/studio-web/components/ui/SearchFilterRow.tsxJSX → TSX.implementation/ui/components/MetadataChip.jsxMetadata tag displayapps/studio-web/components/ui/MetadataChip.tsxJSX → TSX.implementation/ui/components/PrimaryActionBar.jsxApprove/reject/revise action barapps/studio-web/components/ui/PrimaryActionBar.tsxJSX → TSX. Actions wired to canonical approve/reject/revise decision contracts.implementation/ui/components/SectionHeader.jsxPage section headerapps/studio-web/components/ui/SectionHeader.tsxJSX → TSX.implementation/ui/components/JobReceipt.tsxJob receipt / lineage displayapps/studio-web/components/JobReceipt.tsxAlready TypeScript. Update field names to match canonical lineage record schema.implementation/ui/components/SkeletonCard.jsxLoading skeletonapps/studio-web/components/ui/SkeletonCard.tsxJSX → TSX.

C.2 EXTRACT — logic valuable, must be separated from legacy structure
Source (salvage holding)What to extractCanonical destinationWhat to severTransformation requiredimplementation/generation/imagenService.mjs — readConfig()Env var key names, defaults, timeout values, provider enumapps/generation-service/src/config/generation-config.tsprocess.env direct accessWrap in @mikage/config env validation pattern. Export typed config object.implementation/generation/imagenService.mjs — resolveProvider() + assertImagenProviderReady()Provider selection logic, readiness checks, typed error returnsapps/generation-service/src/providers/provider-resolver.tsNone — already pureTranslate to TypeScript. Use canonical provider enum from @mikage/domain.implementation/generation/imagenService.mjs — generateWithVertex() + callVertexPredict() + getAccessToken()Vertex API call structure, request body shape, response parsingapps/generation-service/src/providers/imagen-adapter.tsNone — already decoupledTranslate to TypeScript class implementing canonical IProviderAdapter interface.implementation/generation/imagenService.mjs — generateWithOpenAi() + callOpenAiImagesGenerate()OpenAI API call, timeout via AbortController, response normalizationapps/generation-service/src/providers/openai-adapter.tsNoneTranslate to TypeScript class.implementation/generation/imagenService.mjs — generateMockImages()Mock provider with fail simulation, configurable delay, 1×1 PNGapps/generation-service/src/providers/mock-adapter.tsmockAttemptByRequestId Map (in-memory — acceptable for mock)Translate as-is. Preserve MOCK_IMAGEN_FAIL_FIRST_ATTEMPTS behavior for retry testing.implementation/generation/imagenService.mjs — validateAndHydrateProviderAssets() + normalizeProviderImages()Asset hydration + unified output normalizationapps/generation-service/src/normalizers/asset-normalizer.tsNone — pure functionsTranslate to TypeScript. Output type becomes canonical GenerationOutput contract.implementation/generation/imagenService.mjs — validatePayload()Input validation rules: required fields, variants 1–8apps/generation-service/src/dto/generate-request.dto.tsNoneRewrite as Zod schema matching confirmed payload contract.implementation/generation/imagenService.mjs — mapAspectRatioToDimensions()Aspect ratio → pixel dimension mappingpackages/domain/src/utils/dimensions.tsNone — pure functionTranslate directly. Used by both generation-service and prompt-service.implementation/generation/imagenService.mjs — attachGenerationErrorContext()Error enrichment with provider context, typed error codespackages/contracts/src/errors/generation-errors.tsNoneExtract error code enum (TIMEOUT, BAD_REQUEST, UPSTREAM_ERROR, IMAGEN_PROVIDER_NOT_CONFIGURED). Implement as typed error factory.implementation/orchestration/mikageStudioWorkflow.jsPipeline step sequence, step names, step order, transition logic, guard invocation patternapps/orchestration-service/src/workflows/cinematic-image.workflow.tsSQLite store calls, in-memory state, legacy provider calls, agent modelMap the 16-step canonical workflow (Section 10 of MVP spec). Each step in legacy becomes a job_step record + service call in canonical.implementation/orchestration/mikageAgentOrchestrator.mjsExecution graph traversal, hard-fail guard checks, error propagation patternapps/orchestration-service/src/services/orchestration.service.tsAgent registry, SQLite, in-process execution modelExtract: the step-by-step execution pattern, the guard condition check sequence, the error escalation logic.implementation/orchestration/studioWorkflowModel.jsWorkflow state field vocabulary: status values, step names, context shapepackages/contracts/src/orchestration/pipeline-node-contract.tsObject structureExtract field names and status enum values as canonical TypeScript type literals.implementation/orchestration/runState.jsState machine transitions (pending → running → passed/failed/retrying/blocked)apps/orchestration-service/src/services/job-tracker.service.tsIn-memory stateExtract the transition table as a TypeScript state machine. Persist transitions via Prisma to job_steps table.implementation/orchestration/intakeValidation.jsRequest guard conditions, required field checksapps/orchestration-service/src/workflows/cinematic-image.workflow.ts (step 1 guard)None if pureExtract validation rule set. Rewrite as Zod parse on CinematicJobRequestSchema.implementation/orchestration/renderReadiness.mjsPipeline precondition checklistapps/orchestration-service/src/workflows/cinematic-image.workflow.ts (pre-run checks)Unknown coupling — read firstExtract checklist items as guard conditions mapped to canonical hard-fail rules (Section 14.1 of runtime spec).implementation/orchestration/renderErrors.mjsError taxonomy, error codespackages/contracts/src/errors/generation-errors.tsNoneMerge with imagenService error codes into unified canonical error type.implementation/orchestration/productionRouter.jsPipeline variant routing logicapps/orchestration-service/src/workflows/cinematic-image.workflow.ts (route_provider step)Legacy preset/mode name referencesExtract routing decision logic. Rewrite routing against canonical provider_profiles table lookup.implementation/orchestration/mikageWorkflowStore.mjsWorkflow state fields (workflow_id, step, status, timestamps, errors)packages/database/prisma/schema.prisma (jobs + job_steps tables)SQLite implementationExtract field names only. Canonical tables already defined in MVP spec — cross-reference to confirm coverage.implementation/prompt/studioOsPromptCompiler.mjsCompilation stages, context assembly order, output formatapps/prompt-service/src/compilers/prompt-compiler.tsFile-path preset loading, any SQLite referenceRead alongside studioPromptCompiler.mjs and both TS versions. Synthesise single canonical compiler from all four. Compile flow: preset → variant → world → state mapping → scene → shot → negative → render → lineage.implementation/prompt/studioVisualGrammarCompiler.mjsGrammar rule application logic, constraint injection into promptapps/prompt-service/src/compilers/visual-grammar-compiler.tsFile-path grammar loadingExtract rule application logic. Grammar data loaded from canonical world_entities (visual_dna_profile kind).implementation/prompt/buildPromptPackage.jsFinal prompt package assembly: compiled_prompt + negative_prompt + metadata + lineage fieldsapps/prompt-service/src/compilers/prompt-compiler.ts (final assembly step)None if pureExtract the output field list. This defines the canonical CompiledPromptPack assembly contract.implementation/prompt/promptPayload.jsPayload field structure for the prompt object fed into providerspackages/contracts/src/generation/generate-payload.tsNoneExtract field vocabulary. Already confirmed from imagenService: { prompt: { positivePrompt, negativePrompt }, generation: { variants, aspectRatio, model, cfg, seeds } }.implementation/canon/mikageAgentConstitution.mjsCanon governance rules: what constitutes a violation, enforcement levelsdata/seeds/001_canon_rules.seed.json + apps/canon-service/src/services/canon-validation.service.tsAgent invocation wrapperExtract the rule definitions as canonical CanonRule seed data. If rules are inline objects, treat as DATA_ASSET.implementation/canon/mikageLawRegistry.mjsLaw IDs, descriptions, enforcement levels, domain tagsdata/seeds/001_canon_rules.seed.jsonRegistry patternExtract law content. Map to canonical canon_rules table: rule_code, layer, severity, description.implementation/types/studio.tsEntity type shapes: Job, Asset, Preset, Variant, Receipt, WorkflowStatepackages/contracts/src/ (all domain areas)Unused types, legacy-specific shapesCross-reference each type against canonical contract schemas. Adopt field names and nullability. Discard types that have no canonical slot (fashionDomain, quotes).implementation/types/mikageRuntimeContract.mjsPipeline node I/O contract shapes, execution_trace fields, status enumpackages/contracts/src/orchestration/pipeline-node-contract.tsNone if pure definitionsExtract: node name, request_id, input_packet_refs, output_packet_id, status enum, execution_trace shape, errors array. These are the canonical JSON contracts from Section 2 of runtime spec.implementation/types/studioMappers.tsData transformation functions and input/output type pairsapps/*/src/mappers/ (per service)None — typed, minimal depsExtract mapper function signatures and transformation patterns per service domain. Rewrite against canonical contract types.implementation/persistence-reference/studioReceiptStore.mjsReceipt/lineage record field setpackages/database/prisma/schema.prisma (archives table) + Neo4j lineage writeSQLite implementationExtract field list: receipt_id, job_id, prompt_pack_id, provider, asset_ids, timestamps. Map to canonical archives table + Neo4j GENERATED_BY edge.implementation/observability/slaTracking.mjsSLA threshold values, breach detection conditionsapps/orchestration-service/src/services/job-tracker.service.ts (SLA enforcement)Legacy queue couplingExtract threshold values. Map to canonical pipeline_time_limits (Section 19 of runtime spec). Implement as job_step duration monitoring in job-tracker.implementation/observability/queueAlertPolicy.mjsAlert policy rules and conditionsapps/orchestration-service/src/ (monitoring)Legacy queue couplingExtract policy rule set. Rewrite as BullMQ queue health monitor.implementation/observability/generationMetrics.mjs + generationHealthSummary.mjsMetric definitions, health summary computationapps/generation-service/src/services/generation.service.ts (telemetry emit)NoneExtract metric field names and computation logic. Emit as structured logs via @mikage/logging.implementation/ui/pages/ControlRoom.jsxPanel layout: active jobs, pipeline health, system status, alert streamapps/studio-web/app/dashboard/page.tsxAll JSX, all API calls, all legacy stateExtract panel structure concept only. Implement in TSX with canonical API client calls and canonical state shape. Dashboard consolidates ControlRoom + Dashboard into one page with 5 canonical panels.implementation/ui/pages/CanonGate.jsxViolation list, severity display, resolution actions, pipeline sourceapps/studio-web/app/canon/page.tsxAll JSX, all API callsExtract panel layout concept. Build against canonical Canon Violation Panel spec (Section 9 of SCI spec).implementation/ui/pages/ProofBoard.jsxAsset preview, prompt lineage, benchmark report, approval actionsapps/studio-web/app/assets/page.tsxAll JSX, all API callsExtract panel structure. Build against canonical Asset Approval Cockpit spec (Section 15 of SCI spec).implementation/ui/pages/JobDetail.jsxExecution trace display, step timeline, node statusapps/studio-web/app/jobs/[jobCode]/page.tsxAll JSX, all API callsExtract trace display concept. Map job_steps to canonical node execution display.implementation/ui/pages/IntakeNew.jsxRequest form field set (what data is required to initialize a job)apps/studio-web/app/jobs/page.tsxAll JSX, all API callsExtract form field set. Fields must match canonical CinematicJobRequestSchema exactly.implementation/ui/state/studioStore.tsState fields, action names, state transitionsapps/studio-web/stores/studio.store.tsZustand/Redux-specific bindings if incompatibleExtract state shape. Rewrite as canonical UI state model matching SCI Section 18.implementation/ui/components/StudioWorkflowStrip.jsxHorizontal step-strip layout concept for pipeline visualizationapps/studio-web/components/ui/StudioWorkflowStrip.tsxJSXExtract the step strip concept. Rebuild in TSX with canonical node names and canonical status indicators.

C.3 Benchmark and data assets — structured copy operations
SourceDestinationActionbenchmark/UKIYOE_LIBRARY/studio_reference_samurai/data/fixtures/benchmark/holding/samurai/Copy all 29 PNGs. Flag for human curation before promotion to gold_visual_dna.benchmark/UKIYOE_LIBRARY/studio_reference_ukiyoe_landscape/data/fixtures/benchmark/holding/landscape/Copy 19 PNGs. Curate before promotion.benchmark/UKIYOE_LIBRARY/studio_reference_ukiyoe_yokai/data/fixtures/benchmark/holding/yokai/Copy 21 PNGs. Likely silver_scene_set. Curate.benchmark/UKIYOE_LIBRARY/studio_referenc_ukiyoe_bijin/data/fixtures/benchmark/holding/bijin/Copy 9 PNGs. Curate.benchmark/japanese-medieval/data/fixtures/benchmark/holding/japanese-medieval/Copy with clean filenames (strip encoding artifact). Deduplicate against samurai set.benchmark/generated-images/data/fixtures/benchmark/holding/production-runs/Copy all timestamped PNGs. Curate before promotion. Do not auto-promote.benchmark/job-prompt-outputs/canon_core/data/fixtures/benchmark/holding/prompt-texts/canon_core/Copy all .txt files from all job run UUIDs.benchmark/job-prompt-outputs/luminous_fan_appeal/data/fixtures/benchmark/holding/prompt-texts/luminous_fan_appeal/Copy all .txt files.benchmark/job-prompt-outputs/luxury_mystical_editorial/data/fixtures/benchmark/holding/prompt-texts/luxury_mystical_editorial/Copy all .txt files.
Benchmark set seed (data/seeds/013_benchmark_sets.seed.json) defines three initial sets:

gold_visual_dna — curated from UKIYOE_LIBRARY samurai + landscape after human review
silver_scene_set — curated from yokai + bijin + japanese-medieval sets
red_drift_examples — TBD from provenance review of production run outputs


D. REWRITE MODULES
Modules that must be written from scratch. Reading salvage for concept/schema only — no code is carried forward.
ModuleCanonical fileWhy rewriteConcept source (read only)Job queue workerapps/orchestration-service/src/workers/cinematic-image.worker.tsLegacy uses SQLite polling. Canonical is BullMQ process() consumer.imagenWorker.mjs — lifecycle stagesWorkflow state persistenceapps/orchestration-service/src/services/job-tracker.service.tsLegacy is in-memory + SQLite. Canonical is PostgreSQL-backed via Prisma jobs + job_steps.mikageWorkflowStore.mjs — field names onlyAsset object storage adapterpackages/storage/src/s3.tsLegacy uses local filesystem paths. Canonical is MinIO/S3 via AWS SDK v3.assetStorage.mjs — operation list: store, retrieve, delete, list, fallback handlingObject path generatorpackages/storage/src/object-paths.tsNo equivalent in legacy. Fresh design.assetStorage.mjs — implicit path structureLineage graph writerapps/ingestion-service/src/processors/lineage-graph-writer.processor.tsNo Neo4j in legacy. Fresh design from canonical cypher specs.studioReceiptStore.mjs — receipt field setCanon validation engineapps/canon-service/src/services/canon-validation.service.tsNo dedicated validation service in legacy. Rules were embedded in agent constitution.mikageAgentConstitution.mjs — rule contentCanon rule repositoryapps/canon-service/src/repositories/canon-rules.repository.tsNo canonical rule store in legacy. Rules were inline in mjs files.mikageLawRegistry.mjs — rule data structureWorld entity repositoryapps/world-service/src/repositories/world-entity.repository.tsNo world graph in legacy. Fresh Neo4j design.environment_registry.json — entity shapesWorld graph writerapps/world-service/src/graph/world-graph-writer.tsNo Neo4j in legacy. Write from canonical cypher constraints.Canonical Neo4j constraints + indexes specsCharacter state repositoryapps/state-service/src/repositories/character-state-snapshot.repository.tsNo state service in legacy. State was implicit in agent model.cc/studio-brain/systemmemory-schema.yaml — state schemaNegative profile compilerapps/prompt-service/src/compilers/negative-profile-compiler.tsNo dedicated negative profile compiler in legacy. Negative prompt was inline in compiler.studioOsPromptCompiler.mjs — negative prompt construction sectionBenchmark scorerapps/benchmark-service/src/compare/metadata-scorer.tsNo benchmark service in legacy.review_rubric.json — scoring dimensionsDrift detectorapps/benchmark-service/src/compare/drift-detector.tsNo drift detection in legacy.Canonical IP governance patch — drift severity systemReview task auto-creationapps/review-service/src/services/review.service.tsNo review service in legacy.proofAssetPackStore.mjs — proof pack fields; review_rubric — criteriaLineage completeness checkerapps/orchestration-service/src/services/lineage-check.service.tsNo lineage check in legacy.Canonical Section 11 of MVP spec — mandatory chainPrisma schemapackages/database/prisma/schema.prismaNo Prisma in legacy. 26 canonical tables from MVP spec.migrations-reference/*.up.sql — field name validationDocker Compose stackinfra/compose/docker-compose.local.ymlNo containerized local stack in legacy.Canonical spec Section 12Seed runnerscripts/seed.tsNo canonical seed runner in legacy.data/seeds/*.seed.json files defined aboveMVP job runnerscripts/run-mvp-job.tsNo canonical smoke runner in legacy.Canonical CinematicJobRequest — Mikage + anchor_leia_041 + mikage_cinematic_portrait

E. BUILD ORDER
Strict sequential order. Do not start a layer until the one above it is passing its own smoke test. Each step has a defined done condition.
Layer 0 — Environment (prerequisite, no canonical code)
Actions:

Create mikage/ repo. Initialize pnpm workspace + Turborepo. Lock turbo.json.
Create mikage-salvage/ adjacent. Copy all Phase 2 immediate preserve items following salvage holding layout (Section A).
Write root tsconfig.base.json with path aliases.
Write infra/compose/docker-compose.local.yml from canonical spec Section 12.
Run docker compose up — verify postgres, neo4j, redis, minio all healthy.
Write .env.example with all required variables.

Done condition: docker compose ps shows all 5 services running. MinIO bucket creation script succeeds.

Layer 1 — Shared packages (no service code depends on services)
Build in this exact order within the layer — later packages depend on earlier ones:
Step 1.1 — @mikage/config

Write packages/config/src/env.ts — env var validation using Zod. Extract key names from readConfig() in imagenService salvage.
Key env vars to define at minimum: DATABASE_URL, NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD, REDIS_URL, MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, GCP_PROJECT_ID, VERTEX_LOCATION, GOOGLE_APPLICATION_CREDENTIALS, OPENAI_API_KEY, IMAGE_PROVIDER, MOCK_IMAGEN.
Done: pnpm --filter @mikage/config typecheck passes.

Step 1.2 — @mikage/domain

Write all enums in packages/domain/src/enums/. Source: canonical spec enums + studioWorkflowModel.js status values + imagenService provider names + governance patch canon states.
Write packages/domain/src/utils/dimensions.ts — ADOPT mapAspectRatioToDimensions() directly from imagenService.
Write packages/domain/src/errors/pipeline-errors.ts — extract error codes from imagenService + renderErrors salvage.
Done: pnpm --filter @mikage/domain typecheck passes.

Step 1.3 — @mikage/contracts

Write all Zod schemas in order: canon/ → world/ → state/ → prompt/ → generation/ → ingestion/ → benchmark/ → review/ → orchestration/ → events/.
Generation contracts: use confirmed payload contract from imagenService content read ({ prompt: { positivePrompt, negativePrompt }, generation: { variants, aspectRatio, model, cfg, seeds } }).
Orchestration contracts: CinematicJobRequestSchema is the most critical — write this first within the orchestration folder.
Pipeline node contract: extract field vocabulary from mikageRuntimeContract.mjs salvage.
Done: pnpm --filter @mikage/contracts typecheck passes. All exported schemas validate sample data.

Step 1.4 — @mikage/database

Write packages/database/prisma/schema.prisma with all 26 canonical tables from MVP spec Section 6.
Cross-reference against migrations-reference/ SQL files to confirm field names.
Extensions: uuid-ossp + vector.
Write packages/database/src/neo4j.ts — Neo4j driver wrapper.
Write packages/database/src/redis.ts — Redis client wrapper.
Run pnpm migrate — verify all tables created in PostgreSQL.
Apply data/neo4j/constraints.cypher + data/neo4j/indexes.cypher.
Done: prisma migrate status shows all migrations applied. Neo4j constraints verified via browser.

Step 1.5 — @mikage/queue

Write packages/queue/src/queues.ts — define queue names: cinematic-image-pipeline, generation-execute, ingestion-process.
Write BullMQ client factory.
Done: pnpm --filter @mikage/queue typecheck passes.

Step 1.6 — @mikage/storage

Write MinIO/S3 client using AWS SDK v3.
Write packages/storage/src/object-paths.ts — path schema: {project_id}/{job_id}/{asset_code}.{ext}.
Read assetStorage.mjs salvage for operation list to implement: put, get, delete, list, signed URL, fallback handling.
Done: pnpm --filter @mikage/storage typecheck passes. Manual put/get against local MinIO succeeds.

Step 1.7 — @mikage/logging

Write structured logger (pino recommended).
Done: pnpm --filter @mikage/logging typecheck passes.

Step 1.8 — @mikage/testing

Write packages/testing/src/fixtures/mikage-brief.fixture.ts — ADOPT from mikageBrief.json, wrapped in typed factory.
Write packages/testing/src/fixtures/mock-generation.fixture.ts — ADOPT from mockGenerationResponse.json.
Done: pnpm --filter @mikage/testing typecheck passes.


Layer 2 — Data seeds (prerequisite for all service startup)
Step 2.1 — Prepare seed files

data/seeds/000_projects.seed.json — create { slug: "mikage", name: "Mikage", status: "active" }.
data/seeds/001_canon_rules.seed.json — ADOPT from canon_invariants.json.txt. Schema-map to CanonRule. Diff against CANON_VALIDATOR_RULE_PACK_v1. Resolve conflicts in canonical's favor.
data/seeds/002_validator_rulepacks.seed.json — ADOPT from review_rubric.json.txt + qc_checklists.json. Map to ValidatorRulepack schema.
data/seeds/003_world_entities.seed.json — create minimum: Mikage character entity, anchor_leia_041, rooftop location, scene, shot for MVP job. ADOPT environment_registry + japanese-art-grammar for visual_dna_profile entities.
data/seeds/010_prompt_presets.seed.json — ADOPT from preset_registry.json. Map to canonical PromptPreset schema. Must include mikage_cinematic_portrait preset at minimum.
data/seeds/011_prompt_variants.seed.json — must include storm_rooftop_action variant at minimum.
data/seeds/013_benchmark_sets.seed.json — define 3 sets: gold_visual_dna, silver_scene_set, red_drift_examples. Criteria is metadata-based only at MVP stage.
data/seeds/014_provider_profiles.seed.json — define mock_image_provider with capability image_generation.

Step 2.2 — Run seed

pnpm seed — verify all tables populated.
pnpm seed:neo4j — verify constraints + Mikage entity node created.

Done condition: SELECT count(*) FROM canon_rules > 0. Neo4j MATCH (n:WorldEntity) RETURN n returns Mikage character node.

Layer 3 — Domain services (can be built in parallel after Layer 2)
Step 3.1 — @mikage/canon-service

Implement CanonRulesRepository — reads from PostgreSQL canon_rules + validator_rulepacks.
Implement CanonValidationService.validatePromptPack() — minimum checks from MVP spec Section 9.1: anchor exists, preset exists, variant belongs to preset, state snapshot present if required, no forbidden drift terms, lineage complete.
Implement endpoint POST /canon/validate/prompt-pack.
Read mikageAgentConstitution.mjs salvage to extract any rule content not in the seed. Add to seed if missing.
Done: POST /canon/validate/prompt-pack with valid context returns { valid: true, violations: [] }. With a forbidden term returns blocker violation.

Step 3.2 — @mikage/world-service

Implement WorldEntityRepository + TimelineAnchorRepository.
Implement SceneService + TimelineService.
Implement POST /world/resolve-context — returns project, character, anchor, scene, shot, location, era, world refs.
Implement WorldGraphWriter — writes canonical WorldEntity nodes to Neo4j on seed load.
Done: POST /world/resolve-context with { characterCode: "char_mikage", anchorCode: "anchor_leia_041", sceneCode: "scene_rooftop_confrontation", shotCode: "shot_low_angle_heroic_damaged_stillness" } returns full world context object.

Step 3.3 — @mikage/state-service

Implement CharacterStateSnapshotRepository.
Implement POST /state/resolve-snapshot — finds snapshot for character + anchor.
Done: Returns valid snapshot for Mikage at anchor_leia_041 (must be in seed data).


Layer 4 — Production services (depend on Layer 3)
Step 4.1 — @mikage/prompt-service

Implement PresetRepository + VariantRepository + NegativeProfileRepository.
Implement PromptCompiler class — synthesised from reading all 6 compiler salvage files together. Follow the 10-step compile flow from MVP spec Section 9.4.
Implement VisualGrammarCompiler — extracted from studioVisualGrammarCompiler.mjs.
Implement POST /prompt/compile.
Done: POST /prompt/compile with full world context + state snapshot + preset + variant returns a CompiledPromptPack with non-empty compiledPrompt and negativePrompt.

Step 4.2 — @mikage/generation-service

Extract all 8 layers from imagenService.mjs salvage into separate canonical TypeScript modules.
Implement IProviderAdapter interface first — all adapters implement this.
Implement MockAdapter first (enables full pipeline test without external API).
Implement ImagenAdapter second (extracted from Vertex implementation).
Implement OpenAIAdapter third (extracted from OpenAI implementation).
Implement GenerationService.execute() — accepts compiled prompt pack, routes to provider, returns normalized outputs.
Implement POST /generation/execute.
Critical: requirePersistedAssets flag from imagenService must be preserved — if storage falls back to inline data URL, throw 502.
Done: POST /generation/execute with mock provider returns 4 normalized asset records with dimensions. With requirePersistedAssets=true and MinIO running, assets are stored and URLs are returned.


Layer 5 — Ingestion and downstream (depend on Layer 4)
Step 5.1 — @mikage/ingestion-service

Implement AssetRepository — writes to PostgreSQL assets + asset_manifests + ingestion_reports.
Implement LineageGraphWriter — writes canonical Neo4j lineage edges after asset creation.
Implement POST /ingestion/ingest-generation-output.
Embedding: placeholder vector(1536) of zeros at MVP. Real embeddings in next iteration.
Done: After ingest call, SELECT * FROM assets WHERE job_id = ? returns 4 asset records. Neo4j MATCH (a:Asset)-[:GENERATED_BY]->(j:Job) returns connected nodes.

Step 5.2 — @mikage/benchmark-service

Implement MetadataScorer — scores asset against benchmark_sets criteria using metadata match + negative term absence + lineage completeness.
Implement DriftDetector — reads red_drift_examples set, flags canonical drift patterns.
Implement POST /benchmark/compare-asset.
Done: Returns { goldScore: 0.x, silverScore: 0.x, redFlagRate: 0.x, riskLevel: "low|medium|high" }.

Step 5.3 — @mikage/review-service

Implement ReviewTaskRepository.
Implement auto-task creation: one review task per asset after benchmark.
Implement hard blocks: lineage incomplete, drift blocker, pre-validation blocker.
Implement POST /review/tasks + POST /review/tasks/:taskCode/decision.
Done: Review task created. Decision approve updates asset status to approved. Decision reject blocks.


Layer 6 — Orchestration (ties all services together)
Step 6.1 — @mikage/orchestration-service

Implement CinematicImageWorkflow — the 16-step canonical workflow from MVP spec Section 10.
Each step: write job_step record → call service → update step status → proceed or hard-fail.
Implement LineageCheckService — validates mandatory chain at each step.
Implement CinematicImageWorker — BullMQ worker consuming cinematic-image-pipeline queue.
Implement POST /orchestration/jobs/cinematic-image.
Read mikageStudioWorkflow.js + mikageAgentOrchestrator.mjs salvage immediately before writing this file. Do not write until both are read.
Done: POST /orchestration/jobs/cinematic-image with canonical MVP job request returns { jobCode: "...", status: "queued" }. BullMQ worker picks up job and runs to completion. All 16 job_steps records created.

Step 6.2 — @mikage/api-gateway

Wire proxies to orchestration, generation, review services.
Implement health endpoint.
Done: Single port exposes all service routes.


Layer 7 — Studio Web (parallel with Layer 6)
Step 7.1 — SCI framework

Initialize Next.js app with App Router.
Implement sidebar navigation with 12 canonical SCI pages from SCI spec Section 4.
Adopt all 11 StatusPill/MetricCard/DetailPanel etc. components (JSX→TSX conversion).
Adopt JobReceipt.tsx directly.
Done: Navigation renders. All page routes exist (content can be placeholder).

Step 7.2 — Dashboard page

Implement dashboard with 5 panels: Active Requests, Pipeline Health, Canon Integrity, Asset Production, Benchmark Metrics.
Wire to API gateway. Data from GET /orchestration/jobs and service health endpoints.
Extract panel layout concept from ControlRoom + Dashboard salvage.
Done: Dashboard loads and shows real data from running pipeline.

Step 7.3 — Jobs page

Implement IntakeNew concept: form fields matching CinematicJobRequestSchema.
Implement JobDetail concept: execution trace display showing job_steps.
Done: Can submit a job from UI. Can view pipeline execution step by step.


F. FIRST RUNNABLE SLICE
The minimal subset of services required to execute one complete pipeline run and prove every canonical contract. All other services can be stubs or absent.
Minimum services required
ServiceRole in sliceCan be mocked?orchestration-serviceEntry point, workflow coordinator, job trackingNo — must runcanon-serviceHard-gate pre-validationNo — hard-fail depends on itworld-serviceContext resolutionNo — prompt compilation depends on itstate-serviceState snapshot resolutionNo — canon validation depends on itprompt-servicePrompt compilationNo — generation input depends on itgeneration-serviceAsset generationNo — but mock provider eliminates external API dependencyingestion-serviceAsset storage + lineage writeNo — lineage completeness check depends on itbenchmark-serviceDrift gateNo — review task creation depends on benchmark resultreview-serviceReview task creationNo — job completion depends on itapi-gatewayRoutingYes — can call services directly at firstworld-service (Neo4j)Lineage graphNo — but placeholder write is acceptable at firststudio-webUIYes — CLI/script sufficient for first slice
Minimum infrastructure required

PostgreSQL (all 26 tables migrated)
Redis (BullMQ queue)
MinIO (asset object storage — mock provider still calls persistAssetsWithFallback)
Neo4j (lineage graph — minimum: constraints applied, seed entity nodes present)

First runnable slice execution
Trigger: pnpm mvp:run executing scripts/run-mvp-job.ts
Request payload (canonical):
json{
  "projectSlug": "mikage",
  "characterCode": "char_mikage",
  "anchorCode": "anchor_leia_041",
  "presetCode": "mikage_cinematic_portrait",
  "variantCode": "storm_rooftop_action",
  "sceneCode": "scene_rooftop_confrontation",
  "shotCode": "shot_low_angle_heroic_damaged_stillness",
  "providerCode": "mock_image_provider",
  "outputCount": 4
}
Expected outcome — all 16 steps complete:
StepExpected record createdHard-fail condition1 intake_jobjobs row, status=queuedRequest fails schema parse2 load_project_policyCanon rules + rulepack loadedProject not found3 resolve_world_contextWorld context objectCharacter/anchor/scene/shot not found4 resolve_state_snapshotSnapshot for Mikage at anchor_leia_041Preset requires state, no snapshot5 compile_prompt_packcompiled_prompt_packs rowLineage incomplete6 pre_generation_canon_validationValidation report, no blockerCanon blocker found7 route_providerProvider profile loadedNo provider with image_generation capability8 execute_generation4 normalized provider outputsProvider returns 0 assets9 normalize_outputsStandardized asset metadataNone10 ingest_assets4 assets rows + 4 asset_manifests + 1 ingestion_reportMinIO write fails and requirePersistedAssets=true11 compute_embeddings4 embedding_records (placeholder vector)None12 compare_benchmarks4 benchmark_scores + 4 drift_reportsDrift score > 0.35 blocks13 create_review_tasks4 review_tasksLineage blocker14 archive_outputs1 archives rowNone15 sync_lineage_graphNeo4j: Asset→GENERATED_BY→Job, Asset→DERIVES_FROM→CompiledPromptPack, Asset→ANCHORED_AT→TimelineAnchor, + 3 more edgesNone16 complete_jobjobs status=completedNone
Proof of slice completion:
sql-- PostgreSQL verification
SELECT j.status, count(js.id) as steps_completed
FROM jobs j
JOIN job_steps js ON js.job_id = j.id
WHERE j.job_code = :job_code
GROUP BY j.status;
-- Expected: status=completed, steps_completed=16

SELECT count(*) FROM assets WHERE job_id = :job_id;
-- Expected: 4

SELECT count(*) FROM review_tasks WHERE job_id = :job_id;
-- Expected: 4

SELECT count(*) FROM embedding_records er
JOIN assets a ON a.id = er.asset_id
WHERE a.job_id = :job_id;
-- Expected: 4
cypher// Neo4j verification
MATCH (a:Asset)-[:GENERATED_BY]->(j:Job {id: $job_id})
RETURN count(a)
// Expected: 4

MATCH (a:Asset)-[:DERIVES_FROM]->(cp:CompiledPromptPack)
WHERE a.job_id = $job_id
RETURN count(a)
// Expected: 4
Slice is runnable when: pnpm mvp:run completes with exit 0 and both SQL and Cypher verification queries return expected counts.
This is the canonical proof of pipeline — every architectural contract has been exercised: request → context resolve → prompt compile → canon validate → generate (mock) → ingest → benchmark → review task → lineage graph. The pipeline is provably end-to-end before any real provider or UI is required.