## Getting Started

### Step. 1

Create a `.env.example.public` file to explicitly define which environment variables should be exposed:

**.env.example.public**

```ini
S3_BUCKET=
```

::: danger
You MUST ONLY add public environment variables to your `.env.example.public` file, **these environment variables will be exposed to clients**!

For sensitive (server-side only) environment variables you should use [process.env](#process-env).
:::

### Step. 2

Choose the appropriate plugin based on your project settings:

- If you're already using Babel, you can use the [Babel](#babel).
- or you can use the [Unplugin](#unplugin), which work with Webpack, Rollup, and Vite.

During development, `import.meta.env` will be statically replaced with real environment variables.

During production, `import.meta.env` will be statically replaced with placeholders.

### Step. 3

Before serving your production build, you need to install the [CLI](#cli) and then:

- To preview locally, you just need to run `import-meta-env` to populate the environment variables:

  ```bash
  npx import-meta-env --example .env.example.public
  ```

- During deployment, for example you might want to deploy a production build to any static file server, in which case you would need to copy-paste `.env.examples.public` and run `import-meta-env` to populate environment variables like local preview.

  Since you may deploy your application to devices that don't have Node.js installed (e.g., the Alpine Linux nginx image), first you need to use [pkg](https://github.com/vercel/pkg) to package the `import-meta-env` script into a runnable executable, for example:

  ```bash
  npm i -D pkg
  pkg node_modules/@import-meta-env/cli/bin/import-meta-env.js --target node16-alpine
  ```

  Now you can run `import-meta-env` script like above:

  ```bash
  ./import-meta-env --example .env.example.public
  ```

## Packages

::: warning
If an environment variable is not found, these packages will throw an `ReferenceError` error.
:::

### Babel

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)

Install package:

```bash
npm i -D @import-meta-env/babel
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
  plugins: [ImportMetaEnvPlugin.webpack({ example: ".env.example.public" })],
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
npx import-meta-env --example .env.example.public
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

## Extra Topics

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

## FAQ

### Why use ImportMeta?

Since `process.env` is a Node specific object, we should not use it in browser environment.

For server-side rendering, it is also more precise to use `import.meta.env` and `process.env` respectively.

### Boolean Values

Environment variables are always strings.

```bash
export DEBUG=whatever # true
export DEBUG= # false
```

The easiest way to do this is to treat `""` and `undefined` (also known as falsy values) as `false`, otherwise treat them as `true`:

```js
if (import.meta.env.DEBUG) {
  console.log("DEBUG is anything but the empty string and undefined.");
} else {
  console.log("DEBUG is the empty string.");
}
```

If you need to convert it to `boolean` type:

```diff
- if (  import.meta.env.DEBUG) {
+ if (!!import.meta.env.DEBUG === true) {
  console.log("DEBUG is anything but the empty string and undefined.");
} else {
  console.log("DEBUG is the empty string.");
}
```

### Changes to .env file is not updated

Since we sometimes need to host multiple servers at the same time, you will need to restart your dev server after changing the environment variables.

### Can I have multiple .env files?

Yes. But only one can be loaded at a time, for example:

```bash
npx import-meta-env --env .env.development --example .env.example.public
```

Your config should vary between deploys, and you should not share values between environments.

### Should I commit my .env file?

No. We strongly recommend against committing your `.env` file to version control. It should only contain environment-specific values, such as API base URL.
