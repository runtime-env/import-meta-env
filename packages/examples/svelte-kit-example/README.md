# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/unplugin
   $ pnpm i -D @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```js
   // svelte.config.js
   import importMetaEnv from "@import-meta-env/unplugin";

   const config = {
     // ...
     kit: {
       vite: {
         plugins: [importMetaEnv.vite({ example: ".env.example.public" })],
       },
     },
   };

   export default config;
   ```

1. List public environment variables under `.env.example.public`.

   ```
   # .env.example.public
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=import-meta-env
   ```

1. Start dev server:

   ```sh
   $ pnpm exec svelte-kit dev
   ```

1. Build production:

   ```sh
   $ pnpm exec svelte-kit build
   ```

1. Serve production:

   ```sh
   $ pnpm exec import-meta-env --example .env.example.public --output ".svelte-kit/output/**"
   $ pnpm exec svelte-kit preview
   ```
