export interface Neo4jConfig {
  uri: string;
  username: string;
  password: string;
}

export class Neo4jClient {
  constructor(private readonly config: Neo4jConfig) {}

  getConfig(): Neo4jConfig {
    return this.config;
  }
}
