const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.(eot|ttf|woff|woff2|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[name].[hash][ext]",
                },
            }
        );
        return config;
    },
    async redirects() {
        return [
            {
                source: '/api/auth/callback',
                destination: '/auth/callback',
                permanent: true,
            },
        ];
    },
    images: {
        domains: ['assets.leetcode.com', 'res.cloudinary.com'],
      },
};

module.exports = nextConfig;