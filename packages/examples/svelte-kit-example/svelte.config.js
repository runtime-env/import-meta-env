import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import runtimeConfig from "@final-env/unplugin";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ["PATCH", "DELETE"],
    },

    vite: {
      plugins: [runtimeConfig.vite({ example: ".env.example.public" })],
    },
  },
};

export default config;
