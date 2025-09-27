/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  trailingSlash: true,
  transpilePackages: ["framer-motion"], // Add this line
};

module.exports = nextConfig;
