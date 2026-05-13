import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getSharedPool, hasDatabaseConfig } from '@/lib/server/pgPool';

const STATS_FILE = join(process.cwd(), 'data', 'site-stats.json');
const DEFAULT_STATS = { activeMembers: 478 };
const STATS_ROW_ID = 1;

function normalizeStats(input) {
  const value = Number(input?.activeMembers);
  if (!Number.isInteger(value) || value < 0) return DEFAULT_STATS;
  return { activeMembers: value };
}

async function ensureSiteStatsTable(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS site_stats (
      id INTEGER PRIMARY KEY,
      active_members INTEGER NOT NULL CHECK (active_members >= 0)
    )
  `);
  await db.query(
    `INSERT INTO site_stats (id, active_members)
     VALUES ($1, $2)
     ON CONFLICT (id) DO NOTHING`,
    [STATS_ROW_ID, DEFAULT_STATS.activeMembers]
  );
}

async function readStatsFromFile() {
  const raw = await readFile(STATS_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  return normalizeStats(parsed);
}

async function writeStatsToFile(normalized) {
  await mkdir(join(process.cwd(), 'data'), { recursive: true });
  await writeFile(STATS_FILE, JSON.stringify(normalized, null, 2), 'utf8');
}

export async function readSiteStats() {
  if (hasDatabaseConfig()) {
    try {
      const db = getSharedPool();
      await ensureSiteStatsTable(db);
      const result = await db.query(
        'SELECT active_members FROM site_stats WHERE id = $1',
        [STATS_ROW_ID]
      );
      const row = result.rows[0];
      return normalizeStats({ activeMembers: row?.active_members });
    } catch (err) {
      console.error('[site-stats] database read failed:', err?.message || err);
    }
  }

  try {
    return await readStatsFromFile();
  } catch {
    return DEFAULT_STATS;
  }
}

/**
 * @returns {Promise<{ stats: { activeMembers: number }, persistedToFile: boolean }>}
 */
export async function writeSiteStats(nextStats) {
  const normalized = normalizeStats(nextStats);

  if (hasDatabaseConfig()) {
    try {
      const db = getSharedPool();
      await ensureSiteStatsTable(db);
      await db.query(
        `INSERT INTO site_stats (id, active_members)
         VALUES ($1, $2)
         ON CONFLICT (id)
         DO UPDATE SET active_members = EXCLUDED.active_members`,
        [STATS_ROW_ID, normalized.activeMembers]
      );
      return { stats: normalized, persistedToFile: false };
    } catch (err) {
      console.error('[site-stats] database write failed:', err?.message || err);
      if (process.env.VERCEL) {
        throw new Error(
          'Veritabanına yazılamıyor. DATABASE_URL ve ağ erişimini kontrol edin.'
        );
      }
    }
  } else if (process.env.VERCEL) {
    throw new Error(
      'Canlı ortamda kalıcı yazma için KV_REST_API_URL ve KV_REST_API_TOKEN ayarlanmalı.'
    );
  }

  await writeStatsToFile(normalized);
  return { stats: normalized, persistedToFile: true };
}
