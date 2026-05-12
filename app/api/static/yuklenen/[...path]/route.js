import { readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { adminUploadDirFs, adminUploadDirFsResolved } from '@/lib/server/adminUpload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

export async function GET(_request, { params }) {
  const segments = params?.path;
  const parts = Array.isArray(segments) ? segments : segments ? [segments] : [];
  if (parts.length !== 1) {
    return new Response('Not Found', { status: 404 });
  }
  const name = parts[0];
  if (!/^[a-zA-Z0-9._-]+$/.test(name) || name.includes('..')) {
    return new Response('Bad Request', { status: 400 });
  }

  const root = adminUploadDirFsResolved();
  const filePath = resolve(join(adminUploadDirFs(), name));
  const rel = relative(root, filePath);
  if (rel.startsWith('..') || rel === '') {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const buf = await readFile(filePath);
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const type = MIME[ext] || 'application/octet-stream';
    return new Response(buf, {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
