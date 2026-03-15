import { z } from 'zod';
export const pipelineEventSchema = z.object({
    eventType: z.string().min(1),
    occurredAt: z.string().min(1)
});
//# sourceMappingURL=index.js.map