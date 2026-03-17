/**
 * @package @mikage/content-engine
 * @wave Content Engine Adapter Layer
 *
 * types.ts
 */

import type { ProductionPackage } from './contracts.js';
import type { CanonValidationResult } from '@mikage/contracts';

/**
 * Generation request for the content engine adapter
 */
export interface GenerationRequest {
  requestId: string;
  productionPackage: ProductionPackage;
  parameters: {
    sampler?: string;
    steps?: number;
    cfg?: number;
    seed?: number;
    [key: string]: any;
  };
  requestedAt: string;
  currentAttempt?: number;
  maxRetries?: number;
  validationMode?: 'strict' | 'lenient';
  fallbackEnabled?: boolean;
}

/**
 * Generation response from the content engine
 */
export interface GenerationResponse {
  success: boolean;
  assetId?: string;
  mimeType?: string;
  storageUri?: string;
  lineageHash?: string;
  metadata?: any;
  generationTime?: number;
  provider?: string;
  completedAt?: string;
  error?: string;
}

/**
 * Pre-generation validation result
 */
export interface PreGenerationValidationResult {
  status: 'accepted' | 'rejected' | 'retry' | 'fallback';
  confidence: number;
  issues?: ValidationIssue[];
  blockingIssues?: BlockingIssue[];
  warnings?: ValidationWarning[];
  shouldBlock: boolean;
  recommendedMode?: string;
  validatedReferences?: Reference[];
  canonConstraints?: CanonConstraints;
  validationTime: number;
}

/**
 * Post-generation validation result
 */
export interface PostGenerationValidationResult {
  status: 'accepted' | 'rejected' | 'retry' | 'fallback';
  confidence: number;
  issues?: ValidationIssue[];
  blockingIssues?: BlockingIssue[];
  warnings?: ValidationWarning[];
  qualityScore?: number;
  canonCompliance?: number;
  validationTime: number;
}

/**
 * Routing decision from retry/fallback adapter
 */
export interface RoutingDecision {
  finalDecision: 'accepted' | 'rejected' | 'retry' | 'fallback';
  retryEligible: boolean;
  maxRetries: number;
  retryReason?: string;
  retryStrategy?: 'immediate' | 'delayed' | 'parameter_adjustment' | 'fallback';
  fallbackEligible: boolean;
  fallbackRequired: boolean;
  fallbackStrategy?: string;
  fallbackConfig?: any;
  qualityImpact?: 'low' | 'medium' | 'high';
  successProbability?: number;
}

/**
 * Complete content engine result
 */
export interface ContentEngineResult {
  resultId: string;
  requestMetadata: {
    requestId: string;
    productionPackageId: string;
    jobId: string;
    objective: string;
    generationMode: string;
    requestedAt: string;
    initiatedAt: string;
  };
  validationStatus: {
    preGeneration: {
      status: string;
      confidence: number;
      issuesFound: number;
      blockingIssues: number;
      validationTimeMs: number;
    };
    postGeneration?: {
      status: string;
      confidence: number;
      issuesFound: number;
      blockingIssues: number;
      validationTimeMs: number;
    };
    overall: {
      status: string;
      finalConfidence: number;
      totalValidationTimeMs: number;
    };
  };
  generationStatus: {
    status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
    startedAt?: string;
    completedAt?: string;
    generationTimeMs: number;
    providerUsed?: string;
    generationParameters?: any;
  };
  retryEligibility: {
    retryEligible: boolean;
    maxRetries: number;
    currentAttempt: number;
    retryReason?: string;
    retryStrategy?: string;
    fallbackEligible: boolean;
  };
  fallbackRecommendation: {
    fallbackRequired: boolean;
    fallbackStrategy?: string;
    fallbackConfig?: any;
    expectedQualityImpact?: 'low' | 'medium' | 'high';
    successProbability?: number;
  };
  blockingIssues: BlockingIssue[];
  warnings: ValidationWarning[];
  referencesUsed: {
    styleReferences: Reference[];
    assetReferences: AssetReference[];
    canonReferences: CanonReference[];
  };
  generatedAsset?: {
    assetId: string;
    mimeType: string;
    storageUri: string;
    lineageHash: string;
    metadata?: any;
  };
  monitoringData: {
    performanceMetrics: {
      totalProcessingTimeMs: number;
      validationTimeMs: number;
      generationTimeMs: number;
      postProcessingTimeMs: number;
    };
    resourceUsage: {
      memoryPeakMb: number;
      cpuUsagePercent: number;
    };
    traceId: string;
  };
  completedAt: string;
}

/**
 * Validation issue
 */
export interface ValidationIssue {
  issueId: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  source: string;
  canAutoCorrect: boolean;
  requiresManualIntervention: boolean;
}

/**
 * Blocking issue that prevents generation
 */
export interface BlockingIssue {
  issueId: string;
  issueType: string;
  severity: 'critical' | 'high';
  description: string;
  source: string;
  blocksGeneration: boolean;
  requiresManualIntervention: boolean;
  resolutionPath: {
    immediateAction?: string;
    escalationRequired: boolean;
    escalationLevel?: number;
    estimatedResolutionTime?: string;
  };
}

/**
 * Validation warning
 */
export interface ValidationWarning {
  warningId: string;
  warningType: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  source: string;
  recommendation?: string;
}

/**
 * Reference used in generation
 */
export interface Reference {
  referenceId: string;
  referenceType: 'style' | 'character' | 'location' | 'asset';
  confidence: number;
  source: string;
  metadata?: any;
}

/**
 * Asset reference
 */
export interface AssetReference {
  assetId: string;
  assetType: string;
  usage: string;
  confidence: number;
}

/**
 * Canon reference
 */
export interface CanonReference {
  canonSource: string;
  canonSection?: string;
  complianceLevel: number;
  relevantPassages?: string[];
}

/**
 * Canon constraints
 */
export interface CanonConstraints {
  requiredTags: string[];
  forbiddenTags: string[];
  styleLocks: string[];
  domain: string;
  authorityLevel: number;
}

/**
 * Pre-generation hook interface
 */
export interface PreGenerationHook {
  validate(request: GenerationRequest): Promise<PreGenerationValidationResult>;
  checkModeReadiness(request: GenerationRequest): Promise<boolean>;
  checkReferenceAvailability(request: GenerationRequest): Promise<boolean>;
  checkPromptCompliance(request: GenerationRequest): Promise<boolean>;
}

/**
 * Post-generation hook interface
 */
export interface PostGenerationHook {
  validate(request: GenerationRequest, generationResult: GenerationResponse): Promise<PostGenerationValidationResult>;
  checkCanonCompliance(generationResult: GenerationResponse): Promise<number>;
  checkStyleCompliance(generationResult: GenerationResponse): Promise<number>;
  checkAssetQuality(generationResult: GenerationResponse): Promise<number>;
}

/**
 * Retry/fallback adapter interface
 */
export interface RetryFallbackAdapter {
  routeDecision(
    preValidationResult: PreGenerationValidationResult,
    postValidationResult: PostGenerationValidationResult | undefined,
    generationResult: GenerationResponse
  ): Promise<RoutingDecision>;
  shouldRetry(result: ContentEngineResult): boolean;
  shouldFallback(result: ContentEngineResult): boolean;
  generateRetryConfig(result: ContentEngineResult): any;
  generateFallbackConfig(result: ContentEngineResult): any;
}

/**
 * Generation payload for execution
 */
export interface GenerationPayload {
  requestId: string;
  productionPackage: ProductionPackage;
  generationConfig: {
    mode: string;
    parameters: any;
    references: Reference[];
    constraints: CanonConstraints;
  };
  validationContext: {
    preValidationPassed: boolean;
    confidence: number;
    warnings: ValidationWarning[];
  };
}

/**
 * Monitoring event
 */
export interface MonitoringEvent {
  eventId: string;
  eventType: 'validation_start' | 'validation_complete' | 'generation_start' | 'generation_complete' | 'error' | 'retry' | 'fallback';
  timestamp: string;
  requestId: string;
  metadata: any;
  duration?: number;
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  totalProcessingTimeMs: number;
  validationTimeMs: number;
  generationTimeMs: number;
  postProcessingTimeMs: number;
  memoryPeakMb: number;
  cpuUsagePercent: number;
}

/**
 * Quality assessment
 */
export interface QualityAssessment {
  overallScore: number;
  technicalScore: number;
  artisticScore: number;
  canonComplianceScore: number;
  userSatisfactionPrediction: number;
  issues: QualityIssue[];
}

/**
 * Quality issue
 */
export interface QualityIssue {
  issueId: string;
  category: 'technical' | 'artistic' | 'canon' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  recommendation: string;
}
