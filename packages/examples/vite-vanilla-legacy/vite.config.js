import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dotenv({ virtualFile: "dotenv" }), legacy()],
});
