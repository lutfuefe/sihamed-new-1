-- Mevcut PostgreSQL veritabanına duyuru tablosunu eklemek için (bir kez çalıştırın).
-- Örnek: docker compose exec -T postgres-db psql -U admin -d sihamed2 -f - < scripts/migrate-announcements.sql

CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  announcement_date VARCHAR(32) NOT NULL,
  content_paragraphs JSONB NOT NULL DEFAULT '[]',
  photos JSONB NOT NULL DEFAULT '[]',
  photo_alt_prefix TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

INSERT INTO announcements (
  title,
  announcement_date,
  content_paragraphs,
  photos,
  photo_alt_prefix,
  sort_order
)
SELECT
  v.title,
  v.announcement_date,
  v.content_paragraphs::jsonb,
  v.photos::jsonb,
  v.photo_alt_prefix,
  v.sort_order
FROM (VALUES
  (
    'Meclisimizin 106. Kuruluş Yıl Dönümü ve 23 Nisan Kutlaması',
    '23.04.2026',
    '["Meclisimizin 106. kuruluş yıl dönümünü ve tüm dünya çocuklarının 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı''nı kutluyoruz.", "Başta Gazi Mustafa Kemal Atatürk olmak üzere; aziz şehitlerimizi rahmetle, kahraman gazilerimizi minnetle yad ediyoruz."]',
    '["/images/haberler/haber-23-nisan-2026.png"]',
    '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı duyuru görseli',
    0
  ),
  (
    'Derneğimizin Olağanüstü Genel Kurul Toplantısı Gerçekleştirildi',
    '11.04.2026',
    '["Derneğimizin Olağanüstü Genel Kurul Toplantısı, 11.04.2026 tarihinde saat 10:00''da Muhsin Yazıcıoğlu Caddesi, No:55 Balgat-Çankaya/ANKARA adresinde bulunan Meyra Palace Otel''de gerçekleştirildi.", "Toplantı sonucunda; Başkan yardımcılığı, yönetim kurulu ve denetim kurulu asil ve yedek üyelik görevleri yeni sahiplerine tevdi edildi. Dernek tüzüğü revize edilerek kabul edildi.", "Yeni seçilen dernek yöneticilerimizi tebrik eder, görevlerinde başarılar dileriz. Üstlendikleri sorumlulukların hem kendileri hem de derneğimiz için hayırlı olmasını temenni ederiz.", "Ayrıca; Olağanüstü Genel Kurul Toplantısına katılan üyelerimize teşekkür ederiz."]',
    '["/images/haberler/haber-olaganustu-genel-kurul-1.png", "/images/haberler/haber-olaganustu-genel-kurul-2.png", "/images/haberler/haber-olaganustu-genel-kurul-3.png", "/images/haberler/haber-olaganustu-genel-kurul-4.png"]',
    'Olağanüstü Genel Kurul Toplantısı fotoğrafları',
    1
  )
) AS v(title, announcement_date, content_paragraphs, photos, photo_alt_prefix, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM announcements LIMIT 1);
