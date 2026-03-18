import { orchestrationChainResultShellSchema, orchestrationStepSummaryShellSchema } from './contracts.js';
export const buildExecutedStep = (step, status, detail) => orchestrationStepSummaryShellSchema.parse({
    step,
    status,
    detail
});
export const buildRuntimeSummary = (input) => orchestrationChainResultShellSchema.parse(input);
//# sourceMappingURL=summary.js.map