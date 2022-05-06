const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: false,
    }),
    new CompressionPlugin({
      algorithm: "brotliCompress",
      filename: "[path][base].br",
      test: /\.js$/,
      deleteOriginalAssets: true,
    }),
    importMetaEnv.webpack({ example: ".env.example.public" }),
  ],
  optimization: {
    // Make output files easier to read.
    minimize: false,
  },
};
