# vite-plugin-dotenv

[![CI](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/vite-plugin-dotenv.svg)](https://www.npmjs.com/package/vite-plugin-dotenv)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Inject your environment variables from the .env file at runtime instead of build time.

In production, this package will generate some files in your dist assets directory (see below) that allow us to inject the environment variables _after building the package_.

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

⚠️ **DO NOT** add secret environment to `<package-root>/dist/assets/.env`, the [shell script](https://github.com/iendeavor/vite-plugin-dotenv/tree/main/packages/vite-plugin-dotenv#:~:text=%3Cpackage%2Droot%3E/dist/assets/.env.sh%20is%20a%20shell%20script%20that%20injects%20%3Cpackage%2Droot%3E/dist/assets/.env%20into%20%3Cpackage%2Droot%3E/dist/assets/env.js.) will inject everything from it into `<package-root>/dist/assets/env.js`.

## 🚀 Quick Start

Install the plugin:

```sh
pnpm i vite-plugin-dotenv
```

Register the plugin:

```js
// vite.config.js
import { defineConfig } from "vite";
import dotenv from "vite-plugin-dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dotenv()],
});
```

Use it:

```
# .env
VITE_NAME=vite-plugin-dotenv
```

```js
// main.js
console.log(`Hollo ${import.meta.env.VITE_NAME}`); // Hello vite-plugin-dotenv
```

After building the package, you will have following files in dist:

- `<package-root>/dist/assets/.env` is generated from `import.meta.env`, feel free to change environment variables in this file before serving your app.

- `<package-root>/dist/assets/env.js` contains a placeholder: `__env__`, which allows us to inject environment variables.

- `<package-root>/dist/assets/.env.sh` is a shell script that injects `<package-root>/dist/assets/.env` into `<package-root>/dist/assets/env.js`.

Before serving your website, you need to inject environment variables:

```json
{
  "scripts": {
    "preview": "./dist/assets/.env.sh && vite preview"
  }
}
```

If you run into problems, see [examples](../examples) or create an issue from github.

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
