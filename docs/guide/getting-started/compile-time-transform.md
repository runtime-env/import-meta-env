# Compile-time Transform

Temporarily replace `import.meta.env` with _placeholders_.

::: info
By default, **import-meta-env** will automatically determine the mode (development, testing, or production) and replace `import.meta.env` with environment variables or placeholders, respectively.

You can override this by setting the `shouldInlineEnv` option.

For more information, see [API](/api).
:::

## Compatibility

Currently we support [Babel plugin](#babel-plugin), [SWC plugin](#swc-plugin) and [Unplugin](#unplugin) transforms. If your toolchain is not supported, please feel free to [file an issue](https://github.com/iendeavor/import-meta-env/issues/new) on GitHub.

You can choose one of these or combine multiple plugins, for example if you are using Webpack 5 and Jest:

1. You can use [babel-loader](https://www.npmjs.com/package/babel-loader) + [Babel plugin](#babel-plugin) for development, testing and production.
2. Alternatively, you can use [Unplugin](#unplugin) for development and production, and [babel-jest](https://www.npmjs.com/package/babel-jest) + [Babel plugin](#babel-plugin) for testing.
3. Alternatively, you can use the [swc-loader](https://www.npmjs.com/package/swc-loader) + [SWC plugin](#swc-plugin) for development, production, and the [babel-jest](https://www.npmjs.com/package/babel-jest) + [Babel plugin](#babel-plugin) for testing.

But there are some exceptions:

1. Vite is only compatible with [Unplugin](#unplugin).
2. Webpack 4 is not compatible with [Unplugin](#unplugin).

## Babel Plugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)

### Installation

```bash
$ npm i -D @import-meta-env/babel
```

### Usage

```json
{
  "plugins": [["module:@import-meta-env/babel", { "example": ".env.example" }]]
}
```

Related examples: [babel](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/babel-starter-example), [babel-loader](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/webpack-babel-loader-example), [jest](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/jest-example)

## SWC Plugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/swc.svg)](https://www.npmjs.com/package/@import-meta-env/swc)

### Installation

```bash
$ npm i -D @import-meta-env/swc
```

### Usage

.swcrc:

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "experimental": {
      "plugins": [
        [
          "@import-meta-env/swc",
          {
            "env_example_path": ".env.example"
          }
        ]
      ]
    }
  }
}
```

Related examples: [swc](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/swc-example)

## Unplugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/unplugin.svg)](https://www.npmjs.com/package/@import-meta-env/unplugin)

### Installation

```bash
$ npm i -D @import-meta-env/unplugin
```

### Usage

ESbuild:

```js
// esbuild.config.js
const { build } = require("esbuild");
const importMetaEnv = require("@import-meta-env/unplugin");

build({
  plugins: [
    importMetaEnv.esbuild({
      example: ".env.example",
    }),
  ],
});
```

Related examples: [esbuild](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/esbuild-starter-example)

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

Related examples: [rollup](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/rollup-starter-example)

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

Related examples: [vite](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/vite-starter-example)

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

Related examples: [webpack](https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/webpack-starter-example)
