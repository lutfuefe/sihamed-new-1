import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';

/**
 * Next.js üretim derlemesi; process.env.ADMIN_* gibi nokta erişimlerini build
 * sırasında sabitler. Docker imajı build edilirken .env olmadığından bu değerler
 * boş kalır; runtime'da konteynere verilen env hiç kullanılmaz. Köşeli parantez
 * ile okumak runtime'da process.env'den okunmasını sağlar.
 * @param {string} key
 */
function env(key) {
  const v = process.env[key];
  return typeof v === 'string' ? v : v != null ? String(v) : '';
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function getAdminEnv() {
  const username = env('ADMIN_USERNAME').trim();
  const password = env('ADMIN_PASSWORD').trim();
  const secret = env('ADMIN_SESSION_SECRET').trim();

  if (!username || !password || !secret) {
    return { valid: false };
  }

  return { valid: true, username, password, secret };
}

function buildToken(username, password, secret) {
  return sha256(`${username}:${password}:${secret}`);
}

function safeEqual(a, b) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function isAdminEnvConfigured() {
  return getAdminEnv().valid;
}

export function isValidAdminCredentials(username, password) {
  const env = getAdminEnv();
  if (!env.valid) return false;
  return safeEqual(username, env.username) && safeEqual(password, env.password);
}

export function setAdminSessionCookie() {
  const env = getAdminEnv();
  if (!env.valid) return false;
  const token = buildToken(env.username, env.password, env.secret);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export function clearAdminSessionCookie() {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export function isAdminSessionAuthenticated() {
  const env = getAdminEnv();
  if (!env.valid) return false;
  const current = cookies().get(COOKIE_NAME)?.value;
  if (!current) return false;
  const expected = buildToken(env.username, env.password, env.secret);
  return safeEqual(current, expected);
}
