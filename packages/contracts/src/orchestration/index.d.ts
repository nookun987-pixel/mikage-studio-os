import { z } from 'zod';
export declare const canonQueryModeSchema: z.ZodEnum<["disabled", "advisory", "blocking"]>;
export declare const sceneBuilderModeSchema: z.ZodEnum<["canonical_only", "scene_seeded", "scene_locked"]>;
export declare const scriptBuilderModeSchema: z.ZodEnum<["disabled", "outline_only", "full_script"]>;
export declare const productionPackageModeSchema: z.ZodEnum<["prompt_pack_only", "production_shell", "benchmark_audit_shell"]>;
export declare const contextPacketReferenceSchema: z.ZodObject<{
    packetCode: z.ZodString;
    packetVersion: z.ZodDefault<z.ZodNumber>;
} & {
    packetKind: z.ZodEnum<["world_context", "state_snapshot", "canon_report"]>;
}, "strip", z.ZodTypeAny, {
    packetKind: "world_context" | "state_snapshot" | "canon_report";
    packetCode: string;
    packetVersion: number;
}, {
    packetKind: "world_context" | "state_snapshot" | "canon_report";
    packetCode: string;
    packetVersion?: number | undefined;
}>;
export declare const benchmarkAuditRequestShellSchema: z.ZodObject<{
    benchmarkSetCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    auditProfileCode: z.ZodOptional<z.ZodString>;
    requireLineageAudit: z.ZodDefault<z.ZodBoolean>;
    requireBenchmarkPass: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    benchmarkSetCodes: string[];
    requireLineageAudit: boolean;
    requireBenchmarkPass: boolean;
    tags: string[];
    auditProfileCode?: string | undefined;
}, {
    benchmarkSetCodes?: string[] | undefined;
    auditProfileCode?: string | undefined;
    requireLineageAudit?: boolean | undefined;
    requireBenchmarkPass?: boolean | undefined;
    tags?: string[] | undefined;
}>;
export declare const orchestrationRequestSchema: z.ZodObject<{
    requestCode: z.ZodString;
    projectSlug: z.ZodString;
    characterCode: z.ZodString;
    anchorCode: z.ZodString;
    presetCode: z.ZodString;
    variantCode: z.ZodString;
    sceneCode: z.ZodString;
    shotCode: z.ZodString;
    providerCode: z.ZodString;
    outputCount: z.ZodNumber;
    contextPackets: z.ZodDefault<z.ZodArray<z.ZodObject<{
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    } & {
        packetKind: z.ZodEnum<["world_context", "state_snapshot", "canon_report"]>;
    }, "strip", z.ZodTypeAny, {
        packetKind: "world_context" | "state_snapshot" | "canon_report";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "world_context" | "state_snapshot" | "canon_report";
        packetCode: string;
        packetVersion?: number | undefined;
    }>, "many">>;
    canonQueryMode: z.ZodDefault<z.ZodEnum<["disabled", "advisory", "blocking"]>>;
    sceneBuilderMode: z.ZodDefault<z.ZodEnum<["canonical_only", "scene_seeded", "scene_locked"]>>;
    scriptBuilderMode: z.ZodDefault<z.ZodEnum<["disabled", "outline_only", "full_script"]>>;
    productionPackageMode: z.ZodDefault<z.ZodEnum<["prompt_pack_only", "production_shell", "benchmark_audit_shell"]>>;
    benchmarkAudit: z.ZodDefault<z.ZodObject<{
        benchmarkSetCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        auditProfileCode: z.ZodOptional<z.ZodString>;
        requireLineageAudit: z.ZodDefault<z.ZodBoolean>;
        requireBenchmarkPass: z.ZodDefault<z.ZodBoolean>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        benchmarkSetCodes: string[];
        requireLineageAudit: boolean;
        requireBenchmarkPass: boolean;
        tags: string[];
        auditProfileCode?: string | undefined;
    }, {
        benchmarkSetCodes?: string[] | undefined;
        auditProfileCode?: string | undefined;
        requireLineageAudit?: boolean | undefined;
        requireBenchmarkPass?: boolean | undefined;
        tags?: string[] | undefined;
    }>>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    requestCode: string;
    presetCode: string;
    variantCode: string;
    projectSlug: string;
    contextPackets: {
        packetKind: "world_context" | "state_snapshot" | "canon_report";
        packetCode: string;
        packetVersion: number;
    }[];
    providerCode: string;
    outputCount: number;
    benchmarkAudit: {
        benchmarkSetCodes: string[];
        requireLineageAudit: boolean;
        requireBenchmarkPass: boolean;
        tags: string[];
        auditProfileCode?: string | undefined;
    };
    characterCode: string;
    anchorCode: string;
    sceneCode: string;
    shotCode: string;
    canonQueryMode: "disabled" | "advisory" | "blocking";
    sceneBuilderMode: "canonical_only" | "scene_seeded" | "scene_locked";
    scriptBuilderMode: "disabled" | "outline_only" | "full_script";
    productionPackageMode: "prompt_pack_only" | "production_shell" | "benchmark_audit_shell";
}, {
    requestCode: string;
    presetCode: string;
    variantCode: string;
    projectSlug: string;
    providerCode: string;
    outputCount: number;
    characterCode: string;
    anchorCode: string;
    sceneCode: string;
    shotCode: string;
    metadata?: Record<string, unknown> | undefined;
    contextPackets?: {
        packetKind: "world_context" | "state_snapshot" | "canon_report";
        packetCode: string;
        packetVersion?: number | undefined;
    }[] | undefined;
    benchmarkAudit?: {
        benchmarkSetCodes?: string[] | undefined;
        auditProfileCode?: string | undefined;
        requireLineageAudit?: boolean | undefined;
        requireBenchmarkPass?: boolean | undefined;
        tags?: string[] | undefined;
    } | undefined;
    canonQueryMode?: "disabled" | "advisory" | "blocking" | undefined;
    sceneBuilderMode?: "canonical_only" | "scene_seeded" | "scene_locked" | undefined;
    scriptBuilderMode?: "disabled" | "outline_only" | "full_script" | undefined;
    productionPackageMode?: "prompt_pack_only" | "production_shell" | "benchmark_audit_shell" | undefined;
}>;
export declare const orchestrationRequestAcceptedResponseSchema: z.ZodObject<{
    requestCode: z.ZodString;
    status: z.ZodEnum<["accepted", "validated", "rejected"]>;
    acceptedAt: z.ZodString;
    boundaryPacket: z.ZodObject<{
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    } & {
        packetKind: z.ZodLiteral<"orchestration_request">;
    }, "strip", z.ZodTypeAny, {
        packetKind: "orchestration_request";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "orchestration_request";
        packetCode: string;
        packetVersion?: number | undefined;
    }>;
    downstreamPackets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    status: "accepted" | "validated" | "rejected";
    metadata: Record<string, unknown>;
    requestCode: string;
    acceptedAt: string;
    boundaryPacket: {
        packetKind: "orchestration_request";
        packetCode: string;
        packetVersion: number;
    };
    downstreamPackets: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion: number;
    }[];
}, {
    status: "accepted" | "validated" | "rejected";
    requestCode: string;
    acceptedAt: string;
    boundaryPacket: {
        packetKind: "orchestration_request";
        packetCode: string;
        packetVersion?: number | undefined;
    };
    metadata?: Record<string, unknown> | undefined;
    downstreamPackets?: {
        packetKind: "orchestration_request" | "world_context" | "state_snapshot" | "canon_report" | "scene_packet" | "script_packet" | "production_package" | "benchmark_audit" | "ingestion_artifact" | "lineage_record";
        packetCode: string;
        packetVersion?: number | undefined;
    }[] | undefined;
}>;
export declare const cinematicJobRequestSchema: z.ZodObject<Pick<{
    requestCode: z.ZodString;
    projectSlug: z.ZodString;
    characterCode: z.ZodString;
    anchorCode: z.ZodString;
    presetCode: z.ZodString;
    variantCode: z.ZodString;
    sceneCode: z.ZodString;
    shotCode: z.ZodString;
    providerCode: z.ZodString;
    outputCount: z.ZodNumber;
    contextPackets: z.ZodDefault<z.ZodArray<z.ZodObject<{
        packetCode: z.ZodString;
        packetVersion: z.ZodDefault<z.ZodNumber>;
    } & {
        packetKind: z.ZodEnum<["world_context", "state_snapshot", "canon_report"]>;
    }, "strip", z.ZodTypeAny, {
        packetKind: "world_context" | "state_snapshot" | "canon_report";
        packetCode: string;
        packetVersion: number;
    }, {
        packetKind: "world_context" | "state_snapshot" | "canon_report";
        packetCode: string;
        packetVersion?: number | undefined;
    }>, "many">>;
    canonQueryMode: z.ZodDefault<z.ZodEnum<["disabled", "advisory", "blocking"]>>;
    sceneBuilderMode: z.ZodDefault<z.ZodEnum<["canonical_only", "scene_seeded", "scene_locked"]>>;
    scriptBuilderMode: z.ZodDefault<z.ZodEnum<["disabled", "outline_only", "full_script"]>>;
    productionPackageMode: z.ZodDefault<z.ZodEnum<["prompt_pack_only", "production_shell", "benchmark_audit_shell"]>>;
    benchmarkAudit: z.ZodDefault<z.ZodObject<{
        benchmarkSetCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        auditProfileCode: z.ZodOptional<z.ZodString>;
        requireLineageAudit: z.ZodDefault<z.ZodBoolean>;
        requireBenchmarkPass: z.ZodDefault<z.ZodBoolean>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        benchmarkSetCodes: string[];
        requireLineageAudit: boolean;
        requireBenchmarkPass: boolean;
        tags: string[];
        auditProfileCode?: string | undefined;
    }, {
        benchmarkSetCodes?: string[] | undefined;
        auditProfileCode?: string | undefined;
        requireLineageAudit?: boolean | undefined;
        requireBenchmarkPass?: boolean | undefined;
        tags?: string[] | undefined;
    }>>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "presetCode" | "variantCode" | "projectSlug" | "providerCode" | "outputCount" | "characterCode" | "anchorCode" | "sceneCode" | "shotCode">, "strip", z.ZodTypeAny, {
    presetCode: string;
    variantCode: string;
    projectSlug: string;
    providerCode: string;
    outputCount: number;
    characterCode: string;
    anchorCode: string;
    sceneCode: string;
    shotCode: string;
}, {
    presetCode: string;
    variantCode: string;
    projectSlug: string;
    providerCode: string;
    outputCount: number;
    characterCode: string;
    anchorCode: string;
    sceneCode: string;
    shotCode: string;
}>;
export type CanonQueryMode = z.infer<typeof canonQueryModeSchema>;
export type SceneBuilderMode = z.infer<typeof sceneBuilderModeSchema>;
export type ScriptBuilderMode = z.infer<typeof scriptBuilderModeSchema>;
export type ProductionPackageMode = z.infer<typeof productionPackageModeSchema>;
export type ContextPacketReference = z.infer<typeof contextPacketReferenceSchema>;
export type BenchmarkAuditRequestShell = z.infer<typeof benchmarkAuditRequestShellSchema>;
export type OrchestrationRequest = z.infer<typeof orchestrationRequestSchema>;
export type OrchestrationRequestAcceptedResponse = z.infer<typeof orchestrationRequestAcceptedResponseSchema>;
//# sourceMappingURL=index.d.ts.map