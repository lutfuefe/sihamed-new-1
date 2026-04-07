'use client';

import { useState } from 'react';
import styles from './ActivitiesSection.module.css';

export default function ActivitiesSection() {
  const [activeFilter, setActiveFilter] = useState('TÜMÜ');

  const filters = ['TÜMÜ', 'JENERATÖR BAKIMI', 'İKLİMLENDİRME', 'KOMPRESÖR', 'GENEL SAHA'];

  const activities = [
    {
      image: '/images/galeri/jenerator-bakim-1.jpg',
      title: 'Jeneratör Kontrol Paneli Bakımı',
      category: 'JENERATÖR BAKIMI'
    },
    {
      image: '/images/galeri/jenerator-bakim-2.jpg',
      title: 'Perkins Motor Bakımı',
      category: 'JENERATÖR BAKIMI'
    },
    {
      image: '/images/galeri/jenerator-bakim-3.jpg',
      title: 'Cummins Jeneratör Bakımı',
      category: 'JENERATÖR BAKIMI'
    },
    {
      image: '/images/galeri/kompresor-bakim.jpg',
      title: 'Jeneratör sistemleri',
      category: 'KOMPRESÖR'
    },
    {
      image: '/images/galeri/iklimlendirme-1.jpg',
      title: 'Klima Sistemi Bakımı',
      category: 'İKLİMLENDİRME'
    },
    {
      image: '/images/galeri/iklimlendirme-2.jpg',
      title: 'ACS Havalandırma Bakımı',
      category: 'İKLİMLENDİRME'
    },
    {
      image: '/images/galeri/genel-saha-1.jpg',
      title: 'Saha Kontrol İşlemleri',
      category: 'GENEL SAHA'
    },
    {
      image: '/images/galeri/genel-saha-2.jpg',
      title: 'İklimlendirme sistemleri',
      category: 'GENEL SAHA'
    },
    {
      image: '/images/galeri/genel-saha-3.jpg',
      title: 'Isıtma sistemleri',
      category: 'GENEL SAHA'
    }
  ];

  const filteredActivities = activeFilter === 'TÜMÜ' 
    ? activities 
    : activities.filter(a => a.category === activeFilter);

  return (
    <section className={styles.activities} id="faaliyetler">
      {/* Featured Event - Full Width */}
      <div className={styles.featured} id="haberler">
        <div className={styles.container}>
          <div className={styles.featuredLabel}>
            <span className={styles.labelLine}></span>
            Haberler & Duyurular
          </div>
          <div className={styles.featuredBanner}>
            <img
              src="/images/featured-mar9-sihamed-banner.png"
              alt="9 Mart Sivil Havacılık Mekaniği Teknik Elemanları Günü — SİHAMED kutlama görseli"
              className={styles.featuredBannerImg}
              loading="lazy"
              decoding="async"
            />
          </div>
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
