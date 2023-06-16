/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'via.placeholder.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: { esmExternals: 'loose' },
};

module.exports = nextConfig;
