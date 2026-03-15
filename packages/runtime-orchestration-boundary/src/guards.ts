import type {
  BenchmarkAuditResult,
  PersistenceResult,
  ProductionPackageResult
} from '@mikage/contracts';

export const isValidationRejected = (decision: 'accepted' | 'rejected') =>
  decision !== 'accepted';

export const isPackagingRejected = (productionPackage: ProductionPackageResult) =>
  !productionPackage.decision.accepted;

export const isBenchmarkRejected = (benchmarkAudit: BenchmarkAuditResult) =>
  benchmarkAudit.decision.decision === 'rejected';

export const isPersistenceRejected = (persistenceResult: PersistenceResult) =>
  !persistenceResult.decision.persisted;
