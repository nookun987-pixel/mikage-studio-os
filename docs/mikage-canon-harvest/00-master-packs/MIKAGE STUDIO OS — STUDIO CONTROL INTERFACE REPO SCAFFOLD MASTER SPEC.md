Production-grade scaffold for:

* frontend architecture

* API gateway contracts

* state management model

* component tree

* runtime action endpoints

---

# **1\. REPO PURPOSE**

Repo này là **human control surface** của Mikage Studio OS.

Nó không phải app trưng bày UI đơn thuần.  
 Nó là **operations console** để:

* điều phối request

* quan sát pipeline

* inspect từng node

* kiểm canon

* review benchmark

* approve asset

* điều khiển state \+ memory \+ lineage

* ghi audit

---

# **2\. TARGET STACK**

## **Frontend**

* Next.js App Router

* TypeScript

* Tailwind

* shadcn/ui

* Zustand hoặc Redux Toolkit

* React Query / TanStack Query

* React Flow cho lineage / pipeline graph

* Zod cho schema validation

## **Backend Gateway**

* Next.js Route Handlers hoặc NestJS gateway layer

* TypeScript

* Zod schema contracts

* event-safe action handlers

* RBAC middleware

* audit middleware

## **Data / Runtime Integration**

* Prisma client

* Postgres

* Redis queue state cache

* runtime orchestration service client

* benchmark service client

* canon service client

* memory service client

---

# **3\. MONOREPO SHAPE**

Khuyến nghị dùng turborepo.

mikage-studio-os/  
├─ apps/  
│  ├─ studio-control-web/  
│  └─ studio-control-gateway/  
├─ packages/  
│  ├─ ui/  
│  ├─ contracts/  
│  ├─ state/  
│  ├─ runtime-client/  
│  ├─ auth/  
│  ├─ audit/  
│  ├─ config/  
│  ├─ utils/  
│  └─ types/  
├─ prisma/  
│  ├─ schema.prisma  
│  └─ seeds/  
├─ docs/  
│  └─ studio-control-interface/  
├─ scripts/  
├─ turbo.json  
├─ package.json  
└─ pnpm-workspace.yaml  
---

# **4\. APP RESPONSIBILITY SPLIT**

## **`apps/studio-control-web`**

Frontend operator console.

Responsibilities:

* render dashboard

* manage UI state

* fetch query data

* submit operator actions

* show logs / alerts / panels / graphs

## **`apps/studio-control-gateway`**

Control gateway.

Responsibilities:

* validate request contracts

* authorize action

* map UI action → runtime command

* call downstream services

* emit audit logs

* normalize response

---

# **5\. FRONTEND ARCHITECTURE**

## **5.1 App Router structure**

apps/studio-control-web/  
├─ app/  
│  ├─ layout.tsx  
│  ├─ page.tsx  
│  ├─ dashboard/  
│  │  └─ page.tsx  
│  ├─ requests/  
│  │  ├─ page.tsx  
│  │  └─ \[requestId\]/  
│  │     └─ page.tsx  
│  ├─ pipeline/  
│  │  ├─ page.tsx  
│  │  └─ \[requestId\]/  
│  │     └─ page.tsx  
│  ├─ nodes/  
│  │  └─ \[nodeExecutionId\]/  
│  │     └─ page.tsx  
│  ├─ canon/  
│  │  ├─ page.tsx  
│  │  └─ violations/  
│  │     └─ \[violationId\]/  
│  │        └─ page.tsx  
│  ├─ benchmark/  
│  │  ├─ page.tsx  
│  │  └─ \[assetId\]/  
│  │     └─ page.tsx  
│  ├─ memory/  
│  │  ├─ page.tsx  
│  │  └─ \[recordId\]/  
│  │     └─ page.tsx  
│  ├─ lineage/  
│  │  ├─ page.tsx  
│  │  └─ \[lineageId\]/  
│  │     └─ page.tsx  
│  ├─ characters/  
│  │  ├─ page.tsx  
│  │  └─ \[characterId\]/  
│  │     └─ page.tsx  
│  ├─ world/  
│  │  ├─ page.tsx  
│  │  ├─ ontology/  
│  │  │  └─ page.tsx  
│  │  ├─ factions/  
│  │  │  └─ page.tsx  
│  │  ├─ locations/  
│  │  │  └─ page.tsx  
│  │  └─ technologies/  
│  │     └─ page.tsx  
│  ├─ assets/  
│  │  ├─ page.tsx  
│  │  └─ \[assetId\]/  
│  │     └─ page.tsx  
│  ├─ audit/  
│  │  └─ page.tsx  
│  ├─ governance/  
│  │  └─ page.tsx  
│  └─ unauthorized/  
│     └─ page.tsx  
├─ components/  
├─ features/  
├─ lib/  
├─ hooks/  
├─ providers/  
└─ styles/  
---

## **5.2 Feature-first internal organization**

components/  
├─ layout/  
├─ dashboard/  
├─ requests/  
├─ pipeline/  
├─ nodes/  
├─ canon/  
├─ benchmark/  
├─ memory/  
├─ lineage/  
├─ characters/  
├─ world/  
├─ assets/  
├─ audit/  
└─ shared/

features/  
├─ dashboard/  
├─ requests/  
├─ pipeline/  
├─ node-inspector/  
├─ canon-control/  
├─ benchmark-review/  
├─ memory-browser/  
├─ lineage-viewer/  
├─ character-state/  
├─ world-admin/  
├─ asset-approval/  
├─ audit-log/  
└─ governance/

Rule:

* `app/` \= route shell

* `features/` \= business module

* `components/` \= reusable UI

* `lib/` \= API \+ helpers \+ schemas

* `hooks/` \= shared hooks

---

# **6\. FRONTEND PAGE SYSTEM**

## **Primary pages**

/dashboard  
/requests  
/requests/\[requestId\]  
/pipeline  
/pipeline/\[requestId\]  
/nodes/\[nodeExecutionId\]  
/canon  
/canon/violations/\[violationId\]  
/benchmark  
/benchmark/\[assetId\]  
/memory  
/memory/\[recordId\]  
/lineage  
/lineage/\[lineageId\]  
/characters  
/characters/\[characterId\]  
/world  
/assets  
/assets/\[assetId\]  
/audit  
/governance  
---

# **7\. COMPONENT TREE**

## **7.1 Global shell**

AppShell  
├─ SidebarNav  
├─ TopStatusBar  
├─ AlertStreamTray  
├─ CommandBar  
├─ UserMenu  
└─ PageContent  
---

## **7.2 Dashboard tree**

DashboardPage  
├─ DashboardHeader  
├─ SystemStatusStrip  
├─ QueueOverviewCard  
├─ PipelineHealthCard  
├─ CanonIntegrityCard  
├─ BenchmarkMetricsCard  
├─ AssetProductionCard  
├─ ActiveIncidentsPanel  
├─ RecentActionsPanel  
└─ LiveEventFeed  
---

## **7.3 Requests tree**

RequestsPage  
├─ RequestFiltersBar  
├─ RequestQueueTable  
├─ RequestBulkActions  
└─ RequestDetailDrawer  
  ├─ RequestSummary  
  ├─ RequestContextPacketView  
  ├─ RequestLineageSummary  
  ├─ PipelineProgressMiniMap  
  └─ ActionBar  
---

## **7.4 Pipeline tree**

PipelinePage  
├─ PipelineFiltersBar  
├─ PipelineExecutionList  
└─ PipelineGraphPanel

PipelineDetailPage  
├─ PipelineHeader  
├─ DirectedExecutionGraph  
├─ ExecutionTimeline  
├─ DependencyStatusPanel  
├─ NodeExecutionTable  
└─ RuntimeActionsBar  
---

## **7.5 Node inspector tree**

NodeInspectorPage  
├─ NodeExecutionHeader  
├─ NodeStateBadge  
├─ InputPacketPanel  
├─ OutputPacketPanel  
├─ ValidationReportPanel  
├─ RuntimeLogPanel  
├─ RetryHistoryPanel  
└─ NodeActionBar  
---

## **7.6 Canon control tree**

CanonPage  
├─ CanonHealthHeader  
├─ ViolationFiltersBar  
├─ ViolationTable  
├─ ViolationSeverityBreakdown  
└─ SystemicDriftPanel

ViolationDetailPage  
├─ ViolationSummary  
├─ AffectedEntityPanel  
├─ ConflictDiffViewer  
├─ CanonRuleReferencePanel  
├─ SuggestedResolutionPanel  
└─ CanonActionBar  
---

## **7.7 Benchmark review tree**

BenchmarkPage  
├─ BenchmarkFiltersBar  
├─ BenchmarkReviewTable  
└─ DriftHeatmapPanel

BenchmarkDetailPage  
├─ AssetPreviewPanel  
├─ BenchmarkScorePanel  
├─ GoldSetComparisonPanel  
├─ SilverSetComparisonPanel  
├─ RedSetAlertPanel  
├─ DriftNarrativePanel  
└─ BenchmarkActionBar  
---

## **7.8 Memory browser tree**

MemoryPage  
├─ MemorySearchBar  
├─ MemoryFacetFilters  
├─ MemoryResultTable  
└─ MemoryRecordPreview

MemoryRecordPage  
├─ MemoryRecordHeader  
├─ MemoryMetadataPanel  
├─ MemoryContentPanel  
├─ EntityLinkPanel  
├─ RelatedLineagePanel  
└─ RecordDiffPanel  
---

## **7.9 Lineage viewer tree**

LineagePage  
├─ LineageSearchBar  
├─ LineageGraphCanvas  
├─ LineageMetadataPanel  
├─ BranchDivergencePanel  
└─ OriginTracePanel  
---

## **7.10 Character state tree**

CharactersPage  
├─ CharacterListPanel  
├─ CharacterSummaryPanel  
└─ CharacterStateSnapshotGrid

CharacterDetailPage  
├─ CharacterHeader  
├─ CurrentStatePanel  
├─ InjuryModelPanel  
├─ LoyaltyModelPanel  
├─ KnowledgeStatePanel  
├─ TimelineSyncPanel  
├─ ProposedTransitionPanel  
└─ CharacterActionBar  
---

## **7.11 World admin tree**

WorldPage  
├─ RegistryOverviewCards  
├─ WorldEntityTable  
├─ CanonVersionPanel  
└─ WorldAdminActions

OntologyAdminPage  
├─ OntologyRuleTable  
├─ InvariantReferencePanel  
├─ ChangeImpactPanel  
└─ OntologyActionBar  
---

## **7.12 Asset approval tree**

AssetsPage  
├─ AssetFilterBar  
├─ AssetReviewQueue  
└─ AssetStatusBoard

AssetDetailPage  
├─ AssetHeader  
├─ AssetPreview  
├─ PromptLineagePanel  
├─ CanonValidationPanel  
├─ BenchmarkSummaryPanel  
├─ ApprovalChecklistPanel  
└─ AssetApprovalActionBar  
---

## **7.13 Audit tree**

AuditPage  
├─ AuditFilterBar  
├─ AuditLogTable  
├─ AuditDetailDrawer  
└─ ExportAuditPanel  
---

## **7.14 Governance tree**

GovernancePage  
├─ RoleMatrixPanel  
├─ PermissionRulesPanel  
├─ SafeguardSettingsPanel  
├─ OverridePolicyPanel  
└─ GovernanceAuditPanel  
---

# **8\. STATE MANAGEMENT MODEL**

Dùng mô hình 3 lớp:

## **8.1 Server state**

Dùng TanStack Query cho:

* fetch dashboard metrics

* fetch request list

* fetch node details

* fetch benchmark reports

* fetch memory records

* fetch lineage graph

* fetch audit logs

Không giữ trong global store những data server thay đổi liên tục.

---

## **8.2 UI state**

Dùng Zustand cho:

* sidebar collapsed

* selected filters

* open drawers / modals

* selected request / asset / node

* current graph focus

* live stream toggles

* table column preferences

---

## **8.3 Action state**

Dùng dedicated mutation state cho:

* submit request action

* cancel request

* rerun node

* approve asset

* reject asset

* override benchmark

* propose state update

* write canon change

Mọi action mutation phải có:

type ActionExecutionState \=  
 | "idle"  
 | "submitting"  
 | "success"  
 | "error"  
 | "blocked";  
---

# **9\. STATE PACKAGE STRUCTURE**

packages/state/  
├─ src/  
│  ├─ stores/  
│  │  ├─ app-shell.store.ts  
│  │  ├─ request-ui.store.ts  
│  │  ├─ pipeline-ui.store.ts  
│  │  ├─ canon-ui.store.ts  
│  │  ├─ benchmark-ui.store.ts  
│  │  ├─ memory-ui.store.ts  
│  │  ├─ lineage-ui.store.ts  
│  │  ├─ character-ui.store.ts  
│  │  └─ asset-ui.store.ts  
│  ├─ query/  
│  │  ├─ dashboard.queries.ts  
│  │  ├─ request.queries.ts  
│  │  ├─ pipeline.queries.ts  
│  │  ├─ node.queries.ts  
│  │  ├─ canon.queries.ts  
│  │  ├─ benchmark.queries.ts  
│  │  ├─ memory.queries.ts  
│  │  ├─ lineage.queries.ts  
│  │  ├─ character.queries.ts  
│  │  ├─ asset.queries.ts  
│  │  └─ audit.queries.ts  
│  ├─ mutations/  
│  │  ├─ request.mutations.ts  
│  │  ├─ pipeline.mutations.ts  
│  │  ├─ canon.mutations.ts  
│  │  ├─ benchmark.mutations.ts  
│  │  ├─ character.mutations.ts  
│  │  ├─ world.mutations.ts  
│  │  └─ asset.mutations.ts  
│  └─ index.ts  
---

# **10\. CORE UI STATE SHAPES**

## **App shell**

type AppShellState \= {  
 sidebarCollapsed: boolean;  
 commandBarOpen: boolean;  
 alertTrayOpen: boolean;  
 theme: "dark" | "light" | "system";  
};

## **Request UI state**

type RequestUIState \= {  
 selectedRequestId?: string;  
 requestFilters: {  
   status?: string\[\];  
   priority?: string\[\];  
   requestType?: string\[\];  
 };  
 detailDrawerOpen: boolean;  
};

## **Pipeline UI state**

type PipelineUIState \= {  
 selectedExecutionId?: string;  
 selectedNodeId?: string;  
 graphLayout: "vertical" | "horizontal";  
 showBlockedNodes: boolean;  
 timelineMode: "compact" | "full";  
};

## **Benchmark UI state**

type BenchmarkUIState \= {  
 selectedAssetId?: string;  
 scoreThresholdsVisible: boolean;  
 comparisonMode: "gold" | "silver" | "red" | "all";  
};  
---

# **11\. API GATEWAY ARCHITECTURE**

Gateway là lớp anti-chaos giữa UI và runtime.

## **Responsibilities**

* normalize request contracts

* validate payload

* attach actor context

* check permissions

* enforce safeguard preconditions

* call downstream runtime services

* return typed result

* emit audit events

---

## **Gateway folder structure**

apps/studio-control-gateway/  
├─ src/  
│  ├─ main.ts  
│  ├─ app.module.ts  
│  ├─ modules/  
│  │  ├─ dashboard/  
│  │  ├─ requests/  
│  │  ├─ pipeline/  
│  │  ├─ nodes/  
│  │  ├─ canon/  
│  │  ├─ benchmark/  
│  │  ├─ memory/  
│  │  ├─ lineage/  
│  │  ├─ characters/  
│  │  ├─ world/  
│  │  ├─ assets/  
│  │  ├─ audit/  
│  │  └─ governance/  
│  ├─ middleware/  
│  │  ├─ auth.middleware.ts  
│  │  ├─ audit.middleware.ts  
│  │  ├─ request-context.middleware.ts  
│  │  └─ safeguard.middleware.ts  
│  ├─ guards/  
│  │  ├─ role.guard.ts  
│  │  └─ permission.guard.ts  
│  ├─ clients/  
│  │  ├─ orchestration.client.ts  
│  │  ├─ canon.client.ts  
│  │  ├─ benchmark.client.ts  
│  │  ├─ memory.client.ts  
│  │  ├─ lineage.client.ts  
│  │  └─ state.client.ts  
│  ├─ schemas/  
│  └─ utils/  
---

# **12\. CONTRACT PACKAGE**

packages/contracts/  
├─ src/  
│  ├─ dashboard/  
│  ├─ requests/  
│  ├─ pipeline/  
│  ├─ nodes/  
│  ├─ canon/  
│  ├─ benchmark/  
│  ├─ memory/  
│  ├─ lineage/  
│  ├─ characters/  
│  ├─ world/  
│  ├─ assets/  
│  ├─ audit/  
│  ├─ governance/  
│  ├─ common/  
│  └─ index.ts

Mọi request/response DTO phải được export từ package này.

---

# **13\. COMMON CONTRACT FOUNDATION**

## **Actor context**

export const ActorContextSchema \= z.object({  
 operatorId: z.string(),  
 role: z.enum(\[  
   "observer",  
   "operator",  
   "senior\_operator",  
   "canon\_admin",  
   "system\_admin",  
 \]),  
 sessionId: z.string(),  
});

## **Audit context**

export const AuditContextSchema \= z.object({  
 reason: z.string().min(3),  
 sourcePage: z.string(),  
 sourceAction: z.string(),  
});

## **Action result**

export const ActionResultSchema \= z.object({  
 success: z.boolean(),  
 status: z.enum(\[  
   "accepted",  
   "rejected",  
   "blocked",  
   "failed",  
 \]),  
 message: z.string(),  
 auditLogId: z.string().optional(),  
 affectedEntityId: z.string().optional(),  
});  
---

# **14\. API GATEWAY CONTRACT GROUPS**

## **14.1 Dashboard endpoints**

GET /api/dashboard/summary  
GET /api/dashboard/alerts  
GET /api/dashboard/live-feed

### **Response summary**

type DashboardSummaryResponse \= {  
 systemStatus: "RUNNING" | "DEGRADED" | "HALTED";  
 queueDepth: number;  
 activeRequests: number;  
 canonViolations24h: number;  
 benchmarkFailRate24h: number;  
 assetsPendingApproval: number;  
};  
---

## **14.2 Request endpoints**

GET    /api/requests  
GET    /api/requests/:requestId  
POST   /api/requests  
POST   /api/requests/:requestId/cancel  
POST   /api/requests/:requestId/pause  
POST   /api/requests/:requestId/reprioritize  
POST   /api/requests/:requestId/reroute

### **Create request contract**

type CreateRequestInput \= {  
 actor: ActorContext;  
 audit: AuditContext;  
 payload: {  
   requestType: string;  
   priority: "low" | "normal" | "high" | "critical";  
   contextPacketId: string;  
   targetMode: string;  
   notes?: string;  
 };  
};

Guard:

* reject nếu thiếu `contextPacketId`

* reject nếu runtime queue locked

---

## **14.3 Pipeline endpoints**

GET  /api/pipeline  
GET  /api/pipeline/:requestId  
POST /api/pipeline/:requestId/retry-blocked  
POST /api/pipeline/:requestId/halt  
POST /api/pipeline/:requestId/resume

### **Pipeline response**

type PipelineExecutionResponse \= {  
 requestId: string;  
 state: "PENDING" | "RUNNING" | "FAILED" | "PASSED" | "BLOCKED";  
 nodes: Array\<{  
   nodeExecutionId: string;  
   nodeType: string;  
   state: string;  
   retryCount: number;  
   executionTimeMs?: number;  
   dependencyState: "valid" | "invalid" | "missing";  
 }\>;  
};  
---

## **14.4 Node endpoints**

GET  /api/nodes/:nodeExecutionId  
POST /api/nodes/:nodeExecutionId/rerun  
POST /api/nodes/:nodeExecutionId/force-retry  
POST /api/nodes/:nodeExecutionId/annotate  
POST /api/nodes/:nodeExecutionId/resolve

### **Rerun contract**

type RerunNodeInput \= {  
 actor: ActorContext;  
 audit: AuditContext;  
 payload: {  
   nodeExecutionId: string;  
   strategy: "safe-rerun" | "force-retry";  
 };  
};

Guard:

* cannot rerun locked node

* cannot rerun nếu dependency invalid

---

## **14.5 Canon endpoints**

GET  /api/canon/violations  
GET  /api/canon/violations/:violationId  
POST /api/canon/violations/:violationId/accept-correction  
POST /api/canon/violations/:violationId/reject-asset  
POST /api/canon/violations/:violationId/send-revision  
POST /api/canon/violations/:violationId/flag-systemic

### **Violation response**

type CanonViolationResponse \= {  
 violationId: string;  
 severity: "low" | "medium" | "high" | "critical";  
 violationType:  
   | "ontology\_violation"  
   | "character\_truth\_violation"  
   | "tech\_realism\_violation"  
   | "visual\_grammar\_drift"  
   | "lore\_contradiction";  
 entityId: string;  
 sourceRequestId: string;  
 resolutionState: "open" | "resolved" | "escalated";  
};  
---

## **14.6 Benchmark endpoints**

GET  /api/benchmark/reviews  
GET  /api/benchmark/assets/:assetId  
POST /api/benchmark/assets/:assetId/approve  
POST /api/benchmark/assets/:assetId/reject  
POST /api/benchmark/assets/:assetId/retest  
POST /api/benchmark/assets/:assetId/override

### **Override contract**

type BenchmarkOverrideInput \= {  
 actor: ActorContext;  
 audit: AuditContext;  
 payload: {  
   assetId: string;  
   overrideReason: string;  
   expectedRiskLevel: "contained" | "elevated" | "high";  
 };  
};

Guard:

* only `senior_operator` or above

* must include overrideReason

* must write audit record

---

## **14.7 Memory endpoints**

GET /api/memory/search  
GET /api/memory/records/:recordId  
GET /api/memory/records/:recordId/diff  
GET /api/memory/records/:recordId/lineage

Write endpoints nên khóa hoặc giới hạn mạnh:

POST /api/memory/writeback/manual

Guard:

* only approved asset lineage

* only allowed role

* must pass integrity validation

---

## **14.8 Lineage endpoints**

GET /api/lineage  
GET /api/lineage/:lineageId  
GET /api/lineage/:lineageId/graph  
GET /api/lineage/:lineageId/divergence

### **Lineage graph response**

type LineageGraphResponse \= {  
 lineageId: string;  
 nodes: Array\<{  
   id: string;  
   type: "request" | "narrative" | "scene" | "production\_package" | "asset" | "benchmark\_record";  
   label: string;  
 }\>;  
 edges: Array\<{  
   id: string;  
   source: string;  
   target: string;  
   relation:  
     | "generated\_from"  
     | "validated\_by"  
     | "benchmarked\_by"  
     | "approved\_by";  
 }\>;  
};  
---

## **14.9 Character endpoints**

GET  /api/characters  
GET  /api/characters/:characterId  
POST /api/characters/:characterId/propose-state-update  
POST /api/characters/:characterId/approve-state-update  
POST /api/characters/:characterId/reject-state-update  
POST /api/characters/:characterId/rollback-state

### **State update input**

type ProposeCharacterStateUpdateInput \= {  
 actor: ActorContext;  
 audit: AuditContext;  
 payload: {  
   characterId: string;  
   proposedState: Record\<string, unknown\>;  
   narrativeJustification: string;  
   sourceNarrativeId: string;  
 };  
};

Guard:

* reject nếu thiếu narrative justification

* reject nếu timeline sync fail

* reject nếu tracker validation fail

---

## **14.10 World admin endpoints**

GET  /api/world/registry  
GET  /api/world/ontology  
POST /api/world/records/create  
POST /api/world/records/update  
POST /api/world/records/lock  
POST /api/world/records/archive  
POST /api/world/ontology/update

Guard:

* `canon_admin` or `system_admin`

* must create version snapshot

* must run impact analysis

---

## **14.11 Asset endpoints**

GET  /api/assets  
GET  /api/assets/:assetId  
POST /api/assets/:assetId/approve  
POST /api/assets/:assetId/reject  
POST /api/assets/:assetId/send-revision  
POST /api/assets/:assetId/archive

### **Asset approve input**

type ApproveAssetInput \= {  
 actor: ActorContext;  
 audit: AuditContext;  
 payload: {  
   assetId: string;  
   approvalNotes?: string;  
 };  
};

Approval cascade:

* publish asset

* write memory record

* update lineage graph

* emit audit log

Only if:

* canon validation passed

* benchmark passed or authorized override

* lineage complete

---

## **14.12 Audit endpoints**

GET /api/audit/logs  
GET /api/audit/logs/:auditLogId  
GET /api/audit/export  
---

## **14.13 Governance endpoints**

GET  /api/governance/roles  
GET  /api/governance/permissions  
POST /api/governance/override-policy  
POST /api/governance/safeguards/update

Guard:

* system admin only

---

# **15\. UI-TO-RUNTIME ACTION ENDPOINTS**

Đây là phần trọng yếu.

## **Mapping table**

### **Submit request**

UI action: submit\_request  
Endpoint: POST /api/requests  
Runtime calls:  
\- orchestration.createRequestPacket  
\- orchestration.enqueue  
\- lineage.createRoot  
\- audit.log

### **Cancel request**

UI action: cancel\_request  
Endpoint: POST /api/requests/:requestId/cancel  
Runtime calls:  
\- orchestration.cancelExecution  
\- queue.releaseLocks  
\- audit.log

### **Rerun node**

UI action: rerun\_node  
Endpoint: POST /api/nodes/:nodeExecutionId/rerun  
Runtime calls:  
\- orchestration.validateDependencies  
\- orchestration.rerunNode  
\- lineage.appendExecutionEdge  
\- audit.log

### **Approve asset**

UI action: approve\_asset  
Endpoint: POST /api/assets/:assetId/approve  
Runtime calls:  
\- benchmark.verifyFinalState  
\- asset.publish  
\- memory.writeback  
\- lineage.markApproved  
\- audit.log

### **Override benchmark**

UI action: override\_benchmark  
Endpoint: POST /api/benchmark/assets/:assetId/override  
Runtime calls:  
\- governance.checkOverrideAuthority  
\- benchmark.recordOverride  
\- risk.record  
\- audit.log

### **Approve character state update**

UI action: approve\_character\_state  
Endpoint: POST /api/characters/:characterId/approve-state-update  
Runtime calls:  
\- state.validateTransition  
\- timeline.sync  
\- character.writeState  
\- memory.writeback  
\- audit.log

### **Update canon record**

UI action: update\_canon\_record  
Endpoint: POST /api/world/records/update  
Runtime calls:  
\- canon.runImpactAnalysis  
\- canon.snapshotVersion  
\- canon.applyMutation  
\- audit.log  
---

# **16\. RUNTIME CLIENT PACKAGE**

packages/runtime-client/  
├─ src/  
│  ├─ orchestration.client.ts  
│  ├─ canon.client.ts  
│  ├─ benchmark.client.ts  
│  ├─ memory.client.ts  
│  ├─ lineage.client.ts  
│  ├─ character-state.client.ts  
│  ├─ asset.client.ts  
│  └─ index.ts

Example interface:

export interface OrchestrationClient {  
 enqueueRequest(input: unknown): Promise\<{ requestId: string }\>;  
 getPipelineExecution(requestId: string): Promise\<unknown\>;  
 rerunNode(nodeExecutionId: string): Promise\<unknown\>;  
 haltPipeline(requestId: string): Promise\<unknown\>;  
 resumePipeline(requestId: string): Promise\<unknown\>;  
}  
---

# **17\. PERMISSION MODEL**

## **Roles**

type Role \=  
 | "observer"  
 | "operator"  
 | "senior\_operator"  
 | "canon\_admin"  
 | "system\_admin";

## **Permission matrix**

### **Observer**

* read dashboard

* read requests

* read pipeline

* read logs

No write actions.

### **Operator**

* submit request

* cancel own request

* inspect node

* send revision

* reject low-risk asset

### **Senior Operator**

* approve asset

* override benchmark

* resolve canon issue

* approve character state

### **Canon Admin**

* mutate canon

* update ontology

* lock world record

* archive canon entity

### **System Admin**

* halt pipeline

* update safeguard policy

* manage governance rules

* full audit access

---

# **18\. SAFEGUARD MIDDLEWARE MODEL**

Mọi write action phải đi qua safeguard chain:

authenticate  
→ authorize  
→ validate\_contract  
→ validate\_preconditions  
→ validate\_safeguards  
→ execute\_action  
→ emit\_audit  
→ return\_result

## **Safeguard examples**

### **Asset approval blocked if**

* canon validation failed

* benchmark incomplete

* lineage graph incomplete

### **Character state blocked if**

* no narrative source

* invalid transition

* timeline conflict

### **Canon mutation blocked if**

* no impact analysis

* snapshot missing

* insufficient role

### **Node rerun blocked if**

* node locked

* dependency missing

* pipeline halted globally

---

# **19\. ERROR MODEL**

## **Unified error response**

type GatewayErrorResponse \= {  
 success: false;  
 error: {  
   code:  
     | "UNAUTHORIZED"  
     | "FORBIDDEN"  
     | "INVALID\_CONTRACT"  
     | "PRECONDITION\_FAILED"  
     | "SAFEGUARD\_BLOCKED"  
     | "RUNTIME\_FAILURE"  
     | "NOT\_FOUND"  
     | "CONFLICT";  
   message: string;  
   details?: Record\<string, unknown\>;  
   suggestedAction?: string;  
 };  
};

## **Example codes**

* `SAFEGUARD_BLOCKED_CANON_FAIL`

* `SAFEGUARD_BLOCKED_BENCHMARK_INCOMPLETE`

* `SAFEGUARD_BLOCKED_TIMELINE_CONFLICT`

* `RUNTIME_NODE_LOCKED`

* `RUNTIME_QUEUE_HALTED`

---

# **20\. QUERY KEY MODEL**

Chuẩn hóa query keys:

export const queryKeys \= {  
 dashboard: \["dashboard"\],  
 dashboardAlerts: \["dashboard", "alerts"\],  
 requests: (filters?: unknown) \=\> \["requests", filters\],  
 requestDetail: (id: string) \=\> \["requests", id\],  
 pipelineDetail: (requestId: string) \=\> \["pipeline", requestId\],  
 nodeDetail: (nodeExecutionId: string) \=\> \["nodes", nodeExecutionId\],  
 canonViolations: (filters?: unknown) \=\> \["canon", "violations", filters\],  
 benchmarkAsset: (assetId: string) \=\> \["benchmark", assetId\],  
 memoryRecord: (recordId: string) \=\> \["memory", recordId\],  
 lineageGraph: (lineageId: string) \=\> \["lineage", lineageId, "graph"\],  
 characterDetail: (characterId: string) \=\> \["characters", characterId\],  
 assetDetail: (assetId: string) \=\> \["assets", assetId\],  
 auditLogs: (filters?: unknown) \=\> \["audit", filters\],  
};  
---

# **21\. UI MODULE FILE SHAPE**

Ví dụ cho một feature:

features/asset-approval/  
├─ api/  
│  ├─ get-asset-detail.ts  
│  ├─ approve-asset.ts  
│  ├─ reject-asset.ts  
│  └─ send-revision.ts  
├─ components/  
│  ├─ asset-preview.tsx  
│  ├─ approval-checklist.tsx  
│  ├─ benchmark-summary.tsx  
│  └─ asset-approval-action-bar.tsx  
├─ hooks/  
│  ├─ use-asset-detail.ts  
│  ├─ use-approve-asset.ts  
│  └─ use-asset-review-permissions.ts  
├─ schemas/  
│  └─ asset-approval.schema.ts  
├─ types/  
│  └─ asset-approval.types.ts  
└─ index.ts

Mỗi feature phải tự đủ:

* api calls

* hooks

* components

* schemas

* types

---

# **22\. SHARED UI PACKAGE**

packages/ui/  
├─ src/  
│  ├─ components/  
│  │  ├─ app-shell/  
│  │  ├─ data-table/  
│  │  ├─ status-badge/  
│  │  ├─ metric-card/  
│  │  ├─ action-bar/  
│  │  ├─ audit-chip/  
│  │  ├─ graph-panel/  
│  │  ├─ log-viewer/  
│  │  ├─ diff-viewer/  
│  │  └─ entity-link/  
│  ├─ layout/  
│  └─ index.ts

Shared primitives bắt buộc:

* StatusBadge

* EntityHeader

* ActionButton

* PermissionGuard

* EmptyState

* ErrorState

* LoadingState

* GraphCanvas

* DiffPanel

* JSONInspector

* RuntimeLogViewer

---

# **23\. ROUTE-LEVEL ACCESS CONTROL**

Frontend cũng phải chặn từ lớp UI.

Example:

const routeAccess \= {  
 "/dashboard": \["observer", "operator", "senior\_operator", "canon\_admin", "system\_admin"\],  
 "/requests": \["operator", "senior\_operator", "canon\_admin", "system\_admin"\],  
 "/canon": \["senior\_operator", "canon\_admin", "system\_admin"\],  
 "/world": \["canon\_admin", "system\_admin"\],  
 "/governance": \["system\_admin"\],  
};

UI hide action nếu role không hợp lệ, nhưng backend vẫn là gate cuối.

---

# **24\. MINIMUM ENV CONTRACT**

## **Web app env**

NEXT\_PUBLIC\_GATEWAY\_BASE\_URL=  
NEXT\_PUBLIC\_APP\_ENV=  
NEXT\_PUBLIC\_ENABLE\_LIVE\_EVENTS=

## **Gateway env**

PORT=  
DATABASE\_URL=  
REDIS\_URL=  
JWT\_SECRET=  
ORCHESTRATION\_SERVICE\_URL=  
CANON\_SERVICE\_URL=  
BENCHMARK\_SERVICE\_URL=  
MEMORY\_SERVICE\_URL=  
LINEAGE\_SERVICE\_URL=  
STATE\_SERVICE\_URL=  
AUDIT\_STREAM\_TOPIC=  
---

# **25\. MINIMUM PRISMA ENTITIES FOR CONTROL LAYER**

Control interface cần ít nhất các bảng:

Operator  
Role  
Permission  
OperatorSession  
AuditLog  
UIPreference  
ManualOverrideRecord  
IncidentRecord  
ReviewDecision

Các entity runtime đã có từ layer trước thì chỉ reference.

---

# **26\. EXAMPLE ROOT FILES TO CREATE FIRST**

## **Root**

package.json  
turbo.json  
pnpm-workspace.yaml  
tsconfig.base.json  
.env.example

## **Web app**

apps/studio-control-web/app/layout.tsx  
apps/studio-control-web/app/page.tsx  
apps/studio-control-web/app/dashboard/page.tsx  
apps/studio-control-web/components/layout/app-shell.tsx  
apps/studio-control-web/providers/query-provider.tsx

## **Gateway**

apps/studio-control-gateway/src/main.ts  
apps/studio-control-gateway/src/app.module.ts  
apps/studio-control-gateway/src/modules/requests/requests.controller.ts  
apps/studio-control-gateway/src/modules/assets/assets.controller.ts  
apps/studio-control-gateway/src/middleware/safeguard.middleware.ts

## **Packages**

packages/contracts/src/common/action-result.ts  
packages/contracts/src/requests/create-request.contract.ts  
packages/state/src/stores/request-ui.store.ts  
packages/runtime-client/src/orchestration.client.ts  
packages/ui/src/components/status-badge/status-badge.tsx  
---

# **27\. BUILD ORDER**

Thứ tự dựng đúng để repo không loạn:

## **Phase 1**

* root monorepo

* contracts package

* ui package

* state package foundation

## **Phase 2**

* gateway app skeleton

* auth \+ role guard \+ safeguard middleware

* dashboard \+ requests \+ pipeline read endpoints

## **Phase 3**

* web app shell

* sidebar \+ top status bar \+ dashboard page

* request queue \+ request detail

* pipeline monitor

## **Phase 4**

* node inspector

* canon panel

* benchmark review

* asset approval cockpit

## **Phase 5**

* character state

* world admin

* memory browser

* lineage graph

* audit page

* governance page

---

# **28\. NON-NEGOTIABLE IMPLEMENTATION RULES**

1. **No direct frontend call to runtime services.**  
    Chỉ đi qua gateway.

2. **All mutations require actor \+ audit context.**

3. **All write actions emit immutable audit log.**

4. **All contracts shared from `packages/contracts`.**

5. **No asset approval without canon \+ benchmark gate.**

6. **No character state mutation without narrative justification.**

7. **No canon mutation without snapshot \+ impact analysis.**

8. **All error states typed and renderable in UI.**

---

# **29\. FINAL MASTER REPO SHAPE**

mikage-studio-os/  
├─ apps/  
│  ├─ studio-control-web/  
│  └─ studio-control-gateway/  
├─ packages/  
│  ├─ ui/  
│  ├─ contracts/  
│  ├─ state/  
│  ├─ runtime-client/  
│  ├─ auth/  
│  ├─ audit/  
│  ├─ config/  
│  ├─ utils/  
│  └─ types/  
├─ prisma/  
├─ docs/  
└─ scripts/  
---

# **30\. EXECUTION RESULT**

Sau scaffold này, Studio Control Interface sẽ có đủ bộ khung để triển khai:

* frontend ops console

* typed gateway

* action-safe control surface

* RBAC \+ safeguard enforcement

* shared contract system

* runtime integration path

* production-grade page and component map

**Đây là scaffold chuẩn để chuyển từ spec sang code implementation.**

