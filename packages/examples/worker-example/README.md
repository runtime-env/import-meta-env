# Setup

1. Install following packages:

   ```sh
   $ npm i -D @import-meta-env/unplugin
   $ npm i -D @import-meta-env/cli
   ```

1. Refer to [document](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html).

1. In this example, we put the [special expression](https://iendeavor.github.io/import-meta-env/guide/getting-started/introduction.html#special-expression) at the top of the worker.js content since we need to access runtime environment variables from workers:

   ```diff
   + globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"');

   self.postMessage(`Hello: ${import.meta.env.HELLO}`);
   ```
