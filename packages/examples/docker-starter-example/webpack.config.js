const runtimeConfig = require("@final-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    runtimeConfig.webpack({ example: ".env.example.public" }),
  ],
  optimization: {
    // Make output files easier to read.
    minimize: false,
  },
};
