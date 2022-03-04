# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/unplugin
   $ pnpm i -D @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```js
   // rollup.config.js
   import importMetaEnv from "@import-meta-env/unplugin";

   const dev = {
     plugins: [
       // ...,
       importMetaEnv.rollup({ example: ".env.example" }),
     ],
   };

   const prod = {
     plugins: [
       // ...,
       importMetaEnv.rollup({ example: ".env.example" }),
     ],
   };

   // ...
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
   $ pnpm exec rollup -c -w
   ```

   ```sh
   $ pnpm exec serve public
   ```

1. Build production:

   ```sh
   $ pnpm exec rollup -c
   ```

1. Serve production:

   ```sh
   $ pnpm exec import-meta-env --example .env.example
   $ pnpm exec serve dist
   ```
