import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@/assets': './app/assets',
    },
  },
};

export default nextConfig;
