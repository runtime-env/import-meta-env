# Setup

1. Install package:

   ```sh
   $ yarn add -D @import-meta-env/cli
   $ yarn add -D @import-meta-env/unplugin
   ```

1. Register `import-meta-env` plugin:

   ```js
   // vue.config.js
   const { defineConfig } = require("@vue/cli-service");
   const importMetaEnv = require("@import-meta-env/unplugin");

   module.exports = defineConfig({
     configureWebpack: {
       plugins: [importMetaEnv.webpack({ example: ".env.example.public" })],
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
