import type { BenchmarkAuditResult, PersistenceResult, ProductionPackageResult } from '@mikage/contracts';
export declare const isValidationRejected: (decision: "accepted" | "rejected") => decision is "rejected";
export declare const isPackagingRejected: (productionPackage: ProductionPackageResult) => boolean;
export declare const isBenchmarkRejected: (benchmarkAudit: BenchmarkAuditResult) => boolean;
export declare const isPersistenceRejected: (persistenceResult: PersistenceResult) => boolean;
//# sourceMappingURL=guards.d.ts.map