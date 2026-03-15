import { z } from 'zod';
export declare const ingestionSourceShellSchema: z.ZodObject<{
    sourceCode: z.ZodString;
    sourceKind: z.ZodEnum<["production_package", "benchmark_audit"]>;
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
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    metadata: Record<string, unknown>;
    sourceCode: string;
    sourceKind: "production_package" | "benchmark_audit";
}, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    sourceCode: string;
    sourceKind: "production_package" | "benchmark_audit";
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const ingestionAssetShellSchema: z.ZodObject<{
    assetCode: z.ZodString;
    assetKind: z.ZodEnum<["compiled_prompt", "negative_prompt", "validation_summary", "benchmark_audit_summary", "lineage_manifest"]>;
    contentType: z.ZodEnum<["text/plain", "application/json"]>;
    checksum: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
    assetCode: string;
    contentType: "text/plain" | "application/json";
    checksum: string;
}, {
    assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
    assetCode: string;
    contentType: "text/plain" | "application/json";
    checksum: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const ingestionArtifactShellSchema: z.ZodObject<{
    artifactCode: z.ZodString;
    assetCode: z.ZodString;
    artifactKind: z.ZodEnum<["prompt_bundle", "validation_report", "benchmark_report", "lineage_manifest"]>;
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
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    metadata: Record<string, unknown>;
    assetCode: string;
    artifactCode: string;
    artifactKind: "prompt_bundle" | "lineage_manifest" | "validation_report" | "benchmark_report";
}, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    assetCode: string;
    artifactCode: string;
    artifactKind: "prompt_bundle" | "lineage_manifest" | "validation_report" | "benchmark_report";
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const ingestionStatusShellSchema: z.ZodEnum<["received", "extracted", "persisted"]>;
export declare const ingestionInputSchema: z.ZodObject<{
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
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                    }, {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">>;
                    violations: z.ZodDefault<z.ZodArray<z.ZodObject<{
                        code: z.ZodString;
                        category: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                        message: z.ZodString;
                        severity: z.ZodEnum<["warning", "blocker"]>;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        severity: "warning" | "blocker";
                    }, {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                    warnings: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                    }[];
                    violations: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                    metadata?: Record<string, unknown> | undefined;
                    warnings?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    violations?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        severity: "warning" | "blocker";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                validation: {
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
                    warnings: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                    }[];
                    violations: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                    metadata?: Record<string, unknown> | undefined;
                    warnings?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    violations?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                    warnings: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                    }[];
                    violations: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                    metadata?: Record<string, unknown> | undefined;
                    warnings?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    violations?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                    warnings: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                    }[];
                    violations: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                    metadata?: Record<string, unknown> | undefined;
                    warnings?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    violations?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
    benchmarkAuditReference: z.ZodObject<{
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
        benchmarkAudit: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        benchmarkAudit: {
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
        };
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        benchmarkAudit: {
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
        };
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
                    warnings: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                    }[];
                    violations: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
    benchmarkAuditReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        benchmarkAudit: {
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
        };
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
                    metadata?: Record<string, unknown> | undefined;
                    warnings?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                    violations?: {
                        code: string;
                        message: string;
                        category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
    benchmarkAuditReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        benchmarkAudit: {
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
        };
    };
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const ingestionRequestSchema: z.ZodObject<{
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
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        }, {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            metadata?: Record<string, unknown> | undefined;
                        }>, "many">>;
                        violations: z.ZodDefault<z.ZodArray<z.ZodObject<{
                            code: z.ZodString;
                            category: z.ZodEnum<["ontology", "invariants", "philosophical_axes", "character_truth", "visual_grammar", "drift_risk"]>;
                            message: z.ZodString;
                            severity: z.ZodEnum<["warning", "blocker"]>;
                            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                        }, "strip", z.ZodTypeAny, {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            severity: "warning" | "blocker";
                        }, {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                        warnings: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        }[];
                        violations: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                        metadata?: Record<string, unknown> | undefined;
                        warnings?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        violations?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            severity: "warning" | "blocker";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    validation: {
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
                        warnings: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        }[];
                        violations: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                        metadata?: Record<string, unknown> | undefined;
                        warnings?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        violations?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                        warnings: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        }[];
                        violations: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                        metadata?: Record<string, unknown> | undefined;
                        warnings?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        violations?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                        warnings: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        }[];
                        violations: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
                        metadata?: Record<string, unknown> | undefined;
                        warnings?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        violations?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
        benchmarkAuditReference: z.ZodObject<{
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
            benchmarkAudit: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            benchmarkAudit: {
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
            };
        }, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            benchmarkAudit: {
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
            };
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
                        warnings: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        }[];
                        violations: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
        benchmarkAuditReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            benchmarkAudit: {
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
            };
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
                        metadata?: Record<string, unknown> | undefined;
                        warnings?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        violations?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
        benchmarkAuditReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            benchmarkAudit: {
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
            };
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
                        warnings: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                        }[];
                        violations: {
                            code: string;
                            message: string;
                            metadata: Record<string, unknown>;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
        benchmarkAuditReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            benchmarkAudit: {
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
            };
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
                        metadata?: Record<string, unknown> | undefined;
                        warnings?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
                            metadata?: Record<string, unknown> | undefined;
                        }[] | undefined;
                        violations?: {
                            code: string;
                            message: string;
                            category: "ontology" | "invariants" | "philosophical_axes" | "character_truth" | "visual_grammar" | "drift_risk";
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
        benchmarkAuditReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            benchmarkAudit: {
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
            };
        };
        metadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const ingestionResultSchema: z.ZodObject<{
    requestCode: z.ZodString;
    ingestionCode: z.ZodString;
    status: z.ZodEnum<["accepted", "validated", "rejected"]>;
    processingStatus: z.ZodEnum<["received", "extracted", "persisted"]>;
    sources: z.ZodArray<z.ZodObject<{
        sourceCode: z.ZodString;
        sourceKind: z.ZodEnum<["production_package", "benchmark_audit"]>;
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
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        metadata: Record<string, unknown>;
        sourceCode: string;
        sourceKind: "production_package" | "benchmark_audit";
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        sourceCode: string;
        sourceKind: "production_package" | "benchmark_audit";
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    assets: z.ZodArray<z.ZodObject<{
        assetCode: z.ZodString;
        assetKind: z.ZodEnum<["compiled_prompt", "negative_prompt", "validation_summary", "benchmark_audit_summary", "lineage_manifest"]>;
        contentType: z.ZodEnum<["text/plain", "application/json"]>;
        checksum: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
        assetCode: string;
        contentType: "text/plain" | "application/json";
        checksum: string;
    }, {
        assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
        assetCode: string;
        contentType: "text/plain" | "application/json";
        checksum: string;
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    artifacts: z.ZodArray<z.ZodObject<{
        artifactCode: z.ZodString;
        assetCode: z.ZodString;
        artifactKind: z.ZodEnum<["prompt_bundle", "validation_report", "benchmark_report", "lineage_manifest"]>;
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
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        metadata: Record<string, unknown>;
        assetCode: string;
        artifactCode: string;
        artifactKind: "prompt_bundle" | "lineage_manifest" | "validation_report" | "benchmark_report";
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        assetCode: string;
        artifactCode: string;
        artifactKind: "prompt_bundle" | "lineage_manifest" | "validation_report" | "benchmark_report";
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "accepted" | "validated" | "rejected";
    metadata: Record<string, unknown>;
    requestCode: string;
    ingestionCode: string;
    processingStatus: "received" | "extracted" | "persisted";
    sources: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        metadata: Record<string, unknown>;
        sourceCode: string;
        sourceKind: "production_package" | "benchmark_audit";
    }[];
    assets: {
        metadata: Record<string, unknown>;
        assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
        assetCode: string;
        contentType: "text/plain" | "application/json";
        checksum: string;
    }[];
    artifacts: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        metadata: Record<string, unknown>;
        assetCode: string;
        artifactCode: string;
        artifactKind: "prompt_bundle" | "lineage_manifest" | "validation_report" | "benchmark_report";
    }[];
}, {
    status: "accepted" | "validated" | "rejected";
    requestCode: string;
    ingestionCode: string;
    processingStatus: "received" | "extracted" | "persisted";
    sources: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        sourceCode: string;
        sourceKind: "production_package" | "benchmark_audit";
        metadata?: Record<string, unknown> | undefined;
    }[];
    assets: {
        assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
        assetCode: string;
        contentType: "text/plain" | "application/json";
        checksum: string;
        metadata?: Record<string, unknown> | undefined;
    }[];
    artifacts: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        assetCode: string;
        artifactCode: string;
        artifactKind: "prompt_bundle" | "lineage_manifest" | "validation_report" | "benchmark_report";
        metadata?: Record<string, unknown> | undefined;
    }[];
    metadata?: Record<string, unknown> | undefined;
}>;
export type IngestionSourceShell = z.infer<typeof ingestionSourceShellSchema>;
export type IngestionAssetShell = z.infer<typeof ingestionAssetShellSchema>;
export type IngestionArtifactShell = z.infer<typeof ingestionArtifactShellSchema>;
export type IngestionStatusShell = z.infer<typeof ingestionStatusShellSchema>;
export type IngestionInput = z.infer<typeof ingestionInputSchema>;
export type IngestionRequest = z.infer<typeof ingestionRequestSchema>;
export type IngestionResult = z.infer<typeof ingestionResultSchema>;
//# sourceMappingURL=index.d.ts.map