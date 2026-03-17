import { z } from 'zod';
export declare const benchmarkSetReferenceShellSchema: z.ZodObject<{
    setCode: z.ZodString;
    tier: z.ZodEnum<["gold", "silver", "red"]>;
    packetRef: z.ZodOptional<z.ZodObject<{
        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    }>>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    setCode: string;
    tier: "gold" | "silver" | "red";
    packetRef?: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    } | undefined;
}, {
    setCode: string;
    tier: "gold" | "silver" | "red";
    packetRef?: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    } | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const goldBenchmarkShellSchema: z.ZodObject<{
    referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    tier: z.ZodLiteral<"gold">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    tier: "gold";
    referenceTerms: string[];
    blockedTerms: string[];
}, {
    tier: "gold";
    metadata?: Record<string, unknown> | undefined;
    referenceTerms?: string[] | undefined;
    blockedTerms?: string[] | undefined;
}>;
export declare const silverBenchmarkShellSchema: z.ZodObject<{
    referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    tier: z.ZodLiteral<"silver">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    tier: "silver";
    referenceTerms: string[];
    blockedTerms: string[];
}, {
    tier: "silver";
    metadata?: Record<string, unknown> | undefined;
    referenceTerms?: string[] | undefined;
    blockedTerms?: string[] | undefined;
}>;
export declare const redBenchmarkShellSchema: z.ZodObject<{
    referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    tier: z.ZodLiteral<"red">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    tier: "red";
    referenceTerms: string[];
    blockedTerms: string[];
}, {
    tier: "red";
    metadata?: Record<string, unknown> | undefined;
    referenceTerms?: string[] | undefined;
    blockedTerms?: string[] | undefined;
}>;
export declare const similarityScoreShellSchema: z.ZodObject<{
    label: z.ZodEnum<["gold_similarity", "silver_similarity"]>;
    score: z.ZodNumber;
    matchedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    missingTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    label: "gold_similarity" | "silver_similarity";
    score: number;
    matchedTerms: string[];
    missingTerms: string[];
}, {
    label: "gold_similarity" | "silver_similarity";
    score: number;
    matchedTerms?: string[] | undefined;
    missingTerms?: string[] | undefined;
}>;
export declare const driftScoreShellSchema: z.ZodObject<{
    score: z.ZodNumber;
    driftTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    score: number;
    driftTerms: string[];
}, {
    score: number;
    driftTerms?: string[] | undefined;
}>;
export declare const riskScoreShellSchema: z.ZodObject<{
    score: z.ZodNumber;
    riskLevel: z.ZodEnum<["low", "medium", "high"]>;
}, "strip", z.ZodTypeAny, {
    score: number;
    riskLevel: "low" | "medium" | "high";
}, {
    score: number;
    riskLevel: "low" | "medium" | "high";
}>;
export declare const benchmarkFlagShellSchema: z.ZodObject<{
    code: z.ZodString;
    severity: z.ZodEnum<["info", "warning", "blocker"]>;
    message: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    metadata: Record<string, unknown>;
    severity: "warning" | "blocker" | "info";
}, {
    code: string;
    message: string;
    severity: "warning" | "blocker" | "info";
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const benchmarkFindingShellSchema: z.ZodObject<{
    pass: z.ZodEnum<["benchmark_set_resolution", "gold_comparison", "silver_comparison", "red_flag_scan", "drift_score", "risk_score", "final_audit_decision"]>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    summary: string;
    metadata: Record<string, unknown>;
    pass: "benchmark_set_resolution" | "gold_comparison" | "silver_comparison" | "red_flag_scan" | "drift_score" | "risk_score" | "final_audit_decision";
}, {
    summary: string;
    pass: "benchmark_set_resolution" | "gold_comparison" | "silver_comparison" | "red_flag_scan" | "drift_score" | "risk_score" | "final_audit_decision";
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const benchmarkDecisionShellSchema: z.ZodObject<{
    decision: z.ZodEnum<["approved", "review", "rejected"]>;
    accepted: z.ZodBoolean;
    reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    accepted: boolean;
    decision: "rejected" | "approved" | "review";
    reasons: string[];
}, {
    accepted: boolean;
    decision: "rejected" | "approved" | "review";
    reasons?: string[] | undefined;
}>;
export declare const benchmarkAuditInputSchema: z.ZodObject<{
    requestCode: z.ZodString;
    packageReference: z.ZodObject<{
        packetRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>;
        productionPackage: z.ZodObject<{
            packageCode: z.ZodString;
            status: z.ZodEnum<["accepted", "validated", "rejected"]>;
            packageMode: z.ZodEnum<["prompt_bundle_only", "production_ready", "production_with_audit_placeholder"]>;
            packageMetadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            job: z.ZodObject<{
                jobCode: z.ZodString;
                projectSlug: z.ZodString;
                presetCode: z.ZodString;
                variantCode: z.ZodString;
                providerCode: z.ZodString;
                outputCount: z.ZodNumber;
                metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                metadata: Record<string, unknown>;
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
            }, {
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            }>;
            compileReference: z.ZodObject<{
                packetRef: z.ZodObject<{
                    packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                    packetCode: z.ZodString;
                    packetVersion: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                }>;
                compiledPrompt: z.ZodObject<{
                    requestCode: z.ZodString;
                    compileMode: z.ZodEnum<["scene_preview", "script_support", "production_prompt"]>;
                    sections: z.ZodArray<z.ZodObject<{
                        key: z.ZodEnum<["system_frame", "canon_constraints", "context_packet_summary", "mode_payload", "output_instructions", "negative_prompt_shell", "lineage_metadata"]>;
                        title: z.ZodString;
                        content: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }, {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }>, "many">;
                    compiledPrompt: z.ZodString;
                    negativePrompt: z.ZodObject<{
                        clauses: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                        rendered: z.ZodDefault<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        clauses: string[];
                        rendered: string;
                    }, {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    }>;
                    lineage: z.ZodObject<{
                        requestCode: z.ZodString;
                        presetCode: z.ZodString;
                        variantCode: z.ZodString;
                        packetRefs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                            packetCode: z.ZodString;
                            packetVersion: z.ZodDefault<z.ZodNumber>;
                        }, "strip", z.ZodTypeAny, {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }, {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }>, "many">>;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    }, {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    }>;
                    validation: z.ZodObject<{
                        valid: z.ZodBoolean;
                        issues: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    }, "strip", z.ZodTypeAny, {
                        issues: string[];
                        valid: boolean;
                    }, {
                        valid: boolean;
                        issues?: string[] | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    validation: {
                        issues: string[];
                        valid: boolean;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                }, {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        issues: string[];
                        valid: boolean;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            }, {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            }>;
            validationReference: z.ZodObject<{
                packetRef: z.ZodObject<{
                    packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                    packetCode: z.ZodString;
                    packetVersion: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                }>;
                validation: z.ZodObject<{
                    requestCode: z.ZodString;
                    status: z.ZodEnum<["accepted", "validated", "rejected"]>;
                    decision: z.ZodEnum<["accepted", "rejected"]>;
                    passResults: z.ZodArray<z.ZodObject<{
                        pass: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                        passed: z.ZodBoolean;
                        score: z.ZodNumber;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        metadata: Record<string, unknown>;
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                    }, {
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">;
                    warnings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        code: z.ZodString;
                        category: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                        message: z.ZodString;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }, {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">>;
                    violations: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        code: z.ZodString;
                        category: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                        message: z.ZodString;
                        severity: z.ZodEnum<["warning", "blocker"]>;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        severity: "warning" | "blocker";
                    }, {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        severity: "warning" | "blocker";
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">>;
                    summary: z.ZodObject<{
                        totalPasses: z.ZodNumber;
                        passedChecks: z.ZodNumber;
                        warningCount: z.ZodNumber;
                        violationCount: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    }, {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    }>;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    warnings: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        metadata: Record<string, unknown>;
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                    }[];
                    violations: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        severity: "warning" | "blocker";
                    }[];
                }, {
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    warnings?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    violations?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        severity: "warning" | "blocker";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                validation: {
                    warnings: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        metadata: Record<string, unknown>;
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                    }[];
                    violations: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        severity: "warning" | "blocker";
                    }[];
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            }, {
                validation: {
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    warnings?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    violations?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        severity: "warning" | "blocker";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            }>;
            promptBundle: z.ZodObject<{
                compiledPrompt: z.ZodString;
                negativePrompt: z.ZodString;
                sections: z.ZodArray<z.ZodObject<{
                    key: z.ZodEnum<["system_frame", "canon_constraints", "context_packet_summary", "mode_payload", "output_instructions", "negative_prompt_shell", "lineage_metadata"]>;
                    title: z.ZodString;
                    content: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }, {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            }, {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            }>;
            benchmarkAudit: z.ZodObject<{
                auditCode: z.ZodString;
                status: z.ZodDefault<z.ZodEnum<["pending", "not_requested"]>>;
                notes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            }, {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            }>;
            decision: z.ZodObject<{
                decision: z.ZodEnum<["accepted", "rejected"]>;
                accepted: z.ZodBoolean;
                rejectionReasons: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    code: z.ZodString;
                    message: z.ZodString;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }, {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            }, {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            }>;
            summary: z.ZodObject<{
                packageCode: z.ZodString;
                sectionCount: z.ZodNumber;
                validationDecision: z.ZodEnum<["accepted", "rejected"]>;
                benchmarkAuditStatus: z.ZodEnum<["pending", "not_requested"]>;
                outputCount: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            }, {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            }>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "validated" | "rejected";
            summary: {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            decision: {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                metadata: Record<string, unknown>;
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        issues: string[];
                        valid: boolean;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
            validationReference: {
                validation: {
                    warnings: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        metadata: Record<string, unknown>;
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                    }[];
                    violations: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        severity: "warning" | "blocker";
                    }[];
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
            packageMetadata: Record<string, unknown>;
            promptBundle: {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            };
        }, {
            status: "accepted" | "validated" | "rejected";
            summary: {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            decision: {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    warnings?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    violations?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        severity: "warning" | "blocker";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            promptBundle: {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        productionPackage: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            decision: {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                metadata: Record<string, unknown>;
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        issues: string[];
                        valid: boolean;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
            validationReference: {
                validation: {
                    warnings: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        metadata: Record<string, unknown>;
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                    }[];
                    violations: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        severity: "warning" | "blocker";
                    }[];
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
            packageMetadata: Record<string, unknown>;
            promptBundle: {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            };
        };
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        productionPackage: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            decision: {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    warnings?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    violations?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        severity: "warning" | "blocker";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            promptBundle: {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        };
    }>;
    benchmarkSets: z.ZodArray<z.ZodObject<{
        setCode: z.ZodString;
        tier: z.ZodEnum<["gold", "silver", "red"]>;
        packetRef: z.ZodOptional<z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        } | undefined;
    }, {
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        } | undefined;
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    goldBenchmark: z.ZodObject<{
        referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        tier: z.ZodLiteral<"gold">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        tier: "gold";
        referenceTerms: string[];
        blockedTerms: string[];
    }, {
        tier: "gold";
        metadata?: Record<string, unknown> | undefined;
        referenceTerms?: string[] | undefined;
        blockedTerms?: string[] | undefined;
    }>;
    silverBenchmark: z.ZodObject<{
        referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        tier: z.ZodLiteral<"silver">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        tier: "silver";
        referenceTerms: string[];
        blockedTerms: string[];
    }, {
        tier: "silver";
        metadata?: Record<string, unknown> | undefined;
        referenceTerms?: string[] | undefined;
        blockedTerms?: string[] | undefined;
    }>;
    redBenchmark: z.ZodObject<{
        referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        tier: z.ZodLiteral<"red">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        tier: "red";
        referenceTerms: string[];
        blockedTerms: string[];
    }, {
        tier: "red";
        metadata?: Record<string, unknown> | undefined;
        referenceTerms?: string[] | undefined;
        blockedTerms?: string[] | undefined;
    }>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requestCode: string;
    packageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        productionPackage: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            decision: {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                metadata: Record<string, unknown>;
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        issues: string[];
                        valid: boolean;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
            validationReference: {
                validation: {
                    warnings: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        metadata: Record<string, unknown>;
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                    }[];
                    violations: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        severity: "warning" | "blocker";
                    }[];
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
            packageMetadata: Record<string, unknown>;
            promptBundle: {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            };
        };
    };
    benchmarkSets: {
        metadata: Record<string, unknown>;
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        } | undefined;
    }[];
    goldBenchmark: {
        metadata: Record<string, unknown>;
        tier: "gold";
        referenceTerms: string[];
        blockedTerms: string[];
    };
    silverBenchmark: {
        metadata: Record<string, unknown>;
        tier: "silver";
        referenceTerms: string[];
        blockedTerms: string[];
    };
    redBenchmark: {
        metadata: Record<string, unknown>;
        tier: "red";
        referenceTerms: string[];
        blockedTerms: string[];
    };
}, {
    requestCode: string;
    packageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        productionPackage: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                outputCount: number;
                packageCode: string;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            decision: {
                accepted: boolean;
                decision: "accepted" | "rejected";
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                presetCode: string;
                variantCode: string;
                projectSlug: string;
                jobCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "validated" | "rejected";
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    passResults: {
                        pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        passed: boolean;
                        score: number;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    warnings?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    violations?: {
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        code: string;
                        message: string;
                        severity: "warning" | "blocker";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            promptBundle: {
                negativePrompt: string;
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        };
    };
    benchmarkSets: {
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        } | undefined;
        metadata?: Record<string, unknown> | undefined;
    }[];
    goldBenchmark: {
        tier: "gold";
        metadata?: Record<string, unknown> | undefined;
        referenceTerms?: string[] | undefined;
        blockedTerms?: string[] | undefined;
    };
    silverBenchmark: {
        tier: "silver";
        metadata?: Record<string, unknown> | undefined;
        referenceTerms?: string[] | undefined;
        blockedTerms?: string[] | undefined;
    };
    redBenchmark: {
        tier: "red";
        metadata?: Record<string, unknown> | undefined;
        referenceTerms?: string[] | undefined;
        blockedTerms?: string[] | undefined;
    };
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const benchmarkAuditRequestSchema: z.ZodObject<{
    requestCode: z.ZodString;
    input: z.ZodObject<{
        requestCode: z.ZodString;
        packageReference: z.ZodObject<{
            packetRef: z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>;
            productionPackage: z.ZodObject<{
                packageCode: z.ZodString;
                status: z.ZodEnum<["accepted", "validated", "rejected"]>;
                packageMode: z.ZodEnum<["prompt_bundle_only", "production_ready", "production_with_audit_placeholder"]>;
                packageMetadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                job: z.ZodObject<{
                    jobCode: z.ZodString;
                    projectSlug: z.ZodString;
                    presetCode: z.ZodString;
                    variantCode: z.ZodString;
                    providerCode: z.ZodString;
                    outputCount: z.ZodNumber;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    metadata: Record<string, unknown>;
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                }, {
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                }>;
                compileReference: z.ZodObject<{
                    packetRef: z.ZodObject<{
                        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                        packetCode: z.ZodString;
                        packetVersion: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }>;
                    compiledPrompt: z.ZodObject<{
                        requestCode: z.ZodString;
                        compileMode: z.ZodEnum<["scene_preview", "script_support", "production_prompt"]>;
                        sections: z.ZodArray<z.ZodObject<{
                            key: z.ZodEnum<["system_frame", "canon_constraints", "context_packet_summary", "mode_payload", "output_instructions", "negative_prompt_shell", "lineage_metadata"]>;
                            title: z.ZodString;
                            content: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }, {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }>, "many">;
                        compiledPrompt: z.ZodString;
                        negativePrompt: z.ZodObject<{
                            clauses: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                            rendered: z.ZodDefault<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            clauses: string[];
                            rendered: string;
                        }, {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        }>;
                        lineage: z.ZodObject<{
                            requestCode: z.ZodString;
                            presetCode: z.ZodString;
                            variantCode: z.ZodString;
                            packetRefs: z.ZodDefault<z.ZodArray<z.ZodObject<{
                                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                                packetCode: z.ZodString;
                                packetVersion: z.ZodDefault<z.ZodNumber>;
                            }, "strip", z.ZodTypeAny, {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }, {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }>, "many">>;
                            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                        }, "strip", z.ZodTypeAny, {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        }, {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        }>;
                        validation: z.ZodObject<{
                            valid: z.ZodBoolean;
                            issues: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                        }, "strip", z.ZodTypeAny, {
                            issues: string[];
                            valid: boolean;
                        }, {
                            valid: boolean;
                            issues?: string[] | undefined;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        validation: {
                            issues: string[];
                            valid: boolean;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    }, {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            issues: string[];
                            valid: boolean;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                }, {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                }>;
                validationReference: z.ZodObject<{
                    packetRef: z.ZodObject<{
                        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                        packetCode: z.ZodString;
                        packetVersion: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }>;
                    validation: z.ZodObject<{
                        requestCode: z.ZodString;
                        status: z.ZodEnum<["accepted", "validated", "rejected"]>;
                        decision: z.ZodEnum<["accepted", "rejected"]>;
                        passResults: z.ZodArray<z.ZodObject<{
                            pass: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                            passed: z.ZodBoolean;
                            score: z.ZodNumber;
                            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                        }, "strip", z.ZodTypeAny, {
                            metadata: Record<string, unknown>;
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                        }, {
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                            metadata?: Record<string, unknown> | undefined;
                        }>, "many">;
                        warnings: z.ZodDefault<z.ZodArray<z.ZodObject<{
                            code: z.ZodString;
                            category: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                            message: z.ZodString;
                            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                        }, "strip", z.ZodTypeAny, {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                        }, {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata?: Record<string, unknown> | undefined;
                        }>, "many">>;
                        violations: z.ZodDefault<z.ZodArray<z.ZodObject<{
                            code: z.ZodString;
                            category: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                            message: z.ZodString;
                            severity: z.ZodEnum<["warning", "blocker"]>;
                            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                        }, "strip", z.ZodTypeAny, {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            severity: "warning" | "blocker";
                        }, {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }>, "many">>;
                        summary: z.ZodObject<{
                            totalPasses: z.ZodNumber;
                            passedChecks: z.ZodNumber;
                            warningCount: z.ZodNumber;
                            violationCount: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        }, {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        }>;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        warnings: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                        }[];
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            metadata: Record<string, unknown>;
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                        }[];
                        violations: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            severity: "warning" | "blocker";
                        }[];
                    }, {
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        warnings?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        metadata?: Record<string, unknown> | undefined;
                        violations?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    validation: {
                        warnings: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                        }[];
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            metadata: Record<string, unknown>;
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                        }[];
                        violations: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            severity: "warning" | "blocker";
                        }[];
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                }, {
                    validation: {
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        warnings?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        metadata?: Record<string, unknown> | undefined;
                        violations?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                }>;
                promptBundle: z.ZodObject<{
                    compiledPrompt: z.ZodString;
                    negativePrompt: z.ZodString;
                    sections: z.ZodArray<z.ZodObject<{
                        key: z.ZodEnum<["system_frame", "canon_constraints", "context_packet_summary", "mode_payload", "output_instructions", "negative_prompt_shell", "lineage_metadata"]>;
                        title: z.ZodString;
                        content: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }, {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                }, {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                }>;
                benchmarkAudit: z.ZodObject<{
                    auditCode: z.ZodString;
                    status: z.ZodDefault<z.ZodEnum<["pending", "not_requested"]>>;
                    notes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                }, {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                }>;
                decision: z.ZodObject<{
                    decision: z.ZodEnum<["accepted", "rejected"]>;
                    accepted: z.ZodBoolean;
                    rejectionReasons: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        code: z.ZodString;
                        message: z.ZodString;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }, {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                }, {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                }>;
                summary: z.ZodObject<{
                    packageCode: z.ZodString;
                    sectionCount: z.ZodNumber;
                    validationDecision: z.ZodEnum<["accepted", "rejected"]>;
                    benchmarkAuditStatus: z.ZodEnum<["pending", "not_requested"]>;
                    outputCount: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                }, {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                }>;
            }, "strip", z.ZodTypeAny, {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    metadata: Record<string, unknown>;
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            issues: string[];
                            valid: boolean;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        warnings: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                        }[];
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            metadata: Record<string, unknown>;
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                        }[];
                        violations: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            severity: "warning" | "blocker";
                        }[];
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
                packageMetadata: Record<string, unknown>;
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            }, {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        warnings?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        metadata?: Record<string, unknown> | undefined;
                        violations?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            productionPackage: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    metadata: Record<string, unknown>;
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            issues: string[];
                            valid: boolean;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        warnings: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                        }[];
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            metadata: Record<string, unknown>;
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                        }[];
                        violations: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            severity: "warning" | "blocker";
                        }[];
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
                packageMetadata: Record<string, unknown>;
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
        }, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            productionPackage: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        warnings?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        metadata?: Record<string, unknown> | undefined;
                        violations?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            };
        }>;
        benchmarkSets: z.ZodArray<z.ZodObject<{
            setCode: z.ZodString;
            tier: z.ZodEnum<["gold", "silver", "red"]>;
            packetRef: z.ZodOptional<z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            setCode: string;
            tier: "gold" | "silver" | "red";
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            } | undefined;
        }, {
            setCode: string;
            tier: "gold" | "silver" | "red";
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            } | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>, "many">;
        goldBenchmark: z.ZodObject<{
            referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            tier: z.ZodLiteral<"gold">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            tier: "gold";
            referenceTerms: string[];
            blockedTerms: string[];
        }, {
            tier: "gold";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        }>;
        silverBenchmark: z.ZodObject<{
            referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            tier: z.ZodLiteral<"silver">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            tier: "silver";
            referenceTerms: string[];
            blockedTerms: string[];
        }, {
            tier: "silver";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        }>;
        redBenchmark: z.ZodObject<{
            referenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            blockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            tier: z.ZodLiteral<"red">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            tier: "red";
            referenceTerms: string[];
            blockedTerms: string[];
        }, {
            tier: "red";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        }>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requestCode: string;
        packageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            productionPackage: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    metadata: Record<string, unknown>;
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            issues: string[];
                            valid: boolean;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        warnings: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                        }[];
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            metadata: Record<string, unknown>;
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                        }[];
                        violations: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            severity: "warning" | "blocker";
                        }[];
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
                packageMetadata: Record<string, unknown>;
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
        };
        benchmarkSets: {
            metadata: Record<string, unknown>;
            setCode: string;
            tier: "gold" | "silver" | "red";
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            } | undefined;
        }[];
        goldBenchmark: {
            metadata: Record<string, unknown>;
            tier: "gold";
            referenceTerms: string[];
            blockedTerms: string[];
        };
        silverBenchmark: {
            metadata: Record<string, unknown>;
            tier: "silver";
            referenceTerms: string[];
            blockedTerms: string[];
        };
        redBenchmark: {
            metadata: Record<string, unknown>;
            tier: "red";
            referenceTerms: string[];
            blockedTerms: string[];
        };
    }, {
        requestCode: string;
        packageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            productionPackage: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        warnings?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        metadata?: Record<string, unknown> | undefined;
                        violations?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            };
        };
        benchmarkSets: {
            setCode: string;
            tier: "gold" | "silver" | "red";
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            } | undefined;
            metadata?: Record<string, unknown> | undefined;
        }[];
        goldBenchmark: {
            tier: "gold";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        };
        silverBenchmark: {
            tier: "silver";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        };
        redBenchmark: {
            tier: "red";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    requestCode: string;
    input: {
        metadata: Record<string, unknown>;
        requestCode: string;
        packageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            productionPackage: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    metadata: Record<string, unknown>;
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            issues: string[];
                            valid: boolean;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        warnings: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                        }[];
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            metadata: Record<string, unknown>;
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                        }[];
                        violations: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            severity: "warning" | "blocker";
                        }[];
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
                packageMetadata: Record<string, unknown>;
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
            };
        };
        benchmarkSets: {
            metadata: Record<string, unknown>;
            setCode: string;
            tier: "gold" | "silver" | "red";
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            } | undefined;
        }[];
        goldBenchmark: {
            metadata: Record<string, unknown>;
            tier: "gold";
            referenceTerms: string[];
            blockedTerms: string[];
        };
        silverBenchmark: {
            metadata: Record<string, unknown>;
            tier: "silver";
            referenceTerms: string[];
            blockedTerms: string[];
        };
        redBenchmark: {
            metadata: Record<string, unknown>;
            tier: "red";
            referenceTerms: string[];
            blockedTerms: string[];
        };
    };
}, {
    requestCode: string;
    input: {
        requestCode: string;
        packageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            productionPackage: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    outputCount: number;
                    packageCode: string;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                decision: {
                    accepted: boolean;
                    decision: "accepted" | "rejected";
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    presetCode: string;
                    variantCode: string;
                    projectSlug: string;
                    jobCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "validated" | "rejected";
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
                        requestCode: string;
                        decision: "accepted" | "rejected";
                        passResults: {
                            pass: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            passed: boolean;
                            score: number;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        warnings?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        metadata?: Record<string, unknown> | undefined;
                        violations?: {
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            code: string;
                            message: string;
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                    };
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                promptBundle: {
                    negativePrompt: string;
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            };
        };
        benchmarkSets: {
            setCode: string;
            tier: "gold" | "silver" | "red";
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            } | undefined;
            metadata?: Record<string, unknown> | undefined;
        }[];
        goldBenchmark: {
            tier: "gold";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        };
        silverBenchmark: {
            tier: "silver";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        };
        redBenchmark: {
            tier: "red";
            metadata?: Record<string, unknown> | undefined;
            referenceTerms?: string[] | undefined;
            blockedTerms?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const benchmarkSummaryShellSchema: z.ZodObject<{
    requestCode: z.ZodString;
    benchmarkSetCount: z.ZodNumber;
    flagCount: z.ZodNumber;
    decision: z.ZodEnum<["approved", "review", "rejected"]>;
}, "strip", z.ZodTypeAny, {
    requestCode: string;
    decision: "rejected" | "approved" | "review";
    benchmarkSetCount: number;
    flagCount: number;
}, {
    requestCode: string;
    decision: "rejected" | "approved" | "review";
    benchmarkSetCount: number;
    flagCount: number;
}>;
export declare const benchmarkAuditResultSchema: z.ZodObject<{
    requestCode: z.ZodString;
    status: z.ZodEnum<["accepted", "validated", "rejected"]>;
    benchmarkReferences: z.ZodArray<z.ZodObject<{
        setCode: z.ZodString;
        tier: z.ZodEnum<["gold", "silver", "red"]>;
        packetRef: z.ZodOptional<z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        } | undefined;
    }, {
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        } | undefined;
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    similarityScores: z.ZodArray<z.ZodObject<{
        label: z.ZodEnum<["gold_similarity", "silver_similarity"]>;
        score: z.ZodNumber;
        matchedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        missingTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        label: "gold_similarity" | "silver_similarity";
        score: number;
        matchedTerms: string[];
        missingTerms: string[];
    }, {
        label: "gold_similarity" | "silver_similarity";
        score: number;
        matchedTerms?: string[] | undefined;
        missingTerms?: string[] | undefined;
    }>, "many">;
    driftScore: z.ZodObject<{
        score: z.ZodNumber;
        driftTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        score: number;
        driftTerms: string[];
    }, {
        score: number;
        driftTerms?: string[] | undefined;
    }>;
    riskScore: z.ZodObject<{
        score: z.ZodNumber;
        riskLevel: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        score: number;
        riskLevel: "low" | "medium" | "high";
    }, {
        score: number;
        riskLevel: "low" | "medium" | "high";
    }>;
    flags: z.ZodDefault<z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        severity: z.ZodEnum<["info", "warning", "blocker"]>;
        message: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        metadata: Record<string, unknown>;
        severity: "warning" | "blocker" | "info";
    }, {
        code: string;
        message: string;
        severity: "warning" | "blocker" | "info";
        metadata?: Record<string, unknown> | undefined;
    }>, "many">>;
    findings: z.ZodArray<z.ZodObject<{
        pass: z.ZodEnum<["benchmark_set_resolution", "gold_comparison", "silver_comparison", "red_flag_scan", "drift_score", "risk_score", "final_audit_decision"]>;
        summary: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        summary: string;
        metadata: Record<string, unknown>;
        pass: "benchmark_set_resolution" | "gold_comparison" | "silver_comparison" | "red_flag_scan" | "drift_score" | "risk_score" | "final_audit_decision";
    }, {
        summary: string;
        pass: "benchmark_set_resolution" | "gold_comparison" | "silver_comparison" | "red_flag_scan" | "drift_score" | "risk_score" | "final_audit_decision";
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    decision: z.ZodObject<{
        decision: z.ZodEnum<["approved", "review", "rejected"]>;
        accepted: z.ZodBoolean;
        reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        accepted: boolean;
        decision: "rejected" | "approved" | "review";
        reasons: string[];
    }, {
        accepted: boolean;
        decision: "rejected" | "approved" | "review";
        reasons?: string[] | undefined;
    }>;
    summary: z.ZodObject<{
        requestCode: z.ZodString;
        benchmarkSetCount: z.ZodNumber;
        flagCount: z.ZodNumber;
        decision: z.ZodEnum<["approved", "review", "rejected"]>;
    }, "strip", z.ZodTypeAny, {
        requestCode: string;
        decision: "rejected" | "approved" | "review";
        benchmarkSetCount: number;
        flagCount: number;
    }, {
        requestCode: string;
        decision: "rejected" | "approved" | "review";
        benchmarkSetCount: number;
        flagCount: number;
    }>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "accepted" | "validated" | "rejected";
    summary: {
        requestCode: string;
        decision: "rejected" | "approved" | "review";
        benchmarkSetCount: number;
        flagCount: number;
    };
    metadata: Record<string, unknown>;
    requestCode: string;
    decision: {
        accepted: boolean;
        decision: "rejected" | "approved" | "review";
        reasons: string[];
    };
    benchmarkReferences: {
        metadata: Record<string, unknown>;
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        } | undefined;
    }[];
    similarityScores: {
        label: "gold_similarity" | "silver_similarity";
        score: number;
        matchedTerms: string[];
        missingTerms: string[];
    }[];
    driftScore: {
        score: number;
        driftTerms: string[];
    };
    riskScore: {
        score: number;
        riskLevel: "low" | "medium" | "high";
    };
    flags: {
        code: string;
        message: string;
        metadata: Record<string, unknown>;
        severity: "warning" | "blocker" | "info";
    }[];
    findings: {
        summary: string;
        metadata: Record<string, unknown>;
        pass: "benchmark_set_resolution" | "gold_comparison" | "silver_comparison" | "red_flag_scan" | "drift_score" | "risk_score" | "final_audit_decision";
    }[];
}, {
    status: "accepted" | "validated" | "rejected";
    summary: {
        requestCode: string;
        decision: "rejected" | "approved" | "review";
        benchmarkSetCount: number;
        flagCount: number;
    };
    requestCode: string;
    decision: {
        accepted: boolean;
        decision: "rejected" | "approved" | "review";
        reasons?: string[] | undefined;
    };
    benchmarkReferences: {
        setCode: string;
        tier: "gold" | "silver" | "red";
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        } | undefined;
        metadata?: Record<string, unknown> | undefined;
    }[];
    similarityScores: {
        label: "gold_similarity" | "silver_similarity";
        score: number;
        matchedTerms?: string[] | undefined;
        missingTerms?: string[] | undefined;
    }[];
    driftScore: {
        score: number;
        driftTerms?: string[] | undefined;
    };
    riskScore: {
        score: number;
        riskLevel: "low" | "medium" | "high";
    };
    findings: {
        summary: string;
        pass: "benchmark_set_resolution" | "gold_comparison" | "silver_comparison" | "red_flag_scan" | "drift_score" | "risk_score" | "final_audit_decision";
        metadata?: Record<string, unknown> | undefined;
    }[];
    metadata?: Record<string, unknown> | undefined;
    flags?: {
        code: string;
        message: string;
        severity: "warning" | "blocker" | "info";
        metadata?: Record<string, unknown> | undefined;
    }[] | undefined;
}>;
export type BenchmarkSetReferenceShell = z.infer<typeof benchmarkSetReferenceShellSchema>;
export type GoldBenchmarkShell = z.infer<typeof goldBenchmarkShellSchema>;
export type SilverBenchmarkShell = z.infer<typeof silverBenchmarkShellSchema>;
export type RedBenchmarkShell = z.infer<typeof redBenchmarkShellSchema>;
export type SimilarityScoreShell = z.infer<typeof similarityScoreShellSchema>;
export type DriftScoreShell = z.infer<typeof driftScoreShellSchema>;
export type RiskScoreShell = z.infer<typeof riskScoreShellSchema>;
export type BenchmarkFlagShell = z.infer<typeof benchmarkFlagShellSchema>;
export type BenchmarkFindingShell = z.infer<typeof benchmarkFindingShellSchema>;
export type BenchmarkDecisionShell = z.infer<typeof benchmarkDecisionShellSchema>;
export type BenchmarkAuditInput = z.infer<typeof benchmarkAuditInputSchema>;
export type BenchmarkAuditRequest = z.infer<typeof benchmarkAuditRequestSchema>;
export type BenchmarkSummaryShell = z.infer<typeof benchmarkSummaryShellSchema>;
export type BenchmarkAuditResult = z.infer<typeof benchmarkAuditResultSchema>;
//# sourceMappingURL=index.d.ts.map