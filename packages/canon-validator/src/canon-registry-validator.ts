import fs from 'fs/promises';
import path from 'path';
import type { CanonRegistry, ValidationResult, ValidationIssue, GenerationRequest, CanonicalSource } from './types.js';

export class CanonRegistryValidator {
  private registryPath: string;
  private registry: CanonRegistry | null = null;

  constructor(configsPath: string = 'configs') {
    this.registryPath = path.join(process.cwd(), configsPath, 'canon-registry.json');
  }

  async loadRegistry(): Promise<void> {
    try {
      const registryData = await fs.readFile(this.registryPath, 'utf-8');
      this.registry = JSON.parse(registryData);
    } catch (error) {
      throw new Error(`Failed to load canon registry: ${error}`);
    }
  }

  async validateRegistry(): Promise<ValidationResult> {
    if (!this.registry) {
      await this.loadRegistry();
    }

    const issues: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];

    // Validate basic structure
    await this.validateBasicStructure(issues, warnings);
    
    // Validate authority chain
    await this.validateAuthorityChain(issues, warnings);
    
    // Validate canonical sources
    await this.validateCanonicalSources(issues, warnings);
    
    // Validate file existence
    await this.validateFileExistence(issues, warnings);
    
    // Validate hierarchy integrity
    await this.validateHierarchyIntegrity(issues, warnings);

    return {
      valid: issues.length === 0,
      issues,
      warnings,
      registryVersion: this.registry?.canon_version || 'unknown'
    };
  }

  private async validateBasicStructure(issues: ValidationIssue[], warnings: ValidationIssue[]): Promise<void> {
    if (!this.registry) return;

    // Check required top-level fields
    const requiredFields = ['canon_version', 'authority_chain', 'canonical_sources'];
    for (const field of requiredFields) {
      if (!(field in this.registry)) {
        issues.push({
          type: 'missing_field',
          severity: 'error',
          message: `Missing required field: ${field}`,
          location: 'root'
        });
      }
    }

    // Check canon version format
    if (this.registry.canon_version && !/^v\d+\.\d+$/.test(this.registry.canon_version)) {
      issues.push({
        type: 'invalid_format',
        severity: 'error',
        message: `Invalid canon version format: ${this.registry.canon_version}`,
        location: 'canon_version'
      });
    }
  }

  private async validateAuthorityChain(issues: ValidationIssue[], warnings: ValidationIssue[]): Promise<void> {
    if (!this.registry) return;

    const chain = this.registry.authority_chain;
    if (!chain || !chain.levels) {
      issues.push({
        type: 'missing_structure',
        severity: 'error',
        message: 'Authority chain levels not defined',
        location: 'authority_chain'
      });
      return;
    }

    // Validate level sequence
    const expectedLevels = [1, 2, 3, 4, 5];
    const actualLevels = chain.levels.map((l: any) => l.level).sort((a: number, b: number) => a - b);
    
    if (JSON.stringify(expectedLevels) !== JSON.stringify(actualLevels)) {
      issues.push({
        type: 'invalid_sequence',
        severity: 'error',
        message: `Invalid authority chain levels: expected ${expectedLevels.join(',')}, got ${actualLevels.join(',')}`,
        location: 'authority_chain.levels'
      });
    }

    // Validate each level
    for (const level of chain.levels) {
      if (!level.name || !level.authority_type) {
        issues.push({
          type: 'missing_field',
          severity: 'error',
          message: `Authority level ${level.level} missing name or authority_type`,
          location: `authority_chain.levels[${level.level}]`
        });
      }

      // Check source file exists
      if (level.source_file) {
        const sourcePath = path.join(process.cwd(), level.source_file);
        try {
          await fs.access(sourcePath);
        } catch {
          issues.push({
            type: 'file_not_found',
            severity: 'error',
            message: `Source file not found: ${level.source_file}`,
            location: `authority_chain.levels[${level.level}].source_file`
          });
        }
      }
    }
  }

  private async validateCanonicalSources(issues: ValidationIssue[], warnings: ValidationIssue[]): Promise<void> {
    if (!this.registry) return;

    const sources = this.registry.canonical_sources;
    if (!sources) return;

    // Check required source categories
    const requiredCategories = ['constitutional', 'visual_system', 'prompt_canon', 'visual_authority'];
    for (const category of requiredCategories) {
      if (!(category in sources)) {
        issues.push({
          type: 'missing_category',
          severity: 'error',
          message: `Missing canonical source category: ${category}`,
          location: 'canonical_sources'
        });
      }
    }

    // Validate each source
    for (const [category, categorySources] of Object.entries(sources)) {
      for (const [sourceName, source] of Object.entries(categorySources as Record<string, CanonicalSource>)) {
        if (!source.file || !source.type || source.authority_level === undefined) {
          issues.push({
            type: 'missing_field',
            severity: 'error',
            message: `Source ${category}.${sourceName} missing required fields`,
            location: `canonical_sources.${category}.${sourceName}`
          });
        }

        // Check source file exists
        const sourcePath = path.join(process.cwd(), source.file);
        try {
          await fs.access(sourcePath);
        } catch {
          issues.push({
            type: 'file_not_found',
            severity: 'error',
            message: `Source file not found: ${source.file}`,
            location: `canonical_sources.${category}.${sourceName}.file`
          });
        }
      }
    }
  }

  private async validateFileExistence(issues: ValidationIssue[], warnings: ValidationIssue[]): Promise<void> {
    if (!this.registry) return;

    // Validate prompt canon location
    const promptCanon = this.registry.prompt_canon_location;
    if (promptCanon) {
      const promptDir = path.join(process.cwd(), promptCanon.directory);
      try {
        await fs.access(promptDir);
      } catch {
        issues.push({
          type: 'directory_not_found',
          severity: 'error',
          message: `Prompt canon directory not found: ${promptCanon.directory}`,
          location: 'prompt_canon_location.directory'
        });
      }

      // Check prompt canon files
      for (const file of promptCanon.files) {
        const filePath = path.join(promptDir, file);
        try {
          await fs.access(filePath);
        } catch {
          issues.push({
            type: 'file_not_found',
            severity: 'error',
            message: `Prompt canon file not found: ${file}`,
            location: `prompt_canon_location.files`
          });
        }
      }
    }

    // Validate visual authority location
    const visualAuthority = this.registry.visual_authority_location;
    if (visualAuthority) {
      const visualDir = path.join(process.cwd(), visualAuthority.directory);
      try {
        await fs.access(visualDir);
      } catch {
        issues.push({
          type: 'directory_not_found',
          severity: 'error',
          message: `Visual authority directory not found: ${visualAuthority.directory}`,
          location: 'visual_authority_location.directory'
        });
      }

      // Check main visual authority files
      for (const file of visualAuthority.main_files) {
        const filePath = path.join(visualDir, file);
        try {
          await fs.access(filePath);
        } catch {
          issues.push({
            type: 'file_not_found',
            severity: 'error',
            message: `Visual authority file not found: ${file}`,
            location: `visual_authority_location.main_files`
          });
        }
      }
    }
  }

  private async validateHierarchyIntegrity(issues: ValidationIssue[], warnings: ValidationIssue[]): Promise<void> {
    if (!this.registry) return;

    // Check authority chain levels match source authority levels
    const chainLevels = this.registry.authority_chain?.levels || [];
    const sources = this.registry.canonical_sources;

    for (const level of chainLevels) {
      // Find sources with matching authority level
      let foundSource = false;
      for (const category of Object.values(sources)) {
        for (const source of Object.values(category as Record<string, CanonicalSource>)) {
          if (source.authority_level === level.level) {
            foundSource = true;
            break;
          }
        }
        if (foundSource) break;
      }

      if (!foundSource) {
        warnings.push({
          type: 'unmatched_level',
          severity: 'warning',
          message: `Authority level ${level.level} has no matching canonical sources`,
          location: 'authority_chain.levels'
        });
      }
    }
  }

  async validateGenerationRequest(request: GenerationRequest): Promise<ValidationResult> {
    await this.loadRegistry();
    
    const issues: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];

    // Validate against canon registry
    if (!this.registry) {
      issues.push({
        type: 'registry_not_loaded',
        severity: 'error',
        message: 'Canon registry not loaded',
        location: 'registry'
      });
      return { valid: false, issues, warnings, registryVersion: 'unknown' };
    }

    // Check required validations
    const requiredValidations = this.registry.generation_requirements?.mandatory_validations || [];
    for (const validation of requiredValidations) {
      if (!request.validations || !request.validations.includes(validation)) {
        issues.push({
          type: 'missing_validation',
          severity: 'error',
          message: `Missing required validation: ${validation}`,
          location: 'generation_request.validations'
        });
      }
    }

    // Validate prompt canon compliance
    if (request.prompt) {
      await this.validatePromptCanon(request.prompt, issues, warnings);
    }

    // Validate visual authority compliance
    if (request.visual_config) {
      await this.validateVisualAuthority(request.visual_config, issues, warnings);
    }

    return {
      valid: issues.length === 0,
      issues,
      warnings,
      registryVersion: this.registry.canon_version
    };
  }

  private async validatePromptCanon(prompt: GenerationRequest['prompt'], issues: ValidationIssue[], warnings: ValidationIssue[]): Promise<void> {
    // Check mode is valid
    const validModes = ['canon_core', 'luminous_fan_appeal', 'luxury_mystical_editorial'];
    if (prompt.mode && !validModes.includes(prompt.mode)) {
      issues.push({
        type: 'invalid_mode',
        severity: 'error',
        message: `Invalid mode: ${prompt.mode}`,
        location: 'prompt.mode'
      });
    }

    // Check prompt structure
    if (!prompt.positive_prompt) {
      issues.push({
        type: 'missing_field',
        severity: 'error',
        message: 'Missing positive prompt',
        location: 'prompt.positive_prompt'
      });
    }

    if (!prompt.negative_prompt) {
      warnings.push({
        type: 'missing_field',
        severity: 'warning',
        message: 'Missing negative prompt',
        location: 'prompt.negative_prompt'
      });
    }
  }

  private async validateVisualAuthority(config: any, issues: ValidationIssue[], warnings: ValidationIssue[]): Promise<void> {
    // Check visual authority compliance
    if (!config.authority_level) {
      issues.push({
        type: 'missing_field',
        severity: 'error',
        message: 'Missing visual authority level',
        location: 'visual_config.authority_level'
      });
    }

    // Check domain validity
    if (config.domain) {
      const validDomains = this.registry?.canonical_sources?.visual_authority ? 
        Object.keys(this.registry.canonical_sources.visual_authority) : [];
      
      if (validDomains.length > 0 && !validDomains.includes(config.domain)) {
        warnings.push({
          type: 'unknown_domain',
          severity: 'warning',
          message: `Unknown visual domain: ${config.domain}`,
          location: 'visual_config.domain'
        });
      }
    }
  }

  getRegistry(): CanonRegistry | null {
    return this.registry;
  }

  getAuthorityChain(): any[] {
    return this.registry?.authority_chain?.levels || [];
  }

  getCanonicalSources(): any {
    return this.registry?.canonical_sources || {};
  }
}
