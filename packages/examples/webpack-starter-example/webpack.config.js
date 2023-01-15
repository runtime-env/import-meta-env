const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    importMetaEnv.webpack({ example: ".env.example.public" }),
  ],
  devtool: "source-map",
};
