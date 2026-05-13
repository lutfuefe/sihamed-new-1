import { isAdminSessionAuthenticated } from '@/lib/server/adminAuth';
import { readAnnouncements, writeAnnouncements } from '@/lib/server/announcementsStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const items = await readAnnouncements();
  return Response.json(
    { items },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    }
  );
}

export async function PUT(request) {
  if (!isAdminSessionAuthenticated()) {
    return Response.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Geçersiz istek' }, { status: 400 });
  }

  try {
    const items = await writeAnnouncements(body?.items);
    return Response.json({ ok: true, items });
  } catch (error) {
    return Response.json(
      { error: error?.message || 'Duyurular güncellenemedi.' },
      { status: 503 }
    );
  }
}
