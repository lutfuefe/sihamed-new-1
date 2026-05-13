import pg from 'pg';

const { Pool } = pg;

let pool;

export function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/**
 * connectionString içinde @ veya : ile çakışan parolalar için URL parçalayıp
 * Pool'a user/password olarak verir (pg tek satır parse hatalarına karşı).
 */
function buildPoolConfig() {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) return null;

  const withProto = /^postgres(ql)?:/i.test(raw)
    ? raw.replace(/^postgresql:/i, 'postgres:')
    : `postgres://${raw}`;

  let u;
  try {
    u = new URL(withProto);
  } catch {
    return {
      connectionString: raw,
      ssl:
        process.env.DATABASE_SSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    };
  }

  const pathDb = (u.pathname || '').replace(/^\//, '') || 'postgres';
  const database = pathDb.split('?')[0];

  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 5432,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database,
    ssl:
      process.env.DATABASE_SSL === 'true'
        ? { rejectUnauthorized: false }
        : undefined,
    max: 10,
  };
}

export function getSharedPool() {
  if (!pool) {
    const cfg = buildPoolConfig();
    if (!cfg) {
      throw new Error('DATABASE_URL tanımlı değil.');
    }
    pool = new Pool(cfg);
  }
  return pool;
}
