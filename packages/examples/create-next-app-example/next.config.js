/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.devtool = "eval-source-map";
    config.plugins.push(
      require("@import-meta-env/unplugin").webpack({
        example: ".env.example.public",
      })
    );

    return config;
  },
};

module.exports = nextConfig;
