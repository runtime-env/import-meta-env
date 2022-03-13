# Setup

1. Install package:

   ```sh
   $ yarn add -D @import-meta-env/unplugin
   $ yarn add -D @import-meta-env/cli
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
   $ yarn vue-cli-service serve
   ```

1. Build production:

   ```sh
   $ yarn vue-cli-service build
   ```

1. Serve production:

   ```sh
   $ node node_modules/.bin/import-meta-env --example .env.example.public
   $ yarn serve -s dist
   ```
