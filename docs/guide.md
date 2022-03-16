## Motivation

Environment variables should be easy to change between deployments **without** rebuilding the application or changing any code.

During production, this plugin statically replace `import.meta.env` with placeholders, which allow us to populate environment variables **after building the application**.

## Getting Started

- **Step. 1.** Create a `.env.example.public` file to indicate which environment variables should be loaded:

  **.env.example.public**

  ```ini
  S3_BUCKET=
  ```

  ::: danger
  You MUST NOT add sensitive environment variables to your `.env.example.public` file, **these environment variables will be exposed to clients**!

  For sensitive (server-side only) environment variables you should use [process.env](#process-env).
  :::

- **Step. 2.** Choose the appropriate plugin based on your project settings:

  - If you're already using Babel, you can use the [Babel](#babel).
  - or you can use the [Unplugin](#unplugin), which work with Webpack, Rollup, and Vite.

- **Step. 3.** During production, `import.meta.env` will be statically replaced with placeholders and you need to populate environment variables using the [CLI](#cli) before serving your application.

::: warning
If an environment variable is not found, import-meta-env will throw an `ReferenceError` error.
:::

::: warning
Environment variables are always strings.
:::

::: info
You need to restart your dev server after changing the environment variables.
:::

### Babel

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)

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

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg)](https://www.npmjs.com/package/@import-meta-env/unplugin)

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

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/cli.svg)](https://www.npmjs.com/package/@import-meta-env/cli)

Install package:

```bash
npm i -D @import-meta-env/cli
```

Populate environment variables:

```bash
npx import-meta-env --example .env.example.public # or use pnpm exec
```

You can use [pkg](https://github.com/vercel/pkg) to package `@import-meta-env/cli` into an executable that can be run even on devices without Node.js installed, for example:

```bash
npm i -D pkg
npx pkg node_modules/@import-meta-env/cli/bin/import-meta-env.js --target node16-alpine
```

## Advanced

### .env file

In local development, for convenience, you can also create a `.env` file in the project instead of manipulating environment variables in the system:

```ini
# Import-meta-env will only load `S3_BUCKET`'s value
# because we only defined it in the `.env.example.public` file.
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

### .env.example file

A separate `.env.example` file is usually created, which defines all required environment variables, either provided by users for their own development environment, or communicated elsewhere with project collaborators.

**.env.example**

```ini
S3_BUCKET=
SECRET_KEY=
```

### `process.env`

For server-side only environment variables (credentials) you should use [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) or similar:

```js
new webpack.EnvironmentPlugin(["SECRET_KEY"]);
```

```js
console.log(process.env.SECRET_KEY); // "YOURSECRETKEYGOESHERE"
```

If you need to populate server-side environment variables (i.e., `process.env`) at run-time:

1. For [NEXT.js](https://nextjs.org/), you can use [serverRuntimeConfig](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration).
2. For [NuxtJS](https://nuxtjs.org/), you can use [privateRuntimeConfig](https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config).

### IntelliSense for TypeScript

You may want to get TypeScript IntelliSense for user-defined environment variables.

To achieve, you can create an `env.d.ts`, then define `ImportMeta` like this:

```ts
// env.d.ts
interface ImportMeta {
  readonly env: {
    readonly S3_BUCKET: string;
  };
}
```

## Framework-specific Notes

### Vite

<br/>

#### The [Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html)

During production, the following variables will be statically replaced just like Vite:

- [Built-in](https://vitejs.dev/guide/env-and-mode.html#env-variables) variables: `MODE`, `BASE_URL`, `PROD`, and `DEV`.

- [Server-side rendering](https://vitejs.dev/guide/ssr.html#conditional-logic) variable: `SSR`.

- [@vitejs/plugin-legacy](https://vitejs.dev/plugins/#vitejs-plugin-legacy) variable: `LEGACY`.

- [envPrefix](https://vitejs.dev/config/index.html#envprefix) variables. You can disable it by setting `envPrefix` to `[]` (**Recommended**).

#### IntelliSense for TypeScript

For Vite projects, you can augment [ImportMetaEnv](https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript) like this:

```ts
// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly S3_BUCKET: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```
