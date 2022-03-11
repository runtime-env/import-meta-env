import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import importMetaEnv from "@import-meta-env/unplugin";

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
      plugins: [importMetaEnv.vite({ example: ".env.example" })],
    },
  },
};

export default config;
