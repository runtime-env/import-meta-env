import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dotenv({ placeholder: "__CUSTOM_PLACEHOLDER__" })],
  build: {
    minify: false,
  },
});
