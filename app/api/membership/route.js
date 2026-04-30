/**
 * Üyelik başvurusu — Resend HTTP API ile e-posta gönderir.
 *
 * Ortam değişkenleri (.env.local):
 *   RESEND_API_KEY=re_...        (https://resend.com — API Keys)
 *   MEMBERSHIP_NOTIFY_EMAIL=...  (başvuruların gideceği adres)
 *   RESEND_FROM_EMAIL=...        (isteğe bağlı; yoksa Resend test adresi)
 */

function escapeHtml(s) {
  if (s == null || s === '') return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MEMBERSHIP_NOTIFY_EMAIL || 'sihameddernek@gmail.com';
  const from =
    process.env.RESEND_FROM_EMAIL ||
    'SİHAMED Başvuru <onboarding@resend.dev>';

  if (!apiKey) {
    return Response.json(
      {
        error:
          'Sunucuda RESEND_API_KEY tanımlı değil. .env.local dosyasına ekleyin.',
      },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Geçersiz istek gövdesi' }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    unvan,
    tcKimlik,
    birthDay,
    birthMonth,
    birthYear,
  } = body;

  if (!name || !email || !phone || !unvan || !tcKimlik) {
    return Response.json(
      { error: 'Zorunlu alanlar eksik' },
      { status: 400 }
    );
  }

  const tc = String(tcKimlik).replace(/\D/g, '');
  if (tc.length !== 11) {
    return Response.json(
      { error: 'TC kimlik numarası 11 haneli olmalıdır' },
      { status: 400 }
    );
  }

  if (!birthDay || !birthMonth || !birthYear) {
    return Response.json(
      { error: 'Doğum tarihi eksik' },
      { status: 400 }
    );
  }

  const birthStr = `${birthDay}.${birthMonth}.${birthYear}`;

  const html = `
    <h2>Yeni üyelik başvurusu</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Ad Soyad</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">E-posta</td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Telefon</td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Unvan</td><td>${escapeHtml(unvan)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">TC Kimlik</td><td>${escapeHtml(tc)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Doğum tarihi</td><td>${escapeHtml(birthStr)} (gg.aa.yyyy)</td></tr>
    </table>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Üyelik başvurusu — ${name}`,
      html,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error('Resend error:', res.status, data);
    return Response.json(
      {
        error:
          data?.message ||
          'E-posta gönderilemedi. Resend ayarlarını ve alan adını kontrol edin.',
      },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, id: data.id });
}
