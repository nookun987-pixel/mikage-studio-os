import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCAL_POSTGRES, ensureLocalPostgres } from './local-postgres.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const tempSqlPath = path.join(repoRoot, '.local', 'postgres', 'db-push.sql');
const prismaBinary = path.join(
  repoRoot,
  'packages',
  'database',
  'node_modules',
  '.bin',
  'prisma.CMD'
);
const psqlBinary = path.join(
  repoRoot,
  '.local',
  'postgres',
  'installation',
  'bin',
  'psql.exe'
);
const createdbBinary = path.join(
  repoRoot,
  '.local',
  'postgres',
  'installation',
  'bin',
  'createdb.exe'
);

const runAndCollect = (command: string, args: string[]) =>
  new Promise<string>((resolve, reject) => {
    const child = spawn('cmd.exe', ['/c', command, ...args], {
      stdio: ['ignore', 'pipe', 'inherit'],
      shell: false
    });

    let stdout = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve(stdout);
        return;
      }

      reject(new Error(`Command failed with exit code ${code ?? 1}`));
    });

    child.on('error', reject);
  });

const runAndPrint = (command: string, args: string[]) =>
  new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      env: {
        ...process.env,
        PGPASSWORD: 'postgres'
      }
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed with exit code ${code ?? 1}`));
    });

    child.on('error', reject);
  });

const runDirectAndCollect = (command: string, args: string[]) =>
  new Promise<string>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'pipe', 'inherit'],
      shell: false,
      env: {
        ...process.env,
        PGPASSWORD: 'postgres'
      }
    });

    let stdout = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
        return;
      }

      reject(new Error(`Command failed with exit code ${code ?? 1}`));
    });

    child.on('error', reject);
  });

const main = async () => {
  await ensureLocalPostgres();

  const sql = await runAndCollect(prismaBinary, [
    'migrate',
    'diff',
    '--from-empty',
    '--to-schema-datamodel',
    path.join(repoRoot, 'packages', 'database', 'prisma', 'schema.prisma'),
    '--script'
  ]);

  await writeFile(tempSqlPath, sql, 'utf8');
  const databaseExists = await runDirectAndCollect(psqlBinary, [
    '-h',
    LOCAL_POSTGRES.host,
    '-p',
    String(LOCAL_POSTGRES.port),
    '-U',
    LOCAL_POSTGRES.username,
    '-d',
    'postgres',
    '-tAc',
    "SELECT 1 FROM pg_database WHERE datname = 'mikage'"
  ]);

  if (databaseExists !== '1') {
    await runAndPrint(createdbBinary, [
      '-h',
      LOCAL_POSTGRES.host,
      '-p',
      String(LOCAL_POSTGRES.port),
      '-U',
      LOCAL_POSTGRES.username,
      LOCAL_POSTGRES.databaseName
    ]);
  }

  await runAndPrint(psqlBinary, [
    '-h',
    LOCAL_POSTGRES.host,
    '-p',
    String(LOCAL_POSTGRES.port),
    '-U',
    LOCAL_POSTGRES.username,
    '-d',
    'postgres',
    '-v',
    'ON_ERROR_STOP=1',
    '-c',
    `ALTER DATABASE ${LOCAL_POSTGRES.databaseName} OWNER TO ${LOCAL_POSTGRES.username};`
  ]);
  await runAndPrint(psqlBinary, [
    '-h',
    LOCAL_POSTGRES.host,
    '-p',
    String(LOCAL_POSTGRES.port),
    '-U',
    LOCAL_POSTGRES.username,
    '-d',
    LOCAL_POSTGRES.databaseName,
    '-v',
    'ON_ERROR_STOP=1',
    '-c',
    'DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;'
  ]);
  await runAndPrint(psqlBinary, [
    '-h',
    LOCAL_POSTGRES.host,
    '-p',
    String(LOCAL_POSTGRES.port),
    '-U',
    LOCAL_POSTGRES.username,
    '-d',
    LOCAL_POSTGRES.databaseName,
    '-v',
    'ON_ERROR_STOP=1',
    '-f',
    tempSqlPath
  ]);

  console.log('Database schema applied successfully.');
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
