**Target:** chuyển từ orchestration-heavy scaffold sang **microservice MVP chạy được**

Bên dưới là **bản master duy nhất**, theo đúng build path đã chốt: có cấu trúc repo, shared packages, service skeleton, internal clients, docker, env, và smoke flow. Nội dung này được viết để có thể copy ra repo và triển khai tiếp ngay.

---

# **1\. FINAL REPO SHAPE**

mikage/  
├─ apps/  
│  ├─ gateway/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ app.module.ts  
│  │  │  ├─ gateway.controller.ts  
│  │  │  └─ gateway.service.ts  
│  │  ├─ Dockerfile  
│  │  └─ package.json  
│  │  
│  ├─ orchestration-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ app.module.ts  
│  │  │  ├─ controllers/  
│  │  │  │  └─ orchestration.controller.ts  
│  │  │  ├─ modules/  
│  │  │  │  └─ orchestration.module.ts  
│  │  │  ├─ services/  
│  │  │  │  ├─ orchestration.service.ts  
│  │  │  │  ├─ workflow-runner.service.ts  
│  │  │  │  └─ service-clients/  
│  │  │  │     ├─ world.client.ts  
│  │  │  │     ├─ state.client.ts  
│  │  │  │     ├─ canon.client.ts  
│  │  │  │     ├─ prompt.client.ts  
│  │  │  │     ├─ generation.client.ts  
│  │  │  │     ├─ ingestion.client.ts  
│  │  │  │     ├─ benchmark.client.ts  
│  │  │  │     └─ review.client.ts  
│  │  │  └─ dto/  
│  │  │     └─ run-job.request.ts  
│  │  ├─ Dockerfile  
│  │  └─ package.json  
│  │  
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
│  ├─ shared-types/  
│  │  └─ src/  
│  │     ├─ internal-response.ts  
│  │     ├─ ids.ts  
│  │     └─ common.ts  
│  │  
│  ├─ shared-auth/  
│  │  └─ src/  
│  │     ├─ internal-auth.guard.ts  
│  │     ├─ internal-auth.module.ts  
│  │     └─ internal-headers.ts  
│  │  
│  ├─ shared-http/  
│  │  └─ src/  
│  │     ├─ internal-client.ts  
│  │     └─ trace.ts  
│  │  
│  ├─ shared-events/  
│  │  └─ src/  
│  │     ├─ domain-event.ts  
│  │     ├─ event-bus.ts  
│  │     └─ events.ts  
│  │  
│  ├─ canon-contracts/  
│  │  └─ src/index.ts  
│  ├─ prompt-contracts/  
│  │  └─ src/index.ts  
│  ├─ generation-contracts/  
│  │  └─ src/index.ts  
│  └─ world-state-contracts/  
│     └─ src/index.ts  
│  
├─ infra/  
│  ├─ compose/  
│  │  └─ docker-compose.level2.yml  
│  └─ nginx/  
│     └─ nginx.conf  
│  
├─ tests/  
│  ├─ smoke/  
│  │  └─ level2.smoke.spec.ts  
│  └─ contract/  
│  
├─ .env.example  
├─ package.json  
├─ turbo.json  
└─ tsconfig.base.json  
---

# **2\. ROOT PACKAGE SETUP**

## **`package.json`**

{  
 "name": "mikage",  
 "private": true,  
 "workspaces": \[  
   "apps/\*",  
   "packages/\*"  
 \],  
 "scripts": {  
   "build": "turbo run build",  
   "dev": "turbo run dev \--parallel",  
   "start": "turbo run start",  
   "test": "turbo run test",  
   "smoke": "tsx tests/smoke/level2.smoke.spec.ts"  
 },  
 "devDependencies": {  
   "turbo": "^2.0.0",  
   "tsx": "^4.19.2",  
   "typescript": "^5.6.3"  
 }  
}

## **`turbo.json`**

{  
 "$schema": "https://turbo.build/schema.json",  
 "tasks": {  
   "build": {  
     "dependsOn": \["^build"\],  
     "outputs": \["dist/\*\*"\]  
   },  
   "dev": {  
     "cache": false,  
     "persistent": true  
   },  
   "start": {  
     "cache": false  
   },  
   "test": {  
     "dependsOn": \["build"\]  
   }  
 }  
}

## **`tsconfig.base.json`**

{  
 "compilerOptions": {  
   "target": "ES2022",  
   "module": "commonjs",  
   "moduleResolution": "node",  
   "declaration": true,  
   "emitDecoratorMetadata": true,  
   "experimentalDecorators": true,  
   "strict": true,  
   "skipLibCheck": true,  
   "esModuleInterop": true,  
   "baseUrl": ".",  
   "paths": {  
     "@mikage/shared-types": \["packages/shared-types/src"\],  
     "@mikage/shared-auth": \["packages/shared-auth/src"\],  
     "@mikage/shared-http": \["packages/shared-http/src"\],  
     "@mikage/shared-events": \["packages/shared-events/src"\],  
     "@mikage/canon-contracts": \["packages/canon-contracts/src"\],  
     "@mikage/prompt-contracts": \["packages/prompt-contracts/src"\],  
     "@mikage/generation-contracts": \["packages/generation-contracts/src"\],  
     "@mikage/world-state-contracts": \["packages/world-state-contracts/src"\]  
   }  
 }  
}  
---

# **3\. SHARED PACKAGES**

## **3.1 `packages/shared-types/src/internal-response.ts`**

export type InternalError \= {  
 code: string;  
 message: string;  
 details?: unknown;  
};

export type InternalResponse\<T\> \= {  
 ok: boolean;  
 traceId: string;  
 data?: T;  
 error?: InternalError;  
};

export function ok\<T\>(traceId: string, data: T): InternalResponse\<T\> {  
 return { ok: true, traceId, data };  
}

export function fail(traceId: string, code: string, message: string, details?: unknown): InternalResponse\<never\> {  
 return { ok: false, traceId, error: { code, message, details } };  
}

## **3.2 `packages/shared-types/src/ids.ts`**

export const ids \= {  
 worldContext: (projectId: string) \=\> \`wc\_${projectId}\`,  
 stateSnapshot: (projectId: string) \=\> \`ss\_${projectId}\`,  
 promptPack: (jobId: string) \=\> \`pp\_${jobId}\`,  
 generationRun: (jobId: string) \=\> \`gr\_${jobId}\`,  
 ingestionBatch: (jobId: string) \=\> \`ig\_${jobId}\`,  
 asset: (jobId: string, index: number) \=\> \`asset\_${jobId}\_${index}\`,  
 manifest: (jobId: string, index: number) \=\> \`manifest\_${jobId}\_${index}\`,  
 reviewTask: (jobId: string, index: number) \=\> \`review\_${jobId}\_${index}\`  
};

## **3.3 `packages/shared-types/src/common.ts`**

export type QualityBand \= "gold" | "silver" | "red";  
export type Severity \= "low" | "medium" | "high" | "critical";  
export type Objective \= "cinematic\_frame" | "character\_portrait" | "trailer\_sequence";  
---

## **3.4 `packages/shared-auth/src/internal-headers.ts`**

export const INTERNAL\_SERVICE\_NAME \= "x-mikage-service-name";  
export const INTERNAL\_SERVICE\_TOKEN \= "x-mikage-service-token";  
export const TRACE\_ID \= "x-trace-id";

## **3.5 `packages/shared-auth/src/internal-auth.guard.ts`**

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";  
import { INTERNAL\_SERVICE\_TOKEN } from "./internal-headers";

@Injectable()  
export class InternalAuthGuard implements CanActivate {  
 canActivate(context: ExecutionContext): boolean {  
   const req \= context.switchToHttp().getRequest();  
   const actual \= req.headers\[INTERNAL\_SERVICE\_TOKEN\];  
   const expected \= process.env.INTERNAL\_SERVICE\_TOKEN;

   if (\!expected || actual \!== expected) {  
     throw new UnauthorizedException("Invalid internal service token");  
   }

   return true;  
 }  
}

## **3.6 `packages/shared-auth/src/internal-auth.module.ts`**

import { Global, Module } from "@nestjs/common";  
import { InternalAuthGuard } from "./internal-auth.guard";

@Global()  
@Module({  
 providers: \[InternalAuthGuard\],  
 exports: \[InternalAuthGuard\]  
})  
export class InternalAuthModule {}  
---

## **3.7 `packages/shared-http/src/trace.ts`**

export function traceId(): string {  
 return crypto.randomUUID();  
}

## **3.8 `packages/shared-http/src/internal-client.ts`**

import { InternalResponse } from "@mikage/shared-types";  
import {  
 INTERNAL\_SERVICE\_NAME,  
 INTERNAL\_SERVICE\_TOKEN,  
 TRACE\_ID  
} from "@mikage/shared-auth";

export class InternalClient {  
 constructor(  
   private readonly serviceName: string,  
   private readonly baseUrl: string,  
   private readonly token: string  
 ) {}

 async post\<T\>(path: string, body: unknown): Promise\<T\> {  
   const res \= await fetch(\`${this.baseUrl}${path}\`, {  
     method: "POST",  
     headers: {  
       "content-type": "application/json",  
       \[INTERNAL\_SERVICE\_NAME\]: this.serviceName,  
       \[INTERNAL\_SERVICE\_TOKEN\]: this.token,  
       \[TRACE\_ID\]: crypto.randomUUID()  
     },  
     body: JSON.stringify(body)  
   });

   if (\!res.ok) {  
     throw new Error(\`Internal call failed ${res.status} ${this.baseUrl}${path}\`);  
   }

   const json \= (await res.json()) as InternalResponse\<T\>;

   if (\!json.ok || \!json.data) {  
     throw new Error(json.error?.message ?? "Unknown internal error");  
   }

   return json.data;  
 }  
}  
---

## **3.9 `packages/shared-events/src/domain-event.ts`**

export type DomainEvent\<T\> \= {  
 id: string;  
 type: string;  
 version: 1;  
 occurredAt: string;  
 traceId: string;  
 source: string;  
 data: T;  
};

## **3.10 `packages/shared-events/src/events.ts`**

import { DomainEvent } from "./domain-event";

export type GenerationCompletedEvent \= DomainEvent\<{  
 projectId: string;  
 jobId: string;  
 generationRunId: string;  
 provider: string;  
 outputCount: number;  
}\>;

export type AssetIngestedEvent \= DomainEvent\<{  
 projectId: string;  
 jobId: string;  
 batchId: string;  
 assetIds: string\[\];  
}\>;

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

## **3.11 `packages/shared-events/src/event-bus.ts`**

export class EventBus {  
 async publish\<T\>(event: T): Promise\<void\> {  
   console.log("\[event-bus\] publish", JSON.stringify(event));  
 }  
}  
---

# **4\. CONTRACT PACKAGES**

## **4.1 `packages/world-state-contracts/src/index.ts`**

export type ResolveWorldContextRequest \= {  
 universeId: string;  
 projectId: string;  
 eraId?: string;  
 locationId?: string;  
 factionIds?: string\[\];  
 characterIds?: string\[\];  
 sceneIntent?: string;  
};

export type ResolveWorldContextResponse \= {  
 worldContextId: string;  
 era: { id: string; name: string; summary: string } | null;  
 location: {  
   id: string;  
   name: string;  
   summary: string;  
   atmosphereTags: string\[\];  
 } | null;  
 factions: Array\<{ id: string; name: string; role: string }\>;  
 relatedEntities: Array\<{  
   id: string;  
   type: string;  
   name: string;  
   relevanceScore: number;  
 }\>;  
 canonFacts: string\[\];  
 relationEdges: Array\<{ from: string; to: string; type: string }\>;  
};

export type ResolveStateSnapshotRequest \= {  
 projectId: string;  
 timelinePoint?: string;  
 characterIds: string\[\];  
 locationId?: string;  
 narrativeIntent?: string;  
};

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

## **4.2 `packages/canon-contracts/src/index.ts`**

import {  
 ResolveStateSnapshotResponse,  
 ResolveWorldContextResponse  
} from "@mikage/world-state-contracts";

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

export type ValidatePostGenerationResponse \= {  
 valid: boolean;  
 assetResults: Array\<{  
   assetId: string;  
   valid: boolean;  
   driftScore: number;  
   violations: string\[\];  
 }\>;  
};

## **4.3 `packages/prompt-contracts/src/index.ts`**

import {  
 ResolveStateSnapshotResponse,  
 ResolveWorldContextResponse  
} from "@mikage/world-state-contracts";

export type CompilePromptRequest \= {  
 projectId: string;  
 jobId: string;  
 objective: "cinematic\_frame" | "character\_portrait" | "trailer\_sequence";  
 variant: string;  
 worldContext: ResolveWorldContextResponse;  
 stateSnapshot: ResolveStateSnapshotResponse;  
 canonConstraints: {  
   requiredTags: string\[\];  
   forbiddenTags: string\[\];  
   styleLocks: string\[\];  
 };  
 creativeIntent: {  
   subject: string;  
   action?: string;  
   framing?: string;  
   mood?: string;  
 };  
 outputCount: number;  
};

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

## **4.4 `packages/generation-contracts/src/index.ts`**

import { CompilePromptResponse } from "@mikage/prompt-contracts";

export type ExecuteGenerationRequest \= {  
 projectId: string;  
 jobId: string;  
 provider: "mock" | "gemini-image" | "seedance-video";  
 promptPack: CompilePromptResponse;  
 outputCount: number;  
};

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

export type IngestAssetsRequest \= {  
 projectId: string;  
 jobId: string;  
 promptPackId: string;  
 generationRunId: string;  
 outputs: ExecuteGenerationResponse\["outputs"\];  
};

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

# **5\. STANDARD NEST SERVICE TEMPLATE**

Mọi service dùng cùng một pattern. Dưới đây là template gốc, rồi sau đó là file cụ thể cho từng service.

## **`src/main.ts`**

import { NestFactory } from "@nestjs/core";  
import { ValidationPipe } from "@nestjs/common";  
import { AppModule } from "./app.module";

async function bootstrap() {  
 const app \= await NestFactory.create(AppModule);  
 app.setGlobalPrefix("internal/v1");  
 app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));  
 await app.listen(Number(process.env.PORT || 7000));  
}  
bootstrap();

## **`src/app.module.ts`**

import { Module } from "@nestjs/common";  
import { InternalAuthModule } from "@mikage/shared-auth";  
import { MainModule } from "./modules/main.module";

@Module({  
 imports: \[InternalAuthModule, MainModule\]  
})  
export class AppModule {}  
---

# **6\. WORLD-SERVICE**

## **`apps/world-service/package.json`**

{  
 "name": "world-service",  
 "scripts": {  
   "dev": "nest start \--watch",  
   "build": "nest build",  
   "start": "node dist/main"  
 },  
 "dependencies": {  
   "@mikage/shared-auth": "\*",  
   "@mikage/shared-types": "\*",  
   "@mikage/world-state-contracts": "\*",  
   "@nestjs/common": "^10.4.8",  
   "@nestjs/core": "^10.4.8",  
   "@nestjs/platform-express": "^10.4.8",  
   "reflect-metadata": "^0.2.2",  
   "rxjs": "^7.8.1"  
 }  
}

## **`apps/world-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { WorldController } from "../controllers/world.controller";  
import { WorldContextService } from "../services/world-context.service";

@Module({  
 controllers: \[WorldController\],  
 providers: \[WorldContextService\]  
})  
export class MainModule {}

## **`apps/world-service/src/controllers/world.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import { ResolveWorldContextRequest } from "@mikage/world-state-contracts";  
import { WorldContextService } from "../services/world-context.service";

@Controller("world")  
@UseGuards(InternalAuthGuard)  
export class WorldController {  
 constructor(private readonly service: WorldContextService) {}

 @Post("resolve-context")  
 async resolve(@Body() body: ResolveWorldContextRequest, @Req() req: any) {  
   const data \= await this.service.resolve(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/world-service/src/services/world-context.service.ts`**

import { Injectable } from "@nestjs/common";  
import {  
 ResolveWorldContextRequest,  
 ResolveWorldContextResponse  
} from "@mikage/world-state-contracts";  
import { ids } from "@mikage/shared-types";

@Injectable()  
export class WorldContextService {  
 async resolve(input: ResolveWorldContextRequest): Promise\<ResolveWorldContextResponse\> {  
   return {  
     worldContextId: ids.worldContext(input.projectId),  
     era: input.eraId  
       ? {  
           id: input.eraId,  
           name: "late\_entropy\_industrial\_age",  
           summary: "Industrial decline, thermodynamic cost, infrastructure exhaustion."  
         }  
       : null,  
     location: input.locationId  
       ? {  
           id: input.locationId,  
           name: "megacity\_rooftop",  
           summary: "High brutalist maintenance platform above dense industrial skyline.",  
           atmosphereTags: \["storm", "wet concrete", "crosswind", "haze"\]  
         }  
       : null,  
     factions: \[\],  
     relatedEntities: \[\],  
     canonFacts: \[  
       "hard sci-fi universe",  
       "thermodynamic consequence",  
       "no free power",  
       "beauty must carry damage"  
     \],  
     relationEdges: \[\]  
   };  
 }  
}  
---

# **7\. STATE-SERVICE**

## **`apps/state-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { StateController } from "../controllers/state.controller";  
import { StateSnapshotService } from "../services/state-snapshot.service";

@Module({  
 controllers: \[StateController\],  
 providers: \[StateSnapshotService\]  
})  
export class MainModule {}

## **`apps/state-service/src/controllers/state.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import { ResolveStateSnapshotRequest } from "@mikage/world-state-contracts";  
import { StateSnapshotService } from "../services/state-snapshot.service";

@Controller("state")  
@UseGuards(InternalAuthGuard)  
export class StateController {  
 constructor(private readonly service: StateSnapshotService) {}

 @Post("resolve-snapshot")  
 async resolve(@Body() body: ResolveStateSnapshotRequest, @Req() req: any) {  
   const data \= await this.service.resolve(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/state-service/src/services/state-snapshot.service.ts`**

import { Injectable } from "@nestjs/common";  
import {  
 ResolveStateSnapshotRequest,  
 ResolveStateSnapshotResponse  
} from "@mikage/world-state-contracts";  
import { ids } from "@mikage/shared-types";

@Injectable()  
export class StateSnapshotService {  
 async resolve(input: ResolveStateSnapshotRequest): Promise\<ResolveStateSnapshotResponse\> {  
   return {  
     snapshotId: ids.stateSnapshot(input.projectId),  
     timelinePoint: input.timelinePoint ?? new Date().toISOString(),  
     characters: input.characterIds.map((characterId) \=\> ({  
       characterId,  
       poseState: "combat\_ready",  
       injuryState: \["micro\_fracture\_left\_pauldron"\],  
       loyaltyState: {},  
       knowledgeState: \["target rooftop approach", "reactor stress elevated"\],  
       emotionalState: \["restrained intensity"\],  
       continuityWarnings: \[\]  
     })),  
     continuityRiskScore: 0.14  
   };  
 }  
}  
---

# **8\. CANON-SERVICE**

## **`apps/canon-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { CanonController } from "../controllers/canon.controller";  
import { CanonValidationService } from "../services/canon-validation.service";

@Module({  
 controllers: \[CanonController\],  
 providers: \[CanonValidationService\]  
})  
export class MainModule {}

## **`apps/canon-service/src/controllers/canon.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import {  
 ValidatePostGenerationRequest,  
 ValidatePreGenerationRequest  
} from "@mikage/canon-contracts";  
import { CanonValidationService } from "../services/canon-validation.service";

@Controller("canon")  
@UseGuards(InternalAuthGuard)  
export class CanonController {  
 constructor(private readonly service: CanonValidationService) {}

 @Post("validate-pre-generation")  
 async validatePre(@Body() body: ValidatePreGenerationRequest, @Req() req: any) {  
   const data \= await this.service.validatePre(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }

 @Post("validate-post-generation")  
 async validatePost(@Body() body: ValidatePostGenerationRequest, @Req() req: any) {  
   const data \= await this.service.validatePost(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/canon-service/src/services/canon-validation.service.ts`**

import { Injectable } from "@nestjs/common";  
import {  
 ValidatePostGenerationRequest,  
 ValidatePostGenerationResponse,  
 ValidatePreGenerationRequest,  
 ValidatePreGenerationResponse  
} from "@mikage/canon-contracts";

@Injectable()  
export class CanonValidationService {  
 async validatePre(input: ValidatePreGenerationRequest): Promise\<ValidatePreGenerationResponse\> {  
   const requested \= new Set(input.promptIntent.requestedElements.map((x) \=\> x.toLowerCase()));  
   const violations: ValidatePreGenerationResponse\["violations"\] \= \[\];

   if (requested.has("magic")) {  
     violations.push({  
       code: "CANON\_MAGIC\_FORBIDDEN",  
       message: "Magic-like framing violates ontology.",  
       severity: "critical"  
     });  
   }

   if (requested.has("anime idol")) {  
     violations.push({  
       code: "STYLE\_DRIFT\_ANIME\_IDOL",  
       message: "Anime idol drift is forbidden.",  
       severity: "high"  
     });  
   }

   return {  
     valid: violations.length \=== 0,  
     riskScore: violations.length ? 0.91 : 0.17,  
     warnings: \[\],  
     violations,  
     enforcedConstraints: {  
       requiredTags: \["hard sci-fi", "industrial brutality", "restrained futurism"\],  
       forbiddenTags: \["fantasy magic", "soft pastel glamour", "anime idol"\],  
       styleLocks: \["porcelain purity", "void black contrast", "visceral crimson accent"\]  
     }  
   };  
 }

 async validatePost(input: ValidatePostGenerationRequest): Promise\<ValidatePostGenerationResponse\> {  
   return {  
     valid: true,  
     assetResults: input.generatedAssets.map((asset) \=\> ({  
       assetId: asset.assetId,  
       valid: true,  
       driftScore: 0.12,  
       violations: \[\]  
     }))  
   };  
 }  
}  
---

# **9\. PROMPT-SERVICE**

## **`apps/prompt-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { PromptController } from "../controllers/prompt.controller";  
import { PromptCompilerService } from "../services/prompt-compiler.service";

@Module({  
 controllers: \[PromptController\],  
 providers: \[PromptCompilerService\]  
})  
export class MainModule {}

## **`apps/prompt-service/src/controllers/prompt.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import { CompilePromptRequest } from "@mikage/prompt-contracts";  
import { PromptCompilerService } from "../services/prompt-compiler.service";

@Controller("prompt")  
@UseGuards(InternalAuthGuard)  
export class PromptController {  
 constructor(private readonly service: PromptCompilerService) {}

 @Post("compile")  
 async compile(@Body() body: CompilePromptRequest, @Req() req: any) {  
   const data \= await this.service.compile(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/prompt-service/src/services/prompt-compiler.service.ts`**

import { Injectable } from "@nestjs/common";  
import { CompilePromptRequest, CompilePromptResponse } from "@mikage/prompt-contracts";  
import { ids } from "@mikage/shared-types";

@Injectable()  
export class PromptCompilerService {  
 async compile(input: CompilePromptRequest): Promise\<CompilePromptResponse\> {  
   const prompt \= \[  
     \`objective: ${input.objective}\`,  
     \`variant: ${input.variant}\`,  
     \`subject: ${input.creativeIntent.subject}\`,  
     \`action: ${input.creativeIntent.action ?? "stand in controlled tension"}\`,  
     \`framing: ${input.creativeIntent.framing ?? "cinematic wide anamorphic frame"}\`,  
     \`mood: ${input.creativeIntent.mood ?? "restrained intensity"}\`,  
     \`world facts: ${input.worldContext.canonFacts.join("; ")}\`,  
     \`style locks: ${input.canonConstraints.styleLocks.join(", ")}\`,  
     \`required tags: ${input.canonConstraints.requiredTags.join(", ")}\`,  
     \`state: ${input.stateSnapshot.characters.map((c) \=\> \`${c.characterId}:${(c.injuryState ?? \[\]).join("|")}\`).join("; ")}\`  
   \].join("\\n");

   const negativePrompt \= \[  
     ...input.canonConstraints.forbiddenTags,  
     "childish anime idol",  
     "generic neon overload",  
     "fantasy magic aesthetic",  
     "soft pastel glamour",  
     "pop fashion drift"  
   \].join(", ");

   return {  
     promptPackId: ids.promptPack(input.jobId),  
     prompt,  
     negativePrompt,  
     providerHints: {  
       aspectRatio: "16:9",  
       stylePreset: "mikage\_cinematic",  
       qualityTier: "high"  
     },  
     manifests: Array.from({ length: input.outputCount }).map((\_, index) \=\> ({  
       index,  
       seedHint: \`${input.jobId}:${index}\`,  
       expectedTags: \[  
         ...input.canonConstraints.requiredTags,  
         input.creativeIntent.subject  
       \]  
     })),  
     lineageHash: Buffer.from(  
       JSON.stringify({  
         projectId: input.projectId,  
         jobId: input.jobId,  
         objective: input.objective,  
         variant: input.variant,  
         subject: input.creativeIntent.subject  
       })  
     ).toString("base64url")  
   };  
 }  
}  
---

# **10\. GENERATION-SERVICE**

## **`apps/generation-service/src/adapters/base.provider.ts`**

export type ProviderGenerationRequest \= {  
 prompt: string;  
 negativePrompt?: string;  
 outputCount: number;  
 providerHints?: Record\<string, unknown\>;  
};

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

export interface GenerationProvider {  
 readonly name: string;  
 supports(objective: string): boolean;  
 execute(request: ProviderGenerationRequest): Promise\<ProviderGenerationResponse\>;  
}

## **`apps/generation-service/src/adapters/mock-image.provider.ts`**

import {  
 GenerationProvider,  
 ProviderGenerationRequest,  
 ProviderGenerationResponse  
} from "./base.provider";

export class MockImageProvider implements GenerationProvider {  
 readonly name \= "mock";

 supports(): boolean {  
   return true;  
 }

 async execute(request: ProviderGenerationRequest): Promise\<ProviderGenerationResponse\> {  
   return {  
     outputs: Array.from({ length: request.outputCount }).map((\_, index) \=\> ({  
       index,  
       mimeType: "image/png",  
       tempUri: \`file:///tmp/mikage/mock\_output\_${index}.png\`,  
       width: 1536,  
       height: 864,  
       providerAssetId: \`mock\_${index}\`,  
       providerMetadata: {  
         mock: true  
       }  
     }))  
   };  
 }  
}

## **`apps/generation-service/src/services/provider-registry.service.ts`**

import { Injectable } from "@nestjs/common";  
import { GenerationProvider } from "../adapters/base.provider";  
import { MockImageProvider } from "../adapters/mock-image.provider";

@Injectable()  
export class ProviderRegistryService {  
 private readonly providers: GenerationProvider\[\];

 constructor() {  
   this.providers \= \[new MockImageProvider()\];  
 }

 resolve(name: string): GenerationProvider {  
   const provider \= this.providers.find((p) \=\> p.name \=== name);  
   if (\!provider) {  
     throw new Error(\`Unknown provider ${name}\`);  
   }  
   return provider;  
 }  
}

## **`apps/generation-service/src/services/generation-dispatch.service.ts`**

import { Injectable } from "@nestjs/common";  
import {  
 ExecuteGenerationRequest,  
 ExecuteGenerationResponse  
} from "@mikage/generation-contracts";  
import { ids } from "@mikage/shared-types";  
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
     providerHints: input.promptPack.providerHints  
   });

   return {  
     generationRunId: ids.generationRun(input.jobId),  
     provider: provider.name,  
     outputs: result.outputs  
   };  
 }  
}

## **`apps/generation-service/src/controllers/generation.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import { ExecuteGenerationRequest } from "@mikage/generation-contracts";  
import { GenerationDispatchService } from "../services/generation-dispatch.service";

@Controller("generation")  
@UseGuards(InternalAuthGuard)  
export class GenerationController {  
 constructor(private readonly service: GenerationDispatchService) {}

 @Post("execute")  
 async execute(@Body() body: ExecuteGenerationRequest, @Req() req: any) {  
   const data \= await this.service.execute(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/generation-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { GenerationController } from "../controllers/generation.controller";  
import { GenerationDispatchService } from "../services/generation-dispatch.service";  
import { ProviderRegistryService } from "../services/provider-registry.service";

@Module({  
 controllers: \[GenerationController\],  
 providers: \[GenerationDispatchService, ProviderRegistryService\]  
})  
export class MainModule {}  
---

# **11\. INGESTION-SERVICE**

## **`apps/ingestion-service/src/services/ingestion.service.ts`**

import { Injectable } from "@nestjs/common";  
import {  
 IngestAssetsRequest,  
 IngestAssetsResponse  
} from "@mikage/generation-contracts";  
import { ids } from "@mikage/shared-types";

@Injectable()  
export class IngestionService {  
 async ingest(input: IngestAssetsRequest): Promise\<IngestAssetsResponse\> {  
   return {  
     batchId: ids.ingestionBatch(input.jobId),  
     assets: input.outputs.map((output, index) \=\> ({  
       assetId: ids.asset(input.jobId, index),  
       storageUri: \`s3://mikage/${input.projectId}/${input.jobId}/${index}.png\`,  
       checksum: \`sha256\_mock\_${index}\`,  
       manifestId: ids.manifest(input.jobId, index),  
       normalizedMetadata: {  
         mimeType: output.mimeType,  
         width: output.width ?? 1536,  
         height: output.height ?? 864,  
         sourceTempUri: output.tempUri,  
         providerAssetId: output.providerAssetId ?? null  
       }  
     })),  
     emittedEvents: \["asset.ingested", "embedding.requested", "lineage.sync.requested"\]  
   };  
 }  
}

## **`apps/ingestion-service/src/controllers/ingestion.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import { IngestAssetsRequest } from "@mikage/generation-contracts";  
import { IngestionService } from "../services/ingestion.service";

@Controller("ingestion")  
@UseGuards(InternalAuthGuard)  
export class IngestionController {  
 constructor(private readonly service: IngestionService) {}

 @Post("assets")  
 async ingest(@Body() body: IngestAssetsRequest, @Req() req: any) {  
   const data \= await this.service.ingest(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/ingestion-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { IngestionController } from "../controllers/ingestion.controller";  
import { IngestionService } from "../services/ingestion.service";

@Module({  
 controllers: \[IngestionController\],  
 providers: \[IngestionService\]  
})  
export class MainModule {}  
---

# **12\. BENCHMARK-SERVICE**

## **`apps/benchmark-service/src/services/benchmark.service.ts`**

import { Injectable } from "@nestjs/common";  
import {  
 BenchmarkCompareRequest,  
 BenchmarkCompareResponse  
} from "@mikage/generation-contracts";

@Injectable()  
export class BenchmarkService {  
 async compare(input: BenchmarkCompareRequest): Promise\<BenchmarkCompareResponse\> {  
   return {  
     results: input.assets.map((asset, index) \=\> ({  
       assetId: asset.assetId,  
       similarityScore: 0.83 \- index \* 0.03,  
       driftScore: 0.11 \+ index \* 0.02,  
       qualityBand: index \=== 0 ? "gold" : "silver"  
     }))  
   };  
 }  
}

## **`apps/benchmark-service/src/controllers/benchmark.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import { BenchmarkCompareRequest } from "@mikage/generation-contracts";  
import { BenchmarkService } from "../services/benchmark.service";

@Controller("benchmark")  
@UseGuards(InternalAuthGuard)  
export class BenchmarkController {  
 constructor(private readonly service: BenchmarkService) {}

 @Post("compare")  
 async compare(@Body() body: BenchmarkCompareRequest, @Req() req: any) {  
   const data \= await this.service.compare(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/benchmark-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { BenchmarkController } from "../controllers/benchmark.controller";  
import { BenchmarkService } from "../services/benchmark.service";

@Module({  
 controllers: \[BenchmarkController\],  
 providers: \[BenchmarkService\]  
})  
export class MainModule {}  
---

# **13\. REVIEW-SERVICE**

## **`apps/review-service/src/services/review.service.ts`**

import { Injectable } from "@nestjs/common";  
import {  
 CreateReviewTasksRequest,  
 CreateReviewTasksResponse  
} from "@mikage/generation-contracts";  
import { ids } from "@mikage/shared-types";

@Injectable()  
export class ReviewService {  
 async createTasks(input: CreateReviewTasksRequest): Promise\<CreateReviewTasksResponse\> {  
   return {  
     tasks: input.assets.map((asset, index) \=\> ({  
       reviewTaskId: ids.reviewTask(input.jobId, index),  
       assetId: asset.assetId,  
       queue: "canon\_visual\_review",  
       priority: index \=== 0 ? "high" : "medium"  
     }))  
   };  
 }  
}

## **`apps/review-service/src/controllers/review.controller.ts`**

import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";  
import { InternalAuthGuard } from "@mikage/shared-auth";  
import { ok } from "@mikage/shared-types";  
import { CreateReviewTasksRequest } from "@mikage/generation-contracts";  
import { ReviewService } from "../services/review.service";

@Controller("review")  
@UseGuards(InternalAuthGuard)  
export class ReviewController {  
 constructor(private readonly service: ReviewService) {}

 @Post("tasks")  
 async createTasks(@Body() body: CreateReviewTasksRequest, @Req() req: any) {  
   const data \= await this.service.createTasks(body);  
   return ok(req.headers\["x-trace-id"\] ?? crypto.randomUUID(), data);  
 }  
}

## **`apps/review-service/src/modules/main.module.ts`**

import { Module } from "@nestjs/common";  
import { ReviewController } from "../controllers/review.controller";  
import { ReviewService } from "../services/review.service";

@Module({  
 controllers: \[ReviewController\],  
 providers: \[ReviewService\]  
})  
export class MainModule {}  
---

# **14\. ORCHESTRATION-SERVICE**

Đây là phần quan trọng nhất: service này **không còn chứa domain logic**. Nó chỉ gọi service khác theo workflow.

## **`apps/orchestration-service/src/dto/run-job.request.ts`**

import { Objective } from "@mikage/shared-types";

export type RunJobRequest \= {  
 projectId: string;  
 universeId: string;  
 jobId: string;  
 objective: Objective;  
 variant: string;  
 provider?: "mock" | "gemini-image" | "seedance-video";  
 eraId?: string;  
 locationId?: string;  
 timelinePoint?: string;  
 characterIds: string\[\];  
 sceneIntent?: string;  
 subject: string;  
 action?: string;  
 framing?: string;  
 mood?: string;  
 shotType: string;  
 requestedElements?: string\[\];  
 outputCount?: number;  
};

## **Service clients**

### **`apps/orchestration-service/src/services/service-clients/world.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import {  
 ResolveWorldContextRequest,  
 ResolveWorldContextResponse  
} from "@mikage/world-state-contracts";

@Injectable()  
export class WorldClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.WORLD\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 resolveContext(body: ResolveWorldContextRequest): Promise\<ResolveWorldContextResponse\> {  
   return this.client.post("/internal/v1/world/resolve-context", body);  
 }  
}

### **`state.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import {  
 ResolveStateSnapshotRequest,  
 ResolveStateSnapshotResponse  
} from "@mikage/world-state-contracts";

@Injectable()  
export class StateClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.STATE\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 resolveSnapshot(body: ResolveStateSnapshotRequest): Promise\<ResolveStateSnapshotResponse\> {  
   return this.client.post("/internal/v1/state/resolve-snapshot", body);  
 }  
}

### **`canon.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import {  
 ValidatePostGenerationRequest,  
 ValidatePostGenerationResponse,  
 ValidatePreGenerationRequest,  
 ValidatePreGenerationResponse  
} from "@mikage/canon-contracts";

@Injectable()  
export class CanonClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.CANON\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 validatePreGeneration(body: ValidatePreGenerationRequest): Promise\<ValidatePreGenerationResponse\> {  
   return this.client.post("/internal/v1/canon/validate-pre-generation", body);  
 }

 validatePostGeneration(body: ValidatePostGenerationRequest): Promise\<ValidatePostGenerationResponse\> {  
   return this.client.post("/internal/v1/canon/validate-post-generation", body);  
 }  
}

### **`prompt.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import { CompilePromptRequest, CompilePromptResponse } from "@mikage/prompt-contracts";

@Injectable()  
export class PromptClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.PROMPT\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 compile(body: CompilePromptRequest): Promise\<CompilePromptResponse\> {  
   return this.client.post("/internal/v1/prompt/compile", body);  
 }  
}

### **`generation.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import {  
 ExecuteGenerationRequest,  
 ExecuteGenerationResponse  
} from "@mikage/generation-contracts";

@Injectable()  
export class GenerationClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.GENERATION\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 execute(body: ExecuteGenerationRequest): Promise\<ExecuteGenerationResponse\> {  
   return this.client.post("/internal/v1/generation/execute", body);  
 }  
}

### **`ingestion.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import {  
 IngestAssetsRequest,  
 IngestAssetsResponse  
} from "@mikage/generation-contracts";

@Injectable()  
export class IngestionClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.INGESTION\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 ingestAssets(body: IngestAssetsRequest): Promise\<IngestAssetsResponse\> {  
   return this.client.post("/internal/v1/ingestion/assets", body);  
 }  
}

### **`benchmark.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import {  
 BenchmarkCompareRequest,  
 BenchmarkCompareResponse  
} from "@mikage/generation-contracts";

@Injectable()  
export class BenchmarkClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.BENCHMARK\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 compare(body: BenchmarkCompareRequest): Promise\<BenchmarkCompareResponse\> {  
   return this.client.post("/internal/v1/benchmark/compare", body);  
 }  
}

### **`review.client.ts`**

import { Injectable } from "@nestjs/common";  
import { InternalClient } from "@mikage/shared-http";  
import {  
 CreateReviewTasksRequest,  
 CreateReviewTasksResponse  
} from "@mikage/generation-contracts";

@Injectable()  
export class ReviewClient {  
 private client \= new InternalClient(  
   "orchestration-service",  
   process.env.REVIEW\_SERVICE\_URL\!,  
   process.env.INTERNAL\_SERVICE\_TOKEN\!  
 );

 createTasks(body: CreateReviewTasksRequest): Promise\<CreateReviewTasksResponse\> {  
   return this.client.post("/internal/v1/review/tasks", body);  
 }  
}  
---

## **`apps/orchestration-service/src/services/workflow-runner.service.ts`**

import { Injectable } from "@nestjs/common";  
import { RunJobRequest } from "../dto/run-job.request";  
import { WorldClient } from "./service-clients/world.client";  
import { StateClient } from "./service-clients/state.client";  
import { CanonClient } from "./service-clients/canon.client";  
import { PromptClient } from "./service-clients/prompt.client";  
import { GenerationClient } from "./service-clients/generation.client";  
import { IngestionClient } from "./service-clients/ingestion.client";  
import { BenchmarkClient } from "./service-clients/benchmark.client";  
import { ReviewClient } from "./service-clients/review.client";

@Injectable()  
export class WorkflowRunnerService {  
 constructor(  
   private readonly worldClient: WorldClient,  
   private readonly stateClient: StateClient,  
   private readonly canonClient: CanonClient,  
   private readonly promptClient: PromptClient,  
   private readonly generationClient: GenerationClient,  
   private readonly ingestionClient: IngestionClient,  
   private readonly benchmarkClient: BenchmarkClient,  
   private readonly reviewClient: ReviewClient  
 ) {}

 async run(job: RunJobRequest) {  
   const outputCount \= job.outputCount ?? 4;

   const worldContext \= await this.worldClient.resolveContext({  
     projectId: job.projectId,  
     universeId: job.universeId,  
     eraId: job.eraId,  
     locationId: job.locationId,  
     characterIds: job.characterIds,  
     sceneIntent: job.sceneIntent  
   });

   const stateSnapshot \= await this.stateClient.resolveSnapshot({  
     projectId: job.projectId,  
     timelinePoint: job.timelinePoint,  
     characterIds: job.characterIds,  
     locationId: job.locationId,  
     narrativeIntent: job.sceneIntent  
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
       requestedElements: job.requestedElements ?? \[\]  
     }  
   });

   if (\!precheck.valid) {  
     throw new Error(\`Canon precheck failed: ${precheck.violations.map((v) \=\> v.code).join(", ")}\`);  
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
       mood: job.mood  
     },  
     outputCount  
   });

   const generation \= await this.generationClient.execute({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     provider: job.provider ?? "mock",  
     promptPack,  
     outputCount  
   });

   const ingestion \= await this.ingestionClient.ingestAssets({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     promptPackId: promptPack.promptPackId,  
     generationRunId: generation.generationRunId,  
     outputs: generation.outputs  
   });

   const postcheck \= await this.canonClient.validatePostGeneration({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     generatedAssets: ingestion.assets.map((asset) \=\> ({  
       assetId: asset.assetId,  
       metadata: asset.normalizedMetadata  
     })),  
     expectedEnvelope: precheck.enforcedConstraints  
   });

   const benchmark \= await this.benchmarkClient.compare({  
     projectId: job.projectId,  
     batchId: ingestion.batchId,  
     assets: ingestion.assets  
   });

   const review \= await this.reviewClient.createTasks({  
     projectId: job.projectId,  
     jobId: job.jobId,  
     assets: ingestion.assets,  
     benchmarkResults: benchmark.results  
   });

   return {  
     jobId: job.jobId,  
     promptPack,  
     assets: ingestion.assets,  
     canonPostcheck: postcheck,  
     benchmarkResults: benchmark.results,  
     reviewTasks: review.tasks,  
     lineageTrace: {  
       promptPackId: promptPack.promptPackId,  
       lineageHash: promptPack.lineageHash,  
       assetIds: ingestion.assets.map((a) \=\> a.assetId)  
     },  
     archiveEntries: ingestion.assets.map((a) \=\> ({  
       assetId: a.assetId,  
       manifestId: a.manifestId  
     }))  
   };  
 }  
}

## **`apps/orchestration-service/src/services/orchestration.service.ts`**

import { Injectable } from "@nestjs/common";  
import { WorkflowRunnerService } from "./workflow-runner.service";  
import { RunJobRequest } from "../dto/run-job.request";

@Injectable()  
export class OrchestrationService {  
 constructor(private readonly workflowRunner: WorkflowRunnerService) {}

 async runJob(input: RunJobRequest) {  
   return this.workflowRunner.run(input);  
 }  
}

## **`apps/orchestration-service/src/controllers/orchestration.controller.ts`**

import { Body, Controller, Post } from "@nestjs/common";  
import { OrchestrationService } from "../services/orchestration.service";  
import { RunJobRequest } from "../dto/run-job.request";

@Controller("orchestration")  
export class OrchestrationController {  
 constructor(private readonly service: OrchestrationService) {}

 @Post("jobs")  
 async run(@Body() body: RunJobRequest) {  
   return this.service.runJob(body);  
 }  
}

## **`apps/orchestration-service/src/modules/orchestration.module.ts`**

import { Module } from "@nestjs/common";  
import { OrchestrationController } from "../controllers/orchestration.controller";  
import { OrchestrationService } from "../services/orchestration.service";  
import { WorkflowRunnerService } from "../services/workflow-runner.service";  
import { WorldClient } from "../services/service-clients/world.client";  
import { StateClient } from "../services/service-clients/state.client";  
import { CanonClient } from "../services/service-clients/canon.client";  
import { PromptClient } from "../services/service-clients/prompt.client";  
import { GenerationClient } from "../services/service-clients/generation.client";  
import { IngestionClient } from "../services/service-clients/ingestion.client";  
import { BenchmarkClient } from "../services/service-clients/benchmark.client";  
import { ReviewClient } from "../services/service-clients/review.client";

@Module({  
 controllers: \[OrchestrationController\],  
 providers: \[  
   OrchestrationService,  
   WorkflowRunnerService,  
   WorldClient,  
   StateClient,  
   CanonClient,  
   PromptClient,  
   GenerationClient,  
   IngestionClient,  
   BenchmarkClient,  
   ReviewClient  
 \]  
})  
export class OrchestrationModule {}

## **`apps/orchestration-service/src/app.module.ts`**

import { Module } from "@nestjs/common";  
import { OrchestrationModule } from "./modules/orchestration.module";

@Module({  
 imports: \[OrchestrationModule\]  
})  
export class AppModule {}  
---

# **15\. GATEWAY**

Gateway ở Level-2 chỉ cần mỏng, forward request vào orchestration-service.

## **`apps/gateway/src/gateway.service.ts`**

import { Injectable } from "@nestjs/common";

@Injectable()  
export class GatewayService {  
 async forwardRunJob(body: unknown) {  
   const res \= await fetch(\`${process.env.ORCHESTRATION\_SERVICE\_URL}/internal/v1/orchestration/jobs\`, {  
     method: "POST",  
     headers: { "content-type": "application/json" },  
     body: JSON.stringify(body)  
   });

   if (\!res.ok) {  
     throw new Error(\`Gateway forward failed ${res.status}\`);  
   }

   return res.json();  
 }  
}

## **`apps/gateway/src/gateway.controller.ts`**

import { Body, Controller, Post } from "@nestjs/common";  
import { GatewayService } from "./gateway.service";

@Controller()  
export class GatewayController {  
 constructor(private readonly service: GatewayService) {}

 @Post("internal/orchestration/jobs")  
 async run(@Body() body: unknown) {  
   return this.service.forwardRunJob(body);  
 }  
}

## **`apps/gateway/src/app.module.ts`**

import { Module } from "@nestjs/common";  
import { GatewayController } from "./gateway.controller";  
import { GatewayService } from "./gateway.service";

@Module({  
 controllers: \[GatewayController\],  
 providers: \[GatewayService\]  
})  
export class AppModule {}

## **`apps/gateway/src/main.ts`**

import { NestFactory } from "@nestjs/core";  
import { AppModule } from "./app.module";

async function bootstrap() {  
 const app \= await NestFactory.create(AppModule);  
 await app.listen(Number(process.env.PORT || 7000));  
}  
bootstrap();  
---

# **16\. DOCKERFILE TEMPLATE**

Dùng chung cho từng service.

## **`apps/world-service/Dockerfile`**

Áp dụng tương tự cho các service khác, chỉ đổi port nếu muốn.

FROM node:20-alpine

WORKDIR /app

COPY package.json ./  
COPY tsconfig.base.json ./  
COPY apps ./apps  
COPY packages ./packages

RUN npm install  
RUN npm run build

CMD \["node", "apps/world-service/dist/main.js"\]

Thực tế khi triển khai thật, nên refine build output path cho từng app rõ hơn. Nhưng cho MVP local, cấu trúc này đủ để đóng container nhanh.

---

# **17\. `.env.example`**

INTERNAL\_SERVICE\_TOKEN=mikage\_internal\_dev\_token

GATEWAY\_URL=http://gateway:7000  
ORCHESTRATION\_SERVICE\_URL=http://orchestration-service:7010  
CANON\_SERVICE\_URL=http://canon-service:7011  
WORLD\_SERVICE\_URL=http://world-service:7012  
STATE\_SERVICE\_URL=http://state-service:7013  
PROMPT\_SERVICE\_URL=http://prompt-service:7014  
GENERATION\_SERVICE\_URL=http://generation-service:7015  
INGESTION\_SERVICE\_URL=http://ingestion-service:7016  
BENCHMARK\_SERVICE\_URL=http://benchmark-service:7017  
REVIEW\_SERVICE\_URL=http://review-service:7018

PORT=7000  
POSTGRES\_URL=postgresql://postgres:postgres@postgres:5432/mikage  
REDIS\_URL=redis://redis:6379  
NEO4J\_URI=bolt://neo4j:7687  
MINIO\_ENDPOINT=http://minio:9000  
---

# **18\. DOCKER COMPOSE LEVEL-2**

## **`infra/compose/docker-compose.level2.yml`**

version: "3.9"

services:  
 gateway:  
   build:  
     context: ../..  
     dockerfile: apps/gateway/Dockerfile  
   environment:  
     PORT: 7000  
     ORCHESTRATION\_SERVICE\_URL: http://orchestration-service:7010  
   ports:  
     \- "7000:7000"

 orchestration-service:  
   build:  
     context: ../..  
     dockerfile: apps/orchestration-service/Dockerfile  
   environment:  
     PORT: 7010  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
     WORLD\_SERVICE\_URL: http://world-service:7012  
     STATE\_SERVICE\_URL: http://state-service:7013  
     CANON\_SERVICE\_URL: http://canon-service:7011  
     PROMPT\_SERVICE\_URL: http://prompt-service:7014  
     GENERATION\_SERVICE\_URL: http://generation-service:7015  
     INGESTION\_SERVICE\_URL: http://ingestion-service:7016  
     BENCHMARK\_SERVICE\_URL: http://benchmark-service:7017  
     REVIEW\_SERVICE\_URL: http://review-service:7018  
   ports:  
     \- "7010:7010"

 canon-service:  
   build:  
     context: ../..  
     dockerfile: apps/canon-service/Dockerfile  
   environment:  
     PORT: 7011  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7011:7011"

 world-service:  
   build:  
     context: ../..  
     dockerfile: apps/world-service/Dockerfile  
   environment:  
     PORT: 7012  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7012:7012"

 state-service:  
   build:  
     context: ../..  
     dockerfile: apps/state-service/Dockerfile  
   environment:  
     PORT: 7013  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7013:7013"

 prompt-service:  
   build:  
     context: ../..  
     dockerfile: apps/prompt-service/Dockerfile  
   environment:  
     PORT: 7014  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7014:7014"

 generation-service:  
   build:  
     context: ../..  
     dockerfile: apps/generation-service/Dockerfile  
   environment:  
     PORT: 7015  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7015:7015"

 ingestion-service:  
   build:  
     context: ../..  
     dockerfile: apps/ingestion-service/Dockerfile  
   environment:  
     PORT: 7016  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7016:7016"

 benchmark-service:  
   build:  
     context: ../..  
     dockerfile: apps/benchmark-service/Dockerfile  
   environment:  
     PORT: 7017  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7017:7017"

 review-service:  
   build:  
     context: ../..  
     dockerfile: apps/review-service/Dockerfile  
   environment:  
     PORT: 7018  
     INTERNAL\_SERVICE\_TOKEN: mikage\_internal\_dev\_token  
   ports:  
     \- "7018:7018"

 postgres:  
   image: postgres:16  
   environment:  
     POSTGRES\_DB: mikage  
     POSTGRES\_USER: postgres  
     POSTGRES\_PASSWORD: postgres  
   ports:  
     \- "5432:5432"

 redis:  
   image: redis:7  
   ports:  
     \- "6379:6379"

 neo4j:  
   image: neo4j:5  
   environment:  
     NEO4J\_AUTH: neo4j/password  
   ports:  
     \- "7474:7474"  
     \- "7687:7687"

 minio:  
   image: minio/minio  
   command: server /data \--console-address ":9001"  
   environment:  
     MINIO\_ROOT\_USER: minio  
     MINIO\_ROOT\_PASSWORD: password123  
   ports:  
     \- "9000:9000"  
     \- "9001:9001"  
---

# **19\. LEVEL-2 SMOKE TEST**

## **`tests/smoke/level2.smoke.spec.ts`**

const body \= {  
 projectId: "mikage",  
 universeId: "mikage-universe",  
 jobId: "job\_level2\_smoke",  
 objective: "cinematic\_frame",  
 variant: "storm\_rooftop\_action",  
 provider: "mock",  
 eraId: "late-entropy-industrial-age",  
 locationId: "megacity-rooftop",  
 characterIds: \["mikage"\],  
 sceneIntent: "rooftop confrontation under storm",  
 subject: "Mikage",  
 action: "standing at the edge of a brutalist rooftop in storm crosswind",  
 framing: "low-angle wide anamorphic cinematic frame",  
 mood: "restrained violent tension",  
 shotType: "wide",  
 requestedElements: \["hard sci-fi", "storm", "industrial rooftop"\],  
 outputCount: 4  
};

async function run() {  
 const res \= await fetch("http://localhost:7000/internal/orchestration/jobs", {  
   method: "POST",  
   headers: { "content-type": "application/json" },  
   body: JSON.stringify(body)  
 });

 if (\!res.ok) {  
   throw new Error(\`Smoke test failed with status ${res.status}\`);  
 }

 const json \= await res.json();

 if (\!json.promptPack?.promptPackId) {  
   throw new Error("Missing prompt pack");  
 }

 if (\!Array.isArray(json.assets) || json.assets.length \!== 4\) {  
   throw new Error("Expected 4 assets");  
 }

 if (\!Array.isArray(json.reviewTasks) || json.reviewTasks.length \!== 4\) {  
   throw new Error("Expected 4 review tasks");  
 }

 if (\!json.lineageTrace?.lineageHash) {  
   throw new Error("Missing lineage trace");  
 }

 if (\!Array.isArray(json.archiveEntries) || json.archiveEntries.length \!== 4\) {  
   throw new Error("Expected 4 archive entries");  
 }

 console.log("LEVEL-2 SMOKE PASS");  
 console.log(JSON.stringify(json, null, 2));  
}

run().catch((err) \=\> {  
 console.error("LEVEL-2 SMOKE FAIL");  
 console.error(err);  
 process.exit(1);  
});  
---

# **20\. NEW WORKFLOW DIAGRAM**

Gateway  
 |  
 v  
orchestration-service  
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
 v  
final job result  
---

# **21\. WHAT THIS LEVEL NOW GUARANTEES**

Sau khi dựng theo scaffold này, repo của Mikage đạt trạng thái:

### **orchestration đã sạch vai trò**

* chỉ còn workflow coordination

* không còn canon logic inline

* không còn prompt assembly inline

* không còn provider branching inline

### **domain responsibility đã tách**

* truth lookup nằm ở `world-service`

* continuity/state nằm ở `state-service`

* canon enforcement nằm ở `canon-service`

* prompt compilation nằm ở `prompt-service`

* provider execution nằm ở `generation-service`

### **output shape vẫn giữ đúng MVP cũ**

* compiled prompt pack

* 4 assets

* 4 manifests

* 4 review tasks

* lineage trace

* archive entries

---

# **22\. BUILD ORDER ĐỂ TRIỂN KHAI THẬT**

Thứ tự đúng để áp vào repo hiện tại:

## **A. shared packages trước**

1. `shared-types`

2. `shared-auth`

3. `shared-http`

4. contracts packages

## **B. extracted services**

5. `world-service`

6. `state-service`

7. `canon-service`

8. `prompt-service`

9. `generation-service`

## **C. supporting services**

10. `ingestion-service`

11. `benchmark-service`

12. `review-service`

## **D. coordination layer**

13. refactor `orchestration-service`

14. add `gateway`

15. update compose

16. run smoke

---

# **23\. DEFINITION OF DONE CHO BẢN NÀY**

Bản scaffold này được xem là hoàn thành khi:

* từng service boot riêng được bằng port riêng

* orchestration gọi nội bộ qua HTTP clients

* smoke test trả về đủ 4 asset / 4 review task / lineage / archive

* không còn logic prompt/canon/generation nằm trong orchestration

* internal token guard hoạt động với các service nội bộ

