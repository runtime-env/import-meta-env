# Setup

1. Install package:

   ```sh
   $ yarn add @import-meta-env/babel --dev
   $ yarn add @import-meta-env/cli --dev
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

   ```ini
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
