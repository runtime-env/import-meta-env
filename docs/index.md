---
home: true
heroText: Import-meta-env
tagline: Populates your environment variables after build-time.
actionText: Get Started
actionLink: /guide
features:
  - title: Feature Rich
    details: Out-of-the-box support for Webpack, Rollup and Vite, CSR, SSR and SSG, and unit testing tools. Powered by Unplugin and Babel.
  - title: Strict
    details: Code has no access to arbitrary environment variables by default.
  - title: Cross-platform
    details: Populate your environment variables anywhere, such as the Alpine Linux nginx image. Powered by pkg.
footer: MIT Licensed | Copyright © 2021-present Ernest
---

## The Problem

Since there is no such environment variable in the browser environment. We typically use <a href="https://webpack.js.org/plugins/environment-plugin/">Webpack</a> or <a href="https://github.com/rollup/plugins/tree/master/packages/replace#usage">Rollup</a> to statically replace all occurrences of `process.env` (or <a href="https://vitejs.dev/guide/env-and-mode.html">Vite</a>'s `import.meta.env`) with the given string value. **This means it can only be configured at build time.**

## Solution

To solve this, this plugin exposes environment variables on a special `import.meta.env`[<sup>?</sup>](guide.html#why-use-importmeta) object:

```js
// src/index.js
console.log(`Hello, ${import.meta.env.HELLO}.`);
```

During production it will be statically replaced with a placeholder:

```js
// dist/index.js
console.log(`Hello, ${"__import_meta_env_placeholder__".HELLO}.`);
```

Then we can run the script anywhere, populating files with environment variables from the system:

```js
// dist/index.js
console.log(`Hello, ${{ HELLO: "import-meta-env" }.HELLO}.`);
// > Hello, import-meta-env.
```
