# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.7](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.6...unplugin0.1.7) (2022-03-15)


### Bug Fixes

* require webpack on demand ([f6304d0](https://github.com/iendeavor/import-meta-env/commit/f6304d0741f799b20a6b61d17dbef2eb88885a95))

### [0.1.6](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.5...unplugin0.1.6) (2022-03-13)


### Bug Fixes

* TS2330 ([846f86c](https://github.com/iendeavor/import-meta-env/commit/846f86c43582d1266fcc29715431d445ae3ee7b4))

### [0.1.5](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.4...unplugin0.1.5) (2022-03-11)


### Bug Fixes

* svelte file may contains multiple script tag ([ae4d23c](https://github.com/iendeavor/import-meta-env/commit/ae4d23ccf1f4329110779c627844ac95cedd3325))

### [0.1.4](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.3...unplugin0.1.4) (2022-03-10)


### Features

* support dotenv@8, 9, 10 too ([f7af582](https://github.com/iendeavor/import-meta-env/commit/f7af5828a716c3348a8373e50b0e20c9c42c86c3))

### [0.1.3](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.2...unplugin0.1.3) (2022-03-04)


### Features

* for security reasons, example file paths should be explicitly defined ([23b098f](https://github.com/iendeavor/import-meta-env/commit/23b098f0a5921dabfdd51cab1d345cc0c8c0eda1))
* make api consistent with cli ([8f0491c](https://github.com/iendeavor/import-meta-env/commit/8f0491cd85cca70c781f82ad3cfcd3dd4d37d01a))


### Bug Fixes

* it should load user-defined example file instead of hardcoding .env.example ([329002b](https://github.com/iendeavor/import-meta-env/commit/329002b2f6f79162096463f3bd8558d680b4fe7b))

### [0.1.2](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.1...unplugin0.1.2) (2022-03-02)


### Bug Fixes

* add missing import statement ([504d8f3](https://github.com/iendeavor/import-meta-env/commit/504d8f3fc9866fa3d48dfea1a888d810dd851f08))
* cannot resolve virtual module, inline placeholder for webpack instead ([470b4bb](https://github.com/iendeavor/import-meta-env/commit/470b4bbabb89700c59b3fc44f96203a66fe7a55d))
* missing parentheses when using with arrow functions ([3697ce7](https://github.com/iendeavor/import-meta-env/commit/3697ce7b0939dd6514a5e854f12348ac9bf47faa))
* **unplugin:** inline env when running in webpack/rollup watch mode ([aca790b](https://github.com/iendeavor/import-meta-env/commit/aca790bd3b8cffa7acd1b26667d2f031601e94d5))
* vue-cli webpack ImportMetaPlugin transforms unknown import.meta properties to void 0, intercept it ([083f6bc](https://github.com/iendeavor/import-meta-env/commit/083f6bc3c13a9ea86a3e92ac6fc29618daa7ce33))

### [0.1.1](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.0...unplugin0.1.1) (2022-02-28)


### Features

* add  option to support other bundlers ([f403bb4](https://github.com/iendeavor/import-meta-env/commit/f403bb422b97da7a385094d693ae16e73aa97406))


### Bug Fixes

* only process project code ([51d447a](https://github.com/iendeavor/import-meta-env/commit/51d447ac80ef66c4b36dd9b826d2e1f03a1ae9a6))
* rollup specific buildStart hook will be triggered when running with vite ([ee2f899](https://github.com/iendeavor/import-meta-env/commit/ee2f8990c5da056c6e927286dcb7277c5ed76acb))
* **webpack:** ImportMetaPlugin transforms unknown import.meta properties to void 0, intercept it ([cab3bab](https://github.com/iendeavor/import-meta-env/commit/cab3babbc5d9454ee290ab88c92ddc8a72d717ac))
* **webpack:** inline env in development mode ([02abb19](https://github.com/iendeavor/import-meta-env/commit/02abb19310b2ed7e187fbba6a569076509df2e74))
* **webpack:** it should only transform js related files ([8b625df](https://github.com/iendeavor/import-meta-env/commit/8b625df0f0f7bbc23bd2fb95e9ab90833bc1c342))

## 0.1.0 (2022-02-27)


### Features

* unplugin ([0c31de1](https://github.com/iendeavor/import-meta-env/commit/0c31de19d42c25b00f881abbae5e80c12b5dfe7e))


### Bug Fixes

* failed to resolve virtual file ([a48db64](https://github.com/iendeavor/import-meta-env/commit/a48db64e8f67d0858b8fc74d4cce0a632f95f083))
* **rollup:** add import-meta-env entry to manual chunks ([c4c4860](https://github.com/iendeavor/import-meta-env/commit/c4c4860ba7195d95b18f1258f3f6054cf6a5b0ba))
