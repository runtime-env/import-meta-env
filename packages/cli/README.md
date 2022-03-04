# @import-meta-env/cli

[![CI](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/import-meta-env/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@import-meta-env/cli.svg)](https://www.npmjs.com/package/@import-meta-env/cli)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Our plugin](https://github.com/iendeavor/import-meta-env#packages) generates chunks with placeholders during production, which allow us to statically replace environment variables **_after_** building the application, and this binary package is used to inject environment variables into these placeholders.

<br>

This project use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

## Quick Start

Install package:

```sh
$ npm i @import-meta-env/cli
```

You can now execute `import-meta-env` binary to inject environment variables.

```sh
$ npx import-meta-env
```

Tip: to deploy container with docker or others, you can use [pkg](https://github.com/vercel/pkg) to create a standalone executable.

For example, you can pack the alpine version like this:

```sh
$ npm i -g pkg
$ npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js -t node16-alpine
```

See also:

- [examples](https://github.com/iendeavor/import-meta-env/tree/main/packages/examples)
- [@import-meta-env/babel](https://github.com/iendeavor/import-meta-env/tree/main/packages/babel) - Provide an approximation of this plugin's specific transformations when running the code in other environments, for example, running tests with a NodeJS based test runner.
- [@import-meta-env/unplugin](https://github.com/iendeavor/import-meta-env/tree/main/packages/unplugin) - Inject environment variables into the import.meta.env object after building the application instead of statically replacing it during production.

## API

```
$ npx import-meta-env --help
Usage: import-meta-env [options]

Inject environment variables from the system or `.env` file.

Options:
  -V, --version           output the version number
  -e, --env <path>        The .env file path to load (default: ".env")
  -x, --example <path>    The .env example file path to load (default: ".env.example")
  -o, --output <path...>  The output file paths to inject in-place (default: ["dist/**/*",".next/**/*",".nuxt/**/*",".output/**/*","build/**/*"])
  --disposable            Do not create backup files and restore from backup files. In local development, disable this option to avoid rebuilding the project when
                          environment variable changes, In production, enable this option to avoid generating unnecessary backup files.
  -h, --help              display help for command
```

Since we may switch to different environment variables multiple times, this executable also creates `*.bak` files to restore.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
