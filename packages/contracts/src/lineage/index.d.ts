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
export declare const lineageReferenceShellSchema: z.ZodObject<{
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
export declare const persistenceDecisionShellSchema: z.ZodObject<{
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
export declare const persistenceSummaryShellSchema: z.ZodObject<{
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            metadata: Record<string, unknown>;
            sourceCode: string;
            sourceKind: "benchmark_audit" | "production_package";
        }, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            sourceCode: string;
            sourceKind: "benchmark_audit" | "production_package";
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
            assetCode: string;
            assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
            contentType: "text/plain" | "application/json";
            checksum: string;
        }, {
            assetCode: string;
            assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
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
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            }, {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            }>;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            metadata: Record<string, unknown>;
            assetCode: string;
            artifactCode: string;
            artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
        }, {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            assetCode: string;
            artifactCode: string;
            artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
            metadata?: Record<string, unknown> | undefined;
        }>, "many">;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: "accepted" | "rejected" | "validated";
        metadata: Record<string, unknown>;
        requestCode: string;
        ingestionCode: string;
        processingStatus: "received" | "persisted" | "extracted";
        sources: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            metadata: Record<string, unknown>;
            sourceCode: string;
            sourceKind: "benchmark_audit" | "production_package";
        }[];
        assets: {
            metadata: Record<string, unknown>;
            assetCode: string;
            assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
            contentType: "text/plain" | "application/json";
            checksum: string;
        }[];
        artifacts: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            metadata: Record<string, unknown>;
            assetCode: string;
            artifactCode: string;
            artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
        }[];
    }, {
        status: "accepted" | "rejected" | "validated";
        requestCode: string;
        ingestionCode: string;
        processingStatus: "received" | "persisted" | "extracted";
        sources: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            sourceCode: string;
            sourceKind: "benchmark_audit" | "production_package";
            metadata?: Record<string, unknown> | undefined;
        }[];
        assets: {
            assetCode: string;
            assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
            contentType: "text/plain" | "application/json";
            checksum: string;
            metadata?: Record<string, unknown> | undefined;
        }[];
        artifacts: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            assetCode: string;
            artifactCode: string;
            artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
            metadata?: Record<string, unknown> | undefined;
        }[];
        metadata?: Record<string, unknown> | undefined;
    }>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requestCode: string;
    ingestion: {
        status: "accepted" | "rejected" | "validated";
        metadata: Record<string, unknown>;
        requestCode: string;
        ingestionCode: string;
        processingStatus: "received" | "persisted" | "extracted";
        sources: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            metadata: Record<string, unknown>;
            sourceCode: string;
            sourceKind: "benchmark_audit" | "production_package";
        }[];
        assets: {
            metadata: Record<string, unknown>;
            assetCode: string;
            assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
            contentType: "text/plain" | "application/json";
            checksum: string;
        }[];
        artifacts: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion: number;
            };
            metadata: Record<string, unknown>;
            assetCode: string;
            artifactCode: string;
            artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
        }[];
    };
}, {
    requestCode: string;
    ingestion: {
        status: "accepted" | "rejected" | "validated";
        requestCode: string;
        ingestionCode: string;
        processingStatus: "received" | "persisted" | "extracted";
        sources: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            sourceCode: string;
            sourceKind: "benchmark_audit" | "production_package";
            metadata?: Record<string, unknown> | undefined;
        }[];
        assets: {
            assetCode: string;
            assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
            contentType: "text/plain" | "application/json";
            checksum: string;
            metadata?: Record<string, unknown> | undefined;
        }[];
        artifacts: {
            packetRef: {
                packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                packetCode: string;
                packetVersion?: number | undefined;
            };
            assetCode: string;
            artifactCode: string;
            artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                }>;
                metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
            }, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
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
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
                contentType: "text/plain" | "application/json";
                checksum: string;
            }, {
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
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
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                }, {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                }>;
                metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
            }, {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
                metadata?: Record<string, unknown> | undefined;
            }>, "many">;
            metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
            sources: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
            }[];
            assets: {
                metadata: Record<string, unknown>;
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
                contentType: "text/plain" | "application/json";
                checksum: string;
            }[];
            artifacts: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
            }[];
        }, {
            status: "accepted" | "rejected" | "validated";
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
            sources: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
                metadata?: Record<string, unknown> | undefined;
            }[];
            assets: {
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
                contentType: "text/plain" | "application/json";
                checksum: string;
                metadata?: Record<string, unknown> | undefined;
            }[];
            artifacts: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
                metadata?: Record<string, unknown> | undefined;
            }[];
            metadata?: Record<string, unknown> | undefined;
        }>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        requestCode: string;
        ingestion: {
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
            sources: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
            }[];
            assets: {
                metadata: Record<string, unknown>;
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
                contentType: "text/plain" | "application/json";
                checksum: string;
            }[];
            artifacts: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
            }[];
        };
    }, {
        requestCode: string;
        ingestion: {
            status: "accepted" | "rejected" | "validated";
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
            sources: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
                metadata?: Record<string, unknown> | undefined;
            }[];
            assets: {
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
                contentType: "text/plain" | "application/json";
                checksum: string;
                metadata?: Record<string, unknown> | undefined;
            }[];
            artifacts: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
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
            status: "accepted" | "rejected" | "validated";
            metadata: Record<string, unknown>;
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
            sources: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
            }[];
            assets: {
                metadata: Record<string, unknown>;
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
                contentType: "text/plain" | "application/json";
                checksum: string;
            }[];
            artifacts: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion: number;
                };
                metadata: Record<string, unknown>;
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
            }[];
        };
    };
}, {
    requestCode: string;
    input: {
        requestCode: string;
        ingestion: {
            status: "accepted" | "rejected" | "validated";
            requestCode: string;
            ingestionCode: string;
            processingStatus: "received" | "persisted" | "extracted";
            sources: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                sourceCode: string;
                sourceKind: "benchmark_audit" | "production_package";
                metadata?: Record<string, unknown> | undefined;
            }[];
            assets: {
                assetCode: string;
                assetKind: "compiled_prompt" | "negative_prompt" | "validation_summary" | "benchmark_audit_summary" | "lineage_manifest";
                contentType: "text/plain" | "application/json";
                checksum: string;
                metadata?: Record<string, unknown> | undefined;
            }[];
            artifacts: {
                packetRef: {
                    packetKind: "benchmark_audit" | "ingestion_artifact" | "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "lineage_record";
                    packetCode: string;
                    packetVersion?: number | undefined;
                };
                assetCode: string;
                artifactCode: string;
                artifactKind: "lineage_manifest" | "prompt_bundle" | "validation_report" | "benchmark_report";
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