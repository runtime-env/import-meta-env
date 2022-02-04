import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    assetsDir: "custom-assets-dir",
  },
  plugins: [dotenv({ verify: false })],
});
