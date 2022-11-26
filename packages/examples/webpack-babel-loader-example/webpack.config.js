const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "module:@import-meta-env/babel",
                { example: ".env.example.public" },
              ],
            ],
          },
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
