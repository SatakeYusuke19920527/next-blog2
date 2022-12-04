/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.notion.so','s3.us-west-2.amazonaws.com', 'ishida-mold.com', "www.kyoritsu-pla.co.jp"],
  },
}

module.exports = nextConfig
