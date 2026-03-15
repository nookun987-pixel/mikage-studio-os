import { z } from 'zod';

export const structuredLogLevelSchema = z.enum(['info', 'warn', 'error']);

export const structuredLogEntrySchema = z.object({
  timestamp: z.string().min(1),
  level: structuredLogLevelSchema,
  component: z.string().min(1),
  event: z.string().min(1),
  context: z.record(z.string(), z.unknown())
});

export type StructuredLogEntry = z.infer<typeof structuredLogEntrySchema>;

export type StructuredLogger = {
  info: (event: string, context?: Record<string, unknown>) => void;
  warn: (event: string, context?: Record<string, unknown>) => void;
  error: (event: string, context?: Record<string, unknown>) => void;
  child: (component: string, context?: Record<string, unknown>) => StructuredLogger;
  entries: () => StructuredLogEntry[];
};
