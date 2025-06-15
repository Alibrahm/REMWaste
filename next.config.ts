// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yozbrydxdlcxghkphhtq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/skips/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Allows any path on placehold.co
      },
      {
        protocol: 'https',
        hostname: 'www.mickgeorge.co.uk', // Add this if you use their images (e.g., in SkipPlus section)
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;