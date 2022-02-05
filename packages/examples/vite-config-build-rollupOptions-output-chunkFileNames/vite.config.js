import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dotenv({ verify: false })],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/custom-[name].js",
      },
    },
  },
});
