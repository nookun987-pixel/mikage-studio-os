export interface RedisConfig {
  url: string;
}

export class RedisClient {
  constructor(private readonly config: RedisConfig) {}

  getConfig(): RedisConfig {
    return this.config;
  }
}
