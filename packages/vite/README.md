# @import-meta-env/vite

[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@import-meta-env/vite.svg)](https://www.npmjs.com/package/@import-meta-env/vite)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This plugin helps us inject environment variables into the `import.meta.env` object **_after_** building the application instead of statically replacing it during production.

<br>

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## Motivation

The built-in [environment variables feature](https://vitejs.dev/guide/env-and-mode.html#production-replacement) statically replaces environment variables during production, which **_forces us to rebuild_** multiple times for different environment variables.

Environment variables should be easy to change between deployments **_without_** rebuilding the application or even changing any code, so we should set environment variables on the system instead of checking them into a repository with `.env` files.

During production, this plugin generates chunks with placeholders, which allow us to statically replace environment variables **_after_** building the application (don't worry, we provide an executable for this, you don't need to write them yourself) .

## 🚀 Quick Start

Install and register the plugin:

```sh
$ npm i dotenv @import-meta-env/vite
```

```ts
// vite.cofnig.ts
import { defineConfig } from "vite";
import importMetaEnv from "@import-meta-env/vite";

export default defineConfig({
  plugins: [importMetaEnv()],
});
```

Create a `.env.example` file in the root of your project:

```sh
# .env.example
# To prevent exposure of sensitive credentials to clients,
# only the keys defined in this file can be accessed.
S3_BUCKET=
```

Add `.env` file to .gitignore, and create a `.env` file in the project's root directory:

(⚠ This step is completely optional, you should set environment variables directly on your system if you can.)

```sh
# .env
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

`import.meta.env` now has the keys and values you defined on your system:

```ts
console.log(import.meta.env.S3_BUCKET); // "YOURS3BUCKET"
console.log(import.meta.env["S3_BUCKET"]); // "YOURS3BUCKET", dynamic key also works
console.log(import.meta.env.SECRET_KEY); // undefined
```

Finally, before serving your application, remember to execute `import-meta-env` binary to inject environment variables.

Adjust the preview script in your package.json:

```json
{
  "scripts": {
    // If you have `.env` file:
    "preview": "import-meta-env && vite preview",
    // If you have not `.env` file:
    "preview": "cross-env S3_BUCKET=YOURS3BUCKET import-meta-env && vite preview"
  }
}
```

To deploy container with docker or others, you can use [pkg](https://github.com/vercel/pkg) to create a standalone executable.

For example, you can pack the alpine version like this:

```sh
$ npm i -g pkg
$ npx pkg ./node_modules/@import-meta-env/vite/bin/import-meta-env.js -t node16-alpine
```

See also:

- [examples](./examples)
- [@import-meta-env/babel](https://github.com/iendeavor/import-meta-env/tree/main/packages/babel) - Provide an approximation of this plugin's specific transformations when running the code in other environments, for example, running tests with a NodeJS based test runner.

## 📖 API

### import-meta-env binary

```sh
$ npx import-meta-env --help
Usage: import-meta-env [options]

Inject environment variables from the system or `.env` file.

Options:
  -V, --version           output the version number
  -e, --env <path>        .env file path (default: ".env")
  -x, --example <path>    .env example file path (default: ".env.example")
  -o, --output <path...>  output file paths (default: "dist/assets/import-meta-env*")
  -h, --help              display help for command
```

Since we may switch to different environment variables multiple times, this executable also creates `*.bak` files to restore.

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
