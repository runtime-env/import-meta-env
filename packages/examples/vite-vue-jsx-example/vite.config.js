const vueJsxPlugin = require("@vitejs/plugin-vue-jsx");
const vuePlugin = require("@vitejs/plugin-vue");
const runtimeConfig = require("@final-env/unplugin");
const createSharedViteConfig = require("../shared-vite-config.mjs").default;

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    runtimeConfig.vite({ example: ".env.example.public" }),
    vueJsxPlugin({
      include: [/\.[jt]sx$/],
    }),
    vuePlugin(),
  ],
  ...createSharedViteConfig(),
};
