---
home: true
heroText: Import-meta-env
tagline: Populates your environment variables at run-time rather than build-time.
actionText: Get Started
actionLink: /guide
features:
  - title: Strict
    details: Code has no access to arbitrary environment variables by default
  - title: Isomorphic
    details: CSR, SSR, and SSG compatible.
  - title: Learn Once, Write Anywhere
    details: Works with Vite, Webpack, Rollup as well as test frameworks such as Jest and Mocha.
footer: MIT Licensed | Copyright © 2021-present Ernest
---

<p style="text-align: center;"><b>Write Your Code:</b></p>

```js
// src/index.js
console.log(import.meta.env.HELLO);
```

<p style="text-align: center;"><b>Bundle It:</b></p>

```js
// dist/index.js
console.log("__import_meta_env_placeholder__".HELLO);
```

<p style="text-align: center;"><b>Run the <code>import-meta-env</code> command to transform it</b> <i>wherever</i> your environment variables exist:</p>

```js
// dist/index.js
console.log({ HELLO: "there" }.HELLO);
```

> The `import-meta-env` is a node script, you can use [pkg](https://github.com/vercel/pkg) to package the `import-meta-env` binary into an executable that can be run even on devices _without Node.js_ installed (e.g., in [Alpine Linux](https://alpinelinux.org/) docker image).
