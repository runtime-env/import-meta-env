# Setup

1. Install package:

   ```sh
   $ yarn add -D @final-env/babel
   $ yarn add -D @final-env/cli
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
