---
home: true
heroText: Import-meta-env
tagline: Populate environment variables just before running your application.
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

Since there is no such environment variable in the browser environment. We typically use <a href="https://webpack.js.org/plugins/environment-plugin/">Webpack</a> or <a href="https://github.com/rollup/plugins/tree/master/packages/replace#usage">Rollup</a> to statically replace all occurrences of `process.env.KEY` (or <a href="https://vitejs.dev/guide/env-and-mode.html">Vite</a>'s `import.meta.env.KEY`) with the given string value.

This can be a problem because we might want to put environment variables into the [Kubernetes ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) or pass them when running the container:

```bash
docker run -d -p 8080:80 --env NAME=world my-app
```

But at this stage, we can't change the environment variables anymore, because `NAME` has been replaced with some values during the build process.

## Solution

To achieve this, this plugin exposes environment variables on a special `import.meta.env`[<sup>?</sup>](guide.html#why-use-importmeta) object:

```js
// src/index.js
console.log(`Hello, ${import.meta.env.NAME}.`);
```

During production it will be statically replaced with a placeholder:

```js
// dist/index.js
console.log(`Hello, ${"__import_meta_env_placeholder__".NAME}.`);
```

Then we can run the [CLI](guide.html#install-cli) anywhere, populating files with environment variables from the system:

```js
// dist/index.js
console.log(`Hello, ${"world"}.`);
```
