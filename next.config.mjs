/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Kích hoạt styled-components SWC transform
  },
  images: {
    domains: ['assets.leetcode.com', 'res.cloudinary.com'],
  },
};

export default nextConfig;