const vueJsxPlugin = require("@vitejs/plugin-vue-jsx");
const vuePlugin = require("@vitejs/plugin-vue");
const dotenvPlugin = require("@import-meta-env/vite");
const createSharedViteConfig = require("../shared-vite-config.mjs").default;

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    dotenvPlugin(),
    vueJsxPlugin({
      include: [/\.[jt]sx$/],
    }),
    vuePlugin(),
  ],
  ...createSharedViteConfig(),
};
