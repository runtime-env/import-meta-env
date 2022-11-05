const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: '<script id="import-meta-env"></script>',
    }),
    importMetaEnv.webpack({ example: ".env.example.public" }),
  ],
};
