import {
  isAdminEnvConfigured,
  isAdminSessionAuthenticated,
} from '@/lib/server/adminAuth';

export const runtime = 'nodejs';

export async function GET() {
  if (!isAdminEnvConfigured()) {
    return Response.json({ authenticated: false, configured: false });
  }

  return Response.json({
    authenticated: isAdminSessionAuthenticated(),
    configured: true,
  });
}
