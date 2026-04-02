'use client';

import styles from './NewsSection.module.css';

export default function NewsSection() {
  const news = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 14l9-5-9-5-9 5 9 5z"/>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          <path d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"/>
        </svg>
      ),
      category: 'EĞİTİM',
      categoryColor: '#3b82f6',
      date: '28 Mart 2026',
      title: 'Part-66 B1 Modül Eğitimleri Başlıyor',
      excerpt: 'Nisan ayında başlayacak Part-66 B1 modül eğitimlerimiz için kayıtlar açıldı. Sınırlı kontenjan!',
      link: '#'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      ),
      category: 'ETKİNLİK',
      categoryColor: '#10b981',
      date: '22 Mart 2026',
      title: 'Havacılık Kariyer Zirvesi 2026',
      excerpt: 'Mayıs ayında düzenlenecek kariyer zirvesinde sektörün önde gelen isimlerini ağırlayacağız.',
      link: '#'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
        </svg>
      ),
      category: 'DUYURU',
      categoryColor: '#f59e0b',
      date: '15 Mart 2026',
      title: 'SHGM ile İşbirliği Protokolü İmzalandı',
      excerpt: 'Sivil Havacılık Genel Müdürlüğü ile önemli bir işbirliği protokolü imzaladık.',
      link: '#'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      category: 'SEMİNER',
      categoryColor: '#8b5cf6',
      date: '10 Mart 2026',
      title: 'Dijital Dönüşüm ve Havacılık Bakımı',
      excerpt: 'Yapay zeka ve dijitalleşmenin havacılık bakım süreçlerine etkileri konulu seminer düzenlendi.',
      link: '#'
    }
  ];

  return (
    <section className={styles.news} id="haberler">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.label}>
              <span className={styles.labelLine}></span>
              Haberler & Duyurular
            </div>
            <h2 className={styles.title}>
              Güncel <span className={styles.highlight}>Gelişmeler</span>
            </h2>
          </div>
          <a href="/haberler" className={styles.viewAll}>
            Tüm Haberler
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* News List - Resim 4 tarzı */}
        <div className={styles.newsList}>
          {news.map((item, index) => (
            <article key={index} className={styles.newsCard}>
              <div className={styles.newsIcon} style={{ color: item.categoryColor }}>
                {item.icon}
              </div>
              <div className={styles.newsContent}>
                <div className={styles.newsMeta}>
                  <span 
                    className={styles.newsCategory}
                    style={{ backgroundColor: `${item.categoryColor}20`, color: item.categoryColor }}
                  >
                    {item.category}
                  </span>
                  <span className={styles.newsDate}>{item.date}</span>
                </div>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsExcerpt}>{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
