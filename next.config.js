// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["localhost"],
//   },
//   trailingSlash: true, // Helps with routing issues
//   images: {
//     unoptimized: true, // If you're having image optimization issues
//   },
//   experimental: {
//     turbo: {},
//   },
//   webpack: (config) => {
//     config.module = config.module || {};
//     config.module.rules = config.module.rules || [];

//     config.module.rules.push({
//       test: /\.mjs$/,
//       include: /node_modules/,
//       type: "javascript/auto",
//     });

//     return config;
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

module.exports = nextConfig;
