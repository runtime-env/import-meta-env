## Motivation

Environment variables should be easy to change between deployments **without** rebuilding the application or changing any code.

During production, this plugin statically replace `import.meta.env` with placeholders, which allow us to statically replace environment variables **after** building the application.

## Getting Started

- **Step. 1.** Every project must have a `.env.example.public` file to determines which environment variables will be used.

  **.env.example.public**

  ```
  S3_BUCKET=
  ```

  ::: danger
  You **MUST** not add sensitive environment variables to your **.env.example.public** file, these environment variables will be exposed to clients!
  :::

  ::: details Details
  A separate `.env.example` file is usually created, which defines all required environment variables, either provided by users for their own development environment, or communicated elsewhere with project collaborators.

  **.env.example**

  ```
  S3_BUCKET=
  SECRET_KEY=
  ```

  :::

- **Step. 2.** Choose the appropriate plugin based on your project settings:

  - If you're already using Babel, you can use the [Babel](#babel).
  - or you can use the [Unplugin](#unplugin), which work with Webpack, Rollup, and Vite.

- **Step. 3.** Finally, you need to use the [CLI](#cli) to replace the placeholders with real environment variables before serving the application.

### Babel

Install package:

```bash
npm i -D @import-meta-env/babel # or use yarn, pnpm
```

Add it to babel config:

```js
module.exports = {
  plugins: [
    ["module:@import-meta-env/babel", { example: ".env.example.public" }],
  ],
};
```

### Unplugin

Install package:

```bash
npm i -D @import-meta-env/unplugin
```

Add it to bundler config:

::: details Webpack

```js
// webpack.config.js
const ImportMetaEnvPlugin = require("@import-meta-env/unplugin");

module.exports = {
  plugins: [ImportMetaEnvPlugin.webpack({ example: ".env.example" })],
};
```

:::

::: details Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

export default defineConfig({
  plugins: [
    ImportMetaEnvPlugin.vite({
      example: ".env.example.public",
    }),
  ],
});
```

:::
::: details Rollup

```js
// rollup.config.js
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

export default {
  plugins: [
    ImportMetaEnvPlugin.rollup({
      example: ".env.example.public",
    }),
  ],
};
```

:::

### CLI

Install package:

```bash
npm i -D @import-meta-env/cli
```

Replace placeholders with environment variables:

```bash
npx import-meta-env --example .env.example.public # or use pnpm exec
```
