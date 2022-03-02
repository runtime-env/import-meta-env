# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/unplugin
$ pnpm i -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// config/webpack.config.js
import importMetaEnv from "@import-meta-env/unplugin";

const dev = {
  plugins: [
    // ...,
    importMetaEnv.rollup(),
  ],
};

const prod = {
  plugins: [
    // ...,
    importMetaEnv.rollup(),
  ],
};

// ...
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
```

4. Start dev server:

```sh
$ pnpm exec rollup -c -w
```

```sh
$ pnpm exec serve public
```

5. Build production:

```sh
$ pnpm exec rollup -c
```

6. Serve production:

```sh
$ pnpm exec import-meta-env
$ pnpm exec serve dist
```
