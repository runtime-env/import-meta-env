# Runtime Transform

Please read the [guide](/guide/getting-started/introduction.html#guide) for how to use this tool.

## CLI

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/cli.svg?color=blue)](https://www.npmjs.com/package/@import-meta-env/cli)

### Installation

```bash
$ npm i -D @import-meta-env/cli
```

### Usage

```bash
$ npx import-meta-env -x .env.example
```

Related examples: [docker](https://github.com/import-meta-env/import-meta-env/blob/main/packages/examples/docker-starter-example)

::: tip
By default, import-meta-env will automatically replace all files in the [common bundle output directories](https://github.com/import-meta-env/import-meta-env/blob/e4defac25c89ff1bfd71ec478713720bd82d85d4/packages/cli/src/shared.ts#L5-L16)

You can override this behavior by passing the `-p, --path <path...>` option.

For more information, see [API](/api.html#import-meta-env-cli).
:::

### Without Node.js

The [Single executable applications](https://nodejs.org/api/single-executable-applications.html#single-executable-applications) feature allows the distribution of a Node.js application conveniently to a system that does not have Node.js installed, you could use it to package the `import-meta-env` script into a `node` binary.
