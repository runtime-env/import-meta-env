const { defineConfig } = require("@vue/cli-service");
const importMetaEnv = require("@import-meta-env/unplugin");

module.exports = defineConfig({
  transpileDependencies: true,
  // Make output files easier to diff.
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [importMetaEnv.webpack({ example: ".env.example.public" })],
    optimization: {
      // Make output files easier to read.
      minimize: false,
    },
  },
});
