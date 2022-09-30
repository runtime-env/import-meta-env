# Setup

1. Install package:

   ```sh
   $ yarn add -D @final-env/cli
   $ yarn add -D @final-env/unplugin
   ```

1. Register `final-env` plugin:

   ```js
   // vue.config.js
   const { defineConfig } = require("@vue/cli-service");
   const runtimeConfig = require("@final-env/unplugin");

   module.exports = defineConfig({
     configureWebpack: {
       plugins: [runtimeConfig.webpack({ example: ".env.example.public" })],
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
   $ export HELLO=final-env
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
