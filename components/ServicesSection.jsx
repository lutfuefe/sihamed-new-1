'use client';

import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 4L29 14H39L31 22L34 34L24 27L14 34L17 22L9 14H19L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Part-66 Eğitimleri',
      description: 'EASA Part-66 lisans sınavlarına hazırlık ve modül eğitimleri. A, B1, B2 kategorilerinde kapsamlı eğitim programları.',
      features: ['Teori Eğitimleri', 'Pratik Uygulamalar', 'Sınav Hazırlık']
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 18H42" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="14" r="2" fill="currentColor"/>
          <circle cx="18" cy="14" r="2" fill="currentColor"/>
        </svg>
      ),
      title: 'Teknik Seminerler',
      description: 'Havacılık sektöründeki son gelişmeler, yeni teknolojiler ve düzenleyici değişiklikler hakkında güncel seminerler.',
      features: ['Güncel Teknolojiler', 'Düzenleme Değişiklikleri', 'Uzman Konuşmacılar']
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 42C10 34.268 16.268 28 24 28C31.732 28 38 34.268 38 42" stroke="currentColor" strokeWidth="2"/>
          <path d="M34 14L42 6M42 6V12M42 6H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Kariyer Danışmanlığı',
      description: 'Sektör deneyimli mentörlerle kariyer planlaması, CV hazırlama ve mülakat teknikleri konusunda birebir danışmanlık.',
      features: ['Mentorluk', 'CV Hazırlama', 'Mülakat Desteği']
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 4V12M24 36V44M44 24H36M12 24H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2"/>
          <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Networking Etkinlikleri',
      description: 'Sektör profesyonelleriyle tanışma, iş birliği fırsatları ve kariyer geliştirme için düzenlenen networking etkinlikleri.',
      features: ['Sektör Buluşmaları', 'İş Birliği Fırsatları', 'Sosyal Etkinlikler']
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M8 12H40V38C40 39.1046 39.1046 40 38 40H10C8.89543 40 8 39.1046 8 38V12Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 8V16M32 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 20H40" stroke="currentColor" strokeWidth="2"/>
          <path d="M18 28H30M24 28V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Mesleki Belgeler',
      description: 'Üyelerimiz için mesleki yeterlilik belgesi başvuruları, doğrulama hizmetleri ve referans mektupları.',
      features: ['Belge Başvuruları', 'Doğrulama Hizmetleri', 'Referans Mektupları']
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M4 24L24 8L44 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M8 22V40H18V30H30V40H40V22" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Hukuki Destek',
      description: 'İş hukuku, sözleşme incelemeleri ve mesleki anlaşmazlıklarda üyelerimize hukuki danışmanlık ve destek.',
      features: ['İş Hukuku', 'Sözleşme İncelemesi', 'Arabuluculuk']
    }
  ];

  return (
    <section className={styles.services} id="hizmetler">
      {/* Background elements */}
      <div className={styles.bgPattern}></div>
      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.label}>
            <span>Hizmetlerimiz</span>
          </div>
          <h2 className={styles.title}>
            Üyelerimiz İçin <span className={styles.highlight}>Kapsamlı Hizmetler</span>
          </h2>
          <p className={styles.subtitle}>
            Mesleki gelişiminizi desteklemek ve sektörde güçlü bir ağ oluşturmanız için 
            sunduğumuz hizmetler
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <ul className={styles.cardFeatures}>
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#iletisim" className={styles.cardLink}>
                Detaylı Bilgi
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
