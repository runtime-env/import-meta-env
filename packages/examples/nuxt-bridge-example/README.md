# Setup

1. Install package:

   ```sh
   $ yarn add -D @import-meta-env/unplugin
   $ yarn add @import-meta-env/cli dotenv
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
           importMetaEnv.webpack({ example: ".env.example" })
         );
       },
     },
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
   $ yarn nuxi dev
   ```

1. Build production:

   ```sh
   $ yarn nuxi build
   ```

1. Serve production:

   ```sh
   $ node node_modules/.bin/import-meta-env --example .env.example
   $ yarn nuxi preview
   ```
