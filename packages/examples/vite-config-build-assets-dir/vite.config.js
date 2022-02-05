import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      output: {
        chunkFileNames: "custom-assets-dir/[name].js",
        entryFileNames: "custom-assets-dir/[name].js",
        assetFileNames: "custom-assets-dir/[name][extname]",
      },
    },
    assetsDir: "custom-assets-dir",
  },
  plugins: [dotenv({ verify: false })],
});
