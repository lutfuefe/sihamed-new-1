/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
    unoptimized: false,
  },
  // Nginx /images/ isteğini Node'a vermeyebilir; yüklenen görselleri Next üzerinden servis et
  async rewrites() {
    return [
      {
        source: '/images/haberler/yuklenen/:path*',
        destination: '/api/static/yuklenen/:path*',
      },
    ];
  },
  // Video dosyaları için
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
