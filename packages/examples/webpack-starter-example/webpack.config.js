const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: '<script id="import-meta-env"></script>',
    }),
    importMetaEnv.webpack({ example: ".env.example.public" }),
  ],
  devtool: "source-map",
};
