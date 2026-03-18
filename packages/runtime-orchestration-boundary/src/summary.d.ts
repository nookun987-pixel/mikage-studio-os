import type { OrchestrationFinalStatusShell, OrchestrationStepSummaryShell, StudioActionType } from './contracts.js';
export declare const buildExecutedStep: (step: OrchestrationStepSummaryShell["step"], status: OrchestrationStepSummaryShell["status"], detail: string) => {
    status: "completed" | "stopped";
    step: "layer3_request_boundary" | "layer4_prompt_compile" | "layer5_canon_validate" | "layer6_production_package_assembly" | "layer7_benchmark_audit" | "layer8_ingestion_and_lineage_persistence" | "layer9_studio_action_boundary";
    detail: string;
};
export declare const buildRuntimeSummary: (input: {
    requestCode: string;
    compileMode: "production_prompt";
    validationDecision: "accepted" | "rejected";
    packageCode: string | null;
    benchmarkDecision: "approved" | "review" | "rejected" | null;
    ingestionCode: string | null;
    persistenceCode: string | null;
    studioActionType: StudioActionType | null;
    finalStatus: OrchestrationFinalStatusShell;
    executedSteps: ReturnType<typeof buildExecutedStep>[];
}) => {
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
};
//# sourceMappingURL=summary.d.ts.map