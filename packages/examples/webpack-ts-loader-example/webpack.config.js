const importMetaEnv = require("@import-meta-env/unplugin");
const importMetaEnvTypescript = require("@import-meta-env/typescript");
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
    importMetaEnv.webpack({ example: ".env.example.public" }),
    importMetaEnvTypescript.webpack({ example: ".env.example.public" }),
  ],
  optimization: {
    // Make output files easier to read.
    minimize: false,
  },
};
