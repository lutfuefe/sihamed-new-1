/** @typedef {{ title: string, date: string, content: string[], photos: string[], photoAltPrefix: string }} AnnouncementItem */

/** Site ve dosya yokken kullanılan örnek içerik (lib/server/announcementsStore ile aynı veri) */
export const DEFAULT_ANNOUNCEMENTS = [
  {
    title: "Meclisimizin 106. Kuruluş Yıl Dönümü ve 23 Nisan Kutlaması",
    date: '23.04.2026',
    content: [
      "Meclisimizin 106. kuruluş yıl dönümünü ve tüm dünya çocuklarının 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı'nı kutluyoruz.",
      'Başta Gazi Mustafa Kemal Atatürk olmak üzere; aziz şehitlerimizi rahmetle, kahraman gazilerimizi minnetle yad ediyoruz.',
    ],
    photos: ['/images/haberler/haber-23-nisan-2026.png'],
    photoAltPrefix: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı duyuru görseli',
  },
  {
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
    photoAltPrefix: 'Olağanüstü Genel Kurul Toplantısı fotoğrafları',
  },
];
