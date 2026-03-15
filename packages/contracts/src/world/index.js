import { z } from 'zod';
export const worldContextRequestSchema = z.object({
    characterCode: z.string().min(1),
    anchorCode: z.string().min(1)
});
//# sourceMappingURL=index.js.map