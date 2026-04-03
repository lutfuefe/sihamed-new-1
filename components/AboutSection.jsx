'use client';

import styles from './AboutSection.module.css';

const DERNEK_CALISMA_KONULARI = [
  'Faaliyetlerinin etkinleştirilmesi ve geliştirilmesi için araştırmalar yapmak,',
  'Kurs, seminer, konferans ve panel gibi eğitim çalışmaları düzenlemek,',
  'Amacın gerçekleştirilmesi için gerekli olan her türlü bilgi, belge, doküman ve yayınları temin etmek, dokümantasyon merkezi oluşturmak, çalışmalarını duyurmak için amaçları doğrultusunda gazete, dergi, kitap ve bülten gibi yayınlar çıkarmak,',
  'Amacın gerçekleştirilmesi için sağlıklı bir çalışma ortamını sağlamak, her türlü teknik araç ve gereci, demirbaş ve kırtasiye malzemelerini temin etmek,',
  'Gerekli izinler alınmak şartıyla yardım toplama faaliyetlerinde bulunmak ve yurt içinden ve yurt dışından bağış kabul etmek,',
  'Tüzük amacının gerçekleştirilmesi için ihtiyaç duyulan gelirleri temin etmek amacıyla iktisadi, ticari ve sanayi işletmeler kurmak ve işletmek,',
  'Üyelerinin yararlanmaları ve boş zamanlarını değerlendirebilmeleri için lokal açmak, sosyal ve kültürel tesisler kurmak ve bunları tefriş etmek,',
  'Üyeleri arasında beşeri münasebetlerin geliştirilmesi ve devam ettirilmesi için yemekli toplantılar, konser, balo, tiyatro, sergi, spor, gezi ve eğlenceli etkinlikler vb. düzenlemek veya üyelerinin bu tür etkinliklerden yararlanmalarını sağlamak,',
  'Dernek faaliyetleri için ihtiyaç duyulan taşınır, taşınmaz mal satın almak, satmak, kiralamak, kiraya vermek ve taşınmazlar üzerinde aynı hak tesis etmek,',
  'Amacın gerçekleştirilmesi için gerek görülmesi durumunda yurt içinde ve yurt dışında vakıf kurmak, federasyon kurmak veya kurulu bir federasyona katılmak, gerekli izin alınarak derneklerin kurabileceği tesisleri kurmak,',
  'Uluslararası faaliyette bulunmak, yurt dışındaki dernek veya kuruluşlara üye olmak ve bu kuruluşlarla ortak çalışmalar yapmak veya yardımlaşmak,',
  'Amacın gerçekleştirilmesi için gerek görülmesi halinde, 5072 sayılı Dernek ve Vakıfların Kamu Kurum ve Kuruluşları ile İlişkilerine Dair Kanun hükümleri saklı kalmak üzere, kamu kurum ve kuruluşları ile görev alanlarına giren konularda ortak projeler yürütmek,',
  'Dernek üyelerinin yiyecek, giyecek gibi zaruri ihtiyaç maddelerini ve diğer mal ve hizmetlerle kısa vadeli kredi ihtiyaçlarını karşılamak amacıyla sandık kurmak.',
];

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

          <div className={styles.scopeBlock}>
            <h3 className={styles.scopeTitle}>
              Dernekçe Sürdürülecek Çalışma Konuları ve Biçimleri
            </h3>
            <ol className={styles.scopeList}>
              {DERNEK_CALISMA_KONULARI.map((madde, index) => (
                <li key={index} className={styles.scopeItem}>
                  {madde}
                </li>
              ))}
            </ol>
          </div>

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
            <div className={styles.digitalGraphic}>
              <svg
                className={styles.digitalBackdrop}
                viewBox="0 0 320 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <linearGradient id="aboutGold" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#d4a84b" />
                    <stop offset="1" stopColor="#e8c77b" />
                  </linearGradient>
                  <linearGradient id="aboutStroke" x1="160" y1="32" x2="160" y2="208">
                    <stop stopColor="#0066cc" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#0052a3" stopOpacity="0.18" />
                  </linearGradient>
                </defs>
                <rect width="320" height="240" fill="none" />
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
              </svg>
              <div className={styles.digitalLogoSlot}>
                <img
                  src="/images/sihamed-logo-mark.png"
                  alt="SİHAMED resmi logosu"
                  className={styles.digitalLogoImg}
                  width={200}
                  height={200}
                  decoding="async"
                />
              </div>
            </div>
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
