import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dotenv({ verify: false })],
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
