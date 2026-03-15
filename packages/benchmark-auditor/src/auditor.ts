import {
  benchmarkAuditInputSchema,
  benchmarkAuditResultSchema,
  type BenchmarkAuditInput,
  type BenchmarkAuditResult,
  type BenchmarkDecisionShell,
  type BenchmarkFindingShell,
  type BenchmarkFlagShell,
  type SimilarityScoreShell
} from '@mikage/contracts';

const PASS_ORDER: BenchmarkFindingShell['pass'][] = [
  'benchmark_set_resolution',
  'gold_comparison',
  'silver_comparison',
  'red_flag_scan',
  'drift_score',
  'risk_score',
  'final_audit_decision'
];

const containsTerm = (haystack: string, term: string) =>
  haystack.toLowerCase().includes(term.toLowerCase());

const buildSimilarityScore = (
  label: SimilarityScoreShell['label'],
  promptText: string,
  referenceTerms: string[]
): SimilarityScoreShell => {
  const matchedTerms = referenceTerms.filter((term) => containsTerm(promptText, term));
  const missingTerms = referenceTerms.filter((term) => !containsTerm(promptText, term));
  const total = referenceTerms.length || 1;
  const score = matchedTerms.length / total;

  return {
    label,
    score: Number(score.toFixed(4)),
    matchedTerms,
    missingTerms
  };
};

export const auditBenchmark = (rawInput: BenchmarkAuditInput): BenchmarkAuditResult => {
  const input = benchmarkAuditInputSchema.parse(rawInput);
  const promptText = input.packageReference.productionPackage.promptBundle.compiledPrompt;
  const flags: BenchmarkFlagShell[] = [];

  const goldSimilarity = buildSimilarityScore(
    'gold_similarity',
    promptText,
    input.goldBenchmark.referenceTerms
  );
  const silverSimilarity = buildSimilarityScore(
    'silver_similarity',
    promptText,
    input.silverBenchmark.referenceTerms
  );

  const redTerms = input.redBenchmark.blockedTerms.filter((term) =>
    containsTerm(promptText, term)
  );

  for (const term of redTerms) {
    flags.push({
      code: `red_flag_${term.replace(/\s+/gu, '_')}`,
      severity: 'blocker',
      message: `Red benchmark blocked term present: ${term}`,
      metadata: {}
    });
  }

  const driftScore = {
    score: Number((redTerms.length / Math.max(input.redBenchmark.blockedTerms.length || 1, 1)).toFixed(4)),
    driftTerms: redTerms
  };

  const riskValue = Number(
    Math.max(
      driftScore.score,
      1 - goldSimilarity.score,
      1 - silverSimilarity.score / 2
    ).toFixed(4)
  );

  const riskScore = {
    score: riskValue,
    riskLevel:
      riskValue >= 0.75 ? 'high' : riskValue >= 0.35 ? 'medium' : 'low'
  } as const;

  if (goldSimilarity.score < 0.5) {
    flags.push({
      code: 'gold_similarity_low',
      severity: 'warning',
      message: 'Gold similarity fell below the deterministic threshold.',
      metadata: {}
    });
  }

  if (silverSimilarity.score < 0.34) {
    flags.push({
      code: 'silver_similarity_low',
      severity: 'warning',
      message: 'Silver similarity fell below the deterministic threshold.',
      metadata: {}
    });
  }

  const decision: BenchmarkDecisionShell =
    redTerms.length > 0 || riskScore.riskLevel === 'high'
      ? {
          decision: 'rejected',
          accepted: false,
          reasons: ['Red flag or high risk threshold exceeded.']
        }
      : flags.some((flag) => flag.severity === 'warning')
        ? {
            decision: 'review',
            accepted: false,
            reasons: ['Warnings require human review.']
          }
        : {
            decision: 'approved',
            accepted: true,
            reasons: []
          };

  const findings: BenchmarkFindingShell[] = [
    {
      pass: 'benchmark_set_resolution',
      summary: `Resolved ${input.benchmarkSets.length} benchmark set references.`,
      metadata: {}
    },
    {
      pass: 'gold_comparison',
      summary: `Gold similarity score: ${goldSimilarity.score.toFixed(4)}.`,
      metadata: {}
    },
    {
      pass: 'silver_comparison',
      summary: `Silver similarity score: ${silverSimilarity.score.toFixed(4)}.`,
      metadata: {}
    },
    {
      pass: 'red_flag_scan',
      summary: redTerms.length
        ? `Detected ${redTerms.length} red benchmark term(s).`
        : 'No red benchmark terms detected.',
      metadata: {}
    },
    {
      pass: 'drift_score',
      summary: `Drift score: ${driftScore.score.toFixed(4)}.`,
      metadata: {}
    },
    {
      pass: 'risk_score',
      summary: `Risk score: ${riskScore.score.toFixed(4)} (${riskScore.riskLevel}).`,
      metadata: {}
    },
    {
      pass: 'final_audit_decision',
      summary: `Final audit decision: ${decision.decision}.`,
      metadata: {}
    }
  ];

  return benchmarkAuditResultSchema.parse({
    requestCode: input.requestCode,
    status: decision.accepted ? 'validated' : 'rejected',
    benchmarkReferences: input.benchmarkSets,
    similarityScores: [goldSimilarity, silverSimilarity],
    driftScore,
    riskScore,
    flags,
    findings: PASS_ORDER.map((pass) => findings.find((item) => item.pass === pass) ?? {
      pass,
      summary: `${pass} evaluated.`,
      metadata: {}
    }),
    decision,
    summary: {
      requestCode: input.requestCode,
      benchmarkSetCount: input.benchmarkSets.length,
      flagCount: flags.length,
      decision: decision.decision
    },
    metadata: input.metadata
  });
};
