# vite-plugin-dotenv

[![CI](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/vite-plugin-dotenv/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/vite-plugin-dotenv.svg)](https://www.npmjs.com/package/vite-plugin-dotenv)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Inject your [environment variables](https://vitejs.dev/guide/env-and-mode.html#env-variables) at runtime instead of build time.

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## How

In production, this package will generate some files in your dist assets directory that allow us to inject environment variables _after building the package_.

- `dist/assets/.env` is a `.env` file whose contents are generated from `import.meta.env`, **feel free to change the environment variables** in this file before serving your application.

- `dist/assets/env.js` contains a placeholder: `__env__` which allows us to inject environment variables.

- `dist/assets/.env.sh` is used to inject the contents of `dist/assets/.env` into the above placeholder `__env__`.

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

Add the following script to run `.env.sh` to inject environment variables before serving your application:

```json
{
  "scripts": {
    "preview": "./dist/assets/.env.sh && vite preview"
  }
}
```

If you run into problems, see [examples](../examples) or create an issue from github.

## Plugin Options

- `placeholder?: string`: The placeholder to replace with the `.env` file content

- `verify: boolean = true`: Whether to verify the `.env` file content at runtime

- `debug?: boolean`: Whether to dump debug logs, logs will be dumped to <package-root>/vite-plugin-dotenv-debug.log

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
