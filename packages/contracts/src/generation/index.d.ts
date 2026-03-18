import { z } from 'zod';
export declare const generationExecuteRequestSchema: z.ZodObject<{
    prompt: z.ZodObject<{
        positivePrompt: z.ZodString;
        negativePrompt: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        negativePrompt: string;
        positivePrompt: string;
    }, {
        positivePrompt: string;
        negativePrompt?: string | undefined;
    }>;
    generation: z.ZodObject<{
        variants: z.ZodNumber;
        aspectRatio: z.ZodString;
        model: z.ZodString;
        cfg: z.ZodOptional<z.ZodNumber>;
        seeds: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
    }, "strip", z.ZodTypeAny, {
        variants: number;
        aspectRatio: string;
        model: string;
        seeds: number[];
        cfg?: number | undefined;
    }, {
        variants: number;
        aspectRatio: string;
        model: string;
        cfg?: number | undefined;
        seeds?: number[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    generation: {
        variants: number;
        aspectRatio: string;
        model: string;
        seeds: number[];
        cfg?: number | undefined;
    };
    prompt: {
        negativePrompt: string;
        positivePrompt: string;
    };
}, {
    generation: {
        variants: number;
        aspectRatio: string;
        model: string;
        cfg?: number | undefined;
        seeds?: number[] | undefined;
    };
    prompt: {
        positivePrompt: string;
        negativePrompt?: string | undefined;
    };
}>;
//# sourceMappingURL=index.d.ts.map