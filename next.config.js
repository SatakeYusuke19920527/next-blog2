/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.notion.so',
      's3.us-west-2.amazonaws.com',
      'ishida-mold.com',
      'www.kyoritsu-pla.co.jp',
      'matsui.net',
      'www.stertec.co.jp',
      'www.kawata.cc',
      'www.pascaleng.co.jp',
      's3.us-west-2.amazonaws.com/secure.notion-static.com',
    ],
  },
};

module.exports = nextConfig;
