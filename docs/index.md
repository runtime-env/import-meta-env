# final-env

Populates your environment variables after build-time.

[Get Started](/guide.html#getting-started)

[Examples](https://github.com/iendeavor/final-env/tree/main/packages/examples)

## How it Works

This plugin exposes environment variables on a special `__ENV__`[<sup>?</sup>](guide.html#why-use-importmeta) object:

```js
// src/index.js
console.log(__ENV__.API_BASE_URL);
```

During bundle step (for example, running Webpack in Github Actions), the code will be temporarily replaced with a placeholder:

```js
// dist/index.js
console.log(eval('"__env_placeholder__.API_BASE_URL"'));
```

You can then run the [CLI](guide.html#install-cli) anywhere to populating the bundle files with environment variables _without rebuilding your application_.

For example, [`docker run --env API_BASE_URL=https://httpbin.org ...`](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file):

```js
// dist/index.js
console.log("https://httpbin.org");
```
