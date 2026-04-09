'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function AdminPage() {
  const [configured, setConfigured] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeMembers, setActiveMembers] = useState(478);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        const [sessionRes, statsRes] = await Promise.all([
          fetch('/api/admin/session', { cache: 'no-store' }),
          fetch('/api/site-stats', { cache: 'no-store' }),
        ]);

        if (sessionRes.ok) {
          const session = await sessionRes.json();
          setConfigured(Boolean(session?.configured));
          setAuthenticated(Boolean(session?.authenticated));
        }

        if (statsRes.ok) {
          const stats = await statsRes.json();
          const value = Number(stats?.activeMembers);
          if (Number.isInteger(value) && value >= 0) {
            setActiveMembers(value);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setMessage(data?.error || 'Giriş başarısız.');
        return;
      }

      setAuthenticated(true);
      setMessage('Giriş başarılı.');
      setPassword('');
    } catch {
      setMessage('Sunucuya bağlanılamadı.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/site-stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeMembers: Number(activeMembers) }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setMessage(data?.error || 'Kaydetme işlemi başarısız.');
        if (response.status === 401) setAuthenticated(false);
        return;
      }

      setMessage('Aktif üye sayısı güncellendi.');
    } catch {
      setMessage('Sunucuya bağlanılamadı.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    setIsSubmitting(true);
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    setAuthenticated(false);
    setIsSubmitting(false);
    setMessage('Çıkış yapıldı.');
  }

  if (isLoading) {
    return <main className={styles.wrapper}>Yükleniyor...</main>;
  }

  if (!configured) {
    return (
      <main className={styles.wrapper}>
        <section className={styles.card}>
          <h1>Admin Ayarı Eksik</h1>
          <p>
            `.env.local` dosyasına `ADMIN_USERNAME`, `ADMIN_PASSWORD` ve
            `ADMIN_SESSION_SECRET` ekleyin.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <h1>Üye Sayısı Yönetimi</h1>

        {!authenticated ? (
          <form className={styles.form} onSubmit={handleLogin}>
            <label className={styles.label}>
              Kullanıcı Adı
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label className={styles.label}>
              Şifre
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            <button className={styles.button} type="submit" disabled={isSubmitting}>
              Giriş Yap
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSave}>
            <label className={styles.label}>
              Aktif Üye Sayısı
              <input
                className={styles.input}
                type="number"
                min="0"
                step="1"
                value={activeMembers}
                onChange={(e) => setActiveMembers(e.target.value)}
                required
              />
            </label>
            <button className={styles.button} type="submit" disabled={isSubmitting}>
              Kaydet
            </button>
            <button
              className={styles.buttonSecondary}
              type="button"
              onClick={handleLogout}
              disabled={isSubmitting}
            >
              Çıkış Yap
            </button>
          </form>
        )}

        {message ? <p className={styles.message}>{message}</p> : null}
      </section>
    </main>
  );
}
