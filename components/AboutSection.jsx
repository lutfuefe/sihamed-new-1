'use client';

import styles from './AboutSection.module.css';

export default function AboutSection() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 14V24L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: '5+ Yıllık Deneyim',
      description: '2021\'den bu yana havacılık sektörüne hizmet veriyoruz.'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 24L44 14M24 24V44M24 24L4 14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'SHGM Uyumlu',
      description: 'Tüm eğitimlerimiz SHGM ve EASA standartlarına uygundur.'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 42C8 33.163 15.163 26 24 26C32.837 26 40 33.163 40 42" stroke="currentColor" strokeWidth="2"/>
          <circle cx="38" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
          <circle cx="10" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Güçlü Ağ',
      description: '465+ aktif üye ile Türkiye\'nin en büyük havacılık topluluğu.'
    }
  ];

  return (
    <section className={styles.about} id="hakkimizda">
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.content}>
          <div className={styles.label}>
            <span className={styles.labelLine}></span>
            Hakkımızda
          </div>
          
          <h2 className={styles.title}>
            Gökyüzünün Güvenliği <br/>
            <span className={styles.highlight}>Bizim Sorumluluğumuz</span>
          </h2>
          
          <p className={styles.description}>
            Sivil Havacılık Mekaniği Teknik Elemanları Derneği (SİHAMED), 
            Türkiye'de sivil havacılık bakım sektöründe faaliyet gösteren 
            tüm teknik personeli tek çatı altında toplayan, mesleki gelişimi 
            ve dayanışmayı ön planda tutan profesyonel bir meslek kuruluşudur.
          </p>
          
          <p className={styles.description}>
            Üyelerimizin mesleki gelişimini desteklemek, sektördeki güncel 
            gelişmeleri takip etmek ve havacılık güvenliğine katkıda bulunmak 
            temel misyonumuzdur.
          </p>

          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <div className={styles.featureContent}>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#iletisim" className={styles.btn}>
            Bize Ulaşın
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right — dijital marka paneli (vektör) */}
        <div className={styles.visual}>
          <figure className={styles.digitalPanel}>
            <svg
              className={styles.digitalBackdrop}
              viewBox="0 0 320 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <linearGradient id="aboutBlue" x1="0" y1="0" x2="320" y2="240">
                  <stop stopColor="#0066cc" stopOpacity="0.1" />
                  <stop offset="1" stopColor="#004080" stopOpacity="0.03" />
                </linearGradient>
                <linearGradient id="aboutGold" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#d4a84b" />
                  <stop offset="1" stopColor="#e8c77b" />
                </linearGradient>
                <linearGradient id="aboutStroke" x1="160" y1="32" x2="160" y2="208">
                  <stop stopColor="#0066cc" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#0052a3" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <rect width="320" height="240" fill="url(#aboutBlue)" />
              <circle cx="160" cy="118" r="102" stroke="url(#aboutStroke)" strokeWidth="1" />
              <circle
                cx="160"
                cy="118"
                r="102"
                stroke="url(#aboutGold)"
                strokeWidth="1.5"
                strokeDasharray="6 14"
                strokeLinecap="round"
                opacity="0.85"
              />
              <circle cx="160" cy="118" r="78" stroke="#cce0f5" strokeWidth="1" opacity="0.95" />
              <path
                d="M64 52h24M64 52v24M256 52h-24M256 52v24M64 184h24M64 184v-24M256 184h-24M256 184v-24"
                stroke="#0066cc"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.22"
              />
              <g transform="translate(136 92) scale(1.85)">
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                  fill="url(#aboutGold)"
                  opacity="0.95"
                />
              </g>
              <circle cx="160" cy="200" r="2.5" fill="#d4a84b" opacity="0.55" />
              <circle cx="142" cy="200" r="1.8" fill="#0066cc" opacity="0.3" />
              <circle cx="178" cy="200" r="1.8" fill="#0066cc" opacity="0.3" />
            </svg>
            <figcaption className={styles.digitalContent}>
              <span className={styles.digitalEyebrow}>EST. 2021</span>
              <span className={styles.digitalName}>SİHAMED</span>
              <span className={styles.digitalLine}>Sivil Havacılık Mekaniği</span>
              <span className={styles.digitalMuted}>Teknik Elemanları Derneği</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
