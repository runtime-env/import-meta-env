# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/typescript
   $ pnpm i -D @import-meta-env/babel
   ```

1. Run `typescript` plugin

   ```sh
   pnpm exec import-meta-env-typescript --example .env.example.public --outDir src
   ```

1. Register `babel` plugin:

   ```js
   // babel.config.js

   module.exports = {
     // ...
     plugins: [
       ["module:@import-meta-env/babel", { example: ".env.example.public" }],
     ],
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

1. Run tests:

   ```sh
   $ pnpm run test
   ```
