import { defineNuxtConfig } from "@nuxt/bridge";
import importMetaEnv from "@import-meta-env/unplugin";

export default defineNuxtConfig({
  bridge: {
    vite: true,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-bridge-example",
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
    script: [
      {
        hid: "import-meta-env",
        innerHTML: `globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"')`,
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      "import-meta-env": ["innerHTML"],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    function () {
      // install vite plugin
      this.nuxt.hook("vite:extend", async (vite) => {
        vite.config.plugins = vite.config.plugins || [];
        vite.config.plugins.push(
          importMetaEnv.vite({ example: ".env.example.public" }),
        );
      });
    },
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
});
