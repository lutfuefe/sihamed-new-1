'use client';

import styles from './TeamSection.module.css';

export default function TeamSection() {
  const yonetimKurulu = {
    asiller: [
      {
        name: 'Hasan Bozkurt',
        role: 'Başkan',
        initials: 'HB',
        photo: '/images/hasan-bozkurt-baskan.png'
      },
      { name: 'Veli Özkan Serim', role: 'Başkan Yardımcısı', initials: 'VÖS' },
      { name: 'Erdem Aktaş', role: 'Sayman', initials: 'EA' },
      { name: 'Zekeriya Selvi', role: 'Genel Sekreter', initials: 'ZS' },
      { name: 'Yasemin Bayram', role: 'Asil Üye', initials: 'YB' }
    ],
    yedekler: [
      { name: 'Hasan Konuk', initials: 'HK' },
      { name: 'Adnan Ünlü', initials: 'AÜ' },
      { name: 'Murat Tuğkan Dağarslan', initials: 'MTD' },
      { name: 'Doğan Özdemir', initials: 'DÖ' },
      { name: 'Ertuğrul Topçu', initials: 'ET' }
    ]
  };

  const denetimKurulu = {
    asiller: [
      { name: 'Emre Demirel', initials: 'ED' },
      { name: 'Murat Çınar', initials: 'MÇ' },
      { name: 'Mehmet Ak', initials: 'MA' }
    ],
    yedekler: [
      { name: 'Cumali Korkmaz', initials: 'CK' },
      { name: 'Hüseyin Kaya Kaymak', initials: 'HKK' },
      { name: 'Hakan Alkan', initials: 'HA' }
    ]
  };

  return (
    <section className={styles.team} id="yonetim">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine}></span>
            Yönetim
          </div>
          <h2 className={styles.title}>
            Yönetim <span className={styles.highlight}>Kurulumuz</span>
          </h2>
          <p className={styles.subtitle}>
            SİHAMED'i temsil eden ve yöneten değerli ekibimiz
          </p>
        </div>

        {/* Yönetim Kurulu Asiller */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.badge}>Yönetim Kurulu</span>
            Asil Üyeler
          </h3>
          <div className={styles.mainGrid}>
            {yonetimKurulu.asiller.map((member, index) => (
              <div key={index} className={`${styles.card} ${index === 0 ? styles.president : ''}`}>
                <div className={styles.avatar}>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className={styles.avatarPhoto}
                      width={160}
                      height={160}
                    />
                  ) : (
                    <span>{member.initials}</span>
                  )}
                </div>
                <div className={styles.info}>
                  <h4 className={styles.name}>{member.name}</h4>
                  <span className={styles.role}>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yönetim Kurulu Yedekler */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.badgeSecondary}>Yönetim Kurulu</span>
            Yedek Üyeler
          </h3>
          <div className={styles.secondaryGrid}>
            {yonetimKurulu.yedekler.map((member, index) => (
              <div key={index} className={styles.cardSmall}>
                <div className={styles.avatarSmall}>
                  <span>{member.initials}</span>
                </div>
                <span className={styles.nameSmall}>{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Denetim Kurulu */}
        <div className={styles.denetimSection}>
          <div className={styles.denetimGroup}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.badgeGold}>Denetim Kurulu</span>
              Asil Üyeler
            </h3>
            <div className={styles.denetimGrid}>
              {denetimKurulu.asiller.map((member, index) => (
                <div key={index} className={styles.cardSmall}>
                  <div className={styles.avatarGold}>
                    <span>{member.initials}</span>
                  </div>
                  <span className={styles.nameSmall}>{member.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.denetimGroup}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.badgeGoldSecondary}>Denetim Kurulu</span>
              Yedek Üyeler
            </h3>
            <div className={styles.denetimGrid}>
              {denetimKurulu.yedekler.map((member, index) => (
                <div key={index} className={styles.cardSmall}>
                  <div className={styles.avatarGoldLight}>
                    <span>{member.initials}</span>
                  </div>
                  <span className={styles.nameSmall}>{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
