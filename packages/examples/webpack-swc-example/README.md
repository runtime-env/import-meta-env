# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/swc
   $ npm i -D @import-meta-env/cli
   ```

1. Refer to [document](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html).

1. In this example, we use html-webpack-plugin to add the special script tag:

   ```js
   new HtmlWebpackPlugin({
      templateContent: `<script>globalThis.import_meta_env=JSON.parse('"import_meta_env_placeholder"')</script>`,
   }),
   ```
