export { validateCanon } from './validator.js';
export { CanonRegistryValidator } from './canon-registry-validator.js';
export type { CanonRegistry, ValidationResult, ValidationIssue, GenerationRequest, CanonValidationConfig } from './types.js';

// Export CanonGuard for unified orchestration
export { CanonGuard, canonGuard, validateAll, validatePrompt, validateGenerationTask, validateVisualTokens, validateStyleProfile } from './canon-guard.js';
