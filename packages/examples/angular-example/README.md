# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/unplugin
   $ npm i -D @import-meta-env/cli
   ```

1. Refer to [document](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html).

1. In this example, we configure webpack with [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack):

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
