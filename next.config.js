/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 支持大文件上传（需求：≤100MB）
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

module.exports = nextConfig;
