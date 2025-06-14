/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  experimental: {
    ppr: true, // Enable Partial Prerendering
  },
};

module.exports = nextConfig;
