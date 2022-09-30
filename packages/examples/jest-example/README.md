# Setup

1. Install package:

   ```sh
   $ pnpm i -D @final-env/babel
   ```

1. Register `babel` plugin:

   ```js
   // babel.config.js

   module.exports = {
     // ...
     plugins: [["module:@final-env/babel", { example: ".env.example.public" }]],
   };
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

1. Run tests:

   ```sh
   $ pnpm run test
   ```
