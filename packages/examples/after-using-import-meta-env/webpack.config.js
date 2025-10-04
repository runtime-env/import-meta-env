const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    importMetaEnv.webpack({
      env: ".env",
      example: ".env.example",
      transformMode:
        process.env.NODE_ENV === "development" ? "compile-time" : "runtime",
    }),
  ],
};
