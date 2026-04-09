import { isAdminSessionAuthenticated } from '@/lib/server/adminAuth';
import { readSiteStats, writeSiteStats } from '@/lib/server/siteStatsStore';

export const runtime = 'nodejs';

export async function GET() {
  const stats = await readSiteStats();
  return Response.json(stats);
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

  const activeMembers = Number(body?.activeMembers);
  if (!Number.isInteger(activeMembers) || activeMembers < 0) {
    return Response.json({ error: 'Aktif üye sayısı geçersiz.' }, { status: 400 });
  }

  const nextStats = await writeSiteStats({ activeMembers });
  return Response.json({ ok: true, stats: nextStats });
}
