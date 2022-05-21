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

Since there is no such environment variable in the browser environment, we need to use [webpack.EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) or [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace#usage) to replace the variables in your code with the corresponding environment variables at compile time.

_This can be a problem if your environment variables are not available at compile time._

For example, you may want to build a application in Github Actions, but your environment variables are configured in Google Kubernetes Engine.

## Solution

To achieve this, this plugin exposes environment variables on a special `import.meta.env`[<sup>?</sup>](guide.html#why-use-importmeta) object:

```js
// src/index.js
console.log(`API base URL is: ${import.meta.env.API_BASE_URL}.`);
```

During production (e.g., in Github Actions), it will be statically replaced with a placeholder:

```js
// dist/index.js
console.log(
  `API base URL is: ${"__import_meta_env_placeholder__".API_BASE_URL}.`
);
```

Then we can run the [CLI](guide.html#install-cli) anywhere (e.g., in Google Kubernetes Engine), populating files with environment variables from the system:

```js
// dist/index.js
console.log(
  `API base URL is: ${{ API_BASE_URL: "https://httpbin.org" }.API_BASE_URL}.`
);
// > API base URL is: https://httpbin.org.
```
