const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>`,
    }),
  ],
  devtool: "source-map",
};
