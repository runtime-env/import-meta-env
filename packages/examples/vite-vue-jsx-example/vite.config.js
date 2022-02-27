const vueJsxPlugin = require("@vitejs/plugin-vue-jsx");
const vuePlugin = require("@vitejs/plugin-vue");
const importMetaEnv = require("@import-meta-env/unplugin");
const createSharedViteConfig = require("../shared-vite-config.mjs").default;

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    importMetaEnv.vite(),
    vueJsxPlugin({
      include: [/\.[jt]sx$/],
    }),
    vuePlugin(),
  ],
  ...createSharedViteConfig(),
};
