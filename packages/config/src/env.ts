import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  NEO4J_URI: z.string().min(1),
  NEO4J_USER: z.string().min(1),
  NEO4J_PASSWORD: z.string().min(1),
  REDIS_URL: z.string().min(1),
  MINIO_ENDPOINT: z.string().min(1),
  MINIO_PORT: z.coerce.number().int().positive().default(9000),
  MINIO_USE_SSL: z.coerce.boolean().default(false),
  MINIO_ACCESS_KEY: z.string().min(1),
  MINIO_SECRET_KEY: z.string().min(1),
  MINIO_BUCKET: z.string().min(1),
  MINIO_CONSOLE_PORT: z.coerce.number().int().positive().default(9001),
  GCP_PROJECT_ID: z.string().min(1),
  VERTEX_LOCATION: z.string().min(1),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  IMAGE_PROVIDER: z.string().min(1),
  MOCK_IMAGEN: z.coerce.boolean().default(true)
});

export type Env = z.infer<typeof envSchema>;

export const parseEnv = (input: NodeJS.ProcessEnv): Env => envSchema.parse(input);
