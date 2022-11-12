import { defineConfig } from "vite";
import createSharedViteConfig from "../shared-vite-config.mjs";
import swc from "unplugin-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    swc.vite({
      tsconfigFile: false,
    }),
  ],
  build: {
    sourcemap: true,
  },
  ...createSharedViteConfig(),
});
