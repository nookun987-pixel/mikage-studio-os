**Target state:** Runnable scaffold → microservice MVP architecture

---

## **1\. System objective**

This phase extracts domain responsibilities out of the orchestration-heavy scaffold and turns the current MVP into a service-based architecture where:

* **orchestration-service** only coordinates workflow

* domain decisions move into dedicated services

* generation remains provider-pluggable

* validation and prompt compilation become first-class internal APIs

* ingestion becomes a normalization boundary instead of inline post-processing

This pack defines the **single build path** for the next implementation step.

---

# **2\. Service map**

## **Core extracted services**

### **`canon-service`**

Owns canon law, invariants, ontology checks, drift rules, validation profiles.

### **`world-service`**

Owns world bible entities, locations, factions, objects, era context, relation lookup.

### **`state-service`**

Owns character state, injury state, loyalty, knowledge state, timeline snapshots.

### **`prompt-service`**

Owns prompt compilation, context assembly formatting, negative prompt generation, manifest-ready prompt packs.

### **`generation-service`**

Owns provider adapters, generation requests, provider normalization, asset result envelopes.

### **Existing supporting services retained**

### **`orchestration-service`**

Pure workflow coordinator. No canon logic. No prompt-building logic. No provider-specific logic.

### **`ingestion-service`**

Owns asset normalization, checksuming, metadata extraction, embedding dispatch, storage manifest creation.

### **`benchmark-service`**

Owns similarity scoring, benchmark compare, drift score, quality band scoring.

### **`review-service`**

Owns review task creation, review queue, review policy projection.

### **`archive-service`**

If not yet separate, extract now or keep thin inside ingestion temporarily. Recommended: separate service in Level-3. For this phase it can remain minimal or attached to ingestion.

---

# **3\. Exact service boundaries**

## **3.1 `canon-service`**

### **Owns**

* Canon Constitution

* ontology rules

* absolute invariants

* forbidden drift profiles

* canon validation against compiled generation intent

* validation of returned asset metadata against expected canon envelope

### **Does not own**

* world facts storage

* character state storage

* prompt formatting

* generation dispatch

* embeddings

* review queue persistence

### **Main inputs**

* job intent

* structured world context

* structured state snapshot

* compiled prompt pack

* generation metadata / asset manifest

### **Main outputs**

* validation result

* violations list

* warnings

* canon risk score

* drift rule hits

---

## **3.2 `world-service`**

### **Owns**

* world bible read/write API

* world entities

* locations

* factions

* technology records

* event chronology facts

* relation graph lookup facade

### **Does not own**

* character live state

* prompt text

* canon law

* provider generation

### **Main outputs**

* world context bundle

* related entities pack

* location pack

* era pack

* relation graph fragments

---

## **3.3 `state-service`**

### **Owns**

* character state snapshots

* timeline sync

* injury model

* loyalty model

* knowledge state

* recent causality chain lookup

* continuity constraints at state level

### **Does not own**

* global world lore

* canon law

* prompt rendering

* asset generation

### **Main outputs**

* current snapshot

* timeline-consistent resolved snapshot

* state validation hints

* continuity risks

---

## **3.4 `prompt-service`**

### **Owns**

* compilation of structured inputs into provider-ready prompt packs

* negative prompt assembly

* style pack injection

* scene pack formatting

* prompt manifest output

* lineage-ready input hash material

### **Does not own**

* raw canon authority

* raw world/state persistence

* generation execution

* benchmark scoring

### **Main outputs**

* compiled prompt pack

* negative prompt

* generation parameters

* prompt manifest

* prompt lineage hash

---

## **3.5 `generation-service`**

### **Owns**

* provider adapter abstraction

* image/video/trailer generation dispatch

* provider request mapping

* provider response normalization

* retry policy around providers

* provider capability registry

### **Does not own**

* canon truth

* world/state truth

* review creation

* archive persistence

* benchmark scoring

### **Main outputs**

* normalized generated assets

* provider execution metadata

* raw provider artifacts reference

* generation attempt records

---

## **3.6 `ingestion-service`**

### **Owns**

* asset normalization

* metadata extraction

* checksuming

* storage persistence

* manifest creation

* embedding job request emission

* lineage node contribution payload

### **Does not own**

* benchmark scoring rules

* canon validation logic

* review policy

* prompt building

---

## **3.7 `orchestration-service`**

### **Owns**

* workflow state machine

* job routing

* step sequencing

* failure handling

* retries at workflow level

* saga / compensation logic where needed

### **Does not own**

* canon logic

* prompt construction

* generation provider logic

* asset normalization rules

---

# **4\. Target runtime topology**

                       \+----------------------+  
                       |   API Gateway        |  
                       |  /internal/\*         |  
                       \+----------+-----------+  
                                  |  
               \+------------------+------------------+  
               |                  |                  |  
               v                  v                  v  
    \+----------------+  \+----------------+  \+------------------+  
    | orchestration  |  | canon-service  |  | prompt-service   |  
    \+--------+-------+  \+-------+--------+  \+--------+---------+  
             |                  ^                    ^  
             |                  |                    |  
             v                  |                    |  
    \+----------------+          |          \+---------+----------+  
    | world-service  |----------+----------| state-service      |  
    \+----------------+                     \+--------------------+

             |  
             v  
    \+--------------------+  
    | generation-service |  
    \+---------+----------+  
              |  
              v  
    \+--------------------+  
    | ingestion-service  |  
    \+---------+----------+  
              |  
      \+-------+--------+  
      |                |  
      v                v  
\+-------------+   \+-------------+  
| benchmark   |   | review      |  
| service     |   | service     |  
\+-------------+   \+-------------+  
---

# **5\. Sync vs async strategy**

## **Sync calls**

Use sync HTTP for request/response steps that must complete within workflow decision boundaries:

* orchestration → world-service

* orchestration → state-service

* orchestration → prompt-service

* orchestration → canon-service (pre-generation validation)

* orchestration → generation-service

* orchestration → ingestion-service

* orchestration → benchmark-service

* orchestration → review-service

## **Async events**

Use async eventing for side-effects and later expansion:

* asset.ingested

* embeddings.requested

* lineage.sync.requested

* review.created

* benchmark.completed

* generation.completed

* job.completed

* job.failed

## **Rule**

For Level-2 MVP:

* workflow remains **primarily sync**

* events are emitted **after stateful milestones**

* do **not** move core orchestration to event choreography yet

This keeps the system debuggable and locally runnable.

---

# **6\. Local dev routing and ports**

## **Gateway / service ports**

gateway                : 7000  
orchestration-service  : 7010  
canon-service          : 7011  
world-service          : 7012  
state-service          : 7013  
prompt-service         : 7014  
generation-service     : 7015  
ingestion-service      : 7016  
benchmark-service      : 7017  
review-service         : 7018

## **Infra**

postgres               : 5432  
neo4j                  : 7687 / 7474  
redis                  : 6379  
minio                  : 9000 / 9001  
nats or rabbitmq       : 4222 / 15672

Recommended for Level-2: **NATS** for simple internal event bus.

---

# **7\. Monorepo layout**

mikage/  
├─ apps/  
│  ├─ gateway/  
│  ├─ orchestration-service/  
│  ├─ canon-service/  
│  ├─ world-service/  
│  ├─ state-service/  
│  ├─ prompt-service/  
│  ├─ generation-service/  
│  ├─ ingestion-service/  
│  ├─ benchmark-service/  
│  └─ review-service/  
│  
├─ packages/  
│  ├─ shared-config/  
│  ├─ shared-types/  
│  ├─ shared-http/  
│  ├─ shared-auth/  
│  ├─ shared-events/  
│  ├─ shared-logging/  
│  ├─ shared-errors/  
│  ├─ shared-lineage/  
│  ├─ prompt-contracts/  
│  ├─ canon-contracts/  
│  ├─ generation-contracts/  
│  └─ storage-contracts/  
│  
├─ data/  
│  ├─ seeds/  
│  ├─ canon/  
│  ├─ benchmarks/  
│  └─ fixtures/  
│  
├─ infra/  
│  ├─ docker/  
│  ├─ compose/  
│  ├─ nginx/  
│  └─ observability/  
│  
├─ scripts/  
├─ tests/  
│  ├─ contract/  
│  ├─ integration/  
│  ├─ smoke/  
│  └─ fixtures/  
└─ turbo.json  
---

# **8\. Folder structure per extracted service**

## **Example template used by every service**

apps/canon-service/  
├─ src/  
│  ├─ main.ts  
│  ├─ app.module.ts  
│  ├─ config/  
│  │  ├─ env.schema.ts  
│  │  └─ service.config.ts  
│  ├─ controllers/  
│  │  └─ canon.controller.ts  
│  ├─ modules/  
│  │  └─ canon.module.ts  
│  ├─ services/  
│  │  ├─ canon-validation.service.ts  
│  │  ├─ ontology-rule.service.ts  
│  │  ├─ drift-rule.service.ts  
│  │  └─ constitution.service.ts  
│  ├─ repositories/  
│  │  └─ canon-profile.repository.ts  
│  ├─ dto/  
│  │  ├─ validate-canon.request.ts  
│  │  └─ validate-canon.response.ts  
│  ├─ mappers/  
│  ├─ domain/  
│  │  ├─ rules/  
│  │  ├─ models/  
│  │  └─ enums/  
│  └─ health/  
│     └─ health.controller.ts  
├─ test/  
└─ package.json

## **`world-service`**

apps/world-service/src/  
├─ controllers/world.controller.ts  
├─ services/  
│  ├─ world-context.service.ts  
│  ├─ relation-query.service.ts  
│  ├─ era-context.service.ts  
│  └─ location-context.service.ts  
├─ repositories/  
│  ├─ world-entity.repository.ts  
│  ├─ world-relation.repository.ts  
│  └─ world-event.repository.ts  
├─ dto/  
│  ├─ resolve-world-context.request.ts  
│  └─ resolve-world-context.response.ts  
└─ domain/  
  ├─ models/  
  └─ enums/

## **`state-service`**

apps/state-service/src/  
├─ controllers/state.controller.ts  
├─ services/  
│  ├─ state-snapshot.service.ts  
│  ├─ timeline-sync.service.ts  
│  ├─ injury-state.service.ts  
│  ├─ loyalty-state.service.ts  
│  └─ knowledge-state.service.ts  
├─ repositories/  
│  ├─ character-state.repository.ts  
│  ├─ timeline.repository.ts  
│  └─ state-transition.repository.ts  
├─ dto/  
└─ domain/

## **`prompt-service`**

apps/prompt-service/src/  
├─ controllers/prompt.controller.ts  
├─ services/  
│  ├─ prompt-compiler.service.ts  
│  ├─ negative-prompt.service.ts  
│  ├─ style-pack.service.ts  
│  ├─ scene-pack.service.ts  
│  └─ manifest-builder.service.ts  
├─ dto/  
├─ templates/  
│  ├─ cinematic-frame.template.ts  
│  ├─ trailer-sequence.template.ts  
│  └─ portrait.template.ts  
└─ domain/

## **`generation-service`**

apps/generation-service/src/  
├─ controllers/generation.controller.ts  
├─ services/  
│  ├─ generation-dispatch.service.ts  
│  ├─ provider-registry.service.ts  
│  ├─ capability.service.ts  
│  └─ retry-policy.service.ts  
├─ adapters/  
│  ├─ base.provider.ts  
│  ├─ mock-image.provider.ts  
│  ├─ gemini-image.provider.ts  
│  └─ seedance-video.provider.ts  
├─ dto/  
└─ domain/  
---

# **9\. Internal API contracts**

All internal endpoints should live under:

/internal/v1/\*

All responses use envelope:

type InternalResponse\<T\> \= {  
 ok: boolean;  
 traceId: string;  
 data?: T;  
 error?: {  
   code: string;  
   message: string;  
   details?: unknown;  
 };  
};  
---

## **9.1 `world-service` API**

### **POST `/internal/v1/world/resolve-context`**

**Request**

export type ResolveWorldContextRequest \= {  
 universeId: string;  
 projectId: string;  
 eraId?: string;  
 locationId?: string;  
 factionIds?: string\[\];  
 characterIds?: string\[\];  
 sceneIntent?: string;  
};

**Response**

export type ResolveWorldContextResponse \= {  
 worldContextId: string;  
 era: {  
   id: string;  
   name: string;  
   summary: string;  
 } | null;  
 location: {  
   id: string;  
   name: string;  
   summary: string;  
   atmosphereTags: string\[\];  
 } | null;  
 factions: Array\<{  
   id: string;  
   name: string;  
   role: string;  
 }\>;  
 relatedEntities: Array\<{  
   id: string;  
   type: string;  
   name: string;  
   relevanceScore: number;  
 }\>;  
 canonFacts: string\[\];  
 relationEdges: Array\<{  
   from: string;  
   to: string;  
   type: string;  
 }\>;  
};  
---

## **9.2 `state-service` API**

### **POST `/internal/v1/state/resolve-snapshot`**

**Request**

export type ResolveStateSnapshotRequest \= {  
 projectId: string;  
 timelinePoint?: string;  
 characterIds: string\[\];  
 locationId?: string;  
 narrativeIntent?: string;  
};

**Response**

export type ResolveStateSnapshotResponse \= {  
 snapshotId: string;  
 timelinePoint: string;  
 characters: Array\<{  
   characterId: string;  
   poseState?: string;  
   injuryState?: string\[\];  
   loyaltyState?: Record\<string, number\>;  
   knowledgeState?: string\[\];  
   emotionalState?: string\[\];  
   continuityWarnings?: string\[\];  
 }\>;  
 continuityRiskScore: number;  
};  
---

## **9.3 `canon-service` APIs**

### **POST `/internal/v1/canon/validate-pre-generation`**

**Request**

export type ValidatePreGenerationRequest \= {  
 projectId: string;  
 jobId: string;  
 objective: string;  
 worldContext: ResolveWorldContextResponse;  
 stateSnapshot: ResolveStateSnapshotResponse;  
 promptIntent: {  
   shotType: string;  
   aestheticProfile: string;  
   requestedElements: string\[\];  
   forbiddenElements?: string\[\];  
 };  
};

**Response**

export type ValidatePreGenerationResponse \= {  
 valid: boolean;  
 riskScore: number;  
 warnings: string\[\];  
 violations: Array\<{  
   code: string;  
   message: string;  
   severity: "low" | "medium" | "high" | "critical";  
 }\>;  
 enforcedConstraints: {  
   requiredTags: string\[\];  
   forbiddenTags: string\[\];  
   styleLocks: string\[\];  
 };  
};

### **POST `/internal/v1/canon/validate-post-generation`**

**Request**

export type ValidatePostGenerationRequest \= {  
 projectId: string;  
 jobId: string;  
 generatedAssets: Array\<{  
   assetId: string;  
   metadata: Record\<string, unknown\>;  
   inferredTags?: string\[\];  
 }\>;  
 expectedEnvelope: {  
   styleLocks: string\[\];  
   requiredTags: string\[\];  
   forbiddenTags: string\[\];  
 };  
};

**Response**

export type ValidatePostGenerationResponse \= {  
 valid: boolean;  
 assetResults: Array\<{  
   assetId: string;  
   valid: boolean;  
   driftScore: number;  
   violations: string\[\];  
 }\>;  
};  
---

## **9.4 `prompt-service` API**

### **POST `/internal/v1/prompt/compile`**

**Request**

export type CompilePromptRequest \= {  
 projectId: string;  
 jobId: string;  
 objective: "cinematic\_frame" | "character\_portrait" | "trailer\_sequence";  
 variant: string;  
 worldContext: ResolveWorldContextResponse;  
 stateSnapshot: ResolveStateSnapshotResponse;  
 canonConstraints: ValidatePreGenerationResponse\["enforcedConstraints"\];  
 creativeIntent: {  
   subject: string;  
   action?: string;  
   framing?: string;  
   mood?: string;  
 };  
 outputCount: number;  
};

**Response**

export type CompilePromptResponse \= {  
 promptPackId: string;  
 prompt: string;  
 negativePrompt: string;  
 providerHints: {  
   aspectRatio?: string;  
   stylePreset?: string;  
   qualityTier?: string;  
 };  
 manifests: Array\<{  
   index: number;  
   seedHint: string;  
   expectedTags: string\[\];  
 }\>;  
 lineageHash: string;  
};  
---

## **9.5 `generation-service` API**

### **POST `/internal/v1/generation/execute`**

**Request**

export type ExecuteGenerationRequest \= {  
 projectId: string;  
 jobId: string;  
 provider: "mock" | "gemini-image" | "seedance-video";  
 promptPack: CompilePromptResponse;  
 outputCount: number;  
};

**Response**

export type ExecuteGenerationResponse \= {  
 generationRunId: string;  
 provider: string;  
 outputs: Array\<{  
   index: number;  
   mimeType: string;  
   tempUri: string;  
   width?: number;  
   height?: number;  
   providerAssetId?: string;  
   providerMetadata?: Record\<string, unknown\>;  
 }\>;  
};  
---

## **9.6 `ingestion-service` API**

### **POST `/internal/v1/ingestion/assets`**

**Request**

export type IngestAssetsRequest \= {  
 projectId: string;  
 jobId: string;  
 promptPackId: string;  
 generationRunId: string;  
 outputs: ExecuteGenerationResponse\["outputs"\];  
};

**Response**

export type IngestAssetsResponse \= {  
 batchId: string;  
 assets: Array\<{  
   assetId: string;  
   storageUri: string;  
   checksum: string;  
   manifestId: string;  
   normalizedMetadata: Record\<string, unknown\>;  
 }\>;  
 emittedEvents: string\[\];  
};  
---

## **9.7 `benchmark-service` API**

### **POST `/internal/v1/benchmark/compare`**

export type BenchmarkCompareRequest \= {  
 projectId: string;  
 batchId: string;  
 assets: IngestAssetsResponse\["assets"\];  
};  
export type BenchmarkCompareResponse \= {  
 results: Array\<{  
   assetId: string;  
   similarityScore: number;  
   driftScore: number;  
   qualityBand: "gold" | "silver" | "red";  
 }\>;  
};  
---

## **9.8 `review-service` API**

### **POST `/internal/v1/review/tasks`**

export type CreateReviewTasksRequest \= {  
 projectId: string;  
 jobId: string;  
 assets: IngestAssetsResponse\["assets"\];  
 benchmarkResults: BenchmarkCompareResponse\["results"\];  
};  
export type CreateReviewTasksResponse \= {  
 tasks: Array\<{  
   reviewTaskId: string;  
   assetId: string;  
   queue: string;  
   priority: "low" | "medium" | "high";  
 }\>;  
};  
---

# **10\. Orchestration workflow update**

## **New call graph**

1\. intake\_job  
  |  
2\. orchestration-service  
  |  
  \+--\> world-service.resolve-context  
  |  
  \+--\> state-service.resolve-snapshot  
  |  
  \+--\> canon-service.validate-pre-generation  
  |  
  \+--\> prompt-service.compile  
  |  
  \+--\> generation-service.execute  
  |  
  \+--\> ingestion-service.assets  
  |  
  \+--\> canon-service.validate-post-generation  
  |  
  \+--\> benchmark-service.compare  
  |  
  \+--\> review-service.tasks  
  |  
  \+--\> lineage event emit  
  |  
  \+--\> archive manifest finalize  
  |  
3\. complete\_job

## **Updated workflow state machine**

RECEIVED  
→ WORLD\_RESOLVED  
→ STATE\_RESOLVED  
→ CANON\_PRECHECKED  
→ PROMPT\_COMPILED  
→ GENERATED  
→ INGESTED  
→ CANON\_POSTCHECKED  
→ BENCHMARKED  
→ REVIEW\_CREATED  
→ ARCHIVED  
→ COMPLETED

## **Failure states**

FAILED\_WORLD\_RESOLUTION  
FAILED\_STATE\_RESOLUTION  
FAILED\_CANON\_PRECHECK  
FAILED\_PROMPT\_COMPILATION  
FAILED\_GENERATION  
FAILED\_INGESTION  
FAILED\_CANON\_POSTCHECK  
FAILED\_BENCHMARK  
FAILED\_REVIEW\_CREATION  
---

# **11\. Prompt compiler architecture**

## **Responsibilities**

The prompt compiler must convert structured truth into deterministic prompt artifacts.

## **Internal layers**

input normalization  
→ canon constraint injection  
→ visual dna injection  
→ scene composition  
→ negative prompt synthesis  
→ provider hint synthesis  
→ manifest expansion  
→ lineage hashing

## **Prompt compiler modules**

prompt-service/src/services/  
├─ prompt-compiler.service.ts  
├─ sections/  
│  ├─ objective-section.builder.ts  
│  ├─ subject-section.builder.ts  
│  ├─ environment-section.builder.ts  
│  ├─ style-section.builder.ts  
│  ├─ constraint-section.builder.ts  
│  └─ negative-section.builder.ts  
├─ resolvers/  
│  ├─ shot-resolver.ts  
│  ├─ mood-resolver.ts  
│  └─ style-lock-resolver.ts  
└─ templates/

## **Core rule**

Prompt compiler accepts only:

* structured world context

* structured state snapshot

* canon enforced constraints

* job creative intent

It must **never** reach directly into DB or other services.

## **Skeleton**

// apps/prompt-service/src/services/prompt-compiler.service.ts  
import { Injectable } from "@nestjs/common";  
import { CompilePromptRequest, CompilePromptResponse } from "../dto/contracts";

@Injectable()  
export class PromptCompilerService {  
 compile(input: CompilePromptRequest): CompilePromptResponse {  
   const prompt \= this.buildPrompt(input);  
   const negativePrompt \= this.buildNegativePrompt(input);  
   const manifests \= Array.from({ length: input.outputCount }).map((\_, index) \=\> ({  
     index,  
     seedHint: \`${input.jobId}:${index}\`,  
     expectedTags: \[  
       ...input.canonConstraints.requiredTags,  
       input.creativeIntent.subject,  
     \],  
   }));

   return {  
     promptPackId: \`pp\_${input.jobId}\`,  
     prompt,  
     negativePrompt,  
     providerHints: {  
       aspectRatio: "16:9",  
       stylePreset: "mikage\_cinematic",  
       qualityTier: "high",  
     },  
     manifests,  
     lineageHash: this.hashLineage(input),  
   };  
 }

 private buildPrompt(input: CompilePromptRequest): string {  
   return \[  
     \`objective: ${input.objective}\`,  
     \`variant: ${input.variant}\`,  
     \`subject: ${input.creativeIntent.subject}\`,  
     \`framing: ${input.creativeIntent.framing ?? "cinematic wide frame"}\`,  
     \`mood: ${input.creativeIntent.mood ?? "restrained intensity"}\`,  
     \`world facts: ${input.worldContext.canonFacts.join("; ")}\`,  
     \`state continuity: ${input.stateSnapshot.characters.map(c \=\> \`${c.characterId}:${(c.injuryState ?? \[\]).join(",")}\`).join(" | ")}\`,  
     \`required style locks: ${input.canonConstraints.styleLocks.join(", ")}\`,  
   \].join("\\n");  
 }

 private buildNegativePrompt(input: CompilePromptRequest): string {  
   return \[  
     ...input.canonConstraints.forbiddenTags,  
     "childish anime idol",  
     "generic neon overload",  
     "fantasy magic aesthetic",  
     "soft pastel glamour",  
     "pop fashion drift",  
   \].join(", ");  
 }

 private hashLineage(input: CompilePromptRequest): string {  
   return Buffer.from(JSON.stringify({  
     projectId: input.projectId,  
     jobId: input.jobId,  
     variant: input.variant,  
     subject: input.creativeIntent.subject,  
   })).toString("base64url");  
 }  
}  
---

# **12\. Canon validator architecture**

## **Responsibilities**

Canon validator is an enforcement engine, not a lore renderer.

## **Internal sub-engines**

constitution rules  
→ ontology rules  
→ invariant rules  
→ style drift rules  
→ continuity rules  
→ scoring aggregator

## **Validation modes**

### **Pre-generation validation**

Checks request intent before prompt is compiled/executed.

### **Post-generation validation**

Checks generated asset metadata/tags/manifests after ingestion.

## **Rule model**

export type CanonRuleResult \= {  
 code: string;  
 passed: boolean;  
 severity: "low" | "medium" | "high" | "critical";  
 message: string;  
};

## **Skeleton**

// apps/canon-service/src/services/canon-validation.service.ts  
import { Injectable } from "@nestjs/common";  
import {  
 ValidatePreGenerationRequest,  
 ValidatePreGenerationResponse,  
} from "../dto/contracts";

@Injectable()  
export class CanonValidationService {  
 validatePre(input: ValidatePreGenerationRequest): ValidatePreGenerationResponse {  
   const violations \= \[\];  
   const warnings \= \[\];

   const requested \= new Set(input.promptIntent.requestedElements.map(x \=\> x.toLowerCase()));

   if (requested.has("magic")) {  
     violations.push({  
       code: "CANON\_MAGIC\_FORBIDDEN",  
       message: "Magic-like framing violates ontology and invariants.",  
       severity: "critical" as const,  
     });  
   }

   if (requested.has("neon idol fashion")) {  
     violations.push({  
       code: "STYLE\_DRIFT\_NEON\_IDOL",  
       message: "Neon idol drift is forbidden.",  
       severity: "high" as const,  
     });  
   }

   return {  
     valid: violations.length \=== 0,  
     riskScore: violations.length ? 0.92 : 0.18,  
     warnings,  
     violations,  
     enforcedConstraints: {  
       requiredTags: \["hard sci-fi", "industrial brutality", "restrained futurism"\],  
       forbiddenTags: \["fantasy magic", "pastel glamour", "anime idol"\],  
       styleLocks: \["porcelain purity", "void black contrast", "visceral crimson accent"\],  
     },  
   };  
 }  
}  
---

# **13\. Generation provider adapter architecture**

## **Goal**

Provider switching must not alter orchestration or prompt-service contracts.

## **Adapter interface**

export interface GenerationProvider {  
 readonly name: string;  
 supports(objective: string): boolean;  
 execute(request: ProviderGenerationRequest): Promise\<ProviderGenerationResponse\>;  
}

## **Provider request model**

export type ProviderGenerationRequest \= {  
 prompt: string;  
 negativePrompt?: string;  
 outputCount: number;  
 providerHints?: Record\<string, unknown\>;  
};

## **Provider response model**

export type ProviderGenerationResponse \= {  
 outputs: Array\<{  
   index: number;  
   mimeType: string;  
   tempUri: string;  
   width?: number;  
   height?: number;  
   providerAssetId?: string;  
   providerMetadata?: Record\<string, unknown\>;  
 }\>;  
};

## **Registry pattern**

// apps/generation-service/src/services/provider-registry.service.ts  
import { Injectable } from "@nestjs/common";  
import { GenerationProvider } from "../adapters/base.provider";  
import { MockImageProvider } from "../adapters/mock-image.provider";

@Injectable()  
export class ProviderRegistryService {  
 constructor(  
   private readonly mockProvider: MockImageProvider,  
 ) {}

 private providers(): GenerationProvider\[\] {  
   return \[this.mockProvider\];  
 }

 resolve(name: string): GenerationProvider {  
   const provider \= this.providers().find(p \=\> p.name \=== name);  
   if (\!provider) throw new Error(\`Unknown provider: ${name}\`);  
   return provider;  
 }  
}

## **Dispatch service**

// apps/generation-service/src/services/generation-dispatch.service.ts  
import { Injectable } from "@nestjs/common";  
import { ExecuteGenerationRequest, ExecuteGenerationResponse } from "../dto/contracts";  
import { ProviderRegistryService } from "./provider-registry.service";

@Injectable()  
export class GenerationDispatchService {  
 constructor(private readonly registry: ProviderRegistryService) {}

 async execute(input: ExecuteGenerationRequest): Promise\<ExecuteGenerationResponse\> {  
   const provider \= this.registry.resolve(input.provider);

   const result \= await provider.execute({  
     prompt: input.promptPack.prompt,  
     negativePrompt: input.promptPack.negativePrompt,  
     outputCount: input.outputCount,  
     providerHints: input.promptPack.providerHints,  
   });

   return {  
     generationRunId: \`gr\_${input.jobId}\`,  
     provider: provider.name,  
     outputs: result.outputs,  
   };  
 }  
}  
---

# **14\. Ingestion normalization architecture**

## **Responsibility**

Ingestion-service converts provider outputs into internal asset truth.

## **Pipeline**

provider output  
→ fetch temp file / raw bytes  
→ checksum  
→ mime normalize  
→ dimension detect  
→ storage persist  
→ manifest build  
→ embedding request emit  
→ lineage payload emit  
→ return normalized assets

## **Internal modules**

apps/ingestion-service/src/services/  
├─ ingestion.service.ts  
├─ checksum.service.ts  
├─ metadata-extractor.service.ts  
├─ storage-writer.service.ts  
├─ manifest-builder.service.ts  
└─ embedding-dispatch.service.ts

## **Skeleton**

// apps/ingestion-service/src/services/ingestion.service.ts  
import { Injectable } from "@nestjs/common";  
import { IngestAssetsRequest, IngestAssetsResponse } from "../dto/contracts";

@Injectable()  
export class IngestionService {  
 async ingest(input: IngestAssetsRequest): Promise\<IngestAssetsResponse\> {  
   const assets \= input.outputs.map((output, idx) \=\> ({  
     assetId: \`asset\_${input.jobId}\_${idx}\`,  
     storageUri: \`s3://mikage/${input.projectId}/${input.jobId}/${idx}.png\`,  
     checksum: \`sha256\_mock\_${idx}\`,  
     manifestId: \`manifest\_${input.jobId}\_${idx}\`,  
     normalizedMetadata: {  
       mimeType: output.mimeType,  
       width: output.width ?? 1024,  
       height: output.height ?? 1024,  
       sourceTempUri: output.tempUri,  
       providerAssetId: output.providerAssetId ?? null,  
     },  
   }));

   return {  
     batchId: \`ing\_${input.jobId}\`,  
     assets,  
     emittedEvents: \[  
       "asset.ingested",  
       "embedding.requested",  
       "lineage.sync.requested",  
     \],  
   };  
 }  
}  
---

# **15\. Internal event contracts**

Use `packages/shared-events`.

## **Base event envelope**

export type DomainEvent\<T\> \= {  
 id: string;  
 type: string;  
 version: 1;  
 occurredAt: string;  
 traceId: string;  
 source: string;  
 data: T;  
};  
---

## **Event: `generation.completed`**

export type GenerationCompletedEvent \= DomainEvent\<{  
 projectId: string;  
 jobId: string;  
 generationRunId: string;  
 provider: string;  
 outputCount: number;  
}\>;

## **Event: `asset.ingested`**

export type AssetIngestedEvent \= DomainEvent\<{  
 projectId: string;  
 jobId: string;  
 batchId: string;  
 assetIds: string\[\];  
}\>;

## **Event: `embedding.requested`**

export type EmbeddingRequestedEvent \= DomainEvent\<{  
 projectId: string;  
 batchId: string;  
 assetIds: string\[\];  
}\>;

## **Event: `benchmark.completed`**

export type BenchmarkCompletedEvent \= DomainEvent\<{  
 projectId: string;  
 batchId: string;  
 results: Array\<{  
   assetId: string;  
   similarityScore: number;  
   driftScore: number;  
   qualityBand: string;  
 }\>;  
}\>;

## **Event: `review.created`**

export type ReviewCreatedEvent \= DomainEvent\<{  
 projectId: string;  
 jobId: string;  
 reviewTaskIds: string\[\];  
}\>;

## **Event: `lineage.sync.requested`**

export type LineageSyncRequestedEvent \= DomainEvent\<{  
 projectId: string;  
 jobId: string;  
 promptPackId: string;  
 assetIds: string\[\];  
 lineageHash: string;  
}\>;

## **Event: `job.completed`**

export type JobCompletedEvent \= DomainEvent\<{  
 projectId: string;  
 jobId: string;  
 assetIds: string\[\];  
 reviewTaskIds: string\[\];  
}\>;  
---

# **16\. Minimal inter-service auth model**

For local MVP, use **static service token \+ gateway verification \+ internal header propagation**.

## **Required headers**

x-mikage-service-name  
x-mikage-service-token  
x-trace-id

## **Policy**

* gateway accepts external trusted entry

* gateway injects internal service token on forwarded requests

* internal services verify token against env

* orchestration may also call services directly in local dev using same token

## **Shared guard skeleton**

// packages/shared-auth/src/internal-auth.guard.ts  
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()  
export class InternalAuthGuard implements CanActivate {  
 canActivate(context: ExecutionContext): boolean {  
   const req \= context.switchToHttp().getRequest();  
   const token \= req.headers\["x-mikage-service-token"\];  
   const expected \= process.env.INTERNAL\_SERVICE\_TOKEN;

   if (\!token || token \!== expected) {  
     throw new UnauthorizedException("Invalid internal service token");  
   }

   return true;  
 }  
}

## **Upgrade path later**

Level-3 can move to:

* mTLS or service mesh

* JWT service identity

* per-service scoped auth

But not required now.

---

# **17\. Gateway routing**

## **Routes**

POST /internal/orchestration/jobs  
 \-\> orchestration-service:7010

POST /internal/world/\*  
 \-\> world-service:7012

POST /internal/state/\*  
 \-\> state-service:7013

POST /internal/canon/\*  
 \-\> canon-service:7011

POST /internal/prompt/\*  
 \-\> prompt-service:7014

POST /internal/generation/\*  
 \-\> generation-service:7015

POST /internal/ingestion/\*  
 \-\> ingestion-service:7016

POST /internal/benchmark/\*  
 \-\> benchmark-service:7017

POST /internal/review/\*  
 \-\> review-service:7018  
---

# **18\. Service bootstrap files**

## **Standard `main.ts`**

// apps/world-service/src/main.ts  
import { NestFactory } from "@nestjs/core";  
import { ValidationPipe } from "@nestjs/common";  
import { AppModule } from "./app.module";

async function bootstrap() {  
 const app \= await NestFactory.create(AppModule);  
 app.setGlobalPrefix("internal/v1");  
 app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));  
 await app.listen(process.env.PORT || 7012);  
}  
bootstrap();

## **Standard `app.module.ts`**

// apps/world-service/src/app.module.ts  
import { Module } from "@nestjs/common";  
import { WorldModule } from "./modules/world.module";

@Module({  
 imports: \[WorldModule\],  
})  
export class AppModule {}

## **Standard module**

// apps/world-service/src/modules/world.module.ts  
import { Module } from "@nestjs/common";  
import { WorldController } from "../controllers/world.controller";  
import { WorldContextService } from "../services/world-context.service";

@Module({  
 controllers: \[WorldController\],  
 providers: \[WorldContextService\],  
 exports: \[WorldContextService\],  
})  
export class WorldModule {}

## **Standard controller**

// apps/world-service/src/controllers/world.controller.ts  
import { Body, Controller, Post, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { WorldContextService } from "../services/world-context.service";  
import { ResolveWorldContextRequest } from "../dto/contracts";

@Controller("world")  
@UseGuards(InternalAuthGuard)  
export class WorldController {  
 constructor(private readonly service: WorldContextService) {}

 @Post("resolve-context")  
 async resolve(@Body() body: ResolveWorldContextRequest) {  
   const data \= await this.service.resolve(body);  
   return { ok: true, traceId: "trace\_local", data };  
 }  
}

## **Standard service**

// apps/world-service/src/services/world-context.service.ts  
import { Injectable } from "@nestjs/common";  
import { ResolveWorldContextRequest, ResolveWorldContextResponse } from "../dto/contracts";

@Injectable()  
export class WorldContextService {  
 async resolve(input: ResolveWorldContextRequest): Promise\<ResolveWorldContextResponse\> {  
   return {  
     worldContextId: \`wc\_${input.projectId}\`,  
     era: input.eraId ? {  
       id: input.eraId,  
       name: "late\_entropy\_industrial\_age",  
       summary: "Industrial decline, massive infrastructure, thermodynamic consequence.",  
     } : null,  
     location: input.locationId ? {  
       id: input.locationId,  
       name: "megacity\_rooftop",  
       summary: "High-altitude brutalist maintenance platform above industrial skyline.",  
       atmosphereTags: \["storm", "wet concrete", "crosswind", "industrial haze"\],  
     } : null,  
     factions: \[\],  
     relatedEntities: \[\],  
     canonFacts: \[  
       "hard sci-fi universe",  
       "no free power",  
       "beauty must carry damage",  
     \],  
     relationEdges: \[\],  
   };  
 }  
}  
---

# **19\. Orchestration service skeleton**

## **Responsibilities**

* receives job

* calls services in deterministic order

* stores workflow state

* emits milestone events

* returns job result

## **File structure**

apps/orchestration-service/src/  
├─ controllers/orchestration.controller.ts  
├─ services/  
│  ├─ orchestration.service.ts  
│  ├─ workflow-runner.service.ts  
│  ├─ service-clients/  
│  │  ├─ canon.client.ts  
│  │  ├─ world.client.ts  
│  │  ├─ state.client.ts  
│  │  ├─ prompt.client.ts  
│  │  ├─ generation.client.ts  
│  │  ├─ ingestion.client.ts  
│  │  ├─ benchmark.client.ts  
│  │  └─ review.client.ts  
│  └─ job-state.service.ts  
├─ dto/  
└─ domain/

## **Workflow runner**

// apps/orchestration-service/src/services/workflow-runner.service.ts  
import { Injectable } from "@nestjs/common";

@Injectable()  
export class WorkflowRunnerService {  
 constructor(  
   private readonly worldClient: any,  
   private readonly stateClient: any,  
   private readonly canonClient: any,  
   private readonly promptClient: any,  
   private readonly generationClient: any,  
   private readonly ingestionClient: any,  
   private readonly benchmarkClient: any,  
   private readonly reviewClient: any,  
 ) {}

 async run(job: any) {  
   const worldContext \= await this.worldClient.resolveContext({  
     projectId: job.projectId,  
     universeId: job.universeId,  
     eraId: job.eraId,  
     locationId: job.locationId,  
     characterIds: job.characterIds,  
     sceneIntent: job.sceneIntent,  
   });

   const stateSnapshot \= await this.stateClient.resolveSnapshot({  
     projectId: job.projectId,  
     timelinePoint: job.timelinePoint,  
     characterIds: job.characterIds,  
     locationId: job.locationId,  
     narrativeIntent: job.sceneIntent,  
   });

   const precheck \= await this.canonClient.validatePreGeneration({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     objective: job.objective,  
     worldContext,  
     stateSnapshot,  
     promptIntent: {  
       shotType: job.shotType,  
       aestheticProfile: "mikage\_core\_visual\_dna",  
       requestedElements: job.requestedElements ?? \[\],  
     },  
   });

   if (\!precheck.valid) {  
     throw new Error("Pre-generation canon validation failed");  
   }

   const promptPack \= await this.promptClient.compile({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     objective: job.objective,  
     variant: job.variant,  
     worldContext,  
     stateSnapshot,  
     canonConstraints: precheck.enforcedConstraints,  
     creativeIntent: {  
       subject: job.subject,  
       action: job.action,  
       framing: job.framing,  
       mood: job.mood,  
     },  
     outputCount: job.outputCount ?? 4,  
   });

   const generation \= await this.generationClient.execute({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     provider: job.provider ?? "mock",  
     promptPack,  
     outputCount: job.outputCount ?? 4,  
   });

   const ingestion \= await this.ingestionClient.ingestAssets({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     promptPackId: promptPack.promptPackId,  
     generationRunId: generation.generationRunId,  
     outputs: generation.outputs,  
   });

   const postcheck \= await this.canonClient.validatePostGeneration({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     generatedAssets: ingestion.assets.map((a: any) \=\> ({  
       assetId: a.assetId,  
       metadata: a.normalizedMetadata,  
     })),  
     expectedEnvelope: precheck.enforcedConstraints,  
   });

   const benchmark \= await this.benchmarkClient.compare({  
     projectId: job.projectId,  
     batchId: ingestion.batchId,  
     assets: ingestion.assets,  
   });

   const review \= await this.reviewClient.createTasks({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     assets: ingestion.assets,  
     benchmarkResults: benchmark.results,  
   });

   return {  
     jobId: job.jobId,  
     promptPack,  
     assets: ingestion.assets,  
     postcheck,  
     benchmark,  
     review,  
   };  
 }  
}  
---

# **20\. Shared contract packages**

## **Required shared packages now**

### **`packages/shared-types`**

* response envelopes

* base IDs

* pagination types

* common enums

### **`packages/shared-http`**

* internal HTTP client wrapper

* retries

* trace propagation

* timeout policy

### **`packages/shared-events`**

* event envelope

* event names

* publish helper

### **`packages/shared-auth`**

* internal auth guard

* header builder

* token verification

### **`packages/prompt-contracts`**

* compile prompt DTOs

### **`packages/canon-contracts`**

* pre/post validation DTOs

### **`packages/generation-contracts`**

* provider request/response DTOs

---

# **21\. HTTP client pattern for inter-service calls**

// packages/shared-http/src/internal-client.ts  
export class InternalClient {  
 constructor(  
   private readonly baseUrl: string,  
   private readonly token: string,  
 ) {}

 async post\<T\>(path: string, body: unknown): Promise\<T\> {  
   const res \= await fetch(\`${this.baseUrl}${path}\`, {  
     method: "POST",  
     headers: {  
       "content-type": "application/json",  
       "x-mikage-service-token": this.token,  
       "x-mikage-service-name": "orchestration-service",  
       "x-trace-id": crypto.randomUUID(),  
     },  
     body: JSON.stringify(body),  
   });

   if (\!res.ok) throw new Error(\`Internal call failed: ${res.status}\`);  
   const json \= await res.json();  
   if (\!json.ok) throw new Error(json.error?.message ?? "Unknown internal error");  
   return json.data;  
 }  
}  
---

# **22\. Docker compose update**

## **Add service containers**

services:  
 gateway:  
   build: ./apps/gateway  
   ports: \["7000:7000"\]

 orchestration-service:  
   build: ./apps/orchestration-service  
   ports: \["7010:7010"\]

 canon-service:  
   build: ./apps/canon-service  
   ports: \["7011:7011"\]

 world-service:  
   build: ./apps/world-service  
   ports: \["7012:7012"\]

 state-service:  
   build: ./apps/state-service  
   ports: \["7013:7013"\]

 prompt-service:  
   build: ./apps/prompt-service  
   ports: \["7014:7014"\]

 generation-service:  
   build: ./apps/generation-service  
   ports: \["7015:7015"\]

 ingestion-service:  
   build: ./apps/ingestion-service  
   ports: \["7016:7016"\]

 benchmark-service:  
   build: ./apps/benchmark-service  
   ports: \["7017:7017"\]

 review-service:  
   build: ./apps/review-service  
   ports: \["7018:7018"\]  
---

# **23\. Message flow specification**

## **Primary job flow**

\[Client/Gateway\]  
  |  
  v  
\[orchestration-service\]  
  |  
  \+--sync--\> \[world-service\]  
  |  
  \+--sync--\> \[state-service\]  
  |  
  \+--sync--\> \[canon-service: pre\]  
  |  
  \+--sync--\> \[prompt-service\]  
  |  
  \+--sync--\> \[generation-service\]  
  |  
  \+--event--\> generation.completed  
  |  
  \+--sync--\> \[ingestion-service\]  
  |  
  \+--event--\> asset.ingested  
  \+--event--\> embedding.requested  
  \+--event--\> lineage.sync.requested  
  |  
  \+--sync--\> \[canon-service: post\]  
  |  
  \+--sync--\> \[benchmark-service\]  
  |  
  \+--event--\> benchmark.completed  
  |  
  \+--sync--\> \[review-service\]  
  |  
  \+--event--\> review.created  
  |  
  \+--event--\> job.completed

## **Rule**

Events do not replace orchestration decisions yet. They only record and fan out side-effects.

---

# **24\. Persistence ownership**

## **PostgreSQL**

Owns:

* jobs

* job steps

* review tasks

* prompt packs

* generation runs

* ingested asset manifests

* benchmark results

## **Neo4j**

Owns:

* world graph

* lineage graph

* entity relations

* asset-to-prompt-to-scene lineage edges

## **Redis**

Owns:

* workflow transient state

* idempotency keys

* short-lived distributed locks

* cache for world/state lookup bundles

## **MinIO**

Owns:

* normalized asset blobs

* raw provider blobs

* manifest json files

---

# **25\. Minimal database responsibility split by service**

## **`world-service`**

* reads Neo4j

* optional writes to Postgres for denormalized cache if needed

## **`state-service`**

* reads/writes Postgres

* optional relation lookup to Neo4j if state dependency edges are graph-backed

## **`canon-service`**

* reads canon config from file/data package or Postgres

* should not own mutable heavy relational graph

## **`prompt-service`**

* stateless preferred

* may persist prompt pack record through shared repository or prompt-service-local table

## **`generation-service`**

* persists generation run metadata in Postgres

## **`ingestion-service`**

* persists asset/manifests in Postgres \+ MinIO

---

# **26\. Contract testing requirements**

Create these tests now:

## **Contract tests**

* world-service `resolve-context`

* state-service `resolve-snapshot`

* canon-service `validate-pre-generation`

* prompt-service `compile`

* generation-service `execute`

* ingestion-service `assets`

## **Integration tests**

* orchestration happy path

* canon precheck rejection

* generation provider failure

* ingestion failure rollback behavior

* benchmark \+ review completion

## **Smoke test target**

The smoke test should still verify:

* compiled prompt pack exists

* 4 assets exist

* 4 manifests exist

* 4 review tasks exist

* lineage event emitted

* archive entry persisted

---

# **27\. Non-negotiable implementation rules**

1. **No domain leakage into orchestration-service**  
    No prompt text building. No canon rules. No provider branches.

2. **No service directly reading another service DB**  
    Services communicate only through API/events.

3. **Prompt-service is deterministic**  
    Same structured input must yield same prompt pack except for explicit seed fields.

4. **Canon-service is authoritative**  
    Prompt-service cannot override canon locks.

5. **Generation-service is adapter-only**  
    No story logic, no canon interpretation.

6. **Ingestion-service is normalization boundary**  
    Downstream services only consume normalized asset records.

---

# **28\. Immediate build order**

## **Phase order to implement now**

### **Step 1**

Extract `world-service`

### **Step 2**

Extract `state-service`

### **Step 3**

Extract `canon-service`

### **Step 4**

Extract `prompt-service`

### **Step 5**

Extract `generation-service`

### **Step 6**

Refactor `orchestration-service` to HTTP clients only

### **Step 7**

Keep `ingestion-service`, `benchmark-service`, `review-service` as called services

### **Step 8**

Add internal auth \+ trace headers

### **Step 9**

Update docker compose \+ smoke test

---

# **29\. Definition of done for Level-2**

Level-2 is complete when:

* orchestration-service contains only workflow coordination and service clients

* canon/world/state/prompt/generation are independently bootable services

* all internal APIs are callable through gateway or direct local port

* smoke test passes end-to-end with mock provider

* prompt compilation no longer happens inside orchestration-service

* canon validation no longer happens inside orchestration-service

* generation provider mapping no longer happens inside orchestration-service

* asset outputs remain identical in shape to current MVP outputs

---

# **30\. Final target snapshot**

After this extraction, the system becomes:

Runnable scaffold  
→ service-separated MVP  
→ workflow-coordinated internal platform

This is the correct foundation before moving to:

* async job queues

* real provider integrations

* lineage graph enrichment

* autonomous review routing

* studio control plane UI

