import { randomBytes } from 'node:crypto';
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const MAX_BYTES = 8 * 1024 * 1024;

const MIME_EXT = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const REL_SEG = ['public', 'images', 'haberler', 'yuklenen'];

/** DB ve img src ile uyumlu ortak önek */
export const YUKLENEN_PUBLIC_PREFIX = '/images/haberler/yuklenen/';

export function adminUploadDirFs() {
  return join(process.cwd(), ...REL_SEG);
}

export function adminUploadDirFsResolved() {
  return resolve(adminUploadDirFs());
}

export function isYuklenenPublicPath(p) {
  return (
    typeof p === 'string' &&
    p.startsWith(YUKLENEN_PUBLIC_PREFIX) &&
    p.length > YUKLENEN_PUBLIC_PREFIX.length
  );
}

/** Yalnızca düz dosya adı (alt klasör yok) */
export async function deleteYuklenenFileByPublicPath(publicPath) {
  if (!isYuklenenPublicPath(publicPath)) return;
  const name = publicPath.slice(YUKLENEN_PUBLIC_PREFIX.length);
  if (!/^[a-zA-Z0-9._-]+$/.test(name) || name.includes('..')) return;
  const root = adminUploadDirFsResolved();
  const filePath = resolve(join(adminUploadDirFs(), name));
  const rel = relative(root, filePath);
  if (rel.startsWith('..') || rel === '') return;
  await unlink(filePath);
}

/**
 * @param {{ photos?: string[] }[]} previousItems
 * @param {{ photos?: string[] }[]} nextItems
 */
export async function removeOrphanYuklenenUploads(previousItems, nextItems) {
  const oldP = new Set();
  const newP = new Set();
  for (const it of previousItems) {
    for (const p of it.photos || []) {
      if (isYuklenenPublicPath(p)) oldP.add(p);
    }
  }
  for (const it of nextItems) {
    for (const p of it.photos || []) {
      if (isYuklenenPublicPath(p)) newP.add(p);
    }
  }
  for (const p of oldP) {
    if (!newP.has(p)) {
      try {
        await deleteYuklenenFileByPublicPath(p);
      } catch {
        /* yok say */
      }
    }
  }
}

/** Web standartları File (FormData) */
export async function saveAdminImageUpload(file) {
  const type = file.type;
  const ext = MIME_EXT[type];
  if (!ext) {
    throw new Error('Sadece JPEG, PNG, WebP veya GIF yüklenebilir.');
  }
  const ab = await file.arrayBuffer();
  const buf = Buffer.from(ab);
  if (buf.length === 0) {
    throw new Error('Boş dosya.');
  }
  if (buf.length > MAX_BYTES) {
    throw new Error('Dosya en fazla 8 MB olabilir.');
  }

  const name = `${Date.now()}-${randomBytes(8).toString('hex')}${ext}`;
  const dir = adminUploadDirFs();
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), buf);

  return `/images/haberler/yuklenen/${name}`;
}
