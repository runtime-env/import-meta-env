const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>`,
    }),
    importMetaEnv.webpack({ example: ".env.example.public" }),
  ],
  optimization: {
    // Make output files easier to read.
    minimize: false,
  },
};
