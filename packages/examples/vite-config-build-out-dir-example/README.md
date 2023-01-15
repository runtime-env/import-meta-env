# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/unplugin
   $ npm i -D @import-meta-env/cli
   ```

1. Refer to [document](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html).

1. For this example, we need to provide the output directory explicitly:

   ```sh
   $ npx import-meta-env -x .env.example.public -p "custom-out-dir/**/*"
   ```
