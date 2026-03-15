import { z } from 'zod';
export const promptCompileRequestSchema = z.object({
    presetCode: z.string().min(1),
    variantCode: z.string().min(1),
    compileMode: z
        .enum(['scene_preview', 'script_support', 'production_prompt'])
        .default('production_prompt')
});
//# sourceMappingURL=index.js.map