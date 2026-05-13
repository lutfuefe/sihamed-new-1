'use client';

import { useEffect, useState, useCallback } from 'react';
import { DEFAULT_ANNOUNCEMENTS } from '@/lib/announcementsDefaults';
import styles from './ActivitiesSection.module.css';

const CAROUSEL_INTERVAL_MS = 5500;

function NewsPhotoCarousel({ photos, altPrefix }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = photos.length;

  const go = useCallback(
    (dir) => {
      if (count <= 1) return;
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <div
      className={styles.newsCarousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.newsCarouselViewport}>
        {count > 1 && (
          <>
            <button
              type="button"
              className={`${styles.newsCarouselArrow} ${styles.newsCarouselArrowPrev}`}
              aria-label="Önceki görsel"
              onClick={() => go(-1)}
            />
            <button
              type="button"
              className={`${styles.newsCarouselArrow} ${styles.newsCarouselArrowNext}`}
              aria-label="Sonraki görsel"
              onClick={() => go(1)}
            />
          </>
        )}
        <div
          className={styles.newsCarouselTrack}
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {photos.map((photo, i) => (
            <figure key={`${photo}-${i}`} className={styles.newsCarouselSlide}>
              <img
                src={photo}
                alt={`${altPrefix} ${i + 1}`}
                className={styles.newsCarouselImg}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
      {count > 1 && (
        <div className={styles.newsCarouselDots} role="tablist" aria-label="Duyuru görselleri">
          {photos.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`${styles.newsCarouselDot} ${i === index ? styles.newsCarouselDotActive : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Görsel ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ActivitiesSection() {
  const [activeFilter, setActiveFilter] = useState('TÜMÜ');
  const [featuredNewsList, setFeaturedNewsList] = useState(DEFAULT_ANNOUNCEMENTS);
  const [newsReady, setNewsReady] = useState(false);

  const filters = ['TÜMÜ', 'JENERATÖR BAKIMI', 'İKLİMLENDİRME', 'GENEL SAHA'];

  const activities = [
    {
      image: '/images/galeri/jenerator-bakim-1.jpg',
      title: 'Jeneratör Kontrol Paneli Bakımı',
      category: 'JENERATÖR BAKIMI',
    },
    {
      image: '/images/galeri/jenerator-bakim-2.jpg',
      title: 'Perkins Motor Bakımı',
      category: 'JENERATÖR BAKIMI',
    },
    {
      image: '/images/galeri/jenerator-bakim-3.jpg',
      title: 'Cummins Jeneratör Bakımı',
      category: 'JENERATÖR BAKIMI',
    },
    {
      image: '/images/galeri/kompresor-bakim.jpg',
      title: 'Jeneratör sistemleri',
      category: 'GENEL SAHA',
    },
    {
      image: '/images/galeri/iklimlendirme-1.jpg',
      title: 'Klima Sistemi Bakımı',
      category: 'İKLİMLENDİRME',
    },
    {
      image: '/images/galeri/iklimlendirme-2.jpg',
      title: 'ACS Havalandırma Bakımı',
      category: 'İKLİMLENDİRME',
    },
    {
      image: '/images/galeri/genel-saha-1.jpg',
      title: 'Saha Kontrol İşlemleri',
      category: 'GENEL SAHA',
    },
    {
      image: '/images/galeri/genel-saha-2.jpg',
      title: 'İklimlendirme sistemleri',
      category: 'GENEL SAHA',
    },
    {
      image: '/images/galeri/genel-saha-3.jpg',
      title: 'Isıtma sistemleri',
      category: 'GENEL SAHA',
    },
  ];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/announcements', { cache: 'no-store' });
        if (!res.ok) throw new Error('announcements');
        const data = await res.json();
        if (cancelled || !Array.isArray(data?.items)) return;
        setFeaturedNewsList(data.items);
      } catch {
        if (!cancelled) {
          setFeaturedNewsList(DEFAULT_ANNOUNCEMENTS);
        }
      } finally {
        if (!cancelled) setNewsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredActivities =
    activeFilter === 'TÜMÜ'
      ? activities
      : activities.filter((a) => a.category === activeFilter);

  return (
    <section className={styles.activities} id="faaliyetler">
      {/* Featured Event - Full Width */}
      <div className={styles.featured} id="haberler">
        <div className={styles.container}>
          <div className={styles.featuredLabel}>
            <span className={styles.labelLine}></span>
            Haberler & Duyurular
          </div>

          {!newsReady ? (
            <p className={styles.newsLoading}>Duyurular yükleniyor…</p>
          ) : featuredNewsList.length === 0 ? (
            <p className={styles.newsEmpty}>Şu an yayında duyuru bulunmuyor.</p>
          ) : (
            <div className={styles.newsList}>
              {featuredNewsList.map((newsItem, newsIndex) => (
                <article
                  key={`${newsItem.title}-${newsItem.date}-${newsIndex}`}
                  className={styles.newsCard}
                >
                  <div className={styles.newsHeader}>
                    <span className={styles.newsDate}>{newsItem.date}</span>
                    <h3 className={styles.newsTitle}>{newsItem.title}</h3>
                  </div>

                  <div className={styles.newsBody}>
                    {newsItem.content.map((paragraph, index) => (
                      <p key={`${newsItem.title}-paragraph-${index}`}>{paragraph}</p>
                    ))}
                  </div>

                  <NewsPhotoCarousel
                    photos={newsItem.photos}
                    altPrefix={newsItem.photoAltPrefix}
                  />
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className={styles.gallery}>
        <div className={styles.container}>
          <div className={styles.galleryLabel}>
            <span className={styles.labelLine}></span>
            SAHA FOTOĞRAFLARI
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {filteredActivities.map((activity, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={activity.image} alt={activity.title} />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardCategory}>{activity.category}</span>
                    <h4 className={styles.cardTitle}>{activity.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
