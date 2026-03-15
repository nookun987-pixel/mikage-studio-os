export enum JobStatus {
  Draft = 'draft',
  Queued = 'queued',
  Running = 'running',
  Completed = 'completed',
  Failed = 'failed'
}

export enum CanonState {
  Pending = 'pending',
  Valid = 'valid',
  Invalid = 'invalid'
}

export enum ImageProvider {
  Mock = 'mock',
  Imagen = 'imagen',
  OpenAI = 'openai'
}
