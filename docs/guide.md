## Getting Started

[![License - MIT](https://img.shields.io/github/license/iendeavor/import-meta-env?color=blue&label=License)](https://github.com/iendeavor/import-meta-env/blob/main/LICENSE)
<span>&nbsp;</span>
[![SemVer version](https://img.shields.io/badge/Sem%20Ver-2.0.0-black.svg)](https://semver.org/)
<span>&nbsp;</span>
[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)

[![@import-meta-env/babel version](https://img.shields.io/npm/v/@import-meta-env/babel.svg?label=%40import-meta-env/babel)](https://www.npmjs.com/package/@import-meta-env/babel)
<span>&nbsp;</span>
[![@import-meta-env/cli version](https://img.shields.io/npm/v/@import-meta-env/cli.svg?label=%40import-meta-env/cli)](https://www.npmjs.com/package/@import-meta-env/cli)
<span>&nbsp;</span>
[![@import-meta-env/unplugin version](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg?label=%40import-meta-env/unplugin)](https://www.npmjs.com/package/@import-meta-env/unplugin)

### The `.env.example.public` File

First, for security reasons, we need to explicitly define which environment variables should be exposed to the browser.

You can do this by creating a `.env.example.public` file in your project:

```ini
S3_BUCKET=
```

::: danger
If you're building a server-rendered website, you may want to access sensitive (server-side only) environment variables, in which case you should use [process.env](#process-env):

```js
const S3_BUCKET = import.meta.env.S3_BUCKET;
const SECRET_KEY = process.env.SECRET_KEY;
```

:::

### Installation

1. Choose a transformation plugin:

   - If you're already using Babel, you can install [babel plugin](#install-babel-plugin).
   - If you're already using Rollup, Vite, or Webpack, you can install [unplugin](#install-unplugin).

2. You will also need to install the [CLI](#install-cli) to populate your environment variables after production.

#### Install Babel Plugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)

::: warning
This Babel plugin is not compatible with the Vite, you should use the [Unplugin](#install-unplugin) instead.
:::

Install it with your favorite package manager:

```bash
npm install --save-dev @import-meta-env/babel
```

Specify the plugin:

```json
// babel.config.json
{
  "plugins": [
    ["module:@import-meta-env/babel", { "example": ".env.example.public" }]
  ]
}
```

Related examples: [babel](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/babel-starter-example), [babel-loader](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/webpack-babel-loader-example), [jest](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/jest-example), [rollup-plugin-babel](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/rollup-plugin-babel-example)

#### Install Unplugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg)](https://www.npmjs.com/package/@import-meta-env/unplugin)

Install it with your favorite package manager:

```bash
npm install --save-dev @import-meta-env/unplugin
```

Rollup:

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

Vite:

```ts
// vite.config.ts
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

export default {
  plugins: [
    ImportMetaEnvPlugin.vite({
      example: ".env.example.public",
    }),
  ],
};
```

Webpack:

```js
// webpack.config.js
module.exports = {
  plugins: [
    require("@import-meta-env/unplugin").webpack({
      example: ".env.example.public",
    }),
  ],
};
```

Related examples: [rollup](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/rollup-starter-example), [vite](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/vite-starter-example), [webpack](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/webpack-starter-example)

#### Install CLI

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/cli.svg)](https://www.npmjs.com/package/@import-meta-env/cli)

Install it with your favorite package manager:

```bash
npm install --save-dev @import-meta-env/cli
```

### Using Environment Variables

Suppose you have the following environment variables:

```bash
export S3_BUCKET=YOURS3BUCKET
```

You can access the environment variables in code like:

```js
console.log(import.meta.env.S3_BUCKET);
```

In development, `import.meta.env` will be statically replaced with the environment variables.

```js
console.log("YOURS3BUCKET");
```

During production, `import.meta.env` will be statically replaced with a placeholder string.

```js
console.log('__import_meta_env_placeholder__'.S3_BUCKET));
```

Therefore, before serving your production build, you need to run the CLI to populate the environment variables:

```bash
./node_modules/.bin/import-meta-env --example .env.example.public
```

and it will output:

```js
console.log({"S3_BUCKET":"YOURS3BUCKET"}.S3_BUCKET));
```

Since you may deploy your application to devices that don't have Node.js installed (for example, an Alpine Linux nginx image), in this case you'll need to use [pkg](https://github.com/vercel/pkg) to package the `import-meta-env` script into a runnable executable:

```bash
npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js --target node16-alpine --output import-meta-env-alpine
```

and use it as usual to populate environment variables:

```bash
./import-meta-env-alpine --example .env.example.public
```

Related examples: [docker](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/docker-starter-example)

::: warning
It will also replace `import.meta.env` appearing in JavaScript strings. Therefore, you may see errors like `Uncaught SyntaxError`, e.g. `"import.meta.env"` will be transformed into `"({"S3_BUCKET":"YOURS3BUCKET"})"`. To avoid this, you can break the string up with a unicode zero-width space, e.g. `import.meta\u200b.env`.
:::

::: info
By default, **import-meta-env** will automatically determine the mode (development or production) and replace `import.meta.env` with environment variables or placeholders, respectively.

You can override this by setting the `shouldInlineEnv` option for the [babel plugin](#install-babel-plugin) and the [unplugin](#install-unplugin).

For more information, see [API](api).
:::

## Extra Topics

### .env file

In local development, for convenience, you can also create a `.env` (default value) file in the project instead of manipulating environment variables in the system:

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

## FAQ

### Why use ImportMeta?

Since `process.env` is a Node specific object, we should not use it in browser environment.

For server-side rendering, it is also more precise to use `import.meta.env` (heavily inspired by Vite) and `process.env` respectively.

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

In dev server, since we sometimes need to host multiple servers at the same time, you will need to restart your dev server after changing the environment variables.

In production, you can run `import-meta-env` multiple times (unless `disposable` flag is set to `true`) ) to re-populate different environment variables without rebuild your application.

### Can I have multiple .env files?

Yes. You can choose which one to be used by passing the `env` option to `import-meta-env`:

```bash
./node_modules/.bin/import-meta-env --env .env.development --example .env.example.public
```

Your config should vary between deployments, and you shouldn't share values between environments, so it only loads one .env file at a time.

### Should I commit my .env file?

No. We strongly recommend against committing your `.env` file to version control.
