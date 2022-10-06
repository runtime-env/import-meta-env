# Setup

1. Install package:

   ```sh
   $ npm add @import-meta-env/cli
   $ npm add -D @import-meta-env/unplugin
   ```

1. Register `import-meta-env` plugin:

   ```js
   // nuxt.config.js
   import { defineNuxtConfig } from "@nuxt/bridge";
   import importMetaEnv from "@import-meta-env/unplugin";

   export default defineNuxtConfig({
     build: {
       extend(config) {
         config.plugins.push(
           importMetaEnv.webpack({ example: ".env.example.public" })
         );
       },
     },
   });
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
   $ yarn run dev
   ```

1. Build production:

   ```sh
   $ yarn run build
   ```

1. Preview production:

   ```sh
   $ yarn run preview
   ```
