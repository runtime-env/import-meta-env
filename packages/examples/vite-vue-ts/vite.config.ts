import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dotenv()],
  build: {
    minify: false,
  },
});
