# Setup

> All [vite's specific environment variables](https://vitejs.dev/guide/env-and-mode.html#env-variables) are supported as usual.

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/unplugin
   $ pnpm i -D @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```js
   // vite.config.js

   import { defineConfig } from "vite";
   import importMetaEnv from "@import-meta-env/unplugin";

   // https://vitejs.dev/config/
   export default defineConfig({
     // ...
     plugins: [importMetaEnv.vite({ example: ".env.example" })],
   });
   ```

1. List public environment variables under `.env.example`.

   ```
   # .env.example
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=import-meta-env
   ```

1. Start dev server:

   ```sh
   $ pnpm exec vite
   ```

1. Build production:

   ```sh
   $ pnpm exec vite build
   ```

1. Serve production:

   ```sh
   $ pnpm exec import-meta-env --example .env.example
   $ pnpm exec vite preview
   ```
