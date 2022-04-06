# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/cli
   $ pnpm i -D @import-meta-env/unplugin
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

   ```ini
   # .env.example.public
   HELLO=
   ```

1. Set environment variables:

   ```sh
   $ export HELLO=import-meta-env
   ```

1. Start dev server:

   ```sh
   $ pnpm run dev
   ```

1. Build production:

   ```sh
   $ pnpm run build
   ```

1. Preview production:

   ```sh
   $ pnpm run preview
   ```
