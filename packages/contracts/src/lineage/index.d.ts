import { z } from 'zod';
export declare const lineageNodeShellSchema: z.ZodObject<{
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
}>;
export declare const lineageEdgeShellSchema: z.ZodObject<{
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
}>;
export declare const lineageRecordShellSchema: z.ZodObject<{
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
export declare const persistenceDecisionShellSchema: z.ZodObject<{
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
export declare const persistenceSummaryShellSchema: z.ZodObject<{
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
export declare const persistenceInputSchema: z.ZodObject<{
    requestCode: z.ZodString;
    ingestion: z.ZodObject<{
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
        processingStatus: "received" | "persisted" | "extracted";
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
        processingStatus: "received" | "persisted" | "extracted";
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
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requestCode: string;
    ingestion: {
        status: "accepted" | "validated" | "rejected";
        metadata: Record<string, unknown>;
        requestCode: string;
        ingestionCode: string;
        processingStatus: "received" | "persisted" | "extracted";
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
    };
}, {
    requestCode: string;
    ingestion: {
        status: "accepted" | "validated" | "rejected";
        requestCode: string;
        ingestionCode: string;
        processingStatus: "received" | "persisted" | "extracted";
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
    };
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const persistenceRequestSchema: z.ZodObject<{
    requestCode: z.ZodString;
    input: z.ZodObject<{
        requestCode: z.ZodString;
        ingestion: z.ZodObject<{
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
            processingStatus: "received" | "persisted" | "extracted";
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
            processingStatus: "received" | "persisted" | "extracted";
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
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requestCode: string;
        ingestion: {
            status: "accepted" | "validated" | "rejected";
            metadata: Record<string, unknown>;
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
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
        };
    }, {
        requestCode: string;
        ingestion: {
            status: "accepted" | "validated" | "rejected";
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
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
        };
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    requestCode: string;
    input: {
        metadata: Record<string, unknown>;
        requestCode: string;
        ingestion: {
            status: "accepted" | "validated" | "rejected";
            metadata: Record<string, unknown>;
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
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
        };
    };
}, {
    requestCode: string;
    input: {
        requestCode: string;
        ingestion: {
            status: "accepted" | "validated" | "rejected";
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
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
        };
        metadata?: Record<string, unknown> | undefined;
    };
}>;
export declare const persistenceResultSchema: z.ZodObject<{
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
export type LineageNodeShell = z.infer<typeof lineageNodeShellSchema>;
export type LineageEdgeShell = z.infer<typeof lineageEdgeShellSchema>;
export type LineageRecordShell = z.infer<typeof lineageRecordShellSchema>;
export type LineageReferenceShell = z.infer<typeof lineageReferenceShellSchema>;
export type PersistenceDecisionShell = z.infer<typeof persistenceDecisionShellSchema>;
export type PersistenceSummaryShell = z.infer<typeof persistenceSummaryShellSchema>;
export type PersistenceInput = z.infer<typeof persistenceInputSchema>;
export type PersistenceRequest = z.infer<typeof persistenceRequestSchema>;
export type PersistenceResult = z.infer<typeof persistenceResultSchema>;
//# sourceMappingURL=index.d.ts.map