/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false, // 'minify' in Next versions < 12.0
};

export default nextConfig;
