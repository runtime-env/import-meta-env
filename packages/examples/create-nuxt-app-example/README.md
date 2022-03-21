# Setup

1. Install package:

   ```sh
   $ yarn add -D @import-meta-env/unplugin
   $ yarn add @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```js
   // nuxt.config.js
   import importMetaEnv from "@import-meta-env/unplugin";

   export default {
     // ...

     build: {
       extend(config, { isDev, isClient }) {
         config.plugins.push(
           importMetaEnv.webpack({ example: ".env.example.public" })
         );
       },
     },
   };
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
