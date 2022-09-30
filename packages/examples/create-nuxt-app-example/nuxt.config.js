import runtimeConfig from "@final-env/unplugin";

export default {
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "create-nuxt-app-example",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.plugins.push(
        runtimeConfig.webpack({ example: ".env.example.public" })
      );

      // Make output files easier to read.
      config.optimization.minimize = false;

      // Make output files easier to diff.
      config.output.filename = "[name].js";
      config.output.chunkFilename = "[name].js";
      config.devtool = false;
    },
  },
};
