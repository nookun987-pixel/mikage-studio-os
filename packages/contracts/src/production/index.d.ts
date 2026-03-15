import { z } from 'zod';
export declare const packageModeShellSchema: z.ZodEnum<["prompt_bundle_only", "production_ready", "production_with_audit_placeholder"]>;
export declare const packageJobShellSchema: z.ZodObject<{
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
export declare const assetIntentShellSchema: z.ZodObject<{
    assetKind: z.ZodEnum<["image_generation", "prompt_bundle"]>;
    outputCount: z.ZodNumber;
    targetAspectRatio: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    outputCount: number;
    assetKind: "image_generation" | "prompt_bundle";
    targetAspectRatio: string;
}, {
    outputCount: number;
    assetKind: "image_generation" | "prompt_bundle";
    targetAspectRatio: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const compiledPromptReferenceShellSchema: z.ZodObject<{
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
export declare const validationReferenceShellSchema: z.ZodObject<{
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
export declare const negativePromptReferenceShellSchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    negativePrompt: {
        clauses: string[];
        rendered: string;
    };
}, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    negativePrompt: {
        clauses?: string[] | undefined;
        rendered?: string | undefined;
    };
}>;
export declare const lineageReferenceShellSchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
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
}, {
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
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
}>;
export declare const benchmarkAuditPlaceholderShellSchema: z.ZodObject<{
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
export declare const rejectionReasonShellSchema: z.ZodObject<{
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
}>;
export declare const packageDecisionShellSchema: z.ZodObject<{
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
export declare const productionPackageInputSchema: z.ZodObject<{
    requestCode: z.ZodString;
    packageCode: z.ZodString;
    packageMode: z.ZodEnum<["prompt_bundle_only", "production_ready", "production_with_audit_placeholder"]>;
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
    assetIntent: z.ZodObject<{
        assetKind: z.ZodEnum<["image_generation", "prompt_bundle"]>;
        outputCount: z.ZodNumber;
        targetAspectRatio: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        outputCount: number;
        assetKind: "image_generation" | "prompt_bundle";
        targetAspectRatio: string;
    }, {
        outputCount: number;
        assetKind: "image_generation" | "prompt_bundle";
        targetAspectRatio: string;
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
    negativePromptReference: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        negativePrompt: {
            clauses: string[];
            rendered: string;
        };
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        negativePrompt: {
            clauses?: string[] | undefined;
            rendered?: string | undefined;
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
    }, "strip", z.ZodTypeAny, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
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
    }, {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
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
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requestCode: string;
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
    assetIntent: {
        metadata: Record<string, unknown>;
        outputCount: number;
        assetKind: "image_generation" | "prompt_bundle";
        targetAspectRatio: string;
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
    negativePromptReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        negativePrompt: {
            clauses: string[];
            rendered: string;
        };
    };
    lineageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
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
    };
    benchmarkAudit: {
        status: "pending" | "not_requested";
        metadata: Record<string, unknown>;
        auditCode: string;
        notes: string[];
    };
}, {
    requestCode: string;
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
    assetIntent: {
        outputCount: number;
        assetKind: "image_generation" | "prompt_bundle";
        targetAspectRatio: string;
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
    negativePromptReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        negativePrompt: {
            clauses?: string[] | undefined;
            rendered?: string | undefined;
        };
    };
    lineageReference: {
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
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
    };
    benchmarkAudit: {
        auditCode: string;
        status?: "pending" | "not_requested" | undefined;
        metadata?: Record<string, unknown> | undefined;
        notes?: string[] | undefined;
    };
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const productionPackageRequestSchema: z.ZodObject<{
    requestCode: z.ZodString;
    input: z.ZodObject<{
        requestCode: z.ZodString;
        packageCode: z.ZodString;
        packageMode: z.ZodEnum<["prompt_bundle_only", "production_ready", "production_with_audit_placeholder"]>;
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
        assetIntent: z.ZodObject<{
            assetKind: z.ZodEnum<["image_generation", "prompt_bundle"]>;
            outputCount: z.ZodNumber;
            targetAspectRatio: z.ZodString;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            outputCount: number;
            assetKind: "image_generation" | "prompt_bundle";
            targetAspectRatio: string;
        }, {
            outputCount: number;
            assetKind: "image_generation" | "prompt_bundle";
            targetAspectRatio: string;
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
        negativePromptReference: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            negativePrompt: {
                clauses: string[];
                rendered: string;
            };
        }, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            negativePrompt: {
                clauses?: string[] | undefined;
                rendered?: string | undefined;
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
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
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
        }, {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
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
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requestCode: string;
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
        assetIntent: {
            metadata: Record<string, unknown>;
            outputCount: number;
            assetKind: "image_generation" | "prompt_bundle";
            targetAspectRatio: string;
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
        negativePromptReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            negativePrompt: {
                clauses: string[];
                rendered: string;
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
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
        };
        benchmarkAudit: {
            status: "pending" | "not_requested";
            metadata: Record<string, unknown>;
            auditCode: string;
            notes: string[];
        };
    }, {
        requestCode: string;
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
        assetIntent: {
            outputCount: number;
            assetKind: "image_generation" | "prompt_bundle";
            targetAspectRatio: string;
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
        negativePromptReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            negativePrompt: {
                clauses?: string[] | undefined;
                rendered?: string | undefined;
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
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
        };
        benchmarkAudit: {
            auditCode: string;
            status?: "pending" | "not_requested" | undefined;
            metadata?: Record<string, unknown> | undefined;
            notes?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    requestCode: string;
    input: {
        metadata: Record<string, unknown>;
        requestCode: string;
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
        assetIntent: {
            metadata: Record<string, unknown>;
            outputCount: number;
            assetKind: "image_generation" | "prompt_bundle";
            targetAspectRatio: string;
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
        negativePromptReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            negativePrompt: {
                clauses: string[];
                rendered: string;
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
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
        };
        benchmarkAudit: {
            status: "pending" | "not_requested";
            metadata: Record<string, unknown>;
            auditCode: string;
            notes: string[];
        };
    };
}, {
    requestCode: string;
    input: {
        requestCode: string;
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
        assetIntent: {
            outputCount: number;
            assetKind: "image_generation" | "prompt_bundle";
            targetAspectRatio: string;
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
        negativePromptReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            negativePrompt: {
                clauses?: string[] | undefined;
                rendered?: string | undefined;
            };
        };
        lineageReference: {
            packetRef: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
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
        };
        benchmarkAudit: {
            auditCode: string;
            status?: "pending" | "not_requested" | undefined;
            metadata?: Record<string, unknown> | undefined;
            notes?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const packageSummaryShellSchema: z.ZodObject<{
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
export declare const promptBundleShellSchema: z.ZodObject<{
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
export declare const productionPackageResultSchema: z.ZodObject<{
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
export type PackageModeShell = z.infer<typeof packageModeShellSchema>;
export type PackageJobShell = z.infer<typeof packageJobShellSchema>;
export type AssetIntentShell = z.infer<typeof assetIntentShellSchema>;
export type CompiledPromptReferenceShell = z.infer<typeof compiledPromptReferenceShellSchema>;
export type ValidationReferenceShell = z.infer<typeof validationReferenceShellSchema>;
export type NegativePromptReferenceShell = z.infer<typeof negativePromptReferenceShellSchema>;
export type LineageReferenceShell = z.infer<typeof lineageReferenceShellSchema>;
export type BenchmarkAuditPlaceholderShell = z.infer<typeof benchmarkAuditPlaceholderShellSchema>;
export type RejectionReasonShell = z.infer<typeof rejectionReasonShellSchema>;
export type PackageDecisionShell = z.infer<typeof packageDecisionShellSchema>;
export type ProductionPackageInput = z.infer<typeof productionPackageInputSchema>;
export type ProductionPackageRequest = z.infer<typeof productionPackageRequestSchema>;
export type PackageSummaryShell = z.infer<typeof packageSummaryShellSchema>;
export type ProductionPackageResult = z.infer<typeof productionPackageResultSchema>;
//# sourceMappingURL=index.d.ts.map