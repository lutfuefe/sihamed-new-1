import { isAdminSessionAuthenticated } from '@/lib/server/adminAuth';
import { saveAdminImageUpload } from '@/lib/server/adminUpload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** @param {import('next/server').NextRequest} request */
export async function POST(request) {
  if (!isAdminSessionAuthenticated()) {
    return Response.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  const files = formData
    .getAll('file')
    .filter((f) => f instanceof File && f.size > 0);

  if (files.length === 0) {
    return Response.json({ error: 'Dosya seçilmedi.' }, { status: 400 });
  }

  const paths = [];
  try {
    for (const file of files) {
      paths.push(await saveAdminImageUpload(file));
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Yükleme başarısız.';
    return Response.json({ error: msg }, { status: 400 });
  }

  return Response.json({ ok: true, paths });
}
