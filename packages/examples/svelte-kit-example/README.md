# Setup

1. Install package:

   ```sh
   $ pnpm i -D @final-env/cli
   $ pnpm i -D @final-env/unplugin
   ```

1. Register `final-env` plugin:

   ```js
   // svelte.config.js
   import runtimeConfig from "@final-env/unplugin";

   const config = {
     // ...
     kit: {
       vite: {
         plugins: [runtimeConfig.vite({ example: ".env.example.public" })],
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
   $ export HELLO=final-env
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
