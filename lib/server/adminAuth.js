import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function getAdminEnv() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

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
