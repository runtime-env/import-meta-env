# Compile-time Transform

Temporarily replace `import.meta.env` with _placeholders_.

::: info
By default, **import-meta-env** will automatically determine the mode (development/testing or production) and replace `import.meta.env` with environment variables or placeholders, respectively.

You can override this by setting the `shouldInlineEnv` option.

For more information, see [API](/api).
:::

## Compatibility

Currently we support [Babel plugin](#babel-plugin), [SWC plugin](#swc-plugin), and [Unplugin](#unplugin) transforms, you can use one or both, for example:

1. If you use Webpack 5 and Jest, you can use the [Unplugin](#unplugin) for development/production, and the [Babel plugin](#babel-plugin) for testing.
2. If you use Vite, you can use [Unplugin](#unplugin) for development/production, and testing.

| Compatibility                         | [Babel plugin](#babel-plugin)                                                                 | [Unplugin](#unplugin)                                                                                                 | [SWC plugin](#swc-plugin) |
| ------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [Angular CLI](https://angular.io/cli) |                                                                                               | :heavy_check_mark: [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) |
| [Babel](https://babeljs.io/)          | :heavy_check_mark:                                                                            |                                                                                                                       |
| [ESbuild](https://esbuild.github.io/) |                                                                                               | :heavy_check_mark:                                                                                                    |
| [Jest](https://jestjs.io/)            | :heavy_check_mark: [babel-jest](https://www.npmjs.com/package/babel-jest)                     |                                                                                                                       |
| [Mocha](https://mochajs.org/)         | :heavy_check_mark: [@babel/register](https://npm.im/@babel/register)                          |                                                                                                                       |
| [Rollup](https://rollupjs.org/)       | :heavy_check_mark: [@rollup/plugin-babel](https://www.npmjs.com/package/@rollup/plugin-babel) | :heavy_check_mark:                                                                                                    |
| [SWC](https://swc.rs/)                |                                                                                               |                                                                                                                       | :heavy_check_mark:        |
| [Vite](https://vitejs.dev/)           |                                                                                               | :heavy_check_mark:                                                                                                    |
| [Vitest](https://vitejs.dev/)         |                                                                                               | :heavy_check_mark:                                                                                                    |
| [Webpack](https://webpack.js.org/) 4  | :heavy_check_mark: [babel-loader](https://www.npmjs.com/package/babel-loader)                 |                                                                                                                       |
| [Webpack](https://webpack.js.org/) 5  | :heavy_check_mark: [babel-loader](https://www.npmjs.com/package/babel-loader)                 | :heavy_check_mark:                                                                                                    |

If your toolchain is not supported, please feel free to [file an issue](https://github.com/iendeavor/import-meta-env/issues/new) on GitHub.

## Babel Plugin

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/babel.svg)](https://www.npmjs.com/package/@import-meta-env/babel)

### Installation

```bash
$ npm install @import-meta-env/babel --save-dev
```

### Using the plugin

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
$ npm install @import-meta-env/swc --save-dev
```

### Using the plugin

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
$ npm install @import-meta-env/unplugin --save-dev
```

### Using the plugin

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
