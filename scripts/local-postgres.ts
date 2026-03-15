import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PostgresInstance } from 'pg-embedded';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const pgHbaPath = path.join(repoRoot, '.local', 'postgres', 'data', 'pg_hba.conf');

export const LOCAL_POSTGRES = {
  host: 'localhost',
  port: 55432,
  username: 'postgres',
  password: 'postgres',
  databaseName: 'mikage'
} as const;

const postgres = new PostgresInstance({
  version: '16.13.0',
  port: LOCAL_POSTGRES.port,
  username: LOCAL_POSTGRES.username,
  password: LOCAL_POSTGRES.password,
  databaseName: 'postgres',
  persistent: true,
  dataDir: path.join(repoRoot, '.local', 'postgres', 'data'),
  installationDir: path.join(repoRoot, '.local', 'postgres', 'installation'),
  timeout: 60,
  setupTimeout: 300
});

const configureLocalAuth = () => {
  if (!existsSync(pgHbaPath)) {
    return;
  }

  const current = readFileSync(pgHbaPath, 'utf8');
  const updated = current
    .replace(
      /^host\s+all\s+all\s+127\.0\.0\.1\/32\s+\S+$/gmu,
      'host    all             all             127.0.0.1/32            trust'
    )
    .replace(
      /^host\s+all\s+all\s+::1\/128\s+\S+$/gmu,
      'host    all             all             ::1/128                 trust'
    );

  if (updated !== current) {
    writeFileSync(pgHbaPath, updated, 'utf8');
  }
};

const isPortOpen = (host: string, port: number) =>
  new Promise<boolean>((resolve) => {
    const socket = net.createConnection({ host, port });

    socket.once('connect', () => {
      socket.end();
      resolve(true);
    });

    socket.once('error', () => {
      resolve(false);
    });
  });

export const ensureLocalPostgres = async () => {
  configureLocalAuth();

  if (await isPortOpen(LOCAL_POSTGRES.host, LOCAL_POSTGRES.port)) {
    return;
  }

  await postgres.start();
};
