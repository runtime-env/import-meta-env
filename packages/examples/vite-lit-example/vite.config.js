import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [importMetaEnv.vite({ example: ".env.example.public" })],
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
