import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Mevzuat', href: '/#mevzuat' },
    { label: 'Yönetim', href: '/#yonetim' },
    { label: 'Eğitimler', href: '/egitimler' },
    { label: 'Haberler', href: '/#haberler' },
    { label: 'Etkinlikler', href: '/etkinlikler' },
    { label: 'İletişim', href: '/iletisim' }
  ];

  const memberLinks = [
    { label: 'Üyelik Başvurusu', href: '/uyelik/basvuru' },
    { label: 'Üye Girişi', href: '/uyelik/giris' },
    { label: 'Üyelik Avantajları', href: '/uyelik/avantajlar' },
    { label: 'Üyelik Ücretleri', href: '/uyelik/ucretler' },
    { label: 'Üye Rehberi', href: '/uyelik/rehber' }
  ];

  const resourceLinks = [
    { label: 'Part-66 Mevzuatı', href: '/kaynaklar/part-66' },
    { label: 'SHGM Duyuruları', href: '/kaynaklar/shgm' },
    { label: 'Teknik Dökümanlar', href: '/kaynaklar/dokumanlar' },
    { label: 'Sertifika Sorgulama', href: '/kaynaklar/sertifika' },
    { label: 'SSS', href: '/sss' }
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <a href="/" className={styles.logo}>
                <img src="/images/sihamed-logo.png" alt="SİHAMED" />
                <span>SİHAMED</span>
              </a>
              <p className={styles.brandDesc}>
                Sivil Havacılık Mekaniği Teknik Elemanları Derneği olarak, Türkiye&apos;deki havacılık makina teknik personelinin mesleki gelişimini destekliyor ve haklarını savunuyoruz.
              </p>
              <div className={styles.contact}>
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Esenboğa Havalimanı, Ankara</span>
                </div>
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
                  </svg>
                  <span>
                    <a href="tel:+903122042314">0312 204 23 14</a>
                    {' · '}
                    <a href="tel:+905382334144">05382334144</a>
                  </span>
                </div>
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href="mailto:sihamed.dhmi@gmail.com">sihamed.dhmi@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.linksCol}>
              <h4 className={styles.colTitle}>Hızlı Erişim</h4>
              <ul className={styles.linkList}>
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Member Links */}
            <div className={styles.linksCol}>
              <h4 className={styles.colTitle}>Üyelik</h4>
              <ul className={styles.linkList}>
                {memberLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className={styles.linksCol}>
              <h4 className={styles.colTitle}>Kaynaklar</h4>
              <ul className={styles.linkList}>
                {resourceLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.newsletterCol}>
              <h4 className={styles.colTitle}>Bülten</h4>
              <p className={styles.newsletterDesc}>
                Güncel haberler ve duyurulardan haberdar olmak için bültenimize abone olun.
              </p>
              <form className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz"
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterBtn}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
              
              {/* Social Links */}
              <div className={styles.socialLinks}>
                <a href="https://www.facebook.com/share/16UWDQb31m/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://x.com/sihameddernek?s=11&t=1ILg33wHGTnHyLRg_UQQcQ" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/sihameddernek?igsh=MTFncm44N3FrZ282aA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/sihamed" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="https://youtube.com/sihamed" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} SİHAMED - Sivil Havacılık Mekaniği Teknik Elemanları Derneği. 
              Tüm hakları saklıdır.
            </p>
            <div className={styles.bottomLinks}>
              <a href="/gizlilik">Gizlilik Politikası</a>
              <span className={styles.divider}>•</span>
              <a href="/kullanim-kosullari">Kullanım Koşulları</a>
              <span className={styles.divider}>•</span>
              <a href="/kvkk">KVKK</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative plane */}
      <div className={styles.planeDecor}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>
    </footer>
  );
}
