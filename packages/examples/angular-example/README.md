# Setup

1. Install package:

   ```sh
   $ npm install @angular-builders/custom-webpack --save-dev
   $ npm install @import-meta-env/{cli,typescript,unplugin} --save-dev
   ```

1. Run `typescript` plugin

   ```sh
   npx import-meta-env-typescript --example .env.example.public --outDir src
   ```

1. Change builders:

   ```json5
   // angular.json
   {
     "projects": {
       "angular-example": {
         "architect": {
           "build": {
             "builder": "@angular-builders/custom-webpack:browser",
             "options": {
               "customWebpackConfig": {
                 "path": "./extra-webpack.config.js",
                 "mergeRules": {
                   "plugins": "merge"
                 }
               },
             },
           },
           "serve": {
             "builder": "@angular-builders/custom-webpack:dev-server",
           },
           "test": {
             "builder": "@angular-builders/custom-webpack:karma",
             "options": {
               "customWebpackConfig": {
                 "path": "./extra-webpack.config.js",
                 "mergeRules": {
                   "plugins": "merge"
                 }
               },
             }
           }
         }
       }
     }
   }
   ```

1. Register `import-meta-env` plugin:

   ```js
   // extra-webpack.config.js

   module.exports = {
     plugins: [
       require('@import-meta-env/unplugin').webpack({
         example: '.env.example.public'
       })
     ]
   }
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
   $ npm run start
   ```

1. Build production:

   ```sh
   $ npm run build
   ```
