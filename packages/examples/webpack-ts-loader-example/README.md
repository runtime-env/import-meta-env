# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/unplugin
   $ npm i -D @import-meta-env/cli
   ```

1. Refer to [document](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html).

1. In this example, we use html-webpack-plugin to add the special script tag:

   ```js
   new HtmlWebpackPlugin({
      templateContent: '<script id="import-meta-env"></script>',
   }),
   ```
