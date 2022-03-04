# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/unplugin
   $ pnpm i -D @import-meta-env/cli
   ```

1. Register `import-meta-env` plugin:

   ```js
   // config/webpack.config.js

   module.exports = function (webpackEnv) {
     // ...
     return {
       // ...
       plugins: [
         // ...
         require("@import-meta-env/unplugin").webpack({ example: '.env.example' }),
       ],
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
   $ node scripts/start.js
   ```

1. Build production:

   ```sh
   $ node scripts/build.js
   ```

1. Serve production:

   ```sh
   $ pnpm exec import-meta-env --example .env.example
   $ pnpm exec serve -s build
   ```
