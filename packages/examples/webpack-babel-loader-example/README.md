# Setup

1. Install package:

   ```sh
   $ pnpm i -D @final-env/babel
   $ pnpm i -D @final-env/cli
   ```

1. Register `final-env` plugin:

   ```js
   // webpack.config.js

   module.exports = {
     // ...
     module: {
       rules: [
         {
           test: /\.m?js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: "babel-loader",
             options: {
               plugins: [
                 [
                   "module:@final-env/babel",
                   { example: ".env.example.public" },
                 ],
               ],
             },
           },
         },
       ],
     },
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

1. Build development:

   ```sh
   $ pnpm run dev
   ```

1. Build production:

   ```sh
   $ pnpm run build
   ```

1. Populate environment variables (see more about this script [here](../../cli/README.md#api)):

   ```sh
   $ pnpm run populate
   ```
