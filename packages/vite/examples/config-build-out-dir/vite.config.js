import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
    outDir: "custom-out-dir",
  },
  plugins: [importMetaEnv()],
});
