'use client';

import { useState } from 'react';
import styles from './ActivitiesSection.module.css';

export default function ActivitiesSection() {
  const [activeFilter, setActiveFilter] = useState('TÜMÜ');

  const filters = ['TÜMÜ', 'JENERATÖR BAKIMI', 'İKLİMLENDİRME', 'GENEL SAHA'];

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
      category: 'GENEL SAHA'
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

  const featuredNews = {
    title: 'Derneğimizin Olağanüstü Genel Kurul Toplantısı Gerçekleştirildi',
    date: '11.04.2026',
    content: [
      "Derneğimizin Olağanüstü Genel Kurul Toplantısı, 11.04.2026 tarihinde saat 10:00'da Muhsin Yazıcıoğlu Caddesi, No:55 Balgat-Çankaya/ANKARA adresinde bulunan Meyra Palace Otel'de gerçekleştirildi.",
      'Toplantı sonucunda; Başkan yardımcılığı, yönetim kurulu ve denetim kurulu asil ve yedek üyelik görevleri yeni sahiplerine tevdi edildi. Dernek tüzüğü revize edilerek kabul edildi.',
      'Yeni seçilen dernek yöneticilerimizi tebrik eder, görevlerinde başarılar dileriz. Üstlendikleri sorumlulukların hem kendileri hem de derneğimiz için hayırlı olmasını temenni ederiz.',
      'Ayrıca; Olağanüstü Genel Kurul Toplantısına katılan üyelerimize teşekkür ederiz.',
    ],
    photos: [
      '/images/haberler/haber-olaganustu-genel-kurul-1.png',
      '/images/haberler/haber-olaganustu-genel-kurul-2.png',
      '/images/haberler/haber-olaganustu-genel-kurul-3.png',
      '/images/haberler/haber-olaganustu-genel-kurul-4.png',
    ],
  };

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

          <div className={styles.newsCard}>
            <div className={styles.newsHeader}>
              <span className={styles.newsDate}>{featuredNews.date}</span>
              <h3 className={styles.newsTitle}>{featuredNews.title}</h3>
            </div>

            <div className={styles.newsBody}>
              {featuredNews.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.newsGallery}>
              {featuredNews.photos.map((photo, index) => (
                <figure key={photo} className={styles.newsPhotoWrap}>
                  <img
                    src={photo}
                    alt={`Olaganustu Genel Kurul Toplantisi fotograflari ${index + 1}`}
                    className={styles.newsPhoto}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
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
