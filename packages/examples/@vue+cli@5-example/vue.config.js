const { defineConfig } = require("@vue/cli-service");
const importMetaEnv = require("@import-meta-env/unplugin");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [importMetaEnv.webpack({ example: ".env.example.public" })],
  },
});
