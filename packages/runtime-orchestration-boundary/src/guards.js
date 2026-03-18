export const isValidationRejected = (decision) => decision !== 'accepted';
export const isPackagingRejected = (productionPackage) => !productionPackage.decision.accepted;
export const isBenchmarkRejected = (benchmarkAudit) => benchmarkAudit.decision.decision === 'rejected';
export const isPersistenceRejected = (persistenceResult) => !persistenceResult.decision.persisted;
//# sourceMappingURL=guards.js.map