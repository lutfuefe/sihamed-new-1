# SİHAMED Web Sitesi

Sivil Havacılık Mekaniği Teknik Elemanları Derneği resmi web sitesi.

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Üretim için derle
npm run build

# Üretim sunucusunu başlat
npm start
```

## 🔐 Admin Paneli (Üye Sayısı)

`/admin` sayfasından giriş yapıp sadece aktif üye sayısını güncelleyebilirsiniz.

Gerekli `.env.local` değişkenleri:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=strong-password
ADMIN_SESSION_SECRET=change-this-long-random-secret
```

Üye sayısını kalıcı tutmak için PostgreSQL bağlantısı gerekir:

```bash
DATABASE_URL=postgresql://admin:admin123@localhost:5432/sihamed2
```

## 🐳 Docker ile Çalıştırma (Port 3001)

```bash
# Proje kökünde
docker compose up --build -d
```

Uygulama: `http://localhost:3001`  
PostgreSQL: `localhost:5432`  

İlk açılışta `scripts/init-db.sql` dosyası çalışır ve `site_stats` tablosunu oluşturur.

## 📁 Proje Yapısı

```
sihamed-web/
├── app/
│   ├── globals.css      # Global stiller ve CSS değişkenleri
│   ├── layout.jsx       # Root layout
│   └── page.jsx         # Ana sayfa
├── components/
│   ├── Navbar.jsx       # Navigasyon çubuğu
│   ├── SihamedVideoBanner.jsx  # Video hero banner
│   ├── AboutSection.jsx # Hakkımızda bölümü
│   ├── ServicesSection.jsx  # Hizmetler bölümü
│   ├── StatsSection.jsx # İstatistikler bölümü
│   ├── NewsSection.jsx  # Haberler bölümü
│   ├── MembershipSection.jsx  # Üyelik bölümü
│   ├── ContactSection.jsx  # İletişim bölümü
│   └── Footer.jsx       # Site footer
├── public/
│   ├── images/          # Görseller
│   └── videos/          # Video dosyaları
└── package.json
```

## 🎨 Gerekli Medya Dosyaları

Aşağıdaki dosyaları `public/` klasörüne eklemeniz gerekmektedir:

### Video Dosyaları (`public/videos/`)
- `aviation-hero.mp4` - Ana sayfa hero video (havacılık temalı)
- `aviation-hero.webm` - WebM formatı (opsiyonel fallback)

### Görsel Dosyaları (`public/images/`)
- `sihamed-logo.png` - Dernek logosu (şeffaf arka plan, min. 200x200px)
- `hero-poster.jpg` - Video poster görseli (fallback)
- `about-aviation.jpg` - Hakkımızda bölümü görseli
- `stats-bg.jpg` - İstatistikler arka plan görseli
- `news-1.jpg` - Haber görseli 1
- `news-2.jpg` - Haber görseli 2
- `news-3.jpg` - Haber görseli 3
- `news-4.jpg` - Haber görseli 4

### Ücretsiz Kaynak Önerileri

**Video:**
- [Pexels Videos](https://www.pexels.com/search/videos/aviation/) - Ücretsiz havacılık videoları
- [Pixabay Videos](https://pixabay.com/videos/search/airplane/) - Ücretsiz uçak videoları

**Görseller:**
- [Unsplash](https://unsplash.com/s/photos/aviation) - Yüksek kaliteli havacılık fotoğrafları
- [Pexels](https://www.pexels.com/search/aviation/) - Ücretsiz stok fotoğraflar

## 🎨 Renk Paleti

| Değişken | Hex | Kullanım |
|----------|-----|----------|
| `--color-primary-900` | #001a33 | Koyu metin, footer |
| `--color-primary-500` | #0066cc | Ana mavi renk |
| `--color-accent` | #d4a84b | Altın vurgu rengi |
| `--color-primary-50` | #e6f0fa | Açık arka planlar |

## 🔤 Tipografi

- **Display:** Playfair Display - Başlıklar
- **Body:** Outfit - Gövde metinleri
- **Mono:** JetBrains Mono - Kod/etiketler

## 📱 Breakpoints

- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px

## ⚡ Özellikler

- ✅ Sürekli zoom in/out video animasyonu
- ✅ Smooth scroll navigasyon
- ✅ Intersection Observer ile animasyonlar
- ✅ Sayaç animasyonları (count-up)
- ✅ Responsive tasarım
- ✅ SEO optimizasyonu
- ✅ Türkçe dil desteği
- ✅ İletişim formu
- ✅ Google Maps entegrasyonu

## 📧 İletişim

Sorularınız için: info@sihamed.org.tr

---

© 2026 SİHAMED - Tüm hakları saklıdır.
