export const QUEUE_NAMES = {
  cinematicImagePipeline: 'cinematic-image-pipeline',
  generationExecute: 'generation-execute',
  ingestionProcess: 'ingestion-process'
} as const;

export interface QueueFactoryOptions {
  connection: string;
}

export const createQueueFactory = (options: QueueFactoryOptions) => options;
