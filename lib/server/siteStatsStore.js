import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import pg from 'pg';

const { Pool } = pg;
const STATS_FILE = join(process.cwd(), 'data', 'site-stats.json');
const DEFAULT_STATS = { activeMembers: 478 };
const STATS_ROW_ID = 1;

let pool;

function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_SSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    });
  }

  return pool;
}

function normalizeStats(input) {
  const value = Number(input?.activeMembers);
  if (!Number.isInteger(value) || value < 0) return DEFAULT_STATS;
  return { activeMembers: value };
}

export async function readSiteStats() {
  if (hasDatabaseConfig()) {
    try {
      const db = getPool();
      const result = await db.query(
        'SELECT active_members FROM site_stats WHERE id = $1',
        [STATS_ROW_ID]
      );
      const row = result.rows[0];
      return normalizeStats({ activeMembers: row?.active_members });
    } catch {
      return DEFAULT_STATS;
    }
  }

  try {
    const raw = await readFile(STATS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return normalizeStats(parsed);
  } catch {
    return DEFAULT_STATS;
  }
}

export async function writeSiteStats(nextStats) {
  const normalized = normalizeStats(nextStats);

  if (hasDatabaseConfig()) {
    const db = getPool();
    await db.query(
      `INSERT INTO site_stats (id, active_members)
       VALUES ($1, $2)
       ON CONFLICT (id)
       DO UPDATE SET active_members = EXCLUDED.active_members`,
      [STATS_ROW_ID, normalized.activeMembers]
    );
    return normalized;
  }

  if (process.env.VERCEL) {
    throw new Error(
      'Canlı ortamda kalıcı yazma için KV_REST_API_URL ve KV_REST_API_TOKEN ayarlanmalı.'
    );
  }

  await mkdir(join(process.cwd(), 'data'), { recursive: true });
  await writeFile(STATS_FILE, JSON.stringify(normalized, null, 2), 'utf8');
  return normalized;
}
