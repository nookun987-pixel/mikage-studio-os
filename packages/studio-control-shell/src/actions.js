import { studioActionResultSchema, studioActionInputSchema } from '@mikage/contracts';
const normalizeActionType = (actionType) => actionType;
const bindSelection = (input) => ({
    selection: {
        ...input.selection,
        selectedCodes: [...input.selection.selectedCodes]
    }
});
const bindReferences = (input) => ({
    artifactReference: input.artifactReference,
    validationReference: input.validationReference,
    lineageReference: input.lineageReference
});
const toQueueType = (actionType) => actionType === 'queue_generation'
    ? 'generation'
    : actionType === 'queue_benchmark_review'
        ? 'benchmark_review'
        : 'persistence_review';
const buildQueueProjection = (input, normalizedActionType) => {
    const isQueueAction = normalizedActionType.startsWith('queue_');
    const queueType = isQueueAction ? toQueueType(normalizedActionType) : 'generation';
    return {
        queueCode: `${input.requestCode}_${queueType}_projection`,
        queueType,
        items: isQueueAction
            ? [
                {
                    itemCode: `${input.requestCode}_${queueType}_item`,
                    queueType,
                    requestCode: input.requestCode,
                    targetCode: input.selection.selectedCodes[0] ?? input.selection.selectionCode,
                    status: 'projected',
                    metadata: input.metadata
                }
            ]
            : [],
        metadata: input.metadata
    };
};
const buildDecision = (normalizedActionType, input) => {
    if (normalizedActionType === 'inspect_package') {
        return {
            status: 'inspection_ready',
            decision: {
                decision: 'inspect',
                accepted: true,
                reasons: []
            }
        };
    }
    if (normalizedActionType === 'inspect_validation') {
        return {
            status: input.validationReference.validation.decision === 'accepted'
                ? 'inspection_ready'
                : 'review_required',
            decision: {
                decision: 'inspect',
                accepted: true,
                reasons: []
            }
        };
    }
    if (normalizedActionType === 'inspect_lineage') {
        return {
            status: 'inspection_ready',
            decision: {
                decision: 'inspect',
                accepted: true,
                reasons: []
            }
        };
    }
    if (input.validationReference.validation.decision !== 'accepted') {
        return {
            status: 'review_required',
            decision: {
                decision: 'hold',
                accepted: false,
                reasons: ['Validation state must be accepted before projecting queue actions.']
            }
        };
    }
    if (!input.lineageReference.persistence.decision.persisted) {
        return {
            status: 'review_required',
            decision: {
                decision: 'hold',
                accepted: false,
                reasons: ['Persistence state must be accepted before projecting queue actions.']
            }
        };
    }
    return {
        status: 'queued',
        decision: {
            decision: 'project_queue',
            accepted: true,
            reasons: []
        }
    };
};
export const runStudioAction = (rawInput) => {
    const input = studioActionInputSchema.parse(rawInput);
    const normalizedActionType = normalizeActionType(input.actionType);
    const selectionBinding = bindSelection(input);
    const referenceBinding = bindReferences(input);
    const queueProjection = buildQueueProjection(input, normalizedActionType);
    const { status, decision } = buildDecision(normalizedActionType, input);
    return studioActionResultSchema.parse({
        requestCode: input.requestCode,
        normalizedActionType,
        panel: input.panel,
        view: input.view,
        selection: selectionBinding.selection,
        artifactReference: referenceBinding.artifactReference,
        validationReference: referenceBinding.validationReference,
        lineageReference: referenceBinding.lineageReference,
        queueProjection: decision.decision === 'project_queue'
            ? queueProjection
            : {
                ...queueProjection,
                items: queueProjection.items.map((item) => ({
                    ...item,
                    status: 'held'
                }))
            },
        status,
        decision,
        summary: {
            requestCode: input.requestCode,
            normalizedActionType,
            selectedPacketCode: input.selection.selectedPacketRef.packetCode,
            queueItemCount: queueProjection.items.length,
            status
        },
        metadata: input.metadata
    });
};
//# sourceMappingURL=actions.js.map