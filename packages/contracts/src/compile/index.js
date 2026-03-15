import { z } from 'zod';
import { boundaryMetadataSchema, packetRefSchema } from '../core/index.js';
export const compileModeSchema = z.enum([
    'scene_preview',
    'script_support',
    'production_prompt'
]);
export const compileContextFragmentSchema = z.object({
    fragmentCode: z.string().min(1),
    label: z.string().min(1),
    summary: z.string().min(1),
    packetRef: packetRefSchema.optional(),
    metadata: boundaryMetadataSchema
});
export const compileInputPacketSchema = z.object({
    packetRef: packetRefSchema,
    fragments: z.array(compileContextFragmentSchema).min(1),
    summary: z.string().min(1),
    metadata: boundaryMetadataSchema
});
export const negativePromptShellSchema = z.object({
    clauses: z.array(z.string().min(1)).default([]),
    rendered: z.string().default('')
});
export const lineageMetadataShellSchema = z.object({
    requestCode: z.string().min(1),
    presetCode: z.string().min(1),
    variantCode: z.string().min(1),
    packetRefs: z.array(packetRefSchema).default([]),
    metadata: boundaryMetadataSchema
});
export const compileValidationResultShellSchema = z.object({
    valid: z.boolean(),
    issues: z.array(z.string().min(1)).default([])
});
export const compileRequestSchema = z.object({
    requestCode: z.string().min(1),
    projectSlug: z.string().min(1),
    presetCode: z.string().min(1),
    variantCode: z.string().min(1),
    compileMode: compileModeSchema,
    systemFrame: z.string().min(1),
    canonConstraints: z.array(z.string().min(1)).min(1),
    contextPackets: z.array(compileInputPacketSchema).min(1),
    modePayload: z.object({
        title: z.string().min(1),
        instructions: z.array(z.string().min(1)).min(1)
    }),
    outputInstructions: z.array(z.string().min(1)).min(1),
    negativePrompt: negativePromptShellSchema.default({}),
    lineage: lineageMetadataShellSchema,
    metadata: boundaryMetadataSchema
});
export const compileSectionSchema = z.object({
    key: z.enum([
        'system_frame',
        'canon_constraints',
        'context_packet_summary',
        'mode_payload',
        'output_instructions',
        'negative_prompt_shell',
        'lineage_metadata'
    ]),
    title: z.string().min(1),
    content: z.string().min(1)
});
export const compileOutputSchema = z.object({
    requestCode: z.string().min(1),
    compileMode: compileModeSchema,
    sections: z.array(compileSectionSchema).length(7),
    compiledPrompt: z.string().min(1),
    negativePrompt: negativePromptShellSchema,
    lineage: lineageMetadataShellSchema,
    validation: compileValidationResultShellSchema
});
//# sourceMappingURL=index.js.map