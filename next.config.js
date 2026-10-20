const path = require('path');

const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: basePath ? 'export' : undefined,
  basePath: basePath,
  assetPrefix: basePath ? basePath + '/' : '',
  trailingSlash: !!basePath,
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname, './'),
};

module.exports = nextConfig;
