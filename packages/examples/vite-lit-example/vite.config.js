import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [importMetaEnv()],
  build: {
    lib: {
      entry: "src/my-element.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
