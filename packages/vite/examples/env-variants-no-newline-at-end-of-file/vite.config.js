import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [importMetaEnv()],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
