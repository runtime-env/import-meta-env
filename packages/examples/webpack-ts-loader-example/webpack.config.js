const runtimeConfig = require("@final-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  resolve: {
    extensions: [".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    runtimeConfig.webpack({ example: ".env.example.public" }),
  ],
  optimization: {
    // Make output files easier to read.
    minimize: false,
  },
};
