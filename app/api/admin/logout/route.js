import { clearAdminSessionCookie } from '@/lib/server/adminAuth';

export const runtime = 'nodejs';

export async function POST() {
  clearAdminSessionCookie();
  return Response.json({ ok: true });
}
