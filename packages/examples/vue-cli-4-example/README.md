# Setup

1. Install package:

   ```sh
   $ yarn add -D @import-meta-env/babel
   $ yarn add -D @import-meta-env/cli
   ```

1. Register `babel` plugin:

   ```js
   // babel.config.js

   module.exports = {
     // ...
     plugins: [["module:@import-meta-env/babel", { example: ".env.example" }]],
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
   $ yarn vue-cli-service serve
   ```

1. Build production:

   ```sh
   $ yarn vue-cli-service build
   ```

1. Serve production:

   ```sh
   $ node node_modules/.bin/import-meta-env --example .env.example
   $ yarn serve -s dist
   ```
