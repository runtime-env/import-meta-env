# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/babel
   $ npm i -D @import-meta-env/unplugin
   $ npm i @import-meta-env/cli
   ```

1. Refer to [document](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html).

1. For CRA project, we need to config both webpack and jest:

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
