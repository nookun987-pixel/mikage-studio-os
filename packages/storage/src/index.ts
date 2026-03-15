export * from './object-paths.js';

export interface StorageAdapter {
  putObject(path: string, body: Uint8Array): Promise<void>;
}
