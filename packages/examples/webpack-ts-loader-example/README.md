# Setup

1. Install package:

   ```sh
   $ npm i -D @import-meta-env/typescript
   $ npm i -D @import-meta-env/cli
   $ npm i -D @import-meta-env/unplugin
   ```

1. Run `typescript` plugin

   ```sh
   npx import-meta-env-typescript -x .env.example.public --outDir src
   ```

1. Register `import-meta-env` plugin:

   ```js
   // webpack.config.js

   const importMetaEnv = require("@import-meta-env/unplugin");

   module.exports = {
     // ...
     plugins: [
       // ...
       importMetaEnv.webpack({ example: ".env.example.public" }),
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

1. Start dev server:

   ```sh
   $ npm run dev
   ```

1. Build production:

   ```sh
   $ npm run build
   ```

1. Preview production:

   ```sh
   $ npm run preview
   ```
