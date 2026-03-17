import { z } from 'zod';
export declare const violationSeveritySchema: z.ZodEnum<["warning", "blocker"]>;
export declare const validationDecisionSchema: z.ZodEnum<["accepted", "rejected"]>;
export declare const violationItemSchema: z.ZodObject<{
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
}>;
export declare const warningItemSchema: z.ZodObject<{
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
}>;
export declare const ontologyCheckShellSchema: z.ZodObject<{
    requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    kind: z.ZodLiteral<"ontology">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requiredTerms: string[];
    prohibitedTerms: string[];
    advisoryTerms: string[];
    kind: "ontology";
}, {
    kind: "ontology";
    metadata?: Record<string, unknown> | undefined;
    requiredTerms?: string[] | undefined;
    prohibitedTerms?: string[] | undefined;
    advisoryTerms?: string[] | undefined;
}>;
export declare const invariantCheckShellSchema: z.ZodObject<{
    requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    kind: z.ZodLiteral<"invariants">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requiredTerms: string[];
    prohibitedTerms: string[];
    advisoryTerms: string[];
    kind: "invariants";
}, {
    kind: "invariants";
    metadata?: Record<string, unknown> | undefined;
    requiredTerms?: string[] | undefined;
    prohibitedTerms?: string[] | undefined;
    advisoryTerms?: string[] | undefined;
}>;
export declare const philosophicalAxisCheckShellSchema: z.ZodObject<{
    requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    kind: z.ZodLiteral<"philosophical_axes">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requiredTerms: string[];
    prohibitedTerms: string[];
    advisoryTerms: string[];
    kind: "philosophical_axes";
}, {
    kind: "philosophical_axes";
    metadata?: Record<string, unknown> | undefined;
    requiredTerms?: string[] | undefined;
    prohibitedTerms?: string[] | undefined;
    advisoryTerms?: string[] | undefined;
}>;
export declare const characterTruthCheckShellSchema: z.ZodObject<{
    requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    kind: z.ZodLiteral<"character_truth">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requiredTerms: string[];
    prohibitedTerms: string[];
    advisoryTerms: string[];
    kind: "character_truth";
}, {
    kind: "character_truth";
    metadata?: Record<string, unknown> | undefined;
    requiredTerms?: string[] | undefined;
    prohibitedTerms?: string[] | undefined;
    advisoryTerms?: string[] | undefined;
}>;
export declare const visualGrammarCheckShellSchema: z.ZodObject<{
    requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    kind: z.ZodLiteral<"visual_grammar">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requiredTerms: string[];
    prohibitedTerms: string[];
    advisoryTerms: string[];
    kind: "visual_grammar";
}, {
    kind: "visual_grammar";
    metadata?: Record<string, unknown> | undefined;
    requiredTerms?: string[] | undefined;
    prohibitedTerms?: string[] | undefined;
    advisoryTerms?: string[] | undefined;
}>;
export declare const driftRiskShellSchema: z.ZodObject<{
    kind: z.ZodLiteral<"drift_risk">;
    riskTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    hardBlockTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    kind: "drift_risk";
    riskTerms: string[];
    hardBlockTerms: string[];
}, {
    kind: "drift_risk";
    metadata?: Record<string, unknown> | undefined;
    riskTerms?: string[] | undefined;
    hardBlockTerms?: string[] | undefined;
}>;
export declare const canonValidationInputSchema: z.ZodObject<{
    requestCode: z.ZodString;
    queryMode: z.ZodDefault<z.ZodEnum<["disabled", "advisory", "blocking"]>>;
    compiledPromptPacket: z.ZodObject<{
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
    ontology: z.ZodObject<{
        requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        kind: z.ZodLiteral<"ontology">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "ontology";
    }, {
        kind: "ontology";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    }>;
    invariants: z.ZodObject<{
        requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        kind: z.ZodLiteral<"invariants">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "invariants";
    }, {
        kind: "invariants";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    }>;
    philosophicalAxes: z.ZodObject<{
        requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        kind: z.ZodLiteral<"philosophical_axes">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "philosophical_axes";
    }, {
        kind: "philosophical_axes";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    }>;
    characterTruth: z.ZodObject<{
        requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        kind: z.ZodLiteral<"character_truth">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "character_truth";
    }, {
        kind: "character_truth";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    }>;
    visualGrammar: z.ZodObject<{
        requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        kind: z.ZodLiteral<"visual_grammar">;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "visual_grammar";
    }, {
        kind: "visual_grammar";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    }>;
    driftRisk: z.ZodObject<{
        kind: z.ZodLiteral<"drift_risk">;
        riskTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        hardBlockTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        kind: "drift_risk";
        riskTerms: string[];
        hardBlockTerms: string[];
    }, {
        kind: "drift_risk";
        metadata?: Record<string, unknown> | undefined;
        riskTerms?: string[] | undefined;
        hardBlockTerms?: string[] | undefined;
    }>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requestCode: string;
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
    ontology: {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "ontology";
    };
    invariants: {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "invariants";
    };
    queryMode: "disabled" | "advisory" | "blocking";
    compiledPromptPacket: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    philosophicalAxes: {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "philosophical_axes";
    };
    characterTruth: {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "character_truth";
    };
    visualGrammar: {
        metadata: Record<string, unknown>;
        requiredTerms: string[];
        prohibitedTerms: string[];
        advisoryTerms: string[];
        kind: "visual_grammar";
    };
    driftRisk: {
        metadata: Record<string, unknown>;
        kind: "drift_risk";
        riskTerms: string[];
        hardBlockTerms: string[];
    };
}, {
    requestCode: string;
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
    ontology: {
        kind: "ontology";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    };
    invariants: {
        kind: "invariants";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    };
    compiledPromptPacket: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    philosophicalAxes: {
        kind: "philosophical_axes";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    };
    characterTruth: {
        kind: "character_truth";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    };
    visualGrammar: {
        kind: "visual_grammar";
        metadata?: Record<string, unknown> | undefined;
        requiredTerms?: string[] | undefined;
        prohibitedTerms?: string[] | undefined;
        advisoryTerms?: string[] | undefined;
    };
    driftRisk: {
        kind: "drift_risk";
        metadata?: Record<string, unknown> | undefined;
        riskTerms?: string[] | undefined;
        hardBlockTerms?: string[] | undefined;
    };
    metadata?: Record<string, unknown> | undefined;
    queryMode?: "disabled" | "advisory" | "blocking" | undefined;
}>;
export declare const canonValidationRequestSchema: z.ZodObject<{
    promptPackCode: z.ZodString;
    queryMode: z.ZodDefault<z.ZodEnum<["disabled", "advisory", "blocking"]>>;
    input: z.ZodOptional<z.ZodObject<{
        requestCode: z.ZodString;
        queryMode: z.ZodDefault<z.ZodEnum<["disabled", "advisory", "blocking"]>>;
        compiledPromptPacket: z.ZodObject<{
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
        ontology: z.ZodObject<{
            requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodLiteral<"ontology">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "ontology";
        }, {
            kind: "ontology";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        }>;
        invariants: z.ZodObject<{
            requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodLiteral<"invariants">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "invariants";
        }, {
            kind: "invariants";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        }>;
        philosophicalAxes: z.ZodObject<{
            requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodLiteral<"philosophical_axes">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "philosophical_axes";
        }, {
            kind: "philosophical_axes";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        }>;
        characterTruth: z.ZodObject<{
            requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodLiteral<"character_truth">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "character_truth";
        }, {
            kind: "character_truth";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        }>;
        visualGrammar: z.ZodObject<{
            requiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            prohibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            advisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodLiteral<"visual_grammar">;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "visual_grammar";
        }, {
            kind: "visual_grammar";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        }>;
        driftRisk: z.ZodObject<{
            kind: z.ZodLiteral<"drift_risk">;
            riskTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            hardBlockTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            metadata: Record<string, unknown>;
            kind: "drift_risk";
            riskTerms: string[];
            hardBlockTerms: string[];
        }, {
            kind: "drift_risk";
            metadata?: Record<string, unknown> | undefined;
            riskTerms?: string[] | undefined;
            hardBlockTerms?: string[] | undefined;
        }>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requestCode: string;
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
        ontology: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "ontology";
        };
        invariants: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "invariants";
        };
        queryMode: "disabled" | "advisory" | "blocking";
        compiledPromptPacket: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        philosophicalAxes: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "philosophical_axes";
        };
        characterTruth: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "character_truth";
        };
        visualGrammar: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "visual_grammar";
        };
        driftRisk: {
            metadata: Record<string, unknown>;
            kind: "drift_risk";
            riskTerms: string[];
            hardBlockTerms: string[];
        };
    }, {
        requestCode: string;
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
        ontology: {
            kind: "ontology";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        invariants: {
            kind: "invariants";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        compiledPromptPacket: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        philosophicalAxes: {
            kind: "philosophical_axes";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        characterTruth: {
            kind: "character_truth";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        visualGrammar: {
            kind: "visual_grammar";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        driftRisk: {
            kind: "drift_risk";
            metadata?: Record<string, unknown> | undefined;
            riskTerms?: string[] | undefined;
            hardBlockTerms?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        queryMode?: "disabled" | "advisory" | "blocking" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    queryMode: "disabled" | "advisory" | "blocking";
    promptPackCode: string;
    input?: {
        metadata: Record<string, unknown>;
        requestCode: string;
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
        ontology: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "ontology";
        };
        invariants: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "invariants";
        };
        queryMode: "disabled" | "advisory" | "blocking";
        compiledPromptPacket: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        philosophicalAxes: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "philosophical_axes";
        };
        characterTruth: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "character_truth";
        };
        visualGrammar: {
            metadata: Record<string, unknown>;
            requiredTerms: string[];
            prohibitedTerms: string[];
            advisoryTerms: string[];
            kind: "visual_grammar";
        };
        driftRisk: {
            metadata: Record<string, unknown>;
            kind: "drift_risk";
            riskTerms: string[];
            hardBlockTerms: string[];
        };
    } | undefined;
}, {
    promptPackCode: string;
    queryMode?: "disabled" | "advisory" | "blocking" | undefined;
    input?: {
        requestCode: string;
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
        ontology: {
            kind: "ontology";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        invariants: {
            kind: "invariants";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        compiledPromptPacket: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        philosophicalAxes: {
            kind: "philosophical_axes";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        characterTruth: {
            kind: "character_truth";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        visualGrammar: {
            kind: "visual_grammar";
            metadata?: Record<string, unknown> | undefined;
            requiredTerms?: string[] | undefined;
            prohibitedTerms?: string[] | undefined;
            advisoryTerms?: string[] | undefined;
        };
        driftRisk: {
            kind: "drift_risk";
            metadata?: Record<string, unknown> | undefined;
            riskTerms?: string[] | undefined;
            hardBlockTerms?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        queryMode?: "disabled" | "advisory" | "blocking" | undefined;
    } | undefined;
}>;
export declare const validationPassResultSchema: z.ZodObject<{
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
}>;
export declare const canonValidationResultSchema: z.ZodObject<{
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
export type ValidationDecision = z.infer<typeof validationDecisionSchema>;
export type ViolationItem = z.infer<typeof violationItemSchema>;
export type WarningItem = z.infer<typeof warningItemSchema>;
export type OntologyCheckShell = z.infer<typeof ontologyCheckShellSchema>;
export type InvariantCheckShell = z.infer<typeof invariantCheckShellSchema>;
export type PhilosophicalAxisCheckShell = z.infer<typeof philosophicalAxisCheckShellSchema>;
export type CharacterTruthCheckShell = z.infer<typeof characterTruthCheckShellSchema>;
export type VisualGrammarCheckShell = z.infer<typeof visualGrammarCheckShellSchema>;
export type DriftRiskShell = z.infer<typeof driftRiskShellSchema>;
export type CanonValidationInput = z.infer<typeof canonValidationInputSchema>;
export type CanonValidationRequest = z.infer<typeof canonValidationRequestSchema>;
export type ValidationPassResult = z.infer<typeof validationPassResultSchema>;
export type CanonValidationResult = z.infer<typeof canonValidationResultSchema>;
//# sourceMappingURL=index.d.ts.map