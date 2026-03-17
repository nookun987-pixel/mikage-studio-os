import { canonValidationInputSchema, canonValidationResultSchema } from '@mikage/contracts';
const PASS_ORDER = [
    'ontology',
    'invariants',
    'philosophical_axes',
    'character_truth',
    'visual_grammar',
    'drift_risk'
];
const containsTerm = (haystack, term) => haystack.toLowerCase().includes(term.toLowerCase());
const evaluateRuleShell = (pass, promptText, shell) => {
    const warnings = [];
    const violations = [];
    for (const term of shell.requiredTerms) {
        if (!containsTerm(promptText, term)) {
            violations.push({
                code: `${pass}_missing_${term.replace(/\s+/gu, '_')}`,
                category: pass,
                message: `Required term missing: ${term}`,
                severity: 'blocker',
                metadata: {}
            });
        }
    }
    for (const term of shell.prohibitedTerms) {
        if (containsTerm(promptText, term)) {
            violations.push({
                code: `${pass}_prohibited_${term.replace(/\s+/gu, '_')}`,
                category: pass,
                message: `Prohibited term present: ${term}`,
                severity: 'blocker',
                metadata: {}
            });
        }
    }
    for (const term of shell.advisoryTerms) {
        if (!containsTerm(promptText, term)) {
            warnings.push({
                code: `${pass}_advisory_${term.replace(/\s+/gu, '_')}`,
                category: pass,
                message: `Advisory term missing: ${term}`,
                metadata: {}
            });
        }
    }
    const totalChecks = shell.requiredTerms.length +
        shell.prohibitedTerms.length +
        shell.advisoryTerms.length;
    const failedChecks = warnings.length + violations.length;
    const score = totalChecks === 0 ? 1 : (totalChecks - failedChecks) / totalChecks;
    return {
        passResult: {
            pass,
            passed: violations.length === 0,
            score: Number(score.toFixed(4)),
            metadata: {}
        },
        warnings,
        violations
    };
};
const evaluateDriftRisk = (promptText, input) => {
    const warnings = [];
    const violations = [];
    for (const term of input.driftRisk.riskTerms) {
        if (containsTerm(promptText, term)) {
            warnings.push({
                code: `drift_risk_warning_${term.replace(/\s+/gu, '_')}`,
                category: 'drift_risk',
                message: `Risk term present: ${term}`,
                metadata: {}
            });
        }
    }
    for (const term of input.driftRisk.hardBlockTerms) {
        if (containsTerm(promptText, term)) {
            violations.push({
                code: `drift_risk_block_${term.replace(/\s+/gu, '_')}`,
                category: 'drift_risk',
                message: `Hard-block drift term present: ${term}`,
                severity: 'blocker',
                metadata: {}
            });
        }
    }
    const totalChecks = input.driftRisk.riskTerms.length + input.driftRisk.hardBlockTerms.length;
    const failedChecks = warnings.length + violations.length;
    const score = totalChecks === 0 ? 1 : (totalChecks - failedChecks) / totalChecks;
    return {
        passResult: {
            pass: 'drift_risk',
            passed: violations.length === 0,
            score: Number(score.toFixed(4)),
            metadata: {}
        },
        warnings,
        violations
    };
};
export const validateCanon = (rawInput) => {
    const input = canonValidationInputSchema.parse(rawInput);
    const promptText = input.compiledPrompt.compiledPrompt;
    const evaluationMap = {
        ontology: () => evaluateRuleShell('ontology', promptText, input.ontology),
        invariants: () => evaluateRuleShell('invariants', promptText, input.invariants),
        philosophical_axes: () => evaluateRuleShell('philosophical_axes', promptText, input.philosophicalAxes),
        character_truth: () => evaluateRuleShell('character_truth', promptText, input.characterTruth),
        visual_grammar: () => evaluateRuleShell('visual_grammar', promptText, input.visualGrammar),
        drift_risk: () => evaluateDriftRisk(promptText, input)
    };
    const evaluations = PASS_ORDER.map((pass) => {
        const evaluator = evaluationMap[pass];
        return evaluator();
    });
    const passResults = evaluations.map((item) => item.passResult);
    const warnings = evaluations.flatMap((item) => item.warnings);
    const violations = evaluations.flatMap((item) => item.violations);
    const decision = violations.length === 0 ? 'accepted' : 'rejected';
    return canonValidationResultSchema.parse({
        requestCode: input.requestCode,
        status: decision === 'accepted' ? 'validated' : 'rejected',
        decision,
        passResults,
        warnings,
        violations,
        summary: {
            totalPasses: PASS_ORDER.length,
            passedChecks: passResults.filter((item) => item.passed).length,
            warningCount: warnings.length,
            violationCount: violations.length
        },
        metadata: input.metadata
    });
};
//# sourceMappingURL=validator.js.map