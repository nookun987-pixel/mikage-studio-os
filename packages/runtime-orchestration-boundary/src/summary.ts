import {
  orchestrationChainResultShellSchema,
  orchestrationStepSummaryShellSchema
} from './contracts.js';

import type {
  OrchestrationFinalStatusShell,
  OrchestrationStepSummaryShell,
  StudioActionType
} from './contracts.js';

export const buildExecutedStep = (
  step: OrchestrationStepSummaryShell['step'],
  status: OrchestrationStepSummaryShell['status'],
  detail: string
) =>
  orchestrationStepSummaryShellSchema.parse({
    step,
    status,
    detail
  });

export const buildRuntimeSummary = (input: {
  requestCode: string;
  compileMode: 'production_prompt';
  validationDecision: 'accepted' | 'rejected';
  packageCode: string | null;
  benchmarkDecision: 'approved' | 'review' | 'rejected' | null;
  ingestionCode: string | null;
  persistenceCode: string | null;
  studioActionType: StudioActionType | null;
  finalStatus: OrchestrationFinalStatusShell;
  executedSteps: ReturnType<typeof buildExecutedStep>[];
}) => orchestrationChainResultShellSchema.parse(input);
