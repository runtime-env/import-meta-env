# Setup

1. Install package:

   ```sh
   $ yarn add -D @import-meta-env/unplugin
   $ yarn add @import-meta-env/cli dotenv
   ```

1. Register `import-meta-env` plugin:

   ```js
   // nuxt.config.js
   import importMetaEnv from "@import-meta-env/unplugin";

   export default {
     // ...

     build: {
       extend(config, { isDev, isClient }) {
         config.plugins.push(importMetaEnv.webpack());
       },
     },
   };
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
   $ yarn nuxt
   ```

1. Build production:

   ```sh
   $ yarn nuxt build
   ```

1. Serve production:

   ```sh
   $ node node_modules/.bin/import-meta-env
   $ yarn nuxt start
   ```
