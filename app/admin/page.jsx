'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

function emptyAnnouncement() {
  return {
    title: '',
    date: '',
    content: [],
    photos: [],
    photoAltPrefix: '',
  };
}

export default function AdminPage() {
  const [configured, setConfigured] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeMembers, setActiveMembers] = useState(478);
  const [announcementItems, setAnnouncementItems] = useState([]);
  const [announcementsLoaded, setAnnouncementsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadAnnouncements() {
    try {
      const res = await fetch('/api/announcements', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data?.items)) {
        setAnnouncementItems(
          data.items.map((item) => ({
            title: item.title ?? '',
            date: item.date ?? '',
            content: Array.isArray(item.content) ? item.content : [],
            photos: Array.isArray(item.photos) ? item.photos : [],
            photoAltPrefix: item.photoAltPrefix ?? '',
          }))
        );
      }
    } finally {
      setAnnouncementsLoaded(true);
    }
  }

  useEffect(() => {
    async function bootstrap() {
      try {
        const [sessionRes, statsRes] = await Promise.all([
          fetch('/api/admin/session', { cache: 'no-store' }),
          fetch('/api/site-stats', { cache: 'no-store' }),
        ]);

        let authed = false;
        if (sessionRes.ok) {
          const session = await sessionRes.json();
          setConfigured(Boolean(session?.configured));
          authed = Boolean(session?.authenticated);
          setAuthenticated(authed);
        }

        if (statsRes.ok) {
          const stats = await statsRes.json();
          const value = Number(stats?.activeMembers);
          if (Number.isInteger(value) && value >= 0) {
            setActiveMembers(value);
          }
        }

        if (authed) {
          await loadAnnouncements();
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
      setAnnouncementsLoaded(false);
      await loadAnnouncements();
    } catch {
      setMessage('Sunucuya bağlanılamadı.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSaveStats(event) {
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

  async function handleSaveAnnouncements(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const payload = announcementItems.map((item) => ({
      title: item.title,
      date: item.date,
      content: item.content,
      photos: item.photos,
      photoAltPrefix: item.photoAltPrefix,
    }));

    try {
      const response = await fetch('/api/announcements', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setMessage(data?.error || 'Duyurular kaydedilemedi.');
        if (response.status === 401) setAuthenticated(false);
        return;
      }

      if (Array.isArray(data?.items)) {
        setAnnouncementItems(
          data.items.map((item) => ({
            title: item.title ?? '',
            date: item.date ?? '',
            content: Array.isArray(item.content) ? item.content : [],
            photos: Array.isArray(item.photos) ? item.photos : [],
            photoAltPrefix: item.photoAltPrefix ?? '',
          }))
        );
      }
      setMessage('Duyurular güncellendi.');
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
    setAnnouncementItems([]);
    setAnnouncementsLoaded(false);
    setActiveTab('stats');
    setIsSubmitting(false);
    setMessage('Çıkış yapıldı.');
  }

  function updateAnnouncement(index, patch) {
    setAnnouncementItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  }

  function moveAnnouncement(index, direction) {
    setAnnouncementItems((prev) => {
      const next = [...prev];
      const j = index + direction;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  }

  function removeAnnouncement(index) {
    setAnnouncementItems((prev) => prev.filter((_, i) => i !== index));
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
            Üretim veya Docker ortamında <code>.env</code> veya{' '}
            <code>.env.local</code> dosyasına <code>ADMIN_USERNAME</code>,{' '}
            <code>ADMIN_PASSWORD</code> ve <code>ADMIN_SESSION_SECRET</code>{' '}
            ekleyin. Örnek için depodaki <code>.env.example</code> dosyasına
            bakın.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <section className={`${styles.card} ${styles.cardWide}`}>
        <header className={styles.header}>
          <h1>SİHAMED Yönetim</h1>
          {authenticated ? (
            <button
              className={styles.logoutTop}
              type="button"
              onClick={handleLogout}
              disabled={isSubmitting}
            >
              Çıkış
            </button>
          ) : null}
        </header>

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
          <>
            <div className={styles.tabs} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'stats'}
                className={activeTab === 'stats' ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab('stats')}
              >
                Üye sayısı
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'news'}
                className={activeTab === 'news' ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab('news')}
              >
                Haberler & Duyurular
              </button>
            </div>

            {activeTab === 'stats' ? (
              <form className={styles.form} onSubmit={handleSaveStats}>
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
              </form>
            ) : (
              <div className={styles.newsPanel}>
                <p className={styles.hint}>
                  Görselleri <code>public/images/...</code> altına yükleyip burada
                  yolunu yazın. Paragrafları boş satırla ayırın.
                </p>
                {!announcementsLoaded ? (
                  <p>Duyurular yükleniyor…</p>
                ) : (
                  <form className={styles.form} onSubmit={handleSaveAnnouncements}>
                    <div className={styles.announcementList}>
                      {announcementItems.map((item, index) => (
                        <div key={`ann-${index}`} className={styles.announcementCard}>
                          <div className={styles.announcementCardHead}>
                            <span className={styles.announcementIndex}>Duyuru {index + 1}</span>
                            <div className={styles.announcementActions}>
                              <button
                                type="button"
                                className={styles.buttonGhost}
                                onClick={() => moveAnnouncement(index, -1)}
                                disabled={index === 0 || isSubmitting}
                              >
                                Yukarı
                              </button>
                              <button
                                type="button"
                                className={styles.buttonGhost}
                                onClick={() => moveAnnouncement(index, 1)}
                                disabled={index === announcementItems.length - 1 || isSubmitting}
                              >
                                Aşağı
                              </button>
                              <button
                                type="button"
                                className={styles.buttonDangerGhost}
                                onClick={() => removeAnnouncement(index)}
                                disabled={isSubmitting}
                              >
                                Kaldır
                              </button>
                            </div>
                          </div>
                          <label className={styles.label}>
                            Başlık
                            <input
                              className={styles.input}
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                updateAnnouncement(index, { title: e.target.value })
                              }
                            />
                          </label>
                          <label className={styles.label}>
                            Tarih
                            <input
                              className={styles.input}
                              type="text"
                              placeholder="örn. 23.04.2026"
                              value={item.date}
                              onChange={(e) =>
                                updateAnnouncement(index, { date: e.target.value })
                              }
                            />
                          </label>
                          <label className={styles.label}>
                            Görsel alt metni (önek)
                            <input
                              className={styles.input}
                              type="text"
                              value={item.photoAltPrefix}
                              onChange={(e) =>
                                updateAnnouncement(index, { photoAltPrefix: e.target.value })
                              }
                            />
                          </label>
                          <label className={styles.label}>
                            Metin (paragraflar; aralarında boş satır)
                            <textarea
                              className={styles.textarea}
                              rows={6}
                              value={item.content.join('\n\n')}
                              onChange={(e) =>
                                updateAnnouncement(index, {
                                  content: e.target.value
                                    .split(/\n\s*\n/)
                                    .map((p) => p.trim())
                                    .filter(Boolean),
                                })
                              }
                            />
                          </label>
                          <label className={styles.label}>
                            Görsel yolları (satır başına bir yol)
                            <textarea
                              className={styles.textareaMono}
                              rows={4}
                              value={item.photos.join('\n')}
                              onChange={(e) =>
                                updateAnnouncement(index, {
                                  photos: e.target.value
                                    .split('\n')
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                                })
                              }
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className={styles.rowActions}>
                      <button
                        type="button"
                        className={styles.buttonSecondary}
                        onClick={() =>
                          setAnnouncementItems((prev) => [...prev, emptyAnnouncement()])
                        }
                        disabled={isSubmitting}
                      >
                        Duyuru ekle
                      </button>
                      <button className={styles.button} type="submit" disabled={isSubmitting}>
                        Duyuruları kaydet
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </>
        )}

        {message ? <p className={styles.message}>{message}</p> : null}
      </section>
    </main>
  );
}
