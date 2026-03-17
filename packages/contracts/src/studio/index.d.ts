import { z } from 'zod';
export declare const studioActionTypeSchema: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
export declare const studioPanelShellSchema: z.ZodObject<{
    panelCode: z.ZodString;
    panelKind: z.ZodEnum<["package_inspector", "validation_inspector", "lineage_inspector", "queue_projection"]>;
    title: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    panelCode: string;
    panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
    title: string;
}, {
    panelCode: string;
    panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
    title: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const studioViewShellSchema: z.ZodObject<{
    viewCode: z.ZodString;
    activePanelCode: z.ZodString;
    mode: z.ZodEnum<["inspect", "queue"]>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    viewCode: string;
    activePanelCode: string;
    mode: "inspect" | "queue";
}, {
    viewCode: string;
    activePanelCode: string;
    mode: "inspect" | "queue";
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const studioQueueItemShellSchema: z.ZodObject<{
    itemCode: z.ZodString;
    queueType: z.ZodEnum<["generation", "benchmark_review", "persistence_review"]>;
    requestCode: z.ZodString;
    targetCode: z.ZodString;
    status: z.ZodEnum<["projected", "held"]>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "projected" | "held";
    metadata: Record<string, unknown>;
    requestCode: string;
    itemCode: string;
    queueType: "generation" | "benchmark_review" | "persistence_review";
    targetCode: string;
}, {
    status: "projected" | "held";
    requestCode: string;
    itemCode: string;
    queueType: "generation" | "benchmark_review" | "persistence_review";
    targetCode: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const studioQueueShellSchema: z.ZodObject<{
    queueCode: z.ZodString;
    queueType: z.ZodEnum<["generation", "benchmark_review", "persistence_review"]>;
    items: z.ZodArray<z.ZodObject<{
        itemCode: z.ZodString;
        queueType: z.ZodEnum<["generation", "benchmark_review", "persistence_review"]>;
        requestCode: z.ZodString;
        targetCode: z.ZodString;
        status: z.ZodEnum<["projected", "held"]>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: "projected" | "held";
        metadata: Record<string, unknown>;
        requestCode: string;
        itemCode: string;
        queueType: "generation" | "benchmark_review" | "persistence_review";
        targetCode: string;
    }, {
        status: "projected" | "held";
        requestCode: string;
        itemCode: string;
        queueType: "generation" | "benchmark_review" | "persistence_review";
        targetCode: string;
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    queueType: "generation" | "benchmark_review" | "persistence_review";
    queueCode: string;
    items: {
        status: "projected" | "held";
        metadata: Record<string, unknown>;
        requestCode: string;
        itemCode: string;
        queueType: "generation" | "benchmark_review" | "persistence_review";
        targetCode: string;
    }[];
}, {
    queueType: "generation" | "benchmark_review" | "persistence_review";
    queueCode: string;
    items: {
        status: "projected" | "held";
        requestCode: string;
        itemCode: string;
        queueType: "generation" | "benchmark_review" | "persistence_review";
        targetCode: string;
        metadata?: Record<string, unknown> | undefined;
    }[];
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const studioStatusShellSchema: z.ZodEnum<["ready", "queued", "inspection_ready", "review_required"]>;
export declare const studioFilterShellSchema: z.ZodObject<{
    filterCode: z.ZodString;
    scope: z.ZodEnum<["package", "validation", "lineage", "queue"]>;
    terms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    filterCode: string;
    scope: "validation" | "package" | "lineage" | "queue";
    terms: string[];
}, {
    filterCode: string;
    scope: "validation" | "package" | "lineage" | "queue";
    metadata?: Record<string, unknown> | undefined;
    terms?: string[] | undefined;
}>;
export declare const studioSelectionShellSchema: z.ZodObject<{
    selectionCode: z.ZodString;
    selectedPacketRef: z.ZodObject<{
        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    }>;
    selectedCodes: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    selectionCode: string;
    selectedPacketRef: {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    selectedCodes: string[];
}, {
    selectionCode: string;
    selectedPacketRef: {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    selectedCodes: string[];
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const studioArtifactReferenceShellSchema: z.ZodObject<{
    packetRef: z.ZodObject<{
        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
            jobCode: string;
            projectSlug: string;
            presetCode: string;
            variantCode: string;
            providerCode: string;
            outputCount: number;
        }, {
            jobCode: string;
            projectSlug: string;
            presetCode: string;
            variantCode: string;
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }[];
                }, {
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    metadata?: Record<string, unknown> | undefined;
                    packetRefs?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }[] | undefined;
                }>;
                validation: z.ZodObject<{
                    valid: z.ZodBoolean;
                    issues: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    valid: boolean;
                    issues: string[];
                }, {
                    valid: boolean;
                    issues?: string[] | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                validation: {
                    valid: boolean;
                    issues: string[];
                };
                requestCode: string;
                lineage: {
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    packetRefs: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }[];
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses: string[];
                    rendered: string;
                };
            }, {
                validation: {
                    valid: boolean;
                    issues?: string[] | undefined;
                };
                requestCode: string;
                lineage: {
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    metadata?: Record<string, unknown> | undefined;
                    packetRefs?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }[] | undefined;
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses?: string[] | undefined;
                    rendered?: string | undefined;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            compiledPrompt: {
                validation: {
                    valid: boolean;
                    issues: string[];
                };
                requestCode: string;
                lineage: {
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    packetRefs: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }[];
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses: string[];
                    rendered: string;
                };
            };
        }, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            compiledPrompt: {
                validation: {
                    valid: boolean;
                    issues?: string[] | undefined;
                };
                requestCode: string;
                lineage: {
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    metadata?: Record<string, unknown> | undefined;
                    packetRefs?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }[] | undefined;
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses?: string[] | undefined;
                    rendered?: string | undefined;
                };
            };
        }>;
        validationReference: z.ZodObject<{
            packetRef: z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
        }, {
            validation: {
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
            sections: {
                title: string;
                key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                content: string;
            }[];
            compiledPrompt: string;
            negativePrompt: string;
        }, {
            sections: {
                title: string;
                key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                content: string;
            }[];
            compiledPrompt: string;
            negativePrompt: string;
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
            decision: "accepted" | "rejected";
            accepted: boolean;
            rejectionReasons: {
                code: string;
                message: string;
                metadata: Record<string, unknown>;
            }[];
        }, {
            decision: "accepted" | "rejected";
            accepted: boolean;
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
            packageCode: string;
            outputCount: number;
            sectionCount: number;
            validationDecision: "accepted" | "rejected";
            benchmarkAuditStatus: "pending" | "not_requested";
        }, {
            packageCode: string;
            outputCount: number;
            sectionCount: number;
            validationDecision: "accepted" | "rejected";
            benchmarkAuditStatus: "pending" | "not_requested";
        }>;
    }, "strip", z.ZodTypeAny, {
        status: "accepted" | "rejected" | "validated";
        decision: {
            decision: "accepted" | "rejected";
            accepted: boolean;
            rejectionReasons: {
                code: string;
                message: string;
                metadata: Record<string, unknown>;
            }[];
        };
        summary: {
            packageCode: string;
            outputCount: number;
            sectionCount: number;
            validationDecision: "accepted" | "rejected";
            benchmarkAuditStatus: "pending" | "not_requested";
        };
        packageCode: string;
        packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
        packageMetadata: Record<string, unknown>;
        job: {
            metadata: Record<string, unknown>;
            jobCode: string;
            projectSlug: string;
            presetCode: string;
            variantCode: string;
            providerCode: string;
            outputCount: number;
        };
        compileReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            compiledPrompt: {
                validation: {
                    valid: boolean;
                    issues: string[];
                };
                requestCode: string;
                lineage: {
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    packetRefs: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }[];
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses: string[];
                    rendered: string;
                };
            };
        };
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
        };
        promptBundle: {
            sections: {
                title: string;
                key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                content: string;
            }[];
            compiledPrompt: string;
            negativePrompt: string;
        };
        benchmarkAudit: {
            status: "pending" | "not_requested";
            metadata: Record<string, unknown>;
            auditCode: string;
            notes: string[];
        };
    }, {
        status: "accepted" | "rejected" | "validated";
        decision: {
            decision: "accepted" | "rejected";
            accepted: boolean;
            rejectionReasons?: {
                code: string;
                message: string;
                metadata?: Record<string, unknown> | undefined;
            }[] | undefined;
        };
        summary: {
            packageCode: string;
            outputCount: number;
            sectionCount: number;
            validationDecision: "accepted" | "rejected";
            benchmarkAuditStatus: "pending" | "not_requested";
        };
        packageCode: string;
        packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
        job: {
            jobCode: string;
            projectSlug: string;
            presetCode: string;
            variantCode: string;
            providerCode: string;
            outputCount: number;
            metadata?: Record<string, unknown> | undefined;
        };
        compileReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            compiledPrompt: {
                validation: {
                    valid: boolean;
                    issues?: string[] | undefined;
                };
                requestCode: string;
                lineage: {
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    metadata?: Record<string, unknown> | undefined;
                    packetRefs?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }[] | undefined;
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses?: string[] | undefined;
                    rendered?: string | undefined;
                };
            };
        };
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
        };
        promptBundle: {
            sections: {
                title: string;
                key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                content: string;
            }[];
            compiledPrompt: string;
            negativePrompt: string;
        };
        benchmarkAudit: {
            auditCode: string;
            status?: "pending" | "not_requested" | undefined;
            metadata?: Record<string, unknown> | undefined;
            notes?: string[] | undefined;
        };
        packageMetadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    packetRef: {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    productionPackage: {
        status: "accepted" | "rejected" | "validated";
        decision: {
            decision: "accepted" | "rejected";
            accepted: boolean;
            rejectionReasons: {
                code: string;
                message: string;
                metadata: Record<string, unknown>;
            }[];
        };
        summary: {
            packageCode: string;
            outputCount: number;
            sectionCount: number;
            validationDecision: "accepted" | "rejected";
            benchmarkAuditStatus: "pending" | "not_requested";
        };
        packageCode: string;
        packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
        packageMetadata: Record<string, unknown>;
        job: {
            metadata: Record<string, unknown>;
            jobCode: string;
            projectSlug: string;
            presetCode: string;
            variantCode: string;
            providerCode: string;
            outputCount: number;
        };
        compileReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            compiledPrompt: {
                validation: {
                    valid: boolean;
                    issues: string[];
                };
                requestCode: string;
                lineage: {
                    metadata: Record<string, unknown>;
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    packetRefs: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }[];
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses: string[];
                    rendered: string;
                };
            };
        };
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
        };
        promptBundle: {
            sections: {
                title: string;
                key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                content: string;
            }[];
            compiledPrompt: string;
            negativePrompt: string;
        };
        benchmarkAudit: {
            status: "pending" | "not_requested";
            metadata: Record<string, unknown>;
            auditCode: string;
            notes: string[];
        };
    };
}, {
    packetRef: {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    productionPackage: {
        status: "accepted" | "rejected" | "validated";
        decision: {
            decision: "accepted" | "rejected";
            accepted: boolean;
            rejectionReasons?: {
                code: string;
                message: string;
                metadata?: Record<string, unknown> | undefined;
            }[] | undefined;
        };
        summary: {
            packageCode: string;
            outputCount: number;
            sectionCount: number;
            validationDecision: "accepted" | "rejected";
            benchmarkAuditStatus: "pending" | "not_requested";
        };
        packageCode: string;
        packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
        job: {
            jobCode: string;
            projectSlug: string;
            presetCode: string;
            variantCode: string;
            providerCode: string;
            outputCount: number;
            metadata?: Record<string, unknown> | undefined;
        };
        compileReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            compiledPrompt: {
                validation: {
                    valid: boolean;
                    issues?: string[] | undefined;
                };
                requestCode: string;
                lineage: {
                    requestCode: string;
                    presetCode: string;
                    variantCode: string;
                    metadata?: Record<string, unknown> | undefined;
                    packetRefs?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }[] | undefined;
                };
                compileMode: "scene_preview" | "script_support" | "production_prompt";
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: {
                    clauses?: string[] | undefined;
                    rendered?: string | undefined;
                };
            };
        };
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
        };
        promptBundle: {
            sections: {
                title: string;
                key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                content: string;
            }[];
            compiledPrompt: string;
            negativePrompt: string;
        };
        benchmarkAudit: {
            auditCode: string;
            status?: "pending" | "not_requested" | undefined;
            metadata?: Record<string, unknown> | undefined;
            notes?: string[] | undefined;
        };
        packageMetadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const studioValidationReferenceShellSchema: z.ZodObject<{
    packetRef: z.ZodObject<{
        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
        status: "accepted" | "rejected" | "validated";
        metadata: Record<string, unknown>;
        decision: "accepted" | "rejected";
        requestCode: string;
        summary: {
            totalPasses: number;
            passedChecks: number;
            warningCount: number;
            violationCount: number;
        };
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
        status: "accepted" | "rejected" | "validated";
        decision: "accepted" | "rejected";
        requestCode: string;
        summary: {
            totalPasses: number;
            passedChecks: number;
            warningCount: number;
            violationCount: number;
        };
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
        status: "accepted" | "rejected" | "validated";
        metadata: Record<string, unknown>;
        decision: "accepted" | "rejected";
        requestCode: string;
        summary: {
            totalPasses: number;
            passedChecks: number;
            warningCount: number;
            violationCount: number;
        };
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
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
}, {
    validation: {
        status: "accepted" | "rejected" | "validated";
        decision: "accepted" | "rejected";
        requestCode: string;
        summary: {
            totalPasses: number;
            passedChecks: number;
            warningCount: number;
            violationCount: number;
        };
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
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
}>;
export declare const studioLineageReferenceShellSchema: z.ZodObject<{
    packetRef: z.ZodObject<{
        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    }>;
    persistence: z.ZodObject<{
        requestCode: z.ZodString;
        persistenceCode: z.ZodString;
        status: z.ZodEnum<["accepted", "validated", "rejected"]>;
        lineage: z.ZodObject<{
            packetRef: z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>;
            lineageRecord: z.ZodObject<{
                lineageCode: z.ZodString;
                packetRef: z.ZodObject<{
                    packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                    packetCode: z.ZodString;
                    packetVersion: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                }>;
                nodes: z.ZodArray<z.ZodObject<{
                    nodeCode: z.ZodString;
                    nodeKind: z.ZodEnum<["package", "compile_output", "validation_result", "benchmark_audit", "ingestion_artifact"]>;
                    label: z.ZodString;
                    packetRef: z.ZodOptional<z.ZodObject<{
                        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                        packetCode: z.ZodString;
                        packetVersion: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }>>;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    metadata: Record<string, unknown>;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    } | undefined;
                }, {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    } | undefined;
                    metadata?: Record<string, unknown> | undefined;
                }>, "many">;
                edges: z.ZodArray<z.ZodObject<{
                    edgeCode: z.ZodString;
                    edgeKind: z.ZodEnum<["derived_from", "validated_by", "audited_by", "materialized_as"]>;
                    fromNodeCode: z.ZodString;
                    toNodeCode: z.ZodString;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    metadata: Record<string, unknown>;
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                }, {
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                    metadata?: Record<string, unknown> | undefined;
                }>, "many">;
                metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    metadata: Record<string, unknown>;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    } | undefined;
                }[];
                edges: {
                    metadata: Record<string, unknown>;
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                }[];
            }, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    } | undefined;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                edges: {
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                metadata?: Record<string, unknown> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    metadata: Record<string, unknown>;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    } | undefined;
                }[];
                edges: {
                    metadata: Record<string, unknown>;
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                }[];
            };
        }, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    } | undefined;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                edges: {
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                metadata?: Record<string, unknown> | undefined;
            };
        }>;
        decision: z.ZodObject<{
            decision: z.ZodEnum<["accepted", "rejected"]>;
            persisted: z.ZodBoolean;
            reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons: string[];
        }, {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons?: string[] | undefined;
        }>;
        summary: z.ZodObject<{
            requestCode: z.ZodString;
            nodeCount: z.ZodNumber;
            edgeCount: z.ZodNumber;
            artifactCount: z.ZodNumber;
            decision: z.ZodEnum<["accepted", "rejected"]>;
        }, "strip", z.ZodTypeAny, {
            decision: "accepted" | "rejected";
            requestCode: string;
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        }, {
            decision: "accepted" | "rejected";
            requestCode: string;
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        }>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: "accepted" | "rejected" | "validated";
        metadata: Record<string, unknown>;
        decision: {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons: string[];
        };
        requestCode: string;
        persistenceCode: string;
        lineage: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    metadata: Record<string, unknown>;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    } | undefined;
                }[];
                edges: {
                    metadata: Record<string, unknown>;
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                }[];
            };
        };
        summary: {
            decision: "accepted" | "rejected";
            requestCode: string;
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
    }, {
        status: "accepted" | "rejected" | "validated";
        decision: {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons?: string[] | undefined;
        };
        requestCode: string;
        persistenceCode: string;
        lineage: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    } | undefined;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                edges: {
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                metadata?: Record<string, unknown> | undefined;
            };
        };
        summary: {
            decision: "accepted" | "rejected";
            requestCode: string;
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    packetRef: {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    persistence: {
        status: "accepted" | "rejected" | "validated";
        metadata: Record<string, unknown>;
        decision: {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons: string[];
        };
        requestCode: string;
        persistenceCode: string;
        lineage: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    metadata: Record<string, unknown>;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    } | undefined;
                }[];
                edges: {
                    metadata: Record<string, unknown>;
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                }[];
            };
        };
        summary: {
            decision: "accepted" | "rejected";
            requestCode: string;
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
    };
}, {
    packetRef: {
        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    persistence: {
        status: "accepted" | "rejected" | "validated";
        decision: {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons?: string[] | undefined;
        };
        requestCode: string;
        persistenceCode: string;
        lineage: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    nodeCode: string;
                    nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                    label: string;
                    packetRef?: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    } | undefined;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                edges: {
                    edgeCode: string;
                    edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                    fromNodeCode: string;
                    toNodeCode: string;
                    metadata?: Record<string, unknown> | undefined;
                }[];
                metadata?: Record<string, unknown> | undefined;
            };
        };
        summary: {
            decision: "accepted" | "rejected";
            requestCode: string;
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
        metadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const studioActionInputSchema: z.ZodObject<{
    requestCode: z.ZodString;
    actionType: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
    panel: z.ZodObject<{
        panelCode: z.ZodString;
        panelKind: z.ZodEnum<["package_inspector", "validation_inspector", "lineage_inspector", "queue_projection"]>;
        title: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
    }, {
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
        metadata?: Record<string, unknown> | undefined;
    }>;
    view: z.ZodObject<{
        viewCode: z.ZodString;
        activePanelCode: z.ZodString;
        mode: z.ZodEnum<["inspect", "queue"]>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
    }, {
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
        metadata?: Record<string, unknown> | undefined;
    }>;
    filter: z.ZodObject<{
        filterCode: z.ZodString;
        scope: z.ZodEnum<["package", "validation", "lineage", "queue"]>;
        terms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        filterCode: string;
        scope: "validation" | "package" | "lineage" | "queue";
        terms: string[];
    }, {
        filterCode: string;
        scope: "validation" | "package" | "lineage" | "queue";
        metadata?: Record<string, unknown> | undefined;
        terms?: string[] | undefined;
    }>;
    selection: z.ZodObject<{
        selectionCode: z.ZodString;
        selectedPacketRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>;
        selectedCodes: z.ZodArray<z.ZodString, "many">;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    }, {
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        selectedCodes: string[];
        metadata?: Record<string, unknown> | undefined;
    }>;
    artifactReference: z.ZodObject<{
        packetRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            }, {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    }, {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    }>;
                    validation: z.ZodObject<{
                        valid: z.ZodBoolean;
                        issues: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    }, "strip", z.ZodTypeAny, {
                        valid: boolean;
                        issues: string[];
                    }, {
                        valid: boolean;
                        issues?: string[] | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                }, {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                }>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            }, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            }>;
            validationReference: z.ZodObject<{
                packetRef: z.ZodObject<{
                    packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                    packetCode: z.ZodString;
                    packetVersion: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            }, {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            }, {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
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
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            }, {
                decision: "accepted" | "rejected";
                accepted: boolean;
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
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            }, {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            }>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            packageMetadata: Record<string, unknown>;
            job: {
                metadata: Record<string, unknown>;
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
        }, {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            packageMetadata: Record<string, unknown>;
            job: {
                metadata: Record<string, unknown>;
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
        };
    }, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        };
    }>;
    validationReference: z.ZodObject<{
        packetRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            status: "accepted" | "rejected" | "validated";
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
    }, {
        validation: {
            status: "accepted" | "rejected" | "validated";
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
    }>;
    lineageReference: z.ZodObject<{
        packetRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>;
        persistence: z.ZodObject<{
            requestCode: z.ZodString;
            persistenceCode: z.ZodString;
            status: z.ZodEnum<["accepted", "validated", "rejected"]>;
            lineage: z.ZodObject<{
                packetRef: z.ZodObject<{
                    packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                    packetCode: z.ZodString;
                    packetVersion: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                }>;
                lineageRecord: z.ZodObject<{
                    lineageCode: z.ZodString;
                    packetRef: z.ZodObject<{
                        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                        packetCode: z.ZodString;
                        packetVersion: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }>;
                    nodes: z.ZodArray<z.ZodObject<{
                        nodeCode: z.ZodString;
                        nodeKind: z.ZodEnum<["package", "compile_output", "validation_result", "benchmark_audit", "ingestion_artifact"]>;
                        label: z.ZodString;
                        packetRef: z.ZodOptional<z.ZodObject<{
                            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                            packetCode: z.ZodString;
                            packetVersion: z.ZodDefault<z.ZodNumber>;
                        }, "strip", z.ZodTypeAny, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }>>;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }, {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">;
                    edges: z.ZodArray<z.ZodObject<{
                        edgeCode: z.ZodString;
                        edgeKind: z.ZodEnum<["derived_from", "validated_by", "audited_by", "materialized_as"]>;
                        fromNodeCode: z.ZodString;
                        toNodeCode: z.ZodString;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }, {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                }, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            }, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            }>;
            decision: z.ZodObject<{
                decision: z.ZodEnum<["accepted", "rejected"]>;
                persisted: z.ZodBoolean;
                reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            }, {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            }>;
            summary: z.ZodObject<{
                requestCode: z.ZodString;
                nodeCount: z.ZodNumber;
                edgeCount: z.ZodNumber;
                artifactCount: z.ZodNumber;
                decision: z.ZodEnum<["accepted", "rejected"]>;
            }, "strip", z.ZodTypeAny, {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }, {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
        }, {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata?: Record<string, unknown> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
        };
    }, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata?: Record<string, unknown> | undefined;
        };
    }>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    filter: {
        metadata: Record<string, unknown>;
        filterCode: string;
        scope: "validation" | "package" | "lineage" | "queue";
        terms: string[];
    };
    metadata: Record<string, unknown>;
    requestCode: string;
    validationReference: {
        validation: {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
    };
    actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    panel: {
        metadata: Record<string, unknown>;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
    };
    view: {
        metadata: Record<string, unknown>;
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
    };
    selection: {
        metadata: Record<string, unknown>;
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    };
    artifactReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            packageMetadata: Record<string, unknown>;
            job: {
                metadata: Record<string, unknown>;
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
        };
    };
    lineageReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
        };
    };
}, {
    filter: {
        filterCode: string;
        scope: "validation" | "package" | "lineage" | "queue";
        metadata?: Record<string, unknown> | undefined;
        terms?: string[] | undefined;
    };
    requestCode: string;
    validationReference: {
        validation: {
            status: "accepted" | "rejected" | "validated";
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
    };
    actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    panel: {
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
        metadata?: Record<string, unknown> | undefined;
    };
    view: {
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
        metadata?: Record<string, unknown> | undefined;
    };
    selection: {
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        selectedCodes: string[];
        metadata?: Record<string, unknown> | undefined;
    };
    artifactReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        };
    };
    lineageReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata?: Record<string, unknown> | undefined;
        };
    };
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const studioActionRequestSchema: z.ZodObject<{
    requestCode: z.ZodString;
    input: z.ZodObject<{
        requestCode: z.ZodString;
        actionType: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
        panel: z.ZodObject<{
            panelCode: z.ZodString;
            panelKind: z.ZodEnum<["package_inspector", "validation_inspector", "lineage_inspector", "queue_projection"]>;
            title: z.ZodString;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
            title: string;
        }, {
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
            title: string;
            metadata?: Record<string, unknown> | undefined;
        }>;
        view: z.ZodObject<{
            viewCode: z.ZodString;
            activePanelCode: z.ZodString;
            mode: z.ZodEnum<["inspect", "queue"]>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            viewCode: string;
            activePanelCode: string;
            mode: "inspect" | "queue";
        }, {
            viewCode: string;
            activePanelCode: string;
            mode: "inspect" | "queue";
            metadata?: Record<string, unknown> | undefined;
        }>;
        filter: z.ZodObject<{
            filterCode: z.ZodString;
            scope: z.ZodEnum<["package", "validation", "lineage", "queue"]>;
            terms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            filterCode: string;
            scope: "validation" | "package" | "lineage" | "queue";
            terms: string[];
        }, {
            filterCode: string;
            scope: "validation" | "package" | "lineage" | "queue";
            metadata?: Record<string, unknown> | undefined;
            terms?: string[] | undefined;
        }>;
        selection: z.ZodObject<{
            selectionCode: z.ZodString;
            selectedPacketRef: z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>;
            selectedCodes: z.ZodArray<z.ZodString, "many">;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            selectedCodes: string[];
        }, {
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            selectedCodes: string[];
            metadata?: Record<string, unknown> | undefined;
        }>;
        artifactReference: z.ZodObject<{
            packetRef: z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                }, {
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }, {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        }, {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        }>;
                        validation: z.ZodObject<{
                            valid: z.ZodBoolean;
                            issues: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                        }, "strip", z.ZodTypeAny, {
                            valid: boolean;
                            issues: string[];
                        }, {
                            valid: boolean;
                            issues?: string[] | undefined;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        validation: {
                            valid: boolean;
                            issues: string[];
                        };
                        requestCode: string;
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                    }, {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                    }>;
                }, "strip", z.ZodTypeAny, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues: string[];
                        };
                        requestCode: string;
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                    };
                }, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                    };
                }>;
                validationReference: z.ZodObject<{
                    packetRef: z.ZodObject<{
                        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                        packetCode: z.ZodString;
                        packetVersion: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                        status: "accepted" | "rejected" | "validated";
                        metadata: Record<string, unknown>;
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        status: "accepted" | "rejected" | "validated";
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        status: "accepted" | "rejected" | "validated";
                        metadata: Record<string, unknown>;
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                }, {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                }, {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
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
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                }, {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
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
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                }, {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                }>;
            }, "strip", z.ZodTypeAny, {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                packageMetadata: Record<string, unknown>;
                job: {
                    metadata: Record<string, unknown>;
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues: string[];
                        };
                        requestCode: string;
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        metadata: Record<string, unknown>;
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
            }, {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            productionPackage: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                packageMetadata: Record<string, unknown>;
                job: {
                    metadata: Record<string, unknown>;
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues: string[];
                        };
                        requestCode: string;
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        metadata: Record<string, unknown>;
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
            };
        }, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            productionPackage: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            };
        }>;
        validationReference: z.ZodObject<{
            packetRef: z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
        }, {
            validation: {
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
        }>;
        lineageReference: z.ZodObject<{
            packetRef: z.ZodObject<{
                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                packetCode: z.ZodString;
                packetVersion: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>;
            persistence: z.ZodObject<{
                requestCode: z.ZodString;
                persistenceCode: z.ZodString;
                status: z.ZodEnum<["accepted", "validated", "rejected"]>;
                lineage: z.ZodObject<{
                    packetRef: z.ZodObject<{
                        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                        packetCode: z.ZodString;
                        packetVersion: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }>;
                    lineageRecord: z.ZodObject<{
                        lineageCode: z.ZodString;
                        packetRef: z.ZodObject<{
                            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                            packetCode: z.ZodString;
                            packetVersion: z.ZodDefault<z.ZodNumber>;
                        }, "strip", z.ZodTypeAny, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }>;
                        nodes: z.ZodArray<z.ZodObject<{
                            nodeCode: z.ZodString;
                            nodeKind: z.ZodEnum<["package", "compile_output", "validation_result", "benchmark_audit", "ingestion_artifact"]>;
                            label: z.ZodString;
                            packetRef: z.ZodOptional<z.ZodObject<{
                                packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                                packetCode: z.ZodString;
                                packetVersion: z.ZodDefault<z.ZodNumber>;
                            }, "strip", z.ZodTypeAny, {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }, {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }>>;
                            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                        }, "strip", z.ZodTypeAny, {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            metadata: Record<string, unknown>;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }, {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            } | undefined;
                            metadata?: Record<string, unknown> | undefined;
                        }>, "many">;
                        edges: z.ZodArray<z.ZodObject<{
                            edgeCode: z.ZodString;
                            edgeKind: z.ZodEnum<["derived_from", "validated_by", "audited_by", "materialized_as"]>;
                            fromNodeCode: z.ZodString;
                            toNodeCode: z.ZodString;
                            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                        }, "strip", z.ZodTypeAny, {
                            metadata: Record<string, unknown>;
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                        }, {
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                            metadata?: Record<string, unknown> | undefined;
                        }>, "many">;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            metadata: Record<string, unknown>;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }[];
                        edges: {
                            metadata: Record<string, unknown>;
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                        }[];
                    }, {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            } | undefined;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        edges: {
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        metadata?: Record<string, unknown> | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            metadata: Record<string, unknown>;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }[];
                        edges: {
                            metadata: Record<string, unknown>;
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                        }[];
                    };
                }, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            } | undefined;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        edges: {
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        metadata?: Record<string, unknown> | undefined;
                    };
                }>;
                decision: z.ZodObject<{
                    decision: z.ZodEnum<["accepted", "rejected"]>;
                    persisted: z.ZodBoolean;
                    reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons: string[];
                }, {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                }>;
                summary: z.ZodObject<{
                    requestCode: z.ZodString;
                    nodeCount: z.ZodNumber;
                    edgeCount: z.ZodNumber;
                    artifactCount: z.ZodNumber;
                    decision: z.ZodEnum<["accepted", "rejected"]>;
                }, "strip", z.ZodTypeAny, {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                }, {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                }>;
                metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons: string[];
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            metadata: Record<string, unknown>;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }[];
                        edges: {
                            metadata: Record<string, unknown>;
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                        }[];
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
            }, {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            } | undefined;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        edges: {
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        metadata?: Record<string, unknown> | undefined;
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata?: Record<string, unknown> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            persistence: {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons: string[];
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            metadata: Record<string, unknown>;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }[];
                        edges: {
                            metadata: Record<string, unknown>;
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                        }[];
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
            };
        }, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            persistence: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            } | undefined;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        edges: {
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        metadata?: Record<string, unknown> | undefined;
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata?: Record<string, unknown> | undefined;
            };
        }>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        filter: {
            metadata: Record<string, unknown>;
            filterCode: string;
            scope: "validation" | "package" | "lineage" | "queue";
            terms: string[];
        };
        metadata: Record<string, unknown>;
        requestCode: string;
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            metadata: Record<string, unknown>;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
            title: string;
        };
        view: {
            metadata: Record<string, unknown>;
            viewCode: string;
            activePanelCode: string;
            mode: "inspect" | "queue";
        };
        selection: {
            metadata: Record<string, unknown>;
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            selectedCodes: string[];
        };
        artifactReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            productionPackage: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                packageMetadata: Record<string, unknown>;
                job: {
                    metadata: Record<string, unknown>;
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues: string[];
                        };
                        requestCode: string;
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        metadata: Record<string, unknown>;
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            persistence: {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons: string[];
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            metadata: Record<string, unknown>;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }[];
                        edges: {
                            metadata: Record<string, unknown>;
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                        }[];
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
            };
        };
    }, {
        filter: {
            filterCode: string;
            scope: "validation" | "package" | "lineage" | "queue";
            metadata?: Record<string, unknown> | undefined;
            terms?: string[] | undefined;
        };
        requestCode: string;
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
            title: string;
            metadata?: Record<string, unknown> | undefined;
        };
        view: {
            viewCode: string;
            activePanelCode: string;
            mode: "inspect" | "queue";
            metadata?: Record<string, unknown> | undefined;
        };
        selection: {
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            selectedCodes: string[];
            metadata?: Record<string, unknown> | undefined;
        };
        artifactReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            productionPackage: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            persistence: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            } | undefined;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        edges: {
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        metadata?: Record<string, unknown> | undefined;
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata?: Record<string, unknown> | undefined;
            };
        };
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    requestCode: string;
    input: {
        filter: {
            metadata: Record<string, unknown>;
            filterCode: string;
            scope: "validation" | "package" | "lineage" | "queue";
            terms: string[];
        };
        metadata: Record<string, unknown>;
        requestCode: string;
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            metadata: Record<string, unknown>;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
            title: string;
        };
        view: {
            metadata: Record<string, unknown>;
            viewCode: string;
            activePanelCode: string;
            mode: "inspect" | "queue";
        };
        selection: {
            metadata: Record<string, unknown>;
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            selectedCodes: string[];
        };
        artifactReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            productionPackage: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons: {
                        code: string;
                        message: string;
                        metadata: Record<string, unknown>;
                    }[];
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                packageMetadata: Record<string, unknown>;
                job: {
                    metadata: Record<string, unknown>;
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues: string[];
                        };
                        requestCode: string;
                        lineage: {
                            metadata: Record<string, unknown>;
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            packetRefs: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            }[];
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses: string[];
                            rendered: string;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        metadata: Record<string, unknown>;
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    status: "pending" | "not_requested";
                    metadata: Record<string, unknown>;
                    auditCode: string;
                    notes: string[];
                };
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            persistence: {
                status: "accepted" | "rejected" | "validated";
                metadata: Record<string, unknown>;
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons: string[];
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            metadata: Record<string, unknown>;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }[];
                        edges: {
                            metadata: Record<string, unknown>;
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                        }[];
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
            };
        };
    };
}, {
    requestCode: string;
    input: {
        filter: {
            filterCode: string;
            scope: "validation" | "package" | "lineage" | "queue";
            metadata?: Record<string, unknown> | undefined;
            terms?: string[] | undefined;
        };
        requestCode: string;
        validationReference: {
            validation: {
                status: "accepted" | "rejected" | "validated";
                decision: "accepted" | "rejected";
                requestCode: string;
                summary: {
                    totalPasses: number;
                    passedChecks: number;
                    warningCount: number;
                    violationCount: number;
                };
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
            title: string;
            metadata?: Record<string, unknown> | undefined;
        };
        view: {
            viewCode: string;
            activePanelCode: string;
            mode: "inspect" | "queue";
            metadata?: Record<string, unknown> | undefined;
        };
        selection: {
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            selectedCodes: string[];
            metadata?: Record<string, unknown> | undefined;
        };
        artifactReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            productionPackage: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    accepted: boolean;
                    rejectionReasons?: {
                        code: string;
                        message: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[] | undefined;
                };
                summary: {
                    packageCode: string;
                    outputCount: number;
                    sectionCount: number;
                    validationDecision: "accepted" | "rejected";
                    benchmarkAuditStatus: "pending" | "not_requested";
                };
                packageCode: string;
                packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
                job: {
                    jobCode: string;
                    projectSlug: string;
                    presetCode: string;
                    variantCode: string;
                    providerCode: string;
                    outputCount: number;
                    metadata?: Record<string, unknown> | undefined;
                };
                compileReference: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    compiledPrompt: {
                        validation: {
                            valid: boolean;
                            issues?: string[] | undefined;
                        };
                        requestCode: string;
                        lineage: {
                            requestCode: string;
                            presetCode: string;
                            variantCode: string;
                            metadata?: Record<string, unknown> | undefined;
                            packetRefs?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            }[] | undefined;
                        };
                        compileMode: "scene_preview" | "script_support" | "production_prompt";
                        sections: {
                            title: string;
                            key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                            content: string;
                        }[];
                        compiledPrompt: string;
                        negativePrompt: {
                            clauses?: string[] | undefined;
                            rendered?: string | undefined;
                        };
                    };
                };
                validationReference: {
                    validation: {
                        status: "accepted" | "rejected" | "validated";
                        decision: "accepted" | "rejected";
                        requestCode: string;
                        summary: {
                            totalPasses: number;
                            passedChecks: number;
                            warningCount: number;
                            violationCount: number;
                        };
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
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                };
                promptBundle: {
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: string;
                };
                benchmarkAudit: {
                    auditCode: string;
                    status?: "pending" | "not_requested" | undefined;
                    metadata?: Record<string, unknown> | undefined;
                    notes?: string[] | undefined;
                };
                packageMetadata?: Record<string, unknown> | undefined;
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            persistence: {
                status: "accepted" | "rejected" | "validated";
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                requestCode: string;
                persistenceCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            nodeCode: string;
                            nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                            label: string;
                            packetRef?: {
                                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                                packetCode: string;
                                packetVersion?: number | undefined;
                            } | undefined;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        edges: {
                            edgeCode: string;
                            edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                            fromNodeCode: string;
                            toNodeCode: string;
                            metadata?: Record<string, unknown> | undefined;
                        }[];
                        metadata?: Record<string, unknown> | undefined;
                    };
                };
                summary: {
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata?: Record<string, unknown> | undefined;
            };
        };
        metadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const studioActionDecisionShellSchema: z.ZodObject<{
    decision: z.ZodEnum<["inspect", "project_queue", "hold"]>;
    accepted: z.ZodBoolean;
    reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    decision: "inspect" | "project_queue" | "hold";
    accepted: boolean;
    reasons: string[];
}, {
    decision: "inspect" | "project_queue" | "hold";
    accepted: boolean;
    reasons?: string[] | undefined;
}>;
export declare const studioActionSummaryShellSchema: z.ZodObject<{
    requestCode: z.ZodString;
    normalizedActionType: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
    selectedPacketCode: z.ZodString;
    queueItemCount: z.ZodNumber;
    status: z.ZodEnum<["ready", "queued", "inspection_ready", "review_required"]>;
}, "strip", z.ZodTypeAny, {
    status: "ready" | "queued" | "inspection_ready" | "review_required";
    requestCode: string;
    normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    selectedPacketCode: string;
    queueItemCount: number;
}, {
    status: "ready" | "queued" | "inspection_ready" | "review_required";
    requestCode: string;
    normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    selectedPacketCode: string;
    queueItemCount: number;
}>;
export declare const studioActionResultSchema: z.ZodObject<{
    requestCode: z.ZodString;
    normalizedActionType: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
    panel: z.ZodObject<{
        panelCode: z.ZodString;
        panelKind: z.ZodEnum<["package_inspector", "validation_inspector", "lineage_inspector", "queue_projection"]>;
        title: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
    }, {
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
        metadata?: Record<string, unknown> | undefined;
    }>;
    view: z.ZodObject<{
        viewCode: z.ZodString;
        activePanelCode: z.ZodString;
        mode: z.ZodEnum<["inspect", "queue"]>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
    }, {
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
        metadata?: Record<string, unknown> | undefined;
    }>;
    selection: z.ZodObject<{
        selectionCode: z.ZodString;
        selectedPacketRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>;
        selectedCodes: z.ZodArray<z.ZodString, "many">;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    }, {
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        selectedCodes: string[];
        metadata?: Record<string, unknown> | undefined;
    }>;
    artifactReference: z.ZodObject<{
        packetRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            }, {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    }, {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    }>;
                    validation: z.ZodObject<{
                        valid: z.ZodBoolean;
                        issues: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    }, "strip", z.ZodTypeAny, {
                        valid: boolean;
                        issues: string[];
                    }, {
                        valid: boolean;
                        issues?: string[] | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                }, {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                }>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            }, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            }>;
            validationReference: z.ZodObject<{
                packetRef: z.ZodObject<{
                    packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                    packetCode: z.ZodString;
                    packetVersion: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            }, {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            }, {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
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
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            }, {
                decision: "accepted" | "rejected";
                accepted: boolean;
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
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            }, {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            }>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            packageMetadata: Record<string, unknown>;
            job: {
                metadata: Record<string, unknown>;
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
        }, {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            packageMetadata: Record<string, unknown>;
            job: {
                metadata: Record<string, unknown>;
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
        };
    }, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        };
    }>;
    validationReference: z.ZodObject<{
        packetRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
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
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            status: "accepted" | "rejected" | "validated";
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
    }, {
        validation: {
            status: "accepted" | "rejected" | "validated";
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
    }>;
    lineageReference: z.ZodObject<{
        packetRef: z.ZodObject<{
            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
            packetCode: z.ZodString;
            packetVersion: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>;
        persistence: z.ZodObject<{
            requestCode: z.ZodString;
            persistenceCode: z.ZodString;
            status: z.ZodEnum<["accepted", "validated", "rejected"]>;
            lineage: z.ZodObject<{
                packetRef: z.ZodObject<{
                    packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                    packetCode: z.ZodString;
                    packetVersion: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                }>;
                lineageRecord: z.ZodObject<{
                    lineageCode: z.ZodString;
                    packetRef: z.ZodObject<{
                        packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                        packetCode: z.ZodString;
                        packetVersion: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    }>;
                    nodes: z.ZodArray<z.ZodObject<{
                        nodeCode: z.ZodString;
                        nodeKind: z.ZodEnum<["package", "compile_output", "validation_result", "benchmark_audit", "ingestion_artifact"]>;
                        label: z.ZodString;
                        packetRef: z.ZodOptional<z.ZodObject<{
                            packetKind: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
                            packetCode: z.ZodString;
                            packetVersion: z.ZodDefault<z.ZodNumber>;
                        }, "strip", z.ZodTypeAny, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }, {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }>>;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }, {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">;
                    edges: z.ZodArray<z.ZodObject<{
                        edgeCode: z.ZodString;
                        edgeKind: z.ZodEnum<["derived_from", "validated_by", "audited_by", "materialized_as"]>;
                        fromNodeCode: z.ZodString;
                        toNodeCode: z.ZodString;
                        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }, {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }>, "many">;
                    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                }, {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            }, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            }>;
            decision: z.ZodObject<{
                decision: z.ZodEnum<["accepted", "rejected"]>;
                persisted: z.ZodBoolean;
                reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            }, {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            }>;
            summary: z.ZodObject<{
                requestCode: z.ZodString;
                nodeCount: z.ZodNumber;
                edgeCount: z.ZodNumber;
                artifactCount: z.ZodNumber;
                decision: z.ZodEnum<["accepted", "rejected"]>;
            }, "strip", z.ZodTypeAny, {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }, {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
        }, {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata?: Record<string, unknown> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
        };
    }, {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata?: Record<string, unknown> | undefined;
        };
    }>;
    queueProjection: z.ZodObject<{
        queueCode: z.ZodString;
        queueType: z.ZodEnum<["generation", "benchmark_review", "persistence_review"]>;
        items: z.ZodArray<z.ZodObject<{
            itemCode: z.ZodString;
            queueType: z.ZodEnum<["generation", "benchmark_review", "persistence_review"]>;
            requestCode: z.ZodString;
            targetCode: z.ZodString;
            status: z.ZodEnum<["projected", "held"]>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            status: "projected" | "held";
            metadata: Record<string, unknown>;
            requestCode: string;
            itemCode: string;
            queueType: "generation" | "benchmark_review" | "persistence_review";
            targetCode: string;
        }, {
            status: "projected" | "held";
            requestCode: string;
            itemCode: string;
            queueType: "generation" | "benchmark_review" | "persistence_review";
            targetCode: string;
            metadata?: Record<string, unknown> | undefined;
        }>, "many">;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        queueType: "generation" | "benchmark_review" | "persistence_review";
        queueCode: string;
        items: {
            status: "projected" | "held";
            metadata: Record<string, unknown>;
            requestCode: string;
            itemCode: string;
            queueType: "generation" | "benchmark_review" | "persistence_review";
            targetCode: string;
        }[];
    }, {
        queueType: "generation" | "benchmark_review" | "persistence_review";
        queueCode: string;
        items: {
            status: "projected" | "held";
            requestCode: string;
            itemCode: string;
            queueType: "generation" | "benchmark_review" | "persistence_review";
            targetCode: string;
            metadata?: Record<string, unknown> | undefined;
        }[];
        metadata?: Record<string, unknown> | undefined;
    }>;
    status: z.ZodEnum<["ready", "queued", "inspection_ready", "review_required"]>;
    decision: z.ZodObject<{
        decision: z.ZodEnum<["inspect", "project_queue", "hold"]>;
        accepted: z.ZodBoolean;
        reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        decision: "inspect" | "project_queue" | "hold";
        accepted: boolean;
        reasons: string[];
    }, {
        decision: "inspect" | "project_queue" | "hold";
        accepted: boolean;
        reasons?: string[] | undefined;
    }>;
    summary: z.ZodObject<{
        requestCode: z.ZodString;
        normalizedActionType: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
        selectedPacketCode: z.ZodString;
        queueItemCount: z.ZodNumber;
        status: z.ZodEnum<["ready", "queued", "inspection_ready", "review_required"]>;
    }, "strip", z.ZodTypeAny, {
        status: "ready" | "queued" | "inspection_ready" | "review_required";
        requestCode: string;
        normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        selectedPacketCode: string;
        queueItemCount: number;
    }, {
        status: "ready" | "queued" | "inspection_ready" | "review_required";
        requestCode: string;
        normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        selectedPacketCode: string;
        queueItemCount: number;
    }>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "ready" | "queued" | "inspection_ready" | "review_required";
    metadata: Record<string, unknown>;
    decision: {
        decision: "inspect" | "project_queue" | "hold";
        accepted: boolean;
        reasons: string[];
    };
    requestCode: string;
    summary: {
        status: "ready" | "queued" | "inspection_ready" | "review_required";
        requestCode: string;
        normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        selectedPacketCode: string;
        queueItemCount: number;
    };
    validationReference: {
        validation: {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
    };
    panel: {
        metadata: Record<string, unknown>;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
    };
    view: {
        metadata: Record<string, unknown>;
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
    };
    selection: {
        metadata: Record<string, unknown>;
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    };
    artifactReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons: {
                    code: string;
                    message: string;
                    metadata: Record<string, unknown>;
                }[];
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            packageMetadata: Record<string, unknown>;
            job: {
                metadata: Record<string, unknown>;
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues: string[];
                    };
                    requestCode: string;
                    lineage: {
                        metadata: Record<string, unknown>;
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        packetRefs: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }[];
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses: string[];
                        rendered: string;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    metadata: Record<string, unknown>;
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                status: "pending" | "not_requested";
                metadata: Record<string, unknown>;
                auditCode: string;
                notes: string[];
            };
        };
    };
    lineageReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons: string[];
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        metadata: Record<string, unknown>;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }[];
                    edges: {
                        metadata: Record<string, unknown>;
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                    }[];
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
        };
    };
    normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    queueProjection: {
        metadata: Record<string, unknown>;
        queueType: "generation" | "benchmark_review" | "persistence_review";
        queueCode: string;
        items: {
            status: "projected" | "held";
            metadata: Record<string, unknown>;
            requestCode: string;
            itemCode: string;
            queueType: "generation" | "benchmark_review" | "persistence_review";
            targetCode: string;
        }[];
    };
}, {
    status: "ready" | "queued" | "inspection_ready" | "review_required";
    decision: {
        decision: "inspect" | "project_queue" | "hold";
        accepted: boolean;
        reasons?: string[] | undefined;
    };
    requestCode: string;
    summary: {
        status: "ready" | "queued" | "inspection_ready" | "review_required";
        requestCode: string;
        normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        selectedPacketCode: string;
        queueItemCount: number;
    };
    validationReference: {
        validation: {
            status: "accepted" | "rejected" | "validated";
            decision: "accepted" | "rejected";
            requestCode: string;
            summary: {
                totalPasses: number;
                passedChecks: number;
                warningCount: number;
                violationCount: number;
            };
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
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
    };
    panel: {
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        title: string;
        metadata?: Record<string, unknown> | undefined;
    };
    view: {
        viewCode: string;
        activePanelCode: string;
        mode: "inspect" | "queue";
        metadata?: Record<string, unknown> | undefined;
    };
    selection: {
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        selectedCodes: string[];
        metadata?: Record<string, unknown> | undefined;
    };
    artifactReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        productionPackage: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                accepted: boolean;
                rejectionReasons?: {
                    code: string;
                    message: string;
                    metadata?: Record<string, unknown> | undefined;
                }[] | undefined;
            };
            summary: {
                packageCode: string;
                outputCount: number;
                sectionCount: number;
                validationDecision: "accepted" | "rejected";
                benchmarkAuditStatus: "pending" | "not_requested";
            };
            packageCode: string;
            packageMode: "prompt_bundle_only" | "production_ready" | "production_with_audit_placeholder";
            job: {
                jobCode: string;
                projectSlug: string;
                presetCode: string;
                variantCode: string;
                providerCode: string;
                outputCount: number;
                metadata?: Record<string, unknown> | undefined;
            };
            compileReference: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                compiledPrompt: {
                    validation: {
                        valid: boolean;
                        issues?: string[] | undefined;
                    };
                    requestCode: string;
                    lineage: {
                        requestCode: string;
                        presetCode: string;
                        variantCode: string;
                        metadata?: Record<string, unknown> | undefined;
                        packetRefs?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        }[] | undefined;
                    };
                    compileMode: "scene_preview" | "script_support" | "production_prompt";
                    sections: {
                        title: string;
                        key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                        content: string;
                    }[];
                    compiledPrompt: string;
                    negativePrompt: {
                        clauses?: string[] | undefined;
                        rendered?: string | undefined;
                    };
                };
            };
            validationReference: {
                validation: {
                    status: "accepted" | "rejected" | "validated";
                    decision: "accepted" | "rejected";
                    requestCode: string;
                    summary: {
                        totalPasses: number;
                        passedChecks: number;
                        warningCount: number;
                        violationCount: number;
                    };
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
            };
            promptBundle: {
                sections: {
                    title: string;
                    key: "system_frame" | "canon_constraints" | "context_packet_summary" | "mode_payload" | "output_instructions" | "negative_prompt_shell" | "lineage_metadata";
                    content: string;
                }[];
                compiledPrompt: string;
                negativePrompt: string;
            };
            benchmarkAudit: {
                auditCode: string;
                status?: "pending" | "not_requested" | undefined;
                metadata?: Record<string, unknown> | undefined;
                notes?: string[] | undefined;
            };
            packageMetadata?: Record<string, unknown> | undefined;
        };
    };
    lineageReference: {
        packetRef: {
            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "rejected" | "validated";
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            requestCode: string;
            persistenceCode: string;
            lineage: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        nodeCode: string;
                        nodeKind: "package" | "compile_output" | "validation_result" | "benchmark_audit" | "ingestion_artifact";
                        label: string;
                        packetRef?: {
                            packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        } | undefined;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    edges: {
                        edgeCode: string;
                        edgeKind: "derived_from" | "validated_by" | "audited_by" | "materialized_as";
                        fromNodeCode: string;
                        toNodeCode: string;
                        metadata?: Record<string, unknown> | undefined;
                    }[];
                    metadata?: Record<string, unknown> | undefined;
                };
            };
            summary: {
                decision: "accepted" | "rejected";
                requestCode: string;
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata?: Record<string, unknown> | undefined;
        };
    };
    normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    queueProjection: {
        queueType: "generation" | "benchmark_review" | "persistence_review";
        queueCode: string;
        items: {
            status: "projected" | "held";
            requestCode: string;
            itemCode: string;
            queueType: "generation" | "benchmark_review" | "persistence_review";
            targetCode: string;
            metadata?: Record<string, unknown> | undefined;
        }[];
        metadata?: Record<string, unknown> | undefined;
    };
    metadata?: Record<string, unknown> | undefined;
}>;
export type StudioActionType = z.infer<typeof studioActionTypeSchema>;
export type StudioPanelShell = z.infer<typeof studioPanelShellSchema>;
export type StudioViewShell = z.infer<typeof studioViewShellSchema>;
export type StudioQueueItemShell = z.infer<typeof studioQueueItemShellSchema>;
export type StudioQueueShell = z.infer<typeof studioQueueShellSchema>;
export type StudioStatusShell = z.infer<typeof studioStatusShellSchema>;
export type StudioFilterShell = z.infer<typeof studioFilterShellSchema>;
export type StudioSelectionShell = z.infer<typeof studioSelectionShellSchema>;
export type StudioArtifactReferenceShell = z.infer<typeof studioArtifactReferenceShellSchema>;
export type StudioValidationReferenceShell = z.infer<typeof studioValidationReferenceShellSchema>;
export type StudioLineageReferenceShell = z.infer<typeof studioLineageReferenceShellSchema>;
export type StudioActionInput = z.infer<typeof studioActionInputSchema>;
export type StudioActionRequest = z.infer<typeof studioActionRequestSchema>;
export type StudioActionDecisionShell = z.infer<typeof studioActionDecisionShellSchema>;
export type StudioActionSummaryShell = z.infer<typeof studioActionSummaryShellSchema>;
export type StudioActionResult = z.infer<typeof studioActionResultSchema>;
//# sourceMappingURL=index.d.ts.map