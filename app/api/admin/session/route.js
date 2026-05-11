import {
  isAdminEnvConfigured,
  isAdminSessionAuthenticated,
} from '@/lib/server/adminAuth';

export const runtime = 'nodejs';
/** Derleme anında boş env ile statik JSON gömülmesini engeller */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  if (!isAdminEnvConfigured()) {
    return Response.json({ authenticated: false, configured: false });
  }

  return Response.json({
    authenticated: isAdminSessionAuthenticated(),
    configured: true,
  });
}
