import { z } from 'zod';
export declare const compileModeSchema: z.ZodEnum<["scene_preview", "script_support", "production_prompt"]>;
export declare const compileContextFragmentSchema: z.ZodObject<{
    fragmentCode: z.ZodString;
    label: z.ZodString;
    summary: z.ZodString;
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
    fragmentCode: string;
    label: string;
    summary: string;
    metadata: Record<string, unknown>;
    packetRef?: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    } | undefined;
}, {
    fragmentCode: string;
    label: string;
    summary: string;
    packetRef?: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    } | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const compileInputPacketSchema: z.ZodObject<{
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
    fragments: z.ZodArray<z.ZodObject<{
        fragmentCode: z.ZodString;
        label: z.ZodString;
        summary: z.ZodString;
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
        fragmentCode: string;
        label: string;
        summary: string;
        metadata: Record<string, unknown>;
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        } | undefined;
    }, {
        fragmentCode: string;
        label: string;
        summary: string;
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        } | undefined;
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    summary: string;
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    };
    metadata: Record<string, unknown>;
    fragments: {
        fragmentCode: string;
        label: string;
        summary: string;
        metadata: Record<string, unknown>;
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        } | undefined;
    }[];
}, {
    summary: string;
    packetRef: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    fragments: {
        fragmentCode: string;
        label: string;
        summary: string;
        packetRef?: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        } | undefined;
        metadata?: Record<string, unknown> | undefined;
    }[];
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const negativePromptShellSchema: z.ZodObject<{
    clauses: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    rendered: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    clauses: string[];
    rendered: string;
}, {
    clauses?: string[] | undefined;
    rendered?: string | undefined;
}>;
export declare const lineageMetadataShellSchema: z.ZodObject<{
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
export declare const compileValidationResultShellSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    issues: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    issues: string[];
    valid: boolean;
}, {
    valid: boolean;
    issues?: string[] | undefined;
}>;
export declare const compileRequestSchema: z.ZodObject<{
    requestCode: z.ZodString;
    projectSlug: z.ZodString;
    presetCode: z.ZodString;
    variantCode: z.ZodString;
    compileMode: z.ZodEnum<["scene_preview", "script_support", "production_prompt"]>;
    systemFrame: z.ZodString;
    canonConstraints: z.ZodArray<z.ZodString, "many">;
    contextPackets: z.ZodArray<z.ZodObject<{
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
        fragments: z.ZodArray<z.ZodObject<{
            fragmentCode: z.ZodString;
            label: z.ZodString;
            summary: z.ZodString;
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
            fragmentCode: string;
            label: string;
            summary: string;
            metadata: Record<string, unknown>;
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            } | undefined;
        }, {
            fragmentCode: string;
            label: string;
            summary: string;
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            } | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>, "many">;
        summary: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        summary: string;
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        metadata: Record<string, unknown>;
        fragments: {
            fragmentCode: string;
            label: string;
            summary: string;
            metadata: Record<string, unknown>;
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            } | undefined;
        }[];
    }, {
        summary: string;
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        fragments: {
            fragmentCode: string;
            label: string;
            summary: string;
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            } | undefined;
            metadata?: Record<string, unknown> | undefined;
        }[];
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    modePayload: z.ZodObject<{
        title: z.ZodString;
        instructions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        title: string;
        instructions: string[];
    }, {
        title: string;
        instructions: string[];
    }>;
    outputInstructions: z.ZodArray<z.ZodString, "many">;
    negativePrompt: z.ZodDefault<z.ZodObject<{
        clauses: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        rendered: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        clauses: string[];
        rendered: string;
    }, {
        clauses?: string[] | undefined;
        rendered?: string | undefined;
    }>>;
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
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requestCode: string;
    presetCode: string;
    variantCode: string;
    projectSlug: string;
    compileMode: "scene_preview" | "script_support" | "production_prompt";
    systemFrame: string;
    canonConstraints: string[];
    contextPackets: {
        summary: string;
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion: number;
        };
        metadata: Record<string, unknown>;
        fragments: {
            fragmentCode: string;
            label: string;
            summary: string;
            metadata: Record<string, unknown>;
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            } | undefined;
        }[];
    }[];
    modePayload: {
        title: string;
        instructions: string[];
    };
    outputInstructions: string[];
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
}, {
    requestCode: string;
    presetCode: string;
    variantCode: string;
    projectSlug: string;
    compileMode: "scene_preview" | "script_support" | "production_prompt";
    systemFrame: string;
    canonConstraints: string[];
    contextPackets: {
        summary: string;
        packetRef: {
            packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
            packetCode: string;
            packetVersion?: number | undefined;
        };
        fragments: {
            fragmentCode: string;
            label: string;
            summary: string;
            packetRef?: {
                packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            } | undefined;
            metadata?: Record<string, unknown> | undefined;
        }[];
        metadata?: Record<string, unknown> | undefined;
    }[];
    modePayload: {
        title: string;
        instructions: string[];
    };
    outputInstructions: string[];
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
    metadata?: Record<string, unknown> | undefined;
    negativePrompt?: {
        clauses?: string[] | undefined;
        rendered?: string | undefined;
    } | undefined;
}>;
export declare const compileSectionSchema: z.ZodObject<{
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
}>;
export declare const compileOutputSchema: z.ZodObject<{
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
export type CompileMode = z.infer<typeof compileModeSchema>;
export type CompileContextFragment = z.infer<typeof compileContextFragmentSchema>;
export type CompileInputPacket = z.infer<typeof compileInputPacketSchema>;
export type NegativePromptShell = z.infer<typeof negativePromptShellSchema>;
export type LineageMetadataShell = z.infer<typeof lineageMetadataShellSchema>;
export type CompileValidationResultShell = z.infer<typeof compileValidationResultShellSchema>;
export type CompileRequest = z.infer<typeof compileRequestSchema>;
export type CompileSection = z.infer<typeof compileSectionSchema>;
export type CompileOutput = z.infer<typeof compileOutputSchema>;
//# sourceMappingURL=index.d.ts.map