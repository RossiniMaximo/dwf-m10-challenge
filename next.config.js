/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["dl.airtable.com"],
  },
  swcMinify: false,
};

module.exports = nextConfig;
