import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const STATS_FILE = join(process.cwd(), 'data', 'site-stats.json');
const DEFAULT_STATS = { activeMembers: 478 };

function normalizeStats(input) {
  const value = Number(input?.activeMembers);
  if (!Number.isInteger(value) || value < 0) return DEFAULT_STATS;
  return { activeMembers: value };
}

export async function readSiteStats() {
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
  await mkdir(join(process.cwd(), 'data'), { recursive: true });
  await writeFile(STATS_FILE, JSON.stringify(normalized, null, 2), 'utf8');
  return normalized;
}
