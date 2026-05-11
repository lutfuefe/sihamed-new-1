import { clearAdminSessionCookie } from '@/lib/server/adminAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  clearAdminSessionCookie();
  return Response.json({ ok: true });
}
