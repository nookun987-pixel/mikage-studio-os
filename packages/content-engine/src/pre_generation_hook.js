/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * pre_generation_hook.ts
 */
/**
 * Implementation of pre-generation validation hook
 * Handles request validation, mode/reference/prompt readiness checks
 */
export class PreGenerationHookImpl {
    canonGuard;
    constructor(canonGuard) {
        this.canonGuard = canonGuard;
    }
    /**
     * Validate generation request before processing
     */
    async validate(request) {
        const startTime = Date.now();
        try {
            // Convert to canon validation input format
            const canonInput = this.convertToCanonValidationInput(request);
            // Execute canon validation
            const validationResult = await this.canonGuard.validateAll(canonInput);
            // Extract and normalize results
            const issues = this.extractIssues(validationResult);
            const blockingIssues = this.extractBlockingIssues(validationResult);
            const warnings = this.extractWarnings(validationResult);
            // Check mode readiness
            const modeReady = await this.checkModeReadiness(request);
            // Check reference availability
            const referencesReady = await this.checkReferenceAvailability(request);
            // Check prompt compliance
            const promptCompliant = await this.checkPromptCompliance(request);
            // Determine overall status
            const status = this.determineValidationStatus(validationResult.valid, modeReady, referencesReady, promptCompliant, blockingIssues);
            // Extract validated references
            const validatedReferences = await this.extractValidatedReferences(request, validationResult);
            // Extract canon constraints
            const canonConstraints = this.extractCanonConstraints(request, validationResult);
            const validationTime = Date.now() - startTime;
            return {
                status,
                confidence: this.calculateConfidence(validationResult, modeReady, referencesReady, promptCompliant),
                issues,
                blockingIssues,
                warnings,
                shouldBlock: status === 'rejected' || blockingIssues.length > 0,
                recommendedMode: this.recommendGenerationMode(request, validationResult),
                validatedReferences,
                canonConstraints,
                validationTime
            };
        }
        catch (error) {
            return {
                status: 'rejected',
                confidence: 0,
                issues: [{
                        issueId: `pre_validation_error_${request.requestId}`,
                        type: 'validation_error',
                        severity: 'critical',
                        message: error instanceof Error ? error.message : 'Unknown validation error',
                        source: 'pre_generation_hook',
                        canAutoCorrect: false,
                        requiresManualIntervention: true
                    }],
                blockingIssues: [{
                        issueId: `pre_validation_block_${request.requestId}`,
                        issueType: 'validation_failure',
                        severity: 'critical',
                        description: `Pre-generation validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                        source: 'pre_generation_hook',
                        blocksGeneration: true,
                        requiresManualIntervention: true,
                        resolutionPath: {
                            immediateAction: 'investigate_validation_error',
                            escalationRequired: true,
                            escalationLevel: 3,
                            estimatedResolutionTime: '30 minutes'
                        }
                    }],
                warnings: [],
                shouldBlock: true,
                validationTime: Date.now() - startTime
            };
        }
    }
    /**
     * Check if generation mode is ready and available
     */
    async checkModeReadiness(request) {
        // Scaffolded: Check if the requested generation mode is available
        // This would include:
        // - Mode availability in the generation config
        // - Provider compatibility
        // - Resource requirements
        // - Mode-specific constraints
        const objective = request.productionPackage.objective;
        const availableModes = ['canon_core', 'luminous_fan_appeal', 'imperial_majesty', 'cinematic_drama'];
        // For now, assume all objectives can use canon_core mode
        const recommendedMode = this.getModeForObjective(objective);
        return availableModes.includes(recommendedMode);
    }
    /**
     * Check if required references are available
     */
    async checkReferenceAvailability(request) {
        // Scaffolded: Check availability of required references
        // This would include:
        // - Style reference availability
        // - Character reference availability
        // - Asset reference availability
        // - Canon document accessibility
        const canonConstraints = request.productionPackage.canonConstraints;
        // Check if required style locks are available
        if (canonConstraints.styleLocks && canonConstraints.styleLocks.length > 0) {
            // Scaffolded: Would check actual style reference availability
            // For now, assume all style locks are available
        }
        // Check if forbidden tags are respected
        if (canonConstraints.forbiddenTags && canonConstraints.forbiddenTags.length > 0) {
            // Scaffolded: Would check against prompt content
            // For now, assume compliance
        }
        return true;
    }
    /**
     * Check prompt compliance with canon requirements
     */
    async checkPromptCompliance(request) {
        // Scaffolded: Check prompt compliance
        // This would include:
        // - Canon terminology compliance
        // - Character name validation
        // - Location name validation
        // - Style requirement compliance
        const prompts = request.productionPackage.promptPack.prompts;
        for (const prompt of prompts) {
            // Basic checks (scaffolded)
            if (!prompt || prompt.trim().length === 0) {
                return false;
            }
            // Would include actual canon compliance checks
            // For now, assume prompts are compliant
        }
        return true;
    }
    /**
     * Helper methods
     */
    convertToCanonValidationInput(request) {
        return {
            requestCode: request.requestId,
            compiledPrompt: {
                validation: {
                    issues: [],
                    valid: true
                },
                requestCode: request.requestId,
                compileMode: "production_prompt",
                negativePrompt: {
                    clauses: [],
                    rendered: ""
                },
                lineage: {
                    promptHash: "",
                    lineage: []
                },
                sections: [],
                compiledPrompt: request.productionPackage.promptPack.prompts.join(', ')
            },
            queryMode: request.validationMode === 'strict' ? 'blocking' : 'advisory',
            metadata: {
                generation_mode: this.getModeForObjective(request.productionPackage.objective),
                production_package_id: request.productionPackage.production_package_id,
                job_id: request.productionPackage.jobId,
                objective: request.productionPackage.objective,
                canonConstraints: request.productionPackage.canonConstraints
            }
        };
    }
    extractIssues(validationResult) {
        // Extract issues from canon validation result
        if (validationResult.issues) {
            return validationResult.issues.map((issue, index) => ({
                issueId: `issue_${validationResult.requestCode}_${index}`,
                type: issue.type || 'validation_issue',
                severity: this.mapSeverity(issue.severity),
                message: issue.message,
                source: 'canon_validator',
                canAutoCorrect: issue.canAutoCorrect || false,
                requiresManualIntervention: issue.requiresManualIntervention || false
            }));
        }
        return [];
    }
    extractBlockingIssues(validationResult) {
        // Extract blocking issues from canon validation result
        if (validationResult.issues) {
            return validationResult.issues
                .filter((issue) => issue.severity === 'error' || issue.severity === 'critical')
                .map((issue, index) => ({
                issueId: `blocking_${validationResult.requestCode}_${index}`,
                issueType: issue.type || 'canon_violation',
                severity: 'critical',
                description: issue.message,
                source: 'canon_validator',
                blocksGeneration: true,
                requiresManualIntervention: issue.severity === 'critical',
                resolutionPath: {
                    immediateAction: issue.resolutionAction || 'review_canon_compliance',
                    escalationRequired: issue.severity === 'critical',
                    escalationLevel: this.calculateEscalationLevel(issue),
                    estimatedResolutionTime: this.estimateResolutionTime(issue)
                }
            }));
        }
        return [];
    }
    extractWarnings(validationResult) {
        // Extract warnings from canon validation result
        if (validationResult.warnings) {
            return validationResult.warnings.map((warning, index) => ({
                warningId: `warning_${validationResult.requestCode}_${index}`,
                warningType: warning.type || 'canon_warning',
                severity: this.mapWarningSeverity(warning.severity),
                message: warning.message,
                source: 'canon_validator',
                recommendation: warning.recommendation
            }));
        }
        return [];
    }
    determineValidationStatus(canonValid, modeReady, referencesReady, promptCompliant, blockingIssues) {
        if (blockingIssues.length > 0) {
            return 'rejected';
        }
        if (!canonValid || !modeReady || !referencesReady || !promptCompliant) {
            // Check if retry might help
            if (!modeReady || !referencesReady) {
                return 'retry';
            }
            return 'fallback';
        }
        return 'accepted';
    }
    calculateConfidence(validationResult, modeReady, referencesReady, promptCompliant) {
        let confidence = validationResult.valid ? 0.8 : 0.3;
        if (modeReady)
            confidence += 0.1;
        if (referencesReady)
            confidence += 0.05;
        if (promptCompliant)
            confidence += 0.05;
        return Math.min(confidence, 1.0);
    }
    recommendGenerationMode(request, validationResult) {
        const objective = request.productionPackage.objective;
        const baseMode = this.getModeForObjective(objective);
        // Would include logic to adjust mode based on validation results
        // For now, return base mode
        return baseMode;
    }
    async extractValidatedReferences(request, validationResult) {
        // Scaffolded: Extract validated references from validation result
        // This would include style references, character references, etc.
        const references = [];
        // Extract style references from canon constraints
        if (request.productionPackage.canonConstraints.styleLocks) {
            for (const styleLock of request.productionPackage.canonConstraints.styleLocks) {
                references.push({
                    referenceId: `style_${styleLock}`,
                    referenceType: 'style',
                    confidence: 0.9,
                    source: 'canon_constraints'
                });
            }
        }
        return references;
    }
    extractCanonConstraints(request, validationResult) {
        return {
            requiredTags: request.productionPackage.canonConstraints.requiredTags || [],
            forbiddenTags: request.productionPackage.canonConstraints.forbiddenTags || [],
            styleLocks: request.productionPackage.canonConstraints.styleLocks || [],
            domain: 'mikage_application', // Scaffolded: would be determined from context
            authorityLevel: 4 // Scaffolded: would be determined from context
        };
    }
    getModeForObjective(objective) {
        const modeMap = {
            cinematic_frame: 'canon_core',
            character_portrait: 'luminous_fan_appeal',
            trailer_sequence: 'cinematic_drama'
        };
        return modeMap[objective] || 'canon_core';
    }
    mapSeverity(severity) {
        const severityMap = {
            'info': 'low',
            'warning': 'medium',
            'error': 'high',
            'critical': 'critical'
        };
        return severityMap[severity] || 'medium';
    }
    mapWarningSeverity(severity) {
        const severityMap = {
            'info': 'low',
            'warning': 'medium',
            'error': 'high'
        };
        return severityMap[severity] || 'medium';
    }
    calculateEscalationLevel(issue) {
        // Scaffolded: Calculate escalation level based on issue severity and type
        return issue.severity === 'critical' ? 5 : 3;
    }
    estimateResolutionTime(issue) {
        // Scaffolded: Estimate resolution time based on issue type
        const timeMap = {
            'canon_violation': '1 hour',
            'style_drift': '30 minutes',
            'character_inaccuracy': '45 minutes',
            'reference_missing': '15 minutes'
        };
        return timeMap[issue.type] || '30 minutes';
    }
}
//# sourceMappingURL=pre_generation_hook.js.map