import type { CanonRegistry, ValidationResult, GenerationRequest } from './types.js';
export declare class CanonRegistryValidator {
    private registryPath;
    private registry;
    constructor(configsPath?: string);
    loadRegistry(): Promise<void>;
    validateRegistry(): Promise<ValidationResult>;
    private validateBasicStructure;
    private validateAuthorityChain;
    private validateCanonicalSources;
    private validateFileExistence;
    private validateHierarchyIntegrity;
    validateGenerationRequest(request: GenerationRequest): Promise<ValidationResult>;
    private validatePromptCanon;
    private validateVisualAuthority;
    getRegistry(): CanonRegistry | null;
    getAuthorityChain(): any[];
    getCanonicalSources(): any;
}
//# sourceMappingURL=canon-registry-validator.d.ts.map