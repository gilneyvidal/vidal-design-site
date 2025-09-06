import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This is needed to prevent a warning with the new setup.
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;
