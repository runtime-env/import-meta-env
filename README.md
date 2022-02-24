# @import-meta-env/vite

[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@import-meta-env/vite.svg)](https://www.npmjs.com/package/@import-meta-env/vite)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Environment variables are easy to change between deployments without changing any code, this plugin helps you load environment variables into [`import.meta.env`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) object.

<br>

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## Motivation

Vite's built-in environment variables feature [statically replaces environment variables during production](https://vitejs.dev/guide/env-and-mode.html), which forces us to rebuild multiple times for different environment variables.

Instead, this plugin generates chunks with placeholders during production, which allows us to statically inject environment variables **after** building the application (we also provide executables for this, you don't need to write them yourself). No need to rebuild the whole application!

Also, following [the Twelve-Factor application](https://www.12factor.net/config), you should set environment variables on the system, not check them in a config to the repository.

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
console.log(import.meta.env.SECRET_KEY); // undefined
```

Finally, before serving your application, remember to execute `import-meta-env` binary to inject environment variables.

Adjust the preview script in your package.json:

```json
{
  "scripts": {
    "preview": "import-meta-env && vite preview"
  }
}
```

To deploy container with docker or others, you can use [pkg](https://github.com/vercel/pkg) to create a standalone executable.

For example, you can pack the alpine version like this:

```sh
$ npm i -g pkg
$ npx pkg ./node_modules/@import-meta-env/vite/bin/import-meta-env.js -t node16-alpine
```

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
