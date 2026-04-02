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
      description: '2500+ aktif üye ile Türkiye\'nin en büyük havacılık topluluğu.'
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

        {/* Right Visual - Logo */}
        <div className={styles.visual}>
          <div className={styles.logoWrapper}>
            <img 
              src="/images/sihamed-logo.png" 
              alt="SİHAMED Logo" 
              className={styles.logoImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
