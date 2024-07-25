# Compile-time Transform

Please read the [guide](/guide/getting-started/introduction.html#guide) for how to use these plugins.

### Plugin Options

All compile-time transform plugins use the same options:

```js
interface PluginOptions {
  /**
   * The .env file path to load
   *
   * You can out-out this by passing an empty string
   *
   * @default ".env"
   */
  env?: string;

  /**
   * The public .env example file path to load
   */
  example: string;

  /**
   * Compile-time: statically replace `import.meta.env.KEY` with `"value"`
   * Runtime: statically replace `import.meta.env` with a global accessor
   *
   * @default
   * Generally speaking, `process.env.NODE_ENV === "production" ? "runtime" : "compile-time"`
   */
  transformMode?: "compile-time" | "runtime";
}
```

## Babel Plugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg?color=blue)](https://www.npmjs.com/package/@import-meta-env/babel)

### Installation

```bash
$ npm i -D @import-meta-env/babel
```

### Setup

```json
{
  "plugins": [
    [
      "module:@import-meta-env/babel",
      pluginOptions
    ]
  ]
}
```

Related examples: [babel](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/babel-starter-example), [babel-loader](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/webpack-babel-loader-example), [jest](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/jest-example)

## SWC Plugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/swc.svg?color=blue)](https://www.npmjs.com/package/@import-meta-env/swc)

### Installation

```bash
$ npm i -D @import-meta-env/swc
```

### Setup

.swcrc:

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "experimental": {
      "plugins": [
        [
          "@import-meta-env/swc",
          pluginOptions
        ]
      ]
    }
  }
}
```

Related examples: [swc](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/swc-example)

## Unplugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg?color=blue)](https://www.npmjs.com/package/@import-meta-env/unplugin)

### Installation

```bash
$ npm i -D @import-meta-env/unplugin
```

### Setup

#### ESbuild

```js
// esbuild.config.js
const { build } = require("esbuild");
const importMetaEnv = require("@import-meta-env/unplugin");

build({
  plugins: [importMetaEnv.esbuild(pluginOptions)],
});
```

Related examples: [esbuild](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/esbuild-starter-example)

#### Farm

```js
// farm.config.ts
import { defineConfig } from "@farmfe/core";
import importMetaEnv from "@import-meta-env/unplugin";

export default defineConfig({
  plugins: [importMetaEnv.farm(pluginOptions)],
});
```

Related examples: [farm](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/farm-react-example)

#### Rollup

```js
// rollup.config.js
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

export default {
  plugins: [ImportMetaEnvPlugin.rollup(pluginOptions)],
};
```

Related examples: [rollup](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/rollup-starter-example)

#### Vite

```ts
// vite.config.ts
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

export default {
  plugins: [ImportMetaEnvPlugin.vite(pluginOptions)],
};
```

Related examples: [vite](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/vite-starter-example)

#### Webpack

```js
// webpack.config.js
const ImportMetaEnvPlugin = require("@import-meta-env/unplugin");

module.exports = {
  plugins: [ImportMetaEnvPlugin.webpack(pluginOptions)],
};
```

Related examples: [webpack](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/webpack-starter-example)

#### Rspack

```js
// rspack.config.js
const ImportMetaEnvPlugin = require("@import-meta-env/unplugin");

module.exports = {
  plugins: [ImportMetaEnvPlugin.rspack(pluginOptions)],
};
```

Related examples: [rspack](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/rspack-starter-example)

## Compatibility

Currently we support [Babel plugin](#babel-plugin), [SWC plugin](#swc-plugin) and [Unplugin](#unplugin) (an unified plugin system for Vite, Rollup, Webpack, and more) transforms. If your toolchain is not supported, please feel free to [file an issue](https://github.com/import-meta-env/import-meta-env/issues/new) on GitHub.

You can choose one of these or combine multiple plugins, for example if you are using Webpack 5 and Jest:

1. You can use [babel-loader](https://www.npmjs.com/package/babel-loader) + [Babel plugin](#babel-plugin) for development, testing and production.
2. Alternatively, you can use [Unplugin](#unplugin) for development and production, and [babel-jest](https://www.npmjs.com/package/babel-jest) + [Babel plugin](#babel-plugin) for testing.
3. Alternatively, you can use the [swc-loader](https://www.npmjs.com/package/swc-loader) and [SWC plugin](#swc-plugin) for development and production, and the [babel-jest](https://www.npmjs.com/package/babel-jest) and [Babel plugin](#babel-plugin) for testing.

::: warning
There are some exceptions:

1. Vite is only compatible with [Unplugin](#unplugin).
2. Webpack 4 is _**not**_ compatible with [Unplugin](#unplugin).
   :::
