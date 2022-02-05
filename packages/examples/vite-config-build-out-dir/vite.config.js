import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

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
  plugins: [dotenv({ verify: false })],
});
