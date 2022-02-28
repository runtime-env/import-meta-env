const { defineConfig } = require("@vue/cli-service");
const importMetaEnv = require("@import-meta-env/unplugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [importMetaEnv.webpack()],
    optimization: {
      // Make output files easier to read.
      minimize: false,
    },
  },
});
