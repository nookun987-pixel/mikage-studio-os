import { z } from 'zod';
export declare const studioActionTypeSchema: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
export declare const studioPanelShellSchema: z.ZodObject<{
    panelCode: z.ZodString;
    panelKind: z.ZodEnum<["package_inspector", "validation_inspector", "lineage_inspector", "queue_projection"]>;
    title: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    title: string;
    panelCode: string;
    panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
}, {
    title: string;
    panelCode: string;
    panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
    scope: "validation" | "lineage" | "package" | "queue";
    terms: string[];
}, {
    filterCode: string;
    scope: "validation" | "lineage" | "package" | "queue";
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
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    }>;
    selectedCodes: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    selectionCode: string;
    selectedPacketRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    selectedCodes: string[];
}, {
    selectionCode: string;
    selectedPacketRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
export declare const studioValidationReferenceShellSchema: z.ZodObject<{
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
export declare const studioLineageReferenceShellSchema: z.ZodObject<{
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    label: string;
                    metadata: Record<string, unknown>;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    } | undefined;
                }, {
                    label: string;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    label: string;
                    metadata: Record<string, unknown>;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    label: string;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    label: string;
                    metadata: Record<string, unknown>;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    label: string;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            reasons: string[];
            persisted: boolean;
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
            requestCode: string;
            decision: "accepted" | "rejected";
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        }, {
            requestCode: string;
            decision: "accepted" | "rejected";
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        }>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: "accepted" | "validated" | "rejected";
        summary: {
            requestCode: string;
            decision: "accepted" | "rejected";
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
        metadata: Record<string, unknown>;
        requestCode: string;
        lineage: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    label: string;
                    metadata: Record<string, unknown>;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
        decision: {
            decision: "accepted" | "rejected";
            reasons: string[];
            persisted: boolean;
        };
        persistenceCode: string;
    }, {
        status: "accepted" | "validated" | "rejected";
        summary: {
            requestCode: string;
            decision: "accepted" | "rejected";
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
        requestCode: string;
        lineage: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    label: string;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
        decision: {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons?: string[] | undefined;
        };
        persistenceCode: string;
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    persistence: {
        status: "accepted" | "validated" | "rejected";
        summary: {
            requestCode: string;
            decision: "accepted" | "rejected";
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
        metadata: Record<string, unknown>;
        requestCode: string;
        lineage: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                lineageCode: string;
                nodes: {
                    label: string;
                    metadata: Record<string, unknown>;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
        decision: {
            decision: "accepted" | "rejected";
            reasons: string[];
            persisted: boolean;
        };
        persistenceCode: string;
    };
}, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    persistence: {
        status: "accepted" | "validated" | "rejected";
        summary: {
            requestCode: string;
            decision: "accepted" | "rejected";
            nodeCount: number;
            edgeCount: number;
            artifactCount: number;
        };
        requestCode: string;
        lineage: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            lineageRecord: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageCode: string;
                nodes: {
                    label: string;
                    nodeCode: string;
                    nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                    packetRef?: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
        decision: {
            decision: "accepted" | "rejected";
            persisted: boolean;
            reasons?: string[] | undefined;
        };
        persistenceCode: string;
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
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
    }, {
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
        scope: "validation" | "lineage" | "package" | "queue";
        terms: string[];
    }, {
        filterCode: string;
        scope: "validation" | "lineage" | "package" | "queue";
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
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>;
        selectedCodes: z.ZodArray<z.ZodString, "many">;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    }, {
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
    lineageReference: z.ZodObject<{
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }, {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                reasons: string[];
                persisted: boolean;
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
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }, {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata: Record<string, unknown>;
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                reasons: string[];
                persisted: boolean;
            };
            persistenceCode: string;
        }, {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            persistenceCode: string;
            metadata?: Record<string, unknown> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata: Record<string, unknown>;
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                reasons: string[];
                persisted: boolean;
            };
            persistenceCode: string;
        };
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            persistenceCode: string;
            metadata?: Record<string, unknown> | undefined;
        };
    }>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    filter: {
        metadata: Record<string, unknown>;
        filterCode: string;
        scope: "validation" | "lineage" | "package" | "queue";
        terms: string[];
    };
    metadata: Record<string, unknown>;
    requestCode: string;
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
    lineageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata: Record<string, unknown>;
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                reasons: string[];
                persisted: boolean;
            };
            persistenceCode: string;
        };
    };
    actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    panel: {
        metadata: Record<string, unknown>;
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    };
    artifactReference: {
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
}, {
    filter: {
        filterCode: string;
        scope: "validation" | "lineage" | "package" | "queue";
        metadata?: Record<string, unknown> | undefined;
        terms?: string[] | undefined;
    };
    requestCode: string;
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
    lineageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            persistenceCode: string;
            metadata?: Record<string, unknown> | undefined;
        };
    };
    actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    panel: {
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        selectedCodes: string[];
        metadata?: Record<string, unknown> | undefined;
    };
    artifactReference: {
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
            title: string;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
        }, {
            title: string;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
            scope: "validation" | "lineage" | "package" | "queue";
            terms: string[];
        }, {
            filterCode: string;
            scope: "validation" | "lineage" | "package" | "queue";
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>;
            selectedCodes: z.ZodArray<z.ZodString, "many">;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            selectedCodes: string[];
        }, {
            selectionCode: string;
            selectedPacketRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
        lineageReference: z.ZodObject<{
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        }, {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                            label: string;
                            metadata: Record<string, unknown>;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                                packetCode: string;
                                packetVersion: number;
                            } | undefined;
                        }, {
                            label: string;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            label: string;
                            metadata: Record<string, unknown>;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            label: string;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            label: string;
                            metadata: Record<string, unknown>;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            label: string;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    reasons: string[];
                    persisted: boolean;
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
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                }, {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                }>;
                metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata: Record<string, unknown>;
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            label: string;
                            metadata: Record<string, unknown>;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    reasons: string[];
                    persisted: boolean;
                };
                persistenceCode: string;
            }, {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            label: string;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                persistenceCode: string;
                metadata?: Record<string, unknown> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            persistence: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata: Record<string, unknown>;
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            label: string;
                            metadata: Record<string, unknown>;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    reasons: string[];
                    persisted: boolean;
                };
                persistenceCode: string;
            };
        }, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            persistence: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            label: string;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                persistenceCode: string;
                metadata?: Record<string, unknown> | undefined;
            };
        }>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        filter: {
            metadata: Record<string, unknown>;
            filterCode: string;
            scope: "validation" | "lineage" | "package" | "queue";
            terms: string[];
        };
        metadata: Record<string, unknown>;
        requestCode: string;
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
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            persistence: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata: Record<string, unknown>;
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            label: string;
                            metadata: Record<string, unknown>;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    reasons: string[];
                    persisted: boolean;
                };
                persistenceCode: string;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            metadata: Record<string, unknown>;
            title: string;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            selectedCodes: string[];
        };
        artifactReference: {
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
    }, {
        filter: {
            filterCode: string;
            scope: "validation" | "lineage" | "package" | "queue";
            metadata?: Record<string, unknown> | undefined;
            terms?: string[] | undefined;
        };
        requestCode: string;
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
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            persistence: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            label: string;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                persistenceCode: string;
                metadata?: Record<string, unknown> | undefined;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            title: string;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            selectedCodes: string[];
            metadata?: Record<string, unknown> | undefined;
        };
        artifactReference: {
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
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    requestCode: string;
    input: {
        filter: {
            metadata: Record<string, unknown>;
            filterCode: string;
            scope: "validation" | "lineage" | "package" | "queue";
            terms: string[];
        };
        metadata: Record<string, unknown>;
        requestCode: string;
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
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            persistence: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                metadata: Record<string, unknown>;
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        };
                        metadata: Record<string, unknown>;
                        lineageCode: string;
                        nodes: {
                            label: string;
                            metadata: Record<string, unknown>;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    reasons: string[];
                    persisted: boolean;
                };
                persistenceCode: string;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            metadata: Record<string, unknown>;
            title: string;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            selectedCodes: string[];
        };
        artifactReference: {
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
    };
}, {
    requestCode: string;
    input: {
        filter: {
            filterCode: string;
            scope: "validation" | "lineage" | "package" | "queue";
            metadata?: Record<string, unknown> | undefined;
            terms?: string[] | undefined;
        };
        requestCode: string;
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
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            persistence: {
                status: "accepted" | "validated" | "rejected";
                summary: {
                    requestCode: string;
                    decision: "accepted" | "rejected";
                    nodeCount: number;
                    edgeCount: number;
                    artifactCount: number;
                };
                requestCode: string;
                lineage: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageRecord: {
                        packetRef: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion?: number | undefined;
                        };
                        lineageCode: string;
                        nodes: {
                            label: string;
                            nodeCode: string;
                            nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                            packetRef?: {
                                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                decision: {
                    decision: "accepted" | "rejected";
                    persisted: boolean;
                    reasons?: string[] | undefined;
                };
                persistenceCode: string;
                metadata?: Record<string, unknown> | undefined;
            };
        };
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panel: {
            title: string;
            panelCode: string;
            panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            selectedCodes: string[];
            metadata?: Record<string, unknown> | undefined;
        };
        artifactReference: {
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
        metadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const studioActionDecisionShellSchema: z.ZodObject<{
    decision: z.ZodEnum<["inspect", "project_queue", "hold"]>;
    accepted: z.ZodBoolean;
    reasons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    accepted: boolean;
    decision: "inspect" | "project_queue" | "hold";
    reasons: string[];
}, {
    accepted: boolean;
    decision: "inspect" | "project_queue" | "hold";
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
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
    }, {
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        }, {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        }>;
        selectedCodes: z.ZodArray<z.ZodString, "many">;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    }, {
        selectionCode: string;
        selectedPacketRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
    lineageReference: z.ZodObject<{
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    }, {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                            packetCode: string;
                            packetVersion: number;
                        } | undefined;
                    }, {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
                reasons: string[];
                persisted: boolean;
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
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }, {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            }>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata: Record<string, unknown>;
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                reasons: string[];
                persisted: boolean;
            };
            persistenceCode: string;
        }, {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            persistenceCode: string;
            metadata?: Record<string, unknown> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata: Record<string, unknown>;
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                reasons: string[];
                persisted: boolean;
            };
            persistenceCode: string;
        };
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            persistenceCode: string;
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
        accepted: boolean;
        decision: "inspect" | "project_queue" | "hold";
        reasons: string[];
    }, {
        accepted: boolean;
        decision: "inspect" | "project_queue" | "hold";
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
    summary: {
        status: "ready" | "queued" | "inspection_ready" | "review_required";
        requestCode: string;
        normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        selectedPacketCode: string;
        queueItemCount: number;
    };
    metadata: Record<string, unknown>;
    requestCode: string;
    decision: {
        accepted: boolean;
        decision: "inspect" | "project_queue" | "hold";
        reasons: string[];
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
    lineageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            metadata: Record<string, unknown>;
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion: number;
                    };
                    metadata: Record<string, unknown>;
                    lineageCode: string;
                    nodes: {
                        label: string;
                        metadata: Record<string, unknown>;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                reasons: string[];
                persisted: boolean;
            };
            persistenceCode: string;
        };
    };
    panel: {
        metadata: Record<string, unknown>;
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        selectedCodes: string[];
    };
    artifactReference: {
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
    summary: {
        status: "ready" | "queued" | "inspection_ready" | "review_required";
        requestCode: string;
        normalizedActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        selectedPacketCode: string;
        queueItemCount: number;
    };
    requestCode: string;
    decision: {
        accepted: boolean;
        decision: "inspect" | "project_queue" | "hold";
        reasons?: string[] | undefined;
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
    lineageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        persistence: {
            status: "accepted" | "validated" | "rejected";
            summary: {
                requestCode: string;
                decision: "accepted" | "rejected";
                nodeCount: number;
                edgeCount: number;
                artifactCount: number;
            };
            requestCode: string;
            lineage: {
                packetRef: {
                    packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                lineageRecord: {
                    packetRef: {
                        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                        packetCode: string;
                        packetVersion?: number | undefined;
                    };
                    lineageCode: string;
                    nodes: {
                        label: string;
                        nodeCode: string;
                        nodeKind: "benchmark_audit" | "ingestion_artifact" | "package" | "compile_output" | "validation_result";
                        packetRef?: {
                            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
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
            decision: {
                decision: "accepted" | "rejected";
                persisted: boolean;
                reasons?: string[] | undefined;
            };
            persistenceCode: string;
            metadata?: Record<string, unknown> | undefined;
        };
    };
    panel: {
        title: string;
        panelCode: string;
        panelKind: "package_inspector" | "validation_inspector" | "lineage_inspector" | "queue_projection";
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
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        selectedCodes: string[];
        metadata?: Record<string, unknown> | undefined;
    };
    artifactReference: {
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