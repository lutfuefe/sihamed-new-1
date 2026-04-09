import {
  isAdminEnvConfigured,
  isValidAdminCredentials,
  setAdminSessionCookie,
} from '@/lib/server/adminAuth';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!isAdminEnvConfigured()) {
    return Response.json(
      { error: 'Admin giriş ayarları eksik. .env.local dosyasını kontrol edin.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Geçersiz istek' }, { status: 400 });
  }

  const username = String(body?.username || '');
  const password = String(body?.password || '');

  if (!username || !password) {
    return Response.json({ error: 'Kullanıcı adı ve şifre gerekli.' }, { status: 400 });
  }

  if (!isValidAdminCredentials(username, password)) {
    return Response.json({ error: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 });
  }

  setAdminSessionCookie();
  return Response.json({ ok: true });
}
