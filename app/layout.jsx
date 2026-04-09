import './globals.css';

export const metadata = {
  metadataBase: new URL('https://sihamed.org.tr'),
  title: 'SİHAMED - Sivil Havacılık Mekaniği Teknik Elemanları Derneği',
  description: 'Türkiye\'nin sivil havacılık mekaniği alanında faaliyet gösteren teknik elemanlarını bir araya getiren profesyonel meslek kuruluşu.',
  keywords: 'sivil havacılık, uçak bakım, teknik eleman, havacılık mekaniği, SHGM, Part-66, dernek',
  authors: [{ name: 'SİHAMED' }],
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'SİHAMED - Sivil Havacılık Mekaniği Teknik Elemanları Derneği',
    description: 'Türkiye\'nin sivil havacılık mekaniği alanında faaliyet gösteren teknik elemanlarını bir araya getiren profesyonel meslek kuruluşu.',
    url: 'https://sihamed.org.tr',
    siteName: 'SİHAMED',
    locale: 'tr_TR',
    type: 'website',
  },
};

const siteUrl = 'https://sihamed.org.tr';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sivil Havacılık Mekaniği Teknik Elemanları Derneği',
  alternateName: 'SİHAMED',
  url: siteUrl,
  logo: `${siteUrl}/images/sihamed-logo.png`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
