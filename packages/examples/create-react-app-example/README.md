# Setup

1. Install package:

   ```sh
   $ pnpm i -D @import-meta-env/babel
   $ pnpm i -D @import-meta-env/cli
   $ pnpm i -D @import-meta-env/unplugin
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
         require("@import-meta-env/unplugin").webpack({ example: '.env.example.public' }),
       ],
     },
   };
   ```

   ```js
   // config/jest/babelTransform.js

   module.exports = babelJest.createTransformer({
     // ...
     plugins: [
       // ...
       ["module:@import-meta-env/babel", { example: ".env.example.public" }],
     ],
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

1. Run tests:

   ```sh
   $ pnpm run test
   ```

1. Start dev server:

   ```sh
   $ pnpm run dev
   ```

1. Build production:

   ```sh
   $ pnpm run build
   ```

1. Preview production:

   ```sh
   $ pnpm run preview
   ```
