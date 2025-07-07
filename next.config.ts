import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 让 Next.js 导出纯静态文件
  output: 'export',
  // 如果你的站点需部署到子目录，可再加 basePath
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
