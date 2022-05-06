const importMetaEnv = require("@import-meta-env/unplugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      templateContent: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body>
    <script src="main.js${
      process.env.NODE_ENV === "development" ? "" : ".br"
    }"></script>
  </body>
</html>
    `.trim(),
    }),
    ...(process.env.NODE_ENV === "development"
      ? []
      : [
          new CompressionPlugin({
            algorithm: "brotliCompress",
            filename: "[path][base].br",
            test: /\.js$/,
            deleteOriginalAssets: true,
          }),
        ]),
    importMetaEnv.webpack({ example: ".env.example.public" }),
  ],
  optimization: {
    // Make output files easier to read.
    minimize: false,
  },
};
