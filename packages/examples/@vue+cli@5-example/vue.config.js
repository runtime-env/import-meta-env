const { defineConfig } = require("@vue/cli-service");
const runtimeConfig = require("@final-env/unplugin");

module.exports = defineConfig({
  transpileDependencies: true,
  // Make output files easier to diff.
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [runtimeConfig.webpack({ example: ".env.example.public" })],
    optimization: {
      // Make output files easier to read.
      minimize: false,
    },
  },
});
