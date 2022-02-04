const vueJsxPlugin = require("@vitejs/plugin-vue-jsx");
const vuePlugin = require("@vitejs/plugin-vue");
const dotenvPlugin = require("vite-plugin-dotenv").default;

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
  build: {
    minify: false,
  },
};
