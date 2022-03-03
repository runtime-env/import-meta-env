# Setup

1. Install package:

```sh
$ pnpm i -D @import-meta-env/unplugin
$ pnpm i -D @import-meta-env/cli
```

2. Register `import-meta-env` plugin:

```js
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...

  webpack: (config) => {
    config.plugins.push(require("@import-meta-env/unplugin").webpack());

    return config;
  },
};

module.exports = nextConfig;
```

3. Set environment variables:

```sh
$ export HELLO=import-meta-env
$ export SECRET_NUMBER=42
```

4. Start dev server:

```sh
$ pnpm exec next dev
```

5. Build production:

```sh
$ pnpm exec next build
```

6. Serve production:

```sh
$ pnpm exec import-meta-env
$ pnpm exec next start
```
