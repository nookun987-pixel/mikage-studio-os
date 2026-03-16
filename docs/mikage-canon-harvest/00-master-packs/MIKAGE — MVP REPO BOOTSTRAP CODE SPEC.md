## **0\. Mục tiêu bản này**

Đây là bản bootstrap thực thi đầu tiên để biến toàn bộ Mikage system design thành một repo có thể code ngay, chạy local ngay, seed được dữ liệu nền ngay, và chứng minh được **first runnable MVP slice**:

**canon \+ world \+ state \+ prompt compile \+ generation job \+ ingestion \+ review trace**

Mục tiêu của bootstrap này không phải hoàn thiện toàn bộ studio.  
 Mục tiêu là dựng đúng **xương sống kỹ thuật**, khóa đúng **domain contracts**, và tạo được một đường chạy thật từ input job đến asset record có lineage và review trace.

---

# **1\. BUILD PRINCIPLES**

## **1.1 Quy tắc bootstrap**

* Chỉ dựng những gì phục vụ trực tiếp cho first runnable MVP slice.

* Tất cả schema phải ưu tiên **traceability**, **canon enforcement**, **lineage completeness**, **extensibility**.

* Chưa tối ưu scale production ở tuần đầu, nhưng mọi naming, boundaries, contracts phải đúng hướng production.

* Không build UI nặng trước khi có backend path chạy thật.

* Không build agent swarm trước khi orchestration path cơ bản chạy thật.

* Mọi output của generation đều phải quay ngược được về:

  * project

  * timeline anchor

  * state snapshot

  * scene

  * shot

  * preset

  * variant

  * compiled prompt pack

  * job

  * asset

  * review task

## **1.2 MVP slice phải chứng minh được**

1. load canon policy

2. resolve world context

3. resolve state snapshot

4. resolve scene \+ shot context

5. compile prompt pack

6. pre-validate canon

7. create generation job

8. call mock provider hoặc provider adapter

9. normalize outputs

10. ingest asset records

11. compute embedding placeholder hoặc real vector write

12. benchmark minimal compare

13. create review task

14. persist lineage chain

15. archive manifest minimal

---

# **2\. TECH STACK LOCK CHO BOOTSTRAP**

## **2.1 Monorepo**

* package manager: **pnpm**

* monorepo: **Turborepo**

* types: **TypeScript-first**

* AI/validation plane: **Python FastAPI** khi cần model/validation pipeline riêng

* tuần đầu vẫn có thể để validator/prompt compile ở Node để giảm friction bootstrap, nhưng contract phải mở sẵn cho Python service

## **2.2 Runtime**

* Node.js 22+

* TypeScript 5+

* NestJS cho core services cần structure rõ

* Fastify có thể dùng cho services nhẹ, nhưng để đồng bộ bootstrap nên khóa:

  * **NestJS cho domain services**

  * **Next.js cho studio-web**

  * **FastAPI cho ai-plane sau**

## **2.3 Storage**

* PostgreSQL: transactional truth

* Neo4j: world graph \+ lineage graph queries

* Redis: queue / cache / idempotency

* S3-compatible: MinIO local

* pgvector: embedding records

## **2.4 Queue / workflow**

* MVP tuần đầu: **BullMQ \+ Redis**

* Chưa cần Temporal ở bootstrap đầu

* orchestration-service sẽ điều phối qua BullMQ jobs \+ step persistence vào PostgreSQL

## **2.5 Local dev**

* Docker Compose

* services chạy ngoài host hoặc trong container đều được

* local stack phải có:

  * postgres

  * neo4j

  * redis

  * minio

  * minio-init

  * mailhog optional

  * ollama optional disabled by default

---

# **3\. MONOREPO STRUCTURE — REPO TREE THẬT**

mikage/  
├─ apps/  
│  ├─ studio-web/  
│  │  ├─ app/  
│  │  │  ├─ layout.tsx  
│  │  │  ├─ page.tsx  
│  │  │  ├─ jobs/page.tsx  
│  │  │  ├─ review/page.tsx  
│  │  │  ├─ graph/page.tsx  
│  │  │  └─ state/page.tsx  
│  │  ├─ components/  
│  │  ├─ lib/  
│  │  ├─ package.json  
│  │  ├─ next.config.ts  
│  │  └─ tsconfig.json  
│  │  
│  ├─ api-gateway/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ app.module.ts  
│  │  │  ├─ health/  
│  │  │  └─ proxies/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ canon-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ canon.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ repositories/  
│  │  │  ├─ dto/  
│  │  │  └─ mappers/  
│  │  ├─ test/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ world-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ world.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ repositories/  
│  │  │  ├─ graph/  
│  │  │  └─ dto/  
│  │  ├─ test/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ state-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ state.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ repositories/  
│  │  │  └─ dto/  
│  │  ├─ test/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ prompt-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ prompt.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ compilers/  
│  │  │  ├─ validators/  
│  │  │  └─ dto/  
│  │  ├─ test/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ generation-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ generation.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ providers/  
│  │  │  ├─ workers/  
│  │  │  └─ dto/  
│  │  ├─ test/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ ingestion-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ ingestion.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ processors/  
│  │  │  ├─ repositories/  
│  │  │  └─ dto/  
│  │  ├─ test/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ review-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ review.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ repositories/  
│  │  │  └─ dto/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ benchmark-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ benchmark.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ compare/  
│  │  │  └─ dto/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  ├─ orchestration-service/  
│  │  ├─ src/  
│  │  │  ├─ main.ts  
│  │  │  ├─ orchestration.module.ts  
│  │  │  ├─ controllers/  
│  │  │  ├─ services/  
│  │  │  ├─ workflows/  
│  │  │  ├─ workers/  
│  │  │  └─ dto/  
│  │  ├─ test/  
│  │  ├─ package.json  
│  │  └─ tsconfig.json  
│  │  
│  └─ search-service/  
│     ├─ src/  
│     ├─ package.json  
│     └─ tsconfig.json  
│  
├─ packages/  
│  ├─ config/  
│  │  ├─ src/  
│  │  │  ├─ env.ts  
│  │  │  ├─ services.ts  
│  │  │  ├─ storage.ts  
│  │  │  └─ index.ts  
│  │  └─ package.json  
│  │  
│  ├─ contracts/  
│  │  ├─ src/  
│  │  │  ├─ canon/  
│  │  │  ├─ world/  
│  │  │  ├─ state/  
│  │  │  ├─ prompt/  
│  │  │  ├─ generation/  
│  │  │  ├─ ingestion/  
│  │  │  ├─ review/  
│  │  │  ├─ benchmark/  
│  │  │  ├─ orchestration/  
│  │  │  ├─ events/  
│  │  │  └─ index.ts  
│  │  └─ package.json  
│  │  
│  ├─ database/  
│  │  ├─ prisma/  
│  │  │  ├─ schema.prisma  
│  │  │  └─ migrations/  
│  │  ├─ src/  
│  │  │  ├─ prisma.ts  
│  │  │  ├─ knex.ts  
│  │  │  ├─ neo4j.ts  
│  │  │  ├─ redis.ts  
│  │  │  └─ index.ts  
│  │  └─ package.json  
│  │  
│  ├─ domain/  
│  │  ├─ src/  
│  │  │  ├─ enums/  
│  │  │  ├─ utils/  
│  │  │  ├─ errors/  
│  │  │  ├─ canon/  
│  │  │  ├─ world/  
│  │  │  ├─ state/  
│  │  │  ├─ prompt/  
│  │  │  └─ lineage/  
│  │  └─ package.json  
│  │  
│  ├─ logging/  
│  │  ├─ src/  
│  │  │  ├─ logger.ts  
│  │  │  ├─ tracing.ts  
│  │  │  └─ index.ts  
│  │  └─ package.json  
│  │  
│  ├─ queue/  
│  │  ├─ src/  
│  │  │  ├─ bullmq.ts  
│  │  │  ├─ queues.ts  
│  │  │  └─ index.ts  
│  │  └─ package.json  
│  │  
│  ├─ storage/  
│  │  ├─ src/  
│  │  │  ├─ s3.ts  
│  │  │  ├─ object-paths.ts  
│  │  │  └─ index.ts  
│  │  └─ package.json  
│  │  
│  ├─ testing/  
│  │  ├─ src/  
│  │  │  ├─ fixtures/  
│  │  │  ├─ builders/  
│  │  │  └─ index.ts  
│  │  └─ package.json  
│  │  
│  └─ ui/  
│     ├─ src/  
│     └─ package.json  
│  
├─ data/  
│  ├─ seeds/  
│  │  ├─ 000\_projects.seed.json  
│  │  ├─ 001\_canon\_rules.seed.json  
│  │  ├─ 002\_validator\_rulepacks.seed.json  
│  │  ├─ 003\_world\_entities.seed.json  
│  │  ├─ 004\_world\_entity\_versions.seed.json  
│  │  ├─ 005\_timeline\_anchors.seed.json  
│  │  ├─ 006\_character\_state\_snapshots.seed.json  
│  │  ├─ 007\_story\_projects.seed.json  
│  │  ├─ 008\_scenes.seed.json  
│  │  ├─ 009\_shots.seed.json  
│  │  ├─ 010\_prompt\_presets.seed.json  
│  │  ├─ 011\_prompt\_variants.seed.json  
│  │  ├─ 012\_negative\_profiles.seed.json  
│  │  ├─ 013\_benchmark\_sets.seed.json  
│  │  └─ 014\_provider\_profiles.seed.json  
│  │  
│  ├─ neo4j/  
│  │  ├─ constraints.cypher  
│  │  ├─ indexes.cypher  
│  │  └─ seed.cypher  
│  │  
│  └─ fixtures/  
│     ├─ prompt-packs/  
│     ├─ manifests/  
│     └─ mock-outputs/  
│  
├─ docs/  
│  ├─ architecture/  
│  ├─ api/  
│  ├─ workflows/  
│  ├─ ops/  
│  └─ decisions/  
│  
├─ infra/  
│  ├─ docker/  
│  │  ├─ postgres/  
│  │  ├─ neo4j/  
│  │  ├─ minio/  
│  │  └─ app/  
│  ├─ compose/  
│  │  ├─ docker-compose.local.yml  
│  │  └─ .env.compose  
│  └─ terraform/  
│  
├─ scripts/  
│  ├─ bootstrap.sh  
│  ├─ dev-up.sh  
│  ├─ dev-down.sh  
│  ├─ migrate.ts  
│  ├─ seed.ts  
│  ├─ seed-neo4j.ts  
│  ├─ smoke-test.ts  
│  ├─ create-bucket.ts  
│  └─ run-mvp-job.ts  
│  
├─ tests/  
│  ├─ integration/  
│  ├─ e2e/  
│  └─ smoke/  
│  
├─ .env.example  
├─ .gitignore  
├─ package.json  
├─ pnpm-workspace.yaml  
├─ turbo.json  
├─ tsconfig.base.json  
├─ biome.json  
├─ README.md  
└─ Makefile  
---

# **4\. PACKAGE NAMING LOCK**

## **4.1 Apps**

* `@mikage/studio-web`

* `@mikage/api-gateway`

* `@mikage/canon-service`

* `@mikage/world-service`

* `@mikage/state-service`

* `@mikage/prompt-service`

* `@mikage/generation-service`

* `@mikage/ingestion-service`

* `@mikage/review-service`

* `@mikage/benchmark-service`

* `@mikage/orchestration-service`

* `@mikage/search-service`

## **4.2 Shared packages**

* `@mikage/config`

* `@mikage/contracts`

* `@mikage/database`

* `@mikage/domain`

* `@mikage/logging`

* `@mikage/queue`

* `@mikage/storage`

* `@mikage/testing`

* `@mikage/ui`

---

# **5\. FILE-BY-FILE STARTER MAP**

## **5.1 Root**

### **`package.json`**

Chứa:

* pnpm workspaces commands

* turbo scripts

* lint / typecheck / test / dev / seed / smoke

Scripts tối thiểu:

{  
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
   "mvp:run": "tsx scripts/run-mvp-job.ts"  
 }  
}

### **`pnpm-workspace.yaml`**

Khai báo:

* apps/\*

* packages/\*

### **`turbo.json`**

Pipelines:

* build

* dev

* lint

* typecheck

* test

### **`tsconfig.base.json`**

Base alias:

* `@mikage/contracts/*`

* `@mikage/domain/*`

* `@mikage/database/*`

* `@mikage/config/*`

### **`README.md`**

Chỉ cần 4 phần đầu:

* system purpose

* local bootstrap

* first runnable slice

* command order

---

## **5.2 `packages/contracts/src`**

Đây là lớp khóa contract đầu tiên. Không được viết service trước khi khóa package này.

Cấu trúc:

src/  
├─ canon/  
│  ├─ canon-rule.ts  
│  ├─ validator-rulepack.ts  
│  └─ index.ts  
├─ world/  
│  ├─ world-entity.ts  
│  ├─ character.ts  
│  ├─ faction.ts  
│  ├─ location.ts  
│  ├─ timeline-anchor.ts  
│  ├─ scene.ts  
│  ├─ shot.ts  
│  └─ index.ts  
├─ state/  
│  ├─ character-state-snapshot.ts  
│  ├─ injury-record.ts  
│  ├─ loyalty-state.ts  
│  ├─ knowledge-state.ts  
│  └─ index.ts  
├─ prompt/  
│  ├─ prompt-preset.ts  
│  ├─ prompt-variant.ts  
│  ├─ compiled-prompt-pack.ts  
│  └─ index.ts  
├─ generation/  
│  ├─ generation-job.ts  
│  ├─ generation-output.ts  
│  ├─ provider-profile.ts  
│  └─ index.ts  
├─ ingestion/  
│  ├─ asset.ts  
│  ├─ asset-manifest.ts  
│  ├─ ingestion-report.ts  
│  └─ index.ts  
├─ benchmark/  
│  ├─ benchmark-score.ts  
│  ├─ drift-report.ts  
│  └─ index.ts  
├─ review/  
│  ├─ review-task.ts  
│  ├─ review-decision.ts  
│  └─ index.ts  
├─ orchestration/  
│  ├─ cinematic-job-request.ts  
│  ├─ cinematic-job-result.ts  
│  └─ index.ts  
├─ events/  
│  ├─ job-created.event.ts  
│  ├─ prompt-compiled.event.ts  
│  ├─ asset-ingested.event.ts  
│  └─ index.ts  
└─ index.ts

Tất cả dùng `zod` hoặc `class-validator` \+ plain types.  
 Khuyến nghị bootstrap: **zod** để vừa runtime validate vừa infer TS type.

---

## **5.3 `packages/domain/src/enums`**

Tạo ngay:

* `entity-kind.enum.ts`

* `canon-severity.enum.ts`

* `job-status.enum.ts`

* `job-step-status.enum.ts`

* `review-status.enum.ts`

* `asset-status.enum.ts`

* `benchmark-set-kind.enum.ts`

* `generation-modality.enum.ts`

* `provider-capability.enum.ts`

* `lineage-link-kind.enum.ts`

---

## **5.4 `packages/database/prisma/schema.prisma`**

Bootstrap dùng Prisma cho PostgreSQL transactional layer.  
 Neo4j truy cập bằng driver riêng trong `packages/database/src/neo4j.ts`.

---

## **5.5 `scripts/`**

### **`bootstrap.sh`**

* install deps

* copy .env.example

* docker compose up

* wait db

* migrate

* create bucket

* seed postgres

* seed neo4j

* smoke test

### **`migrate.ts`**

* prisma migrate deploy hoặc dev

* optional pgvector extension check

### **`seed.ts`**

* seed theo thứ tự chuẩn

* idempotent

* log summary

### **`seed-neo4j.ts`**

* apply constraints

* write core graph nodes and relations

### **`run-mvp-job.ts`**

* tạo một generation request chuẩn cho:

  * character Mikage

  * anchor\_leia\_041

  * preset mikage\_cinematic\_portrait

  * variant storm\_rooftop\_action

  * scene rooftop\_confrontation

  * shot low\_angle\_heroic\_damaged\_stillness

---

# **6\. POSTGRESQL — FIRST MIGRATION THẬT**

## **6.1 Extensions đầu tiên**

Migration đầu phải enable:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  
CREATE EXTENSION IF NOT EXISTS vector;

## **6.2 Bảng bắt buộc trong first migration**

### **`projects`**

id UUID PK  
slug TEXT UNIQUE NOT NULL  
name TEXT NOT NULL  
status TEXT NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()

### **`canon_rules`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
rule\_code TEXT NOT NULL  
title TEXT NOT NULL  
layer TEXT NOT NULL  
severity TEXT NOT NULL  
description TEXT NOT NULL  
expression JSONB  
is\_active BOOLEAN NOT NULL DEFAULT true  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, rule\_code)

### **`validator_rulepacks`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
pack\_code TEXT NOT NULL  
name TEXT NOT NULL  
version TEXT NOT NULL  
layers JSONB NOT NULL  
rules JSONB NOT NULL  
severity\_map JSONB NOT NULL  
is\_active BOOLEAN NOT NULL DEFAULT true  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, pack\_code, version)

### **`world_entities`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
entity\_code TEXT NOT NULL  
entity\_kind TEXT NOT NULL  
canonical\_name TEXT NOT NULL  
status TEXT NOT NULL  
is\_canonical BOOLEAN NOT NULL DEFAULT true  
current\_version\_id UUID NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, entity\_code)

### **`world_entity_versions`**

id UUID PK  
entity\_id UUID NOT NULL REFERENCES world\_entities(id)  
version\_no INT NOT NULL  
version\_label TEXT NOT NULL  
data JSONB NOT NULL  
source\_type TEXT NOT NULL  
is\_current BOOLEAN NOT NULL DEFAULT false  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(entity\_id, version\_no)

### **`timeline_anchors`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
anchor\_code TEXT NOT NULL  
era\_entity\_id UUID NULL REFERENCES world\_entities(id)  
label TEXT NOT NULL  
anchor\_type TEXT NOT NULL  
sequence\_no INT NOT NULL  
time\_expression TEXT  
context JSONB NOT NULL DEFAULT '{}'::jsonb  
is\_canonical BOOLEAN NOT NULL DEFAULT true  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, anchor\_code)

### **`character_state_snapshots`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
snapshot\_code TEXT NOT NULL  
character\_entity\_id UUID NOT NULL REFERENCES world\_entities(id)  
anchor\_id UUID NOT NULL REFERENCES timeline\_anchors(id)  
state\_version INT NOT NULL DEFAULT 1  
physical\_state JSONB NOT NULL  
combat\_state JSONB NOT NULL  
reactor\_state JSONB NOT NULL  
psychological\_state JSONB NOT NULL  
loyalty\_state JSONB NOT NULL  
knowledge\_state JSONB NOT NULL  
relationship\_state JSONB NOT NULL  
mission\_state JSONB NOT NULL  
visibility\_state JSONB NOT NULL  
validator\_status TEXT NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, snapshot\_code)

### **`character_state_transitions`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
transition\_code TEXT NOT NULL  
character\_entity\_id UUID NOT NULL REFERENCES world\_entities(id)  
from\_snapshot\_id UUID NOT NULL REFERENCES character\_state\_snapshots(id)  
to\_snapshot\_id UUID NOT NULL REFERENCES character\_state\_snapshots(id)  
cause\_event\_entity\_id UUID NULL REFERENCES world\_entities(id)  
transition\_type TEXT NOT NULL  
reason JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, transition\_code)

### **`story_projects`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
story\_code TEXT NOT NULL  
title TEXT NOT NULL  
status TEXT NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, story\_code)

### **`scenes`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
scene\_code TEXT NOT NULL  
story\_project\_id UUID NULL REFERENCES story\_projects(id)  
anchor\_id UUID NOT NULL REFERENCES timeline\_anchors(id)  
title TEXT NOT NULL  
scene\_type TEXT NOT NULL  
narrative\_purpose TEXT NOT NULL  
state\_requirements JSONB NOT NULL DEFAULT '{}'::jsonb  
location\_entity\_id UUID NULL REFERENCES world\_entities(id)  
data JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, scene\_code)

### **`shots`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
shot\_code TEXT NOT NULL  
scene\_id UUID NOT NULL REFERENCES scenes(id)  
title TEXT NOT NULL  
shot\_type TEXT NOT NULL  
camera\_grammar JSONB NOT NULL  
state\_visual\_mapping JSONB NOT NULL  
data JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, shot\_code)

### **`prompt_presets`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
preset\_code TEXT NOT NULL  
name TEXT NOT NULL  
objective TEXT NOT NULL  
modality TEXT NOT NULL  
schema JSONB NOT NULL  
compiler\_config JSONB NOT NULL  
is\_active BOOLEAN NOT NULL DEFAULT true  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, preset\_code)

### **`prompt_variants`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
variant\_code TEXT NOT NULL  
preset\_id UUID NOT NULL REFERENCES prompt\_presets(id)  
name TEXT NOT NULL  
variant\_config JSONB NOT NULL  
is\_active BOOLEAN NOT NULL DEFAULT true  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, variant\_code)

### **`negative_profiles`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
profile\_code TEXT NOT NULL  
name TEXT NOT NULL  
terms JSONB NOT NULL  
weights JSONB  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, profile\_code)

### **`compiled_prompt_packs`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
pack\_code TEXT NOT NULL  
preset\_id UUID NOT NULL REFERENCES prompt\_presets(id)  
variant\_id UUID NOT NULL REFERENCES prompt\_variants(id)  
anchor\_id UUID NOT NULL REFERENCES timeline\_anchors(id)  
snapshot\_id UUID NULL REFERENCES character\_state\_snapshots(id)  
scene\_id UUID NULL REFERENCES scenes(id)  
shot\_id UUID NULL REFERENCES shots(id)  
compiled\_prompt TEXT NOT NULL  
negative\_prompt TEXT  
metadata JSONB NOT NULL  
pre\_validation\_report JSONB NOT NULL  
lineage\_complete BOOLEAN NOT NULL DEFAULT false  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, pack\_code)

### **`provider_profiles`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
provider\_code TEXT NOT NULL  
name TEXT NOT NULL  
capabilities JSONB NOT NULL  
routing\_rules JSONB NOT NULL  
is\_active BOOLEAN NOT NULL DEFAULT true  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, provider\_code)

### **`jobs`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
job\_code TEXT NOT NULL  
job\_type TEXT NOT NULL  
status TEXT NOT NULL  
request\_payload JSONB NOT NULL  
context JSONB NOT NULL DEFAULT '{}'::jsonb  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, job\_code)

### **`job_steps`**

id UUID PK  
job\_id UUID NOT NULL REFERENCES jobs(id)  
step\_name TEXT NOT NULL  
step\_order INT NOT NULL  
status TEXT NOT NULL  
input\_payload JSONB  
output\_payload JSONB  
started\_at TIMESTAMPTZ  
finished\_at TIMESTAMPTZ  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(job\_id, step\_name)

### **`job_attempts`**

id UUID PK  
job\_id UUID NOT NULL REFERENCES jobs(id)  
attempt\_no INT NOT NULL  
provider\_profile\_id UUID NULL REFERENCES provider\_profiles(id)  
status TEXT NOT NULL  
request\_payload JSONB  
response\_payload JSONB  
error\_payload JSONB  
started\_at TIMESTAMPTZ  
finished\_at TIMESTAMPTZ  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(job\_id, attempt\_no)

### **`generation_requests`**

id UUID PK  
job\_id UUID NOT NULL REFERENCES jobs(id)  
compiled\_prompt\_pack\_id UUID NOT NULL REFERENCES compiled\_prompt\_packs(id)  
provider\_profile\_id UUID NULL REFERENCES provider\_profiles(id)  
modality TEXT NOT NULL  
request\_payload JSONB NOT NULL  
status TEXT NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()

### **`generation_outputs`**

id UUID PK  
generation\_request\_id UUID NOT NULL REFERENCES generation\_requests(id)  
output\_index INT NOT NULL  
provider\_output\_id TEXT  
mime\_type TEXT NOT NULL  
raw\_url TEXT  
normalized\_payload JSONB NOT NULL  
status TEXT NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(generation\_request\_id, output\_index)

### **`assets`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
asset\_code TEXT NOT NULL  
job\_id UUID NOT NULL REFERENCES jobs(id)  
generation\_output\_id UUID NOT NULL REFERENCES generation\_outputs(id)  
asset\_type TEXT NOT NULL  
status TEXT NOT NULL  
storage\_bucket TEXT NOT NULL  
storage\_key TEXT NOT NULL  
manifest\_version INT NOT NULL DEFAULT 1  
metadata JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, asset\_code)

### **`asset_manifests`**

id UUID PK  
asset\_id UUID NOT NULL REFERENCES assets(id)  
manifest JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()

### **`ingestion_reports`**

id UUID PK  
job\_id UUID NOT NULL REFERENCES jobs(id)  
report JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(job\_id)

### **`embedding_records`**

id UUID PK  
asset\_id UUID NOT NULL REFERENCES assets(id)  
embedding\_model TEXT NOT NULL  
embedding vector(1536)  
metadata JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(asset\_id, embedding\_model)

### **`benchmark_sets`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
set\_code TEXT NOT NULL  
set\_kind TEXT NOT NULL  
name TEXT NOT NULL  
criteria JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, set\_code)

### **`benchmark_scores`**

id UUID PK  
asset\_id UUID NOT NULL REFERENCES assets(id)  
benchmark\_set\_id UUID NOT NULL REFERENCES benchmark\_sets(id)  
score NUMERIC(5,2) NOT NULL  
details JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(asset\_id, benchmark\_set\_id)

### **`drift_reports`**

id UUID PK  
asset\_id UUID NOT NULL REFERENCES assets(id)  
risk\_level TEXT NOT NULL  
report JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(asset\_id)

### **`review_tasks`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
asset\_id UUID NOT NULL REFERENCES assets(id)  
job\_id UUID NOT NULL REFERENCES jobs(id)  
task\_code TEXT NOT NULL  
review\_type TEXT NOT NULL  
status TEXT NOT NULL  
priority TEXT NOT NULL  
payload JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, task\_code)

### **`review_decisions`**

id UUID PK  
review\_task\_id UUID NOT NULL REFERENCES review\_tasks(id)  
decision TEXT NOT NULL  
reason JSONB NOT NULL  
reviewer\_id TEXT  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()

### **`archives`**

id UUID PK  
project\_id UUID NOT NULL REFERENCES projects(id)  
archive\_code TEXT NOT NULL  
asset\_id UUID NULL REFERENCES assets(id)  
archive\_kind TEXT NOT NULL  
manifest JSONB NOT NULL  
created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
UNIQUE(project\_id, archive\_code)

## **6.3 Indexes đầu tiên**

CREATE INDEX idx\_world\_entities\_kind ON world\_entities(entity\_kind);  
CREATE INDEX idx\_timeline\_anchors\_project\_seq ON timeline\_anchors(project\_id, sequence\_no);  
CREATE INDEX idx\_state\_snapshots\_character\_anchor ON character\_state\_snapshots(character\_entity\_id, anchor\_id);  
CREATE INDEX idx\_scenes\_anchor ON scenes(anchor\_id);  
CREATE INDEX idx\_shots\_scene ON shots(scene\_id);  
CREATE INDEX idx\_jobs\_status ON jobs(status);  
CREATE INDEX idx\_assets\_job ON assets(job\_id);  
CREATE INDEX idx\_review\_tasks\_status ON review\_tasks(status);  
---

# **7\. NEO4J — CONSTRAINTS VÀ INDEXES ĐẦU TIÊN**

## **7.1 Node labels dùng cho MVP**

* `Project`

* `CanonRule`

* `WorldEntity`

* `TimelineAnchor`

* `CharacterStateSnapshot`

* `Scene`

* `Shot`

* `PromptPreset`

* `PromptVariant`

* `CompiledPromptPack`

* `Job`

* `Asset`

* `ReviewTask`

## **7.2 Quan hệ dùng cho MVP**

* `(:Project)-[:HAS_RULE]->(:CanonRule)`

* `(:Project)-[:HAS_ENTITY]->(:WorldEntity)`

* `(:WorldEntity)-[:VERSIONED_AS]->(:WorldEntityVersion)` optional later

* `(:TimelineAnchor)-[:LOCATED_IN]->(:WorldEntity)`

* `(:CharacterStateSnapshot)-[:STATE_OF]->(:WorldEntity)`

* `(:CharacterStateSnapshot)-[:ANCHORED_AT]->(:TimelineAnchor)`

* `(:Scene)-[:ANCHORED_AT]->(:TimelineAnchor)`

* `(:Scene)-[:LOCATED_IN]->(:WorldEntity)`

* `(:Shot)-[:PART_OF]->(:Scene)`

* `(:CompiledPromptPack)-[:DERIVES_FROM]->(:PromptPreset)`

* `(:CompiledPromptPack)-[:DERIVES_FROM]->(:PromptVariant)`

* `(:CompiledPromptPack)-[:DERIVES_FROM]->(:CharacterStateSnapshot)`

* `(:CompiledPromptPack)-[:DERIVES_FROM]->(:Scene)`

* `(:CompiledPromptPack)-[:DERIVES_FROM]->(:Shot)`

* `(:CompiledPromptPack)-[:ANCHORED_AT]->(:TimelineAnchor)`

* `(:Job)-[:DERIVES_FROM]->(:CompiledPromptPack)`

* `(:Asset)-[:GENERATED_BY]->(:Job)`

* `(:Asset)-[:DERIVES_FROM]->(:CompiledPromptPack)`

* `(:Asset)-[:ANCHORED_AT]->(:TimelineAnchor)`

* `(:Asset)-[:DERIVES_FROM]->(:CharacterStateSnapshot)`

* `(:Asset)-[:DERIVES_FROM]->(:Scene)`

* `(:Asset)-[:DERIVES_FROM]->(:Shot)`

* `(:ReviewTask)-[:REVIEWS]->(:Asset)`

## **7.3 `data/neo4j/constraints.cypher`**

CREATE CONSTRAINT project\_id\_unique IF NOT EXISTS  
FOR (n:Project) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT canon\_rule\_id\_unique IF NOT EXISTS  
FOR (n:CanonRule) REQUIRE n.id IS UNIQUE;

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

CREATE CONSTRAINT prompt\_preset\_id\_unique IF NOT EXISTS  
FOR (n:PromptPreset) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT prompt\_variant\_id\_unique IF NOT EXISTS  
FOR (n:PromptVariant) REQUIRE n.id IS UNIQUE;

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

## **7.4 `data/neo4j/indexes.cypher`**

CREATE INDEX world\_entity\_kind\_idx IF NOT EXISTS  
FOR (n:WorldEntity) ON (n.entity\_kind);

CREATE INDEX scene\_anchor\_idx IF NOT EXISTS  
FOR (n:Scene) ON (n.anchor\_code);

CREATE INDEX asset\_status\_idx IF NOT EXISTS  
FOR (n:Asset) ON (n.status);

CREATE INDEX job\_status\_idx IF NOT EXISTS  
FOR (n:Job) ON (n.status);  
---

# **8\. SHARED CONTRACTS ĐẦU TIÊN PHẢI CÓ**

## **8.1 Canon contracts**

### **`canon-rule.ts`**

import { z } from "zod";

export const CanonRuleSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 ruleCode: z.string(),  
 title: z.string(),  
 layer: z.enum(\["ontology", "absolute\_invariant", "philosophical\_axis", "character\_truth", "visual\_dna"\]),  
 severity: z.enum(\["info", "warn", "error", "blocker"\]),  
 description: z.string(),  
 expression: z.record(z.any()).optional(),  
 isActive: z.boolean().default(true)  
});

export type CanonRule \= z.infer\<typeof CanonRuleSchema\>;

## **8.2 World contracts**

### **`world-entity.ts`**

import { z } from "zod";

export const WorldEntitySchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 entityCode: z.string(),  
 entityKind: z.enum(\[  
   "character",  
   "faction",  
   "location",  
   "era",  
   "event",  
   "technology\_system",  
   "weapon\_system",  
   "relationship",  
   "visual\_dna\_profile",  
   "canon\_rule",  
   "timeline\_anchor"  
 \]),  
 canonicalName: z.string(),  
 status: z.enum(\["draft", "canonical", "deprecated"\]),  
 isCanonical: z.boolean().default(true)  
});

export type WorldEntity \= z.infer\<typeof WorldEntitySchema\>;

### **`timeline-anchor.ts`**

export const TimelineAnchorSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 anchorCode: z.string(),  
 label: z.string(),  
 anchorType: z.string(),  
 sequenceNo: z.number().int(),  
 timeExpression: z.string().optional(),  
 context: z.record(z.any()).default({})  
});

### **`scene.ts`**

export const SceneSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 sceneCode: z.string(),  
 anchorId: z.string().uuid(),  
 title: z.string(),  
 sceneType: z.string(),  
 narrativePurpose: z.string(),  
 locationEntityId: z.string().uuid().optional(),  
 data: z.record(z.any())  
});

### **`shot.ts`**

export const ShotSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 shotCode: z.string(),  
 sceneId: z.string().uuid(),  
 title: z.string(),  
 shotType: z.string(),  
 cameraGrammar: z.record(z.any()),  
 stateVisualMapping: z.record(z.any()),  
 data: z.record(z.any())  
});

## **8.3 State contracts**

### **`character-state-snapshot.ts`**

export const CharacterStateSnapshotSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 snapshotCode: z.string(),  
 characterEntityId: z.string().uuid(),  
 anchorId: z.string().uuid(),  
 physicalState: z.record(z.any()),  
 combatState: z.record(z.any()),  
 reactorState: z.record(z.any()),  
 psychologicalState: z.record(z.any()),  
 loyaltyState: z.record(z.any()),  
 knowledgeState: z.record(z.any()),  
 relationshipState: z.record(z.any()),  
 missionState: z.record(z.any()),  
 visibilityState: z.record(z.any()),  
 validatorStatus: z.enum(\["pending", "passed", "warn", "failed"\])  
});

## **8.4 Prompt contracts**

### **`compiled-prompt-pack.ts`**

export const CompiledPromptPackSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 packCode: z.string(),  
 presetId: z.string().uuid(),  
 variantId: z.string().uuid(),  
 anchorId: z.string().uuid(),  
 snapshotId: z.string().uuid().optional(),  
 sceneId: z.string().uuid().optional(),  
 shotId: z.string().uuid().optional(),  
 compiledPrompt: z.string(),  
 negativePrompt: z.string().optional(),  
 metadata: z.record(z.any()),  
 preValidationReport: z.record(z.any()),  
 lineageComplete: z.boolean()  
});

## **8.5 Generation contracts**

### **`generation-job.ts`**

export const GenerationJobSchema \= z.object({  
 id: z.string().uuid().optional(),  
 projectId: z.string().uuid(),  
 jobCode: z.string(),  
 jobType: z.enum(\["cinematic\_image\_v1"\]),  
 status: z.enum(\["queued", "running", "blocked", "failed", "completed"\]),  
 requestPayload: z.record(z.any()),  
 context: z.record(z.any()).default({})  
});

## **8.6 Orchestration request contract**

### **`cinematic-job-request.ts`**

export const CinematicJobRequestSchema \= z.object({  
 projectSlug: z.string(),  
 characterCode: z.string(),  
 anchorCode: z.string(),  
 presetCode: z.string(),  
 variantCode: z.string(),  
 sceneCode: z.string(),  
 shotCode: z.string(),  
 providerCode: z.string().optional(),  
 outputCount: z.number().int().min(1).max(8).default(4)  
});

Đây là contract quan trọng nhất của first runnable slice.

---

# **9\. SERVICE SKELETONS ĐẦU TIÊN**

## **9.1 canon-service**

### **Vai trò bootstrap**

* đọc canon rules

* đọc validator rulepack

* chạy pre-validation cơ bản cho prompt pack context

* trả report blocker/warn/pass

### **Endpoints tuần đầu**

* `GET /canon/rules`

* `GET /canon/rules/:ruleCode`

* `POST /canon/validate/prompt-pack`

### **Internal services**

* `CanonRulesRepository`

* `ValidatorRulepackRepository`

* `CanonValidationService`

### **File map**

src/  
├─ main.ts  
├─ canon.module.ts  
├─ controllers/  
│  └─ canon.controller.ts  
├─ services/  
│  ├─ canon-rules.service.ts  
│  └─ canon-validation.service.ts  
├─ repositories/  
│  ├─ canon-rules.repository.ts  
│  └─ validator-rulepack.repository.ts  
└─ dto/  
  ├─ validate-prompt-pack.request.ts  
  └─ validate-prompt-pack.response.ts

### **Logic tối thiểu**

`validatePromptPack(context)` phải check:

* anchor tồn tại

* preset tồn tại

* variant thuộc preset

* state bắt buộc thì snapshot phải có

* location/world refs phải canonical

* negative profile có forbidden drift terms

* nếu thiếu lineage bắt buộc \-\> blocker

* nếu visual DNA có drift term rõ \-\> blocker

---

## **9.2 world-service**

### **Vai trò bootstrap**

* source of truth cho world entities, anchors, scenes, shots

* resolve world context cho orchestration

### **Endpoints**

* `GET /world/entities/:entityCode`

* `GET /world/anchors/:anchorCode`

* `GET /world/scenes/:sceneCode`

* `GET /world/shots/:shotCode`

* `POST /world/resolve-context`

### **Internal services**

* `WorldEntityService`

* `TimelineService`

* `SceneService`

* `WorldGraphWriter`

### **`resolve-context` output**

Phải trả:

* project

* character entity

* anchor

* scene

* shot

* location

* era

* resolved world references

---

## **9.3 state-service**

### **Vai trò bootstrap**

* resolve state snapshot theo character \+ anchor

* validate continuity basis tối thiểu

### **Endpoints**

* `GET /state/snapshots/:snapshotCode`

* `POST /state/resolve-snapshot`

* `POST /state/validate-snapshot`

### **Logic resolve**

Input:

* projectId

* characterCode

* anchorCode

Output:

* exact snapshot nếu có

* fail nếu preset yêu cầu state mà không tìm thấy

### **Logic validate tối thiểu**

Check:

* character entity match

* anchor match

* loyalty / psyche / reactor objects có shape chuẩn

* no missing mandatory runtime axes

---

## **9.4 prompt-service**

### **Vai trò bootstrap**

* load preset

* load variant

* merge world context \+ state \+ shot grammar \+ negative profile

* compile final prompt pack

* emit pre-validation payload

### **Endpoints**

* `GET /prompt/presets/:presetCode`

* `GET /prompt/variants/:variantCode`

* `POST /prompt/compile`

### **Nội bộ**

* `PresetRepository`

* `VariantRepository`

* `NegativeProfileRepository`

* `PromptCompilerService`

* `PromptTemplateRenderer`

* `PromptPreValidationAdapter`

### **Compile flow**

1. load preset

2. load variant

3. apply world context

4. apply state-to-visual mapping

5. apply scene grammar

6. apply shot grammar

7. apply negative profile

8. render compiled prompt

9. calculate lineage completeness

10. return `CompiledPromptPack`

---

## **9.5 generation-service**

### **Vai trò bootstrap**

* route provider

* mock generate hoặc real adapter

* normalize output metadata

### **Endpoints**

* `POST /generation/execute`

* `GET /generation/providers`

* `POST /generation/mock-execute`

### **Providers tuần đầu**

* `MockImageProviderAdapter`

* `OpenAIImageProviderAdapter` optional

* `GeminiImageProviderAdapter` optional placeholder

* `LumaProviderAdapter` placeholder only

### **Mock provider**

Tuần đầu nên có provider này chắc chắn:

* nhận compiled prompt

* đọc fixture image local hoặc trả placeholder output

* giả lập 4 outputs

* lưu normalized payload đủ để đi tiếp ingestion

Điểm này cực quan trọng vì nó cho phép chứng minh cả pipeline mà chưa lệ thuộc API ngoài.

---

## **9.6 ingestion-service**

### **Vai trò bootstrap**

* normalize outputs

* upload object storage

* tạo asset records

* tạo manifest

* tạo embedding placeholder

* tạo ingestion report

* sync lineage graph tối thiểu

### **Endpoints**

* `POST /ingestion/ingest-generation-output`

* `POST /ingestion/create-asset-manifest`

### **Logic**

Input:

* job

* compiled prompt pack

* generation outputs

Output:

* `assets[]`

* `ingestionReport`

* `assetManifest`

* `embeddingRecords`

### **Embedding tuần đầu**

Có thể dùng:

* deterministic fake vector cho smoke flow

* hoặc OpenAI embeddings nếu đã có key

Nhưng DB schema vẫn phải là real `vector(1536)`.

---

## **9.7 benchmark-service**

### **Vai trò bootstrap**

* benchmark minimal compare

* score against criteria

* create drift report

### **Endpoints**

* `POST /benchmark/compare-asset`

### **Logic tuần đầu**

Chưa cần CLIP phức tạp.  
 Có thể score bằng:

* metadata match

* prompt similarity placeholder

* negative term absence

* provider compliance

* lineage completeness weight

Trả:

* gold score

* silver score

* red flag risk

* overall risk level

---

## **9.8 review-service**

### **Vai trò bootstrap**

* tạo review task

* approve/reject cơ bản

* chặn promotion khi lineage incomplete hoặc canon blocker

### **Endpoints**

* `POST /review/tasks`

* `GET /review/tasks`

* `POST /review/tasks/:taskCode/decision`

### **Logic**

Auto-create task nếu:

* asset ingested xong

* benchmark done

* drift report done

Auto block approve nếu:

* `lineage_incomplete = true`

* drift blocker

* pre-validation blocker

* missing archive manifest

---

## **9.9 orchestration-service**

### **Vai trò bootstrap**

Đây là service quan trọng nhất tuần đầu.

Nó điều phối workflow:  
 `intake_job -> resolve -> compile -> validate -> generate -> ingest -> benchmark -> review -> archive`

### **Endpoints**

* `POST /orchestration/jobs/cinematic-image`

* `GET /orchestration/jobs/:jobCode`

* `POST /orchestration/jobs/:jobCode/retry`

### **File map**

src/  
├─ main.ts  
├─ orchestration.module.ts  
├─ controllers/  
│  └─ orchestration.controller.ts  
├─ services/  
│  ├─ orchestration.service.ts  
│  ├─ job-tracker.service.ts  
│  └─ lineage-check.service.ts  
├─ workflows/  
│  └─ cinematic-image.workflow.ts  
├─ workers/  
│  └─ cinematic-image.worker.ts  
└─ dto/  
  ├─ create-cinematic-job.request.ts  
  └─ job-status.response.ts

### **Hard block logic trong workflow**

Block ngay nếu:

* không resolve được anchor

* không resolve được scene hoặc shot

* preset yêu cầu state nhưng không có snapshot

* prompt pre-validation trả blocker

* lineage mandatory fields thiếu

* provider profile không có capability image generation

---

# **10\. FIRST RUNNABLE MVP WORKFLOW — ĐƯỜNG CHẠY THẬT**

## **10.1 Job request chuẩn**

{  
 "projectSlug": "mikage",  
 "characterCode": "char\_mikage",  
 "anchorCode": "anchor\_leia\_041",  
 "presetCode": "mikage\_cinematic\_portrait",  
 "variantCode": "storm\_rooftop\_action",  
 "sceneCode": "scene\_rooftop\_confrontation",  
 "shotCode": "shot\_low\_angle\_heroic\_damaged\_stillness",  
 "providerCode": "mock\_image\_provider",  
 "outputCount": 4  
}

## **10.2 Workflow steps**

### **Step 1 — intake\_job**

* persist `jobs`

* status `queued`

* create first `job_step`

### **Step 2 — load\_project\_policy**

* load project

* load active rulepack

* load provider policy

### **Step 3 — resolve\_world\_context**

Call `world-service`:

* character

* anchor

* scene

* shot

* location

* era

* world refs

### **Step 4 — resolve\_state\_snapshot**

Call `state-service`

* find snapshot for Mikage at `anchor_leia_041`

* return blocker if preset requires state and absent

### **Step 5 — compile\_prompt\_pack**

Call `prompt-service`

* preset \+ variant \+ world \+ scene \+ shot \+ state \+ negative profile

* persist `compiled_prompt_packs`

### **Step 6 — run\_pre\_generation\_canon\_validation**

Call `canon-service`

* ontology checks

* visual DNA forbidden terms

* lineage completeness

* world refs canonical

* state required check

If blocker:

* update job status \= `blocked`

* stop workflow

### **Step 7 — route\_provider**

* find provider profile

* ensure capability `image_generation`

### **Step 8 — execute\_generation**

Call `generation-service`

* provider adapter returns 4 normalized outputs

### **Step 9 — normalize\_outputs**

* standardize MIME, provider IDs, metadata

### **Step 10 — ingest\_assets**

Call `ingestion-service`

* upload output objects to MinIO

* create `assets`

* create `asset_manifests`

* create `ingestion_reports`

### **Step 11 — compute\_embeddings**

* write vector record placeholder or real

* persist `embedding_records`

### **Step 12 — compare\_benchmarks**

Call `benchmark-service`

* create `benchmark_scores`

* create `drift_reports`

### **Step 13 — create\_review\_tasks**

Call `review-service`

* create one review task per asset or one batch task

* recommended bootstrap: one task per asset

### **Step 14 — archive\_outputs**

* create archive manifest

* create `archives` record

### **Step 15 — sync\_lineage\_graph**

Write Neo4j:

* asset ← generated\_by ← job

* asset ← derives\_from ← compiled prompt pack

* asset ← anchored\_at ← anchor

* asset ← derives\_from ← state snapshot

* asset ← derives\_from ← scene

* asset ← derives\_from ← shot

### **Step 16 — complete\_job**

* status \= `completed`

* return summary

---

# **11\. LINEAGE CHECKER BẮT BUỘC**

## **11.1 Mandatory chain**

Mọi asset phải có đủ:

* `job_id`

* `compiled_prompt_pack_id`

* `anchor_id`

* `snapshot_id` nếu preset requires state

* `scene_id`

* `shot_id`

## **11.2 Service `lineage-check.service.ts`**

Input:

* compiledPromptPack

* job

* asset candidate

Output:

{  
 lineageComplete: boolean;  
 missingLinks: string\[\];  
 blocker: boolean;  
}

Logic:

* thiếu link nào ghi rõ vào `missingLinks`

* nếu thiếu link mandatory \-\> `blocker = true`

* asset vẫn có thể persist status `needs_review_blocked`, nhưng không được approve release

---

# **12\. DOCKER COMPOSE LOCAL STACK**

## **12.1 `infra/compose/docker-compose.local.yml`**

Services:

* postgres

* neo4j

* redis

* minio

* minio-init

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

# **13\. ENV MAP**

## **13.1 Root `.env.example`**

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

OPENAI\_API\_KEY=  
OPENAI\_IMAGE\_MODEL=  
OPENAI\_EMBEDDING\_MODEL=text-embedding-3-small

DEFAULT\_PROJECT\_SLUG=mikage  
DEFAULT\_PROVIDER\_CODE=mock\_image\_provider  
ENABLE\_REAL\_PROVIDER=false  
ENABLE\_MOCK\_PROVIDER=true

## **13.2 `packages/config/src/env.ts`**

Phải parse env bằng zod.  
 Fail fast nếu thiếu các biến storage/database chính.

---

# **14\. SEED RUNNER ORDER**

Thứ tự này không được đảo nếu muốn bootstrap ổn định.

## **14.1 Postgres seed order**

1. `projects`

2. `canon_rules`

3. `validator_rulepacks`

4. `world_entities`

5. `world_entity_versions`

6. `timeline_anchors`

7. `character_state_snapshots`

8. `story_projects`

9. `scenes`

10. `shots`

11. `prompt_presets`

12. `prompt_variants`

13. `negative_profiles`

14. `benchmark_sets`

15. `provider_profiles`

## **14.2 Neo4j seed order**

1. apply constraints

2. create `Project`

3. create `CanonRule`

4. create `WorldEntity`

5. create `TimelineAnchor`

6. create `CharacterStateSnapshot`

7. create `Scene`

8. create `Shot`

9. create `PromptPreset`

10. create `PromptVariant`

11. create graph relations

## **14.3 Seed data tối thiểu bắt buộc**

Phải có ít nhất:

* project `mikage`

* character `char_mikage`

* factions x3

* locations:

  * `loc_kagetsu_megacity`

  * `loc_district_09`

  * `loc_rooftop_maintenance_platform_12`

  * `loc_undercity_sector`

* era x2

* anchor `anchor_leia_041`

* state snapshot cho Mikage tại `anchor_leia_041`

* scene `scene_rooftop_confrontation`

* shot `shot_low_angle_heroic_damaged_stillness`

* preset `mikage_cinematic_portrait`

* variant `storm_rooftop_action`

* negative profile `mikage_visual_forbidden_drift`

* benchmark sets:

  * `gold_set_core`

  * `silver_set_valid`

  * `red_flag_set_drift`

* provider profile `mock_image_provider`

---

# **15\. FIRST RUNNABLE MVP SLICE — ĐỊNH NGHĨA CHÍNH THỨC**

## **15.1 Scope**

Slice đầu tiên chỉ cần chạy thành công với **1 canonical cinematic image workflow**.

### **Input khóa**

* character \= Mikage

* anchor \= anchor\_leia\_041

* preset \= mikage\_cinematic\_portrait

* variant \= storm\_rooftop\_action

* scene \= rooftop\_confrontation

* shot \= low-angle heroic damaged stillness

### **Output khóa**

* 1 job completed

* 1 compiled prompt pack

* 4 normalized generation outputs

* 4 assets persisted

* 4 embedding records

* 4 benchmark score groups

* 4 drift reports

* 4 review tasks

* 4 archive manifests

* lineage graph written for all assets

## **15.2 Acceptance assertions**

Phải pass các assertion:

1. prompt compile thành công

2. pre-validation pass

3. generation ra 4 outputs

4. ingestion tạo asset records

5. embedding records tồn tại

6. benchmark compare tạo score

7. review queue sinh task

8. asset trace ngược được về:

   * preset

   * variant

   * scene

   * shot

   * state snapshot

   * timeline anchor

9. nếu pre-validation blocker thì job bị block

10. asset có `lineage_incomplete = true` thì review không approve

11. archive manifest tồn tại cho asset approved hoặc ready\_review

---

# **16\. FIRST CODING ORDER — BUILD ORDER THỰC CHIẾN**

## **Day 1**

### **1\. monorepo init**

* root package

* turbo

* pnpm workspace

* tsconfig base

* biome/eslint/prettier nếu muốn, nhưng nên tối giản

### **2\. local infra**

* docker compose

* postgres

* neo4j

* redis

* minio

### **3\. shared packages**

* `@mikage/contracts`

* `@mikage/domain`

* `@mikage/config`

* `@mikage/database`

## **Day 2**

### **4\. postgres schema \+ migration đầu tiên**

### **5\. neo4j constraints \+ driver**

### **6\. seed runner**

## **Day 3**

### **7\. canon-service skeleton**

### **8\. world-service skeleton**

### **9\. state-service skeleton**

## **Day 4**

### **10\. prompt-service skeleton**

### **11\. generation-service skeleton với mock provider**

## **Day 5**

### **12\. ingestion-service skeleton**

### **13\. benchmark-service minimal**

### **14\. review-service minimal**

## **Day 6**

### **15\. orchestration-service workflow**

### **16\. smoke test end-to-end**

## **Day 7**

### **17\. studio-web minimal**

* dashboard

* jobs page

* review queue page

* asset trace page

---

# **17\. STUDIO-WEB MINIMAL SPEC**

Tuần đầu không build full control interface.  
 Chỉ cần UI để chứng minh pipeline.

## **Pages bắt buộc**

### **`/`**

Dashboard:

* service health

* latest jobs

* latest review tasks

* asset counts

### **`/jobs`**

* list jobs

* trigger canonical MVP job

* view job steps

### **`/review`**

* list review tasks

* open review payload

* approve/reject

### **`/graph`**

* view lineage chain text mode

* chưa cần graph canvas phức tạp

### **`/state`**

* xem state snapshot của Mikage tại anchor\_leia\_041

## **Components tối thiểu**

* `HealthBadge`

* `JobStatusCard`

* `ReviewTaskTable`

* `AssetLineagePanel`

* `StateSnapshotPanel`

---

# **18\. API CONTRACT PATHS CHỐT CHO MVP**

## **canon-service**

* `GET /canon/rules`

* `POST /canon/validate/prompt-pack`

## **world-service**

* `GET /world/entities/:entityCode`

* `GET /world/anchors/:anchorCode`

* `GET /world/scenes/:sceneCode`

* `GET /world/shots/:shotCode`

* `POST /world/resolve-context`

## **state-service**

* `POST /state/resolve-snapshot`

* `POST /state/validate-snapshot`

## **prompt-service**

* `POST /prompt/compile`

## **generation-service**

* `POST /generation/execute`

## **ingestion-service**

* `POST /ingestion/ingest-generation-output`

## **benchmark-service**

* `POST /benchmark/compare-asset`

## **review-service**

* `POST /review/tasks`

* `POST /review/tasks/:taskCode/decision`

## **orchestration-service**

* `POST /orchestration/jobs/cinematic-image`

* `GET /orchestration/jobs/:jobCode`

---

# **19\. DATA FLOW OBJECTS CẦN KHÓA NGAY**

## **19.1 `ResolvedWorldContext`**

type ResolvedWorldContext \= {  
 projectId: string;  
 character: { id: string; code: string; name: string };  
 anchor: { id: string; code: string; label: string };  
 era?: { id: string; code: string; name: string };  
 location?: { id: string; code: string; name: string };  
 scene: { id: string; code: string; title: string; data: Record\<string, unknown\> };  
 shot: { id: string; code: string; title: string; cameraGrammar: Record\<string, unknown\> };  
 worldRefs: Array\<{ id: string; code: string; kind: string; name: string }\>;  
};

## **19.2 `ResolvedStateContext`**

type ResolvedStateContext \= {  
 snapshotId: string;  
 snapshotCode: string;  
 characterEntityId: string;  
 anchorId: string;  
 reactorState: Record\<string, unknown\>;  
 psychologicalState: Record\<string, unknown\>;  
 loyaltyState: Record\<string, unknown\>;  
 knowledgeState: Record\<string, unknown\>;  
 missionState: Record\<string, unknown\>;  
};

## **19.3 `CompiledPromptPackResult`**

type CompiledPromptPackResult \= {  
 packId: string;  
 compiledPrompt: string;  
 negativePrompt?: string;  
 metadata: Record\<string, unknown\>;  
 preValidationPayload: Record\<string, unknown\>;  
 lineageComplete: boolean;  
 missingLineageLinks: string\[\];  
};  
---

# **20\. MOCK PROVIDER STRATEGY**

Để không bị chặn bởi external APIs ở bootstrap đầu, provider mock là bắt buộc.

## **20.1 Hành vi**

* nhận request generate 4 outputs

* trả 4 payload normalized

* mỗi output map tới 1 ảnh fixture local hoặc 1 placeholder PNG

* metadata chứa:

  * provider code

  * prompt hash

  * output index

  * seed

  * requested resolution

  * generated\_at

## **20.2 Lợi ích**

* mở đường end-to-end test thật

* không tốn credit

* cho phép debug ingestion, review, archive, lineage trước

* tách vấn đề **system validity** khỏi **provider quality**

---

# **21\. SMOKE TEST SPEC**

## **21.1 `scripts/smoke-test.ts`**

Phải test:

1. DB connection OK

2. Neo4j connection OK

3. Redis connection OK

4. MinIO buckets tồn tại

5. seeds tồn tại:

   * project mikage

   * anchor\_leia\_041

   * char\_mikage

   * preset mikage\_cinematic\_portrait

   * variant storm\_rooftop\_action

6. orchestration job run OK

7. tạo đúng 4 assets

8. tạo review tasks

9. lineage complete true cho assets

Nếu bất kỳ bước nào fail \-\> exit non-zero.

---

# **22\. ARCHIVE MANIFEST MINIMAL SHAPE**

Mỗi asset sau ingestion phải có manifest JSON tối thiểu:

{  
 "asset\_code": "asset\_xxx",  
 "project\_slug": "mikage",  
 "job\_code": "job\_xxx",  
 "compiled\_prompt\_pack\_code": "cpp\_xxx",  
 "timeline\_anchor\_code": "anchor\_leia\_041",  
 "character\_code": "char\_mikage",  
 "scene\_code": "scene\_rooftop\_confrontation",  
 "shot\_code": "shot\_low\_angle\_heroic\_damaged\_stillness",  
 "provider\_code": "mock\_image\_provider",  
 "storage": {  
   "bucket": "mikage-assets",  
   "key": "projects/mikage/assets/..."  
 },  
 "benchmark": {  
   "gold\_score": 0,  
   "silver\_score": 0,  
   "red\_flag\_risk": "low"  
 },  
 "review": {  
   "task\_code": "review\_xxx",  
   "status": "pending"  
 },  
 "lineage\_complete": true,  
 "created\_at": "..."  
}  
---

# **23\. GOVERNANCE RULES CẦN CODE NGAY Ở BOOTSTRAP**

## **23.1 Hard block**

* anchor không tồn tại

* scene không tồn tại

* shot không tồn tại

* preset không tồn tại

* variant không thuộc preset

* snapshot bắt buộc nhưng không tồn tại

* lineage mandatory links thiếu

* provider không support image generation

* world reference không canonical

* prompt chứa forbidden drift term blocker

## **23.2 Soft warn**

* benchmark gold thấp

* silver vừa phải

* drift risk trung bình

* state snapshot validator ở mức warn

* provider output metadata thiếu non-critical fields

## **23.3 Approve gate**

Chỉ approve nếu:

* no blocker

* lineage complete

* benchmark red flag \!= high

* review decision \= approve

* archive manifest exists

---

# **24\. FIRST WEEK BUILD CHECKLIST**

## **Hạ tầng**

* pnpm workspace chạy

* turbo chạy

* docker compose local stack chạy

* postgres connect được

* neo4j connect được

* redis connect được

* minio buckets tạo được

## **Shared foundation**

* contracts package khóa xong

* domain enums khóa xong

* config package parse env OK

* database package có prisma \+ neo4j \+ redis \+ s3 clients

## **Data layer**

* first migration chạy thành công

* pgvector enabled

* neo4j constraints applied

* seed runner idempotent

* Mikage seed data load OK

## **Services**

* canon-service chạy

* world-service chạy

* state-service chạy

* prompt-service chạy

* generation-service chạy với mock provider

* ingestion-service chạy

* benchmark-service chạy

* review-service chạy

* orchestration-service chạy

## **Workflow**

* orchestration tạo job được

* resolve world context được

* resolve state snapshot được

* compile prompt pack được

* pre-validation pass được

* mock generate ra 4 outputs

* ingestion persist assets

* embedding records được tạo

* benchmark scores được tạo

* review tasks được tạo

* archive manifests được tạo

* neo4j lineage links được ghi

## **UI**

* studio-web load dashboard được

* jobs page trigger được MVP run

* review page thấy tasks

* graph page hiển thị lineage text trace

* state page đọc được snapshot Mikage

## **Quality**

* smoke test pass

* one end-to-end MVP run pass

* lineage incomplete path bị block đúng

* blocker canon violation bị block đúng

---

# **25\. FIRST RUNNABLE MVP SLICE — ĐỊNH NGHĨA XONG LÀ CHẠY**

Đây là lệnh chuẩn của tuần đầu:

## **Local bootstrap order**

pnpm install  
cp .env.example .env  
docker compose \-f infra/compose/docker-compose.local.yml up \-d  
pnpm migrate  
pnpm seed  
pnpm seed:neo4j  
pnpm smoke  
pnpm mvp:run

## **Kết quả đúng phải là**

* Job `cinematic_image_v1` hoàn tất

* 4 asset records được tạo

* 4 asset manifests tồn tại

* 4 review tasks được tạo

* trace lineage ngược hoàn chỉnh

* dashboard thấy lần run mới nhất

---

# **26\. CHỐT BUILD PRIORITY SAU BOOTSTRAP**

Sau khi bản bootstrap này chạy được, thứ tự mở rộng đúng là:

1. thay mock provider bằng real provider adapter

2. nâng benchmark từ metadata heuristic sang embedding similarity / vision compare

3. thêm archive browser và asset detail viewer

4. thêm narrative-service

5. thêm deeper canon validator

6. thêm policy-service \+ governance console

7. thêm release promotion workflow

Nhưng trong giai đoạn hiện tại, **không được mở rộng trước khi first runnable MVP slice pass hoàn chỉnh**.

---

# **27\. KẾT LUẬN TRIỂN KHAI**

Bản này đã khóa đủ các thành phần để bắt đầu code repo ngay:

* repo tree thật

* package naming thật

* file-by-file starter map

* postgres first migration

* neo4j constraints

* shared contracts đầu tiên

* service skeletons đầu tiên

* docker compose local stack

* env map

* seed runner order

* first runnable MVP slice

* first week build checklist

Điểm quan trọng nhất của toàn bộ bootstrap là:

**đừng bắt đầu từ UI, đừng bắt đầu từ agent swarm, đừng bắt đầu từ design thêm.**  
 Hãy bắt đầu từ:

**contracts → migration → seed → core resolve services → prompt compile → orchestration → ingestion → review trace**

Đó là đường ngắn nhất để Mikage chứng minh nó là **system thật** chứ không phải prompt stack.

