import { z } from 'zod';
export declare const packetKindSchema: z.ZodEnum<["orchestration_request", "world_context", "state_snapshot", "canon_report", "scene_packet", "script_packet", "production_package", "benchmark_audit", "ingestion_artifact", "lineage_record"]>;
export declare const packetRefSchema: z.ZodObject<{
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
export declare const boundaryStatusSchema: z.ZodEnum<["accepted", "validated", "rejected"]>;
export declare const boundaryMetadataSchema: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
export type PacketKind = z.infer<typeof packetKindSchema>;
export type PacketRef = z.infer<typeof packetRefSchema>;
export type BoundaryStatus = z.infer<typeof boundaryStatusSchema>;
//# sourceMappingURL=index.d.ts.map