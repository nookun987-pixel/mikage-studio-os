import { z } from 'zod';
export declare const promptCompileRequestSchema: z.ZodObject<{
    presetCode: z.ZodString;
    variantCode: z.ZodString;
    compileMode: z.ZodDefault<z.ZodEnum<["scene_preview", "script_support", "production_prompt"]>>;
}, "strip", z.ZodTypeAny, {
    presetCode: string;
    variantCode: string;
    compileMode: "scene_preview" | "script_support" | "production_prompt";
}, {
    presetCode: string;
    variantCode: string;
    compileMode?: "scene_preview" | "script_support" | "production_prompt" | undefined;
}>;
//# sourceMappingURL=index.d.ts.map