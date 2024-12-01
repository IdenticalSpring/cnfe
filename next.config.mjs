/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, 
  },
  images: {
    domains: ['assets.leetcode.com', 'res.cloudinary.com'],
  },
};

export default nextConfig;