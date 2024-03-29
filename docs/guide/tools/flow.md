# Flow

Generate [Flow](https://flow.org/) type from `.env.example`.

## Installation

[![NPM version](https://img.shields.io/npm/v/@import-meta-env/flow.svg?color=blue)](https://www.npmjs.com/package/@import-meta-env/flow)

```bash
$ npm i -D @import-meta-env/flow
```

## Usage

```bash
$ npx import-meta-env-flow -x .env.example
```

By default, when running above command, the CLI will create an `import-meta-env.js` file in your project root:

```js
// import-meta-env.js
// Generated by '@import-meta-env/flow'

declare type Import$Meta = {
  +env: $ReadOnly<{
    NAME: string,
  }>,
};
```
