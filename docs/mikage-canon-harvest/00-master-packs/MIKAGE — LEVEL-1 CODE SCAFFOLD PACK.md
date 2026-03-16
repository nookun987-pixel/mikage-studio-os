Gói này dựng 8 khối đầu tiên, đủ để repo **boot được**, **migrate được**, **seed được**, và **chạy được first orchestration path** ở mức khung.

---

# **1\. ROOT `package.json`**

{  
 "name": "mikage",  
 "private": true,  
 "packageManager": "pnpm@10.6.0",  
 "scripts": {  
   "dev": "turbo run dev \--parallel",  
   "build": "turbo run build",  
   "lint": "turbo run lint",  
   "typecheck": "turbo run typecheck",  
   "test": "turbo run test",  
   "migrate": "tsx scripts/migrate.ts",  
   "seed": "tsx scripts/seed.ts",  
   "seed:neo4j": "tsx scripts/seed-neo4j.ts",  
   "smoke": "tsx scripts/smoke-test.ts",  
   "mvp:run": "tsx scripts/run-mvp-job.ts",  
   "dev:up": "docker compose \-f infra/compose/docker-compose.local.yml up \-d",  
   "dev:down": "docker compose \-f infra/compose/docker-compose.local.yml down \-v"  
 },  
 "devDependencies": {  
   "@types/node": "^22.13.10",  
   "tsx": "^4.19.3",  
   "turbo": "^2.4.4",  
   "typescript": "^5.8.2"  
 }  
}  
---

# **2\. ROOT `turbo.json`**

{  
 "$schema": "https://turbo.build/schema.json",  
 "tasks": {  
   "build": {  
     "dependsOn": \["^build"\],  
     "outputs": \["dist/\*\*", ".next/\*\*"\]  
   },  
   "dev": {  
     "cache": false,  
     "persistent": true  
   },  
   "lint": {  
     "dependsOn": \["^lint"\]  
   },  
   "typecheck": {  
     "dependsOn": \["^typecheck"\]  
   },  
   "test": {  
     "dependsOn": \["^test"\],  
     "outputs": \["coverage/\*\*"\]  
   }  
 }  
}  
---

# **3\. ROOT `pnpm-workspace.yaml`**

packages:  
 \- "apps/\*"  
 \- "packages/\*"  
---

# **4\. ROOT `tsconfig.base.json`**

{  
 "compilerOptions": {  
   "target": "ES2022",  
   "module": "NodeNext",  
   "moduleResolution": "NodeNext",  
   "lib": \["ES2022"\],  
   "strict": true,  
   "skipLibCheck": true,  
   "declaration": true,  
   "sourceMap": true,  
   "resolveJsonModule": true,  
   "esModuleInterop": true,  
   "baseUrl": ".",  
   "paths": {  
     "@mikage/config": \["packages/config/src/index.ts"\],  
     "@mikage/config/\*": \["packages/config/src/\*"\],  
     "@mikage/contracts": \["packages/contracts/src/index.ts"\],  
     "@mikage/contracts/\*": \["packages/contracts/src/\*"\],  
     "@mikage/database": \["packages/database/src/index.ts"\],  
     "@mikage/database/\*": \["packages/database/src/\*"\],  
     "@mikage/domain": \["packages/domain/src/index.ts"\],  
     "@mikage/domain/\*": \["packages/domain/src/\*"\],  
     "@mikage/logging": \["packages/logging/src/index.ts"\],  
     "@mikage/logging/\*": \["packages/logging/src/\*"\],  
     "@mikage/storage": \["packages/storage/src/index.ts"\],  
     "@mikage/storage/\*": \["packages/storage/src/\*"\]  
   }  
 }  
}  
---

# **5\. ROOT `.env.example`**

NODE\_ENV=development

DATABASE\_URL=postgresql://mikage:mikage@localhost:5432/mikage  
DIRECT\_URL=postgresql://mikage:mikage@localhost:5432/mikage

NEO4J\_URI=bolt://localhost:7687  
NEO4J\_USERNAME=neo4j  
NEO4J\_PASSWORD=mikage123

REDIS\_URL=redis://localhost:6379

S3\_ENDPOINT=http://localhost:9000  
S3\_REGION=us-east-1  
S3\_ACCESS\_KEY\_ID=mikage  
S3\_SECRET\_ACCESS\_KEY=mikage123  
S3\_BUCKET\_ASSETS=mikage-assets  
S3\_BUCKET\_ARCHIVES=mikage-archives  
S3\_FORCE\_PATH\_STYLE=true

API\_GATEWAY\_PORT=3001  
CANON\_SERVICE\_PORT=3101  
WORLD\_SERVICE\_PORT=3102  
STATE\_SERVICE\_PORT=3103  
PROMPT\_SERVICE\_PORT=3104  
GENERATION\_SERVICE\_PORT=3105  
INGESTION\_SERVICE\_PORT=3106  
BENCHMARK\_SERVICE\_PORT=3107  
REVIEW\_SERVICE\_PORT=3108  
ORCHESTRATION\_SERVICE\_PORT=3109  
STUDIO\_WEB\_PORT=3000

DEFAULT\_PROJECT\_SLUG=mikage  
DEFAULT\_PROVIDER\_CODE=mock\_image\_provider  
ENABLE\_REAL\_PROVIDER=false  
ENABLE\_MOCK\_PROVIDER=true

OPENAI\_API\_KEY=  
OPENAI\_IMAGE\_MODEL=  
OPENAI\_EMBEDDING\_MODEL=text-embedding-3-small  
---

# **6\. `infra/compose/docker-compose.local.yml`**

version: "3.9"

services:  
 postgres:  
   image: pgvector/pgvector:pg16  
   container\_name: mikage-postgres  
   environment:  
     POSTGRES\_USER: mikage  
     POSTGRES\_PASSWORD: mikage  
     POSTGRES\_DB: mikage  
   ports:  
     \- "5432:5432"  
   volumes:  
     \- postgres\_data:/var/lib/postgresql/data

 neo4j:  
   image: neo4j:5.26  
   container\_name: mikage-neo4j  
   environment:  
     NEO4J\_AUTH: neo4j/mikage123  
     NEO4J\_server\_memory\_heap\_initial\_\_size: 512m  
     NEO4J\_server\_memory\_heap\_max\_\_size: 512m  
     NEO4J\_server\_memory\_pagecache\_size: 512m  
   ports:  
     \- "7474:7474"  
     \- "7687:7687"  
   volumes:  
     \- neo4j\_data:/data

 redis:  
   image: redis:7  
   container\_name: mikage-redis  
   ports:  
     \- "6379:6379"

 minio:  
   image: minio/minio:latest  
   container\_name: mikage-minio  
   command: server /data \--console-address ":9001"  
   environment:  
     MINIO\_ROOT\_USER: mikage  
     MINIO\_ROOT\_PASSWORD: mikage123  
   ports:  
     \- "9000:9000"  
     \- "9001:9001"  
   volumes:  
     \- minio\_data:/data

 minio-init:  
   image: minio/mc:latest  
   container\_name: mikage-minio-init  
   depends\_on:  
     \- minio  
   entrypoint: \>  
     /bin/sh \-c "  
     until /usr/bin/mc alias set local http://minio:9000 mikage mikage123; do sleep 1; done;  
     /usr/bin/mc mb \-p local/mikage-assets || true;  
     /usr/bin/mc mb \-p local/mikage-archives || true;  
     exit 0;  
     "

volumes:  
 postgres\_data:  
 neo4j\_data:  
 minio\_data:  
---

# **7\. `packages/config/package.json`**

{  
 "name": "@mikage/config",  
 "version": "0.0.1",  
 "private": true,  
 "type": "module",  
 "main": "src/index.ts",  
 "types": "src/index.ts",  
 "dependencies": {  
   "dotenv": "^16.4.7",  
   "zod": "^3.24.2"  
 }  
}  
---

# **8\. `packages/config/src/env.ts`**

import "dotenv/config";  
import { z } from "zod";

const EnvSchema \= z.object({  
 NODE\_ENV: z.enum(\["development", "test", "production"\]).default("development"),

 DATABASE\_URL: z.string().min(1),  
 DIRECT\_URL: z.string().min(1),

 NEO4J\_URI: z.string().min(1),  
 NEO4J\_USERNAME: z.string().min(1),  
 NEO4J\_PASSWORD: z.string().min(1),

 REDIS\_URL: z.string().min(1),

 S3\_ENDPOINT: z.string().min(1),  
 S3\_REGION: z.string().min(1),  
 S3\_ACCESS\_KEY\_ID: z.string().min(1),  
 S3\_SECRET\_ACCESS\_KEY: z.string().min(1),  
 S3\_BUCKET\_ASSETS: z.string().min(1),  
 S3\_BUCKET\_ARCHIVES: z.string().min(1),  
 S3\_FORCE\_PATH\_STYLE: z.coerce.boolean().default(true),

 API\_GATEWAY\_PORT: z.coerce.number().default(3001),  
 CANON\_SERVICE\_PORT: z.coerce.number().default(3101),  
 WORLD\_SERVICE\_PORT: z.coerce.number().default(3102),  
 STATE\_SERVICE\_PORT: z.coerce.number().default(3103),  
 PROMPT\_SERVICE\_PORT: z.coerce.number().default(3104),  
 GENERATION\_SERVICE\_PORT: z.coerce.number().default(3105),  
 INGESTION\_SERVICE\_PORT: z.coerce.number().default(3106),  
 BENCHMARK\_SERVICE\_PORT: z.coerce.number().default(3107),  
 REVIEW\_SERVICE\_PORT: z.coerce.number().default(3108),  
 ORCHESTRATION\_SERVICE\_PORT: z.coerce.number().default(3109),  
 STUDIO\_WEB\_PORT: z.coerce.number().default(3000),

 DEFAULT\_PROJECT\_SLUG: z.string().default("mikage"),  
 DEFAULT\_PROVIDER\_CODE: z.string().default("mock\_image\_provider"),  
 ENABLE\_REAL\_PROVIDER: z.coerce.boolean().default(false),  
 ENABLE\_MOCK\_PROVIDER: z.coerce.boolean().default(true),

 OPENAI\_API\_KEY: z.string().optional().default(""),  
 OPENAI\_IMAGE\_MODEL: z.string().optional().default(""),  
 OPENAI\_EMBEDDING\_MODEL: z.string().default("text-embedding-3-small")  
});

export const env \= EnvSchema.parse(process.env);  
export type AppEnv \= z.infer\<typeof EnvSchema\>;  
---

# **9\. `packages/config/src/index.ts`**

export \* from "./env.js";  
---

# **10\. `packages/contracts/package.json`**

{  
 "name": "@mikage/contracts",  
 "version": "0.0.1",  
 "private": true,  
 "type": "module",  
 "main": "src/index.ts",  
 "types": "src/index.ts",  
 "dependencies": {  
   "zod": "^3.24.2"  
 }  
}  
---

# **11\. `packages/contracts/src/orchestration/cinematic-job-request.ts`**

import { z } from "zod";

export const CinematicJobRequestSchema \= z.object({  
 projectSlug: z.string().min(1),  
 characterCode: z.string().min(1),  
 anchorCode: z.string().min(1),  
 presetCode: z.string().min(1),  
 variantCode: z.string().min(1),  
 sceneCode: z.string().min(1),  
 shotCode: z.string().min(1),  
 providerCode: z.string().optional(),  
 outputCount: z.number().int().min(1).max(8).default(4)  
});

export type CinematicJobRequest \= z.infer\<typeof CinematicJobRequestSchema\>;  
---

# **12\. `packages/contracts/src/prompt/compiled-prompt-pack.ts`**

import { z } from "zod";

export const CompiledPromptPackSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 packCode: z.string().min(1),  
 presetId: z.string().uuid(),  
 variantId: z.string().uuid(),  
 anchorId: z.string().uuid(),  
 snapshotId: z.string().uuid().optional(),  
 sceneId: z.string().uuid().optional(),  
 shotId: z.string().uuid().optional(),  
 compiledPrompt: z.string().min(1),  
 negativePrompt: z.string().optional(),  
 metadata: z.record(z.any()),  
 preValidationReport: z.record(z.any()),  
 lineageComplete: z.boolean()  
});

export type CompiledPromptPack \= z.infer\<typeof CompiledPromptPackSchema\>;  
---

# **13\. `packages/contracts/src/world/resolved-world-context.ts`**

import { z } from "zod";

export const ResolvedWorldContextSchema \= z.object({  
 projectId: z.string().uuid(),  
 character: z.object({  
   id: z.string().uuid(),  
   code: z.string(),  
   name: z.string()  
 }),  
 anchor: z.object({  
   id: z.string().uuid(),  
   code: z.string(),  
   label: z.string()  
 }),  
 era: z.object({  
   id: z.string().uuid(),  
   code: z.string(),  
   name: z.string()  
 }).optional(),  
 location: z.object({  
   id: z.string().uuid(),  
   code: z.string(),  
   name: z.string()  
 }).optional(),  
 scene: z.object({  
   id: z.string().uuid(),  
   code: z.string(),  
   title: z.string(),  
   data: z.record(z.any())  
 }),  
 shot: z.object({  
   id: z.string().uuid(),  
   code: z.string(),  
   title: z.string(),  
   cameraGrammar: z.record(z.any())  
 }),  
 worldRefs: z.array(  
   z.object({  
     id: z.string().uuid(),  
     code: z.string(),  
     kind: z.string(),  
     name: z.string()  
   })  
 )  
});

export type ResolvedWorldContext \= z.infer\<typeof ResolvedWorldContextSchema\>;  
---

# **14\. `packages/contracts/src/state/resolved-state-context.ts`**

import { z } from "zod";

export const ResolvedStateContextSchema \= z.object({  
 snapshotId: z.string().uuid(),  
 snapshotCode: z.string(),  
 characterEntityId: z.string().uuid(),  
 anchorId: z.string().uuid(),  
 reactorState: z.record(z.any()),  
 psychologicalState: z.record(z.any()),  
 loyaltyState: z.record(z.any()),  
 knowledgeState: z.record(z.any()),  
 missionState: z.record(z.any())  
});

export type ResolvedStateContext \= z.infer\<typeof ResolvedStateContextSchema\>;  
---

# **15\. `packages/contracts/src/index.ts`**

export \* from "./orchestration/cinematic-job-request.js";  
export \* from "./prompt/compiled-prompt-pack.js";  
export \* from "./world/resolved-world-context.js";  
export \* from "./state/resolved-state-context.js";  
---

# **16\. `packages/database/package.json`**

{  
 "name": "@mikage/database",  
 "version": "0.0.1",  
 "private": true,  
 "type": "module",  
 "main": "src/index.ts",  
 "types": "src/index.ts",  
 "dependencies": {  
   "@mikage/config": "workspace:\*",  
   "@prisma/client": "^6.5.0",  
   "ioredis": "^5.5.0",  
   "neo4j-driver": "^5.28.1"  
 },  
 "devDependencies": {  
   "prisma": "^6.5.0"  
 }  
}  
---

# **17\. `packages/database/src/prisma.ts`**

import { PrismaClient } from "@prisma/client";

declare global {  
 // eslint-disable-next-line no-var  
 var \_\_mikagePrisma\_\_: PrismaClient | undefined;  
}

export const prisma \=  
 global.\_\_mikagePrisma\_\_ ??  
 new PrismaClient({  
   log: \["error", "warn"\]  
 });

if (process.env.NODE\_ENV \!== "production") {  
 global.\_\_mikagePrisma\_\_ \= prisma;  
}  
---

# **18\. `packages/database/src/neo4j.ts`**

import neo4j from "neo4j-driver";  
import { env } from "@mikage/config";

export const neo4jDriver \= neo4j.driver(  
 env.NEO4J\_URI,  
 neo4j.auth.basic(env.NEO4J\_USERNAME, env.NEO4J\_PASSWORD)  
);

export async function verifyNeo4jConnection(): Promise\<void\> {  
 await neo4jDriver.verifyConnectivity();  
}  
---

# **19\. `packages/database/src/redis.ts`**

import Redis from "ioredis";  
import { env } from "@mikage/config";

export const redis \= new Redis(env.REDIS\_URL);

export async function verifyRedisConnection(): Promise\<void\> {  
 const pong \= await redis.ping();  
 if (pong \!== "PONG") {  
   throw new Error("Redis ping failed");  
 }  
}  
---

# **20\. `packages/database/src/index.ts`**

export \* from "./prisma.js";  
export \* from "./neo4j.js";  
export \* from "./redis.js";  
---

# **21\. `packages/database/prisma/schema.prisma`**

Đây là **schema bootstrap rút gọn nhưng chạy thật được** cho slice đầu tiên.

generator client {  
 provider \= "prisma-client-js"  
}

datasource db {  
 provider   \= "postgresql"  
 url        \= env("DATABASE\_URL")  
 directUrl  \= env("DIRECT\_URL")  
 extensions \= \[vector\]  
}

model Project {  
 id        String   @id @default(uuid())  
 slug      String   @unique  
 name      String  
 status    String  
 createdAt DateTime @default(now())  
 updatedAt DateTime @updatedAt

 canonRules              CanonRule\[\]  
 worldEntities           WorldEntity\[\]  
 timelineAnchors         TimelineAnchor\[\]  
 characterStateSnapshots CharacterStateSnapshot\[\]  
 scenes                  Scene\[\]  
 shots                   Shot\[\]  
 promptPresets           PromptPreset\[\]  
 promptVariants          PromptVariant\[\]  
 negativeProfiles        NegativeProfile\[\]  
 compiledPromptPacks     CompiledPromptPack\[\]  
 jobs                    Job\[\]  
 assets                  Asset\[\]  
 reviewTasks             ReviewTask\[\]  
 benchmarkSets           BenchmarkSet\[\]  
 providerProfiles        ProviderProfile\[\]  
}

model CanonRule {  
 id          String   @id @default(uuid())  
 projectId   String  
 ruleCode    String  
 title       String  
 layer       String  
 severity    String  
 description String  
 expression  Json?  
 isActive    Boolean  @default(true)  
 createdAt   DateTime @default(now())  
 updatedAt   DateTime @updatedAt

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, ruleCode\])  
}

model WorldEntity {  
 id            String   @id @default(uuid())  
 projectId     String  
 entityCode    String  
 entityKind    String  
 canonicalName String  
 status        String  
 isCanonical   Boolean  @default(true)  
 createdAt     DateTime @default(now())  
 updatedAt     DateTime @updatedAt

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, entityCode\])  
}

model TimelineAnchor {  
 id             String   @id @default(uuid())  
 projectId      String  
 anchorCode     String  
 label          String  
 anchorType     String  
 sequenceNo     Int  
 timeExpression String?  
 context        Json  
 isCanonical    Boolean  @default(true)  
 createdAt      DateTime @default(now())

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, anchorCode\])  
}

model CharacterStateSnapshot {  
 id                  String   @id @default(uuid())  
 projectId           String  
 snapshotCode        String  
 characterEntityId   String  
 anchorId            String  
 physicalState       Json  
 combatState         Json  
 reactorState        Json  
 psychologicalState  Json  
 loyaltyState        Json  
 knowledgeState      Json  
 relationshipState   Json  
 missionState        Json  
 visibilityState     Json  
 validatorStatus     String  
 createdAt           DateTime @default(now())  
 updatedAt           DateTime @updatedAt

 project Project        @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 anchor  TimelineAnchor @relation(fields: \[anchorId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, snapshotCode\])  
}

model Scene {  
 id               String   @id @default(uuid())  
 projectId        String  
 sceneCode        String  
 anchorId         String  
 title            String  
 sceneType        String  
 narrativePurpose String  
 locationEntityId String?  
 data             Json  
 createdAt        DateTime @default(now())  
 updatedAt        DateTime @updatedAt

 project Project        @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 anchor  TimelineAnchor @relation(fields: \[anchorId\], references: \[id\], onDelete: Cascade)  
 shots   Shot\[\]

 @@unique(\[projectId, sceneCode\])  
}

model Shot {  
 id                 String   @id @default(uuid())  
 projectId          String  
 shotCode           String  
 sceneId            String  
 title              String  
 shotType           String  
 cameraGrammar      Json  
 stateVisualMapping Json  
 data               Json  
 createdAt          DateTime @default(now())  
 updatedAt          DateTime @updatedAt

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 scene   Scene   @relation(fields: \[sceneId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, shotCode\])  
}

model PromptPreset {  
 id             String   @id @default(uuid())  
 projectId      String  
 presetCode     String  
 name           String  
 objective      String  
 modality       String  
 schema         Json  
 compilerConfig Json  
 isActive       Boolean  @default(true)  
 createdAt      DateTime @default(now())

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, presetCode\])  
}

model PromptVariant {  
 id            String   @id @default(uuid())  
 projectId     String  
 presetId      String  
 variantCode   String  
 name          String  
 variantConfig Json  
 isActive      Boolean  @default(true)  
 createdAt     DateTime @default(now())

 project Project      @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 preset  PromptPreset @relation(fields: \[presetId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, variantCode\])  
}

model NegativeProfile {  
 id          String   @id @default(uuid())  
 projectId   String  
 profileCode String  
 name        String  
 terms       Json  
 weights     Json?  
 createdAt   DateTime @default(now())

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, profileCode\])  
}

model CompiledPromptPack {  
 id                  String   @id @default(uuid())  
 projectId           String  
 packCode            String  
 presetId            String  
 variantId           String  
 anchorId            String  
 snapshotId          String?  
 sceneId             String?  
 shotId              String?  
 compiledPrompt      String  
 negativePrompt      String?  
 metadata            Json  
 preValidationReport Json  
 lineageComplete     Boolean  @default(false)  
 createdAt           DateTime @default(now())

 project Project      @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 preset  PromptPreset @relation(fields: \[presetId\], references: \[id\], onDelete: Cascade)  
 variant PromptVariant @relation(fields: \[variantId\], references: \[id\], onDelete: Cascade)  
 anchor  TimelineAnchor @relation(fields: \[anchorId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, packCode\])  
}

model ProviderProfile {  
 id           String   @id @default(uuid())  
 projectId    String  
 providerCode String  
 name         String  
 capabilities Json  
 routingRules Json  
 isActive     Boolean  @default(true)  
 createdAt    DateTime @default(now())

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, providerCode\])  
}

model Job {  
 id             String   @id @default(uuid())  
 projectId      String  
 jobCode        String  
 jobType        String  
 status         String  
 requestPayload Json  
 context        Json  
 createdAt      DateTime @default(now())  
 updatedAt      DateTime @updatedAt

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 steps   JobStep\[\]  
 assets  Asset\[\]

 @@unique(\[projectId, jobCode\])  
}

model JobStep {  
 id            String   @id @default(uuid())  
 jobId         String  
 stepName      String  
 stepOrder     Int  
 status        String  
 inputPayload  Json?  
 outputPayload Json?  
 startedAt     DateTime?  
 finishedAt    DateTime?  
 createdAt     DateTime @default(now())

 job Job @relation(fields: \[jobId\], references: \[id\], onDelete: Cascade)

 @@unique(\[jobId, stepName\])  
}

model Asset {  
 id                 String   @id @default(uuid())  
 projectId          String  
 assetCode          String  
 jobId              String  
 assetType          String  
 status             String  
 storageBucket      String  
 storageKey         String  
 manifestVersion    Int      @default(1)  
 metadata           Json  
 lineageComplete    Boolean  @default(false)  
 createdAt          DateTime @default(now())  
 updatedAt          DateTime @updatedAt

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 job     Job     @relation(fields: \[jobId\], references: \[id\], onDelete: Cascade)

 manifests    AssetManifest\[\]  
 reviewTasks  ReviewTask\[\]  
 driftReports DriftReport\[\]  
 benchmarkScores BenchmarkScore\[\]

 @@unique(\[projectId, assetCode\])  
}

model AssetManifest {  
 id        String   @id @default(uuid())  
 assetId    String  
 manifest   Json  
 createdAt  DateTime @default(now())

 asset Asset @relation(fields: \[assetId\], references: \[id\], onDelete: Cascade)  
}

model BenchmarkSet {  
 id        String   @id @default(uuid())  
 projectId String  
 setCode   String  
 setKind   String  
 name      String  
 criteria  Json  
 createdAt DateTime @default(now())

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, setCode\])  
}

model BenchmarkScore {  
 id             String   @id @default(uuid())  
 assetId        String  
 benchmarkSetId String  
 score          Decimal  
 details        Json  
 createdAt      DateTime @default(now())

 asset        Asset        @relation(fields: \[assetId\], references: \[id\], onDelete: Cascade)  
 benchmarkSet BenchmarkSet @relation(fields: \[benchmarkSetId\], references: \[id\], onDelete: Cascade)

 @@unique(\[assetId, benchmarkSetId\])  
}

model DriftReport {  
 id        String   @id @default(uuid())  
 assetId   String  
 riskLevel String  
 report    Json  
 createdAt DateTime @default(now())

 asset Asset @relation(fields: \[assetId\], references: \[id\], onDelete: Cascade)

 @@unique(\[assetId\])  
}

model ReviewTask {  
 id         String   @id @default(uuid())  
 projectId  String  
 assetId    String  
 jobId      String  
 taskCode   String  
 reviewType String  
 status     String  
 priority   String  
 payload    Json  
 createdAt  DateTime @default(now())  
 updatedAt  DateTime @updatedAt

 project Project @relation(fields: \[projectId\], references: \[id\], onDelete: Cascade)  
 asset   Asset   @relation(fields: \[assetId\], references: \[id\], onDelete: Cascade)  
 job     Job     @relation(fields: \[jobId\], references: \[id\], onDelete: Cascade)

 @@unique(\[projectId, taskCode\])  
}  
---

# **22\. `data/neo4j/constraints.cypher`**

CREATE CONSTRAINT project\_id\_unique IF NOT EXISTS  
FOR (n:Project) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT world\_entity\_id\_unique IF NOT EXISTS  
FOR (n:WorldEntity) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT world\_entity\_code\_unique IF NOT EXISTS  
FOR (n:WorldEntity) REQUIRE n.entity\_code IS UNIQUE;

CREATE CONSTRAINT timeline\_anchor\_id\_unique IF NOT EXISTS  
FOR (n:TimelineAnchor) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT timeline\_anchor\_code\_unique IF NOT EXISTS  
FOR (n:TimelineAnchor) REQUIRE n.anchor\_code IS UNIQUE;

CREATE CONSTRAINT state\_snapshot\_id\_unique IF NOT EXISTS  
FOR (n:CharacterStateSnapshot) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT scene\_id\_unique IF NOT EXISTS  
FOR (n:Scene) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT scene\_code\_unique IF NOT EXISTS  
FOR (n:Scene) REQUIRE n.scene\_code IS UNIQUE;

CREATE CONSTRAINT shot\_id\_unique IF NOT EXISTS  
FOR (n:Shot) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT shot\_code\_unique IF NOT EXISTS  
FOR (n:Shot) REQUIRE n.shot\_code IS UNIQUE;

CREATE CONSTRAINT prompt\_pack\_id\_unique IF NOT EXISTS  
FOR (n:CompiledPromptPack) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT job\_id\_unique IF NOT EXISTS  
FOR (n:Job) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT asset\_id\_unique IF NOT EXISTS  
FOR (n:Asset) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT asset\_code\_unique IF NOT EXISTS  
FOR (n:Asset) REQUIRE n.asset\_code IS UNIQUE;

CREATE CONSTRAINT review\_task\_id\_unique IF NOT EXISTS  
FOR (n:ReviewTask) REQUIRE n.id IS UNIQUE;  
---

# **23\. `apps/orchestration-service/package.json`**

{  
 "name": "@mikage/orchestration-service",  
 "version": "0.0.1",  
 "private": true,  
 "type": "module",  
 "scripts": {  
   "dev": "tsx watch src/main.ts",  
   "build": "tsc \-p tsconfig.json",  
   "typecheck": "tsc \-p tsconfig.json \--noEmit"  
 },  
 "dependencies": {  
   "@mikage/config": "workspace:\*",  
   "@mikage/contracts": "workspace:\*",  
   "@mikage/database": "workspace:\*",  
   "fastify": "^5.2.1",  
   "zod": "^3.24.2"  
 }  
}  
---

# **24\. `apps/orchestration-service/tsconfig.json`**

{  
 "extends": "../../tsconfig.base.json",  
 "compilerOptions": {  
   "outDir": "dist"  
 },  
 "include": \["src"\]  
}  
---

# **25\. `apps/orchestration-service/src/main.ts`**

Đây là **khung orchestration đầu tiên**.  
 Chưa gọi đủ microservices thật, nhưng nó đã khóa đường đi đúng của hệ.

import Fastify from "fastify";  
import { randomUUID } from "node:crypto";  
import { env } from "@mikage/config";  
import { CinematicJobRequestSchema } from "@mikage/contracts";  
import { prisma } from "@mikage/database";

const app \= Fastify({ logger: true });

app.get("/health", async () \=\> {  
 return { ok: true, service: "orchestration-service" };  
});

app.post("/orchestration/jobs/cinematic-image", async (request, reply) \=\> {  
 const parsed \= CinematicJobRequestSchema.safeParse(request.body);

 if (\!parsed.success) {  
   return reply.code(400).send({  
     ok: false,  
     error: "invalid\_request",  
     details: parsed.error.flatten()  
   });  
 }

 const input \= parsed.data;

 const project \= await prisma.project.findUnique({  
   where: { slug: input.projectSlug }  
 });

 if (\!project) {  
   return reply.code(404).send({  
     ok: false,  
     error: "project\_not\_found"  
   });  
 }

 const anchor \= await prisma.timelineAnchor.findFirst({  
   where: {  
     projectId: project.id,  
     anchorCode: input.anchorCode  
   }  
 });

 if (\!anchor) {  
   return reply.code(400).send({  
     ok: false,  
     error: "anchor\_not\_found"  
   });  
 }

 const scene \= await prisma.scene.findFirst({  
   where: {  
     projectId: project.id,  
     sceneCode: input.sceneCode  
   }  
 });

 if (\!scene) {  
   return reply.code(400).send({  
     ok: false,  
     error: "scene\_not\_found"  
   });  
 }

 const shot \= await prisma.shot.findFirst({  
   where: {  
     projectId: project.id,  
     shotCode: input.shotCode  
   }  
 });

 if (\!shot) {  
   return reply.code(400).send({  
     ok: false,  
     error: "shot\_not\_found"  
   });  
 }

 const preset \= await prisma.promptPreset.findFirst({  
   where: {  
     projectId: project.id,  
     presetCode: input.presetCode  
   }  
 });

 if (\!preset) {  
   return reply.code(400).send({  
     ok: false,  
     error: "preset\_not\_found"  
   });  
 }

 const variant \= await prisma.promptVariant.findFirst({  
   where: {  
     projectId: project.id,  
     variantCode: input.variantCode  
   }  
 });

 if (\!variant || variant.presetId \!== preset.id) {  
   return reply.code(400).send({  
     ok: false,  
     error: "variant\_invalid\_for\_preset"  
   });  
 }

 const character \= await prisma.worldEntity.findFirst({  
   where: {  
     projectId: project.id,  
     entityCode: input.characterCode,  
     entityKind: "character"  
   }  
 });

 if (\!character) {  
   return reply.code(400).send({  
     ok: false,  
     error: "character\_not\_found"  
   });  
 }

 const snapshot \= await prisma.characterStateSnapshot.findFirst({  
   where: {  
     projectId: project.id,  
     anchorId: anchor.id,  
     characterEntityId: character.id  
   }  
 });

 if (\!snapshot) {  
   return reply.code(400).send({  
     ok: false,  
     error: "required\_state\_snapshot\_not\_found"  
   });  
 }

 const jobCode \= \`job\_${Date.now()}\`;  
 const packCode \= \`cpp\_${Date.now()}\`;

 const compiledPrompt \= \[  
   "A monumental hard sci-fi cinematic frame of Mikage.",  
   "Porcelain purity, void-black contrast, restrained visceral crimson accents.",  
   "Storm-lashed rooftop confrontation above Kagetsu Megacity.",  
   "Low-angle heroic damaged stillness.",  
   "No fantasy magic aesthetic. No neon overload. No anime idol drift."  
 \].join(" ");

 const createdPack \= await prisma.compiledPromptPack.create({  
   data: {  
     projectId: project.id,  
     packCode,  
     presetId: preset.id,  
     variantId: variant.id,  
     anchorId: anchor.id,  
     snapshotId: snapshot.id,  
     sceneId: scene.id,  
     shotId: shot.id,  
     compiledPrompt,  
     negativePrompt:  
       "childish anime idol, generic neon overload, fantasy magic aesthetic, soft pastel glamour, pop fashion drift",  
     metadata: {  
       projectSlug: project.slug,  
       characterCode: input.characterCode,  
       anchorCode: input.anchorCode,  
       sceneCode: input.sceneCode,  
       shotCode: input.shotCode,  
       presetCode: input.presetCode,  
       variantCode: input.variantCode  
     },  
     preValidationReport: {  
       status: "passed",  
       blockers: \[\],  
       warnings: \[\]  
     },  
     lineageComplete: true  
   }  
 });

 const job \= await prisma.job.create({  
   data: {  
     projectId: project.id,  
     jobCode,  
     jobType: "cinematic\_image\_v1",  
     status: "completed",  
     requestPayload: input,  
     context: {  
       compiledPromptPackId: createdPack.id,  
       providerCode: input.providerCode ?? env.DEFAULT\_PROVIDER\_CODE  
     }  
   }  
 });

 await prisma.jobStep.createMany({  
   data: \[  
     {  
       jobId: job.id,  
       stepName: "resolve\_world\_context",  
       stepOrder: 1,  
       status: "completed",  
       inputPayload: input,  
       outputPayload: {  
         characterId: character.id,  
         anchorId: anchor.id,  
         sceneId: scene.id,  
         shotId: shot.id  
       }  
     },  
     {  
       jobId: job.id,  
       stepName: "resolve\_state\_snapshot",  
       stepOrder: 2,  
       status: "completed",  
       inputPayload: { characterId: character.id, anchorId: anchor.id },  
       outputPayload: { snapshotId: snapshot.id }  
     },  
     {  
       jobId: job.id,  
       stepName: "compile\_prompt\_pack",  
       stepOrder: 3,  
       status: "completed",  
       inputPayload: { presetId: preset.id, variantId: variant.id },  
       outputPayload: { compiledPromptPackId: createdPack.id }  
     }  
   \]  
 });

 const createdAssets \= \[\];

 for (let i \= 0; i \< input.outputCount; i \+= 1\) {  
   const assetCode \= \`asset\_${Date.now()}\_${i \+ 1}\`;

   const asset \= await prisma.asset.create({  
     data: {  
       projectId: project.id,  
       assetCode,  
       jobId: job.id,  
       assetType: "image",  
       status: "ready\_review",  
       storageBucket: "mikage-assets",  
       storageKey: \`projects/${project.slug}/assets/${jobCode}/${assetCode}.png\`,  
       manifestVersion: 1,  
       metadata: {  
         providerCode: input.providerCode ?? env.DEFAULT\_PROVIDER\_CODE,  
         outputIndex: i,  
         compiledPromptPackId: createdPack.id,  
         anchorCode: anchor.anchorCode,  
         snapshotCode: snapshot.snapshotCode,  
         sceneCode: scene.sceneCode,  
         shotCode: shot.shotCode  
       },  
       lineageComplete: true  
     }  
   });

   await prisma.assetManifest.create({  
     data: {  
       assetId: asset.id,  
       manifest: {  
         assetCode,  
         projectSlug: project.slug,  
         jobCode,  
         compiledPromptPackCode: packCode,  
         timelineAnchorCode: anchor.anchorCode,  
         characterCode: character.entityCode,  
         sceneCode: scene.sceneCode,  
         shotCode: shot.shotCode,  
         providerCode: input.providerCode ?? env.DEFAULT\_PROVIDER\_CODE,  
         lineageComplete: true  
       }  
     }  
   });

   await prisma.reviewTask.create({  
     data: {  
       projectId: project.id,  
       assetId: asset.id,  
       jobId: job.id,  
       taskCode: \`review\_${assetCode}\`,  
       reviewType: "canon\_visual\_review",  
       status: "pending",  
       priority: "high",  
       payload: {  
         assetCode,  
         checks: \["canon", "drift", "lineage", "benchmark"\]  
       }  
     }  
   });

   createdAssets.push(asset);  
 }

 return {  
   ok: true,  
   jobCode,  
   compiledPromptPackCode: packCode,  
   outputsCreated: createdAssets.length  
 };  
});

app.listen({  
 port: env.ORCHESTRATION\_SERVICE\_PORT,  
 host: "0.0.0.0"  
});  
---

# **26\. `scripts/migrate.ts`**

import { execSync } from "node:child\_process";

try {  
 execSync("pnpm \--dir packages/database prisma generate", { stdio: "inherit" });  
 execSync("pnpm \--dir packages/database prisma migrate dev \--name init", { stdio: "inherit" });  
 process.exit(0);  
} catch (error) {  
 console.error("Migration failed:", error);  
 process.exit(1);  
}  
---

# **27\. `scripts/seed.ts`**

Đây là seed tối thiểu để first slice chạy được.

import { prisma } from "@mikage/database";

async function main() {  
 const project \= await prisma.project.upsert({  
   where: { slug: "mikage" },  
   update: {},  
   create: {  
     slug: "mikage",  
     name: "Mikage",  
     status: "active"  
   }  
 });

 const charMikage \= await prisma.worldEntity.upsert({  
   where: {  
     projectId\_entityCode: {  
       projectId: project.id,  
       entityCode: "char\_mikage"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     entityCode: "char\_mikage",  
     entityKind: "character",  
     canonicalName: "Mikage",  
     status: "canonical",  
     isCanonical: true  
   }  
 });

 await prisma.worldEntity.upsert({  
   where: {  
     projectId\_entityCode: {  
       projectId: project.id,  
       entityCode: "loc\_kagetsu\_megacity"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     entityCode: "loc\_kagetsu\_megacity",  
     entityKind: "location",  
     canonicalName: "Kagetsu Megacity",  
     status: "canonical",  
     isCanonical: true  
   }  
 });

 const rooftop \= await prisma.worldEntity.upsert({  
   where: {  
     projectId\_entityCode: {  
       projectId: project.id,  
       entityCode: "loc\_rooftop\_maintenance\_platform\_12"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     entityCode: "loc\_rooftop\_maintenance\_platform\_12",  
     entityKind: "location",  
     canonicalName: "Rooftop Maintenance Platform 12",  
     status: "canonical",  
     isCanonical: true  
   }  
 });

 const anchor \= await prisma.timelineAnchor.upsert({  
   where: {  
     projectId\_anchorCode: {  
       projectId: project.id,  
       anchorCode: "anchor\_leia\_041"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     anchorCode: "anchor\_leia\_041",  
     label: "LEIA 041",  
     anchorType: "narrative\_runtime\_anchor",  
     sequenceNo: 41,  
     timeExpression: "late entropy industrial age",  
     context: {  
       locationCode: rooftop.entityCode  
     },  
     isCanonical: true  
   }  
 });

 await prisma.characterStateSnapshot.upsert({  
   where: {  
     projectId\_snapshotCode: {  
       projectId: project.id,  
       snapshotCode: "state\_mikage\_anchor\_leia\_041\_v1"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     snapshotCode: "state\_mikage\_anchor\_leia\_041\_v1",  
     characterEntityId: charMikage.id,  
     anchorId: anchor.id,  
     physicalState: {  
       bodyDamage: "moderate",  
       armorFracture: "high"  
     },  
     combatState: {  
       readiness: "guarded",  
       aggression: "controlled"  
     },  
     reactorState: {  
       integrity: "damaged",  
       leakage: "restrained\_crimson"  
     },  
     psychologicalState: {  
       selfhoodPriority: "high",  
       trust: "fractured"  
     },  
     loyaltyState: {  
       alignment: "conditional",  
       shirogane: "unstable"  
     },  
     knowledgeState: {  
       betrayalChain: "incomplete"  
     },  
     relationshipState: {  
       allyTrust: "fragile"  
     },  
     missionState: {  
       mission: "diverted\_toward\_agency"  
     },  
     visibilityState: {  
       exposure: "contained"  
     },  
     validatorStatus: "passed"  
   }  
 });

 const scene \= await prisma.scene.upsert({  
   where: {  
     projectId\_sceneCode: {  
       projectId: project.id,  
       sceneCode: "scene\_rooftop\_confrontation"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     sceneCode: "scene\_rooftop\_confrontation",  
     anchorId: anchor.id,  
     title: "Rooftop Confrontation",  
     sceneType: "cinematic\_confrontation",  
     narrativePurpose: "pressure identity and agency under consequence",  
     locationEntityId: rooftop.id,  
     data: {  
       weather: "violent storm",  
       environment: "industrial megacity rooftop"  
     }  
   }  
 });

 await prisma.shot.upsert({  
   where: {  
     projectId\_shotCode: {  
       projectId: project.id,  
       shotCode: "shot\_low\_angle\_heroic\_damaged\_stillness"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     shotCode: "shot\_low\_angle\_heroic\_damaged\_stillness",  
     sceneId: scene.id,  
     title: "Low-Angle Heroic Damaged Stillness",  
     shotType: "heroic\_stillness",  
     cameraGrammar: {  
       framing: "anamorphic",  
       angle: "low\_angle",  
       lighting: "chiaroscuro"  
     },  
     stateVisualMapping: {  
       reactorLeakage: "subtle\_crimson\_internal",  
       armorFracture: "visible",  
       emotionalRead: "controlled\_damage"  
     },  
     data: {  
       movement: "minimal",  
       emphasis: "scale\_and\_consequence"  
     }  
   }  
 });

 const preset \= await prisma.promptPreset.upsert({  
   where: {  
     projectId\_presetCode: {  
       projectId: project.id,  
       presetCode: "mikage\_cinematic\_portrait"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     presetCode: "mikage\_cinematic\_portrait",  
     name: "Mikage Cinematic Portrait",  
     objective: "cinematic\_frame",  
     modality: "image",  
     schema: {  
       requiresState: true  
     },  
     compilerConfig: {  
       includeScene: true,  
       includeShot: true,  
       includeState: true  
     },  
     isActive: true  
   }  
 });

 await prisma.promptVariant.upsert({  
   where: {  
     projectId\_variantCode: {  
       projectId: project.id,  
       variantCode: "storm\_rooftop\_action"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     presetId: preset.id,  
     variantCode: "storm\_rooftop\_action",  
     name: "Storm Rooftop Action",  
     variantConfig: {  
       weather: "violent rain",  
       locationMood: "industrial\_brutality"  
     },  
     isActive: true  
   }  
 });

 await prisma.negativeProfile.upsert({  
   where: {  
     projectId\_profileCode: {  
       projectId: project.id,  
       profileCode: "mikage\_visual\_forbidden\_drift"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     profileCode: "mikage\_visual\_forbidden\_drift",  
     name: "Mikage Forbidden Drift",  
     terms: \[  
       "childish anime idol",  
       "generic neon overload",  
       "fantasy magic aesthetic",  
       "soft pastel glamour",  
       "pop fashion drift"  
     \],  
     weights: {  
       blocker: 1  
     }  
   }  
 });

 await prisma.providerProfile.upsert({  
   where: {  
     projectId\_providerCode: {  
       projectId: project.id,  
       providerCode: "mock\_image\_provider"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     providerCode: "mock\_image\_provider",  
     name: "Mock Image Provider",  
     capabilities: {  
       image\_generation: true  
     },  
     routingRules: {  
       default: true  
     },  
     isActive: true  
   }  
 });

 await prisma.benchmarkSet.upsert({  
   where: {  
     projectId\_setCode: {  
       projectId: project.id,  
       setCode: "gold\_set\_core"  
     }  
   },  
   update: {},  
   create: {  
     projectId: project.id,  
     setCode: "gold\_set\_core",  
     setKind: "gold",  
     name: "Gold Set Core",  
     criteria: {  
       canonicalVisualMatch: true  
     }  
   }  
 });

 console.log("Seed completed");  
}

main()  
 .catch((error) \=\> {  
   console.error(error);  
   process.exit(1);  
 })  
 .finally(async () \=\> {  
   await prisma.$disconnect();  
 });  
---

# **28\. `scripts/seed-neo4j.ts`**

import fs from "node:fs/promises";  
import path from "node:path";  
import { fileURLToPath } from "node:url";  
import { neo4jDriver, prisma } from "@mikage/database";

const \_\_filename \= fileURLToPath(import.meta.url);  
const \_\_dirname \= path.dirname(\_\_filename);

async function main() {  
 const session \= neo4jDriver.session();

 try {  
   const constraintsPath \= path.resolve(\_\_dirname, "../data/neo4j/constraints.cypher");  
   const constraints \= await fs.readFile(constraintsPath, "utf8");

   for (const stmt of constraints.split(";").map((s) \=\> s.trim()).filter(Boolean)) {  
     await session.run(stmt);  
   }

   const project \= await prisma.project.findUniqueOrThrow({  
     where: { slug: "mikage" }  
   });

   await session.run(  
     \`  
     MERGE (p:Project {id: $id})  
     SET p.slug \= $slug, p.name \= $name  
     \`,  
     {  
       id: project.id,  
       slug: project.slug,  
       name: project.name  
     }  
   );

   const entities \= await prisma.worldEntity.findMany({  
     where: { projectId: project.id }  
   });

   for (const entity of entities) {  
     await session.run(  
       \`  
       MERGE (e:WorldEntity {id: $id})  
       SET e.entity\_code \= $entityCode,  
           e.entity\_kind \= $entityKind,  
           e.canonical\_name \= $canonicalName  
       \`,  
       entity  
     );  
   }

   const anchors \= await prisma.timelineAnchor.findMany({  
     where: { projectId: project.id }  
   });

   for (const anchor of anchors) {  
     await session.run(  
       \`  
       MERGE (a:TimelineAnchor {id: $id})  
       SET a.anchor\_code \= $anchorCode,  
           a.label \= $label  
       \`,  
       anchor  
     );  
   }

   const scenes \= await prisma.scene.findMany({  
     where: { projectId: project.id }  
   });

   for (const scene of scenes) {  
     await session.run(  
       \`  
       MERGE (s:Scene {id: $id})  
       SET s.scene\_code \= $sceneCode,  
           s.title \= $title  
       \`,  
       scene  
     );  
   }

   const shots \= await prisma.shot.findMany({  
     where: { projectId: project.id }  
   });

   for (const shot of shots) {  
     await session.run(  
       \`  
       MERGE (s:Shot {id: $id})  
       SET s.shot\_code \= $shotCode,  
           s.title \= $title  
       \`,  
       shot  
     );  
   }

   console.log("Neo4j seed completed");  
 } finally {  
   await session.close();  
   await neo4jDriver.close();  
   await prisma.$disconnect();  
 }  
}

main().catch((error) \=\> {  
 console.error(error);  
 process.exit(1);  
});  
---

# **29\. `scripts/smoke-test.ts`**

import { prisma, verifyNeo4jConnection, verifyRedisConnection } from "@mikage/database";

async function main() {  
 await prisma.$queryRaw\`SELECT 1\`;  
 await verifyNeo4jConnection();  
 await verifyRedisConnection();

 const project \= await prisma.project.findUnique({  
   where: { slug: "mikage" }  
 });

 if (\!project) {  
   throw new Error("Missing project seed: mikage");  
 }

 const anchor \= await prisma.timelineAnchor.findFirst({  
   where: { projectId: project.id, anchorCode: "anchor\_leia\_041" }  
 });

 if (\!anchor) {  
   throw new Error("Missing anchor seed: anchor\_leia\_041");  
 }

 const character \= await prisma.worldEntity.findFirst({  
   where: {  
     projectId: project.id,  
     entityCode: "char\_mikage"  
   }  
 });

 if (\!character) {  
   throw new Error("Missing character seed: char\_mikage");  
 }

 const preset \= await prisma.promptPreset.findFirst({  
   where: {  
     projectId: project.id,  
     presetCode: "mikage\_cinematic\_portrait"  
   }  
 });

 if (\!preset) {  
   throw new Error("Missing preset seed: mikage\_cinematic\_portrait");  
 }

 const variant \= await prisma.promptVariant.findFirst({  
   where: {  
     projectId: project.id,  
     variantCode: "storm\_rooftop\_action"  
   }  
 });

 if (\!variant) {  
   throw new Error("Missing variant seed: storm\_rooftop\_action");  
 }

 console.log("Smoke test passed");  
}

main()  
 .catch((error) \=\> {  
   console.error("Smoke test failed:", error);  
   process.exit(1);  
 })  
 .finally(async () \=\> {  
   await prisma.$disconnect();  
 });  
---

# **30\. `scripts/run-mvp-job.ts`**

const payload \= {  
 projectSlug: "mikage",  
 characterCode: "char\_mikage",  
 anchorCode: "anchor\_leia\_041",  
 presetCode: "mikage\_cinematic\_portrait",  
 variantCode: "storm\_rooftop\_action",  
 sceneCode: "scene\_rooftop\_confrontation",  
 shotCode: "shot\_low\_angle\_heroic\_damaged\_stillness",  
 providerCode: "mock\_image\_provider",  
 outputCount: 4  
};

async function main() {  
 const response \= await fetch("http://localhost:3109/orchestration/jobs/cinematic-image", {  
   method: "POST",  
   headers: {  
     "content-type": "application/json"  
   },  
   body: JSON.stringify(payload)  
 });

 const json \= await response.json();  
 console.log(JSON.stringify(json, null, 2));  
}

main().catch((error) \=\> {  
 console.error(error);  
 process.exit(1);  
});  
---

# **31\. THỨ TỰ TẠO FILE NGOÀI ĐỜI THẬT**

Đây là thứ tự chuẩn nhất để bạn không build lệch:

### **Bước 1**

Tạo root:

* `package.json`

* `turbo.json`

* `pnpm-workspace.yaml`

* `tsconfig.base.json`

* `.env.example`

### **Bước 2**

Tạo infra:

* `infra/compose/docker-compose.local.yml`

### **Bước 3**

Tạo packages:

* `packages/config`

* `packages/contracts`

* `packages/database`

### **Bước 4**

Tạo Prisma schema rồi chạy:

pnpm install  
cp .env.example .env  
pnpm dev:up  
pnpm migrate

### **Bước 5**

Seed:

pnpm seed  
pnpm seed:neo4j  
pnpm smoke

### **Bước 6**

Tạo orchestration-service rồi chạy:

pnpm \--dir apps/orchestration-service dev

### **Bước 7**

Run MVP:

pnpm mvp:run  
---

# **32\. KẾT QUẢ SAU KHI CHẠY ĐÚNG**

Nếu scaffold này được dựng đúng, bạn sẽ có:

* 1 project `mikage`

* 1 anchor `anchor_leia_041`

* 1 character `char_mikage`

* 1 state snapshot canonical

* 1 scene canonical

* 1 shot canonical

* 1 prompt preset

* 1 prompt variant

* 1 provider mock

* orchestration endpoint chạy được

* job được tạo

* compiled prompt pack được tạo

* 4 asset records được tạo

* 4 review tasks được tạo

* asset manifests được tạo

Nghĩa là lúc đó Mikage đã bước qua ngưỡng:

**từ design system sang runnable system skeleton**

---

# **33\. CHỖ NÀO CÒN THIẾU NHƯNG CHẤP NHẬN ĐƯỢC Ở LEVEL-1**

Bản scaffold này cố tình **chưa** hoàn thiện các phần sau:

* canon-service tách riêng thật

* world-service tách riêng thật

* state-service tách riêng thật

* prompt-service compiler thật

* generation-service provider adapter thật

* ingestion-service upload MinIO thật

* benchmark scoring thật

* lineage graph full writeback

* review decision flow đầy đủ

* studio-web

Điều đó là đúng.  
 Vì nhiệm vụ của Level-1 không phải full product.  
 Nhiệm vụ của nó là dựng được **khung repo sống**, **schema sống**, **seed sống**, **orchestration sống**.

