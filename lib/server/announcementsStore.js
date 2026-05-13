import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import pg from 'pg';
import { DEFAULT_ANNOUNCEMENTS } from '@/lib/announcementsDefaults';
import { removeOrphanYuklenenUploads } from '@/lib/server/adminUpload';

const { Pool } = pg;
const DATA_FILE = join(process.cwd(), 'data', 'announcements.json');

/** @typedef {{ title: string, date: string, content: string[], photos: string[], photoAltPrefix: string }} AnnouncementItem */

export { DEFAULT_ANNOUNCEMENTS } from '@/lib/announcementsDefaults';

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

/**
 * @param {unknown} raw
 * @returns {AnnouncementItem | null}
 */
function sanitizeItem(raw) {
  const title = String(raw?.title ?? '').trim().slice(0, 500);
  if (!title) return null;
  const date = String(raw?.date ?? '').trim().slice(0, 32);
  const content = Array.isArray(raw?.content)
    ? raw.content.map((p) => String(p).trim()).filter(Boolean).slice(0, 50)
    : [];
  const photos = Array.isArray(raw?.photos)
    ? raw.photos.map((p) => String(p).trim()).filter(Boolean).slice(0, 20)
    : [];
  const photoAltPrefix = String(raw?.photoAltPrefix ?? '').trim().slice(0, 240);
  return { title, date, content, photos, photoAltPrefix };
}

/**
 * @param {unknown} items
 * @returns {AnnouncementItem[]}
 */
function sanitizeList(items) {
  if (!Array.isArray(items)) return [];
  return items.map(sanitizeItem).filter(Boolean);
}

/**
 * JSONB / metin alanlarını dizi olarak normalize eder (node-pg dışı ortamlar için).
 * @param {unknown} val
 * @returns {string[]}
 */
function parseStringArrayField(val) {
  if (Array.isArray(val)) {
    return val.map((p) => String(p).trim()).filter(Boolean);
  }
  if (typeof val === 'string' && val.trim()) {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        return parsed.map((p) => String(p).trim()).filter(Boolean);
      }
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * @returns {Promise<AnnouncementItem[]>}
 */
export async function readAnnouncements() {
  if (hasDatabaseConfig()) {
    try {
      const db = getPool();
      const result = await db.query(
        `SELECT title, announcement_date, content_paragraphs, photos, photo_alt_prefix, sort_order
         FROM announcements
         ORDER BY sort_order ASC, id ASC`
      );
      if (result.rows.length === 0) {
        return [];
      }
      return result.rows.map((row) => ({
        title: row.title,
        date: row.announcement_date,
        content: parseStringArrayField(row.content_paragraphs),
        photos: parseStringArrayField(row.photos),
        photoAltPrefix: row.photo_alt_prefix || '',
      }));
    } catch (err) {
      console.error('[announcements] database read failed:', err?.message || err);
      return [...DEFAULT_ANNOUNCEMENTS];
    }
  }

  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.items)) {
      return [...DEFAULT_ANNOUNCEMENTS];
    }
    return sanitizeList(parsed.items);
  } catch {
    return [...DEFAULT_ANNOUNCEMENTS];
  }
}

/**
 * @param {unknown} nextItems
 * @returns {Promise<AnnouncementItem[]>}
 */
export async function writeAnnouncements(nextItems) {
  const normalized = sanitizeList(nextItems);

  let previousItems = [];
  try {
    previousItems = await readAnnouncements();
  } catch {
    previousItems = [];
  }

  if (hasDatabaseConfig()) {
    const db = getPool();
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM announcements');
      let order = 0;
      for (const item of normalized) {
        await client.query(
          `INSERT INTO announcements
            (title, announcement_date, content_paragraphs, photos, photo_alt_prefix, sort_order)
           VALUES ($1, $2, $3::jsonb, $4::jsonb, $5, $6)`,
          [
            item.title,
            item.date,
            JSON.stringify(item.content),
            JSON.stringify(item.photos),
            item.photoAltPrefix,
            order,
          ]
        );
        order += 1;
      }
      await client.query('COMMIT');
      await removeOrphanYuklenenUploads(previousItems, normalized);
      return normalized;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  if (process.env.VERCEL) {
    throw new Error(
      'Canlı ortamda duyuruları kaydetmek için DATABASE_URL gerekli.'
    );
  }

  await mkdir(join(process.cwd(), 'data'), { recursive: true });
  await writeFile(
    DATA_FILE,
    JSON.stringify({ items: normalized }, null, 2),
    'utf8'
  );
  await removeOrphanYuklenenUploads(previousItems, normalized);
  return normalized;
}
