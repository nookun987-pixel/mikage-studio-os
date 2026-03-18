import { z } from 'zod';
import { studioActionTypeSchema } from '@mikage/contracts';
export declare const runtimeCommandTypeSchema: z.ZodLiteral<"execute_generation_pipeline">;
export declare const runtimeCompileProfileSchema: z.ZodObject<{
    compileMode: z.ZodLiteral<"production_prompt">;
    systemFrame: z.ZodString;
    canonConstraints: z.ZodArray<z.ZodString, "many">;
    contextSummaries: z.ZodArray<z.ZodString, "many">;
    fragmentSummaries: z.ZodArray<z.ZodString, "many">;
    modeInstructions: z.ZodArray<z.ZodString, "many">;
    outputInstructions: z.ZodArray<z.ZodString, "many">;
    negativeClauses: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    compileMode: "production_prompt";
    systemFrame: string;
    canonConstraints: string[];
    outputInstructions: string[];
    contextSummaries: string[];
    fragmentSummaries: string[];
    modeInstructions: string[];
    negativeClauses: string[];
}, {
    compileMode: "production_prompt";
    systemFrame: string;
    canonConstraints: string[];
    outputInstructions: string[];
    contextSummaries: string[];
    fragmentSummaries: string[];
    modeInstructions: string[];
    negativeClauses: string[];
}>;
export declare const runtimeValidationProfileSchema: z.ZodObject<{
    ontologyRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    ontologyProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    ontologyAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    invariantRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    invariantProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    invariantAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    philosophicalRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    philosophicalProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    philosophicalAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    characterRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    characterProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    characterAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visualRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visualProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visualAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    driftRiskTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    driftHardBlockTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    ontologyRequiredTerms: string[];
    ontologyProhibitedTerms: string[];
    ontologyAdvisoryTerms: string[];
    invariantRequiredTerms: string[];
    invariantProhibitedTerms: string[];
    invariantAdvisoryTerms: string[];
    philosophicalRequiredTerms: string[];
    philosophicalProhibitedTerms: string[];
    philosophicalAdvisoryTerms: string[];
    characterRequiredTerms: string[];
    characterProhibitedTerms: string[];
    characterAdvisoryTerms: string[];
    visualRequiredTerms: string[];
    visualProhibitedTerms: string[];
    visualAdvisoryTerms: string[];
    driftRiskTerms: string[];
    driftHardBlockTerms: string[];
}, {
    ontologyRequiredTerms?: string[] | undefined;
    ontologyProhibitedTerms?: string[] | undefined;
    ontologyAdvisoryTerms?: string[] | undefined;
    invariantRequiredTerms?: string[] | undefined;
    invariantProhibitedTerms?: string[] | undefined;
    invariantAdvisoryTerms?: string[] | undefined;
    philosophicalRequiredTerms?: string[] | undefined;
    philosophicalProhibitedTerms?: string[] | undefined;
    philosophicalAdvisoryTerms?: string[] | undefined;
    characterRequiredTerms?: string[] | undefined;
    characterProhibitedTerms?: string[] | undefined;
    characterAdvisoryTerms?: string[] | undefined;
    visualRequiredTerms?: string[] | undefined;
    visualProhibitedTerms?: string[] | undefined;
    visualAdvisoryTerms?: string[] | undefined;
    driftRiskTerms?: string[] | undefined;
    driftHardBlockTerms?: string[] | undefined;
}>;
export declare const runtimeBenchmarkProfileSchema: z.ZodObject<{
    goldReferenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    silverReferenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    redBlockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    goldReferenceTerms: string[];
    silverReferenceTerms: string[];
    redBlockedTerms: string[];
}, {
    goldReferenceTerms?: string[] | undefined;
    silverReferenceTerms?: string[] | undefined;
    redBlockedTerms?: string[] | undefined;
}>;
export declare const runtimeStudioProfileSchema: z.ZodObject<{
    actionType: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
    panelCode: z.ZodString;
    panelTitle: z.ZodString;
    viewCode: z.ZodString;
    filterCode: z.ZodString;
    filterTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    panelCode: string;
    viewCode: string;
    filterCode: string;
    actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    panelTitle: string;
    filterTerms: string[];
}, {
    panelCode: string;
    viewCode: string;
    filterCode: string;
    actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
    panelTitle: string;
    filterTerms?: string[] | undefined;
}>;
export declare const orchestrationChainRequestShellSchema: z.ZodObject<{
    commandType: z.ZodLiteral<"execute_generation_pipeline">;
    request: z.ZodObject<{
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
    compileProfile: z.ZodObject<{
        compileMode: z.ZodLiteral<"production_prompt">;
        systemFrame: z.ZodString;
        canonConstraints: z.ZodArray<z.ZodString, "many">;
        contextSummaries: z.ZodArray<z.ZodString, "many">;
        fragmentSummaries: z.ZodArray<z.ZodString, "many">;
        modeInstructions: z.ZodArray<z.ZodString, "many">;
        outputInstructions: z.ZodArray<z.ZodString, "many">;
        negativeClauses: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        compileMode: "production_prompt";
        systemFrame: string;
        canonConstraints: string[];
        outputInstructions: string[];
        contextSummaries: string[];
        fragmentSummaries: string[];
        modeInstructions: string[];
        negativeClauses: string[];
    }, {
        compileMode: "production_prompt";
        systemFrame: string;
        canonConstraints: string[];
        outputInstructions: string[];
        contextSummaries: string[];
        fragmentSummaries: string[];
        modeInstructions: string[];
        negativeClauses: string[];
    }>;
    validationProfile: z.ZodObject<{
        ontologyRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        ontologyProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        ontologyAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        invariantRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        invariantProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        invariantAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        philosophicalRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        philosophicalProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        philosophicalAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        characterRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        characterProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        characterAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        visualRequiredTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        visualProhibitedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        visualAdvisoryTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        driftRiskTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        driftHardBlockTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        ontologyRequiredTerms: string[];
        ontologyProhibitedTerms: string[];
        ontologyAdvisoryTerms: string[];
        invariantRequiredTerms: string[];
        invariantProhibitedTerms: string[];
        invariantAdvisoryTerms: string[];
        philosophicalRequiredTerms: string[];
        philosophicalProhibitedTerms: string[];
        philosophicalAdvisoryTerms: string[];
        characterRequiredTerms: string[];
        characterProhibitedTerms: string[];
        characterAdvisoryTerms: string[];
        visualRequiredTerms: string[];
        visualProhibitedTerms: string[];
        visualAdvisoryTerms: string[];
        driftRiskTerms: string[];
        driftHardBlockTerms: string[];
    }, {
        ontologyRequiredTerms?: string[] | undefined;
        ontologyProhibitedTerms?: string[] | undefined;
        ontologyAdvisoryTerms?: string[] | undefined;
        invariantRequiredTerms?: string[] | undefined;
        invariantProhibitedTerms?: string[] | undefined;
        invariantAdvisoryTerms?: string[] | undefined;
        philosophicalRequiredTerms?: string[] | undefined;
        philosophicalProhibitedTerms?: string[] | undefined;
        philosophicalAdvisoryTerms?: string[] | undefined;
        characterRequiredTerms?: string[] | undefined;
        characterProhibitedTerms?: string[] | undefined;
        characterAdvisoryTerms?: string[] | undefined;
        visualRequiredTerms?: string[] | undefined;
        visualProhibitedTerms?: string[] | undefined;
        visualAdvisoryTerms?: string[] | undefined;
        driftRiskTerms?: string[] | undefined;
        driftHardBlockTerms?: string[] | undefined;
    }>;
    benchmarkProfile: z.ZodObject<{
        goldReferenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        silverReferenceTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        redBlockedTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        goldReferenceTerms: string[];
        silverReferenceTerms: string[];
        redBlockedTerms: string[];
    }, {
        goldReferenceTerms?: string[] | undefined;
        silverReferenceTerms?: string[] | undefined;
        redBlockedTerms?: string[] | undefined;
    }>;
    studioProfile: z.ZodObject<{
        actionType: z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>;
        panelCode: z.ZodString;
        panelTitle: z.ZodString;
        viewCode: z.ZodString;
        filterCode: z.ZodString;
        filterTerms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        panelCode: string;
        viewCode: string;
        filterCode: string;
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panelTitle: string;
        filterTerms: string[];
    }, {
        panelCode: string;
        viewCode: string;
        filterCode: string;
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panelTitle: string;
        filterTerms?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    commandType: "execute_generation_pipeline";
    request: {
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
    };
    compileProfile: {
        compileMode: "production_prompt";
        systemFrame: string;
        canonConstraints: string[];
        outputInstructions: string[];
        contextSummaries: string[];
        fragmentSummaries: string[];
        modeInstructions: string[];
        negativeClauses: string[];
    };
    validationProfile: {
        ontologyRequiredTerms: string[];
        ontologyProhibitedTerms: string[];
        ontologyAdvisoryTerms: string[];
        invariantRequiredTerms: string[];
        invariantProhibitedTerms: string[];
        invariantAdvisoryTerms: string[];
        philosophicalRequiredTerms: string[];
        philosophicalProhibitedTerms: string[];
        philosophicalAdvisoryTerms: string[];
        characterRequiredTerms: string[];
        characterProhibitedTerms: string[];
        characterAdvisoryTerms: string[];
        visualRequiredTerms: string[];
        visualProhibitedTerms: string[];
        visualAdvisoryTerms: string[];
        driftRiskTerms: string[];
        driftHardBlockTerms: string[];
    };
    benchmarkProfile: {
        goldReferenceTerms: string[];
        silverReferenceTerms: string[];
        redBlockedTerms: string[];
    };
    studioProfile: {
        panelCode: string;
        viewCode: string;
        filterCode: string;
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panelTitle: string;
        filterTerms: string[];
    };
}, {
    commandType: "execute_generation_pipeline";
    request: {
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
    };
    compileProfile: {
        compileMode: "production_prompt";
        systemFrame: string;
        canonConstraints: string[];
        outputInstructions: string[];
        contextSummaries: string[];
        fragmentSummaries: string[];
        modeInstructions: string[];
        negativeClauses: string[];
    };
    validationProfile: {
        ontologyRequiredTerms?: string[] | undefined;
        ontologyProhibitedTerms?: string[] | undefined;
        ontologyAdvisoryTerms?: string[] | undefined;
        invariantRequiredTerms?: string[] | undefined;
        invariantProhibitedTerms?: string[] | undefined;
        invariantAdvisoryTerms?: string[] | undefined;
        philosophicalRequiredTerms?: string[] | undefined;
        philosophicalProhibitedTerms?: string[] | undefined;
        philosophicalAdvisoryTerms?: string[] | undefined;
        characterRequiredTerms?: string[] | undefined;
        characterProhibitedTerms?: string[] | undefined;
        characterAdvisoryTerms?: string[] | undefined;
        visualRequiredTerms?: string[] | undefined;
        visualProhibitedTerms?: string[] | undefined;
        visualAdvisoryTerms?: string[] | undefined;
        driftRiskTerms?: string[] | undefined;
        driftHardBlockTerms?: string[] | undefined;
    };
    benchmarkProfile: {
        goldReferenceTerms?: string[] | undefined;
        silverReferenceTerms?: string[] | undefined;
        redBlockedTerms?: string[] | undefined;
    };
    studioProfile: {
        panelCode: string;
        viewCode: string;
        filterCode: string;
        actionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review";
        panelTitle: string;
        filterTerms?: string[] | undefined;
    };
}>;
export declare const orchestrationStepSummaryShellSchema: z.ZodObject<{
    step: z.ZodEnum<["layer3_request_boundary", "layer4_prompt_compile", "layer5_canon_validate", "layer6_production_package_assembly", "layer7_benchmark_audit", "layer8_ingestion_and_lineage_persistence", "layer9_studio_action_boundary"]>;
    status: z.ZodEnum<["completed", "stopped"]>;
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "completed" | "stopped";
    step: "layer3_request_boundary" | "layer4_prompt_compile" | "layer5_canon_validate" | "layer6_production_package_assembly" | "layer7_benchmark_audit" | "layer8_ingestion_and_lineage_persistence" | "layer9_studio_action_boundary";
    detail: string;
}, {
    status: "completed" | "stopped";
    step: "layer3_request_boundary" | "layer4_prompt_compile" | "layer5_canon_validate" | "layer6_production_package_assembly" | "layer7_benchmark_audit" | "layer8_ingestion_and_lineage_persistence" | "layer9_studio_action_boundary";
    detail: string;
}>;
export declare const orchestrationFinalStatusShellSchema: z.ZodEnum<["completed", "stopped_validation_rejected", "stopped_packaging_rejected", "stopped_benchmark_rejected", "stopped_persistence_rejected"]>;
export declare const orchestrationChainResultShellSchema: z.ZodObject<{
    requestCode: z.ZodString;
    compileMode: z.ZodLiteral<"production_prompt">;
    validationDecision: z.ZodEnum<["accepted", "rejected"]>;
    packageCode: z.ZodNullable<z.ZodString>;
    benchmarkDecision: z.ZodNullable<z.ZodEnum<["approved", "review", "rejected"]>>;
    ingestionCode: z.ZodNullable<z.ZodString>;
    persistenceCode: z.ZodNullable<z.ZodString>;
    studioActionType: z.ZodNullable<z.ZodEnum<["inspect_package", "inspect_validation", "inspect_lineage", "queue_generation", "queue_benchmark_review", "queue_persistence_review"]>>;
    finalStatus: z.ZodEnum<["completed", "stopped_validation_rejected", "stopped_packaging_rejected", "stopped_benchmark_rejected", "stopped_persistence_rejected"]>;
    executedSteps: z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<["layer3_request_boundary", "layer4_prompt_compile", "layer5_canon_validate", "layer6_production_package_assembly", "layer7_benchmark_audit", "layer8_ingestion_and_lineage_persistence", "layer9_studio_action_boundary"]>;
        status: z.ZodEnum<["completed", "stopped"]>;
        detail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "completed" | "stopped";
        step: "layer3_request_boundary" | "layer4_prompt_compile" | "layer5_canon_validate" | "layer6_production_package_assembly" | "layer7_benchmark_audit" | "layer8_ingestion_and_lineage_persistence" | "layer9_studio_action_boundary";
        detail: string;
    }, {
        status: "completed" | "stopped";
        step: "layer3_request_boundary" | "layer4_prompt_compile" | "layer5_canon_validate" | "layer6_production_package_assembly" | "layer7_benchmark_audit" | "layer8_ingestion_and_lineage_persistence" | "layer9_studio_action_boundary";
        detail: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    requestCode: string;
    compileMode: "production_prompt";
    packageCode: string | null;
    validationDecision: "accepted" | "rejected";
    ingestionCode: string | null;
    persistenceCode: string | null;
    benchmarkDecision: "rejected" | "approved" | "review" | null;
    studioActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review" | null;
    finalStatus: "completed" | "stopped_validation_rejected" | "stopped_packaging_rejected" | "stopped_benchmark_rejected" | "stopped_persistence_rejected";
    executedSteps: {
        status: "completed" | "stopped";
        step: "layer3_request_boundary" | "layer4_prompt_compile" | "layer5_canon_validate" | "layer6_production_package_assembly" | "layer7_benchmark_audit" | "layer8_ingestion_and_lineage_persistence" | "layer9_studio_action_boundary";
        detail: string;
    }[];
}, {
    requestCode: string;
    compileMode: "production_prompt";
    packageCode: string | null;
    validationDecision: "accepted" | "rejected";
    ingestionCode: string | null;
    persistenceCode: string | null;
    benchmarkDecision: "rejected" | "approved" | "review" | null;
    studioActionType: "inspect_package" | "inspect_validation" | "inspect_lineage" | "queue_generation" | "queue_benchmark_review" | "queue_persistence_review" | null;
    finalStatus: "completed" | "stopped_validation_rejected" | "stopped_packaging_rejected" | "stopped_benchmark_rejected" | "stopped_persistence_rejected";
    executedSteps: {
        status: "completed" | "stopped";
        step: "layer3_request_boundary" | "layer4_prompt_compile" | "layer5_canon_validate" | "layer6_production_package_assembly" | "layer7_benchmark_audit" | "layer8_ingestion_and_lineage_persistence" | "layer9_studio_action_boundary";
        detail: string;
    }[];
}>;
export type RuntimeCommandType = z.infer<typeof runtimeCommandTypeSchema>;
export type RuntimeCompileProfile = z.infer<typeof runtimeCompileProfileSchema>;
export type RuntimeValidationProfile = z.infer<typeof runtimeValidationProfileSchema>;
export type RuntimeBenchmarkProfile = z.infer<typeof runtimeBenchmarkProfileSchema>;
export type RuntimeStudioProfile = z.infer<typeof runtimeStudioProfileSchema>;
export type StudioActionType = z.infer<typeof studioActionTypeSchema>;
export type OrchestrationChainRequestShell = z.infer<typeof orchestrationChainRequestShellSchema>;
export type OrchestrationStepSummaryShell = z.infer<typeof orchestrationStepSummaryShellSchema>;
export type OrchestrationFinalStatusShell = z.infer<typeof orchestrationFinalStatusShellSchema>;
export type OrchestrationChainResultShell = z.infer<typeof orchestrationChainResultShellSchema>;
//# sourceMappingURL=contracts.d.ts.map