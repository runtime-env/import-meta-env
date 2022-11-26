const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const importMetaEnv = require("@import-meta-env/unplugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    importMetaEnv.webpack({ example: ".env.example" }),
  ],
};
