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
      title: 'Endüstriyel Kompresör Bakımı',
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
      title: 'Kompresör Sistemi Kontrolü',
      category: 'GENEL SAHA'
    },
    {
      image: '/images/galeri/genel-saha-3.jpg',
      title: 'Teknik Ekipman Bakımı',
      category: 'GENEL SAHA'
    }
  ];

  const filteredActivities = activeFilter === 'TÜMÜ' 
    ? activities 
    : activities.filter(a => a.category === activeFilter);

  return (
    <section className={styles.activities} id="faaliyetler">
      {/* Featured Event - Full Width */}
      <div className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.featuredLabel}>
            <span className={styles.labelLine}></span>
            ÖNE ÇIKAN
          </div>
          <div className={styles.featuredCard}>
            <div className={styles.featuredDate}>
              <span className={styles.day}>9</span>
              <span className={styles.month}>MART</span>
            </div>
            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>
                SİVİL HAVACILIK MEKANİĞİ TEKNİK ELEMANLARI GÜNÜ
              </h3>
              <p className={styles.featuredDesc}>
                Her yıl 9 Mart'ta kutlanan bu özel günde DHMİ makine teknik elemanlarının emeğini, 
                özverisini ve havacılık güvenliğine katkısını anıyor, dayanışmamızı pekiştiriyoruz.
              </p>
            </div>
            <a href="#" className={styles.featuredBtn}>
              KUTLAMA ARŞİVİ →
            </a>
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
