const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isDev ? undefined : 'export',
  basePath: isDev ? '' : '/ponza',
  assetPrefix: isDev ? '' : '/ponza/',
  trailingSlash: isDev ? false : true,
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname, './'),
};

module.exports = nextConfig;
