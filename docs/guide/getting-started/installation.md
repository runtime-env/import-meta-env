# Installation

> If your toolchain is not listed below, please feel free to [file an issue](https://github.com/iendeavor/import-meta-env/issues/new) on GitHub.

1. Choose a transformation plugin to replace `import.meta.env.KEY` with placeholders:

   - If you're already using Babel, you can install [babel plugin](#install-babel-plugin).
   - If you're already using Rollup, Vite, or Webpack, you can install [unplugin](#install-unplugin).

2. You will also need to install the [CLI](#install-cli) to replace placeholders with environment variables after production.

3. Optional plugins:
   - [typescript plugin](#install-typescript-plugin)

## Install Babel Plugin

**Temporarily replace `import.meta.env` with placeholders.**

::: warning
This plugin is not compatible with the Vite, you should use the [Unplugin](#install-unplugin) instead.
:::

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)

Install it with your favorite package manager:

```bash
npm install @import-meta-env/babel --save-dev
yarn add @import-meta-env/babel --dev
pnpm add -D @import-meta-env/babel
```

Register the plugin:

```json
// babel.config.json
{
  "plugins": [["module:@import-meta-env/babel", { "example": ".env.example" }]]
}
```

Related examples: [babel](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/babel-starter-example), [babel-loader](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/webpack-babel-loader-example), [jest](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/jest-example), [rollup-plugin-babel](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/rollup-plugin-babel-example)

## Install Unplugin

**Temporarily replace `import.meta.env` with placeholders.**

::: warning
This plugin is not compatible with the Webpack 4, you should use the [Babel](#install-babel-plugin) instead.
:::

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg)](https://www.npmjs.com/package/@import-meta-env/unplugin)

Install it with your favorite package manager:

```bash
npm install @import-meta-env/unplugin --save-dev
yarn add @import-meta-env/unplugin --dev
pnpm add -D @import-meta-env/unplugin
```

Register the plugin:

Esbuild:

```js
// esbuild.config.js
const { build } = require("esbuild");
const importMetaEnv = require("@import-meta-env/unplugin");

build({
  plugins: [
    importMetaEnv.esbuild({
      example: ".env.example",
      shouldInlineEnv: process.env.NODE_ENV !== "production",
    }),
  ],
});
```

Rollup:

```js
// rollup.config.js
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

export default {
  plugins: [
    ImportMetaEnvPlugin.rollup({
      example: ".env.example",
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
      example: ".env.example",
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
      example: ".env.example",
    }),
  ],
};
```

Related examples: [rollup](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/rollup-starter-example), [vite](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/vite-starter-example), [webpack](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/webpack-starter-example)

## Install CLI

**Replace placeholders with environment variables.**

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/cli.svg)](https://www.npmjs.com/package/@import-meta-env/cli)

Install it with your favorite package manager:

```bash
npm install @import-meta-env/cli --save-dev
yarn add @import-meta-env/cli --dev
pnpm add -D @import-meta-env/cli
```

## Install Typescript Plugin

**CLI tool to automatically generate `.d.ts` from `.env.example`.**

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/typescript.svg)](https://www.npmjs.com/package/@import-meta-env/typescript)

Install it with your favorite package manager:

```bash
npm install @import-meta-env/typescript --save-dev
yarn add @import-meta-env/typescript --dev
pnpm add -D @import-meta-env/typescript
```

Related examples: [vite-vanilla-ts-example](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/vite-vanilla-ts-example), [webpack-ts-loader-example](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/webpack-ts-loader-example)
