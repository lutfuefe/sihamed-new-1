import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { kv } from '@vercel/kv';

const STATS_FILE = join(process.cwd(), 'data', 'site-stats.json');
const DEFAULT_STATS = { activeMembers: 478 };
const KV_KEY = 'site:stats';

function hasKvConfig() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function normalizeStats(input) {
  const value = Number(input?.activeMembers);
  if (!Number.isInteger(value) || value < 0) return DEFAULT_STATS;
  return { activeMembers: value };
}

export async function readSiteStats() {
  if (hasKvConfig()) {
    try {
      const data = await kv.get(KV_KEY);
      return normalizeStats(data);
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

  if (hasKvConfig()) {
    await kv.set(KV_KEY, normalized);
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
