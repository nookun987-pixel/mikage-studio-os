# Validator Decision Matrix

## Overview

This document defines the decision logic for the Mikage Studio OS validator system, specifying pass/warn/fail conditions, escalation paths, retry ladders, and integration with fallback policies.

## Version Information

- **Matrix Version**: 1.0.0
- **Last Updated**: 2026-03-17T00:00:00Z
- **Compatible Validator Version**: 1.0.0+

## Decision Logic Framework

### Validation States

```typescript
enum ValidationState {
  PASS = "pass",           // All validations successful, proceed with generation
  WARN = "warn",           // Minor issues, proceed with monitoring
  FAIL = "fail",           // Critical issues, block or retry with correction
  BLOCK = "block",         // Severe violations, immediate rejection
  DEFER = "defer"          // Requires manual review or external input
}
```

### Decision Hierarchy

1. **Critical Violations** → Immediate BLOCK/FAIL
2. **High Severity Issues** → FAIL with retry option
3. **Medium Severity Issues** → WARN with continue
4. **Low Severity Issues** → LOG only

## Pass / Warn / Fail Logic

### PASS Conditions

**Primary Pass Criteria**:
- All critical rules satisfied
- No high-severity violations
- Canon compliance score ≥ 90%
- Quality score ≥ mode-specific threshold
- No forbidden drift terms detected

**Secondary Pass Criteria**:
- Medium-severity issues ≤ 2
- Low-severity issues ≤ 5
- Drift risk score ≤ 20%
- Asset authority level sufficient

**Pass Decision Flow**:
```
All Critical Rules Satisfied? → Yes
    ↓
Canon Compliance ≥ 90%? → Yes
    ↓
Quality ≥ Threshold? → Yes
    ↓
No Forbidden Drift? → Yes
    ↓
Medium Issues ≤ 2? → Yes
    ↓
PASS → Proceed with Generation
```

### WARN Conditions

**Warning Triggers**:
- Medium-severity issues present (3-5)
- Low-severity issues present (6-10)
- Minor style drift detected (20-40%)
- Asset quality borderline (70-80%)
- Non-critical reference inconsistencies

**Warn Decision Flow**:
```
Critical Issues? → No
    ↓
High Severity Issues? → No
    ↓
Medium Issues 3-5 OR Low Issues 6-10? → Yes
    ↓
Minor Drift 20-40%? → Yes/No
    ↓
WARN → Proceed with Monitoring
```

**Warning Actions**:
- Log warning details
- Increase monitoring frequency
- Flag for manual review if pattern emerges
- Apply preventive measures for future generations

### FAIL Conditions

**Failure Triggers**:
- Any critical rule violation
- High-severity issues present
- Canon compliance score < 90%
- Quality score below threshold
- Forbidden drift terms detected
- Asset authority insufficient

**Fail Decision Flow**:
```
Critical Violation? → Yes → FAIL (No Retry)
    ↓ No
High Severity Issues? → Yes → FAIL (Retry Allowed)
    ↓ No
Canon Compliance < 90%? → Yes → FAIL (Retry Allowed)
    ↓ No
Quality < Threshold? → Yes → FAIL (Retry Allowed)
    ↓ No
Forbidden Drift? → Yes → FAIL (No Retry)
```

### BLOCK Conditions

**Block Triggers**:
- Canon registry violations
- Security/authority breaches
- System integrity threats
- Repeated critical failures
- Unauthorized canon modifications

**Block Decision Flow**:
```
Canon Registry Violation? → Yes → BLOCK
    ↓ No
Security Breach? → Yes → BLOCK
    ↓ No
System Integrity Threat? → Yes → BLOCK
    ↓ No
Repeated Critical Failures? → Yes → BLOCK
```

## Escalation Paths

### Level 1: Automated Recovery

**Trigger Conditions**:
- Retryable failures with clear correction path
- Temporary resource unavailability
- Minor parameter adjustments needed

**Escalation Process**:
1. Apply automatic correction
2. Retry with adjusted parameters
3. Log automated recovery attempt
4. Monitor for success

**Examples**:
- Prompt length optimization
- Parameter range correction
- Asset alternative selection

### Level 2: Technical Support

**Trigger Conditions**:
- Integration failures
- Technical parameter issues
- System unavailability
- Format incompatibilities

**Escalation Process**:
1. Document technical failure
2. Route to technical support team
3. Apply technical troubleshooting
4. Implement system-level fixes

**Response Time**: Within 2 hours
**Authority Level**: 2

### Level 3: Domain Expert Review

**Trigger Conditions**:
- Style drift issues
- Asset quality problems
- Reference conflicts
- Domain classification errors

**Escalation Process**:
1. Document domain-specific failure
2. Route to appropriate expert team
3. Apply domain expertise
4. Update domain rules if needed

**Response Time**: Within 4 hours
**Authority Level**: 3

**Expert Teams**:
- **Style Review**: Style guardrails and aesthetic issues
- **Asset Management**: Asset selection and quality issues
- **Drift Analysis**: Pattern analysis and prevention

### Level 4: System Administration

**Trigger Conditions**:
- System-wide failures
- Resource exhaustion
- Configuration inconsistencies
- Infrastructure problems

**Escalation Process**:
1. Document system-level failure
2. Route to system administration
3. Apply infrastructure fixes
4. Update system configurations

**Response Time**: Within 1 hour
**Authority Level**: 4

### Level 5: Canon Guard Intervention

**Trigger Conditions**:
- Canon constitution violations
- Authority level breaches
- Forbidden drift detection
- Security incidents

**Escalation Process**:
1. Immediate canon violation logging
2. Route to Canon Guard team
3. Apply canon protection measures
4. Update canon security protocols

**Response Time**: Immediate
**Authority Level**: 5

### Level 6: Canon Council Review

**Trigger Conditions**:
- Canon contradictions
- Interpretation drift
- Canon evolution needs
- Complex canon questions

**Escalation Process**:
1. Document canon interpretation issue
2. Route to Canon Council
3. Conduct canon review process
4. Update canon documentation

**Response Time**: Within 24 hours
**Authority Level**: 4

## Retry Ladder

### Retry Eligibility Matrix

| Failure Type | Retryable | Max Retries | Backoff Strategy |
|--------------|-----------|-------------|------------------|
| Critical Canon Violation | No | 0 | N/A |
| Security Breach | No | 0 | N/A |
| High Severity Technical | Yes | 3 | Exponential |
| Medium Severity Style | Yes | 2 | Linear |
| Low Severity Parameter | Yes | 1 | Fixed |
| Resource Unavailable | Yes | 5 | Exponential |
| Integration Failure | Yes | 2 | Linear |

### Retry Strategy Configuration

**Exponential Backoff**:
- Initial delay: 30 seconds
- Multiplier: 2.0
- Maximum delay: 5 minutes
- Jitter: ±25%

**Linear Backoff**:
- Initial delay: 60 seconds
- Increment: 60 seconds
- Maximum delay: 3 minutes

**Fixed Delay**:
- Delay: 60 seconds
- No variation

### Retry Decision Logic

```typescript
interface RetryDecision {
  shouldRetry: boolean;
  maxRetries: number;
  backoffStrategy: 'exponential' | 'linear' | 'fixed';
  parameterAdjustments?: ParameterAdjustment[];
  escalationLevel: number;
}

function determineRetryLogic(failure: ValidationFailure): RetryDecision {
  if (failure.severity === 'critical' && failure.type === 'canon_violation') {
    return { shouldRetry: false, maxRetries: 0, backoffStrategy: 'fixed', escalationLevel: 5 };
  }
  
  if (failure.type === 'technical_parameter') {
    return { 
      shouldRetry: true, 
      maxRetries: 1, 
      backoffStrategy: 'fixed',
      parameterAdjustments: generateParameterCorrections(failure),
      escalationLevel: 1 
    };
  }
  
  // Additional retry logic for other failure types...
}
```

## Reject Conditions

### Immediate Rejection

**Auto-Reject Triggers**:
- Canon registry violations
- Forbidden drift terms
- Security/authority breaches
- System integrity threats
- Maximum retry exhaustion

**Rejection Process**:
1. Block generation immediately
2. Log rejection with detailed reasoning
3. Route to appropriate escalation level
4. Update rejection patterns for learning

### Conditional Rejection

**Conditional Reject Triggers**:
- Persistent quality failures
- Repeated drift patterns
- Chronic asset issues
- Configuration inconsistencies

**Conditional Rejection Process**:
1. Allow limited retry attempts
2. Monitor for pattern improvement
3. Reject if pattern persists
4. Route for system review

## Fallback Policy Integration

### When to Route to Fallback Policy

**Fallback Triggers**:
1. **Reference Conflicts**: Multiple valid references conflict
   - Route to: `reference_conflict_handling`
   - Fallback strategy: Dominant reference selection

2. **Asset Unavailability**: Required assets not available
   - Route to: `asset_unavailable_handling`
   - Fallback strategy: Approved alternative usage

3. **Validation Failures**: Validation cannot complete
   - Route to: `validation_failure_handling`
   - Fallback strategy: Degraded validation mode

4. **Quality Issues**: Quality below but close to threshold
   - Route to: `quality_improvement_handling`
   - Fallback strategy: Enhancement techniques

5. **System Overload**: System resources constrained
   - Route to: `resource_management_handling`
   - Fallback strategy: Reduced complexity generation

### Fallback Decision Matrix

```typescript
interface FallbackDecision {
  triggerCondition: string;
  fallbackPolicy: string;
  fallbackStrategy: string;
  successProbability: number;
  qualityImpact: 'low' | 'medium' | 'high';
  monitoringRequired: boolean;
}

const fallbackMatrix: FallbackDecision[] = [
  {
    triggerCondition: "reference_conflict",
    fallbackPolicy: "reference_selection_config.json",
    fallbackStrategy: "dominant_reference_selection",
    successProbability: 0.85,
    qualityImpact: "low",
    monitoringRequired: true
  },
  {
    triggerCondition: "canon_asset_missing",
    fallbackPolicy: "fallback_policy.md",
    fallbackStrategy: "approved_asset_substitution",
    successProbability: 0.70,
    qualityImpact: "medium",
    monitoringRequired: true
  }
];
```

## Stop Generation Conditions

### Immediate Stop

**Critical Stop Triggers**:
- Canon constitution violations detected
- Security incident identified
- System resource exhaustion
- Legal compliance issues
- Emergency stop requests

**Stop Process**:
1. Immediately halt all generation processes
2. Block new generation requests
3. Initiate emergency protocols
4. Route to highest escalation level

### Graceful Stop

**Graceful Stop Triggers**:
- Quality threshold breach
- Asset availability problems
- Configuration errors
- Performance degradation
- User cancellation requests

**Graceful Stop Process**:
1. Complete in-flight generations
2. Queue new requests for later
3. Apply corrective measures
4. Resume when conditions improve

### Conditional Stop

**Conditional Stop Triggers**:
- Repeated failure patterns
- System performance degradation
- Resource constraint warnings
- Maintenance windows

**Conditional Stop Process**:
1. Monitor condition severity
2. Apply throttling if needed
3. Stop if conditions worsen
4. Resume when conditions allow

## Decision Matrix Implementation

### Core Decision Function

```typescript
function makeValidationDecision(
  validationResults: ValidationResult[],
  context: ValidationContext
): DecisionResult {
  
  // Check for critical violations
  const criticalViolations = validationResults.filter(r => 
    r.severity === 'critical' && !r.passed
  );
  
  if (criticalViolations.length > 0) {
    return handleCriticalViolations(criticalViolations, context);
  }
  
  // Check for high severity issues
  const highSeverityIssues = validationResults.filter(r => 
    r.severity === 'high' && !r.passed
  );
  
  if (highSeverityIssues.length > 0) {
    return handleHighSeverityIssues(highSeverityIssues, context);
  }
  
  // Calculate overall scores
  const canonCompliance = calculateCanonCompliance(validationResults);
  const qualityScore = calculateQualityScore(validationResults);
  const driftRisk = calculateDriftRisk(validationResults);
  
  // Apply decision logic
  return applyDecisionLogic(canonCompliance, qualityScore, driftRisk, context);
}
```

### Decision Context

```typescript
interface ValidationContext {
  generationMode: string;
  assetReferences: AssetReference[];
  previousAttempts: number;
  systemLoad: SystemLoadMetrics;
  userPreferences: UserPreferences;
  timeConstraints: TimeConstraints;
}
```

### Decision Result

```typescript
interface DecisionResult {
  decision: ValidationState;
  confidence: number;
  reasoning: string[];
  actions: Action[];
  retryDecision?: RetryDecision;
  escalationLevel?: number;
  fallbackRecommendation?: FallbackRecommendation;
  monitoringInstructions: MonitoringInstruction[];
}
```

## Monitoring and Learning

### Decision Pattern Analysis

**Metrics to Track**:
- Decision accuracy over time
- False positive/negative rates
- Retry success rates
- Fallback effectiveness
- Escalation resolution times

**Learning Mechanisms**:
- Decision pattern recognition
- Success factor analysis
- Failure clustering
- Predictive decision modeling

### Adaptive Decision Making

**Dynamic Threshold Adjustment**:
- Adjust quality thresholds based on success rates
- Modify retry limits based on system performance
- Update escalation criteria based on resolution times

**Context-Aware Decisions**:
- Consider system load when deciding retries
- Adjust thresholds based on time constraints
- Factor user preferences into decision logic

## Integration Points

### With Generation Pipeline

**Pre-Generation Decisions**:
- Validate generation request
- Check resource availability
- Apply preliminary filters

**During Generation**:
- Monitor generation progress
- Detect early failure indicators
- Apply real-time corrections

**Post-Generation**:
- Validate output quality
- Assess canon compliance
- Update decision patterns

### With Fallback Policy

**Fallback Triggering**:
- Identify fallback-eligible failures
- Select appropriate fallback strategy
- Monitor fallback effectiveness

**Fallback Resolution**:
- Track fallback success rates
- Update fallback preferences
- Optimize fallback selection

### With Canon Guard

**Canon Protection**:
- Enforce canon compliance decisions
- Apply canon-level escalations
- Update canon protection rules

**Guard Integration**:
- Coordinate guard validation decisions
- Synchronize guard and validator actions
- Maintain consistent canon enforcement

This decision matrix provides a comprehensive framework for making consistent, traceable validation decisions while maintaining system flexibility and learning capability.
