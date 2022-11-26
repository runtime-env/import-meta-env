const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>`,
    }),
    importMetaEnv.webpack({ example: ".env.example.public" }),
  ],
  devtool: "source-map",
};
