import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const MAX_BYTES = 8 * 1024 * 1024;

const MIME_EXT = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const REL_SEG = ['public', 'images', 'haberler', 'yuklenen'];

export function adminUploadDirFs() {
  return join(process.cwd(), ...REL_SEG);
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
