import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /**
   * Instructs Next.js to produce a static export of the application.
   * This is crucial for hosts like Netlify.
   */
  output: 'export',

  /**
   * Disables image optimization, which is required for `output: 'export'`.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
