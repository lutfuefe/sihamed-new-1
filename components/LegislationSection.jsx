'use client';

import { useState } from 'react';
import styles from './LegislationSection.module.css';

export default function LegislationSection() {
  const [activeTab, setActiveTab] = useState(0);
  const downloadableDocs = [
    {
      title: '657 SAYILI DEVLET MEMURLARI KANUNU',
      href: '/docs/mevzuat/657-sayili-devlet-memurlari-kanunu.pdf'
    },
    {
      title: '399 SAYILI KARARNAME',
      href: '/docs/mevzuat/399-sayili-kararname.pdf'
    },
    {
      title: 'DHMİ TEŞKİLAT YAPISI BÖLÜM 2',
      href: '/docs/mevzuat/dhmi-teskilat-yapisi-bolum-2.pdf'
    },
    {
      title: 'DHMİ KURULUŞ YAPISI GENEL BİLGİLER-1',
      href: '/docs/mevzuat/dhmi-kurulus-yapisi-genel-bilgiler-1.pdf'
    },
    {
      title: 'DHMİ KADROLU PERSONEL DİSİPLİN AMİRLERİ YÖNETMELİĞİ',
      href: '/docs/mevzuat/dhmi-kadrolu-personel-disiplin-amirleri-yonetmeligi.pdf'
    },
    {
      title: 'DEVLET HAVA MEYDANLARI İŞLETMESİ GENEL MÜDÜRLÜĞÜ (DHMİ) ANA STATÜSÜ',
      href: '/docs/mevzuat/dhmi-ana-statusu.pdf'
    },
    {
      title: '11 MAYIS 2006 TARİH VE 26165 SAYILI DEVLET MEMURLARI TEBLİĞİ',
      href: '/docs/mevzuat/11-mayis-2006-26165-devlet-memurlari-tebligi.pdf'
    },
    {
      title: '5335 SAYILI BAZI KANUN VE KANUN HÜKMÜNDE KARARNAMELERDE DEĞİŞİKLİK YAPILMASINA DAİR KANUN',
      href: '/docs/mevzuat/5335-sayili-kanun.pdf'
    },
    {
      title: '2920 SAYILI TÜRK SİVİL HAVACILIK KANUNU',
      href: '/docs/mevzuat/2920-sayili-turk-sivil-havacilik-kanunu.pdf'
    },
    {
      title: '2006-10344 DEVLET MEMURLARINA ÖDENECEK ZAM VE TAZMİNATA İLİŞKİN KARAR',
      href: '/docs/mevzuat/2006-10344-zam-ve-tazminat-karari.pdf'
    }
  ];

  const sections = [
    {
      title: 'Derneğin Adı ve Merkezi',
      content: `**Madde 1-** Derneğin Adı "Sivil Havacılık Mekaniği Teknik Elemanları Derneği" dir. Kısa adı "SİHAMED" tir. Derneğin merkezi Ankara'dır. Şubesi açılmayacaktır.`
    },
    {
      title: 'Derneğin Amacı ve Faaliyet Alanı',
      content: `**Madde 2-** Dernek, Sivil Havacılık Mekaniği Teknik Elemanlarını bir araya getirerek aralarında yardımlaşmayı sağlamak. Mesleki sorunlarına derneğin imkânları dahilinde çözümler aramak amacı ile kurulmuştur.

**Dernekçe Sürdürülecek Çalışma Konuları ve Biçimleri:**

1. Faaliyetlerinin etkinleştirilmesi ve geliştirilmesi için araştırmalar yapmak,
2. Kurs, seminer, konferans ve panel gibi eğitim çalışmaları düzenlemek,
3. Amacın gerçekleştirilmesi için gerekli olan her türlü bilgi, belge, doküman ve yayınları temin etmek, dokümantasyon merkezi oluşturmak, çalışmalarını duyurmak için amaçları doğrultusunda gazete, dergi, kitap ve bülten gibi yayınlar çıkarmak,
4. Amacın gerçekleştirilmesi için sağlıklı bir çalışma ortamını sağlamak, her türlü teknik araç ve gereci, demirbaş ve kırtasiye malzemelerini temin etmek,
5. Gerekli izinler alınmak şartıyla yardım toplama faaliyetlerinde bulunmak ve yurt içinden ve yurt dışından bağış kabul etmek,
6. Tüzük amacının gerçekleştirilmesi için ihtiyaç duyulan gelirleri temin etmek amacıyla iktisadi, ticari ve sanayi işletmeler kurmak ve işletmek,
7. Üyelerinin yararlanmaları ve boş zamanlarını değerlendirebilmeleri için lokal açmak, sosyal ve kültürel tesisler kurmak ve bunları tefriş etmek,
8. Üyeleri arasında beşeri münasebetlerin geliştirilmesi ve devam ettirilmesi için yemekli toplantılar, konser, balo, tiyatro, sergi, spor, gezi ve eğlenceli etkinlikler vb. düzenlemek veya üyelerinin bu tür etkinliklerden yararlanmalarını sağlamak,
9. Dernek faaliyetleri için ihtiyaç duyulan taşınır, taşınmaz mal satın almak, satmak, kiralamak, kiraya vermek ve taşınmazlar üzerinde ayni hak tesis etmek,
10. Amacın gerçekleştirilmesi için gerek görülmesi durumunda yurt içinde ve yurt dışında vakıf kurmak, federasyon kurmak veya kurulu bir federasyona katılmak, gerekli izin alınarak derneklerin kurabileceği tesisleri kurmak,
11. Uluslararası faaliyette bulunmak, yurt dışındaki dernek veya kuruluşlara üye olmak ve bu kuruluşlarla ortak çalışmalar yapmak veya yardımlaşmak,
12. Amacın gerçekleştirilmesi için gerek görülmesi halinde, 5072 sayılı Dernek ve Vakıfların Kamu Kurum ve Kuruluşları ile İlişkilerine Dair Kanun hükümleri saklı kalmak üzere, kamu kurum ve kuruluşları ile görev alanlarına giren konularda ortak projeler yürütmek,
13. Dernek üyelerinin yiyecek, giyecek gibi zaruri ihtiyaç maddelerini ve diğer mal ve hizmetlerle kısa vadeli kredi ihtiyaçlarını karşılamak amacıyla sandık kurmak,
14. Gerekli görülen yerlerde temsilcilikler açmak,
15. Derneğin amacı ile ilgisi bulunan ve kanunlarla yasaklanmayan alanlarda, diğer derneklerle veya vakıf, sendika ve benzeri sivil toplum kuruluşlarıyla ortak bir amacı gerçekleştirmek için platformlar oluşturmak.

**Derneğin Faaliyet Alanı:** Dernek, sosyal alanda yurt içinde ve yurt dışında faaliyet gösterir.`
    },
    {
      title: 'Üye Olma Hakkı ve Üyelik İşlemleri',
      content: `**Madde 3-** Fiil ehliyetine sahip bulunan ve derneğin amaç ve ilkelerini benimseyerek bu doğrultuda çalışmayı kabul eden ve Mevzuatın öngördüğü koşulları taşıyan her gerçek ve tüzel kişi bu derneğe üye olma hakkına sahiptir. Ancak, yabancı gerçek kişilerin üye olabilmesi için Türkiye'de yerleşme hakkına sahip olması da gerekir. Onursal üyelik için bu koşul aranmaz.

Dernek başkanlığına yazılı olarak yapılacak üyelik başvurusu, dernek yönetim kurulunca en çok otuz gün içinde üyeliğe kabul veya isteğin reddi şeklinde karara bağlanır ve sonuç yazıyla başvuru sahibine bildirilir. Başvurusu kabul edilen üye, bu amaçla tutulacak deftere kaydedilir.

Derneğin asıl üyeleri, derneğin kurucuları ile müracaatları üzerine yönetim kurulunca üyeliğe kabul edilen kişilerdir.

Derneğe maddi ve manevi bakımdan önemli destek sağlamış bulunanlar yönetim kurulu kararı ile onursal üye olarak kabul edilebilir.`
    },
    {
      title: 'Üyelikten Çıkma',
      content: `**Madde 4-** Her üye yazılı olarak bildirmek kaydıyla, dernekten çıkma hakkına sahiptir.

Üyenin istifa dilekçesi yönetim kuruluna ulaştığı anda çıkış işlemleri sonuçlanmış sayılır. Üyelikten ayrılma, üyenin derneğe olan birikmiş borçlarını sona erdirmez.`
    },
    {
      title: 'Üyelikten Çıkarılma',
      content: `**Madde 5-** Dernek üyeliğinden çıkarılmayı gerektiren haller:

1. Dernek tüzüğüne aykırı davranışlarda bulunmak,
2. Verilen görevlerden sürekli kaçınmak,
3. Yazılı ikazlara rağmen üyelik aidatını altı ay içinde ödememek,
4. Dernek organlarınca verilen kararlara uymamak,
5. Üye olma şartlarını kaybetmiş olmak.

Yukarıda sayılan durumlardan birinin tespiti halinde yönetim kurulu kararı ile üyelikten çıkarılır.

Dernekten çıkan veya çıkarılanlar, üye kayıt defterinden silinir ve dernek malvarlığında hak iddia edemez.`
    },
    {
      title: 'Dernek Organları',
      content: `**Madde 6-** Derneğin organları aşağıda gösterilmiştir:

1. Genel Kurul
2. Yönetim Kurulu
3. Denetim Kurulu`
    }
  ];

  return (
    <section className={styles.legislation} id="mevzuat">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine}></span>
            Mevzuat
          </div>
          <h2 className={styles.title}>
            Dernek <span className={styles.highlight}>Tüzüğümüz</span>
          </h2>
          <p className={styles.subtitle}>
            Sivil Havacılık Mekaniği Teknik Elemanları Derneği resmi tüzüğü ve mevzuat belgeleri
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {sections.map((section, index) => (
            <button
              key={index}
              className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className={styles.tabNumber}>{index + 1}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.contentBox}>
          <h3 className={styles.contentTitle}>{sections[activeTab].title}</h3>
          <div 
            className={styles.contentText}
            dangerouslySetInnerHTML={{ 
              __html: sections[activeTab].content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n(\d+\.)/g, '<br/>$1')
            }}
          />
        </div>

        <div className={styles.downloadBox}>
          <h3 className={styles.downloadTitle}>İndirilebilir Mevzuat Belgeleri</h3>
          <div className={styles.downloadGrid}>
            {downloadableDocs.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                className={styles.downloadCard}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <div className={styles.downloadIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 11v6" />
                    <path d="M9 14l3 3 3-3" />
                  </svg>
                </div>
                <div className={styles.downloadMeta}>
                  <p className={styles.downloadName}>{doc.title}</p>
                  <span className={styles.downloadAction}>PDF indir</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <div className={styles.infoContent}>
            <h4 className={styles.infoTitle}>Resmi Kayıt Bilgileri</h4>
            <p className={styles.infoText}>
              <strong>Kütük No:</strong> 06-143-125<br/>
              <strong>Doğrulama Kodu:</strong> 1bb06449-6784-4d83-a0da-e23c0935a5e4<br/>
              <strong>Doğrulama:</strong>{' '}
              <a href="https://derbis.dernekler.gov.tr/default/anonymous/barkodlu-tuzuk-anonim" target="_blank" rel="noopener noreferrer">
                derbis.dernekler.gov.tr
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
