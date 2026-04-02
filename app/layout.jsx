import './globals.css';

export const metadata = {
  title: 'SİHAMED - Sivil Havacılık Mekaniği Teknik Elemanları Derneği',
  description: 'Türkiye\'nin sivil havacılık mekaniği alanında faaliyet gösteren teknik elemanlarını bir araya getiren profesyonel meslek kuruluşu.',
  keywords: 'sivil havacılık, uçak bakım, teknik eleman, havacılık mekaniği, SHGM, Part-66, dernek',
  authors: [{ name: 'SİHAMED' }],
  openGraph: {
    title: 'SİHAMED - Sivil Havacılık Mekaniği Teknik Elemanları Derneği',
    description: 'Türkiye\'nin sivil havacılık mekaniği alanında faaliyet gösteren teknik elemanlarını bir araya getiren profesyonel meslek kuruluşu.',
    url: 'https://sihamed.org.tr',
    siteName: 'SİHAMED',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
