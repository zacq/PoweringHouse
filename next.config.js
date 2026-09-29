/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pages removed with the Neon backend (tag `with-neon-backend`); keep indexed URLs landing somewhere real.
  async redirects() {
    return [
      { source: "/blog/:slug", destination: "/blog", permanent: true },
      { source: "/ways-we-help/:slug", destination: "/ways-we-help", permanent: true },
      { source: "/admin/:path*", destination: "/", permanent: true },
      { source: "/admin", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
