export interface CanonRegistry {
  canon_version: string;
  registry_version: string;
  created: string;
  last_updated: string;
  status: string;
  authority_chain: {
    levels: AuthorityLevel[];
  };
  canonical_sources: {
    constitutional: Record<string, CanonicalSource>;
    visual_system: Record<string, CanonicalSource>;
    prompt_canon: Record<string, CanonicalSource>;
    visual_authority: Record<string, CanonicalSource>;
    philosophical?: Record<string, CanonicalSource>;
  };
  prompt_canon_location: {
    directory: string;
    files: string[];
    validation_schema?: string;
  };
  visual_authority_location: {
    directory: string;
    main_files: string[];
    subdirectories: string[];
    validation_schema?: string;
  };
  validation_rules: {
    canon_compliance: {
      required_fields: string[];
      authority_chain_validation: boolean;
      source_file_existence: boolean;
      hierarchy_integrity: boolean;
    };
    prompt_canon_validation: {
      mode_consistency: boolean;
      prompt_structure_integrity: boolean;
      negative_prompt_rules: boolean;
      style_module_completeness: boolean;
    };
    visual_authority_validation: {
      domain_completeness: boolean;
      authority_level_consistency: boolean;
      source_file_existence: boolean;
      cross_reference_integrity: boolean;
    };
  };
  runtime_integration: {
    validator_package: string;
    connected_packages: string[];
    validation_endpoints: {
      canon_validation: string;
      prompt_validation: string;
      visual_validation: string;
      generation_validation: string;
    };
  };
  generation_requirements: {
    mandatory_validations: string[];
    validation_sequence: string[];
    failure_handling: {
      canon_violation: string;
      prompt_violation: string;
      visual_violation: string;
      config_violation: string;
    };
  };
  versioning: {
    current_version: string;
    version_history: VersionHistory[];
    compatibility: {
      minimum_validator_version: string;
      supported_runtime_versions: string[];
    };
  };
}

export interface AuthorityLevel {
  level: number;
  name: string;
  authority_type: string;
  override_power: string;
  source_file?: string;
  source_directory?: string;
}

export interface CanonicalSource {
  file: string;
  type: string;
  authority_level: number;
  description: string;
  validation_required: boolean;
}

export interface VersionHistory {
  version: string;
  date: string;
  changes: string[];
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  warnings: ValidationIssue[];
  registryVersion: string;
}

export interface ValidationIssue {
  type: string;
  severity: 'error' | 'warning';
  message: string;
  location: string;
  stage?: string;
}

export interface GenerationRequest {
  prompt: {
    mode: string;
    positive_prompt: string;
    negative_prompt?: string;
    parameters?: {
      sampler: string;
      steps: number;
      cfg: number;
    };
  };
  visual_config?: {
    authority_level: number;
    domain?: string;
    style_rules?: string[];
  };
  validations?: string[];
}

export interface ValidationResponse {
  valid: boolean;
  issues: ValidationIssue[];
  warnings: ValidationIssue[];
  registryVersion: string;
  validationResult: {
    canon_compliance: boolean;
    prompt_canon_compliance: boolean;
    visual_authority_compliance: boolean;
  };
}

export interface CanonValidationConfig {
  registryPath: string;
  strictMode: boolean;
  enableFileExistenceCheck: boolean;
  enableHierarchyValidation: boolean;
}
